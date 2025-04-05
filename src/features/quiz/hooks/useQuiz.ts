import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { QuizConfig, QuizScreen } from '@/types/quiz';
import { QuizService } from '../services/quizService';
import { RootState } from '@/store';
import {
  startQuiz,
  setAnswer,
  setCurrentScreen,
  resetQuiz,
  goBack,
} from '@/store/slices/quizSlice';

interface UseQuizProps {
  quizId: string;
  screenId: string;
  initialScreenId?: string;
}

export function useQuiz({ quizId, screenId, initialScreenId }: UseQuizProps) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { currentQuizId, currentScreenId, answers, screenHistory } = useSelector(
    (state: RootState) => state.quiz,
  );

  const [quizConfig, setQuizConfig] = useState<QuizConfig | null>(null);

  useEffect(() => {
    const loadQuizConfig = async () => {
      try {
        const response = await fetch(`/quiz_${quizId}.json`);
        console.log('Response status:', response.status);
        if (!response.ok) {
          throw new Error(`Failed to load quiz config: ${response.status} ${response.statusText}`);
        }
        const config = await response.json();
        console.log('Loaded quiz config:', config);
        setQuizConfig(config);
      } catch (error) {
        console.error('Failed to load quiz config:', error);
      }
    };
    if (!quizConfig) {
      loadQuizConfig();
    }
  }, [quizId, quizConfig]);

  const quizService = useMemo(
    () => (quizConfig ? new QuizService(quizConfig) : null),
    [quizConfig],
  );

  useEffect(() => {
    if (!currentQuizId || currentQuizId !== quizId) {
      dispatch(startQuiz({ quizId, firstScreenId: initialScreenId || screenId }));
      dispatch(setCurrentScreen({ screenId: initialScreenId || screenId }));
    }
  }, [currentQuizId, dispatch, initialScreenId, quizId, screenId]);

  useEffect(() => {
    if (!currentScreenId || currentScreenId !== screenId) {
      dispatch(setCurrentScreen({ screenId }));
    }
  }, [currentScreenId, dispatch, screenId]);

  const handleAnswer = (answer: string) => {
    if (!currentScreenId || !quizService) return;

    dispatch(setAnswer({ screenId: currentScreenId, answer }));

    const nextScreenId = quizService.getNextScreenId(currentScreenId, answer);
    if (nextScreenId) {
      dispatch(setCurrentScreen({ screenId: nextScreenId, addToHistory: true }));
      router.push(`/quiz/${quizId}/${nextScreenId}`);
    }
  };

  const handleBack = () => {
    if (!currentScreenId || !quizConfig || !screenHistory.length) return;
    const previousScreenId = screenHistory.at(-1);
    if (previousScreenId) {
      dispatch(goBack());
      router.push(`/quiz/${quizId}/${previousScreenId}`);
    }
  };

  const handleNext = () => {
    console.log('handleNext called');
    if (!currentScreenId || !quizService) {
      console.log('Missing currentScreenId or quizService', { currentScreenId, quizService });
      return;
    }

    const currentScreen = quizService.getCurrentScreen(currentScreenId);
    console.log('Current screen:', currentScreen);
    if (!currentScreen) {
      console.log('No current screen found');
      return;
    }

    let nextScreenId: string | undefined;

    if (currentScreen.screenType === 'info' && currentScreen.next) {
      console.log('Using direct next:', currentScreen.next);
      nextScreenId = currentScreen.next;
    }
    else if (currentScreen.nextMap) {
      console.log('Using nextMap:', currentScreen.nextMap);
      const previousScreenId = screenHistory.at(-1);

      if (previousScreenId && answers[previousScreenId]) {
        const previousAnswer = answers[previousScreenId];
        if (currentScreen.nextMap[previousAnswer]) {
          nextScreenId = currentScreen.nextMap[previousAnswer];
        }
      }
    }
    else if (currentScreen.next) {
      console.log('Fallback to direct next:', currentScreen.next);
      nextScreenId = currentScreen.next;
    }

    if (nextScreenId) {
      dispatch(setCurrentScreen({ screenId: nextScreenId, addToHistory: true }));
      router.push(`/quiz/${quizId}/${nextScreenId}`);
    } else {
      console.log('No next screen found.');
    }
  };

  const handleReset = () => {
    dispatch(resetQuiz());
  };

  const getCurrentScreen = (): QuizScreen | null => {
    if (!currentScreenId || !quizService) return null;
    const screen = quizService.getCurrentScreen(currentScreenId);
    return screen || null;
  };

  const processText = (text: string) => {
    if (!text || !quizService) return '';
    return quizService.replaceVariables(text, answers);
  };

  return {
    currentScreen: getCurrentScreen(),
    handleAnswer,
    handleNext,
    handleBack,
    handleReset,
    processText,
    answers,
  };
}
