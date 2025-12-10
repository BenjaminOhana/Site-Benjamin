import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import heroImage from '../assets/images/benjamin-coach-entrepreneur-vision-clarte.webp';
import heroMobileImage from '../assets/images/benjamin-coach-entrepreneur-portrait-mobile.webp';
import { PopupModal } from 'react-calendly';

const Hero = () => {
    const h1Ref = useRef(null);
    const h2Ref = useRef(null);
    const ctaRef = useRef(null);
    const [isCalendlyOpen, setIsCalendlyOpen] = React.useState(false);

    const mobileImageRef = useRef(null);

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
        <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">

            {/* Background Image with Gradient Overlay */}
            {/* Background Image with Gradient Overlay */}
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

                {/* Bottom Gradient Transition to Next Section */}
                <div className="absolute bottom-0 left-0 right-0 h-48 md:h-64 bg-gradient-to-t from-[#FAF8F5] via-[#FAF8F5]/60 to-transparent z-20 pointer-events-none"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10 pt-20">
                <div className="max-w-4xl mx-auto text-center flex flex-col items-center">

                    {/* Text Content */}
                    <h1
                        ref={h1Ref}
                        className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-white leading-tight mb-8 drop-shadow-lg tracking-[-0.02em] will-change-transform"
                    >
                        Tu n'as pas besoin de crier pour être entendu
                    </h1>

                    <h2
                        ref={h2Ref}
                        className="text-lg md:text-2xl text-white/90 font-medium mb-12 max-w-2xl leading-relaxed opacity-0 drop-shadow-md"
                    >
                        Accompagnement sur-mesure pour les créatifs, praticiens et coachs qui veulent réussir — sans vendre leur âme.
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
                    </div>

                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-0 right-0 flex justify-center animate-bounce z-20 pointer-events-none">
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
