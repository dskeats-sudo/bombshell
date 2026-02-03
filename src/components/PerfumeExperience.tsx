"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import PerfumeCanvas from "./PerfumeCanvas";

interface BeatProps {
    title: string;
    subtitle: string;
    progress: any; // MotionValue
    range: [number, number];
}

const ScrapBeat: React.FC<BeatProps> = ({ title, subtitle, progress, range }) => {
    const opacity = useTransform(progress, [range[0], range[0] + 0.05, range[1] - 0.05, range[1]], [0, 1, 1, 0]);
    const y = useTransform(progress, [range[0], range[0] + 0.05, range[1] - 0.05, range[1]], [20, 0, 0, -20]);

    return (
        <motion.div
            style={{ opacity, y }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none"
        >
            <h2 className="text-4xl md:text-6xl font-extralight tracking-[0.2em] text-white/90 uppercase mb-4">
                {title}
            </h2>
            <p className="text-sm md:text-base font-light tracking-[0.1em] text-white/60 max-w-md uppercase">
                {subtitle}
            </p>
        </motion.div>
    );
};

export const PerfumeExperience = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (!isLoaded) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isLoaded]);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const beats = [
        {
            title: "Bombshell Intense",
            subtitle: "The science of obsession.",
            range: [0, 0.15] as [number, number],
        },
        {
            title: "Triple-Distilled Amber",
            subtitle: "Engineered for 24-hour resonance and depth.",
            range: [0.2, 0.4] as [number, number],
        },
        {
            title: "Precision Atomization",
            subtitle: "A chaotic, beautiful mist calibrated for perfect skin-adhesion.",
            range: [0.45, 0.6] as [number, number],
        },
        {
            title: "Refined Craftsmanship",
            subtitle: "Polished marble textures meeting industrial-grade silver hardware.",
            range: [0.65, 0.8] as [number, number],
        },
        {
            title: "A Masterpiece of Scent",
            subtitle: "— Vogue Collective. Explore the Intense Collection.",
            range: [0.85, 0.95] as [number, number],
        },
    ];

    return (
        <div ref={containerRef} className="relative h-[600vh] bg-[#050505]">
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                <PerfumeCanvas
                    scrollProgress={smoothProgress as any}
                    frameCount={144}
                    onLoaded={() => setIsLoaded(true)}
                />

                {beats.map((beat, index) => (
                    <ScrapBeat
                        key={index}
                        title={beat.title}
                        subtitle={beat.subtitle}
                        progress={scrollYProgress}
                        range={beat.range}
                    />
                ))}
            </div>
        </div>
    );
};

export default PerfumeExperience;
