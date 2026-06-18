// app/admin/dashboard/page.tsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState('Ringkasan Utama');

  const handleLogout = () => {
    router.push('/login');
  };

  const menuItems = [
    { 
      name: 'Ringkasan Utama', 
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" />
        </svg>
      )
    },
    { 
      name: 'Pesan Masuk', 
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
        </svg>
      ),
      badge: 12
    },
    { 
      name: 'Stok Produk Sika', 
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-5.25v9" />
        </svg>
      )
    },
    { 
      name: 'Manajemen Proyek', 
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h18v3H3V3z" />
        </svg>
      )
    },
    { 
      name: 'Pengaturan Web', 
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.43l-1.003.767c-.3.23-.452.617-.432.998.004.074.006.147.006.22c0 .072-.002.146-.006.22a1.104 1.104 0 0 1-.432.998l1.002.767a1.124 1.124 0 0 1 .26 1.43l-1.296 2.247a1.125 1.125 0 0 1-1.37.49l-1.216-.456a1.125 1.125 0 0 1-1.07.124c-.073.044-.146.087-.22.128-.332.183-.582.495-.645.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.43l1.004-.767c.304-.23.456-.618.434-1-.004-.073-.006-.146-.006-.22 0-.073.002-.146.006-.22a1.104 1.104 0 0 1 .434-.998l-1.004-.767a1.124 1.124 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.49l1.216.456c.356.133.751.072 1.076-.124.072-.041.146-.084.218-.128.333-.183.582-.495.646-.869l.214-1.28z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
        </svg>
      )
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-zinc-900 font-sans antialiased flex flex-col md:flex-row relative">
      
      {/* ================= HEADER BAR / NAVBAR MOBILE ================= */}
      <header className="md:hidden bg-zinc-950 text-white px-6 py-4 flex justify-between items-center sticky top-0 z-30 w-full shadow-md">
        <div className="flex items-center gap-2.5">
          <div className="w-3 h-6 bg-[#FFCD00] rounded-[2px]"></div>
          <div className="flex flex-col">
            <span className="font-black text-sm tracking-wider uppercase">JPM PANEL</span>
            <span className="text-[9px] text-[#FFCD00] font-black tracking-widest uppercase">Sika Distributor</span>
          </div>
        </div>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-white hover:text-[#FFCD00] transition-colors focus:outline-none"
        >
          {isMobileMenuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </header>

      {/* ================= SIDEBAR DASHBOARD ================= */}
      <aside className={`
        w-64 bg-zinc-950 text-zinc-400 p-5 flex flex-col justify-between shrink-0
        fixed md:sticky top-[57px] md:top-0 h-[calc(100vh-57px)] md:h-screen z-20 transition-transform duration-300 border-r border-zinc-900 shadow-xl
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="space-y-7">
          {/* Brand/Logo Utama Desktop */}
          <div className="hidden md:flex items-center gap-3 px-2 py-1 border-b border-zinc-900 pb-5">
            <div className="w-3 h-7 bg-[#FFCD00] rounded-[2px] shadow-sm shadow-[#FFCD00]/50"></div>
            <div className="flex flex-col">
              <span className="font-black text-base tracking-wider uppercase text-white">JPM PANEL</span>
              <span className="text-[9px] text-[#FFCD00] font-black tracking-widest uppercase">Sika Distributor</span>
            </div>
          </div>

          {/* Menu Navigasi */}
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const isActive = activeMenu === item.name;
              return (
                <a
                  key={item.name}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveMenu(item.name);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-3.5 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 group relative ${
                    isActive 
                      ? 'bg-[#FFCD00] text-zinc-950 font-black shadow-lg shadow-[#FFCD00]/10' 
                      : 'hover:bg-zinc-900 hover:text-white text-zinc-400'
                  }`}
                >
                  <span className={`${isActive ? 'text-zinc-950' : 'text-zinc-500 group-hover:text-[#FFCD00] transition-colors'}`}>
                    {item.icon}
                  </span>
                  <span>{item.name}</span>
                  
                  {item.badge && (
                    <span className={`ml-auto text-[10px] px-2 py-0.5 rounded-full font-black ${
                      isActive ? 'bg-zinc-950 text-[#FFCD00]' : 'bg-red-500/10 text-red-400'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </a>
              );
            })}
          </nav>
        </div>

        {/* Profil & Tombol Keluar */}
        <div className="border-t border-zinc-900 pt-4 space-y-3">
          <div className="flex items-center gap-3 px-2 py-1.5 rounded-xl bg-zinc-900/50">
            <div className="w-8 h-8 bg-zinc-800 text-[#FFCD00] font-black rounded-lg flex items-center justify-center text-xs border border-zinc-700">
              AD
            </div>
            <div className="flex flex-col truncate">
              <span className="text-xs font-bold text-white truncate">Administrator</span>
              <span className="text-[9px] font-medium text-zinc-500 truncate">admin.jpm</span>
            </div>
          </div>
          
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 text-xs font-black text-red-400 hover:text-red-500 hover:bg-red-500/5 px-4 py-3 rounded-xl transition-all uppercase tracking-wider border border-transparent hover:border-red-500/10"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
            </svg>
            <span>Keluar Sistem</span>
          </button>
        </div>
      </aside>

      {/* Backdrop Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-zinc-950/40 backdrop-blur-sm z-10 md:hidden top-[57px]"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* ================= AREA KONTEN UTAMA ================= */}
      <main className="flex-1 p-6 md:p-10 max-w-7xl w-full mx-auto space-y-8">
        
        {/* TOP NAVBAR DESKTOP & HEADER */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-zinc-200 pb-5 gap-4">
          <div>
            <div className="text-[10px] font-black uppercase tracking-widest bg-amber-500/10 text-amber-600 px-2 py-1 rounded-md inline-block mb-1.5">
              Panel Kendali Utama
            </div>
            <h1 className="text-xl md:text-2xl font-black text-zinc-950 tracking-tight">
              {activeMenu}
            </h1>
            <p className="text-xs font-medium text-zinc-500 mt-0.5">
              Data operasional web PT. Jasa Prima Makmur secara real-time.
            </p>
          </div>
          
          {/* Status Badge */}
          <div className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-xl border border-zinc-200 shadow-sm self-end sm:self-auto">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[11px] font-bold text-zinc-800 uppercase tracking-wider">Super Admin Terhubung</span>
          </div>
        </header>

        {/* GRID STATISTIK RINGKAS */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-200 hover:shadow-md transition-shadow">
            <span className="text-[10px] font-black uppercase text-zinc-400 tracking-wider">Pesan Baru Masuk</span>
            <div className="flex items-baseline gap-2 mt-1">
              <h3 className="text-3xl font-black text-zinc-950 tracking-tight">12</h3>
              <span className="text-[10px] font-bold text-green-700 bg-green-50 px-1.5 py-0.5 rounded">Maksimal</span>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-200 hover:shadow-md transition-shadow">
            <span className="text-[10px] font-black uppercase text-zinc-400 tracking-wider">Katalog Sika Aktif</span>
            <div className="flex items-baseline gap-2 mt-1">
              <h3 className="text-3xl font-black text-zinc-950 tracking-tight">48</h3>
              <span className="text-[10px] font-medium text-zinc-400">Item Terpublikasi</span>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-200 hover:shadow-md transition-shadow">
            <span className="text-[10px] font-black uppercase text-zinc-400 tracking-wider">Proyek Berjalan</span>
            <div className="flex items-baseline gap-2 mt-1">
              <h3 className="text-3xl font-black text-zinc-950 tracking-tight">4</h3>
              <span className="text-[10px] font-medium text-zinc-400">Titik Wilayah</span>
            </div>
          </div>
        </section>

        {/* GRID KONTEN BAWAH (TABEL & KONTROL LOGISTIK) */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Kolom Kiri: Tabel Konsultasi */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-zinc-200 overflow-hidden">
            <div className="p-5 border-b border-zinc-100 flex justify-between items-center bg-zinc-50/50">
              <h2 className="text-xs font-black uppercase tracking-wider text-zinc-950">Kotak Konsultasi Terbaru</h2>
              <span className="text-xs font-bold text-amber-600 cursor-pointer hover:underline">Lihat Semua</span>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-zinc-600 min-w-[500px]">
                <thead className="text-[10px] uppercase font-black text-zinc-400 bg-zinc-50 border-b border-zinc-100">
                  <tr>
                    <th className="px-6 py-3.5">Nama Pengirim</th>
                    <th className="px-6 py-3.5">Subjek Proyek</th>
                    <th className="px-6 py-3.5">Tanggal</th>
                    <th className="px-6 py-3.5">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 font-medium text-xs">
                  <tr className="hover:bg-zinc-50/50 transition-colors">
                    <td className="px-6 py-4 text-zinc-950 font-bold">Hendra Wijaya</td>
                    <td className="px-6 py-4">Waterproofing Basement Ruko</td>
                    <td className="px-6 py-4 text-zinc-400">Hari ini, 09:30 WIB</td>
                    <td className="px-6 py-4">
                      <button className="text-xs bg-[#FFF5CC] text-zinc-950 px-3 py-1.5 rounded-lg font-bold hover:bg-[#FFCD00] transition-colors shadow-sm">
                        Detail
                      </button>
                    </td>
                  </tr>
                  <tr className="hover:bg-zinc-50/50 transition-colors">
                    <td className="px-6 py-4 text-zinc-950 font-bold">CV. Kalbar Mandiri</td>
                    <td className="px-6 py-4">Suplay Grouting Jembatan</td>
                    <td className="px-6 py-4 text-zinc-400">Kemarin, 14:15 WIB</td>
                    <td className="px-6 py-4">
                      <button className="text-xs bg-[#FFF5CC] text-zinc-950 px-3 py-1.5 rounded-lg font-bold hover:bg-[#FFCD00] transition-colors shadow-sm">
                        Detail
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Kolom Kanan: Kontrol Logistik & Sistem */}
          <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 p-5 space-y-5">
            <h2 className="text-xs font-black uppercase tracking-wider text-zinc-950 border-b border-zinc-100 pb-3">🚨 Kontrol Logistik & Sistem</h2>
            
            {/* Status Produk Kritis */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-zinc-700">Stok SikaGrout 215</span>
                <span className="text-red-600 font-black">Sisa 12 Sak</span>
              </div>
              <div className="w-full bg-zinc-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-red-500 h-full w-[20%]"></div>
              </div>
            </div>

            {/* Status Proyek Aktif */}
            <div className="space-y-2 pt-1">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-zinc-700">Proyek RSUD Soedarso</span>
                <span className="text-emerald-600 font-black">80% Selesai</span>
              </div>
              <div className="w-full bg-zinc-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full w-[80%]"></div>
              </div>
            </div>

            {/* Memo Internal Admin */}
            <div className="bg-[#FFFDF0] border border-[#FFECA0] p-4 rounded-xl mt-4">
              <p className="text-[11px] font-medium text-zinc-700 leading-relaxed">
                📌 <strong>Memo Hari Ini:</strong> Pastikan pengiriman sampel lem SikaBond ke klien di Kubu Raya dikonfirmasi sore ini.
              </p>
            </div>
          </div>

        </section>

      </main>
    </div>
  );
}