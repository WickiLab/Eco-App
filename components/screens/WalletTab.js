'use client';

import { Banknote } from 'lucide-react';
import { useAppState } from '@/components/providers/AppStateProvider';

export default function WalletTab() {
  const { user, history, setSubScreen } = useAppState();

  return (
    <div className="flex flex-1 flex-col overflow-y-auto bg-[#F5F7F8] pb-24">
      <div className="rounded-b-[40px] bg-[#0F2A44] p-6 pb-12 text-center text-white shadow-lg">
        <h1 className="mb-6 text-xl font-medium opacity-90">Wallet Balance</h1>

        <div className="mb-8 text-5xl font-bold text-[#F5B400]">
          Rs. {user.walletBalance}
        </div>

        <button
          onClick={() => setSubScreen('WITHDRAW')}
          className="inline-block rounded-xl bg-[#1DB954] px-6 py-3 font-bold text-white"
        >
          Withdraw
        </button>
      </div>

      <div className="-mt-8 z-10 p-6">
        <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
          <h2 className="mb-4 text-lg font-bold text-[#0F2A44]">Transactions</h2>

          {history.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border-b border-gray-50 py-3 last:border-0"
            >
              <div className="flex items-center">
                <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-green-50 text-[#1DB954]">
                  <Banknote size={20} />
                </div>

                <div>
                  <h4 className="font-bold text-[#0F2A44]">
                    {item.amount >= 0
                      ? `Pickup #${item.id}`
                      : `Withdrawal #${item.id.toString().replace('W-', '')}`}
                  </h4>
                  <p className="text-xs text-gray-500">{item.date}</p>
                </div>
              </div>

              <span
                className={`font-bold ${
                  item.amount >= 0 ? 'text-[#1DB954]' : 'text-[#0F2A44]'
                }`}
              >
                {item.amount >= 0 ? '+' : '-'} Rs. {Math.abs(item.amount)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}