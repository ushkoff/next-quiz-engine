import QuizCard from '@/features/quiz/components/QuizCard';
import { getAllQuizConfigs } from '@/utils/quiz';
import Header from '@/components/Header';

export default async function Home() {
  const quizzes = await getAllQuizConfigs();

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#141333] via-[#543C97] to-[#6939A2]">
      <Header isGradientBg={true} showBackButton={false} />
      <div className="max-w-2xl mx-auto px-4 py-8 -mt-[64px] pt-[64px]">
        <h2 className="text-[24px] leading-[28px] font-bold mb-8 text-[#FAFAFA] text-center">
          Available Quizzes
        </h2>
        <div className="space-y-4">
          {quizzes.map((quiz) => (
            <QuizCard key={quiz.id} quiz={quiz} />
          ))}
        </div>
      </div>
    </main>
  );
}
