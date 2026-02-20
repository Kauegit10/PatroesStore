import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Sun, Moon, LogOut, Menu, X, ShieldCheck, ArrowRight } from 'lucide-react';
import { useApp } from '../store';
import { motion, AnimatePresence } from 'motion/react';

export const Navbar = () => {
  const { cart, currentUser, logout, theme, toggleTheme } = useApp();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
      theme === 'dark' 
        ? 'bg-black/90 border-blue-900/50 text-white' 
        : 'bg-white/90 border-blue-100 text-black'
    } backdrop-blur-xl`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center rotate-3 group-hover:rotate-12 transition-transform shadow-lg shadow-blue-600/20">
              <span className="text-white font-black text-xl">P</span>
            </div>
            <span className="text-2xl font-black tracking-tighter">PATRÕES<span className="text-blue-600">STORE</span></span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-10">
            <div className="flex items-center space-x-8">
              <Link to="/" className="text-sm font-bold uppercase tracking-widest hover:text-blue-500 transition-colors">Início</Link>
              <Link to="/produtos" className="text-sm font-bold uppercase tracking-widest hover:text-blue-500 transition-colors">Produtos</Link>
            </div>
            
            <div className="flex items-center space-x-6 border-l pl-8 border-blue-500/20">
              <button onClick={toggleTheme} className={`p-2.5 rounded-xl transition-all ${
                theme === 'dark' ? 'bg-blue-900/20 text-blue-400 hover:bg-blue-900/40' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
              }`}>
                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
              </button>
              
              <Link to="/carrinho" className={`relative p-2.5 rounded-xl transition-all ${
                theme === 'dark' ? 'bg-blue-900/20 text-blue-400 hover:bg-blue-900/40' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
              }`}>
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-lg shadow-blue-600/40">
                    {cartCount}
                  </span>
                )}
              </Link>

              {currentUser ? (
                <div className="flex items-center space-x-4">
                  <Link to={currentUser.isAdmin ? "/admin" : "/perfil"} className={`flex items-center space-x-3 px-4 py-2 rounded-xl transition-all ${
                    theme === 'dark' ? 'bg-blue-900/20 hover:bg-blue-900/40' : 'bg-blue-50 hover:bg-blue-100'
                  }`}>
                    {currentUser.isAdmin ? <ShieldCheck size={18} className="text-blue-500" /> : <User size={18} className="text-blue-500" />}
                    <span className="text-sm font-black uppercase tracking-wider">{currentUser.username}</span>
                  </Link>
                  <button onClick={() => { logout(); navigate('/'); }} className="p-2.5 text-red-500 hover:bg-red-500/10 rounded-xl transition-colors">
                    <LogOut size={20} />
                  </button>
                </div>
              ) : (
                <Link to="/login" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-black text-sm uppercase tracking-widest transition-all shadow-lg shadow-blue-600/20 hover:scale-105 active:scale-95">
                  Acessar Conta
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-3">
            <button onClick={toggleTheme} className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-blue-900/20' : 'bg-gray-100'}`}>
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>
            <Link to="/carrinho" className={`relative p-2 rounded-lg ${theme === 'dark' ? 'bg-blue-900/20' : 'bg-gray-100'}`}>
              <ShoppingCart size={18} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] font-black px-1.5 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`md:hidden border-t ${theme === 'dark' ? 'bg-black border-blue-900/50' : 'bg-white border-blue-100'}`}
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md hover:bg-blue-500/10">Início</Link>
              <Link to="/produtos" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md hover:bg-blue-500/10">Produtos</Link>
              {currentUser ? (
                <>
                  <Link to={currentUser.isAdmin ? "/admin" : "/perfil"} onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md hover:bg-blue-500/10">
                    {currentUser.isAdmin ? 'Painel Admin' : 'Meu Perfil'}
                  </Link>
                  <button onClick={() => { logout(); setIsMenuOpen(false); navigate('/'); }} className="w-full text-left px-3 py-2 rounded-md text-red-500 hover:bg-red-500/10">
                    Sair
                  </button>
                </>
              ) : (
                <Link to="/login" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 bg-blue-600 text-white text-center rounded-md font-bold">
                  Entrar
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export const Hero = () => {
  return (
    <div className="relative min-h-[80vh] flex items-center overflow-hidden bg-black text-white">
      {/* Carnival Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/20 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-900/30 blur-[150px] rounded-full animate-pulse delay-1000" />
        
        {/* Animated Grid lines */}
        <div className="absolute inset-0 opacity-10" style={{ 
          backgroundImage: 'linear-gradient(to right, #1e40af 1px, transparent 1px), linear-gradient(to bottom, #1e40af 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />

        {/* Confetti-like particles */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: -20, x: Math.random() * 100 + '%' }}
            animate={{ 
              y: '110vh',
              rotate: 360,
              x: (Math.random() * 100 - 50) + '%'
            }}
            transition={{ 
              duration: Math.random() * 8 + 7, 
              repeat: Infinity, 
              ease: "linear",
              delay: Math.random() * 10
            }}
            className={`absolute w-1.5 h-1.5 rounded-full ${['bg-blue-500', 'bg-white', 'bg-blue-300', 'bg-blue-700'][i % 4]}`}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/10 border border-blue-600/20 text-blue-400 text-xs font-black uppercase tracking-[0.3em] mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Líder em CPM & Marketing
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9]">
              PATRÕES <br />
              <span className="text-blue-600">STORE</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-200/60 max-w-xl mb-12 font-medium leading-relaxed">
              A PATRÕES STORE chegou com o melhor da Internet, contas de jogos e serviços de redes sociais, tudo isso você só encontra aqui.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <Link to="/produtos" className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-2xl font-black text-lg uppercase tracking-widest transition-all transform hover:scale-105 shadow-2xl shadow-blue-600/30 flex items-center justify-center gap-3">
                Explorar Loja <ArrowRight size={20} />
              </Link>
              <Link to="/login" className="bg-white/5 hover:bg-white/10 backdrop-blur-md text-white border border-white/10 px-10 py-5 rounded-2xl font-black text-lg uppercase tracking-widest transition-all flex items-center justify-center">
                Criar Conta
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="hidden lg:block relative"
          >
            <div className="relative z-10 rounded-[40px] overflow-hidden border border-white/10 shadow-2xl shadow-blue-600/20">
              <img 
                src="https://picsum.photos/seed/tech/800/800" 
                alt="Elite Services" 
                className="w-full aspect-square object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              <div className="absolute bottom-10 left-10 right-10">
                <div className="p-6 rounded-3xl bg-black/40 backdrop-blur-xl border border-white/10">
                  <p className="text-sm font-black uppercase tracking-widest text-blue-400 mb-2">Oferta Especial</p>
                  <p className="text-2xl font-black">Carnaval de Ofertas</p>
                  <p className="text-sm opacity-60">Até 50% OFF em serviços selecionados</p>
                </div>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-600/20 blur-[80px] rounded-full" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-900/40 blur-[80px] rounded-full" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};
