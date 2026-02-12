import React from 'react';
import { Hammer, Truck, ShieldCheck, Layers } from 'lucide-react';

const Services = () => {
    const services = [
        {
            title: "Supply of Materials",
            icon: <Truck size={32} className="text-[#D49D42]" />,
            items: [
                { name: "Drywall & Ceilings", desc: "Gypsum boards, cement boards, and frames." },
                { name: "Insulation", desc: "Rockwool and fiberglass for optimal thermal control." }
            ]
        },
        {
            title: "Installation Services",
            icon: <Hammer size={32} className="text-[#D49D42]" />,
            items: [
                { name: "Wall & Ceiling Installation", desc: "Expert fixing and finishing." },
                { name: "Soundproofing Solutions", desc: "Professional acoustic treatments." }
            ]
        }
    ];

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-[#0B1C33] mb-4">Services Offered</h2>
                    <div className="w-20 h-1 bg-[#D49D42] mx-auto"></div>
                    <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                        The company specializes in building construction services, specifically focusing on quality supply and professional installation.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {services.map((service, index) => (
                        <div key={index} className="bg-[#F8FAFC] p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 bg-white rounded-full shadow-sm">
                                    {service.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-[#0B1C33]">{service.title}</h3>
                            </div>

                            <div className="space-y-6">
                                {service.items.map((item, idx) => (
                                    <div key={idx} className="flex gap-4">
                                        <div className="mt-1">
                                            <ShieldCheck size={20} className="text-green-600" />
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-semibold text-[#0B1C33]">{item.name}</h4>
                                            <p className="text-gray-500">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;

