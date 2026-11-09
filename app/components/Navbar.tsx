'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import NextLink from 'next/link';

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: 'BERANDA', path: '/' },
    { name: 'TENTANG KAMI', path: '/tentang-kami' },
    { name: 'BISNIS KAMI', path: '/bisnis-kami' },
    // { name: 'PARTNER PROJECT', path: '/partner-project' },
    { name: 'KONTAK', path: '/kontak' },
  ];

  return (
    <nav className="w-full !bg-[#FFCD00] dark:bg-[#FFCD00] sticky top-0 z-50 shadow-md font-sans transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-2 sm:gap-4">
        
        {/* SISI KIRI: BRANDING LOGO */}
        <NextLink href="/" className="flex items-center gap-3 group shrink-0">
          <div className="h-10 w-auto bg-white p-1 rounded-xl flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
            <img 
              src="/images/logo-sika1.png" 
              alt="Logo Sika" 
              className="h-full w-auto object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-black text-xs sm:text-sm tracking-tight text-zinc-950 dark:text-zinc-950 uppercase leading-none mb-0.5">
              PT. Jasa Prima Makmur
            </span>
            <span className="text-[8px] sm:text-[9px] font-bold text-zinc-900/80 dark:text-zinc-900/80 tracking-widest uppercase leading-none">
              Official Distributor Sika Product
            </span>
          </div>
        </NextLink>

        {/* SISI KANAN: NAVIGASI UTAMA (DESKTOP & LAPTOP) */}
        <div className="hidden sm:flex items-center gap-2 md:gap-4 shrink-0">
          <div className="flex items-center gap-1 md:gap-1.5 h-20">
            {menuItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <NextLink
                  key={item.path}
                  href={item.path}
                  className={`px-2.5 md:px-4 py-2 md:py-2.5 rounded-xl text-[10px] md:text-[11px] font-black tracking-widest transition-all duration-200 uppercase whitespace-nowrap ${
                    isActive 
                      ? 'bg-zinc-950 text-white shadow-sm scale-105' 
                      : 'text-zinc-950 hover:bg-zinc-950/10'
                  }`}
                >
                  {item.name}
                </NextLink>
              );
            })}
          </div>

          {/* Tombol Login */}
          <NextLink
            href="/login"
            className="bg-zinc-950 hover:bg-zinc-900 text-white font-black text-[10px] md:text-[11px] tracking-widest uppercase px-4 md:px-6 py-2 md:py-2.5 rounded-xl shadow-md transition-all duration-200 active:scale-95 ml-1 md:ml-2 whitespace-nowrap"
          >
            LOGIN
          </NextLink>
        </div>

        {/* TOMBOL MENU HAMBURGER (MOBILE SCREEN HANYA UNTUK HP KECIL) */}
        <div className="sm:hidden flex items-center">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="text-zinc-950 p-2 focus:outline-none transition-transform active:scale-90"
            aria-label="Toggle Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

      </div>

      {/* PANEL NAVIGASI (MOBILE SCREEN) */}
      <div className={`sm:hidden border-t border-zinc-950/10 bg-[#FFCD00] transition-all duration-300 ease-in-out ${
        isOpen ? 'max-h-screen opacity-100 py-4' : 'max-h-0 opacity-0 overflow-hidden'
      }`}>
        <div className="px-4 space-y-1.5 flex flex-col">
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <NextLink
                key={item.path}
                href={item.path}
                onClick={() => setIsOpen(false)}
                className={`px-4 py-3 rounded-xl text-xs font-black tracking-widest transition-all uppercase ${
                  isActive
                    ? 'bg-zinc-950 text-white shadow-sm'
                    : 'text-zinc-950 hover:bg-zinc-950/10'
                }`}
              >
                {item.name}
              </NextLink>
            );
          })}
          <div className="pt-2">
            <NextLink
              href="/login"
              onClick={() => setIsOpen(false)}
              className="w-full text-center bg-zinc-950 text-white font-black text-xs tracking-widest uppercase py-3 rounded-xl block shadow-md"
            >
              LOGIN
            </NextLink>
          </div>
        </div>
      </div>
    </nav>
  );
}