import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  role: null,

  login: (userData) => {
    set({
      user: userData,
      isAuthenticated: true,
      role: userData.role,
    });
    localStorage.setItem('user', JSON.stringify(userData));
  },

  logout: () => {
    set({
      user: null,
      isAuthenticated: false,
      role: null,
    });
    localStorage.removeItem('user');
  },

  loadUser: () => {
    const stored = localStorage.getItem('user');
    if (stored) {
      const userData = JSON.parse(stored);
      set({
        user: userData,
        isAuthenticated: true,
        role: userData.role,
      });
    }
  },
}));