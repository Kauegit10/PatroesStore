import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Eye, Tag } from 'lucide-react';
import { useApp } from '../store';
import { Product } from '../types';
import { formatCurrency, fixImageUrl } from '../utils';
import { motion, AnimatePresence } from 'motion/react';

interface ProductCardProps {
  product: Product;
  key?: string | number;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart, addToHistory, theme } = useApp();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -10 }}
      className={`group relative rounded-[32px] overflow-hidden border transition-all duration-500 ${
        theme === 'dark' 
          ? 'bg-black border-white/5 hover:border-blue-500/30' 
          : 'bg-white border-gray-100 hover:border-blue-200 shadow-2xl shadow-blue-500/5'
      }`}
    >
      <div className="aspect-square overflow-hidden relative">
        <img
          src={fixImageUrl(product.image)}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="absolute top-4 left-4">
          <span className="bg-blue-600 text-white text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full shadow-lg shadow-blue-600/20">
            {product.category}
          </span>
        </div>

        <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
          <Link 
            to={`/produto/${product.id}`}
            onClick={() => addToHistory(product.id)}
            className="w-full bg-white text-black py-3 rounded-xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-blue-600 hover:text-white transition-colors"
          >
            <Eye size={14} /> Detalhes
          </Link>
        </div>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className={`text-xl font-black tracking-tight truncate flex-1 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
            {product.name}
          </h3>
        </div>
        <p className={`text-sm mb-6 line-clamp-2 h-10 font-medium ${theme === 'dark' ? 'text-blue-200/40' : 'text-gray-400'}`}>
          {product.description}
        </p>
        
        <div className="flex items-center justify-between pt-4 border-t border-white/5">
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase tracking-widest opacity-40">Preço</span>
            <span className="text-2xl font-black text-blue-600">
              {formatCurrency(product.price)}
            </span>
          </div>
          
          <button
            onClick={() => addToCart(product)}
            className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-2xl transition-all transform active:scale-90 shadow-lg shadow-blue-600/20"
          >
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export const ProductGrid = ({ products, title }: { products: Product[], title?: string }) => {
  const { theme } = useApp();
  const [selectedCategory, setSelectedCategory] = React.useState<string>('TODOS');
  
  const categories = ['TODOS', 'CPM', 'MARKETING', 'OUTROS'];
  
  const filteredProducts = selectedCategory === 'TODOS' 
    ? products 
    : products.filter(p => p.category === selectedCategory);
  
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
          {title && (
            <h2 className={`text-4xl font-black tracking-tighter ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
              {title}
            </h2>
          )}
          
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 scale-105'
                    : theme === 'dark'
                      ? 'bg-blue-900/20 text-blue-400 hover:bg-blue-900/40'
                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        
        <AnimatePresence mode="popLayout">
          {filteredProducts.length > 0 ? (
            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            >
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`text-center py-32 rounded-3xl border-2 border-dashed ${
                theme === 'dark' ? 'border-blue-900/30 text-blue-200/40' : 'border-blue-100 text-gray-400'
              }`}
            >
              <p className="text-xl font-medium">Nenhum produto nesta categoria.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
