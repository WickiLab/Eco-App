'use client';

import { useEffect } from 'react';
import { Box, ChevronRight, MapPin } from 'lucide-react';

export function SplashScreen({ goTo }) {
  useEffect(() => {
    const timer = setTimeout(() => goTo('LANGUAGE'), 2500);
    return () => clearTimeout(timer);
  }, [goTo]);

  return (
    <div className="flex flex-col items-center justify-center h-full bg-[#1DB954] text-white">
      <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 shadow-lg animate-bounce">
        <Box size={48} color="#1DB954" />
      </div>
      <h1 className="text-4xl font-bold mb-2">EcoCollect</h1>
      <p className="text-lg opacity-90">Turn Waste Into Value</p>
      <div className="mt-12 flex space-x-2">
        <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
        <div className="w-3 h-3 bg-white rounded-full animate-pulse delay-75" />
        <div className="w-3 h-3 bg-white rounded-full animate-pulse delay-150" />
      </div>
    </div>
  );
}

export function LanguageScreen({ t, setLang, goTo }) {
  return (
    <div className="flex flex-col h-full bg-[#F5F7F8] p-6">
      <div className="flex-1 flex flex-col justify-center">
        <h2 className="text-2xl font-bold text-center text-[#0F2A44] mb-8">
          {t.chooseLang}
        </h2>

        <div className="space-y-4">
          {[
            { id: 'si', label: 'සිංහල', flag: '🇱🇰' },
            { id: 'ta', label: 'தமிழ்', flag: '🇱🇰' },
            { id: 'en', label: 'English', flag: '🇬🇧' },
          ].map((language) => (
            <button
              key={language.id}
              onClick={() => {
                setLang(language.id);
                goTo('LOGIN');
              }}
              className="w-full flex items-center justify-between p-5 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-[#1DB954] transition-all"
            >
              <span className="text-2xl">{language.flag}</span>
              <span className="text-xl font-medium text-[#0F2A44]">
                {language.label}
              </span>
              <ChevronRight color="#0F2A44" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function LoginScreen({ t, user, setUser, goTo }) {
  return (
    <div className="flex flex-col h-full bg-[#F5F7F8] p-6">
      <div className="flex-1 flex flex-col justify-center">
        <h2 className="text-3xl font-bold text-[#0F2A44] mb-2">{t.welcome}</h2>
        <p className="text-gray-500 mb-8">{t.enterMobile}</p>

        <div className="flex bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
          <div className="bg-gray-100 px-4 py-4 border-r border-gray-200 flex items-center font-bold text-[#0F2A44]">
            +94
          </div>
          <input
            type="tel"
            placeholder="77 123 4567"
            className="flex-1 px-4 py-4 outline-none text-lg text-[#0F2A44]"
            value={user.phone}
            onChange={(e) =>
              setUser((prev) => ({ ...prev, phone: e.target.value }))
            }
          />
        </div>

        <button
          onClick={() => goTo('OTP')}
          className="w-full bg-[#1DB954] text-white py-4 rounded-xl text-lg font-bold shadow-md hover:bg-green-600 transition-colors"
        >
          {t.continue}
        </button>

        <p className="text-center text-xs text-gray-400 mt-6">
          By continuing you agree to our Terms &amp; Privacy Policy
        </p>
      </div>
    </div>
  );
}

export function OTPScreen({ t, goTo }) {
  return (
    <div className="flex flex-col h-full bg-[#F5F7F8] p-6">
      <div className="flex-1 flex flex-col justify-center">
        <h2 className="text-2xl font-bold text-[#0F2A44] mb-2">{t.verify}</h2>
        <p className="text-gray-500 mb-8">
          Enter the 6-digit code sent to your phone
        </p>

        <div className="flex justify-between mb-8">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <input
              key={item}
              type="text"
              maxLength="1"
              defaultValue="0"
              className="w-12 h-14 bg-white border border-gray-200 rounded-lg text-center text-2xl font-bold text-[#0F2A44] focus:border-[#1DB954] focus:outline-none"
            />
          ))}
        </div>

        <button
          onClick={() => goTo('PROFILE_SETUP')}
          className="w-full bg-[#1DB954] text-white py-4 rounded-xl text-lg font-bold shadow-md hover:bg-green-600"
        >
          Verify Code
        </button>

        <button className="text-[#1DB954] font-medium mt-6 text-center w-full">
          Resend Code
        </button>
      </div>
    </div>
  );
}

export function ProfileSetupScreen({ user, setUser, switchTab }) {
  return (
    <div className="flex flex-col h-full bg-[#F5F7F8]">
      <div className="bg-[#0F2A44] text-white p-6 pb-12 rounded-b-[40px] shadow-lg">
        <h2 className="text-2xl font-bold">Setup Profile</h2>
        <p className="text-blue-200 text-sm mt-1">Let&apos;s get you ready to earn</p>
      </div>

      <div className="flex-1 p-6 -mt-8 overflow-y-auto">
        <div className="bg-white p-6 rounded-2xl shadow-sm space-y-4">
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase">
              Full Name
            </label>
            <input
              type="text"
              value={user.name}
              onChange={(e) =>
                setUser((prev) => ({ ...prev, name: e.target.value }))
              }
              className="w-full mt-1 pb-2 border-b-2 border-gray-100 outline-none focus:border-[#1DB954] text-[#0F2A44] text-lg font-medium"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-gray-500 uppercase">
              Address
            </label>
            <input
              type="text"
              value={user.address}
              onChange={(e) =>
                setUser((prev) => ({ ...prev, address: e.target.value }))
              }
              className="w-full mt-1 pb-2 border-b-2 border-gray-100 outline-none focus:border-[#1DB954] text-[#0F2A44] text-lg font-medium"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-gray-500 uppercase">
              District
            </label>
            <select
              value={user.district}
              onChange={(e) =>
                setUser((prev) => ({ ...prev, district: e.target.value }))
              }
              className="w-full mt-1 pb-2 border-b-2 border-gray-100 outline-none focus:border-[#1DB954] text-[#0F2A44] text-lg font-medium bg-transparent"
            >
              <option>Colombo</option>
              <option>Gampaha</option>
              <option>Kandy</option>
            </select>
          </div>

          <button className="flex items-center text-[#1DB954] text-sm font-bold bg-green-50 px-3 py-2 rounded-lg">
            <MapPin size={16} className="mr-2" />
            Use GPS Location
          </button>

          <div className="pt-4">
            <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">
              Receive Payments Via
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() =>
                  setUser((prev) => ({ ...prev, paymentMethod: 'Bank Account' }))
                }
                className={`font-bold py-3 rounded-xl border-2 ${
                  user.paymentMethod === 'Bank Account'
                    ? 'border-[#1DB954] bg-green-50 text-[#1DB954]'
                    : 'border-gray-100 text-gray-400'
                }`}
              >
                Bank Transfer
              </button>

              <button
                onClick={() =>
                  setUser((prev) => ({ ...prev, paymentMethod: 'Mobile Wallet' }))
                }
                className={`font-bold py-3 rounded-xl border-2 ${
                  user.paymentMethod === 'Mobile Wallet'
                    ? 'border-[#1DB954] bg-green-50 text-[#1DB954]'
                    : 'border-gray-100 text-gray-400'
                }`}
              >
                Mobile Wallet
              </button>
            </div>
          </div>
        </div>

        <button
          onClick={() => switchTab('HOME')}
          className="w-full bg-[#1DB954] text-white py-4 rounded-xl text-lg font-bold shadow-md mt-6 hover:bg-green-600"
        >
          Save Profile
        </button>
      </div>
    </div>
  );
}