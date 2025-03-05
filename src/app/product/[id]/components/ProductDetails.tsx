"use client";
import React, { useState } from "react";

type ProductInfo = {
  id: number;
  name: string | null;
  desc: string | null;
  price: string | null;
  imageUrls?: string[]; // Array of image URLs
};

function ProductDetails({ item }: { item: ProductInfo }) {
  const defaultImage = "/placeholder.png"; // Replace with actual placeholder image path if needed
  const images = item.imageUrls?.length ? item.imageUrls : Array(5).fill(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>(item.imageUrls?.[0] || defaultImage);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSize) {
      alert("Please select a size before adding to cart!");
      return;
    }
    console.log(`Added ${item.name} (Size: ${selectedSize}) to cart`);
  };

  return (
    <div className="p-3 mt-4">
      <div className="flex justify-center items-start gap-16 bg-white rounded-lg">
        {/* Left Side - Image Gallery */}
        <div className="flex flex-row gap-4 w-1/2">
          {/* Thumbnail Images (5 Slots) */}
          <div className="flex flex-col justify-center gap-4">
            {images.map((imgUrl, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(imgUrl || defaultImage)}
                className={`w-20 h-20 border-2 ${
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
          <div className="w-full h-[600px] bg-gray-300 flex justify-center items-center rounded-md">
            {selectedImage !== defaultImage ? (
              <img src={selectedImage} alt={item.name || "Product"} className="w-full h-full object-cover rounded-md" />
            ) : (
              <span className="text-gray-500">No Image Available</span>
            )}
          </div>
        </div>

        {/* Right Side - Product Info */}
        <form onSubmit={handleSubmit} className="w-1/2 flex flex-col items-start font-montserrat">
          <h1 className="font-sigmar text-5xl mb-6">{item.name}</h1>
          <p className="text-2xl text-gray-600 mb-6">{item.desc}</p>
          <p className="text-3xl font-bold mb-8">${item.price}</p>

          {/* Size Selection */}
          <div className="flex gap-6 mb-8">
            {["Small", "Medium", "Large"].map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => setSelectedSize(size)}
                className={`px-6 py-3 text-lg border-2 rounded-md font-montserrat ${
                  selectedSize === size ? "bg-black text-white border-black" : "border-gray-400"
                }`}
              >
                {size}
              </button>
            ))}
          </div>

          <button type="submit" className="px-8 py-3 text-lg bg-black text-white font-montserrat rounded-md hover:bg-gray-800">
            Add to Cart
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProductDetails;