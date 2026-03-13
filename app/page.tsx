'use client';

import CategoryMenu from '@/components/vending/CategoryMenu';
import CoffeeScreen from '@/components/vending/CoffeeScreen';
import DispenseScreen from '@/components/vending/DispenseScreen';
import FooterBar from '@/components/vending/FooterBar';
import PaymentModal from '@/components/vending/PaymentModal';
import PhoneScreen from '@/components/vending/PhoneScreen';
import ProductGrid from '@/components/vending/ProductGrid';
import Screensaver from '@/components/vending/Screensaver';
import ThankYouScreen from '@/components/vending/ThankYouScreen';
import ToastMessage from '@/components/vending/ToastMessage';
import TopBar from '@/components/vending/TopBar';
import { useVendingMachine } from '@/hooks/useVendingMachine';

export default function Page() {
  const { inventory, state, actions } = useVendingMachine();

  return (
    <div className="flex min-h-screen justify-center bg-black font-sans text-slate-50 select-none">
      <div className="relative flex h-screen w-full max-w-[1080px] flex-col overflow-hidden border-x border-white/5 bg-slate-900 shadow-[0_0_100px_rgba(0,0,0,1)]">
        <ToastMessage toast={state.toast} />

        <PaymentModal
          paymentModal={state.paymentModal}
          paymentProcessing={state.paymentProcessing}
          onClose={actions.closePaymentModal}
          onInsertMoney={actions.handleInsertMoney}
          onCompletePurchase={actions.completePurchase}
          onProcessDigitalPayment={actions.processDigitalPayment}
        />

        {state.currentScreen !== 'screensaver' && (
          <TopBar currentScreen={state.currentScreen} title={state.headerTitle} currentTime={state.currentTime} onBack={() => actions.setCurrentScreen('categories')} />
        )}

        <div className="relative flex flex-1 flex-col overflow-hidden">
          {state.currentScreen === 'screensaver' && <Screensaver currentTime={state.currentTime} onStart={() => actions.setCurrentScreen('categories')} />}
          {state.currentScreen === 'categories' && <CategoryMenu onSelect={actions.setCurrentScreen} />}
          {state.currentScreen === 'snacks' && <ProductGrid items={inventory.snacks} category="snacks" onPay={actions.startPaymentFlow} />}
          {state.currentScreen === 'coldDrinks' && <ProductGrid items={inventory.coldDrinks} category="coldDrinks" onPay={actions.startPaymentFlow} />}
          {state.currentScreen === 'freshDrinks' && <ProductGrid items={inventory.freshDrinks} category="freshDrinks" onPay={actions.startPaymentFlow} />}
          {state.currentScreen === 'coffee' && <CoffeeScreen sugarLevel={state.sugarLevel} setSugarLevel={actions.setSugarLevel} onPay={actions.startPaymentFlow} />}
          {state.currentScreen === 'phone' && (
            <PhoneScreen
              dialedNumber={state.dialedNumber}
              phoneActive={state.phoneActive}
              callDuration={state.callDuration}
              onDial={actions.handleDial}
              onStartCall={actions.handleStartCall}
              onEndCall={actions.handleEndCall}
              onBackspace={actions.handleBackspaceNumber}
            />
          )}
          {state.currentScreen === 'dispensing' && <DispenseScreen selectedItem={state.selectedItem} progress={state.dispenseProgress} message={state.dispenseMessage} />}
          {state.currentScreen === 'thankYou' && <ThankYouScreen itemName={state.selectedItem?.name} />}
        </div>

        <FooterBar screen={state.currentScreen} credit={state.credit} />
      </div>
    </div>
  );
}
