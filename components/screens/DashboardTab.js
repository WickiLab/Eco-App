'use client';

import { CheckCircle2, Clock, Package, Plus, Truck, User } from 'lucide-react';
import { useAppState } from '@/components/providers/AppStateProvider';

export default function DashboardTab() {
  const { user, totalCollectionValue, totalItemsCount, setSubScreen } = useAppState();

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 p-4 pb-24">
      <div className="mb-6 mt-2 flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">Welcome back,</p>
          <h2 className="text-2xl font-bold text-slate-800">
            {user.name.split(' ')[0]} 👋
          </h2>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-emerald-200 bg-emerald-100">
          <User className="text-emerald-600" size={20} />
        </div>
      </div>

      <div className="relative mb-6 overflow-hidden rounded-3xl bg-slate-900 p-6 text-white shadow-xl">
        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white opacity-5 blur-xl" />

        <div className="relative z-10">
          <p className="mb-1 font-medium text-slate-300">Current Collection Value</p>
          <div className="mb-4 text-4xl font-extrabold text-amber-400">
            Rs. {totalCollectionValue}
          </div>

          <div className="inline-flex items-center space-x-2 rounded-full bg-slate-800 px-3 py-1 text-sm text-slate-200">
            <Package size={16} />
            <span>{totalItemsCount} Items Stored</span>
          </div>
        </div>
      </div>

      <div className="mb-8 grid grid-cols-2 gap-4">
        <button
          onClick={() => setSubScreen('ADD_CATEGORY')}
          className="flex flex-col items-center justify-center rounded-2xl bg-emerald-500 p-4 text-white shadow-lg shadow-emerald-200 transition-transform active:scale-95"
        >
          <div className="mb-2 rounded-full bg-white/20 p-2">
            <Plus size={24} />
          </div>
          <span className="font-bold">Add Item</span>
        </button>

        <button
          onClick={() => setSubScreen('REQUEST_PICKUP')}
          className="flex flex-col items-center justify-center rounded-2xl border-2 border-emerald-500 bg-white p-4 text-emerald-600 shadow-sm transition-transform active:scale-95"
        >
          <div className="mb-2 rounded-full bg-emerald-50 p-2">
            <Truck size={24} />
          </div>
          <span className="font-bold">Pickup</span>
        </button>
      </div>

      <h3 className="mb-4 text-lg font-bold text-slate-800">Recent Activity</h3>

      <div className="space-y-3">
        <div className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100">
              <CheckCircle2 className="text-emerald-500" size={20} />
            </div>

            <div>
              <p className="font-bold text-slate-800">Pickup Completed</p>
              <p className="text-xs text-slate-400">12 Jan 2026</p>
            </div>
          </div>

          <span className="font-bold text-emerald-600">+ Rs. 1,400</span>
        </div>

        <div className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100">
              <Clock className="text-amber-500" size={20} />
            </div>

            <div>
              <p className="font-bold text-slate-800">Pickup Scheduled</p>
              <p className="text-xs text-slate-400">Tomorrow, Morning</p>
            </div>
          </div>

          <span className="font-medium text-slate-500">Pending</span>
        </div>
      </div>
    </div>
  );
}