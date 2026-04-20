import { ArrowLeft, Package, MapPin, Phone, Mail, Edit2, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useState } from 'react';

export default function ClientDashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const [activeTab, setActiveTab] = useState('orders');
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
  });

  const orders = [
    {
      id: '#ORD-2024-001',
      status: 'delivered',
      date: '2024-01-15',
      items: 3,
      total: '$125.50',
      driver: 'Carlos M.',
    },
    {
      id: '#ORD-2024-002',
      status: 'shipping',
      date: '2024-01-18',
      items: 1,
      total: '$49.99',
      driver: 'Juan P.',
      location: 'En ruta...',
    },
    {
      id: '#ORD-2024-003',
      status: 'processing',
      date: '2024-01-20',
      items: 5,
      total: '$289.99',
      driver: 'Pendiente',
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'bg-success/20 text-success';
      case 'shipping':
        return 'bg-blue-500/20 text-blue-400';
      case 'processing':
        return 'bg-yellow-500/20 text-yellow-400';
      default:
        return 'bg-slate-500/20 text-slate-400';
    }
  };

  const getStatusLabel = (status) => {
    const labels = {
      delivered: 'Entregado',
      shipping: 'En tránsito',
      processing: 'Procesando',
    };
    return labels[status] || status;
  };

  const handleSaveProfile = () => {
    setEditingProfile(false);
    // Aquí iría la llamada al backend
  };

  return (
    <div className="min-h-screen bg-primary">
      {/* Header */}
      <div className="p-4 border-b bg-linear-to-r from-secondary to-primary border-accent/20 sm:p-6">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div>
            <h1 className="text-2xl font-bold sm:text-3xl text-accent">Mi Cuenta</h1>
            <p className="text-slate-400">Hola, {user?.name} 👋</p>
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

      {/* Tabs */}
      <div className="max-w-6xl px-4 py-6 mx-auto border-b sm:px-6 border-accent/10">
        <div className="flex gap-4">
          {[
            { id: 'orders', label: '📦 Mis Pedidos' },
            { id: 'profile', label: '👤 Mi Perfil' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 px-4 font-semibold transition border-b-2 ${
                activeTab === tab.id
                  ? 'border-accent text-accent'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <main className="max-w-6xl px-4 py-8 mx-auto space-y-6 sm:px-6">
        {/* ORDERS TAB */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="p-4 space-y-2 border bg-secondary border-accent/20 rounded-xl">
                <p className="text-sm text-slate-400">Total de Pedidos</p>
                <p className="text-3xl font-bold text-accent">3</p>
              </div>
              <div className="p-4 space-y-2 border bg-secondary border-accent/20 rounded-xl">
                <p className="text-sm text-slate-400">En Tránsito</p>
                <p className="text-3xl font-bold text-blue-400">1</p>
              </div>
              <div className="p-4 space-y-2 border bg-secondary border-accent/20 rounded-xl">
                <p className="text-sm text-slate-400">Entregados</p>
                <p className="text-3xl font-bold text-success">1</p>
              </div>
            </div>

            {/* Orders List */}
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="p-4 space-y-4 transition border cursor-pointer bg-secondary border-accent/20 rounded-xl sm:p-6 hover:border-accent/50"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-bold text-white">{order.id}</h3>
                        <span
                          className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {getStatusLabel(order.status)}
                        </span>
                      </div>
                      <p className="text-sm text-slate-400">Pedido el {order.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-accent">{order.total}</p>
                      <p className="text-sm text-slate-400">{order.items} productos</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-accent/10">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-400">
                        Driver: <span className="font-semibold text-white">{order.driver}</span>
                      </span>
                      {order.location && (
                        <span className="flex items-center gap-1 text-accent">
                          <MapPin size={16} />
                          {order.location}
                        </span>
                      )}
                    </div>
                  </div>

                  <button className="w-full px-4 py-2 mt-4 font-bold transition rounded-lg bg-accent hover:bg-accent/80 text-primary">
                    Ver Detalles
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PROFILE TAB */}
        {activeTab === 'profile' && (
          <div className="max-w-2xl">
            <div className="p-6 space-y-6 border bg-secondary border-accent/20 rounded-xl">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Mis Datos Personales</h2>
                <button
                  onClick={() => setEditingProfile(!editingProfile)}
                  className="flex items-center gap-2 px-4 py-2 font-bold transition rounded-lg bg-accent hover:bg-accent/80 text-primary"
                >
                  <Edit2 size={18} />
                  {editingProfile ? 'Cancelar' : 'Editar'}
                </button>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {/* Nombre */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-300">Nombre</label>
                  {editingProfile ? (
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                      className="w-full px-4 py-2 text-white border rounded-lg bg-primary border-accent/20 focus:border-accent focus:outline-none"
                    />
                  ) : (
                    <p className="font-semibold text-white">{profileData.name}</p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-300">Email</label>
                  {editingProfile ? (
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      className="w-full px-4 py-2 text-white border rounded-lg bg-primary border-accent/20 focus:border-accent focus:outline-none"
                    />
                  ) : (
                    <p className="flex items-center gap-2 font-semibold text-white">
                      <Mail size={18} className="text-accent" />
                      {profileData.email}
                    </p>
                  )}
                </div>

                {/* Teléfono */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-300">Teléfono</label>
                  {editingProfile ? (
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                      className="w-full px-4 py-2 text-white border rounded-lg bg-primary border-accent/20 focus:border-accent focus:outline-none"
                    />
                  ) : (
                    <p className="flex items-center gap-2 font-semibold text-white">
                      <Phone size={18} className="text-accent" />
                      {profileData.phone}
                    </p>
                  )}
                </div>

                {/* Dirección */}
                <div className="space-y-2 sm:col-span-2">
                  <label className="text-sm font-semibold text-slate-300">Dirección</label>
                  {editingProfile ? (
                    <textarea
                      value={profileData.address}
                      onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                      className="w-full px-4 py-2 text-white border rounded-lg bg-primary border-accent/20 focus:border-accent focus:outline-none"
                      rows="3"
                    />
                  ) : (
                    <p className="flex items-center gap-2 font-semibold text-white">
                      <MapPin size={18} className="text-accent" />
                      {profileData.address}
                    </p>
                  )}
                </div>
              </div>

              {editingProfile && (
                <button
                  onClick={handleSaveProfile}
                  className="flex items-center justify-center w-full gap-2 px-4 py-3 font-bold text-white transition rounded-lg bg-success hover:bg-success/80"
                >
                  <Check size={20} />
                  Guardar Cambios
                </button>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}