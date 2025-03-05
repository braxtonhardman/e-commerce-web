"use client";

import React from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function SignInPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (e: any) => {
        e.preventDefault(); // Prevent the default form submission
    
        const response = await signIn("credentials", {email: email, password: password})
        if(response?.error) { 
            setError("Username or Password is Incorrect")
        }
    };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-1/3 h-1/3">
        <h2 className="text-2xl font-bold text-center mb-4 font-sigmar">Log In</h2>
        <form onSubmit={handleSubmit} className="flex flex-col">
            {error && (
                <div className="text-red-500 text-center mt-2">{error}</div>
            )}
            <label htmlFor="email" className="font-sigmar">Email</label>
            <input type="email" className="border rounded-sm mb-2 p-2" onChange={(e) => setEmail(e.target.value)}/>

            <label htmlFor="password" className="font-sigmar">Password</label>
            <input type="password" className="border rounded-sm mb-2 p-2" onChange={(e) => setPassword(e.target.value)} />

            <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition mt-3 font-sigmar"
            >
                Login
            </button>
        </form>

       

        <br />

        <p className="mt-4 text-center text-sm text-gray-600 font-montserrat">
          Don't have an account? <Link href="/signup" className="text-blue-500 font-sigmar">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}