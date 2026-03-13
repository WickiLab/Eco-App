import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { ToastState } from '@/types/vending';

export default function ToastMessage({ toast }: { toast: ToastState | null }) {
  if (!toast) return null;

  return (
    <div
      className={`animate-in slide-in-from-top-4 fade-in absolute top-24 left-1/2 z-[60] flex -translate-x-1/2 items-center gap-3 rounded-full px-8 py-4 shadow-2xl ${
        toast.type === 'error' ? 'bg-red-500/95 text-white' : 'bg-green-500/95 text-white'
      }`}
    >
      {toast.type === 'error' ? <AlertCircle size={28} /> : <CheckCircle2 size={28} />}
      <span className="text-xl font-medium">{toast.message}</span>
    </div>
  );
}
