import { ShoppingCart, Heart, CheckCircle2, Loader2 } from 'lucide-react';
import { useState } from 'react';
<<<<<<< HEAD
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from './cartStore'; 
import { useAuthStore } from '../store/authStore';
import { useFavoritesStore } from '../store/favoritesStore';
import { useNavigate } from 'react-router-dom';

export default function ProductCard({ product }) {
  const [status, setStatus] = useState('idle');
  const navigate = useNavigate();
  const addToCart = useCartStore((state) => state.addToCart);
  const { user } = useAuthStore();
  const { favorites, toggleFavorite } = useFavoritesStore();

  // --- CORRECCIÓN DE LÓGICA VISUAL ---
  // Usamos una constante para obtener el ID real, priorizando _id si viene de MongoDB
  const productId = product?._id || product?.id;

  // Solo marcamos como favorito si el ID existe y coincide con alguno del store
  const isFavorite = favorites.some(fav => {
    const favId = fav._id || fav.id;
    return favId === productId && productId !== undefined;
  });

  const handleAddClick = async () => {
    if (!user) return navigate('/login');
    setStatus('loading');
    await new Promise(resolve => setTimeout(resolve, 800));
    addToCart(product);
    setStatus('success');
    setTimeout(() => setStatus('idle'), 2000);
  };

  const handleFavoriteClick = (e) => {
    // Evitamos que el click se propague si tienes el card dentro de un Link
    e.preventDefault(); 
    e.stopPropagation();
    
    if (!user) return navigate('/login');
    toggleFavorite(product);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="group bg-[#0f111a] rounded-2xl overflow-hidden border border-white/5 hover:border-blue-500/30 transition-all duration-500"
    >
=======
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
>>>>>>> d59349199965a60cc80094269ce84230c602cbf1
      <div className="relative h-52 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
        />
<<<<<<< HEAD
        <div className="absolute top-3 left-3 bg-blue-600 text-white text-[10px] font-black px-2 py-1 rounded-md shadow-lg">
          -50%
        </div>
=======
>>>>>>> d59349199965a60cc80094269ce84230c602cbf1
      </div>

      <div className="p-5 space-y-4">
        <div>
          <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">
            {product.category}
          </p>
<<<<<<< HEAD
          <h3 className="font-bold text-white text-lg leading-tight line-clamp-1">{product.name}</h3>
=======
          <h3 className="font-bold text-white text-lg leading-tight">{product.name}</h3>
>>>>>>> d59349199965a60cc80094269ce84230c602cbf1
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
<<<<<<< HEAD
            className={`flex-[3] font-black py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 text-xs overflow-hidden
=======
            className={`flex-1 font-black py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 text-xs overflow-hidden
>>>>>>> d59349199965a60cc80094269ce84230c602cbf1
              ${status === 'success' 
                ? 'bg-green-500 text-white scale-105 shadow-[0_0_20px_rgba(34,197,94,0.3)]' 
                : 'bg-white/5 text-white hover:bg-blue-600 hover:text-white'
              }`}
          >
            {status === 'loading' ? (
              <Loader2 size={16} className="animate-spin" />
            ) : status === 'success' ? (
              <>
<<<<<<< HEAD
                <CheckCircle2 size={16} className="animate-in zoom-in duration-300" />
=======
                <CheckCircle2 size={16} className="animate-in zoom-in" />
>>>>>>> d59349199965a60cc80094269ce84230c602cbf1
                ¡AÑADIDO!
              </>
            ) : (
              <>
                <ShoppingCart size={16} />
                AÑADIR
              </>
            )}
          </button>
          
<<<<<<< HEAD
          <motion.button 
            whileTap={{ scale: 0.8 }}
            onClick={handleFavoriteClick} 
            className={`flex-1 p-3 rounded-xl border transition-all duration-300 flex items-center justify-center ${
              isFavorite 
                ? 'bg-pink-500/20 text-pink-500 border-pink-500/30 shadow-[0_0_15px_rgba(236,72,153,0.1)]' 
                : 'bg-white/5 text-slate-500 border-white/5 hover:bg-white/10'
=======
          <button 
            onClick={() => setLiked(!liked)} 
            className={`p-3 rounded-xl border border-white/5 transition-colors ${
              liked ? 'bg-red-500/10 text-red-500 border-red-500/20' : 'bg-white/5 text-slate-500'
>>>>>>> d59349199965a60cc80094269ce84230c602cbf1
            }`}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={isFavorite ? 'active' : 'inactive'}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Heart 
                  size={20} 
                  fill={isFavorite ? "currentColor" : "none"} 
                  strokeWidth={isFavorite ? 0 : 2}
                />
              </motion.div>
            </AnimatePresence>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}