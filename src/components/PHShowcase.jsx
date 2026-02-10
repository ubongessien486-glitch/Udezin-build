import React from 'react';
import { Edit3, MapPin } from 'lucide-react';

const PHShowcase = ({ projects, isAdmin, handleEditProject }) => {
    return (
        <div className="py-20 bg-[#0B1C33] text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-12">
                    <h2 className="text-3xl font-bold flex items-center gap-4">
                        <span className="w-12 h-1 bg-[#D49D42]"></span>
                        EXPANDING TO PORT HARCOURT
                    </h2>
                    <p className="text-gray-400 mt-4 ml-16 max-w-xl">
                        Bringing premium finishes to the Garden City. We now offer dedicated logistics and supply chain services for massive developments in Rivers State.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {projects
                        .filter(p => p.section === 'ph')
                        .map(project => (
                            <div key={project.id} className="relative group overflow-hidden rounded-xl aspect-[4/3] transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition duration-500 z-10"></div>

                                {isAdmin && (
                                    <button
                                        onClick={() => handleEditProject(project)}
                                        className="absolute top-2 right-2 bg-white/90 p-2 rounded-full text-black shadow-lg hover:bg-[#D49D42] hover:text-white transition-colors z-30"
                                        title="Edit project"
                                    >
                                        <Edit3 size={16} />
                                    </button>
                                )}

                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700"
                                />
                                <div className="absolute bottom-6 left-6 z-20">
                                    <div className="flex items-center gap-2 text-[#D49D42] text-sm font-bold tracking-wider mb-2">
                                        <MapPin size={16} /> {project.location}
                                    </div>
                                    <h3 className="text-2xl font-bold">{project.title}</h3>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default PHShowcase;
