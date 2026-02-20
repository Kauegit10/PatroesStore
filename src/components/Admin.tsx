import React, { useState } from 'react';
import { useApp } from '../store';
import { Category, Product } from '../types';
import { Plus, Trash2, Users, Package, LogOut, Image as ImageIcon, Phone } from 'lucide-react';
import { formatCurrency, fixImageUrl } from '../utils';
import { motion } from 'motion/react';

export const AdminPanel = () => {
  const { products, users, addProduct, removeProduct, theme } = useApp();
  const [activeTab, setActiveTab] = useState<'products' | 'users'>('products');
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    description: '',
    image: '',
    category: 'CPM' as Category,
    whatsappNumber: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) return;

    addProduct({
      name: newProduct.name,
      price: parseFloat(newProduct.price),
      description: newProduct.description,
      image: newProduct.image,
      category: newProduct.category,
      whatsappNumber: newProduct.whatsappNumber || '5511999999999'
    });

    setNewProduct({
      name: '',
      price: '',
      description: '',
      image: '',
      category: 'CPM',
      whatsappNumber: ''
    });
  };

  return (
    <div className={`min-h-screen py-20 ${theme === 'dark' ? 'bg-black text-white' : 'bg-gray-50 text-black'}`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-16">
          <div>
            <h1 className="text-5xl font-black tracking-tighter mb-2">Painel de <span className="text-blue-600">Controle</span></h1>
            <p className="text-xs font-black uppercase tracking-[0.3em] opacity-40">Gestão Estratégica PATRÕES STORE</p>
          </div>
          <div className="flex gap-4">
            <div className={`px-6 py-3 rounded-2xl border flex items-center gap-3 ${theme === 'dark' ? 'bg-white/5 border-white/5' : 'bg-white border-gray-100 shadow-sm'}`}>
              <Package size={18} className="text-blue-600" />
              <span className="font-black text-lg">{products.length}</span>
            </div>
            <div className={`px-6 py-3 rounded-2xl border flex items-center gap-3 ${theme === 'dark' ? 'bg-white/5 border-white/5' : 'bg-white border-gray-100 shadow-sm'}`}>
              <Users size={18} className="text-blue-600" />
              <span className="font-black text-lg">{users.length}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-1 space-y-3">
            <button
              onClick={() => setActiveTab('products')}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all ${
                activeTab === 'products' 
                  ? 'bg-blue-600 text-white shadow-2xl shadow-blue-600/30' 
                  : theme === 'dark' ? 'hover:bg-white/5 text-white/40' : 'hover:bg-white text-gray-400'
              }`}
            >
              <Package size={18} />
              <span>Gestão de Produtos</span>
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all ${
                activeTab === 'users' 
                  ? 'bg-blue-600 text-white shadow-2xl shadow-blue-600/30' 
                  : theme === 'dark' ? 'hover:bg-white/5 text-white/40' : 'hover:bg-white text-gray-400'
              }`}
            >
              <Users size={18} />
              <span>Base de Usuários</span>
            </button>
          </aside>

          {/* Main Content Area */}
          <main className="lg:col-span-3">
            {activeTab === 'products' ? (
              <div className="space-y-12">
                {/* Form Section */}
                <section className={`p-10 rounded-[40px] border ${theme === 'dark' ? 'bg-black border-white/5' : 'bg-white border-gray-100 shadow-2xl shadow-blue-500/5'}`}>
                  <h2 className="text-2xl font-black mb-10 flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
                      <Plus className="text-white" size={24} />
                    </div>
                    Novo Ativo Digital
                  </h2>
                  <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-1">Nome do Produto</label>
                      <input
                        type="text"
                        value={newProduct.name}
                        onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
                        className={`w-full px-6 py-4 rounded-2xl border outline-none transition-all font-bold ${
                          theme === 'dark' ? 'bg-white/5 border-white/5 focus:border-blue-500' : 'bg-gray-50 border-gray-200 focus:border-blue-500'
                        }`}
                        placeholder="Ex: Conta CPM Elite"
                        required
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-1">Valor de Venda (R$)</label>
                      <input
                        type="number"
                        step="0.01"
                        value={newProduct.price}
                        onChange={e => setNewProduct({ ...newProduct, price: e.target.value })}
                        className={`w-full px-6 py-4 rounded-2xl border outline-none transition-all font-bold ${
                          theme === 'dark' ? 'bg-white/5 border-white/5 focus:border-blue-500' : 'bg-gray-50 border-gray-200 focus:border-blue-500'
                        }`}
                        placeholder="0.00"
                        required
                      />
                    </div>
                    <div className="space-y-3 md:col-span-2">
                      <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-1">Descrição Detalhada</label>
                      <textarea
                        value={newProduct.description}
                        onChange={e => setNewProduct({ ...newProduct, description: e.target.value })}
                        className={`w-full px-6 py-4 rounded-2xl border outline-none transition-all min-h-[120px] font-medium ${
                          theme === 'dark' ? 'bg-white/5 border-white/5 focus:border-blue-500' : 'bg-gray-50 border-gray-200 focus:border-blue-500'
                        }`}
                        placeholder="Descreva as especificações técnicas..."
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-1">URL da Imagem</label>
                      <input
                        type="text"
                        value={newProduct.image}
                        onChange={e => setNewProduct({ ...newProduct, image: e.target.value })}
                        className={`w-full px-6 py-4 rounded-2xl border outline-none transition-all font-bold ${
                          theme === 'dark' ? 'bg-white/5 border-white/5 focus:border-blue-500' : 'bg-gray-50 border-gray-200 focus:border-blue-500'
                        }`}
                        placeholder="https://i.ibb.co/..."
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-1">WhatsApp de Venda</label>
                      <input
                        type="text"
                        value={newProduct.whatsappNumber}
                        onChange={e => setNewProduct({ ...newProduct, whatsappNumber: e.target.value })}
                        className={`w-full px-6 py-4 rounded-2xl border outline-none transition-all font-bold ${
                          theme === 'dark' ? 'bg-white/5 border-white/5 focus:border-blue-500' : 'bg-gray-50 border-gray-200 focus:border-blue-500'
                        }`}
                        placeholder="5511999999999"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-1">Categoria Estratégica</label>
                      <select
                        value={newProduct.category}
                        onChange={e => setNewProduct({ ...newProduct, category: e.target.value as Category })}
                        className={`w-full px-6 py-4 rounded-2xl border outline-none transition-all font-bold ${
                          theme === 'dark' ? 'bg-white/5 border-white/5 focus:border-blue-500' : 'bg-gray-50 border-gray-200 focus:border-blue-500'
                        }`}
                      >
                        <option value="CPM">CPM</option>
                        <option value="MARKETING">MARKETING</option>
                        <option value="OUTROS">OUTROS</option>
                      </select>
                    </div>
                    <div className="md:col-span-2 pt-6">
                      <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 rounded-2xl font-black text-lg uppercase tracking-widest shadow-2xl shadow-blue-600/30 transition-all transform hover:scale-[1.01] active:scale-95">
                        Publicar Ativo Digital
                      </button>
                    </div>
                  </form>
                </section>

                {/* List Section */}
                <section className={`p-10 rounded-[40px] border ${theme === 'dark' ? 'bg-black border-white/5' : 'bg-white border-gray-100 shadow-2xl shadow-blue-500/5'}`}>
                  <h2 className="text-2xl font-black mb-10">Inventário Atual</h2>
                  <div className="space-y-4">
                    {products.map(product => (
                      <div key={product.id} className={`flex items-center gap-6 p-4 rounded-3xl border transition-all hover:scale-[1.01] ${theme === 'dark' ? 'bg-white/5 border-white/5 hover:border-blue-500/30' : 'bg-gray-50 border-gray-100 hover:border-blue-200'}`}>
                        <img src={fixImageUrl(product.image)} className="w-16 h-16 rounded-2xl object-cover shadow-lg" alt="" />
                        <div className="flex-1">
                          <h4 className="font-black text-lg">{product.name}</h4>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">{product.category}</span>
                            <span className="w-1 h-1 bg-white/10 rounded-full" />
                            <span className="text-sm font-bold opacity-60">{formatCurrency(product.price)}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => removeProduct(product.id)}
                          className="p-4 text-red-500 hover:bg-red-500/10 rounded-2xl transition-colors"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            ) : (
              <section className={`p-10 rounded-[40px] border ${theme === 'dark' ? 'bg-black border-white/5' : 'bg-white border-gray-100 shadow-2xl shadow-blue-500/5'}`}>
                <h2 className="text-2xl font-black mb-10">Base de Usuários</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {users.map(user => (
                    <div key={user.id} className={`flex items-center gap-4 p-5 rounded-3xl border ${theme === 'dark' ? 'bg-white/5 border-white/5' : 'bg-white border-gray-100'}`}>
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-2xl shadow-lg ${user.isAdmin ? 'bg-blue-600 text-white' : 'bg-blue-600/10 text-blue-600'}`}>
                        {user.username[0].toUpperCase()}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-black">{user.username}</p>
                          {user.isAdmin && <span className="text-[8px] font-black bg-blue-600 text-white px-2 py-0.5 rounded-full uppercase tracking-widest">Admin</span>}
                        </div>
                        <p className="text-xs opacity-40 font-medium truncate">{user.email}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};
