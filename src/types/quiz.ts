export type ScreenType = 'question' | 'info' | 'summary';

export interface QuizScreen {
  id: string;
  screenType: ScreenType;
  question?: string;
  answers?: string[];
  content?: string;
  title?: string;
  next?: string | null;
  nextMap?: Record<string, string>;
}

export interface QuizConfig {
  quizId: string;
  title: string;
  screens: QuizScreen[];
}

export interface QuizAnswers {
  [screenId: string]: string;
}

export interface QuizState {
  currentQuizId: string | null;
  answers: QuizAnswers;
  currentScreenId: string | null;
  screenHistory: string[];
}
