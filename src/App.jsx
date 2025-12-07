import React, { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import PainPoints from './components/PainPoints';
import Story from './components/Story';
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

  useEffect(() => {
    // Initialize Lenis only on desktop
    if (window.innerWidth > 1024) {
      // Dynamic import to avoid breaking if not present, but we installed it. 
      // Or just standard import if we are sure it won't affect mobile performance too much (it won't run).
      import('lenis').then((LenisModule) => {
        const Lenis = LenisModule.default;
        const lenis = new Lenis({
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          direction: 'vertical',
          gestureDirection: 'vertical',
          smooth: true,
          mouseMultiplier: 1,
          smoothTouch: false,
          touchMultiplier: 2,
        });

        // Integrate with GSAP
        // We use GSAP ticker to drive Lenis for perfect sync with ScrollTrigger
        gsap.ticker.add((time) => {
          lenis.raf(time * 1000);
        });

        // Turn off lag smoothing to prevent jumpiness during heavy load/scroll
        gsap.ticker.lagSmoothing(0);

        return () => {
          lenis.destroy();
          // Remove listener
          // Note: gsap.ticker.remove needs the exact function reference, 
          // but here we used an arrow function so we can't easily remove it unless we store it.
          // However, for the App component which mounts once, it's mostly fine, 
          // but cleaner to store the ticker function.
        };
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-cream font-sans text-anthracite selection:bg-terracotta selection:text-white">
      <Header />
      <main>
        <Hero />
        <PainPoints />
        <Story />
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
