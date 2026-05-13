import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
<<<<<<< HEAD
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      role: null,
      isCheckingAuth: true, // Estado inicial: estamos comprobando la sesión

      // Esta es la función que App.jsx necesita
      loadUser: () => {
        const { user, isAuthenticated } = get();
        
        // Si hay un usuario en el storage, nos aseguramos de que los estados coincidan
        if (user && isAuthenticated) {
          set({ 
            role: user.role, 
            isCheckingAuth: false 
          });
        } else {
          set({ 
            isCheckingAuth: false 
          });
        }
      },

=======
    (set) => ({
      user: null,
      isAuthenticated: false,
      role: null,

>>>>>>> d59349199965a60cc80094269ce84230c602cbf1
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
<<<<<<< HEAD
          isCheckingAuth: false,
        });

        return true;
=======
        });

        return true; // Éxito
>>>>>>> d59349199965a60cc80094269ce84230c602cbf1
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          role: null,
<<<<<<< HEAD
          isCheckingAuth: false,
        });
      },
    }),
    {
      name: 'auth-storage', // Persistencia en localStorage
      // Esto evita parpadeos al esperar a que Zustand cargue los datos del disco
      onRehydrateStorage: () => (state) => {
        if (state) state.isCheckingAuth = false;
      },
=======
        });
        // El middleware persist se encarga de limpiar el storage automáticamente
      },
    }),
    {
      name: 'auth-storage', // Nombre de la llave en localStorage
>>>>>>> d59349199965a60cc80094269ce84230c602cbf1
    }
  )
);