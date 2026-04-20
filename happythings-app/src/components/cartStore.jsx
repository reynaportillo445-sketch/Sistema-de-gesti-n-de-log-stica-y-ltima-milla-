// src/components/cartStore.jsx
import { create } from 'zustand';

export const useCartStore = create((set) => ({
  cart: [],
  isOpen: false, 
  setIsOpen: (open) => set({ isOpen: open }),
  
  addToCart: (product) => set((state) => {
    const existingProduct = state.cart.find((item) => item.id === product.id);
    
    if (existingProduct) {
      return {
        cart: state.cart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        ),
        // ELIMINAMOS: isOpen: true (ya no se abrirá solo)
      };
    }
    return { 
      cart: [...state.cart, { ...product, quantity: 1 }],
      // ELIMINAMOS: isOpen: true (ya no se abrirá solo)
    };
  }),

  removeItem: (id) => set((state) => ({
    cart: state.cart.filter((item) => item.id !== id)
  })),

  clearCart: () => set({ cart: [] }),
}));
