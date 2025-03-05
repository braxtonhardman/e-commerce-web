"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { FaUser, FaShoppingCart } from 'react-icons/fa';

function Navbar() {
  const { data: session } = useSession()
  const [isOpen, setIsOpen] = useState(false)


  return (
    <div
      className="flex flex-row items-center p-2 fixed w-full transition-all bg-white"
    >
      <Link href="/"><h1 className="m-2 ml-10 font-sigmar text-4xl">Surf and Saddle</h1></Link>

      <div className="flex flex-row flex-grow justify-end align-center">
        {!session ? (
          // If session is null, show SignIn button
          <div className="flex items-center m-2 hover:bg-neutral-600 rounded-md">
            <Link href="/api/auth/signin" className="p-2 bg-black text-white font-sigmar hover:bg-gray-700">
              Login / SignUp
            </Link>
          </div>
        ) : (
          
          // If session exists, show the user profile or logout option           
            <div className="flex items-center m-2" 
                 onMouseEnter={() => setIsOpen(true)}
                 onMouseLeave={() => setIsOpen(false)}
            >
        
              {isOpen ? (
                  <div className="flex flex-row ">
                    <Link href="/dashboard" className="block mr-2 px-4 py-2 text-sm bg-black text-white font-sigmar hover:bg-gray-700">
                      Dashboard
                    </Link>

                    <button 
                    onClick={() => signOut()} 
                    className="w-full text-left px-4 py-2 text-sm  bg-black text-white font-sigmar hover:bg-gray-700"
                    >
                      Sign Out
                    </button>
                  </div>
                                  
              ): (
                <FaUser className="text-2xl" />
              )}
              
            </div>
        )}
        <div className="flex items-center m-2 mr-10 hover:bg-neutral-600 rounded-md">
          <Link href="/cart" className="p-2">
            <FaShoppingCart
              className="text-2xl 'text-black"
            />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar
