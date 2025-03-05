import React from 'react'
import Link from 'next/link'

interface ItemProps { 
  imageUrl: string, 
  name: string, 
  price: string,
  id: number
}

function Item({ id, imageUrl, name, price }: ItemProps) {
  
  return (
    <Link href={`/product/${id}`} className="block">
      <div className="flex flex-col h-auto shadow-md overflow-hidden hover:shadow-blue-500 transition-shadow duration-300">
        
        {/* Image Section */}
        <img 
          src={imageUrl} 
          alt={name} 
          className="object-cover w-full h-5/6" 
        />

        {/* Content Section */}
        <div className="flex w-full h-1/6 justify-between items-center p-4 border-t">
          <p className="font-semibold text-lg text-gray-800 font-montserrat">{name}</p>
          <p className="font-bold text-lg text-gray-900 font-montserrat">${price}</p>
        </div>

      </div>
    </Link>
  )
}

export default Item;