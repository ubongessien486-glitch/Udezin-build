import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-[#0B1C33] text-white py-12 border-t border-[#D49D42]/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-3 gap-8 mb-12 text-center md:text-left">
                    <div>
                        <h2 className="text-2xl font-bold tracking-widest mb-4">UDEZE<span className="text-[#D49D42]">in</span></h2>
                        <p className="text-gray-400 text-sm">Building Legacies across Nigeria.</p>
                    </div>

                    <div className="space-y-4 text-sm text-gray-300">
                        <div className="flex items-center justify-center md:justify-start gap-3">
                            <MapPin size={16} className="text-[#D49D42]" />
                            <span>2 Shiro Street, Fadeyi, Lagos</span>
                        </div>
                        <div className="flex flex-col items-center md:items-start gap-1">
                            <div className="flex items-center gap-3">
                                <Phone size={16} className="text-[#D49D42]" />
                                <span>+234 909 068 9338</span>
                            </div>
                            <div className="pl-7 text-gray-400 text-xs">
                                <p>0708 473 8330</p>
                                <p>0806 491 3559</p>
                            </div>
                        </div>
                        <div className="flex items-center justify-center md:justify-start gap-3">
                            <Mail size={16} className="text-[#D49D42]" />
                            <a href="mailto:infomedetails@gmail.com" className="hover:text-white transition">infomedetails@gmail.com</a>
                        </div>
                    </div>

                    <div className="flex flex-col items-center md:items-end justify-center">
                        <a
                            href="https://wa.me/2349090689338"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-full font-bold hover:bg-[#128C7E] transition mb-4"
                        >
                            <Phone size={18} /> Chat on WhatsApp
                        </a>
                        <p className="text-xs text-gray-500 mb-4">Available 9am - 6pm</p>

                        <div className="flex gap-4 text-gray-400">
                            <a href="https://instagram.com/udezein" target="_blank" rel="noopener noreferrer" className="hover:text-[#D49D42] transition flex flex-col items-center">
                                <span className="text-xs">IG: udezein</span>
                            </a>
                            <a href="https://tiktok.com/@_udezein" target="_blank" rel="noopener noreferrer" className="hover:text-[#D49D42] transition flex flex-col items-center">
                                <span className="text-xs">TikTok: _udezein</span>
                            </a>
                            <a href="https://twitter.com/udezein" target="_blank" rel="noopener noreferrer" className="hover:text-[#D49D42] transition flex flex-col items-center">
                                <span className="text-xs">X: udezein</span>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 text-center">
                    <p className="text-[#D49D42] text-xs tracking-widest uppercase">&copy; 2026 Udezein. Building Legacies.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

