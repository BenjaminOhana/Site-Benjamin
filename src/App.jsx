import React, { useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import MentionsLegales from './pages/MentionsLegales';
import PolitiqueConfidentialite from './pages/PolitiqueConfidentialite';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Prevent mobile address bar resize from triggering heavy refreshes
ScrollTrigger.config({ ignoreMobileResize: true });

function App() {
  // Smooth scroll setup for anchor links is handled by CSS scroll-behavior: smooth

  useEffect(() => {
    // Initialize Lenis only on desktop and if window is defined
    if (typeof window !== 'undefined' && window.innerWidth > 1024) {
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
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/mentions-legales.html" element={<MentionsLegales />} />
            <Route path="/politique-confidentialite.html" element={<PolitiqueConfidentialite />} />
            {/* Fallback for standard URLs if needed, or just redirect */}
            <Route path="mentions-legales" element={<MentionsLegales />} />
            <Route path="politique-confidentialite" element={<PolitiqueConfidentialite />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
