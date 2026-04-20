import Navbar from '../components/Navbar';
import Carousel from '../components/Carousel';
import ProductGrid from '../components/ProductGrid';

export default function Landing() {
  return (
    <div className="min-h-screen bg-primary">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <Carousel />
        <ProductGrid />
      </main>

      {/* Footer */}
      <footer className="border-t border-accent/20 bg-secondary/50 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-accent mb-4">FastMart</h3>
              <p className="text-sm text-slate-400">Tu tienda online de confianza</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Categorías</h4>
              <ul className="text-sm space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-accent transition">Tecnología</a></li>
                <li><a href="#" className="hover:text-accent transition">Hogar</a></li>
                <li><a href="#" className="hover:text-accent transition">Ropa</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Soporte</h4>
              <ul className="text-sm space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-accent transition">Contacto</a></li>
                <li><a href="#" className="hover:text-accent transition">FAQ</a></li>
                <li><a href="#" className="hover:text-accent transition">Términos</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Síguenos</h4>
              <div className="flex gap-4 text-sm text-slate-400">
                <a href="#" className="hover:text-accent transition">Twitter</a>
                <a href="#" className="hover:text-accent transition">Discord</a>
              </div>
            </div>
          </div>
          <div className="border-t border-accent/10 mt-8 pt-8 text-center text-sm text-slate-500">
            © 2024 FastMart. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}