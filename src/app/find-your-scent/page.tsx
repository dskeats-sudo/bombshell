"use client";

import React, { useState } from "react";
import { PRODUCTS, Product } from "@/data/products";
import { motion, AnimatePresence } from "framer-motion";

export default function FindYourScent() {
    const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
    const [match, setMatch] = useState<Product | null>(null);

    const brands = PRODUCTS.map(p => p.inspiration).sort();

    const handleSelectBrand = (brand: string) => {
        setSelectedBrand(brand);
        const found = PRODUCTS.find(p => p.inspiration === brand);
        setMatch(found || null);
    };

    return (
        <main className="min-h-screen bg-[#050505] text-white py-24 px-6 md:px-12 lg:px-24 font-sans">
            <div className="max-w-4xl mx-auto text-center space-y-16">
                <header className="space-y-4">
                    <h1 className="text-4xl md:text-6xl font-extralight tracking-[0.2em] uppercase">
                        Find Your Match
                    </h1>
                    <p className="text-white/60 font-light tracking-widest uppercase text-xs">
                        Select the fragrance you currently love to find its Bombshell equivalent
                    </p>
                </header>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {brands.map(brand => (
                        <button
                            key={brand}
                            onClick={() => handleSelectBrand(brand)}
                            className={`px-4 py-3 rounded-sm border text-[10px] tracking-widest uppercase transition-all duration-300 ${selectedBrand === brand
                                    ? "bg-white text-black border-white font-bold"
                                    : "border-white/10 hover:border-white/40 text-white/60 hover:text-white"
                                }`}
                        >
                            {brand}
                        </button>
                    ))}
                </div>

                <div className="pt-12 min-h-[400px]">
                    <AnimatePresence mode="wait">
                        {match ? (
                            <motion.div
                                key={match.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -30 }}
                                className="bg-white/5 border border-white/10 p-8 md:p-12 rounded-sm text-center max-w-2xl mx-auto group"
                            >
                                <div className="mb-4 text-white/40 text-[10px] tracking-[0.3em] uppercase">
                                    Your Bombshell Match
                                </div>
                                <h2 className="text-3xl md:text-5xl font-extralight tracking-[0.2em] uppercase mb-8">
                                    {match.name}
                                </h2>
                                <div className="aspect-[4/5] max-w-[300px] mx-auto overflow-hidden bg-white/10 mb-8">
                                    <img src={match.image} alt={match.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="space-y-6">
                                    <p className="text-white/60 text-sm font-light tracking-wide italic">
                                        "If you love {match.inspiration}, you'll obsess over {match.name}."
                                    </p>
                                    <div className="flex flex-wrap justify-center gap-2">
                                        {match.scentProfile.map(note => (
                                            <span key={note} className="text-[10px] tracking-[0.2em] uppercase px-3 py-1 border border-white/10 text-white/40">
                                                {note}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="pt-8">
                                        <a
                                            href={`/#${match.id}`}
                                            className="inline-block px-12 py-4 bg-white text-black text-xs tracking-[0.3em] uppercase font-bold hover:bg-neutral-200 transition-colors"
                                        >
                                            Experience {match.name}
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-white/20 text-[10px] tracking-[0.4em] uppercase"
                            >
                                Select a brand above to reveal your match
                            </motion.p>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <a href="/" className="fixed bottom-12 left-12 text-[10px] tracking-[0.3em] uppercase underline underline-offset-8 decoration-white/20 hover:decoration-white transition-all">
                Back to Gallery
            </a>
        </main>
    );
}
