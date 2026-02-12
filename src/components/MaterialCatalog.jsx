import React, { useState } from 'react';
import { Edit3, Trash2, Plus, Search } from 'lucide-react';

const MaterialCatalog = ({
    products,
    activeCategory,
    setActiveCategory,
    isAdmin,
    handleEditProduct,
    handleDeleteProduct,
    addToCart
}) => {
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <div id="catalog" className="py-20 bg-[#F8FAFC]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
                    <h2 className="text-3xl font-bold text-[#0B1C33] flex items-center gap-4">
                        <span className="w-12 h-1 bg-[#D49D42]"></span>
                        MATERIAL LIBRARY
                    </h2>

                    <div className="flex flex-col md:flex-row gap-6 w-full md:w-auto">
                        {/* Search Bar */}
                        <div className="relative group min-w-[280px]">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#D49D42] transition-colors" size={20} />
                            <input
                                type="text"
                                placeholder="Search materials..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 bg-white focus:outline-none focus:border-[#D49D42] focus:ring-4 focus:ring-[#D49D42]/10 transition-all shadow-sm"
                            />
                        </div>

                        {/* Filter Tabs */}
                        <div className="flex flex-wrap gap-2">
                            {['All', 'Interior', 'Exterior', 'Wall Decor'].map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${activeCategory === cat ? 'bg-[#0B1C33] text-white shadow-lg' : 'bg-white text-gray-500 hover:text-[#0B1C33]'}`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {products
                        .filter(p => (activeCategory === 'All' || p.category === activeCategory) &&
                            (p.name.toLowerCase().includes(searchTerm.toLowerCase())))
                        .map((product) => (
                            <div key={product.id} className="group bg-white rounded-xl shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden relative hover:-translate-y-2">
                                {isAdmin && (
                                    <div className="absolute top-2 right-2 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button onClick={() => handleEditProduct(product)} className="p-2 bg-[#0B1C33] text-white rounded-full hover:bg-[#D49D42]">
                                            <Edit3 size={16} />
                                        </button>
                                        <button onClick={() => handleDeleteProduct(product.id)} className="p-2 bg-red-500 text-white rounded-full">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                )}
                                <div className="relative h-64 overflow-hidden bg-gray-200">
                                    <img src={product.image} alt={product.name} loading="lazy" className="w-full h-full object-cover transition duration-500 group-hover:scale-110" />
                                    <div className="absolute top-4 left-4">
                                        <span className="bg-[#0B1C33]/90 backdrop-blur text-white text-[0.65rem] uppercase tracking-widest px-3 py-1">
                                            {product.stock}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <p className="text-xs text-[#D49D42] font-bold uppercase tracking-wider mb-2">{product.category}</p>
                                    <h3 className="text-lg font-bold text-[#0B1C33] mb-4 line-clamp-2 h-14 leading-snug" title={product.name}>{product.name}</h3>
                                    <div className="flex items-center justify-between">
                                        <span className="font-mono text-xl text-gray-700">&#8358;{Number(String(product.price).replace(/[^0-9.-]+/g, "")).toLocaleString()}</span>
                                        <button
                                            onClick={() => addToCart(product)}
                                            className="p-3 bg-[#F8FAFC] text-[#0B1C33] rounded-full hover:bg-[#0B1C33] hover:text-white transition-colors group-hover:shadow-lg"
                                        >
                                            <Plus size={20} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default MaterialCatalog;

