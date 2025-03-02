"use client";

import Item from "./Item";

const items = [
  {
    id: "1",
    imageUrl: "https://sv6jhff16o7nq1g9.public.blob.vercel-storage.com/JohnJohn%20-dOH24eVIoBertWcyF9RfLJqgNqiIex.jpeg",
    name: "First Item",
    price: "10.99"
  },
  {
    id: "2",
    imageUrl: "https://sv6jhff16o7nq1g9.public.blob.vercel-storage.com/JohnJohn%20-dOH24eVIoBertWcyF9RfLJqgNqiIex.jpeg",
    name: "Second Item",
    price: "5.99"
  },
  {
    id: "3",
    imageUrl: "https://sv6jhff16o7nq1g9.public.blob.vercel-storage.com/JohnJohn%20-dOH24eVIoBertWcyF9RfLJqgNqiIex.jpeg",
    name: "Third Item",
    price: "8.99"
  },
  {
    id: "4",
    imageUrl: "https://sv6jhff16o7nq1g9.public.blob.vercel-storage.com/JohnJohn%20-dOH24eVIoBertWcyF9RfLJqgNqiIex.jpeg",
    name: "Fourth Item",
    price: "11.99"
  },
  {
    id: "5",
    imageUrl: "https://sv6jhff16o7nq1g9.public.blob.vercel-storage.com/JohnJohn%20-dOH24eVIoBertWcyF9RfLJqgNqiIex.jpeg",
    name: "Fith Item",
    price: "15.99"
  },
  {
    id: "6",
    imageUrl: "https://sv6jhff16o7nq1g9.public.blob.vercel-storage.com/JohnJohn%20-dOH24eVIoBertWcyF9RfLJqgNqiIex.jpeg",
    name: "Sixth Item",
    price: "2.99"
  },
]

function ItemContainer() {  

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 m-2">
      {items.map((item) => (
        <Item key={item.id} imageUrl={item.imageUrl} name={item.name} price={item.price} />
      ))}
    </div>
  )
}

export default ItemContainer
