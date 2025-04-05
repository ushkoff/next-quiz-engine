import { useRouter } from 'next/navigation';
import { QuizAnswers, QuizConfig } from '@/types/quiz';

interface SummaryScreenProps {
  answers: QuizAnswers;
  onReset: () => void;
  quizConfig: QuizConfig;
  processText: (text: string) => string;
}

export default function SummaryScreen({ answers, onReset, quizConfig, processText }: SummaryScreenProps) {
  const router = useRouter();

  const handleReset = () => {
    onReset();
    router.push('/');
  };
  return (
    <div className="max-w-2xl mx-auto flex flex-col items-center text-center">
      <h2 className="text-[24px] leading-[28px] font-bold mb-6 text-[#FAFAFA]">Your Results</h2>
      <div className="w-full md:w-[440px] mb-8 border border-white/30 rounded-[16px] overflow-hidden">
        {Object.entries(answers).map(([screenId, answer], index, array) => {
          const screen = quizConfig.screens.find((s) => s.id === screenId);
          const question = processText(screen?.question || screenId);
          return (
            <div
              key={screenId}
              className={`flex flex-col text-[#FAFAFA] ${index !== array.length - 1 ? 'border-b border-white/30' : ''}`}
            >
              <div className="p-4">
                <p className="text-[14px] leading-[180%] font-normal mb-1">{question}</p>
                <p className="text-[14px] leading-[180%] font-bold">{answer}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-center w-full">
        <button
          onClick={handleReset}
          className="w-full md:w-[440px] h-[64px] bg-[#FBFBFF] text-[#6A3AA2] rounded-[16px] px-5 py-3 text-sm font-normal leading-[140%]"
        >
          Start Over
        </button>
      </div>
    </div>
  );
}
