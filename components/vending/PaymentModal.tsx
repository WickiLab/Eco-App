import { CheckCircle2, Plus, X } from 'lucide-react';
import { PaymentModalState, PaymentType, ProductWithCategory } from '@/types/vending';

interface Props {
  paymentModal: PaymentModalState;
  paymentProcessing: boolean;
  onClose: () => void;
  onInsertMoney: (amount: number) => void;
  onCompletePurchase: (item: ProductWithCategory, type: PaymentType, insertedAmount: number) => void;
  onProcessDigitalPayment: () => void;
}

export default function PaymentModal({ paymentModal, paymentProcessing, onClose, onInsertMoney, onCompletePurchase, onProcessDigitalPayment }: Props) {
  if (!paymentModal.isOpen || !paymentModal.type || !paymentModal.item) return null;

  const { type, item, insertedAmount } = paymentModal;
  const isReady = type === 'cash' ? insertedAmount >= item.price : true;

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 p-8 backdrop-blur-sm">
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-white/10 bg-slate-800 shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/5 bg-slate-900 p-6">
          <h3 className="text-2xl font-bold text-white">{type === 'cash' ? 'Insert Cash' : type === 'card' ? 'Tap Card' : 'Scan QR Code'}</h3>
          <button onClick={onClose} className="rounded-full bg-white/5 p-2 text-gray-400 hover:text-white"><X size={24} /></button>
        </div>

        <div className="flex flex-col items-center p-8">
          <div className="mb-8 flex w-full items-center gap-4 rounded-2xl border border-white/5 bg-black/30 p-4">
            <img src={item.image} alt={item.name} className="h-16 w-16 rounded-xl border border-white/10 object-cover" />
            <div className="flex-1">
              <div className="font-bold text-white">{item.name}</div>
              <div className="font-mono text-xl text-cyan-400">Rs {item.price}</div>
            </div>
          </div>

          {type === 'cash' && (
            <div className="flex w-full flex-col items-center">
              <div className="mb-8 text-center">
                <p className="mb-2 text-sm font-bold tracking-widest text-gray-400 uppercase">Total Inserted</p>
                <p className={`font-mono text-6xl font-bold ${insertedAmount >= item.price ? 'text-green-400' : 'text-white'}`}>Rs {insertedAmount}</p>
                {insertedAmount < item.price && <p className="mt-2 text-sm text-red-400">Need Rs {item.price - insertedAmount} more</p>}
              </div>

              <div className="mb-8 grid w-full grid-cols-2 gap-4">
                {[20, 50, 100, 500].map((amt) => (
                  <button key={amt} onClick={() => onInsertMoney(amt)} className="flex items-center justify-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-600/20 py-4 text-xl font-bold text-emerald-400 transition-colors hover:bg-emerald-600/40">
                    <Plus size={20} /> Rs {amt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {type === 'card' && <p className="mb-8 py-8 text-center font-mono text-5xl font-bold text-white">Tap card for Rs {item.price}</p>}
          {type === 'qr' && (
            <div className="mb-6 text-center">
              <div className="mb-6 rounded-2xl bg-white p-4">
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=vending-payment-simulation" alt="QR Code" className="h-48 w-48" />
              </div>
              <p className="font-mono text-2xl font-bold text-cyan-400">Rs {item.price}</p>
            </div>
          )}

          <button
            onClick={type === 'cash' ? () => onCompletePurchase(item, type, insertedAmount) : onProcessDigitalPayment}
            disabled={!isReady || paymentProcessing}
            className={`flex w-full items-center justify-center gap-3 rounded-2xl py-5 text-xl font-bold transition-all ${
              !isReady ? 'cursor-not-allowed bg-slate-700 text-gray-400' : 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:scale-[1.02]'
            }`}
          >
            {paymentProcessing ? <div className="h-6 w-6 animate-spin rounded-full border-4 border-white/30 border-t-white" /> : <><CheckCircle2 size={24} />{type === 'cash' ? 'Complete Payment' : 'Proceed to Payment'}</>}
          </button>
        </div>
      </div>
    </div>
  );
}
