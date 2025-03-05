"use client";

import Item from "./Item";
import { useEffect, useState} from "react";
import { getAllProducts } from "../actions/item";

  
type ProductType = {
  id: number;
  name: string | null;
  desc: string | null;
  price: string | null;
  images: string[] | null;
};

type ProductArray = (ProductType | null)[]; // Array of ProductType or null

function ItemContainer() {  
  const [products, setProducts] = useState<ProductArray>([]); // Properly type the state

  useEffect(() => {
    async function getProducts() {
      const current_products = await getAllProducts();
      if (current_products) {
        setProducts(current_products); // Update state with the fetched products
      } else { 
        return 
      }
    }
    getProducts();
  }, []);

  return (
    <div className="flex flex-col items-center">
      <h1 className="font-sigmar text-3xl text-black p-4 ml-5 mt-5">New Releases</h1>
      <div className="w-5/6 h-screen grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7 ml-5">
      {products.map((item) => {
        // Make sure item is not null
        if (item) {
          return (
            <Item
              key={item.id}
              id={Number(item.id)}
              imageUrl={item?.images?.[0] || ""}
              name={item.name || ""}
              price={item.price || ""}
            />
          );
        }
        return null; // or render a fallback
      })}
      </div>
    </div>
  
)}

export default ItemContainer
