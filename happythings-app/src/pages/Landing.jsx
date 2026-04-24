import { useSearchParams } from 'react-router-dom'; // Importar esto
import Navbar from '../components/Navbar';
import Carousel from '../components/Carousel';
import ProductGrid from '../components/ProductGrid';

export default function Landing() {
  const [searchParams] = useSearchParams(); // Leer la URL
  
  // Extraer términos
  const searchTerm = searchParams.get('search') || '';
  const category = searchParams.get('category') || 'Todo';

  return (
    <div className="min-h-screen bg-primary">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Ocultamos el Carousel si el usuario está buscando algo para dar prioridad a los resultados */}
        {!searchTerm && <Carousel />}
        
        {/* Pasamos los filtros al Grid */}
        <ProductGrid searchTerm={searchTerm} category={category} />
      </main>

      {/* ... (resto del footer igual) */}
    </div>
  );
}