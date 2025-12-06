import React, { useState, useRef, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import gsap from 'gsap';

const FAQItem = ({ question, answer, isOpen, onClick }) => {
    const contentRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            gsap.to(contentRef.current, { height: "auto", duration: 0.3, ease: "power2.out" });
        } else {
            gsap.to(contentRef.current, { height: 0, duration: 0.3, ease: "power2.out" });
        }
    }, [isOpen]);

    return (
        <div className="border-b border-border last:border-none">
            <button
                onClick={onClick}
                className="w-full py-6 flex justify-between items-center text-left focus:outline-none group"
            >
                <span className="text-lg md:text-xl font-medium text-anthracite group-hover:text-sienna transition-colors pr-8">
                    {question}
                </span>
                <ChevronRight
                    className={`text-terracotta transform transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-90' : ''}`}
                    size={24}
                />
            </button>
            <div
                ref={contentRef}
                className="overflow-hidden h-0"
            >
                <div className="pb-6 text-zinc-600 leading-relaxed space-y-4">
                    {answer.map((paragraph, idx) => (
                        <p key={idx}>{paragraph}</p>
                    ))}
                </div>
            </div>
        </div>
    );
};

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const faqs = [
        {
            question: "En quoi c'est différent d'un coach business classique ? 🤔",
            answer: [
                "La plupart des coachs business te donnent une méthode. Moi, je t'aide à trouver ta méthode — celle qui colle à ton énergie, ton rythme, ta vision. ✨",
                "Mais surtout : on ne travaille pas que sur la stratégie. On travaille aussi sur ce qui bloque à l'intérieur. Les croyances limitantes, le syndrome de l'imposteur, la peur de vendre... 🎯",
                "Pour ça, je collabore avec des coachs intuitifs et praticiens bien-être. 🤝 Ensemble, on aligne l'extérieur (ton offre, ta visibilité) ET l'intérieur (ta posture, ta légitimité)."
            ]
        },
        {
            question: "C'est un investissement important. Comment savoir si c'est fait pour moi ? 💸",
            answer: [
                "C'est une vraie question — et c'est pour ça que l'appel découverte existe. ☕",
                "30 minutes pour qu'on se parle, qu'on regarde ta situation, et qu'on sente si ça matche. Pas de pression, pas de vente forcée. Si ce n'est pas le bon moment pour toi, je te le dirai. 🙏",
                "Et en moyenne, mes clients récupèrent plus de 7 fois leur investissement initial — en temps gagné, en clarté, et en revenus. 📈"
            ]
        },
        {
            question: "Je suis déjà débordé·e — est-ce que ça va me prendre beaucoup de temps ? ⏰",
            answer: [
                "Ce n'est pas une formation générique avec 47 modules à suivre. 😅",
                "C'est un accompagnement. On avance à ton rythme. Pas de \"devoirs\" à rendre, pas de pression. 🧘",
                "L'objectif, c'est justement de te faire gagner du temps. Quand tu as de la clarté sur ton positionnement, ton offre et tes priorités, tu arrêtes de t'éparpiller. 🎯"
            ]
        },
        {
            question: "Et si ça ne fonctionne pas pour moi ? Mon cas est un peu particulier... 🙄",
            answer: [
                "Ton cas est particulier. C'est pour ça que c'est un accompagnement sur-mesure, pas un programme en groupe.",
                "On part de toi : ta situation, tes blocages, tes forces. Et on construit ensemble ce qui te correspond. 💫",
                "Je vais être honnête : les résultats dépendent aussi de ton engagement. Si tu es prêt·e à t'investir, ça fonctionne. 🚀"
            ]
        },
        {
            question: "J'ai déjà investi dans des formations ou accompagnements... sans grand résultat. 😔",
            answer: [
                "Je comprends. La vraie question, c'est : pourquoi ça n'a pas marché ?",
                "C'est souvent parce que la formation t'a donné des techniques \"générales\"... mais n'a pas touché à ce qui bloquait vraiment. 🎯",
                "C'est exactement pour ça que je travaille sur les deux : la stratégie ET le travail intérieur — en collaboration avec des praticiens spécialisés. 🌱",
                "Cette fois, on va à la racine."
            ]
        },
        {
            question: "Comment ça se passe concrètement ? 🛠️",
            answer: [
                "On se retrouve en visio, chaque semaine ou tous les 15 jours. 💻",
                "Ce n'est pas juste du conseil. Je travaille avec toi :",
                "🔍 J'audite ce que tu as déjà (ton site, tes offres, ta com')",
                "✍️ Je t'aide à rédiger tes textes, tes pages, tes messages",
                "🎯 Je crée des exercices 100% adaptés à ta situation",
                "Tu as aussi ton propre espace Notion avec le résumé de chaque session, tes missions prioritaires, et ta bibliothèque de ressources.",
                "Entre les sessions ? Tu peux m'écrire 7j/7. 💬",
                "L'objectif au bout de 3 mois ? Que tu sois totalement autonome. 🦅"
            ]
        }
    ];

    return (
        <section className="py-20 md:py-32 bg-cream">
            <div className="container mx-auto px-6 max-w-4xl">
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-anthracite text-center mb-16">
                    Questions Fréquentes
                </h2>

                <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 md:p-10 shadow-sm">
                    {faqs.map((faq, index) => (
                        <FAQItem
                            key={index}
                            question={faq.question}
                            answer={faq.answer}
                            isOpen={openIndex === index}
                            onClick={() => toggleFAQ(index)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
