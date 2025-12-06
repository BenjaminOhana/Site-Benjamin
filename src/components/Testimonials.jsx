import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import noemieImg from '../assets/images/testimonials/real_noemie.jpg';
import charlotteImg from '../assets/images/testimonials/real_charlotte.png';
import julienAnaisImg from '../assets/images/testimonials/julien-anais.jpg';

gsap.registerPlugin(ScrollTrigger);

const Testimonials = () => {
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const cardsRef = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Title Animation
            gsap.from(titleRef.current, {
                scrollTrigger: {
                    trigger: titleRef.current,
                    start: "top 85%",
                },
                y: 30,
                opacity: 0,
                duration: 0.8,
                ease: "power2.out"
            });

            // Individual Card Animation (Simple Fade-in)
            cardsRef.current.forEach((card) => {
                gsap.from(card, {
                    scrollTrigger: {
                        trigger: card,
                        start: "top 85%", // Trigger when top of card hits 85% of viewport
                    },
                    y: 30,
                    opacity: 0,
                    duration: 0.4,
                    ease: "power1.out"
                });
            });
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
        <section className="py-20 md:py-32 bg-[#FAF8F5] overflow-hidden">
            <div className="container mx-auto px-6">

                {/* Transition Phrase */}
                <h2
                    ref={titleRef}
                    className="text-2xl font-heading text-[#1D1D1F] italic text-center mb-32 px-4"
                >
                    "Ils ont choisi de rayonner en restant alignés."
                </h2>

                {/* Testimonials List (Vertical Stack) */}
                <div className="flex flex-col items-center w-full">
                    {testimonials.map((t, index) => (
                        <div
                            key={index}
                            ref={el => cardsRef.current[index] = el}
                            className="flex flex-col items-center text-center w-full max-w-2xl mx-auto mb-32 last:mb-0"
                        >
                            {/* Avatar */}
                            <img
                                src={t.image}
                                alt={t.name}
                                className="w-20 h-20 rounded-full object-cover object-center mb-8 border border-[#E5E0D8]"
                            />

                            {/* Quote */}
                            <p className="text-xl md:text-2xl text-[#1D1D1F] italic mb-6 leading-relaxed font-heading">
                                « {t.quote} »
                            </p>

                            {/* Name & Job */}
                            <div>
                                <p className="font-bold text-[#1D1D1F] text-lg mb-1">{t.name}</p>
                                <p className="text-sm text-[#52525B] uppercase tracking-wide">{t.job}</p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Testimonials;
