import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Compass, Layers, Sparkles } from 'lucide-react';
import methodImage from '../assets/images/method-new.jpg';

gsap.registerPlugin(ScrollTrigger);

const Method = () => {
    const sectionRef = useRef(null);
    const pillarsRef = useRef([]);
    const citationRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const isDesktop = window.innerWidth > 768;

            // Citation Animation
            gsap.from(citationRef.current, {
                scrollTrigger: {
                    trigger: citationRef.current,
                    start: "top 85%",
                },
                y: 30,
                opacity: 0,
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

            // Granular Animation for each Pillar
            pillarsRef.current.forEach((pillar, index) => {
                const q = gsap.utils.selector(pillar);
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: pillar,
                        start: "top 75%", // Start animation when pillar is well into view
                        toggleActions: "play none none reverse"
                    }
                });

                // Sequence: Icon -> Number -> Title -> Subtitle -> Description
                tl.from(q(".method-icon"), { y: 30, opacity: 0, duration: 0.5, ease: "power2.out" })
                    .from(q(".method-number"), { y: 30, opacity: 0, duration: 0.5, ease: "power2.out" }, "-=0.4")
                    .from(q(".method-title"), { y: 30, opacity: 0, duration: 0.5, ease: "power2.out" }, "-=0.3")
                    .from(q(".method-subtitle"), { y: 30, opacity: 0, duration: 0.5, ease: "power2.out" }, "-=0.3")
                    .from(q(".method-desc"), { y: 30, opacity: 0, duration: 0.5, ease: "power2.out" }, "-=0.3");
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const pillars = [
        {
            number: "01",
            title: "Clarifier",
            subtitle: "Ton positionnement et ce qui te rend unique",
            description: "On trouve ce qui te rend différent — ton histoire, tes valeurs, ta vraie force. Et on travaille ce qui bloque à l'intérieur : l'imposteur, la peur de vendre, le rapport à l'argent.",
            icon: <Compass size={32} strokeWidth={1.2} />
        },
        {
            number: "02",
            title: "Créer",
            subtitle: "L'offre qui justifie tes vrais tarifs",
            description: "On construit ton écosystème premium : une offre irrésistible, une image qui te positionne au-dessus, un système qui tient.",
            icon: <Layers size={32} strokeWidth={1.2} />
        },
        {
            number: "03",
            title: "Rayonner",
            subtitle: "Visible. Mémorable. Incontournable.",
            description: "On te rend impossible à ignorer — à ta façon. Pas besoin de crier, juste d'être au bon endroit, avec le bon message.",
            icon: <Sparkles size={32} strokeWidth={1.2} />
        }
    ];

    return (
        <section id="method" ref={sectionRef} className="relative bg-[#FAF8F5] overflow-hidden">

            <div className="flex flex-col md:flex-row">

                {/* Left: Image (Sticky on Desktop) */}
                <div className="method-image-container w-full md:w-1/2 h-[70vh] md:h-screen relative md:sticky md:top-0 overflow-hidden">
                    <div className="absolute inset-0">
                        <img
                            src={methodImage}
                            alt="Benjamin travaillant"
                            className="w-full h-full object-cover object-[center_25%] scale-110 md:scale-100 md:object-center transition-transform duration-700"
                        />
                        {/* Overall Overlay - Removed as requested to keep image clear */}
                        {/* <div className="absolute inset-0 bg-black/10"></div> */}

                        {/* Bottom Gradient Transition */}
                        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#FAF8F5] to-transparent"></div>
                    </div>

                    {/* Citation Overlay on Image */}
                    <div className="absolute inset-0 flex items-start justify-center p-8 pt-16 md:items-center md:pt-0">

                        <div ref={citationRef} className="relative z-10 max-w-lg">
                            {/* Localized dark zone behind text */}
                            <div className="absolute inset-0 bg-black/60 blur-3xl -z-10 rounded-full scale-150 transform translate-y-2"></div>

                            <h2 className="text-3xl md:text-5xl font-heading font-bold text-white text-center leading-tight drop-shadow-xl">
                                "Ce qui se voit dehors se construit d'abord dedans."
                            </h2>
                        </div>
                    </div>
                </div>

                {/* Right: Editorial Scroll Content */}
                <div className="w-full md:w-1/2 flex flex-col items-center pt-20 pb-32 px-6 md:px-12 bg-[#FAF8F5]">

                    <div className="w-full max-w-lg flex flex-col items-center">
                        {pillars.map((pillar, index) => (
                            <div
                                key={index}
                                ref={el => pillarsRef.current[index] = el}
                                className={`flex flex-col items-center text-center w-full ${index !== pillars.length - 1 ? 'mb-32 md:mb-48' : 'mb-0'}`}
                            >
                                {/* Icon with Outline */}
                                <div className="method-icon mb-6 relative">
                                    <div className="w-24 h-24 rounded-full border border-[#B94A2F]/30 flex items-center justify-center bg-white/50 backdrop-blur-sm shadow-[0_0_20px_rgba(185,74,47,0.1)]">
                                        <div className="text-[#B94A2F] drop-shadow-[0_0_8px_rgba(185,74,47,0.4)]">
                                            {/* Clone element to change size if needed, or just render */}
                                            {React.cloneElement(pillar.icon, { size: 48 })}
                                        </div>
                                    </div>
                                </div>

                                {/* Number */}
                                <span className="method-number text-[#6B7F6B] font-bold text-sm tracking-widest uppercase mb-4">
                                    {pillar.number}
                                </span>

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

                </div>

            </div>
        </section>
    );
};

export default Method;
