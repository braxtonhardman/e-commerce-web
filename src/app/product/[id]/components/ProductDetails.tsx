"use client";
import React, { useState } from "react";
import { useContext } from "react";
import { CartContext } from "@/src/app/CartContext";

type ProductType = {
  id: number;
  name: string | null;
  desc: string | null;
  price: string | null;
  images?: string[] | null;
  color?: string;
  size?: string;
  image?: string;
};

function ProductDetails({ item }: { item: ProductType }) {
  const defaultImage = "/placeholder.png"; // Replace with actual placeholder image path if needed
  const images = item.images?.length ? item.images : Array(5).fill(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>(item.images?.[0] || defaultImage);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const { addToCart } = useContext(CartContext);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSize) {
      alert("Please select a size before adding to cart!");
      return;
    }
    if (!selectedColor) {
      alert("Please select a color before adding to cart!");
      return;
    }
    // Construct the item to be added to the cart
    const cartItem: ProductType = {
      id: Number(item.id),
      name: item.name,
      desc: item.desc,
      price: item.price,
      color: selectedColor,
      size: selectedSize,
      image: selectedImage,
    };

    // Add the item to the cart
    addToCart(cartItem);
  };

  return (
    <div className="p-3 mt-4">
      <div className="flex flex-col lg:flex-row justify-center items-start gap-16 bg-white rounded-lg">
        {/* Left Side - Image Gallery */}
        <div className="flex flex-col lg:flex-row gap-4 w-full lg:w-1/2">
          {/* Thumbnail Images (5 Slots) */}
          <div className="flex flex-row lg:flex-col justify-center gap-4 lg:gap-4 mb-4 lg:mb-0">
            {images.map((imgUrl, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(imgUrl || defaultImage)}
                className={`w-16 h-16 lg:w-20 lg:h-20 border-2 ${
                  selectedImage === imgUrl ? "border-black" : "border-gray-400"
                } rounded-md`}
              >
                {imgUrl ? (
                  <img src={imgUrl} alt={`Thumbnail ${index}`} className="w-full h-full object-cover rounded-md" />
                ) : (
                  <div className="w-full h-full bg-gray-300 flex items-center justify-center rounded-md">
                    <span className="text-gray-500 text-xs">No Image</span>
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Main Image Display */}
          <div className="w-full lg:w-[600px] h-[400px] lg:h-[600px] bg-gray-300 shadow-md flex justify-center items-center rounded-md">
            {selectedImage !== defaultImage ? (
              <img src={selectedImage} alt={item.name || "Product"} className="w-full h-full object-cover rounded-md" />
            ) : (
              <span className="text-gray-500">No Image Available</span>
            )}
          </div>
        </div>

        {/* Right Side - Product Info */}
        <form onSubmit={handleSubmit} className="w-full lg:w-1/2 flex flex-col items-start font-montserrat">
          <h1 className="font-sigmar text-3xl lg:text-5xl mb-6">{item.name}</h1>
          <p className="text-xl lg:text-2xl text-gray-600 mb-6">{item.desc}</p>
          <p className="text-2xl lg:text-3xl font-bold mb-8">${item.price}</p>

          {/* Color Selection (Box Buttons with Image Previews) */}
          <div className="flex flex-wrap gap-4 mb-8">
            {["Red", "Blue", "Green", "Black", "White"].map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => setSelectedColor(color)}
                className={`w-16 h-16 lg:w-20 lg:h-20 border-2 ${
                  selectedColor === color ? "border-black" : "border-gray-400"
                }`}
              >
                <div
                  className={`w-full h-full bg-cover bg-center rounded-md`}
                  style={{
                    backgroundImage: `url(/images/${color.toLowerCase()}-shirt.jpg)`, // Replace with your actual image paths
                  }}
                />
              </button>
            ))}
          </div>

          {/* Size Selection */}
          <div className="flex gap-4 lg:gap-6 mb-8">
            {["Small", "Medium", "Large"].map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => setSelectedSize(size)}
                className={`px-4 py-2 text-lg border-2 rounded-md font-montserrat ${
                  selectedSize === size ? "bg-black text-white border-black" : "border-gray-400"
                }`}
              >
                {size}
              </button>
            ))}
          </div>

          <button type="submit" className="px-6 py-3 text-lg bg-black text-white font-montserrat rounded-md hover:bg-gray-800">
            Add to Cart
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProductDetails;