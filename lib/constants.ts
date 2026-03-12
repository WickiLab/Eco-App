import { PricingMap } from '@/types/app';

export const PRICING: PricingMap = {
  plastic: { name: 'Plastic Bottles', rate: 2, unit: 'item', icon: '🧴' },
  glass: { name: 'Glass Bottles', rate: 10, unit: 'item', icon: '🍾' },
  aluminum: { name: 'Aluminium', rate: 250, unit: 'kg', icon: '🥫' },
  coconut: { name: 'Coconut Shells', rate: 20, unit: 'kg', icon: '🥥' },
  paper: { name: 'Paper & Cardboard', rate: 30, unit: 'kg', icon: '📄' },
};

export const DISTRICTS = [
  'Colombo',
  'Gampaha',
  'Kandy',
  'Galle',
  'Matara',
  'Kurunegala',
];

export const PICKUP_TIME_SLOTS = [
  'Morning (8am - 12pm)',
  'Afternoon (12pm - 4pm)',
  'Evening (4pm - 7pm)',
];

export const DEFAULT_USER = {
  name: 'Sudu Wickramasinghe',
  phone: '',
  address: '123 Galle Road, Colombo',
  district: 'Colombo',
  paymentMethod: 'Bank Transfer' as const,
  language: 'English' as const,
  walletBalance: 1850,
};

export const DEFAULT_COLLECTION = [
  { id: 1, category: 'plastic' as const, quantity: 24, estimatedValue: 48 },
  { id: 2, category: 'glass' as const, quantity: 12, estimatedValue: 120 },
];

export const DEFAULT_HISTORY = [
  { id: '124', date: '12 Jan 2026', amount: 1400, type: 'pickup' as const },
  { id: '118', date: '03 Jan 2026', amount: 450, type: 'pickup' as const },
];