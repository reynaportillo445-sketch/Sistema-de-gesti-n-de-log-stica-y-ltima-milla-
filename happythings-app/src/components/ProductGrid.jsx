import { useSearchParams } from 'react-router-dom';
import ProductCard from './ProductCard';

const products = [
  { id: 1, name: 'Laptop Gamer RTX 4060', image: 'https://m.media-amazon.com/images/I/71ABytvLICL._AC_UF894,1000_QL80_.jpg', price: 599.99, category: 'Tecno' },
  { id: 2, name: 'Monitor Curvo 27" 165Hz', image: 'https://m.media-amazon.com/images/I/61B2+LlS4xL.jpg', price: 199.99, category: 'Tecno' },
  { id: 3, name: 'Teclado Mecánico RGB Hot-swap', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQY64VX_4-dHdI43J__UxtmjTc5Kyi87ocynw&s', price: 45.50, category: 'Tecno' },
  { id: 4, name: 'Mouse Inalámbrico Pro Light', image: 'https://m.media-amazon.com/images/I/61ykKLbddNL._AC_SL1500_.jpg', price: 29.99, category: 'Tecno' },
  { id: 5, name: 'Webcam Full HD 1080p', image: 'https://image.made-in-china.com/202f0j00bUrRKWjsbkgl/USB-Computer-Webcam-Full-HD-1080P-Webcam-Camera-Digital-Web-Cam-with-Micphone-for-Laptop-Desktop-PC-Tablet-Rotatable-Camera.webp', price: 79.99, category: 'Tecno' },
  { id: 6, name: 'Hub USB-C 7 en 1', image: 'https://acosa.com.sv/wp-content/uploads/2023/10/HB1107SV-3.webp', price: 59.99, category: 'Tools' },
  { id: 7, name: 'Mochila para Laptop Impermeable', image: 'https://acosa.com.sv/wp-content/uploads/2023/08/NE-MLT2206BK.webp', price: 89.99, category: 'Accesorios' },
  { id: 8, name: 'Bocina Bluetooth TWS Grande', image: 'https://www.steren.com.sv/media/catalog/product/cache/0236bbabe616ddcff749ccbc14f38bf2/image/23098a433/bocina-bluetooth-tws-resistente-a-salpicaduras-grande.jpg', price: 69.99, category: 'Hogar' }
];

export default function ProductGrid() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // 1. Obtenemos Categoría Y Término de búsqueda de la URL
  const currentCategory = searchParams.get('category') || 'Todo';
  const searchTerm = searchParams.get('search')?.toLowerCase() || '';

  // 2. Lógica de filtrado combinada (Categoría + Nombre)
  const filteredProducts = products.filter(product => {
    const matchesCategory = currentCategory === 'Todo' || product.category === currentCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm);
    
    return matchesCategory && matchesSearch;
  });

  // 3. Función para manejar el input local (opcional, si quieres que este buscador también funcione)
  const handleLocalSearch = (e) => {
    const value = e.target.value;
    const newParams = new URLSearchParams(searchParams);
    if (value) newParams.set('search', value);
    else newParams.delete('search');
    setSearchParams(newParams);
  };

  return (
    <div className="space-y-8">
      {/* Input de búsqueda sincronizado con la URL */}
      <div className="flex justify-center">
        <input
          type="text"
          value={searchParams.get('search') || ''}
          onChange={handleLocalSearch}
          placeholder={`Buscar en ${currentCategory}...`}
          className="w-full max-w-2xl px-6 py-3 rounded-full bg-secondary border border-accent/20 focus:border-accent focus:outline-none transition text-white placeholder-slate-500 shadow-lg"
        />
      </div>

      {/* Título de resultados */}
      {searchTerm && (
        <p className="text-white/50 text-center">
          Resultados para "<span className="text-accent font-bold">{searchTerm}</span>"
        </p>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-max">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="col-span-full text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10">
            <p className="text-gray-400 text-lg">
              No encontramos productos que coincidan con tu búsqueda.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}