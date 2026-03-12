'use client';

import { useMemo, useState } from 'react';
import MobileFrame from './MobileFrame';
import BottomNav from './BottomNav';

import SplashScreen from '../screens/SplashScreen';
import LanguageScreen from '../screens/LanguageScreen';
import LoginScreen from '../screens/LoginScreen';
import OTPScreen from '../screens/OTPScreen';
import ProfileSetupScreen from '../screens/ProfileSetupScreen';

import DashboardTab from '../screens/DashboardTab';
import CollectionTab from '../screens/CollectionTab';
import WalletTab from '../screens/WalletTab';
import ProfileTab from '../screens/ProfileTab';

import AddCategoryScreen from '../screens/AddCategoryScreen';
import AddDetailScreen from '../screens/AddDetailScreen';
import ScannerScreen from '../screens/ScannerScreen';
import RequestPickupScreen from '../screens/RequestPickupScreen';
import TrackingScreen from '../screens/TrackingScreen';
import WithdrawScreen from '../screens/WithdrawScreen';

import {
  PRICES,
  TRANSLATIONS,
  INITIAL_BALANCE,
  INITIAL_USER,
  INITIAL_COLLECTION,
  INITIAL_HISTORY,
} from '../../lib/constants';

export default function EcoCollectApp() {
  const [screen, setScreen] = useState('SPLASH');
  const [tab, setTab] = useState('HOME');
  const [lang, setLang] = useState('en');

  const [user, setUser] = useState(INITIAL_USER);
  const [balance, setBalance] = useState(INITIAL_BALANCE);
  const [collection, setCollection] = useState(INITIAL_COLLECTION);
  const [history, setHistory] = useState(INITIAL_HISTORY);

  const [activePickup, setActivePickup] = useState(null);
  const [tempData, setTempData] = useState({});

  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const totalEstimatedValue = useMemo(
    () => collection.reduce((acc, item) => acc + item.value, 0),
    [collection]
  );

  const totalItems = useMemo(
    () =>
      collection.reduce(
        (acc, item) => (item.unit === 'items' ? acc + Number(item.qty) : acc),
        0
      ),
    [collection]
  );

  const goTo = (newScreen) => setScreen(newScreen);

  const switchTab = (newTab) => {
    setTab(newTab);
    setScreen('MAIN');
  };

  const resetApp = () => {
    setScreen('SPLASH');
    setTab('HOME');
    setLang('en');
    setUser(INITIAL_USER);
    setBalance(INITIAL_BALANCE);
    setCollection(INITIAL_COLLECTION);
    setHistory(INITIAL_HISTORY);
    setActivePickup(null);
    setTempData({});
  };

  return (
    <MobileFrame>
      {screen === 'SPLASH' && <SplashScreen goTo={goTo} />}

      {screen === 'LANGUAGE' && (
        <LanguageScreen t={t} setLang={setLang} goTo={goTo} />
      )}

      {screen === 'LOGIN' && (
        <LoginScreen t={t} user={user} setUser={setUser} goTo={goTo} />
      )}

      {screen === 'OTP' && <OTPScreen t={t} goTo={goTo} />}

      {screen === 'PROFILE_SETUP' && (
        <ProfileSetupScreen
          user={user}
          setUser={setUser}
          switchTab={switchTab}
        />
      )}

      {screen === 'MAIN' && (
        <div className="h-full relative">
          {tab === 'HOME' && (
            <DashboardTab
              user={user}
              t={t}
              history={history}
              collection={collection}
              activePickup={activePickup}
              totalEstimatedValue={totalEstimatedValue}
              totalItems={totalItems}
              goTo={goTo}
              switchTab={switchTab}
            />
          )}

          {tab === 'COLLECTION' && (
            <CollectionTab
              t={t}
              collection={collection}
              totalEstimatedValue={totalEstimatedValue}
              goTo={goTo}
              prices={PRICES}
            />
          )}

          {tab === 'WALLET' && (
            <WalletTab t={t} balance={balance} history={history} goTo={goTo} />
          )}

          {tab === 'PROFILE' && (
            <ProfileTab
              t={t}
              user={user}
              goTo={goTo}
              handleLogout={resetApp}
            />
          )}

          <BottomNav tab={tab} setTab={setTab} t={t} />
        </div>
      )}

      {screen === 'ADD_CATEGORY' && (
        <AddCategoryScreen
          prices={PRICES}
          setTempData={setTempData}
          goTo={goTo}
          switchTab={switchTab}
        />
      )}

      {screen === 'ADD_DETAIL' && (
        <AddDetailScreen
          tempData={tempData}
          setCollection={setCollection}
          switchTab={switchTab}
          goTo={goTo}
        />
      )}

      {screen === 'SCANNER' && (
        <ScannerScreen
          setCollection={setCollection}
          switchTab={switchTab}
          goTo={goTo}
        />
      )}

      {screen === 'REQUEST_PICKUP' && (
        <RequestPickupScreen
          collection={collection}
          totalEstimatedValue={totalEstimatedValue}
          setActivePickup={setActivePickup}
          goTo={goTo}
          switchTab={switchTab}
        />
      )}

      {screen === 'TRACKING' && (
        <TrackingScreen
          activePickup={activePickup}
          setBalance={setBalance}
          setHistory={setHistory}
          setCollection={setCollection}
          setActivePickup={setActivePickup}
          switchTab={switchTab}
        />
      )}

      {screen === 'WITHDRAW' && (
        <WithdrawScreen
          balance={balance}
          setBalance={setBalance}
          switchTab={switchTab}
        />
      )}
    </MobileFrame>
  );
}