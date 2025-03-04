"use client"; 
import React from 'react'
import { createContext } from 'react'
import { useState } from 'react'

const CartContext = createContext({
    items: [], 
    addToCart: () => {}, 
    removeFromCart: () => {}, 

})
function CartProvider({children}) {

    const [cartItems, setCartItems] = useState([])

    const addToCart = (item) => {
        setCartItems((prevItems) => {
            // Check if the item already exists
            const existingItemIndex = prevItems.findIndex((element) => element.product_id === item.product_id);
    
            if (existingItemIndex !== -1) {
                // Item exists, update its quantity
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

    const removeFromCart = (itemId) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.product_id !== itemId));
    };

    const contextValue = {
        items: cartItems, 
        addToCart, 
        removeFromCart
    }

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider
