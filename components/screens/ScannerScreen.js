'use client';

import { Camera, X } from 'lucide-react';
import { useAppState } from '@/components/providers/AppStateProvider';

export default function ScannerScreen() {
  const { setSubScreen, setTempQuantity } = useAppState();

  return (
    <div className="absolute inset-0 z-50 flex flex-col bg-black">
      <div className="z-10 flex items-center justify-between p-4 text-white">
        <button onClick={() => setSubScreen('ADD_DETAILS')} className="p-2">
          <X size={28} />
        </button>

        <span className="text-lg font-bold">Scan Barcode</span>
        <div className="w-8" />
      </div>

      <div className="relative flex flex-1 items-center justify-center">
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900 opacity-80">
          <Camera size={64} className="mb-4 text-slate-600" />
          <p className="text-slate-400">Camera preview active...</p>
        </div>

        <div className="relative z-10 h-64 w-64 rounded-3xl border-4 border-emerald-500">
          <div className="absolute top-0 left-0 h-1 w-full animate-[scan_2s_ease-in-out_infinite] bg-emerald-400" />
        </div>
      </div>

      <div className="z-10 rounded-t-3xl bg-white p-6">
        <h3 className="mb-2 text-center text-xl font-bold text-slate-800">
          Align barcode inside box
        </h3>
        <p className="mb-6 text-center text-slate-500">
          Scanning automatically adds the item type and value.
        </p>

        <button
          onClick={() => {
            setTempQuantity('1');
            setSubScreen('ADD_DETAILS');
          }}
          className="w-full rounded-2xl bg-emerald-500 p-4 text-lg font-bold text-white shadow-lg transition-transform active:scale-95"
        >
          Mock: Simulate Scan Success
        </button>
      </div>
    </div>
  );
}