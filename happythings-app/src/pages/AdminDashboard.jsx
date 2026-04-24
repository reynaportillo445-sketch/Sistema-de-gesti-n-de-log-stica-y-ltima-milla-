import { BarChart3, Users, TrendingUp, Settings, ArrowLeft, Plus, Trash2, MapPin, ChevronRight, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useState } from 'react';
import MapComponent from '../components/MapComponent';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const [activeTab, setActiveTab] = useState('overview');
  const [showCreateOrder, setShowCreateOrder] = useState(false);
  const [newOrder, setNewOrder] = useState({
    customer: '',
    address: '',
    driverId: '',
    items: 1,
  });

  const stats = [
    { label: 'Usuarios Totales', value: '1,234', icon: Users, color: 'text-blue-400', delay: 'delay-0' },
    { label: 'Ingresos Hoy', value: '$4,850', icon: TrendingUp, color: 'text-success', delay: 'delay-75' },
    { label: 'Órdenes Activas', value: '89', icon: BarChart3, color: 'text-accent', delay: 'delay-150' },
    { label: 'Drivers Activos', value: '23', icon: Users, color: 'text-purple-400', delay: 'delay-200' },
  ];

  const drivers = [
    { id: 1, name: 'Carlos Morales', status: 'activo', entregas: 45, plate: 'ABC-123' },
    { id: 2, name: 'Juan Pérez', status: 'activo', entregas: 52, plate: 'XYZ-789' },
    { id: 3, name: 'Luis García', status: 'inactivo', entregas: 38, plate: 'DEF-456' },
    { id: 4, name: 'Miguel Santos', status: 'activo', entregas: 41, plate: 'GHI-012' },
  ];

  const orders = [
    { id: '#ORD-001', customer: 'María González', driver: 'Carlos Morales', status: 'en-ruta', total: '$125.50' },
    { id: '#ORD-002', customer: 'Pedro Rodríguez', driver: 'Juan Pérez', status: 'completado', total: '$249.99' },
    { id: '#ORD-003', customer: 'Ana Martínez', driver: 'Sin asignar', status: 'pendiente', total: '$87.30' },
  ];

  const handleCreateOrder = () => {
    if (newOrder.customer && newOrder.address) {
      alert('✅ Orden creada: ' + newOrder.customer);
      setShowCreateOrder(false);
      setNewOrder({ customer: '', address: '', driverId: '', items: 1 });
    }
  };

  return (
    <div className="min-h-screen bg-primary animate-in fade-in duration-700">
      
      {/* Header con Sticky y Glassmorphism */}
      <header className="p-4 border-b bg-linear-to-r from-secondary to-primary border-accent/20 sm:p-6 sticky top-0 z-40 backdrop-blur-md">
        <div className="flex items-center justify-between mx-auto max-w-7xl">
          <div className="animate-in slide-in-from-left-4 duration-500">
            <h1 className="text-2xl font-bold sm:text-3xl text-accent tracking-tighter drop-shadow-[0_0_10px_rgba(var(--accent-rgb),0.3)]">Admin Panel</h1>
            <p className="text-slate-400 flex items-center gap-2">
              <span className="w-2 h-2 bg-success rounded-full animate-pulse" /> 
              Bienvenido, {user?.name} ⚙️
            </p>
          </div>

          {/* Botón de Salir Animado (Flecha + Texto Expansible) */}
          <button
            onClick={() => {
              logout();
              navigate('/');
            }}
            className="relative flex items-center gap-3 group outline-none"
          >
            <div className="p-2.5 rounded-xl bg-danger/10 border border-danger/20 text-danger group-hover:bg-danger group-hover:text-white group-hover:rotate-180 transition-all duration-500 shadow-lg">
              <ArrowLeft size={22} />
            </div>
            <div className="flex flex-col items-start overflow-hidden w-0 group-hover:w-28 transition-all duration-500 ease-in-out">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 delay-75 whitespace-nowrap">
                Finalizar
              </span>
              <span className="text-sm font-bold text-danger opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 delay-150 whitespace-nowrap">
                Sesión
              </span>
            </div>
          </button>
        </div>
      </header>

      <main className="px-4 py-8 mx-auto space-y-8 max-w-7xl sm:px-6">
        
        {/* Stats Grid con entrada escalonada */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className={`p-6 space-y-3 transition-all border bg-secondary border-accent/20 rounded-2xl hover:border-accent/50 hover:-translate-y-1 hover:shadow-xl hover:shadow-accent/5 animate-in zoom-in-95 duration-500 ${stat.delay}`}
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-slate-400 uppercase tracking-widest">{stat.label}</p>
                  <Icon size={24} className={stat.color} />
                </div>
                <p className="text-3xl font-bold text-white">{stat.value}</p>
              </div>
            );
          })}
        </section>

        {/* Selector de Pestañas Estilo Pastilla */}
        <nav className="flex flex-wrap gap-2 p-1.5 border rounded-2xl bg-secondary/50 border-white/5 backdrop-blur-sm">
          {['overview', 'drivers', 'orders', 'map', 'settings'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-xl font-bold transition-all capitalize flex items-center gap-2 ${
                activeTab === tab
                  ? 'bg-accent text-primary shadow-lg shadow-accent/20 scale-100'
                  : 'text-slate-500 hover:text-white hover:bg-white/5 scale-95'
              }`}
            >
              {tab === 'overview' && '📊 Resumen'}
              {tab === 'drivers' && '🚚 Drivers'}
              {tab === 'orders' && '📦 Órdenes'}
              {tab === 'map' && '🗺️ Mapa'}
              {tab === 'settings' && '⚙️ Configuración'}
            </button>
          ))}
        </nav>

        {/* Contenido de la Pestaña Activa con Animación de Entrada */}
        <div className="min-h-[400px] animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="p-6 space-y-4 border bg-secondary border-accent/20 rounded-3xl hover:border-accent/40 transition-colors">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <TrendingUp size={20} className="text-accent" /> Últimas Transacciones
                </h3>
                <div className="space-y-1">
                  {[1001, 1002, 1003].map((id, i) => (
                    <div key={id} className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-all group">
                      <span className="text-slate-300 font-medium">Pedido #{id}</span>
                      <div className="flex items-center gap-4">
                        <span className="font-bold text-accent group-hover:scale-110 transition-transform">$125.50</span>
                        <ChevronRight size={16} className="text-slate-600 group-hover:text-accent group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'drivers' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Gestión de Personal</h2>
                <button className="flex items-center gap-2 px-6 py-3 font-bold transition-all rounded-xl bg-accent hover:brightness-110 active:scale-95 text-primary shadow-lg shadow-accent/20">
                  <Plus size={20} /> Nuevo Driver
                </button>
              </div>
              <div className="grid gap-4">
                {drivers.map((driver) => (
                  <div key={driver.id} className="flex flex-col gap-4 p-5 transition-all border bg-secondary/80 border-white/5 rounded-2xl sm:flex-row sm:items-center sm:justify-between hover:bg-secondary hover:border-accent/30 group">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent group-hover:rotate-12 transition-transform">
                        <Users size={24} />
                      </div>
                      <div>
                        <h3 className="font-bold text-white group-hover:text-accent transition-colors">{driver.name}</h3>
                        <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Placa: {driver.plate} • {driver.entregas} Entregas</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-[10px] px-3 py-1 rounded-full font-black uppercase border ${driver.status === 'activo' ? 'bg-success/10 text-success border-success/20' : 'bg-slate-500/10 text-slate-500 border-slate-500/20'}`}>
                        ● {driver.status}
                      </span>
                      <button className="p-2.5 rounded-xl bg-white/5 text-slate-400 hover:text-white transition-all hover:bg-white/10"><Settings size={18} /></button>
                      <button className="p-2.5 rounded-xl bg-danger/10 text-danger hover:bg-danger hover:text-white transition-all"><Trash2 size={18} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'map' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <MapPin className="text-accent" /> Mapa de Entregas en Tiempo Real
              </h2>
              <div className="rounded-3xl overflow-hidden border border-accent/20 h-[500px]">
                <MapComponent origin="San Salvador Centro" destination="Boulevard Hipódromo" />
              </div>
            </div>
          )}

          {/* ... Aquí puedes agregar los contenidos de Orders y Settings ... */}

        </div>
      </main>
    </div>
  );
}