'use client';
import Link from 'next/link';
import { QuizConfig } from '@/types/quiz';

interface QuizCardProps {
  quiz: QuizConfig & { id: string };
}

export default function QuizCard({ quiz }: QuizCardProps) {
  const questionsCount = quiz.screens.filter((screen) => screen.screenType === 'question').length;

  return (
    <Link href={`/quiz/${quiz.id}`} className="block w-full md:w-[440px] mx-auto">
      <div className="w-full bg-[#FBFBFF] rounded-[16px] p-4 hover:opacity-90 transition-opacity">
        <h3 className="text-[14px] leading-[180%] font-bold text-[#6A3AA2] mb-1">{quiz.title}</h3>
        <p className="text-[14px] leading-[180%] font-normal text-[#6A3AA2]">
          {questionsCount} questions
        </p>
      </div>
    </Link>
  );
}
