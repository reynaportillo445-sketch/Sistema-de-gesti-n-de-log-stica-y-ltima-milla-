import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { Mail, Lock, User, Eye, EyeOff, Phone, MapPin, CheckCircle } from 'lucide-react';

export default function Register() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [role, setRole] = useState('customer');
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: '',
    plate: '',
    license: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Nombre requerido';
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = 'Email inválido';
    if (formData.password.length < 6) newErrors.password = 'Mínimo 6 caracteres';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Las contraseñas no coinciden';
    if (!formData.phone.trim()) newErrors.phone = 'Teléfono requerido';
    if (!formData.address.trim()) newErrors.address = 'Dirección requerida';

    if (role === 'driver') {
      if (!formData.plate.trim()) newErrors.plate = 'Placa requerida';
      if (!formData.license.trim()) newErrors.license = 'Licencia requerida';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const userData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      role,
      id: Math.random().toString(36).substr(2, 9),
      ...(role === 'driver' && {
        plate: formData.plate,
        license: formData.license,
      }),
    };

    login(userData);

    if (role === 'customer') navigate('/dashboard/customer');
    else if (role === 'driver') navigate('/dashboard/driver');
  };

  const nextStep = () => {
    if (step === 1) {
      if (formData.name && formData.email && formData.password && formData.confirmPassword) {
        setStep(2);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-8 bg-primary">
      <div className="w-full max-w-md space-y-8 animate-slideIn">
        {/* Logo */}
        <div className="space-y-2 text-center">
          <div className="text-5xl font-bold text-accent">◇ FastMart</div>
          <p className="text-slate-400">Únete a nuestra comunidad</p>
        </div>

        {/* Card */}
        <div className="p-8 space-y-6 border bg-linear-to-b from-secondary to-primary border-accent/20 rounded-2xl">
          {/* Role Selection */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-300">¿Quién eres?</label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: 'customer', label: '👤 Cliente', desc: 'Comprar productos' },
                { value: 'driver', label: '🚚 Driver', desc: 'Repartidor' },
              ].map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    setRole(opt.value);
                    setStep(1);
                  }}
                  className={`py-3 rounded-lg font-semibold transition text-sm ${
                    role === opt.value
                      ? 'bg-accent text-primary'
                      : 'bg-primary border border-accent/20 text-white hover:border-accent/50'
                  }`}
                >
                  <div>{opt.label}</div>
                  <div className="text-xs opacity-70">{opt.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Progress */}
          <div className="flex gap-2">
            <div className={`flex-1 h-1 rounded-full ${step >= 1 ? 'bg-accent' : 'bg-secondary'}`}></div>
            <div className={`flex-1 h-1 rounded-full ${step >= 2 ? 'bg-accent' : 'bg-secondary'}`}></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* STEP 1: Datos Básicos */}
            {step === 1 && (
              <>
                {/* Nombre */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-300">Nombre Completo</label>
                  <div className="relative">
                    <User size={18} className="absolute -translate-y-1/2 left-3 top-1/2 text-accent" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full py-2 pl-10 pr-4 text-white transition border rounded-lg bg-primary border-accent/20 focus:border-accent focus:outline-none placeholder-slate-500"
                      placeholder="Juan Pérez"
                    />
                  </div>
                  {errors.name && <p className="text-xs text-danger">{errors.name}</p>}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-300">Email</label>
                  <div className="relative">
                    <Mail size={18} className="absolute -translate-y-1/2 left-3 top-1/2 text-accent" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full py-2 pl-10 pr-4 text-white transition border rounded-lg bg-primary border-accent/20 focus:border-accent focus:outline-none placeholder-slate-500"
                      placeholder="tu@email.com"
                    />
                  </div>
                  {errors.email && <p className="text-xs text-danger">{errors.email}</p>}
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-300">Contraseña</label>
                  <div className="relative">
                    <Lock size={18} className="absolute -translate-y-1/2 left-3 top-1/2 text-accent" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full py-2 pl-10 pr-10 text-white transition border rounded-lg bg-primary border-accent/20 focus:border-accent focus:outline-none placeholder-slate-500"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute -translate-y-1/2 right-3 top-1/2 text-slate-400 hover:text-accent"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.password && <p className="text-xs text-danger">{errors.password}</p>}
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-300">Confirmar Contraseña</label>
                  <div className="relative">
                    <Lock size={18} className="absolute -translate-y-1/2 left-3 top-1/2 text-accent" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      className="w-full py-2 pl-10 pr-10 text-white transition border rounded-lg bg-primary border-accent/20 focus:border-accent focus:outline-none placeholder-slate-500"
                      placeholder="••••••••"
                    />
                  </div>
                  {errors.confirmPassword && <p className="text-xs text-danger">{errors.confirmPassword}</p>}
                </div>

                <button
                  type="button"
                  onClick={nextStep}
                  className="w-full py-2 font-bold transition rounded-lg bg-linear-to-r from-accent to-cyan-400 hover:from-accent/90 hover:to-cyan-400/90 text-primary"
                >
                  Siguiente →
                </button>
              </>
            )}

            {/* STEP 2: Datos Contacto */}
            {step === 2 && (
              <>
                {/* Teléfono */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-300">Teléfono</label>
                  <div className="relative">
                    <Phone size={18} className="absolute -translate-y-1/2 left-3 top-1/2 text-accent" />
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full py-2 pl-10 pr-4 text-white transition border rounded-lg bg-primary border-accent/20 focus:border-accent focus:outline-none placeholder-slate-500"
                      placeholder="+503 XXXX XXXX"
                    />
                  </div>
                  {errors.phone && <p className="text-xs text-danger">{errors.phone}</p>}
                </div>

                {/* Dirección */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-300">Dirección</label>
                  <div className="relative">
                    <MapPin size={18} className="absolute left-3 top-3 text-accent" />
                    <textarea
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full py-2 pl-10 pr-4 text-white transition border rounded-lg bg-primary border-accent/20 focus:border-accent focus:outline-none placeholder-slate-500"
                      placeholder="Tu dirección completa"
                      rows="3"
                    />
                  </div>
                  {errors.address && <p className="text-xs text-danger">{errors.address}</p>}
                </div>

                {/* Driver Specific Fields */}
                {role === 'driver' && (
                  <>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-300">Placa del Vehículo</label>
                      <input
                        type="text"
                        id="plate"
                        name="plate"
                        value={formData.plate}
                        onChange={(e) => setFormData({ ...formData, plate: e.target.value })}
                        className="w-full px-4 py-2 text-white transition border rounded-lg bg-primary border-accent/20 focus:border-accent focus:outline-none placeholder-slate-500"
                        placeholder="ABC-123"
                      />
                      {errors.plate && <p className="text-xs text-danger">{errors.plate}</p>}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-300">Licencia de Conducir</label>
                      <input
                        type="text"
                        id="license"
                        name="license"
                        value={formData.license}
                        onChange={(e) => setFormData({ ...formData, license: e.target.value })}
                        className="w-full px-4 py-2 text-white transition border rounded-lg bg-primary border-accent/20 focus:border-accent focus:outline-none placeholder-slate-500"
                        placeholder="Número de licencia"
                      />
                      {errors.license && <p className="text-xs text-danger">{errors.license}</p>}
                    </div>
                  </>
                )}

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 px-4 py-2 font-bold transition border rounded-lg border-accent/20 hover:border-accent text-accent"
                  >
                    ← Atrás
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2 font-bold transition rounded-lg bg-linear-to-r from-accent to-cyan-400 hover:from-accent/90 hover:to-cyan-400/90 text-primary"
                  >
                    Registrarse
                  </button>
                </div>
              </>
            )}
          </form>

          {/* Link to Login */}
          <div className="text-center">
            <p className="text-sm text-slate-400">
              ¿Ya tienes cuenta?{' '}
              <button
                onClick={() => navigate('/login')}
                className="font-semibold transition text-accent hover:text-accent/80"
              >
                Inicia sesión
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}