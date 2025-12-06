import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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

            // Cards Stagger Animation
            gsap.from(cardsRef.current, {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: "power2.out"
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const testimonials = [
        {
            name: "Noémie",
            job: "Acupunctrice",
            quote: "Un vrai game changer ! Ma patientèle a doublé en 2 mois.",
            initials: "N"
        },
        {
            name: "Charlotte",
            job: "Art Thérapeute et Coach holistique",
            quote: "Une structure claire et rassurante qui me permet d'avancer 100% sereine !",
            initials: "C"
        },
        {
            name: "Julien & Anaïs",
            job: "Tambours Chamaniques Amaneï",
            quote: "Foncez ! Du marketing sans jamais avoir à vous trahir.",
            initials: "J&A"
        }
    ];

    return (
        <section className="py-20 md:py-32 bg-cream">
            <div className="container mx-auto px-6">

                {/* Title */}
                <h2
                    ref={titleRef}
                    className="text-3xl md:text-4xl font-heading font-bold text-anthracite text-center mb-16"
                >
                    Ils ont sauté le pas.
                </h2>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((t, index) => (
                        <div
                            key={index}
                            ref={el => cardsRef.current[index] = el}
                            className="bg-cream-dark p-8 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center text-center"
                        >
                            {/* Avatar Placeholder */}
                            <div className="w-16 h-16 bg-sage/20 rounded-full flex items-center justify-center text-sage font-bold text-xl mb-6">
                                {t.initials}
                            </div>

                            <p className="text-lg text-anthracite italic mb-6 leading-relaxed">
                                « {t.quote} »
                            </p>

                            <div>
                                <p className="font-bold text-anthracite">{t.name}</p>
                                <p className="text-sm text-zinc-600">{t.job}</p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Testimonials;
