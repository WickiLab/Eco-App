import { Coffee, Cookie, CupSoda, GlassWater, Phone } from 'lucide-react';
import { Screen } from '@/types/vending';

interface Props {
  onSelect: (screen: Screen) => void;
}

const categories = [
  { key: 'snacks', label: 'Snacks & Biscuits', Icon: Cookie, color: 'from-amber-600 to-orange-600' },
  { key: 'coldDrinks', label: 'Cold Drinks', Icon: CupSoda, color: 'from-blue-600 to-cyan-600' },
  { key: 'coffee', label: 'Hot Coffee', Icon: Coffee, color: 'from-stone-700 to-stone-800' },
  { key: 'freshDrinks', label: 'Fresh Drinks', Icon: GlassWater, color: 'from-emerald-600 to-teal-600' },
  { key: 'phone', label: 'Public Phone', Icon: Phone, color: 'from-purple-600 to-pink-600' },
] as const;

export default function CategoryMenu({ onSelect }: Props) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 overflow-y-auto p-8">
      {categories.map(({ key, label, Icon, color }) => (
        <button key={key} onClick={() => onSelect(key)} className={`w-full max-w-2xl rounded-[2rem] border border-white/10 bg-gradient-to-r ${color} p-8 shadow-2xl transition-transform hover:scale-[1.02]`}>
          <span className="flex items-center gap-8">
            <span className="rounded-2xl bg-black/20 p-6 backdrop-blur-sm"><Icon size={64} className="text-white" /></span>
            <span className="flex-1 text-left text-4xl font-bold tracking-wide text-white">{label}</span>
          </span>
        </button>
      ))}
    </div>
  );
}
