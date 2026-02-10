import React, { useState } from 'react';
import { ShoppingBag, Layers, Lock, Unlock, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = ({ cartCount, setIsCartOpen, isAdmin, setIsAdmin }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleAdminToggle = () => {
    if (isAdmin) {
      setIsAdmin(false);
      return;
    }

    const password = window.prompt("Enter Admin Password:");
    if (password === "udezin@admin") {
      setIsAdmin(true);
      alert("Welcome Admin!");
    } else if (password !== null) {
      alert("Incorrect Password");
    }
  };

  return (
    <nav className="fixed w-full z-50 top-0 bg-[#0B1C33]/90 backdrop-blur-md border-b border-[#D49D42]/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <Layers className="h-8 w-8 text-[#D49D42] group-hover:rotate-12 transition-transform" />
            <div>
              <h1 className="text-2xl font-bold text-white tracking-wider">UDEZE<span className="text-[#D49D42]">in</span></h1>
              <p className="text-[0.6rem] text-gray-400 tracking-[0.2em] uppercase">Circle of Builders</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-6 text-sm font-bold tracking-widest text-gray-300">
              <Link to="/" className="hover:text-[#D49D42] transition relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-[#D49D42] hover:after:w-full after:transition-all">HOME</Link>
              <Link to="/products" className="hover:text-[#D49D42] transition relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-[#D49D42] hover:after:w-full after:transition-all">PRODUCTS</Link>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={handleAdminToggle}
                className={`p-2 rounded-full transition-colors ${isAdmin ? 'bg-red-500/20 text-red-400' : 'text-gray-400 hover:text-white'}`}
                title={isAdmin ? "Exit Admin Mode" : "Enter Admin Mode"}
              >
                {isAdmin ? <Unlock size={18} /> : <Lock size={18} />}
              </button>
              <button onClick={() => setIsCartOpen(true)} className="relative p-2 text-white hover:text-[#D49D42] transition">
                <ShoppingBag size={24} />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 h-5 w-5 bg-[#D49D42] rounded-full flex items-center justify-center text-xs font-bold text-[#0B1C33] animate-bounce">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <button onClick={() => setIsCartOpen(true)} className="relative p-2 text-white">
              <ShoppingBag size={24} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 h-5 w-5 bg-[#D49D42] rounded-full flex items-center justify-center text-xs font-bold text-[#0B1C33]">
                  {cartCount}
                </span>
              )}
            </button>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#0B1C33] border-t border-gray-800 p-4 animate-slide-down">
          <div className="flex flex-col space-y-4 text-center">
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-white py-2 font-bold tracking-widest hover:text-[#D49D42]">HOME</Link>
            <Link to="/products" onClick={() => setIsMenuOpen(false)} className="text-white py-2 font-bold tracking-widest hover:text-[#D49D42]">PRODUCTS</Link>
            <button onClick={() => { handleAdminToggle(); setIsMenuOpen(false); }} className="text-gray-400 py-2">
              {isAdmin ? "Exit Admin" : "Admin Login"}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
