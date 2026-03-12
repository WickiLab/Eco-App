'use client';

import { Phone, Truck, X } from 'lucide-react';
import { useAppState } from '@/components/providers/AppStateProvider';

export default function TrackingScreen() {
  const { setSubScreen } = useAppState();

  return (
    <div className="slide-up absolute inset-0 z-50 flex flex-col bg-slate-50">
      <div className="flex items-center justify-between border-b border-slate-200 bg-white p-4">
        <h2 className="text-xl font-bold text-slate-800">Pickup Status</h2>
        <button
          onClick={() => setSubScreen(null)}
          className="rounded-full bg-slate-100 p-2 text-slate-500"
        >
          <X size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="mb-8 rounded-3xl border border-slate-100 bg-white p-6 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
            <Truck size={40} className="text-emerald-500" />
          </div>
          <h3 className="mb-1 text-2xl font-bold text-slate-800">Agent Assigned</h3>
          <p className="text-slate-500">Arriving in approx. 25 mins</p>
        </div>

        <div className="mb-8 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center space-x-4 border-b border-slate-100 pb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-200 text-xl">
              👨🏽‍🦱
            </div>

            <div>
              <p className="text-lg font-bold text-slate-800">Nimal Perera</p>
              <p className="text-sm text-slate-500">EcoCollect Agent</p>
            </div>

            <button className="ml-auto flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
              <Phone size={20} />
            </button>
          </div>

          <div className="relative space-y-8 pl-6 before:absolute before:inset-y-2 before:left-[11px] before:w-0.5 before:bg-slate-200">
            <div className="relative z-10 flex items-center font-bold text-emerald-600">
              <div className="absolute -left-[29px] flex h-6 w-6 items-center justify-center rounded-full border-4 border-white bg-emerald-500 shadow-sm" />
              <span>Request Accepted</span>
            </div>

            <div className="relative z-10 flex items-center font-bold text-slate-800">
              <div className="absolute -left-[29px] h-6 w-6 rounded-full border-4 border-emerald-500 bg-white shadow-sm" />
              <span>Agent on the Way</span>
            </div>

            <div className="relative z-10 flex items-center font-medium text-slate-400">
              <div className="absolute -left-[29px] h-6 w-6 rounded-full border-2 border-slate-300 bg-white" />
              <span>Arrived & Weighing</span>
            </div>

            <div className="relative z-10 flex items-center font-medium text-slate-400">
              <div className="absolute -left-[29px] h-6 w-6 rounded-full border-2 border-slate-300 bg-white" />
              <span>Payment Processing</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => setSubScreen(null)}
          className="w-full rounded-2xl bg-slate-900 p-4 font-bold text-white"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}