import { Delete, PhoneCall } from 'lucide-react';
import { formatDuration } from '@/lib/vending/time';

interface Props {
  dialedNumber: string;
  phoneActive: boolean;
  callDuration: number;
  onDial: (digit: string) => void;
  onStartCall: () => void;
  onEndCall: () => void;
  onBackspace: () => void;
}

export default function PhoneScreen({ dialedNumber, phoneActive, callDuration, onDial, onStartCall, onEndCall, onBackspace }: Props) {
  return (
    <div className="mx-auto flex w-full max-w-md flex-1 flex-col items-center justify-center p-8">
      <div className="w-full rounded-[3rem] border border-white/10 bg-slate-800/80 p-8 shadow-2xl">
        <div className="relative mb-8 flex min-h-[140px] flex-col justify-center overflow-hidden rounded-2xl border border-white/5 bg-black/40 p-6 text-center">
          {phoneActive ? (
            <div className="animate-pulse">
              <div className="mb-2 text-xl font-medium text-green-400">Calling...</div>
              <div className="mb-2 font-mono text-3xl tracking-widest text-white">{dialedNumber}</div>
              <div className="text-lg text-gray-400">{formatDuration(callDuration)}</div>
            </div>
          ) : (
            <>
              <div className="mb-3 text-sm text-gray-400">Insert Coin to Start Call<br />Rs 10 = 1 minute</div>
              <div className="min-h-[40px] font-mono text-4xl tracking-widest text-white">{dialedNumber || 'Dial Number'}</div>
            </>
          )}
        </div>

        <div className="mb-8 grid grid-cols-3 gap-4">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'].map((key) => (
            <button key={key} onClick={() => onDial(key)} disabled={phoneActive} className="aspect-square rounded-full border border-white/5 bg-white/5 text-3xl font-medium text-white transition-colors hover:bg-white/15 disabled:opacity-50">
              {key}
            </button>
          ))}
        </div>

        <div className="flex gap-4">
          {!phoneActive ? (
            <button onClick={onStartCall} className="flex flex-1 items-center justify-center gap-3 rounded-full bg-green-600 py-5 text-2xl font-bold text-white shadow-lg shadow-green-600/20 transition-colors hover:bg-green-500"><PhoneCall size={28} /> CALL</button>
          ) : (
            <button onClick={onEndCall} className="flex flex-1 items-center justify-center gap-3 rounded-full bg-red-600 py-5 text-2xl font-bold text-white shadow-lg shadow-red-600/20 transition-colors hover:bg-red-500"><PhoneCall size={28} className="rotate-[135deg]" /> END</button>
          )}

          {!phoneActive && dialedNumber.length > 0 && (
            <button onClick={onBackspace} className="rounded-full bg-slate-700 px-6 text-white transition-colors hover:bg-slate-600"><Delete size={28} /></button>
          )}
        </div>
      </div>
    </div>
  );
}
