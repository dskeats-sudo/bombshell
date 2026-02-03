"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export const DesireSection = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const y2 = useTransform(scrollYProgress, [0, 1], [-50, 50]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    return (
        <section ref={containerRef} className="relative bg-[#050505] py-48 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <motion.div
                    style={{ opacity }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center"
                >
                    <div className="space-y-8 order-2 md:order-1">
                        <h2 className="text-4xl md:text-7xl font-extralight tracking-[0.2em] uppercase leading-tight italic">
                            Create <br />
                            <span className="text-white/40">Desire</span>
                        </h2>
                        <p className="text-white/60 font-light tracking-wide text-sm md:text-base max-w-md leading-relaxed">
                            Provocative, magnetic, and undeniably intense.
                            The unspoken language of attraction, distilled into a single, crystalline essence.
                        </p>
                        <div className="pt-12">
                            <span className="text-[10px] tracking-[0.4em] uppercase text-white/20">Scroll to explore the collection</span>
                        </div>
                    </div>

                    <div className="relative aspect-[4/5] order-1 md:order-2">
                        <motion.div style={{ y: y1 }} className="absolute inset-0 z-10 p-8 md:p-12">
                            <img
                                src="/lifestyle/desire_1.png"
                                alt="Shared Intimacy"
                                className="w-full h-full object-cover rounded-sm perspective-1000 rotate-1 shadow-2xl"
                            />
                        </motion.div>
                        <motion.div style={{ y: y2 }} className="absolute -inset-12 md:-inset-24 z-0 opacity-30">
                            <img
                                src="/lifestyle/desire_2.png"
                                alt="Scent Release"
                                className="w-full h-full object-cover scale-110 grayscale"
                            />
                        </motion.div>
                    </div>
                </motion.div>
            </div>

            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent" />
        </section>
    );
};
