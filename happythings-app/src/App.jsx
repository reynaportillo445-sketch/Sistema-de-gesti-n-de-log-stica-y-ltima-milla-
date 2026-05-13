import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import Landing from './pages/Landing';
import Register from './pages/Register';
import Login from './pages/Login';
import ClientDashboard from './pages/ClientDashboard';
import DriverDashboard from './pages/DriverDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Navbar from './components/Navbar';

function NavigationWrapper() {
  const location = useLocation();
  const authRoutes = ['/login', '/register'];
  
  if (authRoutes.includes(location.pathname)) {
    return null;
  }

  return <Navbar />;
}

// 1. Componente de diseño para manejar el espacio del Navbar
function LayoutWrapper({ children }) {
  const location = useLocation();
  const noPaddingRoutes = ['/login', '/register'];
  const hasNavbar = !noPaddingRoutes.includes(location.pathname);

  return (
    <div className={`min-h-screen bg-[#0f111a] ${hasNavbar ? 'pt-20' : ''}`}>
      {children}
    </div>
  );
}

function ProtectedRoute({ children, requiredRole }) {
  const { isAuthenticated, role, isCheckingAuth } = useAuthStore();

  if (isCheckingAuth) {
    return (
      <div className="fixed inset-0 bg-[#0f111a] z-[100] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-white"></div>
          <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.3em]">Cargando Sistema</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default function App() {
  const { loadUser } = useAuthStore();

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return (
    <Router>
      <NavigationWrapper /> 
      
      {/* 2. Envolvemos las rutas para que respeten el espacio del Navbar */}
      <LayoutWrapper>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route path="/dashboard/customer" element={
            <ProtectedRoute requiredRole="customer"><ClientDashboard /></ProtectedRoute>
          } />
          <Route path="/dashboard/driver" element={
            <ProtectedRoute requiredRole="driver"><DriverDashboard /></ProtectedRoute>
          } />
          <Route path="/dashboard/admin" element={
            <ProtectedRoute requiredRole="admin"><AdminDashboard /></ProtectedRoute>
          } />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </LayoutWrapper>
    </Router>
  );
}