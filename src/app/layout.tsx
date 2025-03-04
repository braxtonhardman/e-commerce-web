"use client";

import "./globals.css";
import NavBar from "./components/NavBar"
import { SessionProvider } from "next-auth/react";
import CartProvider from "./CartContext";
import ImageContainer from "./components/ImageContainer";
import { Oswald } from "next/font/google"

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  weight: ["300", "400", "500"]
})
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${oswald.variable}`}>
        <ImageContainer /> 
        <CartProvider>
          <SessionProvider>
            <NavBar />
            {children}
          </SessionProvider>
        </CartProvider>
        
      </body>
    </html>
  );
}
