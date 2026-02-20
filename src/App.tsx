import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './store';
import { Navbar, Hero } from './components/Layout';
import { ProductGrid } from './components/Products';
import { AdminPanel } from './components/Admin';
import { CartPage } from './components/Cart';
import { LoginPage, RegisterPage, ProfilePage } from './components/Auth';
import { ProductDetailPage } from './components/ProductDetail';
import { motion, AnimatePresence } from 'motion/react';

const HomePage = () => {
  const { products } = useApp();
  const recentProducts = products.slice(0, 4);
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Hero />
      <ProductGrid products={recentProducts} title="Destaques do Carnaval" />
      <div className="bg-blue-600 py-20 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 italic">A ELITE DA INTERNET</h2>
          <p className="text-xl opacity-80 font-medium mb-10">Contas de jogos raras, serviços de engajamento e muito mais com a segurança que só o PATRÃO oferece.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <p className="text-4xl font-black mb-1">5k+</p>
              <p className="text-xs font-bold uppercase tracking-widest opacity-60">Clientes</p>
            </div>
            <div>
              <p className="text-4xl font-black mb-1">10k+</p>
              <p className="text-xs font-bold uppercase tracking-widest opacity-60">Vendas</p>
            </div>
            <div>
              <p className="text-4xl font-black mb-1">24/7</p>
              <p className="text-xs font-bold uppercase tracking-widest opacity-60">Suporte</p>
            </div>
            <div>
              <p className="text-4xl font-black mb-1">100%</p>
              <p className="text-xs font-bold uppercase tracking-widest opacity-60">Seguro</p>
            </div>
          </div>
        </div>
      </div>
      <ProductGrid products={products} title="Todos os Produtos" />
    </motion.div>
  );
};

const ProductsPage = () => {
  const { products } = useApp();
  return (
    <div className="py-12">
      <ProductGrid products={products} title="Nossa Vitrine" />
    </div>
  );
};

const ProtectedAdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { currentUser } = useApp();
  if (!currentUser || !currentUser.isAdmin) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

const AppContent = () => {
  const { theme } = useApp();
  
  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/produtos" element={<ProductsPage />} />
          <Route path="/produto/:id" element={<ProductDetailPage />} />
          <Route path="/carrinho" element={<CartPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registro" element={<RegisterPage />} />
          <Route path="/perfil" element={<ProfilePage />} />
          <Route 
            path="/admin" 
            element={
              <ProtectedAdminRoute>
                <AdminPanel />
              </ProtectedAdminRoute>
            } 
          />
        </Routes>
      </AnimatePresence>
      
      <footer className={`py-12 border-t ${theme === 'dark' ? 'bg-black border-blue-900/30 text-blue-200/40' : 'bg-gray-50 border-blue-100 text-gray-400'}`}>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-2xl font-black tracking-tighter text-blue-600 mb-4">PATRÕES STORE</p>
          <p className="text-sm font-medium mb-6">© 2026 PATRÕES STORE - Todos os direitos reservados.</p>
          <div className="flex justify-center gap-6">
            <a href="#" className="hover:text-blue-500 transition-colors">Termos de Uso</a>
            <a href="#" className="hover:text-blue-500 transition-colors">Privacidade</a>
            <a href="#" className="hover:text-blue-500 transition-colors">Contato</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <Router>
        <AppContent />
      </Router>
    </AppProvider>
  );
}
