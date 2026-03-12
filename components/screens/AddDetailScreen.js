'use client';

import { AlertCircle, ChevronLeft, ScanLine } from 'lucide-react';
import { PRICING } from '@/lib/constants';
import { useAppState } from '@/components/providers/AppStateProvider';

export default function AddDetailScreen() {
  const {
    tempCategory,
    tempQuantity,
    setTempQuantity,
    setSubScreen,
    handleAddItem,
  } = useAppState();

  if (!tempCategory) return null;

  const data = PRICING[tempCategory];
  const isCountable = tempCategory === 'plastic' || tempCategory === 'glass';

  return (
    <div className="slide-up absolute inset-0 z-50 flex flex-col bg-slate-50">
      <div className="flex items-center border-b border-slate-200 bg-white p-4 shadow-sm">
        <button onClick={() => setSubScreen('ADD_CATEGORY')} className="mr-2 text-slate-600">
          <ChevronLeft size={28} />
        </button>
        <h2 className="text-xl font-bold text-slate-800">Add {data.name}</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {isCountable && (
          <div className="mb-8">
            <button
              onClick={() => setSubScreen('SCANNER')}
              className="flex w-full items-center justify-center space-x-3 rounded-2xl bg-slate-800 p-4 text-white shadow-md transition-transform active:scale-95"
            >
              <ScanLine size={24} />
              <span className="text-lg font-bold">Scan Barcode</span>
            </button>

            <div className="my-6 flex items-center">
              <div className="h-px flex-1 bg-slate-300" />
              <span className="px-4 text-sm font-bold text-slate-400">
                OR ENTER MANUALLY
              </span>
              <div className="h-px flex-1 bg-slate-300" />
            </div>
          </div>
        )}

        <div className="mb-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <label className="mb-4 block text-center text-lg font-bold text-slate-700">
            {isCountable ? 'How many items?' : 'Estimated weight (kg)?'}
          </label>

          <div className="flex items-center justify-center space-x-4">
            <button
              onClick={() => setTempQuantity(String(Math.max(1, Number(tempQuantity || 0) - 1)))}
              className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-2xl font-bold text-slate-600"
            >
              -
            </button>

            <input
              type="number"
              className="w-24 bg-transparent text-center text-4xl font-extrabold text-slate-800 outline-none"
              placeholder="0"
              value={tempQuantity}
              onChange={(e) => setTempQuantity(e.target.value)}
            />

            <button
              onClick={() => setTempQuantity(String(Number(tempQuantity || 0) + 1))}
              className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-2xl font-bold text-emerald-600"
            >
              +
            </button>
          </div>

          {!isCountable && (
            <p className="mt-4 flex items-start rounded-lg bg-amber-50 p-2 text-sm text-amber-600">
              <AlertCircle size={16} className="mr-2 mt-0.5 shrink-0" />
              Final price calculated after agent checks the exact weight.
            </p>
          )}
        </div>

        <div className="mb-8 flex items-center justify-between rounded-3xl bg-slate-900 p-6 text-white shadow-lg">
          <div>
            <p className="mb-1 text-sm font-medium text-slate-400">Estimated Value</p>
            <p className="text-3xl font-extrabold text-amber-400">
              Rs. {tempQuantity ? Number(tempQuantity) * data.rate : 0}
            </p>
          </div>

          <div className="text-right">
            <p className="text-sm text-slate-300">Rate</p>
            <p className="font-bold">
              Rs.{data.rate}/{data.unit}
            </p>
          </div>
        </div>

        <button
          onClick={handleAddItem}
          disabled={!tempQuantity || Number(tempQuantity) <= 0}
          className={`w-full rounded-2xl p-4 text-lg font-bold shadow-lg transition-all ${
            !tempQuantity || Number(tempQuantity) <= 0
              ? 'bg-slate-300 text-slate-500'
              : 'bg-emerald-500 text-white active:scale-95'
          }`}
        >
          Add to Collection
        </button>
      </div>
    </div>
  );
}