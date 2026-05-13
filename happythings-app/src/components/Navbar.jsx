import { 
  ShoppingCart, User, LayoutDashboard, ChevronDown, Rocket, Box, 
  Sparkles, Laptop, Shirt, Heart 
} from 'lucide-react';
import { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { useCartStore } from './cartStore'; 
import { useFavoritesStore } from '../store/favoritesStore';
import { Link, useNavigate, useSearchParams, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  
  const { cart, setIsOpen } = useCartStore();
  const { user, role } = useAuthStore(); 
  const { favorites } = useFavoritesStore();

  // Si no es la raíz, no renderiza nada (Evita que tape tu Dashboard)
  if (location.pathname !== '/') return null;

  const currentCategory = searchParams.get('category') || 'Todo';
  const cartCount = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);

  const handleDashboardClick = () => {
    if (!user) return navigate('/login');
    if (role === 'admin') navigate('/dashboard/admin');
    else navigate('/dashboard/customer');
  };

  return (
    <nav className="sticky top-0 z-40 bg-[#0f111a] border-b border-white/5 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between mb-2">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-7 h-7 bg-white rotate-45 flex items-center justify-center rounded-sm">
              <span className="text-[#0f111a] font-bold -rotate-45 text-lg">◇</span>
            </div>
            <h1 className="text-xl font-black text-white italic uppercase tracking-tighter">FastMart</h1>
          </Link>

          <div className="flex items-center gap-3">
            {/* Botón Favoritos en Navbar */}
            <button 
              onClick={() => navigate('/dashboard/customer')} 
              className="p-2.5 bg-white/5 rounded-xl text-white border border-white/10 hover:bg-pink-500/10 hover:text-pink-500 transition-all relative"
            >
              <Heart size={20} className={favorites.length > 0 ? 'fill-current' : ''} />
              {favorites.length > 0 && <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{favorites.length}</span>}
            </button>

            <button onClick={handleDashboardClick} className="group flex items-center bg-white/5 border border-white/10 rounded-xl h-10 px-3 hover:bg-white transition-all duration-500">
               <div className="shrink-0 text-white group-hover:text-black">
                  {user ? <LayoutDashboard size={18} /> : <User size={18} />}
               </div>
            </button>

            <button onClick={() => setIsOpen(true)} className="relative p-2.5 bg-white/5 rounded-xl text-white border border-white/10 hover:bg-white hover:text-black transition-all">
              <ShoppingCart size={20} />
              {cartCount > 0 && <span className="absolute -top-1 -right-1 bg-white text-black w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-black animate-bounce">{cartCount}</span>}
            </button>
          </div>
        </div>

        {/* Categorías (Tu código original) */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 border-t border-white/5 mt-2">
           {/* ... botones de categorías ... */}
        </div>
      </div>
    </nav>
  );
}