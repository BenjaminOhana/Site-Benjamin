import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const PolitiqueConfidentialite = () => {
    return (
        <div className="container mx-auto px-6 py-24 max-w-[800px]">
            <Link to="/" className="inline-flex items-center gap-2 text-anthracite/60 hover:text-sienna transition-colors mb-8 group">
                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                <span className="font-medium">Retour à l'accueil</span>
            </Link>
            <h1 className="text-4xl md:text-5xl font-heading mb-12 text-terracotta">Politique de Confidentialité</h1>

            <div className="space-y-12 text-anthracite/80">
                <section>
                    <h2 className="text-2xl font-heading mb-4 text-anthracite">Introduction</h2>
                    <p className="leading-relaxed">
                        La protection de vos données personnelles est une priorité pour <strong>Entrepreneur Aligné</strong>. Cette politique de confidentialité vous informe sur la manière dont nous traitons vos données personnelles dans le respect du Règlement Général sur la Protection des Données (RGPD).
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-heading mb-4 text-anthracite">Responsable du traitement</h2>
                    <p className="leading-relaxed">
                        Le responsable du traitement des données est <strong>Benjamin Poulet</strong>, joignable à l'adresse suivante : <a href="mailto:benjamin@entrepreneuraligne.fr" className="hover:text-terracotta transition-colors">benjamin@entrepreneuraligne.fr</a>.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-heading mb-4 text-anthracite">Données collectées</h2>
                    <p className="leading-relaxed mb-4">
                        Nous collectons un minimum de données, uniquement lorsque vous choisissez de prendre rendez-vous via notre outil de réservation.
                    </p>
                    <p className="leading-relaxed">
                        <strong>Via Calendly, nous recueillons :</strong>
                    </p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>Nom et Prénom</li>
                        <li>Adresse email</li>
                        <li>Numéro de téléphone (optionnel)</li>
                        <li>Fuseau horaire (automatiquement détecté pour la prise de RDV)</li>
                    </ul>

                    <div className="mt-6 p-4 bg-terracotta/5 rounded-lg border border-terracotta/10">
                        <h3 className="font-heading text-lg mb-2 text-terracotta">Cookies et Tracking</h3>
                        <p className="text-sm">
                            Nous n'utilisons <strong>AUCUN cookie de tracking publicitaire</strong> ni aucun outil d'analyse tiers type Google Analytics sur ce site. Votre navigation reste privée. Seuls les cookies techniques strictement nécessaires au fonctionnement du site (ou de Calendly lors de la prise de rendez-vous) peuvent être déposés.
                        </p>
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-heading mb-4 text-anthracite">Finalité du traitement</h2>
                    <p className="leading-relaxed">
                        Vos données sont collectées uniquement dans le but de :
                    </p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>Gérer la prise de rendez-vous pour l'appel clarté.</li>
                        <li>Vous contacter (par email ou téléphone) dans le cadre de ce rendez-vous.</li>
                        <li>Vous envoyer les rappels de rendez-vous.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-heading mb-4 text-anthracite">Base légale</h2>
                    <p className="leading-relaxed">
                        Le traitement de vos données est fondé sur votre <strong>consentement</strong> (lorsque vous remplissez volontairement le formulaire de prise de rendez-vous) et sur l'exécution des mesures précontractuelles (préparation de l'entretien de coaching).
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-heading mb-4 text-anthracite">Durée de conservation</h2>
                    <p className="leading-relaxed">
                        Vos données personnelles sont conservées pour une durée maximale de <strong>3 ans</strong> à compter de notre dernier contact, sauf obligation légale contraire.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-heading mb-4 text-anthracite">Sécurité des données</h2>
                    <p className="leading-relaxed">
                        Nous mettons en œuvre toutes les mesures techniques et organisationnelles appropriées pour garantir un niveau de sécurité adapté au risque et protéger vos données personnelles contre l'accès non autorisé, la divulgation, l'altération ou la destruction.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-heading mb-4 text-anthracite">Vos droits (RGPD)</h2>
                    <p className="leading-relaxed mb-4">
                        Conformément à la réglementation en vigueur, vous disposez des droits suivants :
                    </p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li><strong>Droit d'accès</strong> et de communication de vos données.</li>
                        <li><strong>Droit de rectification</strong> des données inexactes ou incomplètes.</li>
                        <li><strong>Droit à l'effacement</strong> (droit à l'oubli).</li>
                        <li><strong>Droit à la limitation</strong> du traitement.</li>
                        <li><strong>Droit à la portabilité</strong> de vos données.</li>
                        <li><strong>Droit d'opposition</strong> au traitement.</li>
                    </ul>
                    <p className="mt-4">
                        Pour exercer ces droits, vous pouvez nous contacter à tout moment par email à : <a href="mailto:benjamin@entrepreneuraligne.fr" className="hover:text-terracotta transition-colors">benjamin@entrepreneuraligne.fr</a>.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-heading mb-4 text-anthracite">Droit de réclamation</h2>
                    <p className="leading-relaxed">
                        Si vous estimez, après nous avoir contactés, que vos droits « Informatique et Libertés » ne sont pas respectés, vous pouvez adresser une réclamation à la CNIL (Commission Nationale de l'Informatique et des Libertés) sur leur site web : <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="hover:text-terracotta transition-colors">https://www.cnil.fr</a>.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-heading mb-4 text-anthracite">Modifications de cette politique</h2>
                    <p className="leading-relaxed mb-4">
                        Nous nous réservons le droit de modifier la présente politique de confidentialité à tout moment pour la mettre en conformité avec les évolutions législatives ou techniques.
                    </p>
                    <p className="text-sm border-t border-anthracite/10 pt-4 mt-8">
                        Date de dernière mise à jour : <strong>7 décembre 2025</strong>
                    </p>
                </section>
            </div>
        </div>
    );
};

export default PolitiqueConfidentialite;
