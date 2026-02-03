"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type CartItemType = "50ml" | "Tester" | "Bundle";

interface CartItem {
    id: string;
    productId: string;
    name: string;
    type: CartItemType;
    price: number;
    quantity: number;
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (productId: string, name: string, type: CartItemType, price: number) => void;
    removeFromCart: (itemId: string) => void;
    clearCart: () => void;
    total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>([]);

    useEffect(() => {
        const savedCart = localStorage.getItem("bombshell-cart");
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("bombshell-cart", JSON.stringify(cart));
    }, [cart]);

    const addToCart = (productId: string, name: string, type: CartItemType, price: number) => {
        setCart((prev) => {
            const existing = prev.find((item) => item.productId === productId && item.type === type);
            if (existing) {
                return prev.map((item) =>
                    item.productId === productId && item.type === type
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { id: `${productId}-${type}`, productId, name, type, price, quantity: 1 }];
        });
    };

    const removeFromCart = (itemId: string) => {
        setCart((prev) => prev.filter((item) => item.id !== itemId));
    };

    const clearCart = () => setCart([]);

    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, total }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used within a CartProvider");
    return context;
};
