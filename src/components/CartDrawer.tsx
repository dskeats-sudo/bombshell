"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

export const CartDrawer = () => {
    const { cart, removeFromCart, isCartOpen, setIsCartOpen, total } = useCart();

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsCartOpen(false)}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-[#050505] text-white z-[101] shadow-2xl flex flex-col"
                    >
                        <div className="p-8 flex items-center justify-between border-b border-white/10">
                            <h2 className="text-xl font-light tracking-[0.2em] uppercase">Your Collection</h2>
                            <button
                                onClick={() => setIsCartOpen(false)}
                                className="text-white/40 hover:text-white transition-colors"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-8 space-y-8">
                            {cart.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center space-y-4 opacity-40">
                                    <p className="text-[10px] tracking-[0.3em] uppercase">The library is empty</p>
                                    <button
                                        onClick={() => setIsCartOpen(false)}
                                        className="text-white border-b border-white/20 pb-1 text-xs"
                                    >
                                        Return to shop
                                    </button>
                                </div>
                            ) : (
                                cart.map((item) => (
                                    <div key={item.id} className="flex gap-6 group">
                                        <div className="w-20 aspect-[3/4] bg-neutral-900 overflow-hidden">
                                            {/* Placeholder for small product icon if needed */}
                                            <div className="w-full h-full flex items-center justify-center text-[10px] text-white/20 italic">
                                                B.I
                                            </div>
                                        </div>
                                        <div className="flex-1 space-y-1">
                                            <div className="flex justify-between">
                                                <h3 className="text-sm font-medium tracking-wider uppercase">{item.name}</h3>
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="text-[10px] text-white/20 hover:text-white transition-colors"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                            <p className="text-[10px] text-white/40 uppercase tracking-widest">
                                                {item.type} × {item.quantity}
                                            </p>
                                            <p className="text-sm font-light">£{(item.price * item.quantity).toFixed(2)}</p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {cart.length > 0 && (
                            <div className="p-8 border-t border-white/10 space-y-6">
                                <div className="flex justify-between items-end">
                                    <div>
                                        <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] mb-1">Subtotal</p>
                                        <p className="text-2xl font-light tracking-tighter">£{total.toFixed(2)}</p>
                                    </div>
                                    <p className="text-[10px] text-emerald-400 uppercase tracking-widest pb-1">
                                        Free Express Shipping
                                    </p>
                                </div>
                                <Link
                                    href="/checkout"
                                    onClick={() => setIsCartOpen(false)}
                                    className="block w-full py-4 bg-white text-black text-center text-xs tracking-[0.3em] uppercase font-bold hover:bg-neutral-200 transition-colors"
                                >
                                    Proceed to Checkout
                                </Link>
                                <button
                                    onClick={() => setIsCartOpen(false)}
                                    className="w-full text-[10px] text-white/40 uppercase tracking-widest hover:text-white transition-colors"
                                >
                                    Continue Exploring
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
