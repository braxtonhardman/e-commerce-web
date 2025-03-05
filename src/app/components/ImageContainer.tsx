import React from 'react'
import Image from 'next/image'

export default function ImageContainer() {
     return (
       <div className="flex flex-row h-5/6">
         <Image 
           src="/image1.png"
           alt="Image 1"
           width={500} 
           height={500} 
           className="w-1/3 object-cover"
         />
         <Image 
           src="/image2.png"
           alt="Image 2"
           width={500} 
           height={500} 
           className="w-1/3 object-cover"
         />
         <Image 
           src="/image3.png"
           alt="Image 3"
           width={500} 
           height={500} 
           className="w-1/3 object-cover"
           priority // Forces this image to load first
         />
       </div>
     );
   }