import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../store';
import { User, Mail, Lock, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { formatCurrency, fixImageUrl } from '../utils';

export const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, theme } = useApp();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(username, password)) {
      navigate('/');
    } else {
      setError('Usuário ou senha incorretos.');
    }
  };

  return (
    <div className={`min-h-[calc(100vh-80px)] flex items-center justify-center p-6 ${theme === 'dark' ? 'bg-black' : 'bg-gray-50'}`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`w-full max-w-md p-10 rounded-[40px] border transition-all ${
          theme === 'dark' ? 'bg-black border-white/5' : 'bg-white border-gray-100 shadow-2xl shadow-blue-500/10'
        }`}
      >
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 rotate-6 shadow-xl shadow-blue-600/20">
            <User className="text-white" size={32} />
          </div>
          <h1 className={`text-4xl font-black tracking-tighter mb-3 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
            BEM-VINDO <span className="text-blue-600">DE VOLTA</span>
          </h1>
          <p className="text-xs font-black uppercase tracking-widest opacity-40">Acesse sua conta PATRÕES STORE</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 ml-1">Usuário de Acesso</label>
            <div className="relative group">
              <User className="absolute left-5 top-1/2 -translate-y-1/2 text-blue-600 group-focus-within:scale-110 transition-transform" size={20} />
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                className={`w-full pl-14 pr-6 py-5 rounded-2xl border outline-none transition-all font-bold ${
                  theme === 'dark' ? 'bg-white/5 border-white/5 focus:border-blue-500 text-white' : 'bg-gray-50 border-gray-200 focus:border-blue-500'
                }`}
                placeholder="Seu username"
                required
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 ml-1">Senha Secreta</label>
            <div className="relative group">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-blue-600 group-focus-within:scale-110 transition-transform" size={20} />
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className={`w-full pl-14 pr-6 py-5 rounded-2xl border outline-none transition-all font-bold ${
                  theme === 'dark' ? 'bg-white/5 border-white/5 focus:border-blue-500 text-white' : 'bg-gray-50 border-gray-200 focus:border-blue-500'
                }`}
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          {error && (
            <motion.p 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-red-500 text-xs font-black uppercase tracking-widest text-center"
            >
              {error}
            </motion.p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 rounded-2xl font-black text-lg uppercase tracking-widest shadow-2xl shadow-blue-600/30 transition-all transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3"
          >
            Entrar Agora <ArrowRight size={20} />
          </button>
        </form>

        <div className="mt-12 text-center space-y-6">
          <p className="text-sm font-medium opacity-60">
            Ainda não é um Patrão? <Link to="/registro" className="text-blue-600 font-black hover:underline">Crie sua conta</Link>
          </p>
          <div className="pt-6 border-t border-white/5">
            <div className="flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] opacity-20">
              <ShieldCheck size={12} />
              Ambiente 100% Criptografado
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register, theme } = useApp();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    register(username, email, password);
    navigate('/');
  };

  return (
    <div className={`min-h-[calc(100vh-80px)] flex items-center justify-center p-6 ${theme === 'dark' ? 'bg-black' : 'bg-gray-50'}`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`w-full max-w-md p-10 rounded-[40px] border transition-all ${
          theme === 'dark' ? 'bg-black border-white/5' : 'bg-white border-gray-100 shadow-2xl shadow-blue-500/10'
        }`}
      >
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 -rotate-6 shadow-xl shadow-blue-600/20">
            <ShieldCheck className="text-white" size={32} />
          </div>
          <h1 className={`text-4xl font-black tracking-tighter mb-3 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
            CRIAR <span className="text-blue-600">CONTA</span>
          </h1>
          <p className="text-xs font-black uppercase tracking-widest opacity-40">Junte-se à elite da PATRÕES STORE</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 ml-1">Username</label>
            <div className="relative group">
              <User className="absolute left-5 top-1/2 -translate-y-1/2 text-blue-600 group-focus-within:scale-110 transition-transform" size={20} />
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                className={`w-full pl-14 pr-6 py-5 rounded-2xl border outline-none transition-all font-bold ${
                  theme === 'dark' ? 'bg-white/5 border-white/5 focus:border-blue-500 text-white' : 'bg-gray-50 border-gray-200 focus:border-blue-500'
                }`}
                placeholder="Seu nome"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 ml-1">E-mail Corporativo</label>
            <div className="relative group">
              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-blue-600 group-focus-within:scale-110 transition-transform" size={20} />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className={`w-full pl-14 pr-6 py-5 rounded-2xl border outline-none transition-all font-bold ${
                  theme === 'dark' ? 'bg-white/5 border-white/5 focus:border-blue-500 text-white' : 'bg-gray-50 border-gray-200 focus:border-blue-500'
                }`}
                placeholder="seu@email.com"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 ml-1">Senha de Acesso</label>
            <div className="relative group">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-blue-600 group-focus-within:scale-110 transition-transform" size={20} />
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className={`w-full pl-14 pr-6 py-5 rounded-2xl border outline-none transition-all font-bold ${
                  theme === 'dark' ? 'bg-white/5 border-white/5 focus:border-blue-500 text-white' : 'bg-gray-50 border-gray-200 focus:border-blue-500'
                }`}
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 rounded-2xl font-black text-lg uppercase tracking-widest shadow-2xl shadow-blue-600/30 transition-all transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3"
          >
            Criar Minha Conta <ArrowRight size={20} />
          </button>
        </form>

        <p className="mt-10 text-center text-sm font-medium opacity-60">
          Já faz parte da elite? <Link to="/login" className="text-blue-600 font-black hover:underline">Faça Login</Link>
        </p>
      </motion.div>
    </div>
  );
};

export const ProfilePage = () => {
  const { currentUser, history, products, theme, logout } = useApp();
  const navigate = useNavigate();

  if (!currentUser) {
    navigate('/login');
    return null;
  }

  const visitedProducts = products.filter(p => history.includes(p.id));

  return (
    <div className={`min-h-screen py-20 ${theme === 'dark' ? 'bg-black text-white' : 'bg-gray-50 text-black'}`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Profile Sidebar */}
          <div className="lg:col-span-1">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-10 rounded-[40px] border text-center sticky top-24 ${
                theme === 'dark' ? 'bg-black border-white/5' : 'bg-white border-gray-100 shadow-2xl shadow-blue-500/5'
              }`}
            >
              <div className="w-28 h-28 bg-blue-600 rounded-[32px] flex items-center justify-center text-5xl font-black text-white mx-auto mb-8 shadow-2xl shadow-blue-600/40 rotate-3">
                {currentUser.username[0].toUpperCase()}
              </div>
              <h2 className="text-3xl font-black tracking-tighter mb-2">{currentUser.username}</h2>
              <p className="text-xs font-black uppercase tracking-widest opacity-40 mb-8">{currentUser.email}</p>
              
              <div className="space-y-3 text-left mb-8">
                <div className={`p-4 rounded-2xl flex items-center gap-3 ${theme === 'dark' ? 'bg-white/5' : 'bg-blue-50'}`}>
                  <ShieldCheck size={20} className="text-blue-600" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">Membro Verificado</span>
                </div>
              </div>

              <button 
                onClick={() => { logout(); navigate('/'); }}
                className="w-full py-4 rounded-2xl border border-red-500/20 text-red-500 font-black uppercase tracking-widest text-xs hover:bg-red-500/10 transition-all"
              >
                Encerrar Sessão
              </button>
            </motion.div>
          </div>

          {/* History */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-4xl font-black tracking-tighter">Histórico de <span className="text-blue-600">Interesse</span></h2>
              <div className={`px-6 py-2 rounded-full font-black text-[10px] uppercase tracking-widest ${theme === 'dark' ? 'bg-white/5' : 'bg-white shadow-sm'}`}>
                {visitedProducts.length} Visualizações
              </div>
            </div>

            {visitedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {visitedProducts.map(product => (
                  <motion.div 
                    layout
                    key={product.id} 
                    className={`group p-6 rounded-[32px] border transition-all hover:scale-[1.02] ${theme === 'dark' ? 'bg-white/5 border-white/5' : 'bg-white border-gray-100 shadow-sm'}`}
                  >
                    <div className="aspect-video rounded-2xl overflow-hidden mb-6 shadow-lg">
                      <img src={fixImageUrl(product.image)} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="" />
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">{product.category}</span>
                    </div>
                    <h3 className="text-xl font-black tracking-tight mb-2 truncate">{product.name}</h3>
                    <p className="text-2xl font-black text-blue-600">{formatCurrency(product.price)}</p>
                    <Link to={`/produto/${product.id}`} className="block w-full text-center mt-6 py-3 rounded-xl bg-blue-600/10 text-blue-600 text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all">
                      Revisitar Ativo
                    </Link>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className={`text-center py-32 rounded-[48px] border-2 border-dashed ${
                theme === 'dark' ? 'border-white/5 text-blue-200/20' : 'border-gray-100 text-gray-300'
              }`}>
                <p className="text-2xl font-black tracking-tight">Nenhum rastro encontrado.</p>
                <p className="text-sm font-medium opacity-40 mt-2">Explore nossa vitrine para começar seu histórico.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
