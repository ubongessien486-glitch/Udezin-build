import React from 'react';
import { Edit3, MapPin } from 'lucide-react';

const SiteWorksGallery = ({ projects, isAdmin, handleEditProject }) => {
    return (
        <div className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-[#0B1C33] mb-12 flex items-center gap-4">
                    <span className="w-12 h-1 bg-[#D49D42]"></span>
                    SITE PROGRESS
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                    {projects
                        .filter(p => p.section === 'site')
                        .map(project => (
                            <div key={project.id} className="group relative overflow-hidden rounded-xl bg-white shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                                <div className="relative aspect-[4/3] overflow-hidden">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>

                                    {isAdmin && (
                                        <button
                                            onClick={() => handleEditProject(project)}
                                            className="absolute top-2 right-2 bg-white/90 p-2 rounded-full shadow-lg hover:bg-[#D49D42] hover:text-white transition-colors z-20"
                                            title="Edit project"
                                        >
                                            <Edit3 size={16} />
                                        </button>
                                    )}

                                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white translate-y-2 group-hover:translate-y-0 transition-transform">
                                        <span className={`inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider mb-2 ${project.status === 'Completed' ? 'bg-[#D49D42] text-[#0B1C33]' : 'bg-blue-500 text-white'}`}>
                                            {project.status}
                                        </span>
                                        <h3 className="text-xl font-bold mb-1 font-playfair">{project.title}</h3>
                                        <div className="flex items-center gap-2 text-gray-300 mt-2 text-sm">
                                            <MapPin size={14} /> {project.location || "Lagos, Nigeria"}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default SiteWorksGallery;

