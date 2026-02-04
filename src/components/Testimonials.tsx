"use client";

import React from "react";
import { motion } from "framer-motion";

const TESTIMONIALS = [
    {
        quote: "I’ve worn high-end designers for years, but nothing has ever commanded a room like this. It’s not just a scent; it’s a shift in how people look at you.",
        author: "Marcus V.",
        role: "Creative Director"
    },
    {
        quote: "I wore this to a gala and was asked three times what I was wearing. It has this incredible all-day presence that feels like a second skin.",
        author: "Elena S.",
        role: "Interior Architect"
    },
    {
        quote: "There is an industrial elegance to these bottles that matches the intensity of the fragrance inside. This is for people who don't want to be forgotten.",
        author: "Julian K.",
        role: "Collector"
    }
];

export const Testimonials = () => {
    return (
        <section className="bg-white py-24 px-6 md:px-12 lg:px-24 border-t border-neutral-100">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-24">
                    {TESTIMONIALS.map((t, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="space-y-6"
                        >
                            <div className="flex gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <svg key={i} className="w-3 h-3 text-neutral-900" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                            <p className="text-lg md:text-xl font-light italic leading-relaxed text-neutral-800">
                                "{t.quote}"
                            </p>
                            <div>
                                <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-900">{t.author}</h4>
                                <p className="text-[10px] uppercase tracking-widest text-neutral-400">{t.role}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
