"use client";

import React from "react";
import { useCart } from "@/context/CartContext";
import { PRODUCTS, PRICING } from "@/data/products";

export default function Checkout() {
    const { cart, removeFromCart, total } = useCart();

    const getIncentive = () => {
        const hasBundle = cart.some(item => item.type === "Bundle");
        if (!hasBundle && cart.find(item => item.type === "50ml")) {
            return "Upgrade to Bundle for only £10 more and get extra value!";
        }
        return null;
    };

    return (
        <main className="min-h-screen bg-white text-neutral-900 py-24 px-6 md:px-12 lg:px-24">
            <div className="max-w-4xl mx-auto">
                <header className="mb-16 space-y-4">
                    <h1 className="text-3xl md:text-5xl font-light tracking-tight uppercase">Your Cart</h1>
                    <a href="/" className="text-[10px] tracking-[0.2em] uppercase text-neutral-400 hover:text-neutral-900 transition-colors">
                        ← Continue Shopping
                    </a>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                    <div className="lg:col-span-2 space-y-8">
                        {cart.length === 0 ? (
                            <div className="py-24 text-center border-y border-neutral-100">
                                <p className="text-neutral-400 text-sm tracking-widest uppercase">Your cart is empty</p>
                            </div>
                        ) : (
                            cart.map(item => (
                                <div key={item.id} className="flex gap-6 pb-8 border-b border-neutral-100">
                                    <div className="w-24 aspect-[3/4] bg-neutral-50 overflow-hidden">
                                        {/* Ideally find the product for image */}
                                        <img
                                            src={PRODUCTS.find(p => p.id === item.productId)?.image}
                                            alt={item.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex-1 flex flex-col justify-between">
                                        <div>
                                            <h3 className="text-sm font-medium uppercase tracking-wider">{item.name}</h3>
                                            <p className="text-[10px] text-neutral-400 uppercase tracking-widest mt-1">{item.type}</p>
                                        </div>
                                        <div className="flex justify-between items-end">
                                            <p className="text-xs font-light">Qty: {item.quantity}</p>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-[10px] tracking-widest uppercase text-red-400 hover:text-red-600"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-medium">£{item.price * item.quantity}</p>
                                    </div>
                                </div>
                            ))
                        )}

                        {getIncentive() && (
                            <div className="bg-neutral-50 p-6 rounded-sm border border-neutral-100 italic text-sm text-neutral-600">
                                ✨ {getIncentive()}
                            </div>
                        )}
                    </div>

                    <div className="space-y-8">
                        <div className="bg-neutral-50 p-8 space-y-6">
                            <h2 className="text-xs font-bold tracking-[0.2em] uppercase border-b border-neutral-200 pb-4">Summary</h2>
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="font-light text-neutral-500">Subtotal</span>
                                    <span>£{total}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="font-light text-neutral-500">Shipping</span>
                                    <span className="text-neutral-400">Calculated at next step</span>
                                </div>
                            </div>
                            <div className="flex justify-between text-lg font-medium border-t border-neutral-200 pt-4">
                                <span>Total</span>
                                <span>£{total}</span>
                            </div>
                            <button className="w-full py-4 bg-neutral-900 text-white text-xs tracking-[0.2em] uppercase font-bold hover:bg-neutral-800 transition-colors">
                                Checkout
                            </button>
                        </div>
                        <p className="text-[10px] text-neutral-400 text-center tracking-widest leading-loose">
                            SECURE PAYMENTS POWERED BY STRIPE. PROCESSED IN GBP £.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
