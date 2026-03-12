'use client';

import { CheckCircle2, ChevronRight, Globe } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/components/providers/LanguageProvider';
import type { Language } from '@/types/app';

const LANGUAGES: { label: string; value: Language; flag: string }[] = [
  { label: 'Sinhala', value: 'Sinhala', flag: '🇱🇰' },
  { label: 'Tamil', value: 'Tamil', flag: '🇱🇰' },
  { label: 'English', value: 'English', flag: '🇬🇧' },
];

export default function LanguageScreen() {
  const router = useRouter();
  const { language, setLanguage } = useLanguage();

  const handleSelect = (value: Language) => {
    setLanguage(value);
    router.push('/login');
  };

  return (
    <div className="flex h-full min-h-screen flex-col bg-slate-50 p-6">
      <div className="flex flex-1 flex-col items-center justify-center">
        <Globe size={48} className="mb-6 text-emerald-500" />
        <h2 className="mb-8 text-2xl font-bold text-slate-800">
          Choose Language
        </h2>

        <div className="w-full space-y-4">
          {LANGUAGES.map((item) => {
            const active = language === item.value;

            return (
              <button
                key={item.value}
                onClick={() => handleSelect(item.value)}
                className={`flex w-full items-center justify-between rounded-2xl border-2 p-4 text-lg transition-colors ${
                  active
                    ? 'border-emerald-500 bg-emerald-50 font-bold text-emerald-700'
                    : 'border-slate-200 bg-white font-medium hover:border-emerald-500 hover:bg-emerald-50'
                }`}
              >
                <span>
                  {item.flag} {item.label}
                </span>

                {active ? (
                  <CheckCircle2 className="text-emerald-500" />
                ) : (
                  <ChevronRight className="text-slate-400" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}