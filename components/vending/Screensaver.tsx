import { Play } from 'lucide-react';
import { formatSLSTTime } from '@/lib/vending/time';

interface Props {
  currentTime: Date;
  onStart: () => void;
}

export default function Screensaver({ currentTime, onStart }: Props) {
  return (
    <div className="group relative flex h-full w-full flex-1 flex-col items-center justify-end overflow-hidden bg-black pb-16">
      <video autoPlay loop muted playsInline className="absolute inset-0 h-full w-full object-cover opacity-60" src="https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />

      <div className="absolute top-12 right-12 text-right">
        <div className="text-5xl font-bold text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]">{formatSLSTTime(currentTime)}</div>
        <div className="text-xl font-bold tracking-[0.3em] text-cyan-400 uppercase drop-shadow-md">Sri Lanka Time</div>
      </div>

      <div className="relative z-10 flex flex-col items-center gap-8 px-8">
        <h1 className="text-center text-6xl leading-tight font-black tracking-tight text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
          Thirsty? <br />
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Grab a Drink.</span>
        </h1>
        <button onClick={onStart} className="animate-pulse rounded-full border border-white/30 bg-white/10 px-16 py-6 text-3xl font-bold text-white backdrop-blur-md transition-all hover:scale-105 hover:bg-white/20">
          <span className="flex items-center gap-4"><Play fill="currentColor" size={32} /> START</span>
        </button>
      </div>
    </div>
  );
}
