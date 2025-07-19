
import React, { createContext, useContext, useReducer, useEffect } from 'react';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  shopId: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
}

interface AppState {
  user: User | null;
  cart: CartItem[];
  favorites: number[];
  isAuthModalOpen: boolean;
  authMode: 'login' | 'register';
}

type AppAction =
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'ADD_TO_CART'; payload: CartItem }
  | { type: 'REMOVE_FROM_CART'; payload: number }
  | { type: 'UPDATE_CART_QUANTITY'; payload: { id: number; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_FAVORITE'; payload: number }
  | { type: 'SET_AUTH_MODAL'; payload: { isOpen: boolean; mode?: 'login' | 'register' } }
  | { type: 'LOAD_PERSISTED_DATA'; payload: Partial<AppState> };

const initialState: AppState = {
  user: null,
  cart: [],
  favorites: [],
  isAuthModalOpen: false,
  authMode: 'login'
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    
    case 'ADD_TO_CART':
      const existingItem = state.cart.find(item => 
        item.id === action.payload.id && 
        item.selectedColor === action.payload.selectedColor && 
        item.selectedSize === action.payload.selectedSize
      );
      
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.payload.id && 
            item.selectedColor === action.payload.selectedColor && 
            item.selectedSize === action.payload.selectedSize
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          )
        };
      }
      
      return { ...state, cart: [...state.cart, action.payload] };
    
    case 'REMOVE_FROM_CART':
      return { ...state, cart: state.cart.filter((_, index) => index !== action.payload) };
    
    case 'UPDATE_CART_QUANTITY':
      return {
        ...state,
        cart: state.cart.map((item, index) =>
          index === action.payload.id
            ? { ...item, quantity: Math.max(1, action.payload.quantity) }
            : item
        )
      };
    
    case 'CLEAR_CART':
      return { ...state, cart: [] };
    
    case 'TOGGLE_FAVORITE':
      const isFavorite = state.favorites.includes(action.payload);
      return {
        ...state,
        favorites: isFavorite
          ? state.favorites.filter(id => id !== action.payload)
          : [...state.favorites, action.payload]
      };
    
    case 'SET_AUTH_MODAL':
      return {
        ...state,
        isAuthModalOpen: action.payload.isOpen,
        authMode: action.payload.mode || state.authMode
      };
    
    case 'LOAD_PERSISTED_DATA':
      return { ...state, ...action.payload };
    
    default:
      return state;
  }
}

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load persisted data on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('ecommerce-cart');
    const savedFavorites = localStorage.getItem('ecommerce-favorites');
    const savedUser = localStorage.getItem('ecommerce-user');

    const persistedData: Partial<AppState> = {};

    if (savedCart) {
      try {
        persistedData.cart = JSON.parse(savedCart);
      } catch (e) {
        console.error('Error loading cart from localStorage:', e);
      }
    }

    if (savedFavorites) {
      try {
        persistedData.favorites = JSON.parse(savedFavorites);
      } catch (e) {
        console.error('Error loading favorites from localStorage:', e);
      }
    }

    if (savedUser) {
      try {
        persistedData.user = JSON.parse(savedUser);
      } catch (e) {
        console.error('Error loading user from localStorage:', e);
      }
    }

    if (Object.keys(persistedData).length > 0) {
      dispatch({ type: 'LOAD_PERSISTED_DATA', payload: persistedData });
    }
  }, []);

  // Persist data to localStorage when state changes
  useEffect(() => {
    localStorage.setItem('ecommerce-cart', JSON.stringify(state.cart));
  }, [state.cart]);

  useEffect(() => {
    localStorage.setItem('ecommerce-favorites', JSON.stringify(state.favorites));
  }, [state.favorites]);

  useEffect(() => {
    if (state.user) {
      localStorage.setItem('ecommerce-user', JSON.stringify(state.user));
    } else {
      localStorage.removeItem('ecommerce-user');
    }
  }, [state.user]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
