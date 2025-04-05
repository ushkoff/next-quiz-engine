'use client';
import { QuizConfig } from '@/types/quiz';
import { useQuiz } from '../hooks/useQuiz';
import QuestionScreen from './screens/QuestionScreen';
import InfoScreen from './screens/InfoScreen';
import SummaryScreen from './screens/SummaryScreen';
import ErrorScreen from './screens/ErrorScreen';
import Header from '@/components/Header';

interface QuizContainerProps {
  quizConfig: QuizConfig;
  initialScreenId?: string;
}

export default function QuizContainer({ quizConfig, initialScreenId }: QuizContainerProps) {
  console.log('QuizContainer props:', { quizConfig, initialScreenId });
  const { currentScreen, handleAnswer, handleNext, handleReset, handleBack, processText, answers } =
    useQuiz({
      quizId: quizConfig.quizId,
      screenId: initialScreenId || '',
    });

  if (!currentScreen) {
    return <ErrorScreen message="Screen not found" />;
  }

  const showBackButton =
    currentScreen.id !== quizConfig.screens[0].id && currentScreen.screenType !== 'summary';

  const isGradientBg =
    currentScreen.screenType === 'info' || currentScreen.screenType === 'summary';

  return (
    <div
      className={`min-h-screen ${isGradientBg ? 'bg-gradient-to-br from-[#141333] via-[#543C97] to-[#6939A2]' : 'bg-gray-50'}`}
    >
      <Header onBack={handleBack} showBackButton={showBackButton} isGradientBg={isGradientBg} />
      <div className="container mx-auto px-4 py-8 -mt-[64px] pt-[64px]">
        {(() => {
          switch (currentScreen.screenType) {
            case 'question':
              return (
                <QuestionScreen
                  screen={currentScreen}
                  onAnswer={handleAnswer}
                  processText={processText}
                />
              );
            case 'info':
              return (
                <InfoScreen screen={currentScreen} onNext={handleNext} processText={processText} />
              );
            case 'summary':
              return (
                <SummaryScreen
                  answers={answers}
                  onReset={handleReset}
                  quizConfig={quizConfig}
                  processText={processText}
                />
              );
            default:
              return <ErrorScreen message="Unknown screen type" />;
          }
        })()}
      </div>
    </div>
  );
}
