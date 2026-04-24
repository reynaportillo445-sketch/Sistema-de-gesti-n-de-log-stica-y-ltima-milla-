import { 
  ArrowLeft, 
  Package, 
  MapPin, 
  Phone, 
  Mail, 
  Edit2, 
  Check, 
  Clock, 
  ChevronRight, 
  LogOut,
  Shield,
  User as UserIcon 
} from 'lucide-react';
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
    { id: '#ORD-2024-001', status: 'entregado', date: '15 Ene 2024', items: 3, total: '$125.50', driver: 'Carlos M.' },
    { id: '#ORD-2024-002', status: 'en camino', date: '18 Ene 2024', items: 1, total: '$49.99', driver: 'Juan P.', location: 'Cerca de tu zona' },
    { id: '#ORD-2024-003', status: 'procesando', date: '20 Ene 2024', items: 5, total: '$289.99', driver: 'Asignando...' },
  ];

  const getStatusStyles = (status) => {
    switch (status) {
      case 'entregado': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
      case 'en camino': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'procesando': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      default: return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  return (
    <div className="min-h-screen bg-[#0f111a] text-slate-200 font-sans">
      
      {/* HEADER */}
      <header className="border-b border-white/5 bg-[#161925]/50 backdrop-blur-md sticky top-0 z-30 animate-in fade-in slide-in-from-top duration-500">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-accent/20 flex items-center justify-center border border-accent/20">
              <UserIcon className="text-accent" size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white leading-none">{user?.name || 'Mi Perfil'}</h1>
              <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider font-semibold">Panel de Cliente</p>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            {/* BOTÓN VOLVER (Flecha Simple Animada) */}
            <button
              onClick={() => navigate('/')}
              className="group flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-white transition-colors outline-none"
            >
              <ArrowLeft size={20} className="group-hover:-translate-x-1.5 transition-transform duration-300" />
              <span className="hidden sm:inline">Inicio</span>
            </button>

            {/* BOTÓN CERRAR SESIÓN (Expansivo) */}
            <button
              onClick={() => { logout(); navigate('/'); }}
              className="relative flex items-center gap-3 group outline-none"
            >
              <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 group-hover:bg-red-500 group-hover:text-white group-hover:rotate-12 transition-all duration-500 shadow-lg shadow-red-500/5">
                <LogOut size={20} />
              </div>
              <div className="flex flex-col items-start overflow-hidden w-0 group-hover:w-24 transition-all duration-500 ease-in-out">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 delay-75 whitespace-nowrap">
                  Cerrar
                </span>
                <span className="text-sm font-bold text-red-500 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 delay-150 whitespace-nowrap">
                  Sesión
                </span>
              </div>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* SIDEBAR */}
          <aside className="lg:col-span-3 space-y-2 animate-in fade-in slide-in-from-left-8 duration-700">
            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all duration-300 ${
                activeTab === 'orders' 
                ? 'bg-accent text-primary shadow-lg shadow-accent/20 scale-105' 
                : 'hover:bg-white/5 text-slate-400 hover:translate-x-2'
              }`}
            >
              <Package size={20} /> Mis Pedidos
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all duration-300 ${
                activeTab === 'profile' 
                ? 'bg-accent text-primary shadow-lg shadow-accent/20 scale-105' 
                : 'hover:bg-white/5 text-slate-400 hover:translate-x-2'
              }`}
            >
              <Edit2 size={20} /> Editar Perfil
            </button>

            {user?.role === 'admin' && (
              <div className="mt-10 pt-6 border-t border-white/5 animate-in slide-in-from-bottom-4 duration-1000">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4 px-4">Administración</p>
                <button
                  onClick={() => navigate('/admin/roles')}
                  className="w-full group flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all duration-300 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 hover:bg-emerald-500 hover:text-white hover:shadow-[0_0_20px_rgba(16,185,129,0.2)]"
                >
                  <Shield size={20} className="group-hover:scale-110 transition-transform" /> 
                  Gestionar Roles
                </button>
              </div>
            )}
          </aside>

          {/* CONTENIDO PRINCIPAL */}
          <div className="lg:col-span-9 space-y-8">
            {activeTab === 'orders' && (
              <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                  {[
                    { label: 'Pedidos Totales', val: '03', color: 'text-accent', icon: Package, delay: 'delay-100' },
                    { label: 'En camino', val: '01', color: 'text-blue-400', icon: Clock, delay: 'delay-200' },
                    { label: 'Entregados', val: '01', color: 'text-emerald-400', icon: Check, delay: 'delay-300' },
                  ].map((stat, i) => (
                    <div key={i} className={`p-6 rounded-2xl bg-[#161925] border border-white/5 flex items-center justify-between transition-transform hover:scale-[1.02] duration-300 ${stat.delay}`}>
                      <div>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
                        <p className={`text-3xl font-black ${stat.color}`}>{stat.val}</p>
                      </div>
                      <stat.icon size={32} className="opacity-10" />
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  {orders.map((order, index) => (
                    <div
                      key={order.id}
                      style={{ animationDelay: `${index * 100}ms` }}
                      className="group bg-[#161925] border border-white/5 rounded-2xl p-5 hover:border-accent/40 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-accent/10 animate-in fade-in slide-in-from-right-4"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <div className={`p-3 rounded-xl border transition-colors group-hover:bg-white/5 ${getStatusStyles(order.status)}`}>
                            <Package size={24} />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-white font-bold">{order.id}</span>
                              <span className={`text-[10px] px-2 py-0.5 rounded-md font-bold uppercase tracking-tighter border ${getStatusStyles(order.status)}`}>
                                {order.status}
                              </span>
                            </div>
                            <p className="text-sm text-slate-500 italic">Realizado el {order.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between md:text-right md:flex-col gap-2">
                          <p className="text-2xl font-black text-white group-hover:text-accent transition-colors">{order.total}</p>
                          <p className="text-xs font-medium text-slate-500">{order.items} artículos</p>
                        </div>
                      </div>
                      <div className="mt-5 pt-4 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 opacity-80 group-hover:opacity-100 transition-opacity">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2 text-xs text-slate-400 bg-white/5 px-3 py-1.5 rounded-lg">
                            <UserIcon size={14} className="text-accent" />
                            <span>Repartidor: <b className="text-slate-200">{order.driver}</b></span>
                          </div>
                          {order.location && (
                            <div className="flex items-center gap-2 text-xs text-blue-400 animate-pulse font-bold">
                              <MapPin size={14} />
                              <span>{order.location}</span>
                            </div>
                          )}
                        </div>
                        <button className="flex items-center justify-center gap-1 text-sm font-bold text-accent hover:translate-x-1 transition-transform">
                          Ver detalles <ChevronRight size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* VISTA DE PERFIL */}
            {activeTab === 'profile' && (
              <div className="animate-in fade-in zoom-in-95 duration-500 ease-out">
                <div className="bg-[#161925] border border-white/5 rounded-3xl overflow-hidden shadow-xl">
                  <div className="h-32 bg-gradient-to-r from-accent/20 via-secondary/20 to-accent/20 bg-[length:200%_auto] animate-gradient-x relative">
                    <div className="absolute -bottom-10 left-8 p-1 bg-[#161925] rounded-3xl border border-white/5 animate-in slide-in-from-bottom-4 duration-700">
                        <div className="w-20 h-20 rounded-2xl bg-accent flex items-center justify-center text-primary text-3xl font-black">
                          {profileData.name.charAt(0)}
                        </div>
                    </div>
                  </div>
                  
                  <div className="pt-16 p-8 space-y-8">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-2xl font-black text-white">Configuración del Perfil</h2>
                        <p className="text-slate-500 text-sm">Gestiona tu información de contacto</p>
                      </div>
                      <button
                        onClick={() => setEditingProfile(!editingProfile)}
                        className={`p-3 rounded-xl transition-all duration-300 ${editingProfile ? 'bg-emerald-500 text-white rotate-90' : 'bg-white/5 text-slate-400 hover:text-accent border border-white/10 hover:rotate-12'}`}
                      >
                        {editingProfile ? <Check size={20} /> : <Edit2 size={20} />}
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {[
                        { label: 'Nombre Completo', val: 'name', type: 'text', icon: null },
                        { label: 'Correo Electrónico', val: 'email', type: 'email', icon: Mail },
                        { label: 'Teléfono Móvil', val: 'phone', type: 'tel', icon: Phone },
                      ].map((field) => (
                        <div key={field.val} className="space-y-2 group">
                          <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 group-focus-within:text-accent transition-colors">{field.label}</label>
                          <div className="relative">
                            {field.icon && <field.icon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-accent transition-colors" size={18} />}
                            <input
                              disabled={!editingProfile}
                              type={field.type}
                              value={profileData[field.val]}
                              onChange={(e) => setProfileData({ ...profileData, [field.val]: e.target.value })}
                              className={`w-full ${field.icon ? 'pl-12' : 'px-5'} py-3 rounded-2xl bg-[#0f111a] border border-white/5 text-white focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all outline-none disabled:opacity-60 disabled:cursor-not-allowed`}
                            />
                          </div>
                        </div>
                      ))}
                      
                      <div className="space-y-2 sm:col-span-2 group">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 group-focus-within:text-accent transition-colors">Dirección de Entrega</label>
                        <div className="relative">
                          <MapPin className="absolute left-4 top-4 text-slate-600 group-focus-within:text-accent transition-colors" size={18} />
                          <textarea
                            disabled={!editingProfile}
                            value={profileData.address}
                            onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                            className="w-full pl-12 pr-5 py-3 rounded-2xl bg-[#0f111a] border border-white/5 text-white focus:border-accent/50 transition-all outline-none disabled:opacity-60 resize-none"
                            rows="3"
                          />
                        </div>
                      </div>
                    </div>

                    {editingProfile && (
                      <button 
                        onClick={() => setEditingProfile(false)}
                        className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-2xl transition-all animate-in zoom-in-95"
                      >
                        Guardar Cambios
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}