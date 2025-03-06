"use client";
import React, { useContext } from "react";
import { CartContext } from "../CartContext";

const OrderPage: React.FC = () => {
  const { items, removeFromCart, updateQuantity } = useContext(CartContext);

  return (
    <div className="flex flex-row w-full h-screen justify-between p-4">
      {/* Shopping Cart Section */}
      <div className="flex flex-col w-3/4 p-4">
        <h1 className="font-sigmar text-3xl mb-4">Shopping Cart</h1>

        {/* Cart Container - Fixed Height with Scroll */}
        <div className="flex flex-col w-full h-[500px] overflow-y-auto p-4">
          {items.length === 0 ? (
            <p className="text-gray-500 text-center">Your cart is empty.</p>
          ) : (
            <div className="flex flex-col space-y-4">
              {items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center p-4 border rounded-md shadow-md"
                >
                  {/* Product Image */}
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name || "Product"}
                      className="w-1/12 h-1/12 border object-cover rounded-md"
                    />
                  )}

                  {/* Product Details */}
                  <div className="flex-1 ml-8">
                    <h2 className="text-lg font-sigmar">{item.name}</h2>
                    <p className="text-sm font-montserrat">{item.desc}</p>
                    <div>
                      {/* Remove Item Text */}
                      <span
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-600 hover:text-red-800 text-sm font-montserrat text- cursor-pointer mt-2"
                      >
                        Delete
                      </span>
                    </div>
                  </div>

                  {/* Quantity and Price in a Row */}
                  <div className="flex items-center justify-center space-x-4 p-2 mr-2">
                    {/* Decrease Quantity Button */}
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="bg-gray-200 px-2 py-1 rounded-md hover:bg-gray-300"
                    >
                      -
                    </button>

                    {/* Quantity Display */}
                    <span className="w-10 text-center  p-1 rounded-md">
                      {item.product_qty}
                    </span>

                    {/* Increase Quantity Button */}
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="bg-gray-200 px-2 py-1 rounded-md hover:bg-gray-300"
                    >
                      +
                    </button>
                    <p className="font-sigmar text-xl w-16 text-right">${item.price}</p>
                  </div>
                </div>
              ))}

            </div>
          )}
        </div>
      </div>

      {/* Order Summary */}
      <div className="flex flex-col w-1/4 p-4 rounded-md h-[300px] shadow-md mt-10">
        <h1 className="font-sigmar text-2xl mb-4">Order Summary</h1>
        <form>
          <button className="w-full bg-black text-white py-2 font-sigmar transition">
            Checkout
          </button>
        </form>
      </div>
    </div>
  );
};

export default OrderPage;