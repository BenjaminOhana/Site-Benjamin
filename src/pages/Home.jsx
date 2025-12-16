import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Hero from '../components/Hero';
import PainPoints from '../components/PainPoints';
import Story from '../components/Story';
import Method from '../components/Method';
import Testimonials from '../components/Testimonials';
import CTA from '../components/CTA';
import FAQ from '../components/FAQ';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
    useEffect(() => {
        // Refresh ScrollTrigger when component mounts/updates to ensure animations work correctly
        ScrollTrigger.refresh();
    }, []);

    return (
        <>
            <Helmet>
                <title>Benjamin - Entrepreneur Aligné | Coaching Créatifs & Praticiens</title>
                <meta name="description" content="Coaching pour créatifs et praticiens : vis de ta passion sans vendre ton âme. Structure et alignement pour ton activité." />
                <link rel="canonical" href="https://entrepreneuraligne.fr/" />
            </Helmet>
            <Hero />
            <PainPoints />
            <Story />
            <Method />
            <Testimonials />
            <CTA />
            <FAQ />
        </>
    );
};

export default Home;
