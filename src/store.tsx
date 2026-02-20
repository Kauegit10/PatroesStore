import React, { createContext, useContext, useState, useEffect } from 'react';
import { AppState, Product, User, CartItem, Category } from './types';

const INITIAL_STATE: AppState = {
  products: [
    {
      id: '1',
      name: 'Conta CPM Premium',
      price: 150.00,
      description: 'Conta com alto rendimento e métricas otimizadas.',
      image: 'https://picsum.photos/seed/cpm/400/300',
      category: 'CPM',
      whatsappNumber: '5511999999999',
      createdAt: Date.now(),
    },
    {
      id: '2',
      name: 'Pacote Marketing Digital',
      price: 250.00,
      description: 'Estratégias completas para alavancar suas redes sociais.',
      image: 'https://picsum.photos/seed/marketing/400/300',
      category: 'MARKETING',
      whatsappNumber: '5511999999999',
      createdAt: Date.now(),
    }
  ],
  users: [
    { id: 'admin1', username: 'negocpm', email: 'admin1@patroes.store', password: 'nego001', isAdmin: true },
    { id: 'admin2', username: 'Souzavendas', email: 'admin2@patroes.store', password: 'Souza001', isAdmin: true }
  ],
  currentUser: null,
  cart: [],
  history: [],
  theme: 'dark',
};

interface AppContextType extends AppState {
  login: (username: string, password: string) => boolean;
  register: (username: string, email: string, password: string) => void;
  logout: () => void;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  addProduct: (product: Omit<Product, 'id' | 'createdAt'>) => void;
  removeProduct: (productId: string) => void;
  toggleTheme: () => void;
  addToHistory: (productId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem('patroes_store_state');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_STATE;
      }
    }
    return INITIAL_STATE;
  });

  useEffect(() => {
    localStorage.setItem('patroes_store_state', JSON.stringify(state));
  }, [state]);

  const login = (username: string, password: string) => {
    const user = state.users.find(u => u.username === username && u.password === password);
    if (user) {
      setState(prev => ({ ...prev, currentUser: user }));
      return true;
    }
    return false;
  };

  const register = (username: string, email: string, password: string) => {
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      username,
      email,
      password,
      isAdmin: false
    };
    setState(prev => ({ ...prev, users: [...prev.users, newUser], currentUser: newUser }));
  };

  const logout = () => {
    setState(prev => ({ ...prev, currentUser: null }));
  };

  const addToCart = (product: Product) => {
    setState(prev => {
      const existing = prev.cart.find(item => item.id === product.id);
      if (existing) {
        return {
          ...prev,
          cart: prev.cart.map(item => 
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          )
        };
      }
      return { ...prev, cart: [...prev.cart, { ...product, quantity: 1 }] };
    });
  };

  const removeFromCart = (productId: string) => {
    setState(prev => ({
      ...prev,
      cart: prev.cart.filter(item => item.id !== productId)
    }));
  };

  const clearCart = () => {
    setState(prev => ({ ...prev, cart: [] }));
  };

  const addProduct = (productData: Omit<Product, 'id' | 'createdAt'>) => {
    const newProduct: Product = {
      ...productData,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: Date.now()
    };
    setState(prev => ({ ...prev, products: [newProduct, ...prev.products] }));
  };

  const removeProduct = (productId: string) => {
    setState(prev => ({
      ...prev,
      products: prev.products.filter(p => p.id !== productId)
    }));
  };

  const toggleTheme = () => {
    setState(prev => ({ ...prev, theme: prev.theme === 'light' ? 'dark' : 'light' }));
  };

  const addToHistory = (productId: string) => {
    setState(prev => {
      const newHistory = [productId, ...prev.history.filter(id => id !== productId)].slice(0, 10);
      return { ...prev, history: newHistory };
    });
  };

  return (
    <AppContext.Provider value={{ 
      ...state, 
      login, 
      register, 
      logout, 
      addToCart, 
      removeFromCart, 
      clearCart,
      addProduct,
      removeProduct,
      toggleTheme,
      addToHistory
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
