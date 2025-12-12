import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Lock, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
const PopupModal = React.lazy(() => import('react-calendly').then(module => ({ default: module.PopupModal })));
import ctaBgMobile from '../assets/images/coaching-premium-atmosphere-bali-calme.webp';
import ctaBgDesktop from '../assets/images/benjamin-poulet-coach-business-bureau.webp';

gsap.registerPlugin(ScrollTrigger);

const CraneIcon = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        <path d="M4 21h16" />
        <path d="M10 21V5" />
        <path d="M10 5h11" />
        <path d="M10 5H6" />
        <path d="M18 5v8" />
        <rect x="16" y="13" width="4" height="4" />
        <path d="M10 9L6 5" />
    </svg>
);

const CTA = () => {
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const introRef = useRef(null);
    const bulletsRef = useRef(null);
    const ctaContainerRef = useRef(null);

    // Mobile Refs (Separate to avoid conflicts with Desktop refs in DOM)
    const mobileIntroRef = useRef(null);
    const mobileBulletsRef = useRef(null);
    const mobileCtaRef = useRef(null);

    const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);

    useEffect(() => {
        const mm = gsap.matchMedia();

        // Context for cleaning up matchMedia
        mm.add({
            isDesktop: "(min-width: 768px)",
            isMobile: "(max-width: 767px)"
        }, (context) => {
            const { isDesktop, isMobile } = context.conditions;

            if (isDesktop) {
                // DESKTOP ANIMATION
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 70%",
                    }
                });

                tl.from(titleRef.current, {
                    opacity: 0,
                    y: 20,
                    duration: 0.8,
                    ease: "power2.out"
                })
                    .from(introRef.current, {
                        opacity: 0,
                        y: 10,
                        duration: 0.5,
                        ease: "power2.out"
                    }, "-=0.4")
                    .from(bulletsRef.current.children, {
                        opacity: 0,
                        y: 10,
                        duration: 0.3,
                        stagger: 0.1,
                        ease: "power2.out"
                    }, "-=0.2")
                    .from(ctaContainerRef.current, {
                        opacity: 0,
                        y: 20,
                        duration: 0.6,
                        ease: "power2.out"
                    }, "-=0.2");
            }

            if (isMobile) {
                // MOBILE ANIMATION
                // Trigger specifically on the intro text to ensure visibility
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: mobileIntroRef.current, // Start when the text block enters
                        start: "top 80%", // When top of intro hits 80% with viewport
                    }
                });

                tl.from(mobileIntroRef.current, {
                    opacity: 0,
                    y: 20,
                    duration: 0.5,
                    ease: "power2.out"
                })
                    .from(mobileBulletsRef.current.children, {
                        opacity: 0,
                        y: 15,
                        duration: 0.4,
                        stagger: 0.15,
                        ease: "power2.out"
                    }, "-=0.1")
                    .from(mobileCtaRef.current, {
                        opacity: 0,
                        y: 20,
                        duration: 0.5,
                        ease: "power2.out"
                    }, "-=0.1");
            }
        });

        // IntersectionObserver for Sticky CTA
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
        if (mobileCtaRef.current) {
            observer.observe(mobileCtaRef.current);
        }

        return () => {
            mm.revert(); // Cleanup GSAP
            if (ctaContainerRef.current) observer.unobserve(ctaContainerRef.current);
            if (mobileCtaRef.current) observer.unobserve(mobileCtaRef.current);
        };
    }, []);

    const bulletPoints = [
        { text: "Où tu en es vraiment", icon: MapPin },
        { text: "Ce qui coince", icon: Lock },
        { text: "Ce que tu veux construire", icon: CraneIcon },
        { text: "Si je peux t'aider (et comment)", icon: Sparkles }
    ];

    return (
        <section
            ref={sectionRef}
            className="relative flex flex-col md:block overflow-hidden bg-[#FAF8F5]"
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

            {/* Mobile Content Container (Restored) */}
            <div className="relative z-10 -mt-24 px-6 pt-12 pb-12 md:hidden bg-[linear-gradient(to_bottom,transparent_0%,#FAF8F5_20%,#FAF8F5_100%)]">
                <div className="flex flex-col items-center text-center">
                    {/* Intro */}
                    <p
                        ref={mobileIntroRef}
                        className="font-heading text-2xl text-[#3D5245] font-bold mt-8 mb-8 leading-snug"
                    >
                        Je t'offre 30 min. On voit :
                    </p>

                    {/* Bullets */}
                    <div
                        ref={mobileBulletsRef}
                        className="mb-10 w-fit mx-auto space-y-8"
                    >
                        {bulletPoints.map((point, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-4 justify-start"
                            >
                                <point.icon className="w-6 h-6 text-[#B94A2F] flex-shrink-0" />
                                <span className="text-lg font-bold text-[#1D1D1F] text-left">
                                    {point.text}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* CTA Container */}
                    <div ref={mobileCtaRef} className="flex flex-col items-center w-full">
                        <button
                            onClick={() => setIsCalendlyOpen(true)}
                            className="bg-[#B94A2F] hover:bg-[#9A3D25] text-white px-10 py-5 rounded-full text-lg font-bold shadow-[0_4px_14px_0_rgba(185,74,47,0.39)] w-full max-w-sm"
                        >
                            Réserver mon appel clarté
                        </button>

                        <p className="text-sm text-[#52525B] font-medium mt-5">
                            Gratuit. Humain. Sans pression.
                        </p>
                    </div>
                </div>
            </div>

            {/* Desktop Layout (>1024px "Invitation Card" Style) - responsive down to tablet */}
            <div className="hidden md:flex min-h-[80vh] items-center justify-center py-20 bg-[#FAF8F5]">

                {/* INVITATION CARD CONTAINER */}
                <div className="w-full max-w-[900px] bg-[#F3EDE7] shadow-[0_4px_24px_rgba(0,0,0,0.06)] rounded-2xl px-[60px] py-20 mx-6 lg:mx-auto">

                    {/* Centered Headers */}
                    <div className="text-center">
                        <h2
                            ref={titleRef}
                            className="text-5xl font-extrabold text-[#3D5245] tracking-tight mb-8"
                            style={{ letterSpacing: '-0.02em' }}
                        >
                            Parlons de toi.
                        </h2>

                        <p
                            ref={introRef}
                            className="font-heading text-2xl text-[#3D5245] font-normal mb-8"
                        >
                            Je t'offre 30 min. On voit :
                        </p>
                    </div>

                    {/* 2x2 Grid for Bullets */}
                    <div
                        ref={bulletsRef}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-3xl mx-auto"
                    >
                        {bulletPoints.map((point, index) => (
                            <div
                                key={index}
                                className="bg-[#FAF8F5] p-6 rounded-lg flex items-center gap-4 shadow-sm"
                            >
                                <point.icon className="w-6 h-6 text-[#B94A2F] flex-shrink-0" />
                                <span className="text-lg font-bold text-[#1D1D1F]">
                                    {point.text}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Centered CTA */}
                    <div
                        ref={ctaContainerRef}
                        className="mt-14 flex flex-col items-center"
                    >
                        <button
                            onClick={() => setIsCalendlyOpen(true)}
                            className="bg-[#B94A2F] hover:bg-[#9A3D25] text-white px-10 h-[56px] rounded-full text-lg font-bold transition-all transform hover:-translate-y-1 shadow-[0_4px_14px_0_rgba(185,74,47,0.39)] hover:shadow-[0_6px_20px_rgba(185,74,47,0.23)]"
                        >
                            Réserver mon appel clarté
                        </button>

                        <p className="text-sm text-[#52525B] font-medium mt-4">
                            Gratuit. Humain. Sans pression.
                        </p>
                    </div>

                </div>
            </div>

            <PopupModal
                url="https://calendly.com/benjamin-entrepreneuraligne/30min?month=2025-12"
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
