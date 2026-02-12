import React, { useEffect } from 'react';
import Hero from '../components/Hero';
import SiteWorksGallery from '../components/SiteWorksGallery';
import PHShowcase from '../components/PHShowcase';
import Services from '../components/Services';

const Home = ({ projects, isAdmin, handleEditProject }) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <Hero />
            <Services />
            <div id="site-works">
                <SiteWorksGallery
                    projects={projects}
                    isAdmin={isAdmin}
                    handleEditProject={handleEditProject}
                />
            </div>
            <PHShowcase
                projects={projects}
                isAdmin={isAdmin}
                handleEditProject={handleEditProject}
            />
        </>
    );
};

export default Home;

