import { ShoppingCart, Heart } from 'lucide-react';
import { useState } from 'react';
// Importamos el store del carrito (ajusta a './' si están en la misma carpeta)
import { useCartStore } from './cartStore'; 

export default function ProductCard({ product }) {
  const [liked, setLiked] = useState(false);
  
  // Traemos la función para añadir productos del store
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <div className="group bg-secondary rounded-2xl overflow-hidden border border-accent/10 hover:border-accent/30 transition-all duration-300 hover:shadow-2xl hover:shadow-accent/10">
      {/* Contenedor de Imagen */}
      <div className="relative w-full h-52 bg-slate-900 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Badge de Descuento */}
        <div className="absolute top-3 right-3 bg-danger px-3 py-1 rounded-full text-[10px] font-black text-white z-10 shadow-lg">
          -50% OFF
        </div>
      </div>

      {/* Información del Producto */}
      <div className="p-5 space-y-4">
        <div className="space-y-1">
          <p className="text-[10px] font-bold text-accent uppercase tracking-widest">{product.category || 'General'}</p>
          <h3 className="font-bold text-white line-clamp-2 h-12 leading-tight">{product.name}</h3>
        </div>

        {/* Rating y Reviews */}
        <div className="flex items-center gap-2">
          <div className="flex text-yellow-400 text-xs">
            ★★★★★
          </div>
          <span className="text-[10px] text-slate-500 font-bold">(128 REVIEWS)</span>
        </div>

        {/* Precios */}
        <div className="flex items-end gap-3">
          <span className="text-2xl font-black text-accent">${product.price}</span>
          <span className="text-sm text-slate-500 line-through mb-1">${(product.price * 2).toFixed(2)}</span>
        </div>

        {/* Acciones */}
        <div className="flex gap-2 pt-2">
          <button 
            onClick={() => addToCart(product)}
            className="flex-1 bg-accent hover:brightness-110 text-primary font-black py-3 rounded-xl transition-all flex items-center justify-center gap-2 text-xs active:scale-95 shadow-lg shadow-accent/10"
          >
            <ShoppingCart size={16} />
            AÑADIR
          </button>
          
          <button
            onClick={() => setLiked(!liked)}
            className={`p-3 rounded-xl transition-all border border-white/5 ${
              liked
                ? 'bg-danger/20 text-danger border-danger/20'
                : 'bg-white/5 hover:bg-white/10 text-slate-400'
            }`}
          >
            <Heart size={20} fill={liked ? "currentColor" : "none"} />
          </button>
        </div>
      </div>
    </div>
  );
}
