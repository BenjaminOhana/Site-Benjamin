import React, { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import PainPoints from './components/PainPoints';
import Story from './components/Story';
import Transition from './components/Transition';
import Method from './components/Method';
import Testimonials from './components/Testimonials';
import CTA from './components/CTA';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Prevent mobile address bar resize from triggering heavy refreshes
ScrollTrigger.config({ ignoreMobileResize: true });

function App() {
  // Smooth scroll setup for anchor links is handled by CSS scroll-behavior: smooth

  return (
    <div className="min-h-screen bg-cream font-sans text-anthracite selection:bg-terracotta selection:text-white">
      <Header />
      <main>
        <Hero />
        <PainPoints />
        <Story />
        <Transition />
        <Method />
        <Testimonials />
        <CTA />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}

export default App;
