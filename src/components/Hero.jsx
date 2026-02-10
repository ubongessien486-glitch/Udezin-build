import React from 'react';

const Hero = () => {
    return (
        <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-[#0B1C33]">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=2000"
                    alt="Luxury Interior"
                    className="w-full h-full object-cover opacity-40"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0B1C33] via-[#0B1C33]/90 to-[#0B1C33]/70"></div>
                <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#D49D42 1px, transparent 1px)', backgroundSize: '30px 30px', opacity: 0.1 }}></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                <span className="inline-block py-1 px-3 border border-[#D49D42] rounded-full text-[#D49D42] text-xs tracking-[0.2em] uppercase mb-6 animate-fade-in-up">
                    TRUSTED BY NIGERIA'S TOP BUILDERS
                </span>
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight leading-tight">
                    Build with materials that will <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D49D42] to-[#F8FAFC]">stand the test of time...</span>
                </h1>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 font-light">
                    The company specializes in building construction services, focusing on the supply of authentic materials and expert installation.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <a href="/products" className="px-8 py-4 bg-[#D49D42] text-[#0B1C33] font-bold tracking-wide hover:bg-white transition-all transform hover:scale-105 inline-block">
                        VIEW PRICE LIST
                    </a>
                    <a href="#site-works" className="px-8 py-4 border border-gray-600 text-white font-medium hover:border-[#D49D42] hover:text-[#D49D42] transition-all flex items-center justify-center">
                        SITE PROJECTS
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Hero;
