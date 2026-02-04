"use client";

import React from "react";
import { motion } from "framer-motion";

export const FinalCTA = () => {
    return (
        <section className="bg-black py-32 px-6 overflow-hidden relative">
            {/* Background Accent */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] aspect-square bg-gradient-to-r from-white/5 to-transparent rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-4xl mx-auto text-center relative z-10 space-y-12">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                >
                    <h2 className="text-4xl md:text-7xl font-light tracking-[0.1em] text-white uppercase leading-tight">
                        Don’t just arrive. <br />
                        <span className="italic font-extralight text-white/50">Be remembered.</span>
                    </h2>
                    <p className="text-white/40 text-sm md:text-lg tracking-widest uppercase font-light max-w-2xl mx-auto">
                        Your signature is the only thing that stays in the room when you leave.
                        Join the collective of the unforgettable.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <button
                        onClick={() => {
                            const element = document.getElementById('collection');
                            if (element) element.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="px-12 py-5 bg-white text-black text-xs tracking-[0.4em] uppercase font-bold hover:bg-neutral-200 transition-all hover:tracking-[0.5em]"
                    >
                        Define Your Signature
                    </button>
                    <div className="mt-8 flex justify-center gap-6 opacity-30">
                        <span className="text-[10px] tracking-widest uppercase">Global Shipping</span>
                        <span className="text-[10px] tracking-widest uppercase">Pure Concentration</span>
                        <span className="text-[10px] tracking-widest uppercase">Iconic Status</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
