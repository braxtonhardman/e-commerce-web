import React from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'

function Navbar() {
  const {data: session } = useSession();
  return (
    <div className="flex flex-row shadow-md items-center p-2">
        <h1 className="m-2 mr-10">Surf and Saddle</h1>
        <ol className="flex flex-row items-center justify-between">
          <li className="m-2">
            <Link href="/">Home</Link>
          </li>
          <li className="m-2">
            <Link href="/about" className="">About</Link>
          </li>
      </ol>  
      
      <div className="flex flex-row flex-grow justify-end align-center">
        {!session ? (
          // If session is null, show SignIn button
          <div className="flex align-center m-2 bg-neutral-950 hover:bg-neutral-600 rounded-md">
            <Link href="/api/auth/signin" className="text-white p-2">SignIn</Link>
          </div>
        ) : (
          // If session exists, show the user profile or logout option
          <div className="flex flex-row">
            <div className="flex align-center m-2 bg-neutral-950 hover:bg-neutral-600 rounded-md">
              <Link href="/dashboard" className="text-white p-2">profile</Link>
            </div>
            <div className="flex align-center p-2 m-2 bg-neutral-950 hover:bg-neutral-600 rounded-md">
              <button className="text-white" onClick={() => {signOut()}}>Sign Out</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar
