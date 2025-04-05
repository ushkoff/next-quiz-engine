import { QuizScreen } from '@/types/quiz';

interface QuestionScreenProps {
  screen: QuizScreen;
  onAnswer: (answer: string) => void;
  processText: (text: string) => string;
}

export default function QuestionScreen({ screen, onAnswer, processText }: QuestionScreenProps) {
  if (!screen.question || !screen.answers) return null;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-[24px] leading-[28px] font-bold mb-8 text-[#1A1A1A]">
        {processText(screen.question).split('\n').map((line, index) => (
          <span key={index} className="block mb-2">
            {line}
          </span>
        ))}
      </h2>
      <div className="flex flex-col items-center space-y-4">
        {screen.answers.map((answer) => (
          <button
            key={answer}
            onClick={() => onAnswer(answer)}
            className="w-full md:w-[440px] h-[64px] border border-gray-300 rounded-[16px] px-5 py-3 text-sm font-normal leading-[140%] hover:bg-gradient-to-br hover:from-[#141333] hover:via-[#543C97] hover:to-[#6939A2] hover:text-[#FAFAFA] transition-all duration-200"
          >
            {processText(answer)}
          </button>
        ))}
      </div>
    </div>
  );
}
