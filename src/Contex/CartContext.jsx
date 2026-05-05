import React, { useState, useContext, createContext, Children } from "react";

export const CartContex = createContext();

export const useCart = () => {
    const context = useContext(CartContex);
    if (!context) {
        throw new Error('useCart debe ser usado dentro de un CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (product, quantity) => {
        const itemInCart = cart.find(item => item.id === product.id);
        if (itemInCart) {
            const updatedCart = cart.map(item => item.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            );
            setCart(updatedCart);
        } else {
            setCart(prevCart => [...prevCart, { ...product, quantity }]);
        }
    };

    const clearCart = () => {
        setCart([]);
    };

    const getCartQuantity = () => {
        return cart.reduce((acc, item) => acc + item.quantity, 0);
    };
    const getCartTotal = () => {
        return cart.reduce((acc, item) => acc + item.precio * item.quantity, 0);
    };

    const updateQuantity = (productId, newQuantity) => {
        const itemInCart = cart.find(item => item.id === productId)
        if(!itemInCart) return;

        if (newQuantity >= 1 && newQuantity <= itemInCart.stock) {
            const updatedCart = cart.map(item =>
                item.id === productId ? {...item, quantity: newQuantity} : item
            );
            setCart(updatedCart);
        } else if (newQuantity > itemInCart.stock) {
            alert (`Lo sentimos, solo tenemos ${itemInCart.stock} unidades en stock.`);
        }
    };

    const removeItem = (productId) => {
        setCart(prevCart => prevCart.filter(item => item.id !== productId));
    };

    const getCurrentQuantity = (productId) => {
        const item = cart.find(item => item.id === productId);
        return item ? item.quantity : 0;
    };

    const isInCart = (productId) => {
    return cart.some(item => item.id === productId);
};

    return (
        <CartContex.Provider value={{ cart, addToCart, clearCart, getCartQuantity, getCartTotal, updateQuantity, removeItem, getCurrentQuantity, isInCart }}>
            {children}
        </CartContex.Provider>
    );
};
