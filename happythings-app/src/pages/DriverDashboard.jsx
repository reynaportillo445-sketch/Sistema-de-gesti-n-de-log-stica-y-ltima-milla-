import { MapPin, Navigation, ArrowLeft, CheckCircle, Clock, Camera, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useState } from 'react';
import MapComponent from '../components/MapComponent';

export default function DriverDashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [routeInfo, setRouteInfo] = useState(null);
  const [photoProof, setPhotoProof] = useState(null);

  const assignments = [
    {
      id: '#ROUTE-001',
      customer: 'María González',
      address: 'Calle 5 #123, San Salvador',
      status: 'en-ruta',
      distance: '2.3 km',
      items: 2,
      phone: '+503 7123-4567',
      notes: 'Entregar entre 2-4pm',
    },
    {
      id: '#ROUTE-002',
      customer: 'Pedro Rodríguez',
      address: 'Avenida Central #456, San Salvador',
      status: 'completado',
      distance: '1.8 km',
      items: 1,
      phone: '+503 7234-5678',
    },
    {
      id: '#ROUTE-003',
      customer: 'Ana Martínez',
      address: 'Boulevard Hipódromo #789, San Salvador',
      status: 'pendiente',
      distance: '3.5 km',
      items: 3,
      phone: '+503 7345-6789',
      notes: 'Ubicación exacta en la app',
    },
  ];

  const getStatusBadge = (status) => {
    const configs = {
      'en-ruta': { bg: 'bg-blue-500/20', text: 'text-blue-400', label: '🚗 En Ruta' },
      'completado': { bg: 'bg-success/20', text: 'text-success', label: '✓ Completado' },
      'pendiente': { bg: 'bg-yellow-500/20', text: 'text-yellow-400', label: '⏳ Pendiente' },
    };
    return configs[status] || configs.pendiente;
  };

  const handleStartRoute = (order) => {
    setSelectedOrder(order);
  };

  const handlePhotoCapture = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoProof(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCompleteDelivery = () => {
    if (photoProof) {
      alert('✅ Entrega completada con foto registrada');
      setSelectedOrder(null);
      setPhotoProof(null);
    } else {
      alert('⚠️ Debes subir una foto de prueba');
    }
  };

  return (
    <div className="min-h-screen bg-primary">
      {/* Header */}
      <div className="p-4 border-b bg-linear-to-r from-secondary to-primary border-accent/20 sm:p-6">
        <div className="flex items-center justify-between mx-auto max-w-7xl">
          <div>
            <h1 className="text-2xl font-bold sm:text-3xl text-accent">Panel de Entregas</h1>
            <p className="text-slate-400">Driver: {user?.name} 🚚</p>
          </div>
          <button
            onClick={() => {
              logout();
              navigate('/');
            }}
            className="flex items-center gap-2 px-4 py-2 font-semibold transition rounded-lg bg-danger hover:bg-danger/80"
          >
            <ArrowLeft size={18} />
            <span className="hidden sm:inline">Salir</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <main className="px-4 py-8 mx-auto space-y-6 max-w-7xl sm:px-6">
        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="p-4 space-y-2 border bg-secondary border-accent/20 rounded-xl">
            <p className="text-sm text-slate-400">Asignadas Hoy</p>
            <p className="text-3xl font-bold text-accent">3</p>
          </div>
          <div className="p-4 space-y-2 border bg-secondary border-accent/20 rounded-xl">
            <p className="text-sm text-slate-400">Completadas</p>
            <p className="text-3xl font-bold text-success">1</p>
          </div>
          <div className="p-4 space-y-2 border bg-secondary border-accent/20 rounded-xl">
            <p className="text-sm text-slate-400">Distancia Total</p>
            <p className="text-3xl font-bold text-blue-400">7.6 km</p>
          </div>
        </div>

        {/* Map & Assignments */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Map Section */}
          <div className="lg:col-span-2">
            {selectedOrder ? (
              <div className="space-y-4">
                <div className="p-4 border bg-secondary border-accent/20 rounded-xl">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-white">{selectedOrder.id}</h3>
                    <button
                      onClick={() => setSelectedOrder(null)}
                      className="px-3 py-1 text-sm font-bold text-white rounded bg-danger hover:bg-danger/80"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="mb-4 space-y-3">
                    <p className="font-semibold text-white">{selectedOrder.customer}</p>
                    <p className="flex items-center gap-2 text-sm text-slate-400">
                      <MapPin size={16} className="text-accent" />
                      {selectedOrder.address}
                    </p>
                    <p className="flex items-center gap-2 text-sm text-slate-400">
                      <Phone size={16} className="text-accent" />
                      {selectedOrder.phone}
                    </p>
                  </div>
                </div>

                <MapComponent
                  origin="San Salvador Centro"
                  destination={selectedOrder.address}
                  onRouteUpdate={setRouteInfo}
                />

                {routeInfo && (
                  <div className="p-4 space-y-3 border bg-secondary border-accent/20 rounded-xl">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Distancia:</span>
                      <span className="font-bold text-accent">{routeInfo.distance} km</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Tiempo estimado:</span>
                      <span className="font-bold text-accent">{routeInfo.duration} min</span>
                    </div>
                  </div>
                )}

                {/* Photo Proof */}
                <div className="p-4 space-y-4 border bg-secondary border-accent/20 rounded-xl">
                  <h4 className="flex items-center gap-2 font-bold text-white">
                    <Camera size={18} className="text-accent" />
                    Prueba de Entrega
                  </h4>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoCapture}
                    className="w-full px-4 py-2 text-white border rounded-lg bg-primary border-accent/20"
                  />

                  {photoProof && (
                    <div className="relative w-full overflow-hidden rounded-lg">
                      <img src={photoProof} alt="Proof" className="object-cover w-full h-48" />
                      <div className="absolute px-3 py-1 text-xs font-bold text-white rounded-full top-2 right-2 bg-success/80">
                        ✓ Foto cargada
                      </div>
                    </div>
                  )}

                  <button
                    onClick={handleCompleteDelivery}
                    className="flex items-center justify-center w-full gap-2 px-4 py-3 font-bold text-white transition rounded-lg bg-success hover:bg-success/80"
                  >
                    <CheckCircle size={20} />
                    Marcar como Entregado
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center text-center border bg-secondary border-accent/20 rounded-xl h-96">
                <div className="text-slate-400">
                  <p className="mb-2 text-2xl">🗺️</p>
                  <p>Selecciona una entrega para ver el mapa</p>
                </div>
              </div>
            )}
          </div>

          {/* Assignments List */}
          <div className="space-y-4 lg:col-span-1">
            <h2 className="text-xl font-bold text-white">Entregas Asignadas</h2>
            {assignments.map((assignment) => {
              const badge = getStatusBadge(assignment.status);
              const isSelected = selectedOrder?.id === assignment.id;

              return (
                <div
                  key={assignment.id}
                  onClick={() => assignment.status !== 'completado' && handleStartRoute(assignment)}
                  className={`bg-secondary border-2 rounded-xl p-4 cursor-pointer transition ${
                    isSelected
                      ? 'border-accent bg-secondary/80'
                      : 'border-accent/20 hover:border-accent/50'
                  } ${assignment.status === 'completado' ? 'opacity-60' : ''}`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-white">{assignment.id}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${badge.bg} ${badge.text}`}>
                      {badge.label}
                    </span>
                  </div>

                  <p className="mb-1 text-sm font-semibold text-white">{assignment.customer}</p>
                  <p className="mb-2 text-xs text-slate-400">{assignment.address}</p>

                  <div className="flex justify-between mb-3 text-xs text-accent">
                    <span>{assignment.distance}</span>
                    <span>{assignment.items} paquetes</span>
                  </div>

                  {assignment.status === 'pendiente' && (
                    <button className="w-full px-3 py-2 text-sm font-bold transition rounded bg-accent hover:bg-accent/80 text-primary">
                      Iniciar Ruta
                    </button>
                  )}
                  {assignment.status === 'en-ruta' && (
                    <button className="w-full px-3 py-2 text-sm font-bold text-white transition bg-blue-500 rounded hover:bg-blue-600">
                      Ver Ruta
                    </button>
                  )}
                  {assignment.status === 'completado' && (
                    <button disabled className="w-full px-3 py-2 text-sm font-bold rounded bg-success/20 text-success">
                      ✓ Completado
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}