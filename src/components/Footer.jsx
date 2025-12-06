import React from 'react';
import { Instagram, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-anthracite text-white py-12 md:py-16">
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
                    <div className="text-center md:text-right text-sm text-gray-500">
                        <div className="space-x-4 mb-2">
                            <a href="#" className="hover:text-gray-300 transition-colors">Mentions légales</a>
                            <span>|</span>
                            <a href="#" className="hover:text-gray-300 transition-colors">Politique de confidentialité</a>
                        </div>
                        <p>© 2025 Benjamin. Tous droits réservés.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
