"use client";

import "./globals.css";
import NavBar from "./components/NavBar"
import { SessionProvider } from "next-auth/react";
import CartProvider from "./CartContext";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        
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
