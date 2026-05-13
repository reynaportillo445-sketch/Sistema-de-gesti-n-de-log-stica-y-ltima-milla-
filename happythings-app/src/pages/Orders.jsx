import { useState, useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, PackageOpen } from 'lucide-react';

export default function MyOrder() {
  const { user } = useAuthStore();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const userEmail = user?.email || 'guest';
    const saved = JSON.parse(localStorage.getItem(`cart_${userEmail}`)) || [];
    setItems(saved);
  }, [user]);

  // Animación: Sale del centro
  const dropIn = {
    hidden: { opacity: 0, scale: 0, x: "-50%", y: "-50%", top: "50%", left: "50%", position: "fixed" },
    visible: { 
      opacity: 1, scale: 1, x: 0, y: 0, position: "relative", top: "0", left: "0",
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <div className="p-10 bg-[#0b0e14] min-h-screen">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-2xl font-black italic uppercase text-white mb-10 tracking-tighter">Mi Lista de Pedido</h1>
        
        <AnimatePresence mode="popLayout">
          {items.length > 0 ? (
            items.map((item) => (
              <motion.div 
                key={item.cartId}
                variants={dropIn}
                initial="hidden"
                animate="visible"
                className="bg-[#12151e] p-6 rounded-[2.5rem] border border-white/5 flex items-center gap-6 text-white"
              >
                <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center"><Check size={14} /></div>
                <div className="w-20 h-20 bg-white rounded-2xl p-2"><img src={item.image} className="w-full h-full object-contain" /></div>
                <div className="flex-1">
                  <h3 className="font-black italic uppercase text-sm">{item.name}</h3>
                  <p className="text-2xl font-black italic">${item.price}</p>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-20 bg-[#12151e] rounded-[3rem] border border-dashed border-white/10">
              <PackageOpen size={48} className="mx-auto text-slate-700 mb-4" />
              <p className="font-black italic uppercase text-slate-500">No has añadido nada aún</p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}