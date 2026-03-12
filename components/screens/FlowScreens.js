'use client';

import { useEffect, useState } from 'react';
import {
  ArrowLeft,
  ScanLine,
  Camera,
  User,
  Phone,
  CheckCircle2,
} from 'lucide-react';

export function AddCategoryScreen({ prices, setTempData, goTo, switchTab }) {
  return (
    <div className="flex flex-col h-full bg-[#F5F7F8]">
      <div className="bg-white p-4 shadow-sm flex items-center">
        <button
          onClick={() => switchTab('HOME')}
          className="p-2 mr-2 bg-gray-50 rounded-full text-[#0F2A44]"
        >
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-xl font-bold text-[#0F2A44]">Choose Category</h2>
      </div>

      <div className="p-6 grid grid-cols-2 gap-4">
        {Object.entries(prices).map(([key, data]) => (
          <button
            key={key}
            onClick={() => {
              setTempData({ category: key, ...data });
              goTo('ADD_DETAIL');
            }}
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center space-y-3 hover:border-[#1DB954] hover:shadow-md transition-all"
          >
            <span className="text-4xl">{data.icon}</span>
            <span className="font-bold text-[#0F2A44] text-center">
              {data.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export function AddDetailScreen({ tempData, setCollection, switchTab, goTo }) {
  const [qty, setQty] = useState('');

  const { category, isCount, price, unit, label } = tempData || {};

  const handleAdd = () => {
    const numQty = parseFloat(qty);

    if (!Number.isFinite(numQty) || numQty <= 0 || !category) {
      return;
    }

    const newItem = {
      id: Date.now(),
      category,
      type: label,
      qty: numQty,
      value: isCount ? numQty * price : 0,
      unit,
      pendingWeight: !isCount,
    };

    setCollection((prev) => [...prev, newItem]);
    switchTab('COLLECTION');
  };

  if (!category) {
    return (
      <div className="flex flex-col h-full bg-[#F5F7F8]">
        <div className="bg-white p-4 shadow-sm flex items-center">
          <button
            onClick={() => goTo('ADD_CATEGORY')}
            className="p-2 mr-2 bg-gray-50 rounded-full text-[#0F2A44]"
          >
            <ArrowLeft size={24} />
          </button>
          <h2 className="text-xl font-bold text-[#0F2A44]">Add Item</h2>
        </div>

        <div className="p-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <p className="text-gray-500 mb-4">No category selected.</p>
            <button
              onClick={() => goTo('ADD_CATEGORY')}
              className="w-full bg-[#1DB954] text-white py-4 rounded-xl font-bold"
            >
              Back to Categories
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[#F5F7F8]">
      <div className="bg-white p-4 shadow-sm flex items-center">
        <button
          onClick={() => goTo('ADD_CATEGORY')}
          className="p-2 mr-2 bg-gray-50 rounded-full text-[#0F2A44]"
        >
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-xl font-bold text-[#0F2A44]">Add {category}</h2>
      </div>

      <div className="p-6 flex-1 overflow-y-auto">
        {isCount && (
          <div className="mb-8">
            <button
              onClick={() => goTo('SCANNER')}
              className="w-full bg-[#0F2A44] text-white py-4 rounded-xl font-bold flex items-center justify-center shadow-md mb-4"
            >
              <ScanLine className="mr-3" />
              Scan Barcode
            </button>

            <div className="flex items-center justify-center space-x-4 mb-4">
              <div className="h-px bg-gray-300 flex-1" />
              <span className="text-gray-400 font-bold text-sm">
                OR ENTER MANUALLY
              </span>
              <div className="h-px bg-gray-300 flex-1" />
            </div>
          </div>
        )}

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <label className="font-bold text-[#0F2A44] block mb-2">
            {isCount ? 'Quantity (Items)' : 'Estimated Weight (kg)'}
          </label>

          <input
            type="number"
            min="0"
            value={qty}
            onChange={(e) => setQty(e.target.value)}
            placeholder="e.g. 25"
            className="w-full border-2 border-gray-200 rounded-xl p-4 text-2xl font-bold text-center focus:border-[#1DB954] focus:outline-none mb-6"
          />

          {!isCount && (
            <div className="bg-orange-50 border border-orange-200 p-4 rounded-xl mb-6">
              <p className="text-orange-700 text-sm font-medium">
                Note: Final price will be calculated after our agent verifies the
                exact weight during pickup.
              </p>
            </div>
          )}

          {isCount && Number(qty) > 0 && (
            <div className="bg-green-50 p-4 rounded-xl text-center mb-6 border border-green-100">
              <p className="text-sm text-gray-500 font-bold mb-1">
                Estimated Value
              </p>
              <p className="text-3xl font-extrabold text-[#1DB954]">
                Rs. {Number(qty) * price}
              </p>
            </div>
          )}

          <button
            onClick={handleAdd}
            disabled={!qty || Number(qty) <= 0}
            className={`w-full py-4 rounded-xl text-lg font-bold shadow-md transition-colors ${
              Number(qty) > 0
                ? 'bg-[#1DB954] text-white'
                : 'bg-gray-200 text-gray-400'
            }`}
          >
            Add to Collection
          </button>
        </div>
      </div>
    </div>
  );
}

export function ScannerScreen({ setCollection, switchTab, goTo }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      setCollection((prev) => [
        ...prev,
        {
          id: Date.now(),
          category: 'Plastic',
          type: 'Coca Cola PET 1.5L',
          qty: 1,
          value: 2,
          unit: 'items',
          pendingWeight: false,
        },
      ]);
      switchTab('COLLECTION');
    }, 3000);

    return () => clearTimeout(timer);
  }, [setCollection, switchTab]);

  return (
    <div className="flex flex-col h-full bg-black relative">
      <div className="absolute top-0 left-0 w-full p-4 z-10 flex justify-between items-center text-white">
        <button
          onClick={() => goTo('ADD_DETAIL')}
          className="p-2 bg-black/50 rounded-full"
        >
          <ArrowLeft size={24} />
        </button>
        <span className="font-bold">Scan Barcode</span>
        <div className="w-10" />
      </div>

      <div className="flex-1 flex items-center justify-center relative">
        <Camera size={64} className="text-gray-700 opacity-50 absolute" />

        <div className="w-64 h-48 border-2 border-[#1DB954] rounded-lg relative overflow-hidden">
          <div className="w-full h-1 bg-red-500 absolute top-0 left-0 animate-[scan_2s_ease-in-out_infinite] shadow-[0_0_10px_red]" />
        </div>
      </div>

      <div className="bg-black/80 p-6 text-white text-center pb-12">
        <p className="font-medium text-lg">Align barcode inside the box</p>
        <p className="text-gray-400 mt-2 text-sm">Scanning automatically...</p>
      </div>
    </div>
  );
}

export function RequestPickupScreen({
  collection,
  totalEstimatedValue,
  setActivePickup,
  goTo,
  switchTab,
}) {
  const [time, setTime] = useState('Morning');

  const timeSlots = [
    { value: 'Morning', label: 'Morning (8am - 12pm)' },
    { value: 'Afternoon', label: 'Afternoon (12pm - 4pm)' },
    { value: 'Evening', label: 'Evening (4pm - 7pm)' },
  ];

  const handleRequest = () => {
    setActivePickup({
      id: `REQ-${Math.floor(Math.random() * 1000)}`,
      time,
      status: 'Assigned',
      agent: 'Nimal Perera',
      phone: '077 999 8888',
      value: totalEstimatedValue,
    });

    goTo('TRACKING');
  };

  return (
    <div className="flex flex-col h-full bg-[#F5F7F8]">
      <div className="bg-white p-4 shadow-sm flex items-center">
        <button
          onClick={() => switchTab('HOME')}
          className="p-2 mr-2 bg-gray-50 rounded-full text-[#0F2A44]"
        >
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-xl font-bold text-[#0F2A44]">Request Pickup</h2>
      </div>

      <div className="p-6 flex-1 overflow-y-auto">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 mb-6">
          <h3 className="font-bold text-[#0F2A44] mb-3 border-b border-gray-100 pb-2">
            Items Ready
          </h3>

          {collection.map((item) => (
            <div key={item.id} className="flex justify-between text-sm py-1">
              <span className="text-gray-600">
                {item.category} ({item.type})
              </span>
              <span className="font-medium text-[#0F2A44]">
                {item.qty} {item.unit}
              </span>
            </div>
          ))}

          <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center">
            <span className="font-bold text-gray-500">Estimated Value</span>
            <span className="font-extrabold text-[#1DB954] text-lg">
              Rs. {totalEstimatedValue}
            </span>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="font-bold text-[#0F2A44] mb-4">
            Preferred Pickup Time
          </h3>

          <div className="space-y-3">
            {timeSlots.map((slot) => (
              <label
                key={slot.value}
                className={`flex items-center p-4 rounded-xl border-2 transition-all ${
                  time === slot.value
                    ? 'border-[#1DB954] bg-green-50'
                    : 'border-gray-200 bg-white'
                }`}
              >
                <input
                  type="radio"
                  name="time"
                  checked={time === slot.value}
                  onChange={() => setTime(slot.value)}
                  className="w-5 h-5 text-[#1DB954] focus:ring-[#1DB954] border-gray-300"
                />
                <span className="ml-3 font-bold text-[#0F2A44]">
                  {slot.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        <button
          onClick={handleRequest}
          className="w-full bg-[#0F2A44] text-white py-4 rounded-xl text-lg font-bold shadow-md hover:bg-blue-900"
        >
          Confirm Pickup Request
        </button>
      </div>
    </div>
  );
}

export function TrackingScreen({
  activePickup,
  setBalance,
  setHistory,
  setCollection,
  setActivePickup,
  switchTab,
}) {
  const [step, setStep] = useState(1);

  const completePickup = () => {
    const pickupValue = activePickup?.value || 0;
    const pickupId = activePickup?.id?.split('-')[1] || '000';

    setBalance((prev) => prev + pickupValue);
    setHistory((prev) => [
      {
        id: pickupId,
        date: 'Just now',
        amount: pickupValue,
        status: 'Completed',
      },
      ...prev,
    ]);
    setCollection([]);
    setActivePickup(null);
    switchTab('WALLET');
  };

  return (
    <div className="flex flex-col h-full bg-[#F5F7F8]">
      <div className="bg-white p-4 shadow-sm flex items-center">
        <button
          onClick={() => switchTab('HOME')}
          className="p-2 mr-2 bg-gray-50 rounded-full text-[#0F2A44]"
        >
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-xl font-bold text-[#0F2A44]">Pickup Status</h2>
      </div>

      <div className="p-6 flex-1 overflow-y-auto">
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center mb-8">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mr-4">
            <User className="text-gray-500" size={32} />
          </div>

          <div className="flex-1">
            <p className="text-xs font-bold text-gray-400 uppercase">
              Agent Assigned
            </p>
            <h3 className="font-bold text-xl text-[#0F2A44]">
              {activePickup?.agent || 'Nimal Perera'}
            </h3>
            <p className="text-sm text-gray-500 flex items-center mt-1">
              <Phone size={14} className="mr-1" />
              {activePickup?.phone || '077 999 8888'}
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8 relative">
          <div className="absolute left-9 top-10 bottom-10 w-1 bg-gray-100 rounded-full z-0" />

          {[
            { num: 1, label: 'Agent Assigned' },
            { num: 2, label: 'On the Way', desc: 'Est. arrival: 25 mins' },
            { num: 3, label: 'Arrived at Location' },
            { num: 4, label: 'Collection Verified & Paid' },
          ].map((item) => (
            <div key={item.num} className="flex mb-6 last:mb-0 relative z-10">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 shadow-sm flex-shrink-0 transition-colors ${
                  step >= item.num
                    ? 'bg-[#1DB954] text-white'
                    : 'bg-gray-200 text-gray-400'
                }`}
              >
                {step > item.num ? <CheckCircle2 size={18} /> : item.num}
              </div>

              <div className="pt-1">
                <h4
                  className={`font-bold ${
                    step >= item.num ? 'text-[#0F2A44]' : 'text-gray-400'
                  }`}
                >
                  {item.label}
                </h4>

                {item.desc && step === item.num && (
                  <p className="text-sm text-[#1DB954] font-medium mt-1">
                    {item.desc}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 bg-orange-50 border border-orange-200 rounded-xl mt-auto">
          <p className="text-xs text-orange-600 font-bold mb-2 uppercase text-center">
            App Demo Controls
          </p>

          {step < 4 ? (
            <button
              onClick={() => setStep((prev) => prev + 1)}
              className="w-full bg-[#0F2A44] text-white py-3 rounded-lg font-bold shadow"
            >
              Simulate Next Status Update
            </button>
          ) : (
            <button
              onClick={completePickup}
              className="w-full bg-[#1DB954] text-white py-3 rounded-lg font-bold shadow"
            >
              Complete & Receive Payment
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export function WithdrawScreen({ balance, setBalance, switchTab }) {
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('Bank');

  const handleWithdraw = () => {
    const numAmt = parseFloat(amount);

    if (Number.isFinite(numAmt) && numAmt > 0 && numAmt <= balance) {
      setBalance((prev) => prev - numAmt);
      alert(`Successfully withdrew Rs. ${numAmt} to ${method}`);
      switchTab('WALLET');
    } else {
      alert('Invalid amount');
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#F5F7F8]">
      <div className="bg-white p-4 shadow-sm flex items-center">
        <button
          onClick={() => switchTab('WALLET')}
          className="p-2 mr-2 bg-gray-50 rounded-full text-[#0F2A44]"
        >
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-xl font-bold text-[#0F2A44]">Withdraw Funds</h2>
      </div>

      <div className="p-6">
        <div className="bg-[#0F2A44] text-white p-6 rounded-2xl mb-6 shadow-md">
          <p className="text-blue-200 text-sm mb-1">Available Balance</p>
          <h1 className="text-4xl font-bold">Rs. {balance}</h1>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-6">
          <label className="font-bold text-[#0F2A44] block mb-2">
            Withdraw Amount
          </label>

          <div className="flex items-center border-2 border-gray-200 rounded-xl p-4 focus-within:border-[#1DB954]">
            <span className="text-xl font-bold text-gray-400 mr-2">Rs.</span>
            <input
              type="number"
              min="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0"
              className="flex-1 text-2xl font-bold text-[#0F2A44] focus:outline-none"
            />
          </div>
        </div>

        <div className="mb-8">
          <h3 className="font-bold text-[#0F2A44] mb-3">Transfer To</h3>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setMethod('Bank')}
              className={`py-4 rounded-xl font-bold border-2 transition-all ${
                method === 'Bank'
                  ? 'border-[#1DB954] bg-green-50 text-[#1DB954]'
                  : 'border-gray-200 text-gray-500 bg-white'
              }`}
            >
              Bank Account
            </button>

            <button
              onClick={() => setMethod('Wallet')}
              className={`py-4 rounded-xl font-bold border-2 transition-all ${
                method === 'Wallet'
                  ? 'border-[#1DB954] bg-green-50 text-[#1DB954]'
                  : 'border-gray-200 text-gray-500 bg-white'
              }`}
            >
              Mobile Wallet
            </button>
          </div>
        </div>

        <button
          onClick={handleWithdraw}
          className="w-full bg-[#1DB954] text-white py-4 rounded-xl text-lg font-bold shadow-md hover:bg-green-600"
        >
          Confirm Withdrawal
        </button>
      </div>
    </div>
  );
}