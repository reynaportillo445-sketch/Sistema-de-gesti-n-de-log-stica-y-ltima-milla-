import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  role: null,

  login: (userData) => {
    // Si el usuario ingresado coincide con tus credenciales maestras
    if (userData.username === 'alfa' && userData.password === '5414b') {
      const adminData = {
        ...userData,
        name: 'Administrador Alfa',
        role: 'admin' // Forzamos el rol de admin
      };
      set({
        user: adminData,
        isAuthenticated: true,
        role: 'admin',
      });
      localStorage.setItem('user', JSON.stringify(adminData));
      return true;
    }

    // Lógica normal para otros usuarios
    set({
      user: userData,
      isAuthenticated: true,
      role: userData.role || 'customer',
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