'use client';

import { CreditCard, Home, MapPin, Phone, User } from 'lucide-react';
import { DISTRICTS } from '@/lib/constants';
import { useAppState } from '@/components/providers/AppStateProvider';

export default function ProfileSetupScreen() {
  const { user, setUser } = useAppState();

  return (
    <div className="flex h-full flex-col overflow-y-auto bg-slate-50 p-6">
      <h2 className="mb-6 mt-8 text-3xl font-bold text-slate-800">Setup Profile</h2>

      <div className="mb-8 space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-600">Full Name</label>
          <div className="relative">
            <User className="absolute left-3 top-3.5 text-slate-400" size={20} />
            <input
              type="text"
              className="w-full rounded-xl border border-slate-200 bg-white p-3 pl-10 outline-none focus:border-emerald-500"
              placeholder="John Doe"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-600">Address</label>
          <div className="relative">
            <Home className="absolute left-3 top-3.5 text-slate-400" size={20} />
            <input
              type="text"
              className="w-full rounded-xl border border-slate-200 bg-white p-3 pl-10 outline-none focus:border-emerald-500"
              placeholder="House No, Street"
              value={user.address}
              onChange={(e) => setUser({ ...user, address: e.target.value })}
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-600">District</label>
          <select
            className="w-full appearance-none rounded-xl border border-slate-200 bg-white p-3 outline-none focus:border-emerald-500"
            value={user.district}
            onChange={(e) => setUser({ ...user, district: e.target.value })}
          >
            {DISTRICTS.map((district) => (
              <option key={district}>{district}</option>
            ))}
          </select>
        </div>

        <button className="flex w-full items-center justify-center space-x-2 rounded-xl border border-emerald-200 bg-emerald-50 p-3 font-medium text-emerald-600">
          <MapPin size={20} />
          <span>Use GPS to detect location</span>
        </button>

        <div className="border-t border-slate-200 pt-4">
          <label className="mb-3 block text-sm font-medium text-slate-600">
            Preferred Payment Method
          </label>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setUser({ ...user, paymentMethod: 'Bank Transfer' })}
              className={`flex flex-col items-center rounded-xl p-3 font-medium ${
                user.paymentMethod === 'Bank Transfer'
                  ? 'border-2 border-emerald-500 bg-emerald-50 text-emerald-700'
                  : 'border-2 border-slate-200 bg-white text-slate-600'
              }`}
            >
              <CreditCard className="mb-1" size={24} />
              Bank Acc.
            </button>

            <button
              onClick={() => setUser({ ...user, paymentMethod: 'Mobile Wallet' })}
              className={`flex flex-col items-center rounded-xl p-3 font-medium ${
                user.paymentMethod === 'Mobile Wallet'
                  ? 'border-2 border-emerald-500 bg-emerald-50 text-emerald-700'
                  : 'border-2 border-slate-200 bg-white text-slate-600'
              }`}
            >
              <Phone className="mb-1" size={24} />
              Mobile Wallet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}