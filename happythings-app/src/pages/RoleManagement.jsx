import { Shield, User, Search, ArrowLeft, UserCheck } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RoleManagement() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Usuarios de ejemplo
  const [users, setUsers] = useState([
    { id: 1, name: 'Usuario Demo', email: 'demo@happythings.com', role: 'customer' },
    { id: 2, name: 'Alfa Admin', email: 'alfa@happythings.com', role: 'admin' },
  ]);

  const handleRoleChange = (userId, newRole) => {
    setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
    alert(`Rol de usuario actualizado a: ${newRole}`);
  };

  return (
    <div className="min-h-screen bg-[#0f111a] p-4 sm:p-8 animate-in fade-in duration-500">
      <div className="max-w-5xl mx-auto">
        <button 
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-slate-400 hover:text-accent mb-6 transition-colors"
        >
          <ArrowLeft size={20} /> Volver al Dashboard
        </button>

        <header className="mb-8">
          <h1 className="text-3xl font-black text-white flex items-center gap-3">
            <Shield className="text-accent" size={32} /> Gestión de Roles
          </h1>
          <p className="text-slate-400 mt-2">Control de privilegios para la plataforma HappyThings</p>
        </header>

        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
          <input 
            type="text" 
            placeholder="Buscar por nombre o email..."
            className="w-full bg-[#161925] border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white focus:border-accent/50 outline-none transition-all"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="bg-[#161925] border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-white/5 text-slate-400 text-xs uppercase tracking-widest font-bold">
                <tr>
                  <th className="px-6 py-4">Usuario</th>
                  <th className="px-6 py-4">Rol Actual</th>
                  <th className="px-6 py-4 text-right">Cambiar a</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {users.filter(u => u.name.toLowerCase().includes(searchTerm.toLowerCase())).map((u) => (
                  <tr key={u.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent font-bold">
                          {u.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-white font-bold text-sm">{u.name}</p>
                          <p className="text-xs text-slate-400">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-[10px] px-3 py-1 rounded-full font-black uppercase border ${
                        u.role === 'admin' ? 'border-accent text-accent' : 
                        u.role === 'driver' ? 'border-blue-500 text-blue-400' : 
                        'border-slate-500 text-slate-500'
                      }`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        {['customer', 'driver', 'admin'].map((r) => (
                          <button
                            key={r}
                            onClick={() => handleRoleChange(u.id, r)}
                            className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${
                              u.role === r 
                              ? 'bg-accent text-primary' 
                              : 'bg-[#0f111a] text-slate-500 hover:text-white border border-white/5'
                            }`}
                          >
                            {r.toUpperCase()}
                          </button>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}