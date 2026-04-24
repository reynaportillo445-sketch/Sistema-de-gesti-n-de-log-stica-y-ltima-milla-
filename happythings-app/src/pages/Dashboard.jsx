// Dashboard.jsx
import { useAuthStore } from '../store/authStore';
import AdminDashboard from './AdminDashboard';
import ClientDashboard from './ClientDashboard';
import DriverDashboard from './DriverDashboard';

export default function Dashboard() {
  const { user } = useAuthStore();

  if (user?.role === 'admin') return <AdminDashboard />;
  if (user?.role === 'driver') return <DriverDashboard />;
  
  return <ClientDashboard />;
}