import { Coins, CreditCard, QrCode } from 'lucide-react';
import { Screen } from '@/types/vending';

export default function FooterBar({ screen, credit }: { screen: Screen; credit: number }) {
  if (['screensaver', 'dispensing', 'thankYou'].includes(screen)) return null;

  return (
    <div className="z-10 mt-auto flex shrink-0 items-center justify-between border-t border-white/10 bg-slate-950 p-6">
      <div className="flex items-center gap-8 pl-4">
        <span className="text-sm font-medium tracking-widest text-gray-400 uppercase">Supported Payments</span>
        <div className="flex items-center gap-2 text-emerald-400"><Coins size={24} /> Cash</div>
        <div className="flex items-center gap-2 text-blue-400"><CreditCard size={24} /> Card</div>
        <div className="flex items-center gap-2 text-purple-400"><QrCode size={24} /> QR</div>
      </div>
      {credit > 0 && (
        <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-slate-900 px-6 py-3">
          <span className="font-medium text-gray-400">Balance</span>
          <span className="font-mono text-3xl font-bold text-green-400">Rs {credit}</span>
        </div>
      )}
    </div>
  );
}
