// app/layout.tsx
'use client'; // Diperlukan karena kita menggunakan hook usePathname

import { Geist, Geist_Mono } from "next/font/google";
import { usePathname } from "next/navigation";
import "./globals.css";
import Navbar from "./components/Navbar"; 

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  // Menentukan halaman mana saja yang tidak boleh memunculkan Navbar utama
  const isAuthOrAdminPage = pathname.startsWith('/admin') || pathname.startsWith('/login');

  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-sika-dark">
        {/* Jika berada di halaman admin atau login, Navbar otomatis tidak dirender */}
        {!isAuthOrAdminPage && <Navbar />}
        
        {/* Konten halaman utama */}
        <main className="flex-grow">
          {children}
        </main>
      </body>
    </html>
  );
}