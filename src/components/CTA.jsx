import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PopupModal } from 'react-calendly';

gsap.registerPlugin(ScrollTrigger);

const CTA = () => {
    const sectionRef = useRef(null);
    const contentRef = useRef(null);
    const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const children = contentRef.current.children;
            gsap.from(children, {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                },
                y: 30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power2.out"
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="py-20 md:py-32 bg-cream-dark">
            <div className="container mx-auto px-6">

                <div ref={contentRef} className="max-w-2xl mx-auto text-center flex flex-col items-center">
                    <h2 className="text-4xl md:text-5xl font-heading font-bold text-anthracite mb-8">
                        Parlons de toi.
                    </h2>

                    <p className="text-xl text-anthracite mb-8">
                        Je t'offre 30 minutes. On regarde ensemble :
                    </p>

                    <ul className="text-lg text-zinc-600 space-y-3 mb-12 text-left w-full max-w-md mx-auto list-disc pl-6">
                        <li>Où tu en es vraiment</li>
                        <li>Ce qui coince</li>
                        <li>Ce que tu veux construire</li>
                        <li>Si je peux t'aider (et comment)</li>
                    </ul>

                    <button
                        onClick={() => setIsCalendlyOpen(true)}
                        className="bg-sienna hover:bg-sienna-hover text-white px-8 py-4 rounded-full text-lg font-bold transition-all transform hover:-translate-y-1 shadow-lg hover:shadow-xl w-full md:w-auto"
                    >
                        Réserver mon appel clarté
                    </button>

                    <p className="mt-4 text-sm text-zinc-600 italic">
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
