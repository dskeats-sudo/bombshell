"use client";

import React from "react";
import { PRODUCTS, PRICING } from "@/data/products";
import { useCart, CartItemType } from "@/context/CartContext";

export const ProductGrid = () => {
    const { addToCart } = useCart();

    const handleAdd = (product: any, type: CartItemType, price: number) => {
        addToCart(product.id, product.name, type, price);
        // Premium silent addition for now
        console.log(`Added ${product.name} to cart`);
    };

    return (
        <section className="bg-white py-24 px-6 md:px-12 lg:px-24">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                    <div className="space-y-4">
                        <h2 className="text-3xl md:text-5xl font-light tracking-tight text-neutral-900 uppercase">
                            The Collection
                        </h2>
                        <p className="text-neutral-500 max-w-lg font-light leading-relaxed">
                            Discover our library of fragrances. Each bottle is a tribute to iconic scents,
                            meticulously re-engineered for intensity and resonance.
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <a
                            href="/find-your-scent"
                            className="text-xs font-medium tracking-[0.2em] uppercase border-b border-neutral-200 pb-1 hover:border-neutral-900 transition-colors"
                        >
                            Find Your Scent
                        </a>
                        <a
                            href="/checkout"
                            className="text-xs font-medium tracking-[0.2em] uppercase border-b border-neutral-200 pb-1 hover:border-neutral-900 transition-colors"
                        >
                            Checkout
                        </a>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
                    {PRODUCTS.map((product) => (
                        <div key={product.id} className="group">
                            <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100 mb-6">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/5" />

                                {/* Quick Add Actions */}
                                <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-2 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                                    <button
                                        onClick={() => handleAdd(product, "Bundle", PRICING.bundle)}
                                        className="w-full py-2 bg-neutral-900 text-white text-[10px] tracking-widest uppercase font-medium hover:bg-neutral-800 transition-colors"
                                    >
                                        Bundle (£{PRICING.bundle}) - Best Value
                                    </button>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleAdd(product, "50ml", PRICING.standard)}
                                            className="flex-1 py-2 bg-white border border-neutral-200 text-neutral-900 text-[10px] tracking-widest uppercase font-medium hover:bg-neutral-50 transition-colors"
                                        >
                                            50ML (£{PRICING.standard})
                                        </button>
                                        <button
                                            onClick={() => handleAdd(product, "Tester", PRICING.tester)}
                                            className="flex-1 py-2 bg-white border border-neutral-200 text-neutral-900 text-[10px] tracking-widest uppercase font-medium hover:bg-neutral-50 transition-colors"
                                        >
                                            Tester (£{PRICING.tester})
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <h3 className="text-sm font-medium tracking-wide text-neutral-900 uppercase">
                                {product.name}
                            </h3>
                            <p className="text-[10px] text-neutral-400 tracking-widest uppercase mb-1">
                                Inspired by {product.inspiration}
                            </p>
                            <p className="text-xs text-neutral-500 font-light flex gap-2">
                                <span>£{PRICING.standard}</span>
                                <span className="text-neutral-300">/</span>
                                <span className="text-emerald-600 font-normal">Save with Bundle</span>
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
