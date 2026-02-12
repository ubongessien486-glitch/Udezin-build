import React from 'react';
import { ShoppingBag, X, Phone, Layers } from 'lucide-react';

const CartSidebar = ({ cart, isOpen, onClose, removeFromCart }) => {
    const calculateTotal = () => cart.reduce((sum, item) => sum + Number(String(item.price).replace(/[^0-9.-]+/g, "")), 0);

    const sendWhatsAppQuote = () => {
        const message = `*QUOTATION REQUEST - UDEZEin*\n\n` +
            cart.map(item => `- ${item.name}: â‚¦${item.price.toLocaleString()}`).join('\n') +
            `\n\n*Total Estimate: â‚¦${calculateTotal().toLocaleString()}*`;

        // Replace with your actual number
        window.open(`https://wa.me/2349090689338?text=${encodeURIComponent(message)}`, '_blank');
    };

    return (
        <div className={`fixed inset-0 z-[60] transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
            <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col">
                <div className="p-6 bg-[#0B1C33] text-white flex justify-between items-center">
                    <h2 className="text-xl font-bold flex items-center gap-2"><ShoppingBag size={20} /> QUOTATION LIST</h2>
                    <button onClick={onClose} className="hover:text-[#D49D42]"><X /></button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {cart.length === 0 ? (
                        <div className="text-center text-gray-400 mt-20">
                            <Layers size={48} className="mx-auto mb-4 opacity-20" />
                            <p>Your list is empty.</p>
                        </div>
                    ) : (
                        cart.map((item, index) => (
                            <div key={index} className="flex gap-4 items-center bg-gray-50 p-4 rounded-lg border border-gray-100">
                                <img src={item.image} className="w-16 h-16 object-cover rounded" alt="" />
                                <div className="flex-1">
                                    <h4 className="font-bold text-[#0B1C33] text-sm">{item.name}</h4>
                                    <p className="text-[#D49D42] text-sm font-mono">â‚¦{Number(String(item.price).replace(/[^0-9.-]+/g, "")).toLocaleString()}</p>
                                </div>
                                <button onClick={() => removeFromCart(index)} className="text-gray-300 hover:text-red-500"><X size={16} /></button>
                            </div>
                        ))
                    )}
                </div>

                <div className="p-6 bg-gray-50 border-t border-gray-200">
                    <div className="flex justify-between mb-4 text-lg font-bold text-[#0B1C33]">
                        <span>Est. Total</span>
                        <span className="font-mono">â‚¦{calculateTotal().toLocaleString()}</span>
                    </div>
                    <button
                        onClick={sendWhatsAppQuote}
                        className="w-full py-4 bg-[#25D366] text-white font-bold rounded hover:bg-[#128C7E] transition flex items-center justify-center gap-2"
                    >
                        <Phone size={20} /> REQUEST VIA WHATSAPP
                    </button>
                    <p className="text-xs text-center text-gray-400 mt-4">Calculated estimates are subject to final site review.</p>
                </div>
            </div>
        </div>
    );
};

export default CartSidebar;

