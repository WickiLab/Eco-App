export type Screen = 'SPLASH' | 'LANG' | 'LOGIN' | 'OTP' | 'SETUP' | 'MAIN';
export type Tab = 'HOME' | 'COLLECTION' | 'WALLET' | 'PROFILE';
export type SubScreen =
  | null
  | 'ADD_CATEGORY'
  | 'ADD_DETAILS'
  | 'SCANNER'
  | 'REQUEST_PICKUP'
  | 'TRACKING'
  | 'WITHDRAW';

export type Language = 'English' | 'Sinhala' | 'Tamil';

export interface UserProfile {
  name: string;
  phone: string;
  address: string;
  district: string;
  paymentMethod: 'Bank Transfer' | 'Mobile Wallet';
  language: Language;
  walletBalance: number;
}

export interface CollectionItem {
  id: number;
  category: PricingKey;
  quantity: number;
  estimatedValue: number;
}

export interface HistoryItem {
  id: string;
  date: string;
  amount: number;
  type: 'pickup' | 'withdraw';
}

export interface PricingItem {
  name: string;
  rate: number;
  unit: 'item' | 'kg';
  icon: string;
}

export type PricingKey =
  | 'plastic'
  | 'glass'
  | 'aluminum'
  | 'coconut'
  | 'paper';

export type PricingMap = Record<PricingKey, PricingItem>;