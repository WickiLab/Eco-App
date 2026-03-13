import { ArrowLeft } from 'lucide-react';
import { Screen } from '@/types/vending';
import { formatSLSTTime } from '@/lib/vending/time';

interface Props {
  currentScreen: Screen;
  title: string;
  currentTime: Date;
  onBack: () => void;
}

export default function TopBar({ currentScreen, title, currentTime, onBack }: Props) {
  const hideBack = ['categories', 'screensaver', 'dispensing', 'thankYou'].includes(currentScreen);

  return (
    <div className="relative z-20 flex shrink-0 items-center justify-between border-b border-white/10 bg-slate-900/90 px-8 py-6 backdrop-blur-md">
      <div className="w-[140px]">
        {!hideBack && (
          <button onClick={onBack} className="flex items-center gap-2 rounded-full bg-white/10 px-5 py-3 text-lg font-medium text-white transition-all hover:bg-white/20">
            <ArrowLeft size={24} /> Back
          </button>
        )}
      </div>
      <h1 className="flex-1 text-center text-2xl font-bold tracking-widest text-white uppercase">{title}</h1>
      <div className="flex w-[140px] flex-col items-end">
        <span className="font-mono text-2xl font-bold text-cyan-400 drop-shadow-lg">{formatSLSTTime(currentTime)}</span>
        <span className="text-xs font-bold tracking-widest text-gray-400 uppercase">SLST</span>
      </div>
    </div>
  );
}
