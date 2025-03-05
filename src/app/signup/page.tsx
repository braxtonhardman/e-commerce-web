"use client";
import React, { useState } from 'react';
import { createUser } from '../actions/user';
import { useRouter } from 'next/navigation';

function SignUpPage() {
    const router = useRouter();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault(); // Prevent the default form submission

    try {
      const response = await createUser(firstName, lastName, email, password, confirmPassword);
      
      // Type Narrowing - Check if response is an ErrorResponse
      if ('error' in response) {
        setErrorMessage(response.error); // Handle errors (e.g., passwords do not match)
      } else {
        router.push("/api/auth/signin")
        //console.log('User created successfully', response);
      }
    } catch (error) {
      console.error('Error creating user:', error);
      setErrorMessage('An error occurred while creating your account.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-1/3 h-1/3">
        <h2 className="text-2xl font-bold text-center mb-4 font-sigmar">Sign Up</h2>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="flex flex-row justify-between mb-2">
            <input 
              type="text" 
              placeholder="First Name" 
              className="w-2/5 border rounded-sm p-2 font-sigmar"
              value={firstName} 
              onChange={(e) => setFirstName(e.target.value)} 
            />
            <input 
              type="text" 
              placeholder="Last Name" 
              className="w-2/5 border rounded-sm p-2 font-sigmar"
              value={lastName} 
              onChange={(e) => setLastName(e.target.value)} 
            />
          </div>

          <label htmlFor="email" className="font-sigmar">Email</label>
          <input 
            type="email" 
            className="border rounded-sm p-2 mb-2"
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />

          <label htmlFor="password" className="font-sigmar">Password</label>
          <input 
            type="password" 
            className="border rounded-sm p-2 mb-2"
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />

          <label htmlFor="confirmPassword" className="font-sigmar">Confirm Password</label>
          <input 
            type="password" 
            className="border rounded-sm p-2 mb-2"
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
          />

          {errorMessage && (
            <div className="text-red-500 text-center mt-2">{errorMessage}</div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition mt-3 font-sigmar"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUpPage;