"use client";

import React, { useState, useMemo, useEffect } from "react";
import { PRODUCTS, PRICING, Product } from "@/data/products";
import { useCart, CartItemType } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";

interface ProductGridProps {
    initialCategory?: "All" | "Men" | "Women" | "Unisex";
}

export const ProductGrid = ({ initialCategory = "All" }: ProductGridProps) => {
    const { addToCart } = useCart();
    // Default to null to gate the view until a selection is made (if we want to force it)
    const [activeCategory, setActiveCategory] = useState<"All" | "Men" | "Women" | "Unisex" | null>(null);

    useEffect(() => {
        if (initialCategory && initialCategory !== "All") {
            setActiveCategory(initialCategory);
        }
    }, [initialCategory]);

    const categories = ["Men", "Women", "Unisex"] as const;

    const filteredProducts = useMemo(() => {
        if (!activeCategory) return [];
        if (activeCategory === "All") return PRODUCTS;
        return PRODUCTS.filter((p) => p.category === activeCategory);
    }, [activeCategory]);

    const handleAdd = (product: Product, type: CartItemType, price: number) => {
        addToCart(product.id, product.name, type, price);
        console.log(`Added ${product.name} to cart`);
    };

    return (
        <section id="collection" className="bg-white py-16 md:py-24 px-4 md:px-12 lg:px-24 overflow-hidden border-t border-neutral-100">
            <div className="max-w-7xl mx-auto">
                <AnimatePresence mode="wait">
                    {!activeCategory ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="py-12 flex flex-col items-center justify-center space-y-4 opacity-50"
                        >
                            <div className="w-1 h-12 bg-neutral-200" />
                            <p className="text-[10px] tracking-[0.4em] uppercase text-neutral-400">Select a preference above to view the collection</p>
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="space-y-16"
                        >
                            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-neutral-100 pb-8">
                                <div className="space-y-4">
                                    <h2 className="text-xl md:text-3xl font-light tracking-tight text-neutral-900 uppercase">
                                        The <span className="font-bold">Library</span>
                                    </h2>
                                    <div className="flex flex-wrap gap-4 md:gap-8 pt-2">
                                        {["All", ...categories].map((cat) => (
                                            <button
                                                key={cat}
                                                onClick={() => setActiveCategory(cat as any)}
                                                className={`text-[9px] md:text-[11px] tracking-[0.3em] uppercase transition-all duration-300 pb-1 border-b ${activeCategory === cat
                                                    ? "border-neutral-900 text-neutral-900 font-bold"
                                                    : "border-transparent text-neutral-400 hover:text-neutral-600"
                                                    }`}
                                            >
                                                {cat}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <motion.div
                                layout
                                className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-12"
                            >
                                <AnimatePresence mode="popLayout">
                                    {filteredProducts.map((product) => (
                                        <motion.div
                                            key={product.id}
                                            layout
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{ duration: 0.4 }}
                                            className="group relative"
                                        >
                                            <div className="relative aspect-[3/4] overflow-hidden bg-neutral-50 mb-3 rounded-xs">
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="object-cover w-full h-full transition-transform duration-1000 group-hover:scale-105"
                                                />
                                                <div className="absolute inset-0 bg-white/0 transition-colors group-hover:bg-white/10" />

                                                {/* Hidden Actions until Hover (Simplified) */}
                                                <div className="absolute inset-x-0 bottom-0 p-2 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-white/95 backdrop-blur-sm z-10 border-t border-neutral-100">
                                                    <div className="flex flex-col gap-1">
                                                        <button
                                                            onClick={() => handleAdd(product, "50ml", PRICING.standard)}
                                                            className="w-full py-2 bg-neutral-900 text-white text-[8px] tracking-widest uppercase font-bold hover:bg-black transition-colors"
                                                        >
                                                            Buy Now (£{PRICING.standard})
                                                        </button>
                                                        <button
                                                            onClick={() => handleAdd(product, "Bundle", PRICING.bundle)}
                                                            className="w-full py-2 border border-neutral-200 text-neutral-900 text-[8px] tracking-widest uppercase hover:bg-neutral-50 transition-colors"
                                                        >
                                                            Bundle Option
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="space-y-0.5">
                                                <h3 className="text-[9px] md:text-[10px] font-bold tracking-widest text-neutral-900 uppercase truncate">
                                                    {product.name}
                                                </h3>
                                                <p className="text-[7px] md:text-[8px] text-neutral-400 tracking-[0.2em] uppercase italic">
                                                    {product.inspiration} Match
                                                </p>
                                                <div className="flex items-center justify-between pt-1">
                                                    <span className="text-[9px] text-neutral-900 font-medium">£{PRICING.standard}</span>
                                                    <span className="text-[6px] text-emerald-600 bg-emerald-50 px-1 py-0.5 uppercase tracking-tighter">Premium</span>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};
