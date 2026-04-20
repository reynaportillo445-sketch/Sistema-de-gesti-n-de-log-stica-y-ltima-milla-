import { ShoppingCart, LogOut, Menu, X, Trash2, ShoppingBag, User } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { useCartStore } from './cartStore'; 
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // Stores
  const { cart, isOpen, setIsOpen, removeItem } = useCartStore();
  const { user, logout } = useAuthStore();
  
  // Cálculos
  const currentCategory = searchParams.get('category') || 'Todo';
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Bloquear el scroll del fondo cuando el carrito esté abierto
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
  }, [isOpen]);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate('/');
  };

  const categories = ['Todo', 'Tecno', 'Hogar', 'Accesorios', 'Ropa', 'Tools'];

  return (
    <>
      <nav className="sticky top-0 z-40 bg-gradient-to-r from-primary to-secondary border-b border-accent/20 backdrop-blur shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            {/* LOGO */}
            <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition">
              <span className="text-2xl font-bold text-accent">◇</span>
              <h1 className="text-xl font-bold text-white hidden sm:block">FastMart</h1>
            </Link>

            <div className="flex items-center gap-4 ml-auto">
              {/* --- PARTE DE LOGIN / USUARIO --- */}
              {!user ? (
                <button 
                  onClick={() => navigate('/login')}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 transition text-sm font-semibold"
                >
                  <User size={16} className="text-accent" />
                  <span className="hidden xs:inline">Ingresar</span>
                </button>
              ) : (
                <div className="flex items-center gap-3 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10">
                  <div className="text-right hidden xs:block">
                    <p className="text-[10px] text-white/40 leading-none">Bienvenido</p>
                    <p className="text-xs text-white font-bold leading-tight truncate max-w-[80px]">
                      {user.name || 'Usuario'}
                    </p>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="p-2 text-danger/70 hover:text-danger hover:bg-danger/10 rounded-lg transition"
                    title="Cerrar Sesión"
                  >
                    <LogOut size={18} />
                  </button>
                </div>
              )}

              {/* BOTÓN CARRITO */}
              <button 
                onClick={() => setIsOpen(true)} 
                className="relative p-2 hover:bg-white/5 rounded-lg transition text-white"
              >
                <ShoppingCart size={24} className="text-accent" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-danger w-5 h-5 rounded-full text-[10px] flex items-center justify-center font-bold animate-in zoom-in">
                    {cartCount}
                  </span>
                )}
              </button>
              
              {/* MENÚ MÓVIL (Hamburguesa) */}
              <button onClick={() => setMenuOpen(!menuOpen)} className="sm:hidden p-2 text-white hover:bg-white/5 rounded-lg">
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* CATEGORÍAS */}
          <div className="flex overflow-x-auto gap-2 pb-2 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => cat === 'Todo' ? navigate('/') : navigate(`/?category=${cat}`)}
                className={`px-4 py-1.5 rounded-full text-xs sm:text-sm flex-shrink-0 transition-all font-semibold ${
                  currentCategory === cat 
                    ? 'bg-accent text-primary shadow-lg shadow-accent/20' 
                    : 'bg-secondary/50 text-white/70 hover:text-white hover:bg-secondary'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* MENÚ MÓVIL DESPLEGABLE */}
        {menuOpen && (
          <div className="sm:hidden border-t border-white/5 bg-secondary/95 p-4 space-y-3 animate-in slide-in-from-top duration-300">
             {!user && (
               <button 
                 onClick={() => { navigate('/login'); setMenuOpen(false); }}
                 className="w-full py-3 bg-accent text-primary font-bold rounded-xl flex items-center justify-center gap-2"
               >
                 <User size={18} /> Iniciar Sesión
               </button>
             )}
          </div>
        )}
      </nav>

      {/* --- CARRITO LATERAL (DRAWER) --- */}
      <div className={`fixed inset-0 z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
        
        <div className={`absolute right-0 top-0 h-full w-full max-w-sm bg-[#11121e] border-l border-accent/10 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          
          <div className="p-6 border-b border-white/5 flex justify-between items-center bg-secondary/20">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <ShoppingBag size={22} className="text-accent" /> Mi Pedido
            </h2>
            <button onClick={() => setIsOpen(false)} className="text-white/60 hover:text-white transition-colors">
              <X size={28} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
            {cart.length === 0 ? (
              <div className="text-center py-20 text-gray-600 font-medium">El carrito está vacío</div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="flex gap-4 bg-white/[0.03] p-4 rounded-2xl border border-white/5 shadow-sm">
                  <img src={item.image} className="w-16 h-16 object-cover rounded-xl border border-white/10" alt={item.name} />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white text-sm font-semibold truncate">{item.name}</h4>
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-accent font-bold">
                        {item.quantity} <span className="text-[10px] text-white/30 font-normal">x</span> ${item.price}
                      </p>
                      <button onClick={() => removeItem(item.id)} className="text-danger/40 hover:text-danger transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {cart.length > 0 && (
            <div className="p-6 bg-secondary/40 border-t border-white/5">
              <div className="flex justify-between items-center mb-6">
                <span className="text-gray-400 font-medium">Subtotal</span>
                <span className="text-2xl font-black text-accent">${total.toFixed(2)}</span>
              </div>
              <button className="w-full py-4 bg-accent text-primary font-black rounded-2xl hover:brightness-110 active:scale-[0.98] transition-all">
                CONFIRMAR COMPRA
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
