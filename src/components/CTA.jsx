import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PopupModal } from 'react-calendly';
import { Compass, Unlock, Rocket, CheckCircle } from 'lucide-react';
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

        // IntersectionObserver to hide sticky CTA when this section is visible
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        document.body.setAttribute('data-cta-visible', 'true');
                    } else {
                        document.body.removeAttribute('data-cta-visible');
                    }
                });
            },
            { threshold: 0.3 }
        );

        if (ctaContainerRef.current) {
            observer.observe(ctaContainerRef.current);
        }

        return () => {
            ctx.revert();
            if (ctaContainerRef.current) {
                observer.unobserve(ctaContainerRef.current);
            }
        };
    }, []);

    const bulletPoints = [
        { icon: Compass, text: "Où tu en es vraiment" },
        { icon: Unlock, text: "Ce qui coince" },
        { icon: Rocket, text: "Ce que tu veux construire" },
        { icon: CheckCircle, text: "Si je peux t'aider (et comment)" }
    ];

    return (
        <section
            ref={sectionRef}
            className="relative min-h-screen md:h-screen flex flex-col md:block overflow-hidden bg-[#FAF8F5]"
        >
            {/* Mobile Top Image (55vh, Gradient, Title on Photo) */}
            <div className="relative h-[55vh] w-full md:hidden">
                {/* Image */}
                <div
                    className="absolute inset-0 bg-cover bg-[center_30%]"
                    style={{ backgroundImage: `url(${ctaBgMobile})` }}
                ></div>

                {/* Gradient Overlay */}
                <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(to bottom, #FAF8F5 0%, transparent 15%, transparent 50%, rgba(0,0,0,0.7) 100%)' }}
                ></div>

                {/* Mobile Title (On Photo) */}
                <div className="absolute bottom-14 left-0 w-full text-center px-4 z-20">
                    <h2
                        className="text-4xl font-extrabold text-white tracking-tight"
                        style={{ letterSpacing: '-0.02em' }}
                    >
                        Parlons de toi.
                    </h2>
                </div>
            </div>

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
            <div className="relative z-10 -mt-24 bg-[linear-gradient(to_bottom,transparent_0%,#FAF8F5_20%,#FAF8F5_100%)] px-6 pt-12 pb-12 md:mt-0 md:bg-none md:p-0 md:h-full md:flex md:items-center">
                <div className="container mx-auto md:px-6 flex flex-col md:flex-row md:justify-start w-full">
                    <div className="w-full md:w-1/2 flex flex-col items-center justify-center text-center md:pl-12 lg:pl-20">

                        {/* Text Block Content */}
                        <div className="max-w-lg w-full">

                            {/* Desktop Title (Hidden on Mobile) */}
                            <h2
                                ref={titleRef}
                                className="hidden md:block text-4xl md:text-5xl font-extrabold text-[#3D5245] tracking-tight mb-8"
                                style={{ letterSpacing: '-0.02em' }}
                            >
                                Parlons de toi.
                            </h2>

                            {/* Intro */}
                            <p
                                ref={introRef}
                                className="text-lg text-[#52525B] italic mt-8 mb-0 md:mb-8 text-center"
                            >
                                Je t'offre 30 minutes. On regarde ensemble :
                            </p>

                            {/* Bullets (Premium Icon List) */}
                            <div
                                ref={bulletsRef}
                                className="mt-6 md:mt-0 mb-0 md:mb-12 space-y-4 md:space-y-3"
                            >
                                {bulletPoints.map((item, index) => {
                                    const Icon = item.icon;
                                    return (
                                        <div
                                            key={index}
                                            className="flex items-start gap-3 md:gap-4 justify-center md:justify-start"
                                        >
                                            <Icon
                                                className="text-[#3D5245] flex-shrink-0 mt-0.5"
                                                size={24}
                                                strokeWidth={2.5}
                                            />
                                            <span className="text-lg md:text-base font-bold text-[#1D1D1F]">
                                                {item.text}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* CTA Container */}
                            <div ref={ctaContainerRef} className="flex flex-col items-center mt-10 md:mt-0">
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
