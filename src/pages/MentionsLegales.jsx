import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const MentionsLegales = () => {
    return (
        <div className="container mx-auto px-6 py-24 max-w-[800px]">
            <Link to="/" className="inline-flex items-center gap-2 text-anthracite/60 hover:text-sienna transition-colors mb-8 group">
                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                <span className="font-medium">Retour à l'accueil</span>
            </Link>
            <h1 className="text-4xl md:text-5xl font-heading mb-12 text-terracotta">Mentions Légales</h1>

            <div className="space-y-12 text-anthracite/80">
                <section>
                    <h2 className="text-2xl font-heading mb-4 text-anthracite">Éditeur du site</h2>
                    <p className="leading-relaxed">
                        <strong>Nom commercial :</strong> Entrepreneur Aligné<br />
                        <strong>Éditeur :</strong> Benjamin Poulet<br />
                        <strong>Adresse :</strong> 2 boulevard Robert Schuman, 57100 Thionville, France<br />
                        <strong>Email :</strong> <a href="mailto:benjamin@entrepreneuraligne.fr" className="hover:text-terracotta transition-colors">benjamin@entrepreneuraligne.fr</a><br />
                        <strong>Téléphone :</strong> +33 6 58 84 25 11<br />
                        <strong>Statut :</strong> Micro-entreprise en cours d'immatriculation (SIRET à venir)
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-heading mb-4 text-anthracite">Directeur de publication</h2>
                    <p className="leading-relaxed">
                        Benjamin Poulet
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-heading mb-4 text-anthracite">Hébergement</h2>
                    <p className="leading-relaxed">
                        <strong>Nom :</strong> Netlify, Inc.<br />
                        <strong>Adresse :</strong> 2325 3rd Street, Suite 296, San Francisco, CA 94107, USA<br />
                        <strong>Site web :</strong> <a href="https://www.netlify.com" target="_blank" rel="noopener noreferrer" className="hover:text-terracotta transition-colors">https://www.netlify.com</a>
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-heading mb-4 text-anthracite">Propriété intellectuelle</h2>
                    <p className="leading-relaxed">
                        L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques. La reproduction de tout ou partie de ce site sur un support électronique quel qu'il soit est formellement interdite sauf autorisation expresse du directeur de la publication.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-heading mb-4 text-anthracite">Liens hypertextes</h2>
                    <p className="leading-relaxed">
                        Le site <strong>entrepreneuraligne.fr</strong> peut contenir des liens hypertextes vers d’autres sites présents sur le réseau Internet. Les liens vers ces autres ressources vous font quitter le site <strong>entrepreneuraligne.fr</strong>. L'éditeur décline toute responsabilité quant au contenu de ces sites tiers.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-heading mb-4 text-anthracite">Limitation de responsabilité</h2>
                    <p className="leading-relaxed">
                        Les informations contenues sur ce site sont aussi précises que possible et le site est périodiquement remis à jour, mais peut toutefois contenir des inexactitudes, des omissions ou des lacunes. Si vous constatez une lacune, erreur ou ce qui parait être un dysfonctionnement, merci de bien vouloir le signaler par email en décrivant le problème de la manière la plus précise possible.
                    </p>
                </section>
            </div>
        </div>
    );
};

export default MentionsLegales;
