import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import storyImage from '../assets/images/story.jpg';

gsap.registerPlugin(ScrollTrigger);

const Story = () => {
    const sectionRef = useRef(null);
    const imageRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Image Parallax (Desktop only)
            if (window.innerWidth > 768) {
                gsap.to(imageRef.current, {
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 1,
                    },
                    y: 50,
                    ease: "none"
                });
            }

            // Text Stagger Animation
            const paragraphs = textRef.current.querySelectorAll('p');
            gsap.from(paragraphs, {
                scrollTrigger: {
                    trigger: textRef.current,
                    start: "top 75%",
                },
                y: 30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "power2.out"
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="story" ref={sectionRef} className="py-20 md:py-32 bg-cream overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">

                    {/* Image */}
                    <div className="w-full md:w-2/5 relative">
                        <div ref={imageRef} className="relative rounded-2xl overflow-hidden shadow-[0_12px_40px_rgba(185,74,47,0.10)] border border-[#E5E0D8] aspect-[3/4]">
                            <img
                                src={storyImage}
                                alt="Benjamin portrait"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    {/* Text Content */}
                    <div ref={textRef} className="w-full md:w-3/5 flex flex-col space-y-8 md:space-y-12 pl-0 md:pl-12">
                        <p className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-anthracite leading-tight">
                            "Ce n'est pas la structure qui m'a sauvé — c'est l'alignement.
                        </p>

                        <p className="text-lg md:text-xl text-zinc-600 leading-relaxed">
                            Après 9 ans en Gendarmerie et un burn-out, j'ai appris à mettre ma rigueur au service de moi-même et de ma liberté, pas du système.
                        </p>

                        <p className="text-lg md:text-xl text-zinc-600 leading-relaxed">
                            Aujourd'hui, c'est ce que je t'aide à faire : donner vie à ce qui vit en toi."
                        </p>

                        <p className="text-xl font-heading font-bold text-sienna pt-4">
                            — Benjamin
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Story;
