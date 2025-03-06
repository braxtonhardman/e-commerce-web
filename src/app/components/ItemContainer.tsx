import Item from "./Item";
import { getAllProducts } from "../actions/item";

async function ItemContainer() {  
  const products = (await getAllProducts()) || [];
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
