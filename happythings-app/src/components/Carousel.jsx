import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const banners = [
  {
    id: 1,
    title: 'Ofertas Tech',
    color: 'from-blue-600 to-purple-600',
    emoji: '⚡',
  },
  {
    id: 2,
    title: 'Hogar & Jardín',
    color: 'from-green-600 to-emerald-600',
    emoji: '🏠',
  },
  {
    id: 3,
    title: 'Ropa & Accesorios',
    color: 'from-pink-600 to-rose-600',
    emoji: '👕',
  },
];

export default function Carousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrent((prev) => (prev + 1) % banners.length);
  const prev = () => setCurrent((prev) => (prev - 1 + banners.length) % banners.length);

  return (
    <div className="relative w-full h-72 bg-linear-to-b from-secondary to-primary rounded-xl overflow-hidden border border-accent/20 animate-slideIn">
      {banners.map((banner, idx) => (
        <div
          key={banner.id}
          className={`absolute inset-0 bg-linear-to-r ${banner.color} flex items-center justify-center transition-opacity duration-700 ${
            idx === current ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="text-center">
            <div className="text-6xl mb-4">{banner.emoji}</div>
            <h2 className="text-4xl font-bold text-white mb-2">{banner.title}</h2>
            <p className="text-white/80">Descuentos hasta 70%</p>
          </div>
        </div>
      ))}

      {/* Controls */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full transition"
      >
        <ChevronLeft className="text-white" size={24} />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full transition"
      >
        <ChevronRight className="text-white" size={24} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {banners.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-2 h-2 rounded-full transition ${
              idx === current ? 'bg-accent w-6' : 'bg-white/40'
            }`}
          />
        ))}
      </div>
    </div>
  );
}