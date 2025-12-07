import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { PopupModal } from 'react-calendly';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);

    const [showStickyCTA, setShowStickyCTA] = useState(false);
    const [hideStickyForCTA, setHideStickyForCTA] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);

            // Simplified check: Show sticky CTA after 400px of scrolling
            // This is roughly when the main Hero content starts to go out of view
            setShowStickyCTA(window.scrollY > 400);

            // Check if CTA section is visible
            const ctaVisible = document.body.getAttribute('data-cta-visible') === 'true';
            setHideStickyForCTA(ctaVisible);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        // Trigger once on mount to check initial position
        handleScroll();

        // Also listen for attribute changes
        const observer = new MutationObserver(handleScroll);
        observer.observe(document.body, {
            attributes: true,
            attributeFilter: ['data-cta-visible']
        });

        return () => {
            window.removeEventListener('scroll', handleScroll);
            observer.disconnect();
        };
    }, []);

    const navLinks = [
        { name: "Pour toi ?", href: "#pain-points" },
        { name: "Benjamin", href: "#story" },
        { name: "L'accompagnement", href: "#method" },
    ];

    const shouldShowSticky = showStickyCTA && !hideStickyForCTA;

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-cream py-4 shadow-sm' : 'bg-transparent backdrop-blur-sm py-6'
                    }`}
            >
                <div className="container mx-auto px-6 flex justify-between items-center">
                    <a
                        href="#"
                        className={`text-xl font-heading font-bold tracking-tight transition-colors ${isScrolled ? 'text-anthracite' : 'text-white'
                            }`}
                    >
                        Benjamin · Entrepreneur Aligné
                    </a>

                    {/* Desktop Menu */}
                    <nav className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className={`group relative font-medium transition-colors ${isScrolled
                                    ? 'text-anthracite hover:text-sienna'
                                    : 'text-white/90 hover:text-white'
                                    }`}
                            >
                                {link.name}
                                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${isScrolled ? 'bg-sienna' : 'bg-white'
                                    }`}></span>
                            </a>
                        ))}
                        <button
                            onClick={() => setIsCalendlyOpen(true)}
                            className="bg-sienna hover:bg-sienna-hover text-white px-6 py-2.5 rounded-full font-medium transition-all transform hover:-translate-y-0.5 shadow-md"
                        >
                            Réserver mon appel clarté
                        </button>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        className={`md:hidden transition-colors ${isScrolled ? 'text-anthracite' : 'text-white'}`}
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>

                {/* Mobile Menu Overlay */}
                {isMobileMenuOpen && (
                    <div className="md:hidden absolute top-full left-0 right-0 bg-cream border-t border-border p-6 flex flex-col space-y-4 shadow-lg">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="text-lg font-medium text-anthracite"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>
                )}
            </header>

            {/* Mobile Sticky CTA */}
            <div
                className={`md:hidden fixed bottom-0 left-0 right-0 z-[100] bg-cream/90 backdrop-blur-md px-4 pt-4 pb-[calc(1rem+env(safe-area-inset-bottom))] border-t border-border flex justify-center transition-transform duration-300 shadow-[0_-5px_20px_rgba(0,0,0,0.05)] will-change-transform ${shouldShowSticky ? 'translate-y-0' : 'translate-y-[120%]'
                    }`}
            >
                <button
                    onClick={() => setIsCalendlyOpen(true)}
                    className="w-full max-w-sm bg-sienna hover:bg-sienna-hover text-white px-8 py-4 rounded-full font-bold shadow-lg text-xl active:scale-95 transition-transform"
                >
                    Réserver mon appel clarté
                </button>
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
        </>
    );
};

export default Header;
