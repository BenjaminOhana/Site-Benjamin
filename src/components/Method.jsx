import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Compass, Layers, Sparkles } from 'lucide-react';
import methodImage from '../assets/images/methode-coaching-alignement-strategie-business.webp';


gsap.registerPlugin(ScrollTrigger);

const Method = () => {
    const sectionRef = useRef(null);
    const pillarsRef = useRef([]);
    const citationRef = useRef(null);
    const lineRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const isDesktop = window.innerWidth > 768;

            // Citation Animation - Simplified for Mobile Performance
            gsap.from(citationRef.current, {
                scrollTrigger: {
                    trigger: citationRef.current,
                    start: "top 85%",
                },
                y: 30,
                autoAlpha: 0,
                duration: 0.8,
                ease: "power2.out"
            });

            if (isDesktop) {
                // Desktop: Pin section for the image
                ScrollTrigger.create({
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "bottom bottom",
                    pin: ".method-image-container",
                    pinSpacing: false, // We handle spacing via the right column height
                });
            }

            // Mobile: simply animate width or height ensuring no layout thrashing if possible, 
            // but for vertical line in absolute position, scaleY is best.
            // We set transformOrigin to top so it grows downwards.
            gsap.set(lineRef.current, { transformOrigin: "top center" });

            gsap.fromTo(lineRef.current,
                { scaleY: 0 },
                {
                    scaleY: 1,
                    ease: "none",
                    scrollTrigger: {
                        trigger: ".method-pillars-container",
                        start: "top 60%", // Starts slightly earlier
                        end: "bottom 60%", // Finishes earlier (before section leaves)
                        scrub: 1,
                    }
                }
            );

            // Granular Animation for each Pillar - Simplified
            pillarsRef.current.forEach((pillar, index) => {
                // Batch animate content for better performance
                gsap.fromTo(pillar.children,
                    { y: 30, autoAlpha: 0 },
                    {
                        y: 0,
                        autoAlpha: 1,
                        duration: 0.6,
                        stagger: 0.1,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: pillar,
                            start: "top 80%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const pillars = [
        {
            title: "Clarifier",
            subtitle: "Ton positionnement et ce qui te rend unique",
            description: "On trouve ce qui te rend différent — ton histoire, tes valeurs, ta vraie force. Et on travaille ce qui bloque à l'intérieur : l'imposteur, la peur de vendre, le rapport à l'argent.",
            icon: <Compass size={32} strokeWidth={1.2} />
        },
        {
            title: "Créer",
            subtitle: "L'offre qui mérite tes vrais tarifs",
            description: "On construit ton écosystème premium : une offre irrésistible, une image qui te positionne au-dessus, un système qui te libère.",
            icon: <Layers size={32} strokeWidth={1.2} />
        },
        {
            title: "Rayonner",
            subtitle: "Visible. Mémorable. Incontournable.",
            description: "Tu deviens impossible à ignorer — à ta façon. Pas besoin de crier pour être entendu, juste d'être au bon endroit, avec le bon message.",
            icon: <Sparkles size={32} strokeWidth={1.2} />
        }
    ];

    return (
        <section id="method" ref={sectionRef} className="relative bg-[#FAF8F5] overflow-hidden">

            <div className="flex flex-col md:flex-row">

                {/* Left: Image (Sticky on Desktop) */}
                <div className="method-image-container w-full md:w-1/2 h-[70dvh] md:h-screen relative md:sticky md:top-0 overflow-hidden">
                    <div className="absolute inset-0">
                        <img
                            src={methodImage}
                            alt="Benjamin travaillant"
                            className="w-full h-full object-cover object-[center_25%] scale-110 md:scale-100 md:object-center transition-transform duration-700"
                        />
                        {/* RIGHT FADE for Desktop blending */}
                        <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-[#FAF8F5] to-transparent hidden md:block"></div>

                        {/* Overall Overlay - Removed as requested to keep image clear */}
                        {/* <div className="absolute inset-0 bg-black/10"></div> */}

                        {/* Bottom Gradient Transition */}
                        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#FAF8F5] to-transparent"></div>
                    </div>

                    {/* Citation Overlay on Image */}
                    <div className="absolute inset-0 flex items-start justify-center p-8 pt-16 md:items-center md:pt-0">

                        <div ref={citationRef} className="relative z-10 max-w-lg">
                            {/* Localized dark zone behind text - Optimized Blur */}
                            <div className="absolute inset-0 bg-black/50 blur-2xl -z-10 rounded-full scale-125 transform translate-y-2 will-change-transform"></div>

                            <h2 className="text-3xl md:text-5xl font-heading font-bold text-white text-center leading-tight drop-shadow-xl">
                                "Ce qui se voit dehors se construit d'abord dedans."
                            </h2>
                        </div>
                    </div>
                </div>

                {/* Right: Editorial Scroll Content */}
                <div className="w-full md:w-1/2 flex flex-col items-center pt-12 md:pt-20 pb-12 px-6 md:px-12 bg-[#FAF8F5]">

                    <h2 className="text-4xl md:text-6xl font-heading font-bold text-[#3D5245] mb-16 md:mb-24 text-center tracking-tight leading-tight">
                        Ensemble, on va ...
                    </h2>

                    <div className="method-pillars-container w-full max-w-lg flex flex-col items-center relative">

                        {/* Connecting Line Background */}
                        <div className="absolute left-1/2 -translate-x-1/2 top-12 bottom-12 w-px bg-[#E5E0D8]/50"></div>

                        {/* Connecting Line Progress */}
                        <div className="absolute left-1/2 -translate-x-1/2 top-12 bottom-12 w-px bg-transparent">
                            <div ref={lineRef} className="w-full bg-gradient-to-b from-[#6B7F6B] to-[#2F4F2F] h-full origin-top"></div>
                        </div>

                        {pillars.map((pillar, index) => (
                            <div
                                key={index}
                                ref={el => pillarsRef.current[index] = el}
                                className={`flex flex-col items-center text-center w-full relative z-10 bg-[#FAF8F5] ${index !== pillars.length - 1 ? 'mb-32 md:mb-48' : 'mb-0'}`}
                            >
                                {/* Icon with Outline */}
                                <div className="method-icon mb-6 relative">
                                    <div className="w-24 h-24 rounded-full border border-[#B94A2F]/30 flex items-center justify-center bg-[#FAF8F5] shadow-[0_0_20px_rgba(185,74,47,0.1)] z-10 relative">
                                        <div className="text-[#B94A2F] drop-shadow-[0_0_8px_rgba(185,74,47,0.4)]">
                                            {/* Clone element to change size if needed, or just render */}
                                            {React.cloneElement(pillar.icon, { size: 48 })}
                                        </div>
                                    </div>
                                </div>

                                {/* Title */}
                                <h3 className="method-title text-3xl md:text-4xl font-heading font-bold text-[#1D1D1F] mb-3 tracking-tight">
                                    {pillar.title}
                                </h3>

                                {/* Subtitle */}
                                <p className="method-subtitle text-[#B94A2F] font-bold italic text-lg mb-6">
                                    {pillar.subtitle}
                                </p>

                                {/* Description */}
                                <p className="method-desc text-[#52525B] text-base md:text-lg leading-[1.8] max-w-[500px] mx-auto">
                                    {pillar.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Concrètement (Format & Durée) */}
                    <div className="mt-20 md:mt-32 w-full max-w-lg bg-white/50 backdrop-blur-sm rounded-2xl p-8 border border-[#E5E0D8]/50 shadow-sm relative z-10 mx-auto">
                        <h3 className="text-xl font-heading font-bold text-[#3D5245] mb-6 text-center">
                            Concrètement
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-start gap-4">
                                <span className="text-xl">⏳</span>
                                <div>
                                    <p className="font-bold text-[#1D1D1F]">3 mois d'accompagnement</p>
                                    <p className="text-sm text-[#52525B]">Pour transformer ta vision en réalité durable.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <span className="text-xl">💻</span>
                                <div>
                                    <p className="font-bold text-[#1D1D1F]">1 session / semaine</p>
                                    <p className="text-sm text-[#52525B]">En visio, focus sur tes priorités du moment.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <span className="text-xl">💬</span>
                                <div>
                                    <p className="font-bold text-[#1D1D1F]">Suivi WhatsApp 7j/7</p>
                                    <p className="text-sm text-[#52525B]">Je ne te lâche pas entre les séances.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
};

export default Method;
