"use client";

import { useState } from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen`}
      >
        <div className="flex h-full">
          {/* Sidebar */}
          <Sidebar open={sidebarOpen} />

          {/* Main content */}
          <main
            className={`flex-1 overflow-y-auto bg-zinc-50 dark:bg-black transition-all duration-300`}
            style={{ marginLeft: sidebarOpen ? 256 : 0 }} // 64 * 4 = 256px
          >
            {/* Toggle button */}
            <button
              className="fixed top-4 left-4 z-20 p-2 bg-zinc-900 text-white rounded shadow-lg"
              onClick={() => setSidebarOpen(prev => !prev)}
            >
              {sidebarOpen ? "Hide Sidebar" : "Show Sidebar"}
            </button>

            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
