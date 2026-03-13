import { CheckCircle2 } from 'lucide-react';
import { ProductWithCategory } from '@/types/vending';

interface Props {
  selectedItem: ProductWithCategory | null;
  progress: number;
  message: string;
}

export default function DispenseScreen({ selectedItem, progress, message }: Props) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-slate-900 p-12">
      <div className="flex w-full max-w-2xl flex-col items-center rounded-[3rem] border border-white/10 bg-slate-800/80 p-12 text-center shadow-2xl">
        <div className="relative mb-12 flex items-center justify-center">
          <div className="absolute h-64 w-64 animate-ping rounded-full bg-cyan-500/20" />
          <div className="absolute h-48 w-48 animate-pulse rounded-full bg-cyan-500/40" />
          <div className="relative z-10 overflow-hidden rounded-full border border-white/10 bg-slate-900 p-4 shadow-2xl">
            {selectedItem?.image ? (
              <img src={selectedItem.image} alt={selectedItem.name} className="h-40 w-40 rounded-full object-cover" />
            ) : (
              <div className="flex h-40 w-40 items-center justify-center"><CheckCircle2 size={64} className="text-cyan-400" /></div>
            )}
          </div>
        </div>

        <h2 className="mb-4 text-4xl font-bold text-white">Preparing Order</h2>
        <p className="mb-12 text-2xl font-medium text-cyan-400">{selectedItem?.name}</p>

        <div className="relative mb-4 h-8 w-full overflow-hidden rounded-full border border-white/5 bg-slate-900 shadow-inner">
          <div className="relative h-full bg-gradient-to-r from-cyan-600 to-cyan-400 transition-all duration-300 ease-out" style={{ width: `${progress}%` }}>
            <div className="absolute inset-0 animate-pulse bg-white/20" />
          </div>
        </div>

        <div className="flex w-full justify-between font-mono text-xl text-gray-400">
          <span>{message}</span>
          <span>{progress}%</span>
        </div>
      </div>
    </div>
  );
}
