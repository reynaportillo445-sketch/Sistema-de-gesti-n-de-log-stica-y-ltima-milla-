import { ShoppingCart, Heart, CheckCircle2, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useCartStore } from './cartStore'; 
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';

export default function ProductCard({ product }) {
  const [liked, setLiked] = useState(false);
  const [status, setStatus] = useState('idle'); // 'idle', 'loading', 'success'
  
  const navigate = useNavigate();
  const addToCart = useCartStore((state) => state.addToCart);
  const { user } = useAuthStore();

  const handleAddClick = async () => {
    if (!user) return navigate('/login');

    setStatus('loading');
    
    // Simulación de delay para la animación
    await new Promise(resolve => setTimeout(resolve, 800));
    
    addToCart(product);
    setStatus('success');

    // Volver al estado normal después de la animación
    setTimeout(() => setStatus('idle'), 2000);
  };

  return (
    <div className="group bg-[#0f111a] rounded-2xl overflow-hidden border border-white/5 hover:border-blue-500/30 transition-all duration-500">
      <div className="relative h-52 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
        />
      </div>

      <div className="p-5 space-y-4">
        <div>
          <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">
            {product.category}
          </p>
          <h3 className="font-bold text-white text-lg leading-tight">{product.name}</h3>
        </div>

        <div className="flex items-end gap-3">
          <span className="text-2xl font-black text-white">${product.price}</span>
          <span className="text-xs text-slate-500 line-through mb-1">
            ${(product.price * 2).toFixed(2)}
          </span>
        </div>

        <div className="flex gap-2">
          <button 
            disabled={status !== 'idle'}
            onClick={handleAddClick}
            className={`flex-1 font-black py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 text-xs overflow-hidden
              ${status === 'success' 
                ? 'bg-green-500 text-white scale-105 shadow-[0_0_20px_rgba(34,197,94,0.3)]' 
                : 'bg-white/5 text-white hover:bg-blue-600 hover:text-white'
              }`}
          >
            {status === 'loading' ? (
              <Loader2 size={16} className="animate-spin" />
            ) : status === 'success' ? (
              <>
                <CheckCircle2 size={16} className="animate-in zoom-in" />
                ¡AÑADIDO!
              </>
            ) : (
              <>
                <ShoppingCart size={16} />
                AÑADIR
              </>
            )}
          </button>
          
          <button 
            onClick={() => setLiked(!liked)} 
            className={`p-3 rounded-xl border border-white/5 transition-colors ${
              liked ? 'bg-red-500/10 text-red-500 border-red-500/20' : 'bg-white/5 text-slate-500'
            }`}
          >
            <Heart size={20} fill={liked ? "currentColor" : "none"} />
          </button>
        </div>
      </div>
    </div>
  );
}