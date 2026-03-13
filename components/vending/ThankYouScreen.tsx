import { CheckCircle2 } from 'lucide-react';

export default function ThankYouScreen({ itemName }: { itemName?: string }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-gradient-to-b from-green-900/40 to-slate-900 p-12">
      <div className="animate-in zoom-in-95 duration-500 flex w-full max-w-2xl flex-col items-center rounded-[3rem] border border-green-500/30 bg-slate-800/80 p-16 text-center shadow-[0_0_50px_rgba(34,197,94,0.2)]">
        <CheckCircle2 size={120} className="mb-8 animate-bounce text-green-400" />
        <h2 className="mb-6 text-6xl font-black tracking-tight text-white">Thank You!</h2>
        <p className="mb-2 text-2xl text-gray-300">Please collect your item below.</p>
        <p className="text-xl font-medium text-green-400">Enjoy your {itemName}!</p>
      </div>
    </div>
  );
}
