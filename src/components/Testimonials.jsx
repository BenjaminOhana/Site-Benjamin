import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronRight } from 'lucide-react';
import noemieImg from '../assets/images/testimonials/real_noemie.jpg';
import charlotteImg from '../assets/images/testimonials/real_charlotte.png';
import julienAnaisImg from '../assets/images/testimonials/julien-anais.jpg';

gsap.registerPlugin(ScrollTrigger);

const Testimonials = () => {
    const sectionRef = useRef(null);
    const sliderRef = useRef(null);
    const hintRef = useRef(null);
    const titleRef = useRef(null);
    const containerRef = useRef(null);

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
            quote: "En un seul mot, foncez ! Du marketing sans jamais avoir à vous trahir.",
            image: julienAnaisImg
        }
    ];

    useEffect(() => {
        const mm = gsap.matchMedia();

        mm.add("(min-width: 768px)", () => {
            // DESKTOP: Horizontal Scroll with Pinning
            const totalSlides = testimonials.length;

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

        // Mobile Swipe Hint Animation (Simple bounce)
        mm.add("(max-width: 767px)", () => {
            // Simple fade in for title
            gsap.from(titleRef.current, {
                opacity: 0,
                y: 30,
                duration: 1,
                scrollTrigger: {
                    trigger: titleRef.current,
                    start: "top 80%",
                }
            });

            if (hintRef.current) {
                gsap.fromTo(hintRef.current,
                    { x: 0, opacity: 0.6 },
                    { x: 10, opacity: 1, duration: 1.2, repeat: -1, yoyo: true, ease: "power1.inOut" }
                );
            }
        });

        return () => mm.revert();
    }, [testimonials.length]);

    const handleNextSlide = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({ left: window.innerWidth * 0.85, behavior: 'smooth' });
        }
    };

    return (
        <section ref={sectionRef} className="bg-[#FAF8F5] relative overflow-hidden flex flex-col justify-center py-24 md:py-0 md:h-screen">

            {/* Title */}
            <div
                ref={titleRef}
                className="container mx-auto px-6 mb-20 md:mb-12 md:absolute md:top-20 md:left-0 md:right-0 md:z-10 text-center"
            >
                <h2 className="text-3xl md:text-3xl lg:text-4xl font-heading font-semibold text-anthracite italic leading-tight max-w-lg mx-auto md:max-w-none">
                    "Ils ont choisi de rayonner en restant alignés."
                </h2>
                <div className="w-24 h-1 bg-terracotta rounded-full mx-auto mt-8 md:mt-6"></div>
            </div>

            {/* Slider Container */}
            <div ref={containerRef} className="w-full md:h-full flex items-center relative z-10">
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
                                    className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover object-center mb-6 md:mb-10 border border-[#E5E0D8]"
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

            {/* Mobile Swipe Hint (Right Arrow) - Clickable */}
            <div
                ref={hintRef}
                onClick={handleNextSlide}
                className="group absolute right-4 top-[60%] md:top-1/2 -translate-y-1/2 md:hidden z-20 cursor-pointer p-2 bg-white/30 backdrop-blur-md rounded-full border border-white/40 shadow-sm active:scale-95 transition-all"
            >
                <ChevronRight size={32} className="text-[#B94A2F]" />
            </div>

            {/* Pagination/Instructions (Optional polish) */}
            <div className="absolute bottom-10 left-0 right-0 text-center hidden md:block opacity-40">
                <p className="text-sm font-medium tracking-widest uppercase">Découvrir les avis (Scroll)</p>
            </div>
        </section>
    );
};

export default Testimonials;
