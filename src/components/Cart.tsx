import React from 'react';
import { useApp } from '../store';
import { Trash2, ShoppingBag, ArrowRight, MessageCircle, ShieldCheck } from 'lucide-react';
import { formatCurrency, fixImageUrl } from '../utils';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';

export const CartPage = () => {
  const { cart, removeFromCart, theme } = useApp();

  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleCheckout = () => {
    if (cart.length === 0) return;

    const primaryNumber = cart[0].whatsappNumber || '5511999999999';
    
    let message = `Olá! Gostaria de finalizar a compra dos seguintes itens na PATRÕES STORE:\n\n`;
    cart.forEach(item => {
      message += `- ${item.name} (${item.quantity}x) - ${formatCurrency(item.price * item.quantity)}\n`;
    });
    message += `\n*Total: ${formatCurrency(total)}*`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${primaryNumber}?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className={`min-h-screen py-20 ${theme === 'dark' ? 'bg-black text-white' : 'bg-gray-50 text-black'}`}>
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <h1 className="text-5xl font-black tracking-tighter flex items-center gap-4">
            <ShoppingBag className="text-blue-600" size={40} /> Seu <span className="text-blue-600">Carrinho</span>
          </h1>
          <div className={`px-6 py-2 rounded-full font-black text-xs uppercase tracking-widest ${theme === 'dark' ? 'bg-white/5' : 'bg-white shadow-sm'}`}>
            {cart.length} {cart.length === 1 ? 'Item' : 'Itens'}
          </div>
        </div>

        {cart.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            <div className="lg:col-span-2 space-y-6">
              <AnimatePresence mode="popLayout">
                {cart.map(item => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    key={item.id}
                    className={`flex items-center gap-6 p-6 rounded-[32px] border transition-all ${
                      theme === 'dark' ? 'bg-white/5 border-white/5' : 'bg-white border-gray-100 shadow-sm'
                    }`}
                  >
                    <div className="w-24 h-24 rounded-2xl overflow-hidden shadow-lg">
                      <img src={fixImageUrl(item.image)} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">{item.category}</span>
                      </div>
                      <h3 className="text-xl font-black tracking-tight">{item.name}</h3>
                      <p className="text-blue-600 font-black text-lg mt-1">{formatCurrency(item.price)}</p>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className={`flex items-center gap-4 px-4 py-2 rounded-xl ${theme === 'dark' ? 'bg-black/40' : 'bg-gray-50'}`}>
                        <span className="text-xs font-black opacity-40 uppercase tracking-widest">Qtd</span>
                        <span className="font-black text-lg">{item.quantity}</span>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-3 text-red-500 hover:bg-red-500/10 rounded-xl transition-colors"
                      >
                        <Trash2 size={24} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="lg:col-span-1">
              <div className={`p-10 rounded-[40px] border sticky top-24 transition-all ${
                theme === 'dark' ? 'bg-black border-white/5' : 'bg-white border-gray-100 shadow-2xl shadow-blue-500/5'
              }`}>
                <h2 className="text-xs font-black uppercase tracking-[0.3em] opacity-40 mb-8">Resumo do Pedido</h2>
                <div className="space-y-6 mb-10">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold opacity-60">Subtotal</span>
                    <span className="font-bold">{formatCurrency(total)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold opacity-60">Taxas de Serviço</span>
                    <span className="text-green-500 font-bold uppercase text-[10px] tracking-widest">Grátis</span>
                  </div>
                  <div className="h-px bg-white/5" />
                  <div className="flex justify-between items-end">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black uppercase tracking-widest opacity-40">Total Final</span>
                      <span className="text-4xl font-black text-blue-600">{formatCurrency(total)}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 rounded-2xl font-black text-lg uppercase tracking-widest flex items-center justify-center gap-3 shadow-2xl shadow-blue-600/30 transition-all transform hover:scale-[1.02] active:scale-95"
                >
                  Finalizar <MessageCircle size={24} />
                </button>
                
                <div className="mt-8 flex items-center justify-center gap-3 opacity-30">
                  <ShieldCheck size={16} />
                  <span className="text-[10px] font-black uppercase tracking-widest">Pagamento 100% Seguro</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-center py-32 rounded-[48px] border-2 border-dashed ${
              theme === 'dark' ? 'border-white/5 text-blue-200/20' : 'border-gray-100 text-gray-300'
            }`}
          >
            <div className="w-24 h-24 bg-blue-600/5 rounded-full flex items-center justify-center mx-auto mb-8">
              <ShoppingBag size={48} className="opacity-20" />
            </div>
            <p className="text-3xl font-black tracking-tight mb-8">Seu carrinho está vazio</p>
            <Link to="/produtos" className="inline-flex items-center gap-3 bg-blue-600 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20">
              Ir para Loja <ArrowRight size={20} />
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
};
