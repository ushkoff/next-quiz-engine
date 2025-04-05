'use client';
import { QuizConfig } from '@/types/quiz';
import QuizContainer from './QuizContainer';

interface QuizPageProps {
  quizConfig: QuizConfig;
  initialScreenId?: string;
}

export default function QuizPage({ quizConfig, initialScreenId }: QuizPageProps) {
  return (
    <main className="min-h-screen bg-gray-50">
      <QuizContainer quizConfig={quizConfig} initialScreenId={initialScreenId} />
    </main>
  );
}
