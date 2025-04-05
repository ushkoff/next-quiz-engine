import { QuizConfig, QuizAnswers } from '@/types/quiz';

export class QuizService {
  private config: QuizConfig;

  constructor(config: QuizConfig) {
    this.config = config;
  }

  getNextScreenId(currentScreenId: string, answer: string): string | null {
    const currentScreen = this.config.screens.find((screen) => screen.id === currentScreenId);
    if (!currentScreen) return null;

    if (currentScreen.nextMap && currentScreen.nextMap[answer]) {
      return currentScreen.nextMap[answer];
    }

    return currentScreen.next || null;
  }

  replaceVariables(text: string, answers: QuizAnswers): string {
    return text.replace(/\{([^}]+)\}/g, (match, variable) => {
      if (variable.toLowerCase() === 'gender') {
        return answers['gender'] || match;
      }

      if (variable.toLowerCase().includes('who have children')) {
        const isParent = answers['isParent'] === 'Yes' || answers['singleParent'] === 'Yes';
        return isParent ? 'who have children' : '';
      }

      return match;
    });
  }

  getCurrentScreen(screenId: string) {
    return this.config.screens.find((screen) => screen.id === screenId);
  }

  getFirstScreenId(): string {
    return this.config.screens[0]?.id;
  }
}
