'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);

  // Membaca atau mengatur mode awal dari localStorage/system preferences jika ada
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
  };

  return (
    <div className={`w-full font-sans antialiased overflow-x-hidden transition-colors duration-300 ${darkMode ? 'dark bg-zinc-950 text-white' : 'bg-white text-sika-dark'}`}>
      
      {/* FLOATING DARK / LIGHT MODE TOGGLE BUTTON */}
      <button
        onClick={toggleDarkMode}
        aria-label="Toggle Theme Mode"
        className="fixed bottom-6 right-6 z-50 p-3.5 rounded-full shadow-2xl backdrop-blur-md transition-all duration-300 transform hover:scale-110 border bg-white/80 dark:bg-zinc-900/80 text-zinc-800 dark:text-amber-400 border-zinc-200 dark:border-zinc-700 shadow-sika-orange/20"
      >
        {darkMode ? (
          /* Sun Icon for Light Mode Switch */
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        ) : (
          /* Moon Icon for Dark Mode Switch */
          <svg className="w-5 h-5 text-zinc-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
          </svg>
        )}
      </button>

      {/* 1. HERO SECTION (Spanduk Utama) */}
      <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center justify-center overflow-hidden bg-sika-dark py-16 sm:py-24">
        {/* Gambar Latar Pekerja Konstruksi */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30 transform scale-105 transition-transform duration-1000"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070')` 
          }}
        />
        
        {/* Gradasi Gelap Elegan */}
        <div className="absolute inset-0 bg-gradient-to-t from-sika-dark via-sika-dark/80 to-transparent opacity-95" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white space-y-6 sm:space-y-8">
          <p className="text-sika-orange font-black text-[11px] sm:text-xs md:text-sm tracking-[0.3em] uppercase bg-sika-orange/10 border border-sika-orange/20 px-3.5 py-1.5 rounded-full inline-block backdrop-blur-md">
            PT. Jasa Prima Makmur
          </p>
          
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.15] uppercase">
            Membangun Dengan <br className="hidden sm:inline" />
            <span className="text-sika-orange drop-shadow-sm">Kualitas & Presisi</span>
          </h1>
          
          <p className="text-xs sm:text-base md:text-lg text-gray-300 max-w-2xl mx-auto font-medium leading-relaxed sm:leading-relaxed px-2">
            PT. Jasa Prima Makmur hadir sebagai mitra strategis konstruksi dan solusi material kelas dunia di seluruh Indonesia.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center max-w-md mx-auto sm:max-w-none">
            <Link 
              href="/tentang-kami"
              className="w-full sm:w-auto bg-sika-orange hover:bg-amber-500 text-sika-dark font-black text-xs uppercase px-8 py-4 rounded-xl shadow-xl shadow-sika-orange/20 hover:shadow-sika-orange/30 transition-all duration-300 text-center tracking-wider transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Pelajari Profil Kami
            </Link>
            <Link 
              href="/bisnis-kami"
              className="w-full sm:w-auto border-2 border-white/80 hover:border-white hover:bg-white hover:text-sika-dark text-white font-bold text-xs uppercase px-8 py-4 rounded-xl transition-all duration-300 text-center tracking-wider backdrop-blur-sm"
            >
              Layanan Kami
            </Link>
          </div>
        </div>
      </section>

      {/* 2. TENTANG KAMI SECTION */}
      <section className={`py-16 sm:py-24 border-b transition-colors duration-300 ${darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-sika-gray border-gray-100'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16 items-center">
            
            {/* Sisi Kiri: Ilustrasi / Gambar */}
            <div className="relative flex justify-center order-2 lg:order-1">
              <div className={`relative w-full max-w-md aspect-square rounded-3xl overflow-hidden shadow-xl border flex items-center justify-center p-8 group transition-colors duration-300 ${darkMode ? 'bg-zinc-950 border-zinc-800 shadow-black/40' : 'bg-white border-gray-100/80 shadow-gray-200/50'}`}>
                <div className="absolute inset-0 bg-gradient-to-tr from-amber-50/50 via-transparent to-transparent opacity-60 dark:opacity-10" />
                
                {/* Fallback ilustrasi konstruksi modern */}
                <div className="text-center relative z-10 transform group-hover:scale-105 transition-transform duration-500">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-sika-orange/10 rounded-2xl flex items-center justify-center mx-auto mb-5 border border-sika-orange/20 shadow-inner">
                    <svg className="w-10 h-10 sm:w-12 sm:h-12 text-sika-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <span className={`font-black text-xs sm:text-sm uppercase tracking-widest block ${darkMode ? 'text-white' : 'text-sika-dark'}`}>
                    PT. JPM 
                  </span>
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mt-1">
                    Standard & Innovation
                  </span>
                </div>
              </div>
            </div>

            {/* Sisi Kanan: Konten Teks */}
            <div className="space-y-5 sm:space-y-6 order-1 lg:order-2 text-left">
              <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.25em] text-sika-orange bg-sika-orange/10 px-3 py-1 rounded-md inline-block">
                Tentang Kami
              </span>
              <h2 className={`text-2xl sm:text-4xl font-black leading-tight uppercase tracking-tight ${darkMode ? 'text-white' : 'text-sika-dark'}`}>
                Pengalaman Lebih Dari Satu Dekade
              </h2>
              <p className={`text-xs sm:text-base leading-relaxed sm:leading-relaxed font-medium ${darkMode ? 'text-zinc-400' : 'text-gray-600'}`}>
                PT. Jasa Prima Makmur (JPM) adalah pilar kekuatan dalam industri konstruksi Indonesia. Kami bergerak dalam pembangunan infrastruktur strategis, mulai dari gedung, jembatan, hingga sistem pengolahan air (WTP).
              </p>
              <p className={`text-xs sm:text-base leading-relaxed sm:leading-relaxed font-medium ${darkMode ? 'text-zinc-400' : 'text-gray-600'}`}>
                Kami percaya bahwa setiap struktur yang kami bangun adalah investasi masa depan bagi masyarakat dan mitra bisnis kami.
              </p>
              <div className="pt-2">
                <Link
                  href="/tentang-kami"
                  className="inline-block bg-sika-orange hover:bg-amber-500 text-sika-dark font-black text-xs uppercase px-7 py-3.5 rounded-xl transition-all duration-300 tracking-wider shadow-lg shadow-sika-orange/10 hover:shadow-sika-orange/20"
                >
                  Selengkapnya
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. BIDANG BISNIS KAMI */}
      <section className={`py-16 sm:py-24 transition-colors duration-300 ${darkMode ? 'bg-zinc-950' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className={`text-2xl sm:text-4xl font-black uppercase tracking-tight ${darkMode ? 'text-white' : 'text-sika-dark'}`}>
            Bidang Bisnis Kami
          </h2>
          <div className="w-12 h-1.5 bg-sika-orange mx-auto mt-3 mb-10 sm:mb-16 rounded-full" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            
            {/* Kartu 1: Konstruksi Bangunan */}
            <div className={`p-7 sm:p-9 rounded-2xl border shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center group ${darkMode ? 'bg-zinc-900 border-zinc-800 hover:border-zinc-700' : 'bg-white border-gray-100 hover:border-gray-200'}`}>
              <div className="w-16 h-16 bg-amber-50 dark:bg-amber-500/10 rounded-2xl flex items-center justify-center text-3xl text-sika-orange mb-6 font-bold shadow-inner group-hover:scale-110 transition-transform duration-300">
                🏢
              </div>
              <h3 className={`text-base sm:text-lg font-black uppercase mb-3 tracking-wide ${darkMode ? 'text-white' : 'text-sika-dark'}`}>
                Konstruksi Bangunan
              </h3>
              <p className={`text-xs sm:text-sm leading-relaxed max-w-xs font-medium ${darkMode ? 'text-zinc-400' : 'text-gray-500'}`}>
                Pembangunan fasilitas publik, gedung komersial, dan perumahan dengan standar keamanan tertinggi.
              </p>
            </div>

            {/* Kartu 2: Waterproofing Specialist */}
            <div className={`p-7 sm:p-9 rounded-2xl border-2 border-sika-orange shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col items-center text-center relative overflow-hidden group ${darkMode ? 'bg-zinc-900' : 'bg-white'}`}>
              <div className="absolute top-0 inset-x-0 bg-sika-orange text-sika-dark text-[9px] sm:text-[10px] font-black tracking-widest uppercase py-1 shadow-sm">
                Official Sika Partner
              </div>
              <div className="w-16 h-16 bg-red-50 dark:bg-red-500/10 rounded-2xl flex items-center justify-center text-3xl text-red-500 mb-6 mt-3 font-bold shadow-inner group-hover:scale-110 transition-transform duration-300">
                💧
              </div>
              <h3 className={`text-base sm:text-lg font-black uppercase mb-3 tracking-wide ${darkMode ? 'text-white' : 'text-sika-dark'}`}>
                Waterproofing Specialist
              </h3>
              <p className={`text-xs sm:text-sm leading-relaxed max-w-xs font-medium ${darkMode ? 'text-zinc-400' : 'text-gray-500'}`}>
                Solusi perlindungan kebocoran basement, atap, dan kolam renang menggunakan teknologi Sika resmi.
              </p>
            </div>

            {/* Kartu 3: Infrastruktur & Teknik */}
            <div className={`p-7 sm:p-9 rounded-2xl border shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center group ${darkMode ? 'bg-zinc-900 border-zinc-800 hover:border-zinc-700' : 'bg-white border-gray-100 hover:border-gray-200'}`}>
              <div className="w-16 h-16 bg-amber-50 dark:bg-amber-500/10 rounded-2xl flex items-center justify-center text-3xl text-sika-orange mb-6 font-bold shadow-inner group-hover:scale-110 transition-transform duration-300">
                🛠️
              </div>
              <h3 className={`text-base sm:text-lg font-black uppercase mb-3 tracking-wide ${darkMode ? 'text-white' : 'text-sika-dark'}`}>
                Infrastruktur & Teknik
              </h3>
              <p className={`text-xs sm:text-sm leading-relaxed max-w-xs font-medium ${darkMode ? 'text-zinc-400' : 'text-gray-500'}`}>
                Menangani struktur berat seperti jembatan, bendungan, dan instalasi pengolahan air (Intake/WTP).
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 4. PROYEK UNGGULAN (PORTFOLIO MINI POTRET) */}
      <section className={`py-16 sm:py-24 border-t transition-colors duration-300 ${darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-sika-gray border-gray-100'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className={`text-2xl sm:text-4xl font-black uppercase tracking-tight ${darkMode ? 'text-white' : 'text-sika-dark'}`}>
            Proyek Unggulan
          </h2>
          <div className="w-12 h-1.5 bg-sika-orange mx-auto mt-3 mb-10 sm:mb-16 rounded-full" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
            
            {/* Proyek 1: WTP PDAM - Nipah Kuning */}
            <div className={`group rounded-2xl overflow-hidden shadow-md hover:shadow-2xl border transition-all duration-300 flex flex-col ${darkMode ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-gray-200/80'}`}>
              <div className="w-full aspect-[3/4] relative overflow-hidden bg-zinc-900">
                <img 
                  src="/images/pdam-wtp.jpg" 
                  alt="WTP PDAM - Nipah Kuning" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-sika-dark/80 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
              </div>
              <div className={`p-5 text-left border-t flex-grow flex items-center justify-between transition-colors duration-300 ${darkMode ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-gray-100'}`}>
                <h4 className={`font-black text-xs sm:text-sm uppercase tracking-wide group-hover:text-sika-orange transition-colors ${darkMode ? 'text-white' : 'text-sika-dark'}`}>
                  WTP PDAM - Nipah Kuning
                </h4>
                <span className="text-sika-orange text-xs font-black opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1 duration-300">
                  →
                </span>
              </div>
            </div>

            {/* Proyek 2: Intake Jeruju - PDAM */}
            <div className={`group rounded-2xl overflow-hidden shadow-md hover:shadow-2xl border transition-all duration-300 flex flex-col ${darkMode ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-gray-200/80'}`}>
              <div className="w-full aspect-[3/4] relative overflow-hidden bg-zinc-900">
                <img 
                  src="/images/pdam-intake.jpg" 
                  alt="Intake Jeruju - PDAM" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-sika-dark/80 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
              </div>
              <div className={`p-5 text-left border-t flex-grow flex items-center justify-between transition-colors duration-300 ${darkMode ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-gray-100'}`}>
                <h4 className={`font-black text-xs sm:text-sm uppercase tracking-wide group-hover:text-sika-orange transition-colors ${darkMode ? 'text-white' : 'text-sika-dark'}`}>
                  Intake Jeruju - PDAM
                </h4>
                <span className="text-sika-orange text-xs font-black opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1 duration-300">
                  →
                </span>
              </div>
            </div>

            {/* Proyek 3: Gereja GKY - 28 Oktober */}
            <div className={`group rounded-2xl overflow-hidden shadow-md hover:shadow-2xl border transition-all duration-300 flex flex-col ${darkMode ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-gray-200/80'}`}>
              <div className="w-full aspect-[3/4] relative overflow-hidden bg-zinc-900">
                <img 
                  src="/images/gky-28.jpg" 
                  alt="Gereja GKY - 28 Oktober" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-sika-dark/80 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
              </div>
              <div className={`p-5 text-left border-t flex-grow flex items-center justify-between transition-colors duration-300 ${darkMode ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-gray-100'}`}>
                <h4 className={`font-black text-xs sm:text-sm uppercase tracking-wide group-hover:text-sika-orange transition-colors ${darkMode ? 'text-white' : 'text-sika-dark'}`}>
                  Gereja GKY - 28 Oktober
                </h4>
                <span className="text-sika-orange text-xs font-black opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1 duration-300">
                  →
                </span>
              </div>
            </div>

          </div>

          <div className="mt-10 sm:mt-14">
            <Link 
              href="/partner-project"
              className={`inline-block border-2 border-sika-orange hover:bg-sika-orange text-sika-dark font-black text-xs uppercase px-8 py-3.5 rounded-xl transition-all duration-300 tracking-wider shadow-md hover:shadow-sika-orange/20 ${darkMode ? 'text-sika-orange hover:text-sika-dark' : 'text-sika-dark'}`}
            >
              Lihat Galeri Proyek Lainnya
            </Link>
          </div>
        </div>
      </section>

      {/* 5. FOOTER */}
      <footer className="bg-sika-dark text-white pt-16 sm:pt-20 pb-10 border-t-4 border-sika-orange relative overflow-hidden">
        {/* Ornamen Akses Latar Belakang Subtle / Glow Halus */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-sika-orange/5 rounded-full filter blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-64 h-64 bg-amber-500/5 rounded-full filter blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* GRID UTAMA */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 sm:gap-16 pb-12 sm:pb-16 border-b border-gray-800/80">
            
            {/* Kolom 1: Perusahaan */}
            <div className="space-y-5 text-left">
              <div className="flex items-center gap-3">
                <div className="h-10 w-auto bg-white/10 p-1.5 rounded-xl flex items-center justify-center border border-white/10 shadow-lg shadow-sika-orange/10 backdrop-blur-md">
                  <img 
                    src="/images/logo-sika1.png" 
                    alt="Logo Sika" 
                    className="h-full w-auto object-contain"
                  />
                </div>
                <span className="font-black tracking-[0.25em] text-lg text-sika-orange uppercase italic">
                  PT. JPM
                </span>
              </div>
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-sm font-medium">
                Membangun masa depan Indonesia dengan integritas, kualitas, dan inovasi konstruksi yang berkelanjutan. Kami berkomitmen memberikan solusi teknik terbaik bagi bangsa.
              </p>
            </div>

            {/* Kolom 2: Tautan Cepat */}
            <div className="space-y-5 text-left md:pl-10">
              <h4 className="text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] text-sika-orange">
                Tautan Cepat
              </h4>
              <ul className="space-y-3 text-xs font-bold uppercase tracking-widest">
                <li>
                  <Link href="/" className="text-gray-400 hover:text-sika-orange transition-all duration-200 flex items-center group">
                    <span className="w-0 group-hover:w-3 h-[2px] bg-sika-orange mr-0 group-hover:mr-2 transition-all duration-200 rounded"></span>
                    Beranda
                  </Link>
                </li>
                <li>
                  <Link href="/tentang-kami" className="text-gray-400 hover:text-sika-orange transition-all duration-200 flex items-center group">
                    <span className="w-0 group-hover:w-3 h-[2px] bg-sika-orange mr-0 group-hover:mr-2 transition-all duration-200 rounded"></span>
                    Tentang Kami
                  </Link>
                </li>
                <li>
                  <Link href="/bisnis-kami" className="text-gray-400 hover:text-sika-orange transition-all duration-200 flex items-center group">
                    <span className="w-0 group-hover:w-3 h-[2px] bg-sika-orange mr-0 group-hover:mr-2 transition-all duration-200 rounded"></span>
                    Bisnis Kami
                  </Link>
                </li>
                <li>
                  <Link href="/kontak" className="text-gray-400 hover:text-sika-orange transition-all duration-200 flex items-center group">
                    <span className="w-0 group-hover:w-3 h-[2px] bg-sika-orange mr-0 group-hover:mr-2 transition-all duration-200 rounded"></span>
                    Kontak
                  </Link>
                </li>
              </ul>
            </div>

            {/* Kolom 3: Kontak Support */}
            <div className="space-y-5 text-left">
              <h4 className="text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] text-sika-orange">
                Hubungi Kami
              </h4>
              <div className="group bg-gradient-to-br from-zinc-900/90 to-zinc-950/90 p-5 sm:p-6 rounded-2xl border border-gray-800/80 hover:border-sika-orange/60 shadow-xl transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-sika-orange/5 rounded-full blur-xl group-hover:bg-sika-orange/10 transition-colors" />
                
                <span className="text-[9px] text-gray-400 font-black uppercase tracking-widest block mb-2.5">
                  Email Official
                </span>
                
                <a 
                  href="mailto:info@jasaprimamakmur.com" 
                  className="flex items-center gap-3.5 group-hover:translate-x-0.5 transition-transform duration-200"
                >
                  {/* ICON GMAIL VECTOR ELEGAN */}
                  <div className="w-10 h-10 rounded-xl bg-sika-orange/10 border border-sika-orange/20 flex items-center justify-center text-sika-orange shrink-0 group-hover:bg-sika-orange group-hover:text-sika-dark transition-all duration-300 shadow-md">
                    <svg 
                      className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2" 
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
                      />
                    </svg>
                  </div>
                  
                  <span className="text-xs sm:text-sm font-bold text-gray-200 group-hover:text-sika-orange transition-colors break-all tracking-wide">
                    info@jasaprimamakmur.com
                  </span>
                </a>
              </div>
            </div>

          </div>

          {/* Hak Cipta */}
          <div className="pt-8 sm:pt-10 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
            <div className="text-[9px] sm:text-[10px] font-black text-gray-500 tracking-[0.2em] uppercase">
              © 2026 PT. Jasa Prima Makmur. Seluruh Hak Cipta Dilindungi.
            </div>
            <div className="flex gap-5 text-[9px] sm:text-[10px] font-black text-gray-500 uppercase tracking-widest">
              <span className="hover:text-gray-300 cursor-pointer transition-colors">Privacy Policy</span>
              <span className="hover:text-gray-300 cursor-pointer transition-colors">Terms of Service</span>
            </div>
          </div>
          
        </div>
      </footer>

    </div>
  );
}