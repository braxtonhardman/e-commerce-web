import React from 'react'
import Link from 'next/link'

interface ItemProps { 
  imageUrl: string, 
  name: string, 
  price: string
}

function Item({ imageUrl, name, price }: ItemProps) {
  return (
    <div className="flex flex-col shadow-sm border  overflow-hidden hover:shadow-blue-500 transition-shadow duration-300">
      
      {/* Image Section */}
      <img 
        src={imageUrl} 
        alt={name} 
        className="object-cover w-full h-64" 
      />

      {/* Content Section */}
      <div className="p-4">
        {/* Name and Price */}
        <div className="flex justify-between items-center">
          <p className="font-semibold text-lg text-gray-800">{name}</p>
          <p className="font-bold text-lg text-gray-900">${price}</p>
        </div>

    
      </div>
    </div>
  )
}

export default Item;
