'use client';

import { useCallback, useMemo, useState } from 'react';
import { Home, Box, Wallet, User } from 'lucide-react';

import {
  PRICES,
  TRANSLATIONS,
  INITIAL_BALANCE,
  createInitialCollection,
  createInitialHistory,
  createInitialUser,
} from '../lib/constants';

import {
  SplashScreen,
  LanguageScreen,
  LoginScreen,
  OTPScreen,
  ProfileSetupScreen,
} from './screens/AuthScreens';

import {
  DashboardTab,
  CollectionTab,
  WalletTab,
  ProfileTab,
} from './screens/MainTabs';

import {
  AddCategoryScreen,
  AddDetailScreen,
  ScannerScreen,
  RequestPickupScreen,
  TrackingScreen,
  WithdrawScreen,
} from './screens/FlowScreens';

export default function EcoCollectApp() {
  const [screen, setScreen] = useState('SPLASH');
  const [tab, setTab] = useState('HOME');
  const [lang, setLang] = useState('en');

  const [user, setUser] = useState(createInitialUser);
  const [balance, setBalance] = useState(INITIAL_BALANCE);
  const [collection, setCollection] = useState(createInitialCollection);
  const [history, setHistory] = useState(createInitialHistory);

  const [activePickup, setActivePickup] = useState(null);
  const [tempData, setTempData] = useState({});

  const t = useMemo(() => TRANSLATIONS[lang] || TRANSLATIONS.en, [lang]);

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

  const goTo = useCallback((newScreen) => {
    setScreen(newScreen);
  }, []);

  const switchTab = useCallback((newTab) => {
    setTab(newTab);
    setScreen('MAIN');
  }, []);

  const handleLogout = useCallback(() => {
    setScreen('SPLASH');
    setTab('HOME');
    setLang('en');
    setUser(createInitialUser());
    setBalance(INITIAL_BALANCE);
    setCollection(createInitialCollection());
    setHistory(createInitialHistory());
    setActivePickup(null);
    setTempData({});
  }, []);

  return (
    <div className="w-full max-w-md mx-auto h-screen bg-black sm:py-4 sm:px-4 font-sans text-gray-800">
      <div className="w-full h-full bg-[#F5F7F8] relative overflow-hidden sm:rounded-[40px] shadow-2xl flex flex-col border-4 border-black">
        <div className="h-6 w-full bg-transparent absolute top-0 z-50 flex justify-between items-center px-6 pt-2 pointer-events-none">
          <span className="text-xs font-bold text-gray-400">9:41</span>
          <div className="flex space-x-1">
            <div className="w-3 h-3 rounded-full border border-gray-400" />
            <div className="w-3 h-3 rounded-full border border-gray-400 bg-gray-400" />
          </div>
        </div>

        <div className="flex-1 overflow-hidden relative mt-6">
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
                <WalletTab
                  t={t}
                  balance={balance}
                  history={history}
                  goTo={goTo}
                />
              )}

              {tab === 'PROFILE' && (
                <ProfileTab
                  t={t}
                  user={user}
                  goTo={goTo}
                  handleLogout={handleLogout}
                />
              )}

              <div className="absolute bottom-0 w-full bg-white border-t border-gray-200 flex justify-around p-3 pb-6 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] rounded-t-3xl">
                {[
                  { id: 'HOME', icon: Home, label: t.home },
                  { id: 'COLLECTION', icon: Box, label: t.collection },
                  { id: 'WALLET', icon: Wallet, label: t.wallet },
                  { id: 'PROFILE', icon: User, label: t.profile },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setTab(item.id)}
                    className={`flex flex-col items-center p-2 min-w-[64px] ${
                      tab === item.id
                        ? 'text-[#1DB954]'
                        : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    <item.icon size={24} strokeWidth={tab === item.id ? 2.5 : 2} />
                    <span
                      className={`text-[10px] mt-1 font-bold ${
                        tab === item.id ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      {item.label}
                    </span>
                  </button>
                ))}
              </div>
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
        </div>
      </div>
    </div>
  );
}