import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, Lightbulb, Coins, LayoutGrid } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const PainPoints = () => {
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const pointsRef = useRef([]);
    const transitionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Title Animation
            gsap.from(titleRef.current, {
                scrollTrigger: {
                    trigger: titleRef.current,
                    start: "top 80%",
                },
                y: 30,
                opacity: 0,
                duration: 0.8,
                ease: "power2.out"
            });

            // Points Animation
            gsap.from(pointsRef.current, {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                },
                y: 30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power2.out"
            });

            // Check for reduced motion preference
            const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            if (prefersReducedMotion) {
                gsap.globalTimeline.timeScale(100);
            }

            // Transition Phrase Animation
            gsap.from(transitionRef.current, {
                scrollTrigger: {
                    trigger: transitionRef.current,
                    start: "top 85%",
                },
                y: 30,
                opacity: 0,
                duration: 0.5,
                delay: 0.4,
                ease: "power2.out"
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const points = [
        {
            text: "Les clients ne viennent pas — malgré tes efforts, tes posts, ton site",
            icon: <Users size={64} strokeWidth={1.5} />
        },
        {
            text: "Tu as 1000 idées — mais tu ne sais plus par où commencer",
            icon: <Lightbulb size={64} strokeWidth={1.5} />
        },
        {
            text: "Tu n'oses pas facturer à ta juste valeur — et tu te demandes si tu le mérites vraiment",
            icon: <Coins size={64} strokeWidth={1.5} />
        },
        {
            text: "Tu cherches un cadre — mais pas une cage",
            icon: <LayoutGrid size={64} strokeWidth={1.5} />
        }
    ];

    return (
        <section id="pain-points" ref={sectionRef} className="py-20 md:py-24 bg-cream relative z-10">
            <div className="container mx-auto px-6">

                {/* Title */}
                <h2
                    ref={titleRef}
                    className="text-3xl md:text-3xl lg:text-4xl font-heading font-bold text-anthracite text-center mb-16 md:mb-20 max-w-3xl mx-auto leading-tight"
                >
                    Tu es doué. Tu le sais. Alors pourquoi ça coince ?
                </h2>

                {/* Grid Layout for Desktop, Stacked for Mobile */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-16 lg:gap-y-20 max-w-5xl mx-auto mb-16 md:mb-20">
                    {points.map((point, index) => (
                        <div
                            key={index}
                            ref={el => pointsRef.current[index] = el}
                            className="flex flex-col items-center text-center w-full"
                        >
                            {/* Icon with Glow */}
                            <div className="point-icon text-[#B94A2F] mb-6 drop-shadow-[0_0_8px_rgba(185,74,47,0.25)] feature-icon-hover transition-transform duration-300 hover:scale-110">
                                {point.icon}
                            </div>

                            {/* Text */}
                            <p className="point-text text-xl md:text-2xl text-anthracite font-medium leading-relaxed max-w-md">
                                {point.text}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Transition Phrase */}
                <div ref={transitionRef} className="text-center max-w-4xl mx-auto pt-12 md:pt-24 lg:pt-48 lg:pb-12">
                    <p className="text-2xl md:text-3xl lg:text-4xl font-heading font-semibold text-anthracite italic mb-6">
                        "Ton énergie est là. Il te manque juste la clarté pour la canaliser."
                    </p>
                    <div className="w-24 h-1 bg-terracotta mx-auto rounded-full"></div>
                </div>

            </div>
        </section>
    );
};

export default PainPoints;
