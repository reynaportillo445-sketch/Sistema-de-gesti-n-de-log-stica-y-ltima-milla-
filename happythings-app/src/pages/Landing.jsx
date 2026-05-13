import { useSearchParams } from 'react-router-dom';
// Eliminamos la importación del Navbar de aquí
import Carousel from '../components/Carousel';
import ProductGrid from '../components/ProductGrid';

export default function Landing() {
  const [searchParams] = useSearchParams();
  
  const searchTerm = searchParams.get('search') || '';
  const category = searchParams.get('category') || 'Todo';

  return (
    <div className="min-h-screen bg-primary">
      {/* 
         BORRAMOS EL <Navbar /> de aquí. 
         Ahora App.jsx se encarga de mostrarlo.
      */}
      
      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {!searchTerm && <Carousel />}
        
        <ProductGrid searchTerm={searchTerm} category={category} />
      </main>
    </div>
  );
}