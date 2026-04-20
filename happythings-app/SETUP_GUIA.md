# Frontend - Guía de Instalación y Setup

# 1. Crear proyecto
npm create vite@latest ecommerce-app -- --template react
cd ecommerce-app

# 2. Instalar dependencias
npm install
npm install -D tailwindcss postcss autoprefixer
npm install lucide-react framer-motion axios zustand react-router-dom
npx tailwindcss init -p
```

## 🎨 Configuración Tailwind 4

**tailwind.config.js:**
```javascript
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0f172a",
        secondary: "#1e293b",
        accent: "#00d9ff",
        success: "#10b981",
        danger: "#ef4444",
      },
      fontFamily: {
        mono: ["Fira Code", "monospace"],
        sans: ["Segoe UI", "sans-serif"],
      },
      keyframes: {
        slideIn: { "0%": { opacity: "0", transform: "translateY(10px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
      },
      animation: {
        slideIn: "slideIn 0.6s ease-out",
      },
    },
  },
}
```

**src/index.css:**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;700&display=swap');

body {
  @apply bg-primary text-slate-100 font-sans;
}

::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: #0f172a;
}
::-webkit-scrollbar-thumb {
  background: #00d9ff;
  border-radius: 4px;
}
```

## 📁 Estructura de Carpetas

```
src/
├── components/
│   ├── Header.jsx
│   ├── Navbar.jsx
│   ├── Carousel.jsx
│   ├── ProductCard.jsx
│   └── ProductGrid.jsx
├── pages/
│   ├── Landing.jsx
│   ├── Login.jsx
│   ├── ClientDashboard.jsx
│   ├── DriverDashboard.jsx
│   └── AdminDashboard.jsx
├── hooks/
│   └── useAuth.js
├── store/
│   └── authStore.js
├── App.jsx
├── main.jsx
└── index.css
```

## 🔑 Características Principales

### Landing Page
- ✅ Navbar con categorías y carrito
- ✅ Carousel automático de banners
- ✅ Grid de productos responsivo
- ✅ Search box funcional
- ✅ Estética minimalista tech

### Sistema de Autenticación
- ✅ Login/Registro con roles (Cliente, Driver, Admin)
- ✅ Validación de roles
- ✅ Persist en localStorage
- ✅ Cuentas de prueba integradas

### Dashboards por Rol

**Cliente:**
- Historial de pedidos
- Estado de entregas
- Información del driver
- Tracking en tiempo real (placeholder)

**Driver:**
- Rutas asignadas
- Status de entregas
- Mapa GPS (placeholder)
- Distancia y paquetes

**Admin:**
- Estadísticas globales
- Gestión de drivers
- Control de órdenes
- Configuración del sistema

## 🎮 Rutas Disponibles

```
/ → Landing (tienda)
/login → Login/Registro
/dashboard/customer → Panel cliente
/dashboard/driver → Panel driver
/dashboard/admin → Panel admin
```

## 🧪 Cuentas de Prueba

| Rol | Email | Password |
|-----|-------|----------|
| Cliente | cliente@test.com | 123456 |
| Driver | driver@test.com | 123456 |
| Admin | admin@test.com | 123456 |

## 💾 Zustand Store (Estado Global)

```javascript
// useAuthStore.js
import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  role: null,
  login: (userData) => {...},
  logout: () => {...},
  loadUser: () => {...},
}));
```

## 🎨 Sistema de Colores

```css
Primary:   #0f172a (oscuro total)
Secondary: #1e293b (gris oscuro)
Accent:    #00d9ff (cian)
Success:   #10b981 (verde)
Danger:    #ef4444 (rojo)
```

## 📦 Dependencias

```json
{
  "react": "^18.x",
  "react-dom": "^18.x",
  "react-router-dom": "^6.x",
  "lucide-react": "^latest",
  "zustand": "^latest",
  "framer-motion": "^latest",
  "tailwindcss": "^4.x",
  "postcss": "^latest",
  "autoprefixer": "^latest"
}
```

## 🚀 Comandos Útiles

```bash
# Desarrollo
npm run dev

# Build
npm run build

# Preview
npm run preview
```

## 🔗 Próximos Pasos

1. **Backend** → Crear API en Node/Express
2. **Base de Datos** → MongoDB o PostgreSQL
3. **Mapas** → Integrar Leaflet o Google Maps
4. **Pagos** → Stripe o MercadoPago
5. **Realtime** → Socket.io para tracking
6. **Notificaciones** → Firebase o Sendgrid

## 💡 Notas

- Los componentes son totalmente funcionales
- Estilos responsivos (mobile-first)
- Animaciones suaves con Tailwind
- Código limpio y modular
- Listo para integración con backend

¡A programar! :D