export type Category = 'CPM' | 'MARKETING' | 'OUTROS';

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: Category;
  whatsappNumber: string;
  createdAt: number;
}

export interface User {
  id: string;
  username: string;
  email: string;
  password?: string;
  isAdmin: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface AppState {
  products: Product[];
  users: User[];
  currentUser: User | null;
  cart: CartItem[];
  history: string[]; // Array of product IDs
  theme: 'light' | 'dark';
}
