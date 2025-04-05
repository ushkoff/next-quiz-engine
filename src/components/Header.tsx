'use client';
import Image from 'next/image';

interface HeaderProps {
  onBack?: () => void;
  showBackButton?: boolean;
  isGradientBg?: boolean;
}

export default function Header({ onBack, showBackButton = true, isGradientBg }: HeaderProps) {
  return (
    <div className="h-[64px] flex items-center justify-center relative">
      {showBackButton && (
        <button
          onClick={onBack}
          className={`absolute left-4 p-2 rounded-full transition-colors duration-200 cursor-pointer ${isGradientBg ? 'hover:bg-white/10' : 'hover:bg-gray-100'}`}
        >
          <Image
            src={isGradientBg ? '/assets/chevron_white.svg' : '/assets/chevron.svg'}
            alt="Go back"
            width={24}
            height={24}
          />
        </button>
      )}
      <div>
        <Image
          src={isGradientBg ? '/assets/logo_white.png' : '/assets/logo.png'}
          alt="Logo"
          width={24}
          height={24}
          priority
        />
      </div>
    </div>
  );
}
