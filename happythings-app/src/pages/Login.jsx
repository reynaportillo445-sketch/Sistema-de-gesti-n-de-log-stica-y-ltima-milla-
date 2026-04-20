import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { Mail, Lock, User, Eye, EyeOff, ArrowLeft } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState('customer');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { ...formData, role, id: Math.random().toString(36).substr(2, 9) };
    login(userData);
    navigate('/'); 
  };

  const handleQuickLogin = (email, password, roleType) => {
    const userData = { email, password, name: email.split('@')[0], role: roleType, id: Math.random().toString(36).substr(2, 9) };
    login(userData);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-primary flex flex-col items-center justify-center px-4 relative overflow-hidden">
      
      {/* --- BOTÓN DE RETROCESO ANIMADO --- */}
      <button 
        onClick={() => navigate('/')} 
        className="absolute top-8 left-8 flex items-center gap-3 group z-50"
      >
        <div className="p-2.5 rounded-xl bg-secondary/50 border border-white/5 text-slate-400 group-hover:text-accent group-hover:border-accent/30 group-hover:bg-accent/10 group-hover:-translate-x-2 transition-all duration-300 shadow-lg group-hover:shadow-accent/20">
          <ArrowLeft size={22} />
        </div>
        <div className="flex flex-col items-start overflow-hidden">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 delay-75">
            Regresar
          </span>
          <span className="text-sm font-bold text-white opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 delay-150">
            A la Tienda
          </span>
        </div>
      </button>

      <div className="w-full max-w-md space-y-8 animate-in fade-in zoom-in duration-700">
        {/* Logo */}
        <div className="text-center space-y-2">
          <div className="text-5xl font-black text-accent tracking-tighter drop-shadow-[0_0_15px_rgba(var(--accent-rgb),0.3)]">
            ◇ FastMart
          </div>
          <p className="text-slate-400 font-medium">Tu plataforma de compras y envíos</p>
        </div>

        {/* Card */}
        <div className="bg-gradient-to-b from-secondary to-primary border border-accent/20 rounded-[2.5rem] p-8 space-y-6 shadow-2xl shadow-black/50">
          {/* Tabs */}
          <div className="flex gap-2 bg-black/20 p-1.5 rounded-2xl">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 rounded-xl font-bold transition-all duration-300 ${
                isLogin ? 'bg-accent text-primary shadow-xl scale-100' : 'text-slate-500 hover:text-white scale-95'
              }`}
            >
              Ingresar
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 rounded-xl font-bold transition-all duration-300 ${
                !isLogin ? 'bg-accent text-primary shadow-xl scale-100' : 'text-slate-500 hover:text-white scale-95'
              }`}
            >
              Registrarse
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Email</label>
              <div className="relative group">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-accent group-focus-within:scale-110 transition-transform" />
                <input
                  type="email"
                  required
                  placeholder="tu@email.com"
                  className="w-full bg-black/20 border border-white/5 rounded-2xl pl-12 pr-4 py-3.5 focus:border-accent/50 focus:outline-none transition-all text-white placeholder:text-slate-600"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Contraseña</label>
              <div className="relative group">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-accent group-focus-within:scale-110 transition-transform" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  className="w-full bg-black/20 border border-white/5 rounded-2xl pl-12 pr-12 py-3.5 focus:border-accent/50 focus:outline-none transition-all text-white placeholder:text-slate-600"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-accent transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-accent text-primary font-black py-4 rounded-2xl hover:brightness-110 active:scale-95 transition-all mt-4 shadow-lg shadow-accent/20"
            >
              {isLogin ? 'INICIAR SESIÓN' : 'CREAR CUENTA'}
            </button>
          </form>

          {/* Quick Login Section */}
          <div className="pt-6 border-t border-white/5">
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest text-center mb-4">Acceso Rápido Demo</p>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleQuickLogin('cliente@test.com', '123', 'customer')}
                className="text-[10px] py-2.5 bg-white/5 hover:bg-accent/10 rounded-xl text-white/40 hover:text-accent transition-all font-bold border border-transparent hover:border-accent/20"
              >
                👤 CLIENTE
              </button>
              <button
                onClick={() => handleQuickLogin('admin@test.com', '123', 'admin')}
                className="text-[10px] py-2.5 bg-white/5 hover:bg-accent/10 rounded-xl text-white/40 hover:text-accent transition-all font-bold border border-transparent hover:border-accent/20"
              >
                🛠️ ADMIN
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
