'use client';

import { Home, Package, Settings, Wallet } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/home', label: 'Home', icon: Home },
  { href: '/collection', label: 'Collection', icon: Package },
  { href: '/wallet', label: 'Wallet', icon: Wallet },
  { href: '/profile', label: 'Profile', icon: Settings },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <div className="absolute bottom-0 z-20 flex w-full justify-around border-t border-slate-200 bg-white px-2 pb-6 pt-3">
      {navItems.map((item) => {
        const active = pathname === item.href;
        const Icon = item.icon;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center ${
              active ? 'text-emerald-500' : 'text-slate-400'
            }`}
          >
            <Icon size={24} className="mb-1" />
            <span className="text-[10px] font-bold">{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
}