"use client"; 
import React, { createContext, useState, useEffect } from 'react';

// CartContext with default values
export const CartContext = createContext({
    items: [], 
    addToCart: (item) => {}, 
    removeFromCart: () => {}, 
});

function CartProvider({children}) {
    const [cartItems, setCartItems] = useState([]);

    // Initialize cart from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            setCartItems(JSON.parse(savedCart));  // Parse and set cart items from localStorage
        }
    }, []);

    // Update localStorage whenever cartItems changes
    useEffect(() => {
        if (cartItems.length > 0) {
            localStorage.setItem('cart', JSON.stringify(cartItems)); // Save cartItems to localStorage
        }
    }, [cartItems]);

    // Add item to cart
    const addToCart = (item) => {
        setCartItems((prevItems) => {
            const existingItemIndex = prevItems.findIndex((element) => element.product_id === item.product_id);

            if (existingItemIndex !== -1) {
                const updatedItems = [...prevItems];
                updatedItems[existingItemIndex] = {
                    ...updatedItems[existingItemIndex],
                    product_qty: updatedItems[existingItemIndex].product_qty + 1,
                };
                return updatedItems;
            } else {
                return [...prevItems, { ...item, product_qty: 1 }];
            }
        });
    };

    // Remove item from cart
    const removeFromCart = (itemId) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.product_id !== itemId));
    };

    // Provide cartItems, addToCart, and removeFromCart to the rest of the app
    const contextValue = {
        items: cartItems, 
        addToCart, 
        removeFromCart
    };

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
}

export default CartProvider;