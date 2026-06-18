'use client';

import React, { useState } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();
  
  // State untuk menampung input dan status login
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  // Fungsi pengiriman data saat tombol diklik
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      // Menghubungi file API route yang baru saja kita buat di atas
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (data.success) {
        // Jika sukses, langsung lempar admin ke halaman dashboard
        router.push('/admin/dashboard');
      } else {
        // Jika gagal, tampilkan pesan error dari API
        setErrorMsg(data.message);
      }
    } catch (err) {
      setErrorMsg('Gagal terhubung dengan server internet.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans antialiased text-zinc-900 flex flex-col md:flex-row selection:bg-[#FFCD00] selection:text-zinc-950">
      
      {/* ================= BAGIAN KIRI: VISUAL INTERNAL ADMIN (Hanya Desktop) ================= */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-[#FFFDF0] to-[#F4F4F6] p-12 lg:p-16 flex-col justify-between relative overflow-hidden border-r border-zinc-200/50">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
             style={{ backgroundImage: 'linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
        </div>
        
        <div className="relative z-10">
          <NextLink href="/" className="inline-flex items-center gap-2 group text-zinc-900 font-black tracking-wider text-xs uppercase transition-all">
            <span className="bg-white border border-zinc-200 text-zinc-950 p-2 rounded-xl shadow-sm group-hover:bg-[#FFCD00] group-hover:border-[#FFCD00] transition-all">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </span>
            Kembali ke Beranda
          </NextLink>
        </div>

        <div className="relative z-10 max-w-md my-auto space-y-5">
          <div className="inline-flex items-center gap-1.5 bg-zinc-950 text-[#FFCD00] text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg shadow-md">
            <span className="w-1.5 h-1.5 bg-[#FFCD00] rounded-full animate-pulse"></span>
            Akses Sistem Terbatas
          </div>
          <h2 className="text-3xl lg:text-4xl font-black text-zinc-950 tracking-tight leading-tight">
            Panel Administrator <br />Jasa Prima Makmur
          </h2>
          <p className="text-sm font-medium text-zinc-600 leading-relaxed">
            Pintu masuk khusus untuk Staff IT, Manajemen, dan Logistik. Gunakan hak akses Anda untuk mengelola inventaris produk Sika, memvalidasi form pesanan, dan memperbarui portofolio proyek.
          </p>
        </div>

        <div className="relative z-10 text-xs font-bold text-zinc-400 tracking-wide">
          &copy; 2026 PT. Jasa Prima Makmur &bull; Central Admin v2.0
        </div>
      </div>

      {/* ================= BAGIAN KANAN: FORMULIR LOGIN ADMIN (Anti Berantakan) ================= */}
      <div className="w-full md:w-1/2 bg-white flex flex-col justify-center px-6 sm:px-16 lg:px-24 py-16 relative">
        
        <div className="absolute top-6 left-6 md:hidden">
          <NextLink href="/" className="inline-flex items-center gap-2 text-zinc-600 font-black text-xs uppercase tracking-wider">
            <svg className="w-4 h-4 text-[#FFCD00]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Kembali
          </NextLink>
        </div>

        <div className="max-w-sm w-full mx-auto">
          
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-black text-zinc-950 tracking-tight mb-2">
              Login Admin
            </h1>
            <p className="text-xs sm:text-sm font-semibold text-zinc-400 leading-relaxed">
              Silakan masukkan kredensial administrator resmi Anda di bawah ini.
            </p>
          </div>

          {/* Form Utama dihubungkan ke fungsi submit */}
          <form className="space-y-5" onSubmit={handleLoginSubmit}>
            
            {/* ALERT NOTIFIKASI ERROR (Hanya muncul jika salah password/username) */}
            {errorMsg && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-xs font-bold p-4 rounded-xl flex items-center gap-2.5">
                <svg className="w-4 h-4 text-red-500 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                {errorMsg}
              </div>
            )}

            {/* Input Username */}
            <div className="space-y-2">
              <label className="block text-[11px] font-black text-zinc-700 uppercase tracking-wider">
                Username / Email Admin
              </label>
              <div className="flex items-center bg-zinc-50 border border-zinc-200 rounded-xl px-4 transition-all focus-within:bg-white focus-within:border-[#FFCD00] focus-within:ring-1 focus-within:ring-[#FFCD00]">
                <div className="text-zinc-400 shrink-0 flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
                <input 
                  type="text" 
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin.jpm" 
                  className="w-full bg-transparent border-0 py-3.5 pl-3 pr-0 text-sm font-medium outline-none focus:ring-0 text-zinc-900 placeholder:text-zinc-400"
                />
              </div>
            </div>

            {/* Input Kata Sandi */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="block text-[11px] font-black text-zinc-700 uppercase tracking-wider">
                  Kata Sandi
                </label>
                <NextLink href="/lupa-password" className="text-xs font-bold text-amber-600 hover:text-amber-700 transition-colors">
                  Lupa Sandi?
                </NextLink>
              </div>
              <div className="flex items-center bg-zinc-50 border border-zinc-200 rounded-xl px-4 transition-all focus-within:bg-white focus-within:border-[#FFCD00] focus-within:ring-1 focus-within:ring-[#FFCD00]">
                <div className="text-zinc-400 shrink-0 flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" 
                  className="w-full bg-transparent border-0 py-3.5 pl-3 pr-0 text-sm font-medium outline-none focus:ring-0 text-zinc-900 placeholder:text-zinc-400"
                />
              </div>
            </div>

            {/* Tombol Kirim / Submit */}
            <div className="pt-2">
              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-[#FFCD00] hover:bg-amber-400 disabled:bg-zinc-200 disabled:text-zinc-400 disabled:cursor-not-allowed text-zinc-950 font-black tracking-widest uppercase text-xs px-6 py-4 rounded-xl transition-all shadow-sm active:scale-[0.98] flex items-center justify-center gap-2"
              >
                {loading ? 'Memvalidasi...' : 'Masuk Sistem Admin'}
                {!loading && (
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 12h14" />
                  </svg>
                )}
              </button>
            </div>

          </form>

          <div className="mt-8 text-center border-t border-zinc-100 pt-6">
            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-zinc-400">
              <svg className="w-3.5 h-3.5 text-red-500 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              Sistem Terenkripsi. Akses Tidak Sah Akan Ditindak.
            </div>
          </div>

        </div>

        <div className="block md:hidden text-center text-[10px] font-bold text-zinc-400 mt-12">
          &copy; 2026 PT. Jasa Prima Makmur.
        </div>

      </div>

    </div>
  );
}