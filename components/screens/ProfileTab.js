'use client';

import {
  CreditCard,
  Globe,
  LogOut,
  MapPin,
  ChevronRight,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAppState } from '@/components/providers/AppStateProvider';

export default function ProfileTab() {
  const { user } = useAppState();
  const router = useRouter();

  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
    router.refresh();
  };

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 p-4 pb-24">
      <h2 className="mb-6 mt-2 text-2xl font-bold text-slate-800">Profile Settings</h2>

      <div className="mb-6 flex flex-col items-center rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
        <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-slate-200 text-4xl shadow-inner">
          👱‍♂️
        </div>
        <h3 className="text-xl font-bold text-slate-800">{user.name}</h3>
        <p className="text-slate-500">{user.phone || '+94 77 XXX XXXX'}</p>
      </div>

      <div className="mb-6 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 p-4 hover:bg-slate-50">
          <div className="flex items-center space-x-3">
            <MapPin className="text-slate-400" size={20} />
            <span className="font-medium text-slate-700">Address Details</span>
          </div>
          <ChevronRight className="text-slate-300" size={20} />
        </div>

        <div className="flex items-center justify-between border-b border-slate-100 p-4 hover:bg-slate-50">
          <div className="flex items-center space-x-3">
            <CreditCard className="text-slate-400" size={20} />
            <span className="font-medium text-slate-700">Payment Methods</span>
          </div>
          <ChevronRight className="text-slate-300" size={20} />
        </div>

        <div className="flex items-center justify-between p-4 hover:bg-slate-50">
          <div className="flex items-center space-x-3">
            <Globe className="text-slate-400" size={20} />
            <span className="font-medium text-slate-700">
              Language ({user.language})
            </span>
          </div>
          <ChevronRight className="text-slate-300" size={20} />
        </div>
      </div>

      <button
        onClick={logout}
        className="flex w-full items-center justify-center space-x-2 rounded-2xl border border-rose-100 bg-rose-50 p-4 font-bold text-rose-600"
      >
        <LogOut size={20} />
        <span>Logout</span>
      </button>
    </div>
  );
}