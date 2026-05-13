import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const usePaymentStore = create(
  persist(
    (set) => ({
      cards: [],
      addCard: (card) => set((state) => ({ cards: [...state.cards, { ...card, id: Date.now() }] })),
      removeCard: (id) => set((state) => ({ cards: state.cards.filter(c => c.id !== id) })),
    }),
    { name: 'payment-methods' }
  )
);