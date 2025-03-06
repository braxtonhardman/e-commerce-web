"use client";
import React, { createContext, useState, useEffect, ReactNode } from "react";

// Define the structure of a product
type ProductType = {
  id: number;
  name: string | null;
  desc: string | null;
  price: string | null;
  images?: string[] | null;
  color?: string;
  size?: string;
  image?: string;
  product_qty?: number;
};

// Define the structure of the cart context
interface CartContextType {
  items: ProductType[];
  addToCart: (item: ProductType) => void;
  removeFromCart: (itemId: number) => void;
  updateQuantity: (itemId: number, qty:number) => void; 
}

// Create the CartContext with a default value
export const CartContext = createContext<CartContextType>({
  items: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {}
});

// Define the props for the provider component
interface CartProviderProps {
  children: ReactNode;
}

const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<ProductType[]>([]);

  // Initialize cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart) as ProductType[]);
    }
  }, []);

  // Update localStorage whenever cartItems changes
  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  // Add item to cart
  const addToCart = (item: ProductType) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (element) => element.id === item.id
      );

      if (existingItemIndex !== -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          product_qty: (updatedItems[existingItemIndex].product_qty || 1) + 1,
        };
        return updatedItems;
      } else {
        return [...prevItems, { ...item, product_qty: 1 }];
      }
    });
  };

  // Remove item from cart
  const removeFromCart = (itemId: number) => {
    setCartItems((prevItems) => {
      const updatedCart = prevItems.filter((item) => item.id !== itemId);
      localStorage.setItem("cart", JSON.stringify(updatedCart)); // Update localStorage
      return updatedCart;
    });
  };

  const updateQuantity = (itemId: number, qty: number) => {
    setCartItems((prevItems) => {
      // Find the index of the item in the cart
      const itemIndex = prevItems.findIndex((element) => element.id === itemId);
  
      if (itemIndex === -1) return prevItems; // If the item is not found, return the previous items array unchanged
  
      const updatedItems = [...prevItems]; // Copy the array to avoid mutating the state directly
  
      // Update the quantity of the item at the found index
      let updatedQuantity; 
      if(updatedItems[itemIndex].product_qty) { 
        updatedQuantity = updatedItems[itemIndex].product_qty + qty;
         // If the updated quantity is 0, remove the item from the cart
        if (updatedQuantity <= 0) {
            updatedItems.splice(itemIndex, 1);
        } else {
            updatedItems[itemIndex] = {
            ...updatedItems[itemIndex],
            product_qty: updatedQuantity, // Update the quantity at the specified index
            };
        }
      } else { 
        return prevItems;
      }
      localStorage.setItem('cart', JSON.stringify(updatedItems));
      return updatedItems; // Return the updated cart items
    });
  };

  const contextValue: CartContextType = {
    items: cartItems,
    addToCart,
    removeFromCart,
    updateQuantity
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;