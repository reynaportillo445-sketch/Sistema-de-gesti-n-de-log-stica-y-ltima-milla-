import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      role: null,

      login: (userData) => {
        let finalData;

        // Validación de credenciales maestras
        if (userData.username === 'alfa' && userData.password === '5414b') {
          finalData = {
            ...userData,
            name: 'Administrador Alfa',
            role: 'admin',
          };
        } else {
          // Lógica para usuarios normales
          finalData = {
            ...userData,
            role: userData.role || 'customer',
          };
        }

        set({
          user: finalData,
          isAuthenticated: true,
          role: finalData.role,
        });

        return true; // Éxito
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          role: null,
        });
        // El middleware persist se encarga de limpiar el storage automáticamente
      },
    }),
    {
      name: 'auth-storage', // Nombre de la llave en localStorage
    }
  )
);