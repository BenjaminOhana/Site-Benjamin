import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import noemieImg from '../assets/images/testimonials/noemie.png';
import charlotteImg from '../assets/images/testimonials/charlotte.jpg';
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
        <section className="py-20 md:py-32 bg-[#F3EDE7] overflow-hidden">
            <div className="container mx-auto px-6">

                {/* Transition Phrase */}
                <h2
                    ref={titleRef}
                    className="text-2xl font-heading text-[#1D1D1F] italic text-center mb-16 md:mb-20 px-4"
                >
                    "Ils ont choisi de rayonner en restant alignés."
                </h2>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-8">
                    {testimonials.map((t, index) => (
                        <div
                            key={index}
                            ref={el => cardsRef.current[index] = el}
                            className="bg-white p-8 rounded-[12px] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center text-center w-full max-w-sm mx-auto md:max-w-none"
                        >
                            {/* Avatar */}
                            <img
                                src={t.image}
                                alt={t.name}
                                className="w-[60px] h-[60px] rounded-full object-cover object-center mb-6 border border-[#E5E0D8]"
                            />

                            <p className="text-lg text-anthracite italic mb-6 leading-relaxed">
                                « {t.quote} »
                            </p>

                            <div>
                                <p className="font-bold text-anthracite">{t.name}</p>
                                <p className="text-sm text-[#52525B]">{t.job}</p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Testimonials;
