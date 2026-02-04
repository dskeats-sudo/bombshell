"use client";

import React from "react";
import { motion } from "framer-motion";

interface PreferenceSelectorProps {
    onSelect: (category: "Men" | "Women" | "Unisex") => void;
}

export const PreferenceSelector = ({ onSelect }: PreferenceSelectorProps) => {
    const preferences = [
        {
            id: "Women",
            label: "Eternal Elegance",
            image: "/products/product_1.png",
            tagline: "The presence of timeless grace."
        },
        {
            id: "Men",
            label: "Unspoken Power",
            image: "/products/product_11.png",
            tagline: "Command the room without a word."
        },
        {
            id: "Unisex",
            label: "Universal Allure",
            image: "/products/product_3.png",
            tagline: "A shared memory, defined by you."
        }
    ] as const;

    return (
        <section className="bg-white py-12 md:py-24 px-4 md:px-12 lg:px-24">
            <div className="max-w-7xl mx-auto text-center mb-16">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-2xl md:text-5xl font-extralight tracking-[0.2em] uppercase text-neutral-900 mb-4"
                >
                    Choose Your <span className="font-bold">Aura</span>
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="text-neutral-400 text-[10px] md:text-sm tracking-[0.3em] uppercase"
                >
                    Select a preference to discover your scent
                </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12">
                {preferences.map((pref, idx) => (
                    <motion.div
                        key={pref.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.1 }}
                        whileHover={{ y: -10 }}
                        className="group relative cursor-pointer"
                        onClick={() => onSelect(pref.id)}
                    >
                        <div className="relative aspect-[4/5] overflow-hidden bg-neutral-50 rounded-sm">
                            <img
                                src={pref.image}
                                alt={pref.label}
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 opacity-60 group-hover:opacity-100"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent opacity-80 group-hover:opacity-40 transition-opacity" />

                            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center space-y-4">
                                <h3 className="text-3xl md:text-4xl font-light tracking-tighter text-neutral-900 uppercase transition-transform duration-500 group-hover:scale-110">
                                    {pref.label}
                                </h3>
                                <p className="text-[10px] tracking-[0.2em] uppercase text-neutral-500 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                    {pref.tagline}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};
