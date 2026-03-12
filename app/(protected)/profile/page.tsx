'use client';

import ProfileSetupScreen from '@/components/screens/ProfileSetupScreen';
import ProfileTab from '@/components/screens/ProfileTab';
import { useState } from 'react';

export default function ProfilePage() {
  const [setupOpen, setSetupOpen] = useState(false);

  return (
    <div className="relative h-full">
      <ProfileTab />

      <button
        onClick={() => setSetupOpen(true)}
        className="absolute right-4 top-4 rounded-full bg-slate-900 px-4 py-2 text-sm font-bold text-white"
      >
        Edit
      </button>

      {setupOpen && (
        <div className="slide-up absolute inset-0 z-40 bg-slate-50">
          <div className="flex items-center justify-between border-b border-slate-200 bg-white p-4">
            <h2 className="text-xl font-bold text-slate-800">Edit Profile</h2>
            <button
              onClick={() => setSetupOpen(false)}
              className="rounded-full bg-slate-100 px-3 py-1 text-slate-600"
            >
              Close
            </button>
          </div>
          <ProfileSetupScreen />
        </div>
      )}
    </div>
  );
}