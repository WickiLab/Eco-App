import { Coins, CreditCard, QrCode } from 'lucide-react';
import { CategoryKey, PaymentType, ProductItem } from '@/types/vending';

interface Props {
  items: ProductItem[];
  category: CategoryKey;
  onPay: (item: ProductItem, category: CategoryKey, type: PaymentType) => void;
}

export default function ProductGrid({ items, category, onPay }: Props) {
  return (
    <div className="flex-1 overflow-y-auto p-8">
      <div className="mx-auto grid max-w-4xl grid-cols-2 gap-6">
        {items.map((item) => (
          <div key={item.id} className="group flex flex-col rounded-[2rem] border border-white/10 bg-slate-800/80 p-6 shadow-xl">
            <div className="mb-6 flex items-start gap-4">
              <img src={item.image} alt={item.name} className="h-28 w-28 rounded-2xl border border-white/10 bg-slate-700 object-cover shadow-inner" />
              <div className="flex-1">
                <div className="mb-2 inline-block rounded-lg border border-white/5 bg-slate-900 px-3 py-1 font-mono text-xs font-bold text-gray-300">{item.id}</div>
                <div className="text-xl leading-tight font-bold text-white">{item.name}</div>
                <div className="mt-2 font-mono text-2xl font-bold text-cyan-400">Rs {item.price}</div>
              </div>
            </div>

            <div className="mt-auto grid grid-cols-3 gap-2">
              <button onClick={() => onPay(item, category, 'cash')} className="flex items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-600/20 py-3 text-emerald-400 transition-colors hover:bg-emerald-600 hover:text-white"><Coins size={20} /></button>
              <button onClick={() => onPay(item, category, 'card')} className="flex items-center justify-center rounded-xl border border-blue-500/30 bg-blue-600/20 py-3 text-blue-400 transition-colors hover:bg-blue-600 hover:text-white"><CreditCard size={20} /></button>
              <button onClick={() => onPay(item, category, 'qr')} className="flex items-center justify-center rounded-xl border border-purple-500/30 bg-purple-600/20 py-3 text-purple-400 transition-colors hover:bg-purple-600 hover:text-white"><QrCode size={20} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
