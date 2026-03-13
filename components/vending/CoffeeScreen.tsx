import { Coffee, Minus, Plus } from 'lucide-react';
import { INVENTORY } from '@/lib/vending/inventory';
import { CategoryKey, PaymentType, ProductItem } from '@/types/vending';
import ProductGrid from './ProductGrid';

interface Props {
  sugarLevel: number;
  setSugarLevel: (value: number) => void;
  onPay: (item: ProductItem, category: CategoryKey, type: PaymentType) => void;
}

export default function CoffeeScreen({ sugarLevel, setSugarLevel, onPay }: Props) {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col overflow-y-auto p-8">
      <div className="mb-8 flex items-center justify-between rounded-[2rem] border border-white/10 bg-slate-800/80 p-6 shadow-xl">
        <span className="flex items-center gap-3 text-2xl font-bold text-white"><Coffee className="text-amber-400" /> Sugar Level</span>
        <div className="flex items-center gap-6">
          <button onClick={() => setSugarLevel(Math.max(0, sugarLevel - 1))} className="flex h-14 w-14 items-center justify-center rounded-full border border-white/5 bg-slate-700 text-white transition-colors hover:bg-slate-600"><Minus size={28} /></button>
          <div className="flex gap-2">
            {[1, 2, 3, 4].map((level) => (
              <div key={level} className={`h-4 w-8 rounded-full transition-colors ${level <= sugarLevel ? 'bg-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.5)]' : 'bg-slate-700'}`} />
            ))}
          </div>
          <button onClick={() => setSugarLevel(Math.min(4, sugarLevel + 1))} className="flex h-14 w-14 items-center justify-center rounded-full border border-white/5 bg-slate-700 text-white transition-colors hover:bg-slate-600"><Plus size={28} /></button>
        </div>
      </div>

      <ProductGrid
        items={INVENTORY.coffee.map((item) => ({ ...item, name: `${item.name} (Sugar: ${sugarLevel})` }))}
        category="coffee"
        onPay={onPay}
      />
    </div>
  );
}
