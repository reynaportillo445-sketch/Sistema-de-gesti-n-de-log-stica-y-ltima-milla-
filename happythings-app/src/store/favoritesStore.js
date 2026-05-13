import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useFavoritesStore = create(
  persist(
    (set) => ({
      favorites: [],
      toggleFavorite: (product) => set((state) => {
        const isFavorite = state.favorites.some(fav => fav.id === product.id);
        if (isFavorite) {
          return { favorites: state.favorites.filter(fav => fav.id !== product.id) };
        }
        return { favorites: [...state.favorites, product] };
      }),
    }),
    { name: 'favorites-storage' }
  )
);