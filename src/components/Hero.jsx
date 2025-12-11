import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import heroImage from '../assets/images/benjamin-coach-entrepreneur-vision-clarte.webp';
import heroMobileImage from '../assets/images/benjamin-coach-entrepreneur-portrait-mobile.webp';
// Client Avatars
import clientSophie from '../assets/images/clients/sophie-therapeute-holistique.webp';
import clientClaire from '../assets/images/clients/claire-coach-intuitive.webp';
import clientThomas from '../assets/images/clients/thomas-consultant-business.webp';
import clientElodie from '../assets/images/clients/elodie-naturopathe.webp';
import clientSarah from '../assets/images/clients/sarah-professeur-yoga.webp';

import { PopupModal } from 'react-calendly';

const Hero = () => {
    const h1Ref = useRef(null);
    const h2Ref = useRef(null);
    const ctaRef = useRef(null);
    const [isCalendlyOpen, setIsCalendlyOpen] = React.useState(false);
    const [heroHeight, setHeroHeight] = React.useState('100vh');
    const lastWidth = useRef(typeof window !== 'undefined' ? window.innerWidth : 0);

    const mobileImageRef = useRef(null);

    const clients = [
        { img: clientSophie, name: "Sophie", job: "Thérapeute Holistique" },
        { img: clientThomas, name: "Thomas", job: "Consultant Business" },
        { img: clientClaire, name: "Claire", job: "Coach Intuitive" },
        { img: clientElodie, name: "Élodie", job: "Naturopathe" },
        { img: clientSarah, name: "Sarah", job: "Prof de Yoga" },
    ];

    useEffect(() => {
        const handleResize = () => {
            const currentWidth = window.innerWidth;
            // Only update if width changes (orientation change or desktop resize)
            // This prevents mobile address bar scroll from triggering a height update/jump
            if (currentWidth !== lastWidth.current) {
                lastWidth.current = currentWidth;
                setHeroHeight(`${window.innerHeight}px`);
            }
        };

        // Initial set to lock correctly on load
        setHeroHeight(`${window.innerHeight}px`);
        lastWidth.current = window.innerWidth;

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

            // Text Animations
            tl.fromTo(h1Ref.current,
                { autoAlpha: 0, y: 20 },
                { autoAlpha: 1, y: 0, duration: 0.8, delay: 0.2 }
            )
                .fromTo(h2Ref.current,
                    { autoAlpha: 0, y: 20 },
                    { autoAlpha: 1, y: 0, duration: 0.8 },
                    "-=0.5"
                )
                .fromTo(ctaRef.current,
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.8 },
                    "-=0.5"
                );

            // Mobile Pan Animation - REMOVED as per user request for static image

        });
        return () => ctx.revert();
    }, []);

    return (
        <section
            className="relative flex items-center justify-center overflow-hidden w-full"
            style={{ minHeight: heroHeight }}
        >

            {/* Background Image with Gradient Overlay */}
            {/* Background Image with Gradient Overlay */}
            {/* Background Image with Gradient Overlay */}
            {/* Background Image with Gradient Overlay */}
            {/* Background Image - Absolute (Standard Scroll) */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <picture>
                    <source media="(max-width: 767px)" srcSet={heroMobileImage} />
                    <source media="(min-width: 768px)" srcSet={heroImage} />
                    <img
                        ref={mobileImageRef}
                        src={heroImage}
                        alt="Benjamin en discussion"
                        className="w-full h-full object-cover object-top md:object-center"
                        fetchPriority="high"
                        width="1920"
                        height="1080"
                    />
                </picture>

                {/* Lighter overlay on mobile */}
                <div className="absolute inset-0 bg-black/20 md:bg-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent md:from-black/60 md:via-black/20"></div>
            </div>

            {/* Bottom Gradient Transition to Next Section */}
            <div className="absolute bottom-0 left-0 right-0 h-48 md:h-64 bg-gradient-to-t from-[#FAF8F5] via-[#FAF8F5]/60 to-transparent z-0 pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10 pt-20 pb-24 md:pb-20">
                <div className="max-w-4xl mx-auto text-center flex flex-col items-center">

                    {/* Text Content */}
                    <h1
                        ref={h1Ref}
                        className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-white leading-tight mb-8 drop-shadow-lg tracking-[-0.02em] will-change-transform"
                    >
                        Transforme ta sensibilité en ta plus grande force
                    </h1>

                    <h2
                        ref={h2Ref}
                        className="text-lg md:text-2xl text-white/90 font-medium mb-12 max-w-2xl leading-relaxed opacity-0 drop-shadow-md"
                    >
                        Coaching stratégique pour créatifs, praticiens et coachs qui veulent vivre de leur passion — sans vendre leur âme
                    </h2>

                    <div ref={ctaRef} className="flex flex-col items-center gap-8 opacity-0">
                        <button
                            id="hero-cta"
                            onClick={() => setIsCalendlyOpen(true)}
                            className="bg-sienna hover:bg-sienna-hover text-white px-10 py-3 md:py-5 rounded-full text-lg md:text-xl font-bold transition-all transform hover:-translate-y-1 shadow-lg hover:shadow-2xl border border-white/10 backdrop-blur-sm"
                        >
                            En discuter ensemble
                        </button>
                        <span className="hidden md:block text-sm md:text-base text-white/80 italic">
                            30 min offertes, pour toi et ta vision.
                        </span>

                        {/* Trust Bar */}
                        <div className="flex flex-col items-center gap-3 mt-6 md:mt-8 md:flex-row md:bg-black/20 md:backdrop-blur-sm md:border md:border-white/10 md:rounded-full md:px-8 md:py-3 md:transition-all md:hover:bg-black/30">
                            <div className="flex items-center gap-4">
                                {/* Avatar Stack */}
                                <div className="flex -space-x-4">
                                    {clients.map((client, i) => (
                                        <div key={i} className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-[#A85D42] bg-gray-200 overflow-hidden relative shadow-md transition-transform hover:scale-110 z-0 hover:z-10">
                                            <img
                                                src={client.img}
                                                alt={`${client.name}, ${client.job} accompagné(e)`}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    ))}
                                </div>
                                <div className="text-left">
                                    <div className="flex items-center gap-1">
                                        <div className="flex text-yellow-400">
                                            {[1, 2, 3, 4, 5].map((s) => (
                                                <svg key={s} className="w-3 h-3 md:w-4 md:h-4 fill-current" viewBox="0 0 20 20">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-white font-medium text-sm md:text-base leading-tight">
                                        +30 entrepreneurs <span className="text-white/80 font-normal">déjà alignés</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center animate-bounce z-20 pointer-events-none">
                <svg
                    className="w-6 h-6 text-white/80"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                </svg>
            </div>

            <PopupModal
                url="https://calendly.com/benjamin-entrepreneuraligne/30min?month=2025-12"
                rootElement={document.getElementById("root")}
                text="Réserver mon appel clarté"
                textColor="#ffffff"
                color="#A85D42"
                open={isCalendlyOpen}
                onModalClose={() => setIsCalendlyOpen(false)}
            />
        </section >
    );
};

export default Hero;
