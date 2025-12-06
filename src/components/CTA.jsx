import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PopupModal } from 'react-calendly';
import ctaBg from '../assets/images/cta-bg.jpg';

gsap.registerPlugin(ScrollTrigger);

const CTA = () => {
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const introRef = useRef(null);
    const bulletsRef = useRef(null);
    const ctaContainerRef = useRef(null);
    const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                }
            });

            // Title Fade-in
            tl.from(titleRef.current, {
                opacity: 0,
                y: 20,
                duration: 0.8,
                ease: "power2.out"
            })
                // Intro Fade-in
                .from(introRef.current, {
                    opacity: 0,
                    y: 10,
                    duration: 0.5,
                    ease: "power2.out"
                }, "-=0.4")
                // Bullets Stagger
                .from(bulletsRef.current.children, {
                    opacity: 0,
                    x: -10,
                    duration: 0.5,
                    stagger: 0.1,
                    ease: "power2.out"
                }, "-=0.2")
                // CTA Lift
                .from(ctaContainerRef.current, {
                    opacity: 0,
                    y: 20,
                    duration: 0.6,
                    ease: "power2.out"
                }, "-=0.2");

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative min-h-[80vh] flex items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: `url(${ctaBg})` }}
        >
            {/* Heavy Overlay */}
            <div className="absolute inset-0 bg-[#FAF8F5]/85"></div>

            <div className="relative z-10 container mx-auto px-6 text-center max-w-2xl">

                {/* Accroche */}
                <h2
                    ref={titleRef}
                    className="text-4xl md:text-5xl font-bold text-[#1D1D1F] tracking-tight mb-8"
                    style={{ letterSpacing: '-0.02em' }}
                >
                    Parlons de toi.
                </h2>

                {/* Intro */}
                <p
                    ref={introRef}
                    className="text-lg text-[#52525B] italic mb-8"
                >
                    Je t'offre 30 minutes. On regarde ensemble :
                </p>

                {/* Bullets */}
                <ul
                    ref={bulletsRef}
                    className="text-base text-[#52525B] text-left mx-auto max-w-sm space-y-3 mb-12 list-disc pl-5 marker:text-[#B94A2F]"
                >
                    <li>Où tu en es vraiment</li>
                    <li>Ce qui coince</li>
                    <li>Ce que tu veux construire</li>
                    <li>Si je peux t'aider (et comment)</li>
                </ul>

                {/* CTA Container */}
                <div ref={ctaContainerRef} className="flex flex-col items-center">
                    <button
                        onClick={() => setIsCalendlyOpen(true)}
                        className="bg-[#B94A2F] hover:bg-[#9A3D25] text-white px-8 py-4 rounded-lg text-lg font-bold transition-all transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
                    >
                        Réserver mon appel clarté
                    </button>

                    <p className="text-sm text-[#6B7280] mt-4">
                        Gratuit. Humain. Sans pression.
                    </p>
                </div>

            </div>

            <PopupModal
                url="https://calendly.com/ton-lien-calendly"
                rootElement={document.getElementById("root")}
                text="Réserver mon appel clarté"
                textColor="#ffffff"
                color="#A85D42"
                open={isCalendlyOpen}
                onModalClose={() => setIsCalendlyOpen(false)}
            />
        </section>
    );
};

export default CTA;
