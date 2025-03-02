"use client";

import "./globals.css";
import NavBar from "./components/NavBar"
import { SessionProvider } from "next-auth/react";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <NavBar />
        </SessionProvider>
        {children}
      </body>
    </html>
  );
}
