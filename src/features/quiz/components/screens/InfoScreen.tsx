import { QuizScreen } from '@/types/quiz';

interface InfoScreenProps {
  screen: QuizScreen;
  onNext: () => void;
  processText: (text: string) => string;
}

export default function InfoScreen({ screen, onNext, processText }: InfoScreenProps) {
  if (!screen.content) return null;

  return (
    <div className="max-w-2xl mx-auto flex flex-col items-center text-center">
      {screen.title && (
        <h2 className="text-[24px] leading-[28px] font-bold mb-6 text-[#FAFAFA]">
          {processText(screen.title)}
        </h2>
      )}
      <p className="text-[#FAFAFA] mb-8 text-[14px] leading-[180%] font-normal max-w-[440px]">
        {processText(screen.content)}
      </p>
      <div className="flex justify-center w-full">
        <button
          onClick={onNext}
          className="w-full md:w-[440px] h-[64px] bg-[#FBFBFF] text-[#6A3AA2] rounded-[16px] px-5 py-3 text-sm font-normal leading-[140%]"
        >
          Next
        </button>
      </div>
    </div>
  );
}
