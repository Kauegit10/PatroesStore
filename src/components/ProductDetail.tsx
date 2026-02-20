import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../store';
import { ShoppingCart, ArrowLeft, ShieldCheck, Zap, MessageCircle } from 'lucide-react';
import { formatCurrency, fixImageUrl } from '../utils';
import { motion } from 'motion/react';

export const ProductDetailPage = () => {
  const { id } = useParams();
  const { products, addToCart, addToHistory, theme } = useApp();
  const navigate = useNavigate();

  const product = products.find(p => p.id === id);

  useEffect(() => {
    if (product) {
      addToHistory(product.id);
    }
  }, [product, addToHistory]);

  if (!product) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${theme === 'dark' ? 'bg-black text-white' : 'bg-gray-50 text-black'}`}>
        <div className="text-center">
          <h1 className="text-4xl font-black mb-4">Produto não encontrado</h1>
          <Link to="/produtos" className="text-blue-600 font-bold hover:underline">Voltar para a loja</Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen py-20 ${theme === 'dark' ? 'bg-black text-white' : 'bg-gray-50 text-black'}`}>
      <div className="max-w-7xl mx-auto px-4">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 mb-12 font-black uppercase tracking-widest text-xs opacity-40 hover:opacity-100 transition-opacity">
          <ArrowLeft size={16} /> Voltar para Loja
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative rounded-[48px] overflow-hidden border border-white/5 shadow-2xl shadow-blue-600/10"
          >
            <img 
              src={fixImageUrl(product.image)} 
              alt={product.name} 
              className="w-full aspect-square object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-8 left-8">
              <span className="bg-blue-600 text-white px-6 py-2 rounded-full font-black uppercase tracking-widest text-xs shadow-xl shadow-blue-600/40">
                {product.category}
              </span>
            </div>
          </motion.div>

          {/* Info Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            <div className="flex items-center gap-3 text-blue-500 mb-6">
              <Zap size={20} fill="currentColor" />
              <span className="text-xs font-black uppercase tracking-[0.4em]">Serviço Premium Verificado</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-[0.9]">
              {product.name}
            </h1>

            <div className="flex flex-wrap items-center gap-6 mb-12">
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-1">Investimento</span>
                <span className="text-5xl font-black text-blue-600">
                  {formatCurrency(product.price)}
                </span>
              </div>
              <div className="h-12 w-px bg-white/10 hidden sm:block" />
              <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-green-500/10 border border-green-500/20 text-green-500 font-black uppercase tracking-widest text-xs">
                <ShieldCheck size={18} />
                <span>Entrega Imediata</span>
              </div>
            </div>

            <div className={`p-8 rounded-[32px] border mb-12 ${theme === 'dark' ? 'bg-white/5 border-white/5' : 'bg-white border-gray-100 shadow-xl shadow-blue-500/5'}`}>
              <h3 className="text-xs font-black uppercase tracking-widest opacity-40 mb-4">Descrição do Produto</h3>
              <p className={`text-xl leading-relaxed font-medium ${theme === 'dark' ? 'text-blue-200/60' : 'text-gray-600'}`}>
                {product.description}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={() => addToCart(product)}
                className="bg-blue-600 hover:bg-blue-700 text-white py-6 rounded-2xl font-black text-lg uppercase tracking-widest shadow-2xl shadow-blue-600/30 transition-all transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3"
              >
                Adicionar ao Carrinho <ShoppingCart size={20} />
              </button>
              <button
                onClick={() => {
                  const message = encodeURIComponent(`Olá! Tenho interesse no produto: ${product.name} (${formatCurrency(product.price)})`);
                  window.open(`https://wa.me/${product.whatsappNumber || '5511999999999'}?text=${message}`, '_blank');
                }}
                className={`border-2 py-6 rounded-2xl font-black text-lg uppercase tracking-widest transition-all flex items-center justify-center gap-3 ${
                  theme === 'dark' ? 'border-white/10 hover:bg-white/5 text-white' : 'border-gray-200 hover:bg-gray-50 text-black'
                }`}
              >
                Comprar Agora <MessageCircle size={20} />
              </button>
            </div>

            <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-600/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <ShieldCheck size={20} className="text-blue-500" />
                </div>
                <p className="text-[10px] font-black uppercase tracking-widest opacity-60">100% Seguro</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-600/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Zap size={20} className="text-blue-500" />
                </div>
                <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Veloz</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-600/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <MessageCircle size={20} className="text-blue-500" />
                </div>
                <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Suporte</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-600/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <ShieldCheck size={20} className="text-blue-500" />
                </div>
                <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Garantia</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
