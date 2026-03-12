'use client';

import { Leaf } from 'lucide-react';

export default function SplashScreen() {
  return (
    <div className="flex h-full min-h-screen flex-col items-center justify-center bg-emerald-500 text-white">
      <div className="mb-4 animate-bounce rounded-full bg-white p-4">
        <Leaf size={64} className="text-emerald-500" />
      </div>
      <h1 className="mb-2 text-4xl font-bold">EcoCollect</h1>
      <p className="text-lg text-emerald-100">Turn Waste Into Value</p>

      <div className="absolute bottom-10 flex items-center space-x-2 text-emerald-100">
        <div className="h-5 w-5 animate-spin rounded-full border-4 border-white border-t-transparent" />
        <span>Loading...</span>
      </div>
    </div>
  );
}