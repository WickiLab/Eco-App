'use client';

import { Leaf, Wallet } from 'lucide-react';
import { useAppState } from '../providers/AppStateProvider';

export default function AppTopHeader() {
  const { balance } = useAppState();

  return (
    <div className="bg-white border-b border-slate-200/80 shadow-sm">
      <div className="flex items-center justify-between px-4 sm:px-5 md:px-6 py-4 md:py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50">
            <Leaf size={32} className="text-emerald-500" strokeWidth={2.2} />
          </div>
          <span className="text-[2rem] leading-none font-extrabold tracking-[-0.03em] text-slate-800">
            EcoCollect
          </span>
        </div>

        <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-3 md:px-5 md:py-3.5 text-amber-700 shadow-sm">
          <Wallet size={24} strokeWidth={2.2} />
          <span className="text-2xl font-extrabold tracking-[-0.03em]">
            Rs. {balance}
          </span>
        </div>
      </div>
    </div>
  );
}