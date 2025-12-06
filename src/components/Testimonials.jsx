import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import noemieImg from '../assets/images/testimonials/real_noemie.jpg';
import charlotteImg from '../assets/images/testimonials/real_charlotte.png';
import julienAnaisImg from '../assets/images/testimonials/julien-anais.jpg';

gsap.registerPlugin(ScrollTrigger);

const Testimonials = () => {
    const sectionRef = useRef(null);
    const sliderRef = useRef(null);

    const testimonials = [
        {
            name: "Noémie",
            job: "Acupunctrice",
            quote: "Un vrai game changer ! Ma patientèle a doublé en 2 mois.",
            image: noemieImg
        },
        {
            name: "Charlotte",
            job: "Art Thérapeute et Coach holistique",
            quote: "Mon intuition m'a dit de lui faire confiance. Elle avait raison.",
            image: charlotteImg
        },
        {
            name: "Julien & Anaïs",
            job: "Créateurs de Tambours Chamaniques",
            quote: "Benjamin a été un pilier pour construire notre formation en ligne de A à Z.",
            image: julienAnaisImg
        }
    ];

    useEffect(() => {
        const mm = gsap.matchMedia();

        mm.add("(min-width: 768px)", () => {
            // DESKTOP: Horizontal Scroll with Pinning
            const totalSlides = testimonials.length;

            // Calculate movement: -(100 - (100/totalSlides))% ??
            // If container is 300% width, we want to move it so the 3rd section is visible.
            // Move to -200% (relative to single screen)? No, xPercent is relative to the element.
            // If element is 300vw wide. To show the 3rd 100vw chunk, we move -66.666%.

            gsap.to(sliderRef.current, {
                xPercent: -100 * ((totalSlides - 1) / totalSlides),
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    pin: true,
                    scrub: 1, // Smooth interaction
                    snap: 1 / (totalSlides - 1), // Snap to slides
                    end: "+=3000", // Length of the scroll duration
                }
            });
        });

        return () => mm.revert();
    }, [testimonials.length]);

    return (
        <section ref={sectionRef} className="bg-[#FAF8F5] relative overflow-hidden flex flex-col justify-center py-20 md:py-0 md:h-screen">

            {/* Title / Transition */}
            <div className="container mx-auto px-6 mb-12 md:absolute md:top-20 md:left-0 md:right-0 md:z-10 text-center">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-semibold text-anthracite italic leading-tight">
                    "Ils ont choisi de rayonner en restant alignés."
                </h2>
                <div className="w-24 h-1 bg-terracotta rounded-full mx-auto mt-6"></div>
            </div>

            {/* Slider Container */}
            {/* Mobile: Native Horizontal Scroll | Desktop: Wide container for GSAP */}
            <div className="w-full md:h-full flex items-center">
                <div
                    ref={sliderRef}
                    className="flex w-full overflow-x-auto snap-x snap-mandatory gap-6 px-6 md:px-0 md:gap-0 md:w-[300%] md:h-full md:overflow-visible scrollbar-hide"
                >
                    {testimonials.map((t, index) => (
                        <div
                            key={index}
                            className="flex-shrink-0 w-[85vw] md:w-full h-full snap-center flex items-center justify-center p-4 md:p-0"
                        >
                            <div className="bg-white/50 md:bg-transparent backdrop-blur-sm md:backdrop-filter-none rounded-2xl p-8 md:p-0 shadow-sm md:shadow-none max-w-sm md:max-w-4xl mx-auto flex flex-col items-center text-center">
                                {/* Avatar */}
                                <img
                                    src={t.image}
                                    alt={t.name}
                                    className="w-20 h-20 md:w-32 md:h-32 rounded-full object-cover object-center mb-6 md:mb-10 border border-[#E5E0D8]"
                                />

                                {/* Quote */}
                                <p className="text-xl md:text-4xl text-[#1D1D1F] italic mb-6 md:mb-10 leading-relaxed font-heading">
                                    « {t.quote} »
                                </p>

                                {/* Name & Job */}
                                <div>
                                    <p className="font-bold text-[#1D1D1F] text-lg md:text-2xl mb-1">{t.name}</p>
                                    <p className="text-xs md:text-base text-[#52525B] uppercase tracking-widest">{t.job}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Pagination/Instructions (Optional polish) */}
            <div className="absolute bottom-10 left-0 right-0 text-center hidden md:block opacity-40">
                <p className="text-sm font-medium tracking-widest uppercase">Découvrir les avis</p>
                {/* Could add a simple scroll down arrow here */}
            </div>
        </section>
    );
};

export default Testimonials;
