"use client";

import React, { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export const Header = () => {
    const { setIsCartOpen, cart } = useCart();
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`fixed top-0 left-0 right-0 z-[90] transition-all duration-500 px-6 md:px-12 py-4 ${isScrolled ? "bg-black/80 backdrop-blur-md py-3" : "bg-transparent"
                }`}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <Link href="/" className="text-white text-lg font-light tracking-[0.4em] uppercase">
                    Bombshell<span className="font-bold">Intense</span>
                </Link>

                <div className="flex items-center gap-8">
                    <nav className="hidden md:flex items-center gap-8">
                        <Link href="/find-your-scent" className="text-[10px] text-white/60 hover:text-white uppercase tracking-[0.2em] transition-colors">
                            Match Me
                        </Link>
                        <Link href="/checkout" className="text-[10px] text-white/60 hover:text-white uppercase tracking-[0.2em] transition-colors">
                            Checkout
                        </Link>
                    </nav>

                    <button
                        onClick={() => setIsCartOpen(true)}
                        className="relative group flex items-center gap-3 text-white"
                    >
                        <span className="hidden md:block text-[10px] uppercase tracking-[0.2em] font-medium opacity-60 group-hover:opacity-100 transition-opacity">
                            Library
                        </span>
                        <div className="relative">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            <AnimatePresence>
                                {cartCount > 0 && (
                                    <motion.span
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        exit={{ scale: 0 }}
                                        className="absolute -top-1 -right-1 w-3 h-3 bg-white text-black text-[7px] font-bold flex items-center justify-center rounded-full"
                                    >
                                        {cartCount}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </div>
                    </button>
                </div>
            </div>
        </motion.header>
    );
};
