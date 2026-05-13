import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { Mail, Lock, Eye, EyeOff, ArrowLeft, Loader2, Truck, User, UserPlus } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [authMode, setAuthMode] = useState('login'); // 'login', 'register', 'driver'
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      // Determinamos el rol basado en el modo de auth
      let assignedRole = 'customer';
      if (authMode === 'driver') assignedRole = 'driver';
      
      const userData = { 
        ...formData, 
        username: formData.email, 
        role: assignedRole,
        id: Math.random().toString(36).substr(2, 9) 
      };

      const success = login(userData);

      if (success) {
        // Lógica de redirección inteligente basada en el rol que devolvió el store
        const currentUser = useAuthStore.getState().user;
        if (currentUser.role === 'admin') {
          navigate('/dashboard/admin');
        } else if (currentUser.role === 'driver') {
          navigate('/dashboard/driver');
        } else {
          navigate('/dashboard/customer');
        }
      } else {
        setIsLoading(false);
        alert("Credenciales incorrectas");
      }
    }, 800);
  };

  const handleQuickLogin = (email, password, roleType) => {
    setIsLoading(true);
    setTimeout(() => {
      const userData = { email, password, username: email, name: email.split('@')[0], role: roleType, id: Math.random().toString(36).substr(2, 9) };
      login(userData);
      
      // Redirección según el rol
      if (roleType === 'admin') navigate('/dashboard/admin');
      else if (roleType === 'driver') navigate('/dashboard/driver');
      else navigate('/dashboard/customer');
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#0f111a] flex flex-col items-center justify-center px-4 relative overflow-hidden">
      
      <button 
        onClick={() => navigate('/')} 
        className="absolute top-8 left-8 flex items-center gap-3 group z-50"
      >
        <div className="p-2.5 rounded-xl bg-[#161925] border border-white/5 text-slate-400 group-hover:text-accent group-hover:border-accent/30 group-hover:bg-accent/10 group-hover:-translate-x-2 transition-all duration-300 shadow-lg">
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
        <div className="text-center space-y-2">
          <div className="text-5xl font-black text-accent tracking-tighter drop-shadow-[0_0_15px_rgba(var(--accent-rgb),0.3)]">
            ◇ FastMart
          </div>
          <p className="text-slate-400 font-medium">Acceso Seguro a la Plataforma</p>
        </div>

        <div className="bg-gradient-to-b from-[#161925] to-[#0f111a] border border-white/5 rounded-[2.5rem] p-8 space-y-6 shadow-2xl">
          
          {/* Tabs para Cliente, Registro y Conductor */}
          <div className="grid grid-cols-3 gap-1 bg-black/20 p-1.5 rounded-2xl">
            <button
              onClick={() => setAuthMode('login')}
              className={`py-2.5 rounded-xl text-[11px] font-bold transition-all duration-300 flex flex-col items-center gap-1 ${
                authMode === 'login' ? 'bg-accent text-primary shadow-xl' : 'text-slate-500 hover:text-white'
              }`}
            >
              <User size={14} /> ENTRAR
            </button>
            <button
              onClick={() => setAuthMode('register')}
              className={`py-2.5 rounded-xl text-[11px] font-bold transition-all duration-300 flex flex-col items-center gap-1 ${
                authMode === 'register' ? 'bg-accent text-primary shadow-xl' : 'text-slate-500 hover:text-white'
              }`}
            >
              <UserPlus size={14} /> CLIENTE
            </button>
            <button
              onClick={() => setAuthMode('driver')}
              className={`py-2.5 rounded-xl text-[11px] font-bold transition-all duration-300 flex flex-col items-center gap-1 ${
                authMode === 'driver' ? 'bg-emerald-500 text-primary shadow-xl' : 'text-slate-500 hover:text-white'
              }`}
            >
              <Truck size={14} /> CONDUCIR
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Email o Usuario</label>
              <div className="relative group">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-accent" />
                <input
                  type="text"
                  required
                  placeholder={authMode === 'login' ? "alfa o email" : "nombre@ejemplo.com"}
                  className="w-full bg-black/20 border border-white/5 rounded-2xl pl-12 pr-4 py-3.5 focus:border-accent/50 focus:outline-none transition-all text-white"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Contraseña</label>
              <div className="relative group">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-accent" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  className="w-full bg-black/20 border border-white/5 rounded-2xl pl-12 pr-12 py-3.5 focus:border-accent/50 focus:outline-none transition-all text-white"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full font-black py-4 rounded-2xl active:scale-95 transition-all mt-4 shadow-lg flex items-center justify-center gap-2 disabled:opacity-70 ${
                authMode === 'driver' ? 'bg-emerald-500 text-black shadow-emerald-500/20' : 'bg-accent text-primary shadow-accent/20'
              }`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  PROCESANDO...
                </>
              ) : (
                authMode === 'login' ? 'INICIAR SESIÓN' : 
                authMode === 'driver' ? 'REGISTRARME COMO CONDUCTOR' : 'CREAR MI CUENTA'
              )}
            </button>
          </form>

          <div className="pt-6 border-t border-white/5">
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest text-center mb-4">Acceso Rápido Maestro</p>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleQuickLogin('alfa', '5414b', 'admin')}
                className="text-[10px] py-2.5 bg-white/5 hover:bg-emerald-500/10 rounded-xl text-white/40 hover:text-emerald-500 transition-all font-bold border border-transparent hover:border-emerald-500/20 flex items-center justify-center gap-1"
              >
                🛠️ MODO ALFA
              </button>
              <button
                onClick={() => handleQuickLogin('chofer@test.com', '123', 'driver')}
                className="text-[10px] py-2.5 bg-white/5 hover:bg-blue-500/10 rounded-xl text-white/40 hover:text-blue-500 transition-all font-bold border border-transparent hover:border-blue-500/20 flex items-center justify-center gap-1"
              >
                🚚 MODO CHOFER
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}