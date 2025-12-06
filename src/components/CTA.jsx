import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PopupModal } from 'react-calendly';
import ctaBgMobile from '../assets/images/cta-bg.jpg';
import ctaBgDesktop from '../assets/images/cta-bg-desktop.jpg';

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
            className="relative min-h-[80vh] md:h-screen flex items-center overflow-hidden bg-[#FAF8F5]"
        >
            {/* Mobile Background (No Overlay, Face visible) */}
            <div
                className="absolute inset-0 bg-cover bg-[center_30%] md:hidden"
                style={{ backgroundImage: `url(${ctaBgMobile})` }}
            ></div>
            <div className="absolute inset-0 bg-[#FAF8F5]/85 md:hidden"></div>

            {/* Desktop Background (Full Width with Gradient) */}
            <div className="absolute inset-0 w-full h-full hidden md:block">
                <img
                    src={ctaBgDesktop}
                    alt="Benjamin"
                    className="w-full h-full object-cover object-[25%_center]"
                />
                {/* Gradient: Lighter beige on left, fading to transparent */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#FAF8F5]/90 via-[#FAF8F5]/60 to-transparent"></div>
            </div>

            {/* Content Container */}
            <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-end pb-12 md:pb-0 md:justify-center md:flex-row md:justify-start">
                <div className="w-full md:w-1/2 flex flex-col items-center justify-center text-center md:pl-12 lg:pl-20">

                    {/* Text Block (Card on Mobile, Transparent on Desktop) */}
                    <div className="max-w-lg w-full">

                        {/* Accroche */}
                        <h2
                            ref={titleRef}
                            className="text-4xl md:text-5xl font-extrabold text-[#3D5245] tracking-tight mb-8"
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
                            className="text-base text-[#1D1D1F] font-semibold text-left mx-auto max-w-sm space-y-3 mb-12 list-disc pl-5 marker:text-[#B94A2F]"
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
                                className="bg-[#B94A2F] hover:bg-[#9A3D25] text-white px-8 py-4 rounded-lg text-lg font-bold transition-all transform hover:-translate-y-1 shadow-lg hover:shadow-xl w-full md:w-auto"
                            >
                                Réserver mon appel clarté
                            </button>

                            <p className="text-sm text-[#6B7280] mt-4">
                                Gratuit. Humain. Sans pression.
                            </p>
                        </div>

                    </div>
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
