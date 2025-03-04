import React, { useState } from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { FaUser, FaShoppingCart } from 'react-icons/fa'

function Navbar() {
  const { data: session } = useSession()


  return (
    <div
      className="flex flex-row items-center p-2 fixed w-full transition-all bg-white"
    >
      <h1 className="m-2 ml-10 font-sigmar text-4xl">Surf and Saddle</h1>

      <div className="flex flex-row flex-grow justify-end align-center">
        {!session ? (
          // If session is null, show SignIn button
          <div className="flex items-center m-2 hover:bg-neutral-600 rounded-md">
            <Link href="/api/auth/signin"className="p-2">
              <FaUser className="text-2xl text-black"/>
            </Link>
          </div>
        ) : (
          // If session exists, show the user profile or logout option
          <div className="flex flex-row">
            <div className="flex items-center m-2 bg-neutral-950 hover:bg-neutral-600 rounded-md">
              <Link
                href="/dashboard"
                className="p-2 'text-black"
              >
                profile
              </Link>
            </div>
            <div className="flex align-center p-2 m-2 bg-neutral-950 hover:bg-neutral-600 rounded-md">
              <button
                className="p-2 text-black"
                onClick={() => { signOut() }}
              >
                Sign Out
              </button>
            </div>
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
