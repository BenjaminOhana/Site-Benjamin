import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import noemieImg from '../assets/images/testimonials/real_noemie.jpg';
import charlotteImg from '../assets/images/testimonials/real_charlotte.png';
import julienAnaisImg from '../assets/images/testimonials/julien-anais.jpg';

gsap.registerPlugin(ScrollTrigger);

const Testimonials = () => {
    const sectionRef = useRef(null);
    const containerRef = useRef(null);
    const cardsRef = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const cards = cardsRef.current;

            // Initial state: Hide cards 2 and 3
            gsap.set([cards[1], cards[2]], {
                yPercent: 100,
                opacity: 0
            });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=300%", // Scroll distance to complete animation
                    pin: true,
                    scrub: 1,
                    // markers: true // Debugging
                }
            });

            // Card 2 enters
            tl.to(cards[1], {
                yPercent: 0,
                opacity: 1,
                duration: 1,
                ease: "power2.out"
            })
                // Card 1 fades/scales slightly (optional, adds depth)
                .to(cards[0], {
                    scale: 0.95,
                    opacity: 0.5,
                    duration: 1
                }, "<") // Run at same time as Card 2 enters

                // Card 3 enters
                .to(cards[2], {
                    yPercent: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power2.out"
                })
                // Card 2 fades/scales
                .to(cards[1], {
                    scale: 0.95,
                    opacity: 0.5,
                    duration: 1
                }, "<"); // Run at same time as Card 3 enters

        }, sectionRef);

        return () => ctx.revert();
    }, []);

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

    return (
        <section ref={sectionRef} className="bg-[#FAF8F5] relative h-screen flex flex-col justify-center overflow-hidden">
            <div className="container mx-auto px-6 h-full flex flex-col items-center justify-center">

                {/* Transition Phrase (Fixed at top of section context) */}
                <div className="absolute top-24 md:top-32 w-full max-w-4xl z-10 flex flex-col items-center px-4 text-center">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-semibold text-anthracite italic mb-6 leading-tight">
                        "Ils ont choisi de rayonner en restant alignés."
                    </h2>
                    <div className="w-24 h-1 bg-terracotta rounded-full"></div>
                </div>

                {/* Stacking Cards Container */}
                <div className="relative w-full max-w-md md:max-w-2xl h-[400px] md:h-[500px] flex items-center justify-center mt-20 md:mt-0">
                    {testimonials.map((t, index) => (
                        <div
                            key={index}
                            ref={el => cardsRef.current[index] = el}
                            className="absolute top-0 left-0 w-full h-full bg-[#FAF8F5] flex flex-col items-center justify-center text-center px-4"
                            style={{ zIndex: index + 1 }} // Ensure stacking order
                        >
                            {/* Avatar */}
                            <img
                                src={t.image}
                                alt={t.name}
                                className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover object-center mb-8 border border-[#E5E0D8] shadow-sm"
                            />

                            {/* Quote */}
                            <p className="text-xl md:text-3xl text-[#1D1D1F] italic mb-8 leading-relaxed font-heading max-w-lg">
                                « {t.quote} »
                            </p>

                            {/* Name & Job */}
                            <div>
                                <p className="font-bold text-[#1D1D1F] text-lg md:text-xl mb-2">{t.name}</p>
                                <p className="text-xs md:text-sm text-[#52525B] uppercase tracking-widest">{t.job}</p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Testimonials;
