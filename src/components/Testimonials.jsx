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
            image: "https://ui-avatars.com/api/?name=Noemie&background=C4775C&color=fff&size=128"
        },
        {
            name: "Charlotte",
            job: "Art Thérapeute et Coach holistique",
            quote: "Mon intuition m'a dit de lui faire confiance. Elle avait raison.",
            image: "https://ui-avatars.com/api/?name=Charlotte&background=6B7F6B&color=fff&size=128"
        },
        {
            name: "Julien & Anaïs",
            job: "Créateurs de Tambours Chamaniques",
            quote: "Benjamin a été un pilier pour construire notre formation en ligne de A à Z.",
            image: "https://ui-avatars.com/api/?name=Julien+Anais&background=1D1D1F&color=fff&size=128"
        }
    ];

    return (
        <section className="py-20 md:py-32 bg-[#F3EDE7]">
            <div className="container mx-auto px-6">

                {/* Transition Phrase */}
                <h2
                    ref={titleRef}
                    className="text-2xl font-heading text-[#1D1D1F] italic text-center mb-20"
                >
                    "Ils ont choisi de rayonner en restant alignés."
                </h2>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((t, index) => (
                        <div
                            key={index}
                            ref={el => cardsRef.current[index] = el}
                            className="bg-white p-8 rounded-[12px] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center text-center"
                        >
                            {/* Avatar */}
                            <img
                                src={t.image}
                                alt={t.name}
                                className="w-[60px] h-[60px] rounded-full object-cover mb-6"
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
