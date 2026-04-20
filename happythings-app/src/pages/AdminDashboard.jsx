import { BarChart3, Users, TrendingUp, Settings, ArrowLeft, Plus, Trash2, MapPin } from 'lucide-react';
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
    { label: 'Usuarios Totales', value: '1,234', icon: Users, color: 'text-blue-400' },
    { label: 'Ingresos Hoy', value: '$4,850', icon: TrendingUp, color: 'text-success' },
    { label: 'Órdenes Activas', value: '89', icon: BarChart3, color: 'text-accent' },
    { label: 'Drivers Activos', value: '23', icon: Users, color: 'text-purple-400' },
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

  const transactions = [
    { id: 1001, amount: 125.50, status: 'completado' },
    { id: 1002, amount: 249.99, status: 'completado' },
    { id: 1003, amount: 87.30, status: 'pendiente' },
  ];

  const handleCreateOrder = () => {
    if (newOrder.customer && newOrder.address) {
      alert('✅ Orden creada: ' + newOrder.customer);
      setShowCreateOrder(false);
      setNewOrder({ customer: '', address: '', driverId: '', items: 1 });
    }
  };

  const handleDeleteDriver = () => {
    if (window.confirm('¿Estás seguro? (Soft Delete)')) {
      alert('Driver desactivado correctamente');
    }
  };

  return (
    <div className="min-h-screen bg-primary">
      {/* Header */}
      <div className="p-4 border-b bg-linear-to-r from-secondary to-primary border-accent/20 sm:p-6">
        <div className="flex items-center justify-between mx-auto max-w-7xl">
          <div>
            <h1 className="text-2xl font-bold sm:text-3xl text-accent">Admin Panel</h1>
            <p className="text-slate-400">Bienvenido, {user?.name} ⚙️</p>
          </div>
          <button
            onClick={() => {
              logout();
              navigate('/');
            }}
            className="flex items-center gap-2 px-4 py-2 font-semibold transition rounded-lg bg-danger hover:bg-danger/80"
          >
            <ArrowLeft size={18} />
            <span className="hidden sm:inline">Salir</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <main className="px-4 py-8 mx-auto space-y-8 max-w-7xl sm:px-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="p-6 space-y-3 transition border bg-secondary border-accent/20 rounded-xl hover:border-accent/50"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-slate-400">{stat.label}</p>
                  <Icon size={24} className={stat.color} />
                </div>
                <p className="text-3xl font-bold text-white">{stat.value}</p>
              </div>
            );
          })}
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 p-2 border rounded-lg bg-secondary/50 border-accent/10">
          {['overview', 'drivers', 'orders', 'map', 'settings'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg font-semibold transition capitalize ${
                activeTab === tab
                  ? 'bg-accent text-primary'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab === 'overview' && '📊 Resumen'}
              {tab === 'drivers' && '🚚 Drivers'}
              {tab === 'orders' && '📦 Órdenes'}
              {tab === 'map' && '🗺️ Mapa'}
              {tab === 'settings' && '⚙️ Configuración'}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="p-6 space-y-4 border bg-secondary border-accent/20 rounded-xl">
                <h3 className="text-lg font-bold text-white">Últimas Transacciones</h3>
                <div className="space-y-3">
                  {transactions.map((trans) => (
                    <div key={trans.id} className="flex items-center justify-between py-2 border-b border-accent/10">
                      <span className="text-slate-300">Pedido #{trans.id}</span>
                      <span className="font-bold text-accent">${trans.amount.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 space-y-4 border bg-secondary border-accent/20 rounded-xl">
                <h3 className="text-lg font-bold text-white">Estadísticas Hoy</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Órdenes Completadas</span>
                    <span className="font-bold text-success">156</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Tasa de Entrega</span>
                    <span className="font-bold text-accent">98.5%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Clientes Nuevos</span>
                    <span className="font-bold text-blue-400">42</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'drivers' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Gestión de Drivers</h2>
              <button className="flex items-center gap-2 px-4 py-2 font-bold transition rounded-lg bg-accent hover:bg-accent/80 text-primary">
                <Plus size={18} />
                Nuevo Driver
              </button>
            </div>

            {drivers.map((driver) => (
              <div
                key={driver.id}
                className="flex flex-col gap-4 p-4 transition border bg-secondary border-accent/20 rounded-xl sm:p-6 sm:flex-row sm:items-center sm:justify-between hover:border-accent/50"
              >
                <div className="space-y-1">
                  <h3 className="font-bold text-white">{driver.name}</h3>
                  <p className="text-sm text-slate-400">Placa: {driver.plate} | Entregas: {driver.entregas}</p>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      driver.status === 'activo'
                        ? 'bg-success/20 text-success'
                        : 'bg-slate-500/20 text-slate-400'
                    }`}
                  >
                    {driver.status === 'activo' ? '● Activo' : '● Inactivo'}
                  </span>
                  <button className="px-4 py-2 font-semibold transition rounded-lg bg-secondary hover:bg-secondary/80 text-accent">
                    Editar
                  </button>
                  <button
                    onClick={() => handleDeleteDriver(driver.id)}
                    className="px-4 py-2 font-semibold transition rounded-lg bg-danger/20 hover:bg-danger/30 text-danger"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Órdenes del Sistema</h2>
              <button
                onClick={() => setShowCreateOrder(!showCreateOrder)}
                className="flex items-center gap-2 px-4 py-2 font-bold transition rounded-lg bg-accent hover:bg-accent/80 text-primary"
              >
                <Plus size={18} />
                Nueva Orden
              </button>
            </div>

            {/* Create Order Form */}
            {showCreateOrder && (
              <div className="p-6 space-y-4 border bg-secondary border-accent/20 rounded-xl">
                <h3 className="text-lg font-bold text-white">Crear Nueva Orden</h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <input
                    type="text"
                    placeholder="Nombre del Cliente"
                    value={newOrder.customer}
                    onChange={(e) => setNewOrder({ ...newOrder, customer: e.target.value })}
                    className="px-4 py-2 text-white border rounded-lg bg-primary border-accent/20 placeholder-slate-500 focus:border-accent focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Dirección"
                    value={newOrder.address}
                    onChange={(e) => setNewOrder({ ...newOrder, address: e.target.value })}
                    className="px-4 py-2 text-white border rounded-lg bg-primary border-accent/20 placeholder-slate-500 focus:border-accent focus:outline-none"
                  />
                  <select
                    value={newOrder.driverId}
                    onChange={(e) => setNewOrder({ ...newOrder, driverId: e.target.value })}
                    className="px-4 py-2 text-white border rounded-lg bg-primary border-accent/20 focus:border-accent focus:outline-none"
                  >
                    <option value="">Seleccionar Driver</option>
                    {drivers
                      .filter((d) => d.status === 'activo')
                      .map((d) => (
                        <option key={d.id} value={d.id}>
                          {d.name}
                        </option>
                      ))}
                  </select>
                  <input
                    type="number"
                    placeholder="Cantidad de items"
                    value={newOrder.items}
                    onChange={(e) => setNewOrder({ ...newOrder, items: parseInt(e.target.value) })}
                    className="px-4 py-2 text-white border rounded-lg bg-primary border-accent/20 placeholder-slate-500 focus:border-accent focus:outline-none"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleCreateOrder}
                    className="flex-1 px-4 py-2 font-bold text-white transition rounded-lg bg-success hover:bg-success/80"
                  >
                    Crear Orden
                  </button>
                  <button
                    onClick={() => setShowCreateOrder(false)}
                    className="flex-1 px-4 py-2 font-bold text-white transition rounded-lg bg-danger hover:bg-danger/80"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            )}

            {/* Orders List */}
            {orders.map((order) => (
              <div key={order.id} className="p-4 border bg-secondary border-accent/20 rounded-xl sm:p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="space-y-1">
                    <h3 className="font-bold text-white">{order.id}</h3>
                    <p className="text-sm text-slate-400">{order.customer}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-accent">{order.total}</p>
                    <p className="text-sm text-slate-400">Driver: {order.driver}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      order.status === 'completado'
                        ? 'bg-success/20 text-success'
                        : order.status === 'en-ruta'
                        ? 'bg-blue-500/20 text-blue-400'
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}
                  >
                    {order.status === 'completado' ? '✓ Entregado' : order.status === 'en-ruta' ? 'En Ruta' : 'Pendiente'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'map' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white">Mapa de Entregas</h2>
            <MapComponent
              origin="San Salvador Centro"
              destination="Boulevard Hipódromo, San Salvador"
            />
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="p-6 space-y-4 border bg-secondary border-accent/20 rounded-xl">
            <h2 className="flex items-center gap-2 text-xl font-bold text-white">
              <Settings size={20} />
              Configuración del Sistema
            </h2>
            <div className="space-y-3">
              {[
                'Comisión de delivery (por defecto: 10%)',
                'Tiempo máximo de entrega',
                'Distancia mínima para nuevos drivers',
                'Email de notificaciones',
              ].map((setting, idx) => (
                <div key={idx} className="flex items-center justify-between py-3 border-b border-accent/10">
                  <span className="text-slate-300">{setting}</span>
                  <button className="px-4 py-1 text-sm font-semibold transition rounded-lg bg-accent/20 hover:bg-accent/30 text-accent">
                    Editar
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}