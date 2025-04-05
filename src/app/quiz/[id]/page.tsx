import { redirect } from 'next/navigation';
import { QuizService } from '@/features/quiz/services/quizService';
import { getQuizConfig, generateQuizStaticParams } from '@/utils/quiz';

export const generateStaticParams = generateQuizStaticParams;

type PageParams = Promise<{ id: string }>;

export default async function QuizPage({ params }: { params: PageParams }) {
  const { id } = await params;
  const config = await getQuizConfig(id);
  const quizService = new QuizService(config);
  const firstScreenId = quizService.getFirstScreenId();

  redirect(`/quiz/${id}/${firstScreenId}`);
}
