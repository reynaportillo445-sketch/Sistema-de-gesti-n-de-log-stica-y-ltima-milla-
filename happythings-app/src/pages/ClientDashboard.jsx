import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion'; // Importamos animaciones
import { 
  ArrowLeft, Package, Edit2, LogOut, Heart, Trash2, 
  ShoppingCart, User as UserIcon, ExternalLink 
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useFavoritesStore } from '../store/favoritesStore';

export default function ClientDashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const { favorites, toggleFavorite } = useFavoritesStore();
  const [activeTab, setActiveTab] = useState('favorites'); // Forzamos favoritos para probar

  return (
    <div className="min-h-screen bg-[#0f111a] text-slate-200 selection:bg-pink-500/30">
      {/* HEADER ANIMADO */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="border-b border-white/5 bg-[#161925]/50 backdrop-blur-xl sticky top-0 z-30"
      >
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500 to-violet-600 p-[1px]">
              <div className="w-full h-full rounded-2xl bg-[#0f111a] flex items-center justify-center">
                <UserIcon className="text-white" size={20} />
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white leading-none tracking-tight">
                {user?.name || 'Usuario'}
              </h1>
              <p className="text-[10px] text-pink-500 mt-1 uppercase font-black tracking-[0.2em]">Dashboard Elite</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/')} className="px-4 py-2 text-sm font-bold text-slate-400 hover:text-white transition-all flex items-center gap-2 hover:bg-white/5 rounded-xl">
              <ArrowLeft size={18} /> <span className="hidden sm:inline">Volver a Tienda</span>
            </button>
            <button onClick={() => { logout(); navigate('/'); }} className="p-2.5 rounded-xl bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white transition-all shadow-lg shadow-red-500/10">
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </motion.header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* SIDEBAR */}
          <aside className="lg:col-span-3 space-y-2">
            {[
              { id: 'orders', label: 'Mis Pedidos', icon: Package, color: 'hover:text-blue-400' },
              { id: 'favorites', label: 'Favoritos', icon: Heart, color: 'hover:text-pink-500' },
              { id: 'profile', label: 'Editar Perfil', icon: Edit2, color: 'hover:text-emerald-400' }
            ].map((item) => (
              <button 
                key={item.id}
                onClick={() => setActiveTab(item.id)} 
                className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl font-bold transition-all relative group overflow-hidden ${
                  activeTab === item.id 
                  ? 'bg-white text-[#0f111a] shadow-xl shadow-white/5' 
                  : `text-slate-500 hover:bg-white/5 ${item.color}`
                }`}
              >
                <item.icon size={20} className={activeTab === item.id ? 'fill-current' : ''} />
                <span className="relative z-10">{item.label}</span>
                {item.id === 'favorites' && favorites.length > 0 && (
                  <span className={`ml-auto text-[10px] px-2 py-0.5 rounded-lg ${activeTab === item.id ? 'bg-black text-white' : 'bg-pink-500 text-white'}`}>
                    {favorites.length}
                  </span>
                )}
              </button>
            ))}
          </aside>

          {/* CONTENIDO PRINCIPAL CON ANIMEPRESENCE */}
          <div className="lg:col-span-9">
            <AnimatePresence mode="wait">
              {activeTab === 'favorites' && (
                <motion.div 
                  key="favs"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter">Mis Guardados</h2>
                      <p className="text-slate-500 text-sm">Productos que te hicieron ojitos</p>
                    </div>
                  </div>

                  {favorites.length === 0 ? (
                    <motion.div 
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="bg-[#161925] border-2 border-dashed border-white/5 rounded-[2rem] p-20 text-center"
                    >
                      <div className="w-20 h-20 bg-pink-500/5 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Heart size={40} className="text-slate-700" />
                      </div>
                      <p className="text-slate-400 font-bold text-lg">Tu lista está vacía</p>
                      <p className="text-slate-600 text-sm mt-2 mb-8">¡Explora la tienda y dale amor a tus productos favoritos!</p>
                      <button onClick={() => navigate('/')} className="bg-white text-black px-8 py-3 rounded-xl font-black uppercase text-xs tracking-widest hover:scale-105 transition-transform">
                        Ir a Explorar
                      </button>
                    </motion.div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <AnimatePresence>
                        {favorites.map((product) => (
                          <motion.div 
                            key={product.id || product._id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            whileHover={{ y: -5 }}
                            className="bg-[#161925] border border-white/5 rounded-[1.5rem] p-5 flex gap-5 hover:border-pink-500/40 transition-colors group relative overflow-hidden"
                          >
                            {/* IMAGEN CON OVERLAY */}
                            <div className="w-28 h-28 bg-[#0f111a] rounded-2xl overflow-hidden shrink-0 border border-white/5 relative">
                               <img 
                                 src={product.image} 
                                 alt={product.name}
                                 className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                               />
                               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-2">
                                  <ExternalLink size={16} className="text-white" />
                               </div>
                            </div>

                            {/* INFO PRODUCTO */}
                            <div className="flex-1 flex flex-col justify-between py-1">
                              <div>
                                <div className="flex justify-between items-start">
                                  <h3 className="font-bold text-white group-hover:text-pink-400 transition-colors line-clamp-1">{product.name}</h3>
                                </div>
                                <p className="text-2xl font-black text-white mt-1">
                                  <span className="text-pink-500 text-sm mr-1">$</span>{product.price}
                                </p>
                              </div>
                              
                              <div className="flex gap-2">
                                 <button className="flex-[3] bg-white text-black py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-pink-500 hover:text-white transition-all flex items-center justify-center gap-2 active:scale-95">
                                   <ShoppingCart size={14} /> Añadir al Carro
                                 </button>
                                 <button 
                                   onClick={() => toggleFavorite(product)} 
                                   className="flex-1 bg-white/5 text-slate-400 rounded-xl hover:bg-red-500/10 hover:text-red-500 transition-all flex items-center justify-center group/trash"
                                 >
                                   <Trash2 size={18} className="group-hover/trash:rotate-12 transition-transform" />
                                 </button>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}