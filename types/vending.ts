export type CategoryKey = 'snacks' | 'coldDrinks' | 'coffee' | 'freshDrinks';

export type Screen =
  | 'screensaver'
  | 'categories'
  | CategoryKey
  | 'phone'
  | 'dispensing'
  | 'thankYou';

export type PaymentType = 'cash' | 'card' | 'qr';

export interface ProductItem {
  id: string;
  name: string;
  price: number;
  image: string;
}

export interface ProductWithCategory extends ProductItem {
  category: CategoryKey;
}

export interface Inventory {
  snacks: ProductItem[];
  coldDrinks: ProductItem[];
  coffee: ProductItem[];
  freshDrinks: ProductItem[];
}

export interface ToastState {
  message: string;
  type: 'error' | 'success';
}

export interface PaymentModalState {
  isOpen: boolean;
  type: PaymentType | null;
  item: ProductWithCategory | null;
  insertedAmount: number;
}
