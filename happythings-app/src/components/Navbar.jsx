import { ShoppingCart, User, LayoutDashboard, ChevronDown, X, Trash2, CreditCard, Loader2, Rocket, Box, Sparkles, Laptop, Shirt, Wallet, ChevronRight, CheckCircle2 } from 'lucide-react';
import { useState, useMemo } from 'react';
import { useAuthStore } from '../store/authStore';
import { useCartStore } from './cartStore'; 
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

export default function Navbar() {
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [showMethodsModal, setShowMethodsModal] = useState(false); 
  const [showCardModal, setShowCardModal] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [status, setStatus] = useState('idle');
  const [isFlipped, setIsFlipped] = useState(false);
  
  const [cardData, setCardData] = useState({ number: '', name: '', expiry: '', cvc: '' });
  
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { cart, isOpen, setIsOpen, removeItem, clearCart } = useCartStore();
  const { user } = useAuthStore();
  
  const currentCategory = searchParams.get('category') || 'Todo';
  const cartCount = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);

  const total = useMemo(() => {
    const totalCents = cart.reduce((acc, item) => {
      return acc + (Math.round(Number(item.price) * 100) * (item.quantity || 1));
    }, 0);
    return totalCents / 100;
  }, [cart]);

  const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

  const handleCardInputChange = (e) => {
    const { name, value } = e.target;
    let val = value;
    if (name === 'number') {
      val = value.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ').substring(0, 19);
    } else if (name === 'name') {
      val = value.toUpperCase();
    } else if (name === 'expiry') {
      val = value.replace(/\D/g, '').substring(0, 4);
      if (val.length > 2) val = val.substring(0, 2) + '/' + val.substring(2);
    } else if (name === 'cvc') {
      val = value.replace(/\D/g, '').substring(0, 3);
    }
    setCardData(prev => ({ ...prev, [name]: val }));
  };

  const handlePay = async () => {
    setStatus('loading');
    await new Promise(r => setTimeout(r, 2000));
    setStatus('success');
    setTimeout(() => {
      clearCart();
      setShowCardModal(false);
      setIsOpen(false);
      setStatus('idle');
      setCardData({ number: '', name: '', expiry: '', cvc: '' });
    }, 1500);
  };

  const mainCategories = ['Todo', 'Tecno', 'Hogar'];
  const extraCategories = [
    { name: 'Gaming', icon: <Laptop size={12}/> },
    { name: 'Ropa', icon: <Shirt size={12}/> },
    { name: 'Próximamente', icon: <Rocket size={12} className="text-accent"/> },
    { name: 'Colección', icon: <Box size={12} className="text-accent"/> },
    { name: 'Limited', icon: <Sparkles size={12} className="text-accent"/> }
  ];

  const paymentOptions = [
    { id: 'visa', label: 'Visa / Mastercard', icon: <CreditCard size={18} className="text-blue-500" /> },
    { id: 'paypal', label: 'PayPal', icon: <Wallet size={18} className="text-blue-400" /> },
    { id: 'gpay', label: 'Google Pay', icon: <span className="font-bold text-[9px]">GPay</span> },
    { id: 'apple', label: 'Apple Pay', icon: <span className="font-bold text-[9px]">Apple</span> },
  ];

  return (
    <>
      <nav className="sticky top-0 z-40 bg-[#0f111a] border-b border-white/5 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-7 h-7 bg-white rotate-45 flex items-center justify-center rounded-sm transition-transform group-hover:rotate-[135deg] duration-500">
                <span className="text-[#0f111a] font-bold -rotate-45 text-lg">◇</span>
              </div>
              <h1 className="text-xl font-black text-white tracking-tighter italic uppercase">FastMart</h1>
            </Link>

            <div className="flex items-center gap-4">
              {/* BOTÓN LOGIN/DASHBOARD CON EFECTO DE DESLIZAMIENTO LATERAL */}
              <button 
                onClick={() => navigate(user ? '/dashboard/customer' : '/login')} 
                className="group relative flex items-center bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:bg-white transition-all duration-500 h-10 px-3"
              >
                <div className="flex items-center gap-3 transition-all duration-500">
                  <div className="shrink-0 text-white group-hover:text-black transition-colors">
                    {user ? <LayoutDashboard size={18} /> : <User size={18} />}
                  </div>
                  
                  <div className="flex flex-col leading-none overflow-hidden max-w-0 opacity-0 group-hover:max-w-[120px] group-hover:opacity-100 transition-all duration-500 ease-in-out text-left">
                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-tighter group-hover:text-slate-400">
                      {user ? 'ACCEDER' : 'ENTRAR'}
                    </span>
                    <span className="text-[11px] font-black text-white group-hover:text-black whitespace-nowrap">
                      {user ? 'Mi Dashboard' : 'A la Tienda'}
                    </span>
                  </div>
                </div>
              </button>

              <button onClick={() => setIsOpen(true)} className="relative p-2.5 bg-white/5 rounded-xl text-white border border-white/10 hover:scale-110 hover:bg-white hover:text-black transition-all duration-300">
                <ShoppingCart size={20} />
                {cartCount > 0 && <span className="absolute -top-1 -right-1 bg-white text-black w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-black animate-bounce ring-2 ring-[#0f111a]">{cartCount}</span>}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            <div className="relative flex-shrink-0">
              <button onClick={() => setCategoriesOpen(!categoriesOpen)} className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg border border-white/10 text-white text-[11px] font-bold hover:bg-white/10 transition-all uppercase tracking-widest">
                Explorar <ChevronDown size={14} className={categoriesOpen ? 'rotate-180' : ''} />
              </button>
              <div className={`absolute top-full left-0 mt-2 w-48 bg-[#161824] border border-white/10 rounded-xl shadow-2xl z-50 transition-all ${categoriesOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                {extraCategories.map((cat) => (
                  <button key={cat.name} onClick={() => { navigate(`/?category=${cat.name}`); setCategoriesOpen(false); }} className="w-full text-left px-4 py-3 text-[10px] font-bold text-white/50 hover:text-white hover:bg-white/5 transition-all uppercase flex items-center gap-3">
                    {cat.icon} {cat.name}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {mainCategories.map((cat) => (
                <button key={cat} onClick={() => navigate(cat === 'Todo' ? '/' : `/?category=${cat}`)} className={`px-3 py-1.5 rounded-lg text-[11px] font-bold border transition-all uppercase ${currentCategory === cat ? 'bg-white text-black border-white' : 'text-white/50 border-white/5 hover:border-white/20'}`}>
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* MODALES DE CARRITO Y PAGO (SIN CAMBIOS) */}
      <div className={`fixed inset-0 z-50 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
        <div className={`absolute right-0 h-full w-full max-w-sm bg-[#0f111a] p-8 flex flex-col transition-transform duration-500 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-black text-white italic uppercase">Carrito</h2>
            <button onClick={() => setIsOpen(false)} className="hover:rotate-90 transition-transform"><X className="text-white/20"/></button>
          </div>
          <div className="flex-1 overflow-y-auto space-y-4 pr-2">
            {cart.map(item => (
              <div key={item.id} className="flex gap-4 bg-white/5 p-4 rounded-2xl border border-white/5 group hover:border-white/10 transition-colors">
                <img src={item.image} className="w-12 h-12 rounded-lg object-cover" alt={item.name} />
                <div className="flex-1">
                  <p className="text-white text-[10px] font-bold uppercase truncate">{item.name}</p>
                  <p className="text-accent font-black">{formatter.format(item.price)}</p>
                </div>
                <button onClick={() => removeItem(item.id)} className="text-white/10 hover:text-red-500 transition-colors"><Trash2 size={16}/></button>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-6 border-t border-white/10">
            <div className="flex justify-between items-end mb-6">
              <span className="text-[10px] font-black text-slate-500 uppercase">Total</span>
              <span className="text-3xl font-black text-white tracking-tighter">{formatter.format(total)}</span>
            </div>
            <button onClick={() => setShowMethodsModal(true)} disabled={cart.length === 0} className="w-full py-5 bg-white text-black font-black rounded-2xl uppercase tracking-[0.2em] text-[10px] hover:bg-accent hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-20 disabled:pointer-events-none">
              Proceder al Pago
            </button>
          </div>
        </div>
      </div>

      {showMethodsModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setShowMethodsModal(false)} />
          <div className="relative bg-[#161824] w-full max-w-sm p-6 rounded-[24px] border border-white/10 shadow-2xl animate-in fade-in zoom-in duration-300">
            <h3 className="text-white font-black text-[10px] uppercase tracking-widest mb-6 text-center italic">Tipo de pago</h3>
            <div className="space-y-2">
              {paymentOptions.map((opt) => (
                <button 
                  key={opt.id}
                  onClick={() => { setSelectedMethod(opt); setShowMethodsModal(false); setShowCardModal(true); }}
                  className="w-full flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-xl hover:bg-white/10 transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-7 bg-black rounded flex items-center justify-center border border-white/10">{opt.icon}</div>
                    <span className="text-white text-[10px] font-bold uppercase">{opt.label}</span>
                  </div>
                  <ChevronRight size={14} className="text-white/20 group-hover:translate-x-1 transition-transform" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {showCardModal && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={() => status === 'idle' && setShowCardModal(false)} />
          <div className="relative bg-[#0f111a] w-full max-w-md p-10 rounded-[40px] border border-white/10 shadow-2xl animate-in fade-in slide-in-from-bottom-10 duration-500">
            <div className="perspective-1000 mb-10 h-44">
              <div className={`relative w-full h-full transition-transform duration-700 preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
                <div className="absolute inset-0 bg-[#0a0c14] rounded-3xl p-8 backface-hidden border border-white/5 shadow-inner">
                   <div className="flex justify-between mb-8">
                     <div className="w-10 h-7 bg-yellow-500/20 rounded-md border border-yellow-500/30"/>
                     <span className="text-white/20 font-black italic text-[10px] tracking-widest uppercase">{selectedMethod?.id || 'TARJETA'}</span>
                   </div>
                   <p className="text-white text-lg font-mono tracking-[0.25em] mb-4">
                     {cardData.number ? cardData.number.replace(/\d/g, '*') : '____ ____ ____ ____'}
                   </p>
                   <div className="flex justify-between items-end">
                      <div className="flex-1 truncate mr-4">
                        <p className="text-[7px] text-white/40 uppercase font-black mb-1">Titular</p>
                        <p className="text-[10px] text-white font-bold uppercase tracking-wider truncate">{cardData.name || 'NOMBRE APELLIDO'}</p>
                      </div>
                      <div className="text-right min-w-[40px]">
                        <p className="text-[7px] text-white/40 uppercase font-black mb-1">Exp</p>
                        <p className="text-[10px] text-white font-bold tracking-widest">{cardData.expiry ? cardData.expiry.replace(/\d/g, '*') : '__/__'}</p>
                      </div>
                   </div>
                </div>
                <div className="absolute inset-0 bg-[#0a0c14] rounded-3xl rotate-y-180 backface-hidden flex flex-col justify-center border border-white/5">
                   <div className="w-full h-10 bg-black/40 mb-6"/>
                   <div className="px-8">
                     <div className="w-full h-8 bg-white/5 rounded flex items-center justify-end px-4 border border-white/5">
                        <span className="text-white font-mono tracking-[0.3em] text-xs">
                          {cardData.cvc ? cardData.cvc.replace(/\d/g, '*') : '___'}
                        </span>
                     </div>
                   </div>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <input name="number" placeholder="NÚMERO DE TARJETA" value={cardData.number} onChange={handleCardInputChange} maxLength="19" className="w-full bg-white/5 border border-white/5 p-4 rounded-xl text-white text-[10px] font-bold focus:border-white outline-none" />
              <input name="name" placeholder="NOMBRE EN TARJETA" value={cardData.name} onChange={handleCardInputChange} className="w-full bg-white/5 border border-white/5 p-4 rounded-xl text-white text-[10px] font-bold focus:border-white outline-none" />
              <div className="flex gap-3">
                <input name="expiry" placeholder="MM/AA" value={cardData.expiry} onChange={handleCardInputChange} maxLength="5" className="w-full bg-white/5 border border-white/5 p-4 rounded-xl text-white text-[10px] font-bold outline-none focus:border-white" />
                <input name="cvc" placeholder="CVC" value={cardData.cvc} onChange={handleCardInputChange} maxLength="3" onFocus={() => setIsFlipped(true)} onBlur={() => setIsFlipped(false)} className="w-full bg-white/5 border border-white/5 p-4 rounded-xl text-white text-[10px] font-bold outline-none focus:border-white" />
              </div>
              <button onClick={handlePay} disabled={status !== 'idle' || !cardData.number || !cardData.name || cardData.cvc.length < 3} className="w-full py-5 bg-white text-black font-black rounded-2xl text-[10px] uppercase tracking-[0.2em] transition-all hover:bg-accent disabled:opacity-20 flex items-center justify-center overflow-hidden">
                {status === 'loading' ? <Loader2 className="animate-spin" size={18}/> : status === 'success' ? <CheckCircle2 className="text-green-600" size={18}/> : `PAGAR ${formatter.format(total)}`}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}