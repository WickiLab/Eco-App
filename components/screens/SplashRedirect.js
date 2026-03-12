'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Leaf } from 'lucide-react';
import MobileFrame from '../app/MobileFrame';

export default function SplashRedirect({ nextPath }: { nextPath: string }) {
  const router = useRouter();

  useEffect(() => {
    const timer = window.setTimeout(() => {
      router.replace(nextPath);
    }, 4000);

    return () => window.clearTimeout(timer);
  }, [nextPath, router]);

  return (
    <MobileFrame>
      <div className="h-full w-full bg-[#21B67A] flex flex-col items-center justify-center text-white">
        <div className="w-40 h-40 bg-white/90 rounded-full flex items-center justify-center shadow-lg mb-10">
          <Leaf size={82} className="text-[#21B67A]" strokeWidth={2.4} />
        </div>

        <h1 className="text-[56px] leading-none font-extrabold tracking-tight mb-5">
          EcoCollect
        </h1>
        <p className="text-[30px] text-white/80 font-medium">
          Turn Waste Into Value
        </p>
      </div>
    </MobileFrame>
  );
}