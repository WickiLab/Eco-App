'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { INVENTORY } from '@/lib/vending/inventory';
import {
  CategoryKey,
  PaymentModalState,
  PaymentType,
  ProductItem,
  ProductWithCategory,
  Screen,
  ToastState,
} from '@/types/vending';

const EMPTY_PAYMENT_MODAL: PaymentModalState = {
  isOpen: false,
  type: null,
  item: null,
  insertedAmount: 0,
};

export const useVendingMachine = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('screensaver');
  const [credit, setCredit] = useState(0);
  const [toast, setToast] = useState<ToastState | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  const [paymentModal, setPaymentModal] = useState<PaymentModalState>(EMPTY_PAYMENT_MODAL);
  const [paymentProcessing, setPaymentProcessing] = useState(false);

  const [selectedItem, setSelectedItem] = useState<ProductWithCategory | null>(null);
  const [dispenseProgress, setDispenseProgress] = useState(0);
  const [dispenseMessage, setDispenseMessage] = useState('');

  const [sugarLevel, setSugarLevel] = useState(2);
  const [dialedNumber, setDialedNumber] = useState('');
  const [phoneActive, setPhoneActive] = useState(false);
  const [callDuration, setCallDuration] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const showToast = useCallback((message: string, type: ToastState['type'] = 'error') => {
    setToast({ message, type });
  }, []);

  const resetAfterPurchase = useCallback(() => {
    setCurrentScreen('screensaver');
    setSelectedItem(null);
    setCredit(0);
  }, []);

  useEffect(() => {
    if (currentScreen !== 'dispensing' || !selectedItem) return;

    const interval = setInterval(() => {
      setDispenseProgress((prev) => {
        const next = prev + 5;

        if (next <= 30) setDispenseMessage('Preparing your selection...');
        else if (next <= 60 && ['coffee', 'freshDrinks'].includes(selectedItem.category)) setDispenseMessage('Mixing ingredients...');
        else if (next <= 60) setDispenseMessage('Locating item...');
        else if (next <= 90) setDispenseMessage('Dispensing...');
        else setDispenseMessage('Done! Please take your item.');

        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setCurrentScreen('thankYou');
            setTimeout(resetAfterPurchase, 4000);
          }, 1000);
        }

        return next;
      });
    }, 250);

    return () => clearInterval(interval);
  }, [currentScreen, resetAfterPurchase, selectedItem]);

  const handleEndCall = useCallback(() => {
    setPhoneActive(false);
    setDialedNumber('');
    setCallDuration(0);
  }, []);

  useEffect(() => {
    if (!phoneActive) return;

    const interval = setInterval(() => {
      setCallDuration((prev) => {
        const next = prev + 1;
        if (next % 10 === 0) {
          setCredit((currentCredit) => {
            if (currentCredit >= 10) return currentCredit - 10;
            handleEndCall();
            showToast('Call ended: Insufficient funds');
            return currentCredit;
          });
        }
        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [handleEndCall, phoneActive, showToast]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  const completePurchase = useCallback(
    (item: ProductWithCategory, paymentType: PaymentType, insertedAmount: number) => {
      if (paymentType === 'cash') setCredit(insertedAmount - item.price);
      setSelectedItem(item);
      setDispenseProgress(0);
      setDispenseMessage('Initiating...');
      setPaymentModal(EMPTY_PAYMENT_MODAL);
      setCurrentScreen('dispensing');
    },
    [],
  );

  const startPaymentFlow = useCallback(
    (item: ProductItem, category: CategoryKey, paymentType: PaymentType) => {
      const fullItem: ProductWithCategory = { ...item, category };

      if (paymentType === 'cash' && credit >= item.price) {
        completePurchase(fullItem, paymentType, credit);
        return;
      }

      setPaymentModal({
        isOpen: true,
        type: paymentType,
        item: fullItem,
        insertedAmount: paymentType === 'cash' ? credit : 0,
      });
    },
    [completePurchase, credit],
  );

  const handleInsertMoney = useCallback((amount: number) => {
    setPaymentModal((prev) => ({ ...prev, insertedAmount: prev.insertedAmount + amount }));
  }, []);

  const processDigitalPayment = useCallback(() => {
    if (!paymentModal.item || !paymentModal.type) return;

    const item = paymentModal.item;
    const type = paymentModal.type;

    setPaymentProcessing(true);
    setTimeout(() => {
      setPaymentProcessing(false);
      completePurchase(item, type, item.price);
    }, 2000);
  }, [completePurchase, paymentModal.item, paymentModal.type]);

  const closePaymentModal = useCallback(() => setPaymentModal(EMPTY_PAYMENT_MODAL), []);

  const handleDial = useCallback((digit: string) => {
    setDialedNumber((prev) => (prev.length < 15 ? `${prev}${digit}` : prev));
  }, []);

  const handleBackspaceNumber = useCallback(() => setDialedNumber((prev) => prev.slice(0, -1)), []);

  const handleStartCall = useCallback(() => {
    if (dialedNumber.length === 0) return showToast('Please enter a number');
    if (credit < 10) return showToast('Rs 10 minimum required to call');

    setCredit((prev) => prev - 10);
    setPhoneActive(true);
    setCallDuration(0);
  }, [credit, dialedNumber.length, showToast]);

  const headerTitle = useMemo(() => {
    switch (currentScreen) {
      case 'categories':
        return 'CHOOSE CATEGORY';
      case 'snacks':
        return 'SNACKS & BISCUITS';
      case 'coldDrinks':
        return 'COLD DRINKS';
      case 'coffee':
        return 'HOT COFFEE';
      case 'freshDrinks':
        return 'FRESH DRINKS';
      case 'phone':
        return 'PUBLIC PHONE';
      case 'dispensing':
        return 'PREPARING...';
      default:
        return '';
    }
  }, [currentScreen]);

  return {
    inventory: INVENTORY,
    state: {
      currentScreen,
      credit,
      toast,
      currentTime,
      paymentModal,
      paymentProcessing,
      selectedItem,
      dispenseProgress,
      dispenseMessage,
      sugarLevel,
      dialedNumber,
      phoneActive,
      callDuration,
      headerTitle,
    },
    actions: {
      setCurrentScreen,
      setSugarLevel,
      showToast,
      startPaymentFlow,
      handleInsertMoney,
      processDigitalPayment,
      completePurchase,
      closePaymentModal,
      handleDial,
      handleBackspaceNumber,
      handleStartCall,
      handleEndCall,
    },
  };
};
