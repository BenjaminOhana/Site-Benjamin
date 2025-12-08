import React from 'react';
import { Instagram, Linkedin, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-anthracite text-white py-12 md:py-16 relative z-50">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">

                    {/* Brand */}
                    <div className="text-center md:text-left">
                        <h3 className="text-xl font-heading font-bold mb-2">Benjamin · Entrepreneur Aligné</h3>
                        <a
                            href="mailto:benjamin@entrepreneuraligne.fr"
                            className="text-gray-400 hover:text-white transition-colors flex items-center justify-center md:justify-start gap-2"
                        >
                            <Mail size={18} />
                            benjamin@entrepreneuraligne.fr
                        </a>
                    </div>

                    {/* Socials */}
                    <div className="flex space-x-6">
                        <a href="#" className="text-gray-400 hover:text-white transition-colors hover:scale-110 transform duration-300">
                            <Instagram size={24} />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors hover:scale-110 transform duration-300">
                            <Linkedin size={24} />
                        </a>
                    </div>

                    {/* Legal */}
                    <div className="text-center md:text-right text-sm text-gray-500 flex flex-col items-center md:items-end">
                        <div className="space-x-2 mb-2">
                            <Link to="/mentions-legales.html" className="hover:text-gray-300 transition-colors">Mentions Légales</Link>
                            <span>•</span>
                            <Link to="/politique-confidentialite.html" className="hover:text-gray-300 transition-colors">Politique de Confidentialité</Link>
                        </div>
                        <p>© 2025 Benjamin Poulet - Entrepreneur Aligné</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
