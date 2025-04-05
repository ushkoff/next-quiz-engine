import { Metadata } from 'next';
import QuizPageClient from '@/features/quiz/components/QuizPage';
import { getQuizConfig, generateQuizScreenStaticParams } from '@/utils/quiz';

export const generateStaticParams = generateQuizScreenStaticParams;

type PageParams = Promise<{ id: string; screenId: string }>;

export async function generateMetadata({ params }: { params: PageParams }): Promise<Metadata> {
  const { id, screenId } = await params;
  const quiz = await getQuizConfig(id);
  const screen = quiz.screens.find((s) => s.id === screenId);
  return {
    title: `${quiz.title} - ${screen?.question || 'Quiz'}`,
    description: screen?.question || `Take the ${quiz.title} quiz`,
  };
}

export default async function QuizPage({ params }: { params: PageParams }) {
  try {
    const { id, screenId } = await params;
    console.log('Loading quiz page with params:', { id, screenId });
    const config = await getQuizConfig(id);
    console.log('Loaded quiz config:', config);
    return <QuizPageClient quizConfig={config} initialScreenId={screenId} />;
  } catch (error) {
    console.error('Error loading quiz page:', error);
    return <div>Error loading quiz</div>;
  }
}
