'use client';

import { X } from 'lucide-react';
import { PICKUP_TIME_SLOTS, PRICING } from '@/lib/constants';
import { useAppState } from '@/components/providers/AppStateProvider';

export default function RequestPickupScreen() {
  const {
    collection,
    totalCollectionValue,
    selectedPickupTime,
    setSelectedPickupTime,
    handleRequestPickup,
    setSubScreen,
  } = useAppState();

  return (
    <div className="slide-up absolute inset-0 z-50 flex flex-col bg-slate-50">
      <div className="flex items-center border-b border-slate-200 bg-white p-4">
        <button onClick={() => setSubScreen(null)} className="mr-2 text-slate-600">
          <X size={24} />
        </button>
        <h2 className="text-xl font-bold text-slate-800">Request Pickup</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="mb-6 rounded-3xl bg-slate-900 p-6 text-white shadow-lg">
          <p className="mb-1 font-medium text-slate-400">Total Estimated Value</p>
          <p className="mb-4 text-4xl font-extrabold text-amber-400">
            Rs. {totalCollectionValue}
          </p>

          <div className="mt-2 space-y-2 border-t border-slate-700 pt-4">
            {collection.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-slate-300">
                  {PRICING[item.category].name} x {item.quantity}
                </span>
                <span className="font-bold">Rs. {item.estimatedValue}</span>
              </div>
            ))}
          </div>
        </div>

        <h3 className="mb-3 text-lg font-bold text-slate-800">Preferred Pickup Time</h3>

        <div className="mb-8 space-y-3">
          {PICKUP_TIME_SLOTS.map((time) => (
            <label
              key={time}
              className="flex cursor-pointer items-center rounded-2xl border border-slate-200 bg-white p-4 transition-colors hover:border-emerald-500"
            >
              <input
                type="radio"
                name="time"
                className="h-5 w-5 border-slate-300 text-emerald-500 focus:ring-emerald-500"
                checked={selectedPickupTime === time}
                onChange={() => setSelectedPickupTime(time)}
              />
              <span className="ml-3 font-medium text-slate-700">{time}</span>
            </label>
          ))}
        </div>

        <button
          onClick={handleRequestPickup}
          className="w-full rounded-2xl bg-emerald-500 p-4 text-lg font-bold text-white shadow-lg transition-transform active:scale-95"
        >
          Confirm Request
        </button>
      </div>
    </div>
  );
}