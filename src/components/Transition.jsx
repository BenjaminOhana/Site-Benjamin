import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Transition = () => {
    const textRef = useRef(null);
    const lineRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: textRef.current,
                start: "top 80%",
            }
        });

        tl.fromTo(textRef.current,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
        )
            .fromTo(lineRef.current,
                { scaleX: 0 },
                { scaleX: 1, duration: 0.8, ease: "power3.out" },
                "-=0.5"
            );

    }, []);

    return (
        <section className="py-16 md:py-24 bg-[#FAF8F5] flex flex-col justify-center items-center text-center px-6 overflow-hidden">
            <h2
                ref={textRef}
                className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-[#3D5245] tracking-tight leading-tight"
            >
                Ensemble, on va ...
            </h2>
            <div
                ref={lineRef}
                className="w-24 md:w-32 h-1.5 bg-[#B94A2F] mt-6 md:mt-8 rounded-full origin-center"
            ></div>
        </section>
    );
};

export default Transition;
