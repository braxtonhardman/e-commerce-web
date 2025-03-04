"use client";

import "./globals.css";
import NavBar from "./components/NavBar"
import { SessionProvider } from "next-auth/react";
import CartProvider from "./CartContext";
import { Sigmar } from "next/font/google"

const sigmar = Sigmar({
  subsets: ["latin"],
  variable: "--font-sigmar",
  weight: "400"
})
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sigmar.variable}`}>
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
