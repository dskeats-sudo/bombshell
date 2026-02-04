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
    const [activeCategory, setActiveCategory] = useState<"All" | "Men" | "Women" | "Unisex">(initialCategory);

    useEffect(() => {
        if (initialCategory) {
            setActiveCategory(initialCategory);
        }
    }, [initialCategory]);

    const categories = ["All", "Men", "Women", "Unisex"] as const;

    const filteredProducts = useMemo(() => {
        if (activeCategory === "All") return PRODUCTS;
        return PRODUCTS.filter((p) => p.category === activeCategory);
    }, [activeCategory]);

    const handleAdd = (product: Product, type: CartItemType, price: number) => {
        addToCart(product.id, product.name, type, price);
        console.log(`Added ${product.name} to cart`);
    };

    return (
        <section id="collection" className="bg-white py-16 md:py-24 px-4 md:px-12 lg:px-24 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-8">
                    <div className="space-y-4">
                        <h2 className="text-2xl md:text-5xl font-light tracking-tight text-neutral-900 uppercase">
                            The Collection
                        </h2>
                        <div className="flex flex-wrap gap-4 md:gap-8 pt-4">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`text-[10px] md:text-xs tracking-[0.3em] uppercase transition-all duration-300 pb-1 border-b ${activeCategory === cat
                                            ? "border-neutral-900 text-neutral-900 font-bold"
                                            : "border-transparent text-neutral-400 hover:text-neutral-600"
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="hidden md:flex gap-4">
                        <a
                            href="/find-your-scent"
                            className="text-xs font-medium tracking-[0.2em] uppercase border-b border-neutral-200 pb-1 hover:border-neutral-900 transition-colors"
                        >
                            Match Me
                        </a>
                        <a
                            href="/checkout"
                            className="text-xs font-medium tracking-[0.2em] uppercase border-b border-neutral-200 pb-1 hover:border-neutral-900 transition-colors"
                        >
                            Cart
                        </a>
                    </div>
                </div>

                <motion.div
                    layout
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 lg:gap-12"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredProducts.map((product) => (
                            <motion.div
                                key={product.id}
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.3 }}
                                className="group relative"
                            >
                                <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100 mb-4 rounded-sm">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/5" />

                                    {/* Desktop Quick Add Actions */}
                                    <div className="hidden md:flex absolute bottom-4 left-4 right-4 flex-col gap-2 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                                        <button
                                            onClick={() => handleAdd(product, "Bundle", PRICING.bundle)}
                                            className="w-full py-2 bg-neutral-900 text-white text-[10px] tracking-widest uppercase font-medium hover:bg-neutral-800 transition-colors"
                                        >
                                            Bundle (£{PRICING.bundle})
                                        </button>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleAdd(product, "50ml", PRICING.standard)}
                                                className="flex-1 py-2 bg-white border border-neutral-200 text-neutral-900 text-[10px] tracking-widest uppercase font-medium hover:bg-neutral-50 transition-colors"
                                            >
                                                50ML
                                            </button>
                                            <button
                                                onClick={() => handleAdd(product, "Tester", PRICING.tester)}
                                                className="flex-1 py-2 bg-white border border-neutral-200 text-neutral-900 text-[10px] tracking-widest uppercase font-medium hover:bg-neutral-50 transition-colors"
                                            >
                                                10ML
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <h3 className="text-[10px] md:text-sm font-bold tracking-widest text-neutral-900 uppercase truncate">
                                        {product.name}
                                    </h3>
                                    <p className="text-[8px] md:text-[10px] text-neutral-400 tracking-widest uppercase italic border-b border-transparent group-hover:border-neutral-200 transition-all inline-block">
                                        Inspired by {product.inspiration}
                                    </p>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-[10px] md:text-xs text-neutral-900 font-medium">£{PRICING.standard}</span>
                                        <span className="text-[8px] text-emerald-600 font-medium uppercase tracking-tighter">Value Bundle Available</span>
                                    </div>

                                    {/* Mobile Quick Add (Visible only on mobile) */}
                                    <div className="md:hidden pt-2">
                                        <button
                                            onClick={() => handleAdd(product, "50ml", PRICING.standard)}
                                            className="w-full py-1.5 border border-neutral-900 text-neutral-900 text-[8px] tracking-[0.2em] uppercase font-bold"
                                        >
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
};
