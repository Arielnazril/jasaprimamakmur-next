'use client';

import React, { useState } from 'react';
import NextLink from 'next/link';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('admin.jpm');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // ⚡ EKSEKUSI LOGIN LANGSUNG DAN PAKSA REDIRECT
  const handleLoginSubmit = async () => {
    if (loading) return;

    if (!username.trim() || !password.trim()) {
      setErrorMsg('Username dan Kata Sandi wajib diisi!');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username.trim(), password: password.trim(), rememberMe }),
      });

      const data = await res.json().catch(() => ({}));

      // 🚀 PAKSA PINDAH HALAMAN JIKA RESPONSE STATUS 200 ATAU SUCCESS TRUE
      if (res.status === 200 || res.ok || data.success === true) {
        window.location.href = '/admin/dashboard';
      } else {
        setErrorMsg(data.error || data.message || 'Username atau Kata Sandi Admin Salah!');
      }
    } catch (err) {
      setErrorMsg('Gagal terhubung dengan server internet.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLoginSubmit();
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans antialiased text-zinc-900 flex flex-col md:flex-row selection:bg-[#FFCD00] selection:text-zinc-950">
      
      {/* VISUAL KIRI */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-[#FFFDF0] via-[#F8F8FA] to-[#ECECEE] p-12 lg:p-16 flex-col justify-between relative overflow-hidden border-r border-zinc-200/80 shadow-2xl">
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ 
            backgroundImage: 'linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)', 
            backgroundSize: '32px 32px' 
          }}
        />
        <div className="absolute top-1/4 -left-12 w-96 h-96 bg-[#FFCD00]/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <NextLink href="/" className="inline-flex items-center gap-2.5 group text-zinc-900 font-black tracking-wider text-xs uppercase transition-all">
            <span className="bg-white border border-zinc-200 text-zinc-950 p-2.5 rounded-xl shadow-sm group-hover:bg-[#FFCD00] group-hover:border-[#FFCD00] group-hover:shadow-md transition-all duration-300 transform group-hover:-translate-x-0.5">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </span>
            Kembali ke Beranda
          </NextLink>
        </div>

        <div className="relative z-10 max-w-md my-auto space-y-6">
          <div className="inline-flex items-center gap-2 bg-zinc-950 text-[#FFCD00] text-[10px] font-black uppercase tracking-widest px-3.5 py-2 rounded-xl shadow-lg border border-zinc-800">
            <span className="w-2 h-2 bg-[#FFCD00] rounded-full animate-pulse shadow-sm shadow-[#FFCD00]"></span>
            Akses Sistem Terbatas
          </div>
          
          <h2 className="text-3xl lg:text-4xl font-black text-zinc-950 tracking-tight leading-[1.15]">
            Panel Administrator <br />
            <span className="text-amber-600">Jasa Prima Makmur</span>
          </h2>
          
          <p className="text-xs sm:text-sm font-medium text-zinc-600 leading-relaxed">
            Pintu masuk khusus untuk Staff IT, Manajemen, dan Logistik. Gunakan hak akses Anda untuk mengelola inventaris produk Sika, memvalidasi form pesanan, dan memperbarui portofolio proyek.
          </p>

          <div className="pt-2 grid grid-cols-2 gap-3">
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-zinc-200/80 shadow-sm transition-all hover:border-[#FFCD00]/50">
              <span className="block text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-0.5">Enkripsi Data</span>
              <span className="text-xs font-extrabold text-zinc-900">256-bit SSL Secure</span>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-zinc-200/80 shadow-sm transition-all hover:border-[#FFCD00]/50">
              <span className="block text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-0.5">Versi Panel</span>
              <span className="text-xs font-extrabold text-zinc-900">v2.0 Enterprise</span>
            </div>
          </div>
        </div>

        <div className="relative z-10 text-xs font-bold text-zinc-400 tracking-wide">
          &copy; 2026 PT. Jasa Prima Makmur &bull; Central Admin v2.0
        </div>
      </div>

      {/* FORM KANAN */}
      <div className="w-full md:w-1/2 bg-white flex flex-col justify-center px-6 sm:px-16 lg:px-24 py-16 relative shadow-inner">
        <div className="max-w-sm w-full mx-auto">
          
          <div className="mb-8 text-left">
            <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-zinc-950 border border-amber-200/60 mb-4 shadow-sm">
              <svg className="w-6 h-6 text-[#FFCD00]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-zinc-950 tracking-tight mb-2">
              Login Admin
            </h1>
            <p className="text-xs sm:text-sm font-semibold text-zinc-400 leading-relaxed">
              Silakan masukkan kredensial administrator resmi Anda di bawah ini.
            </p>
          </div>

          <div className="space-y-5">
            {errorMsg && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-xs font-bold p-4 rounded-xl flex items-center gap-2.5">
                <span>⚠️ {errorMsg}</span>
              </div>
            )}

            <div className="space-y-2 text-left">
              <label className="block text-[11px] font-black text-zinc-700 uppercase tracking-wider">
                Username / Email Admin
              </label>
              <div className="flex items-center bg-zinc-50 border border-zinc-200 rounded-xl px-4 focus-within:bg-white focus-within:border-[#FFCD00] shadow-sm">
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="admin.jpm" 
                  className="w-full bg-transparent border-0 py-3.5 text-sm font-bold outline-none text-zinc-900"
                />
              </div>
            </div>

            <div className="space-y-2 text-left">
              <label className="block text-[11px] font-black text-zinc-700 uppercase tracking-wider">
                Kata Sandi
              </label>
              <div className="flex items-center bg-zinc-50 border border-zinc-200 rounded-xl px-4 focus-within:bg-white focus-within:border-[#FFCD00] shadow-sm relative">
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="••••••••" 
                  className="w-full bg-transparent border-0 py-3.5 pr-10 text-sm font-bold outline-none text-zinc-900"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 text-xs text-zinc-400 font-bold"
                >
                  {showPassword ? 'HIDE' : 'SHOW'}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input 
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-[#FFCD00] rounded border-zinc-300"
                />
                <span className="font-bold text-zinc-600">Ingat Sesi Login Saya</span>
              </label>
            </div>

            <div className="pt-2">
              <button 
                type="button" 
                onClick={handleLoginSubmit}
                disabled={loading}
                className="w-full bg-[#FFCD00] hover:bg-amber-400 disabled:bg-zinc-200 text-zinc-950 font-black tracking-widest uppercase text-xs px-6 py-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? 'MEMVALIDASI...' : 'MASUK SISTEM ADMIN →'}
              </button>
            </div>

          </div>

          <div className="mt-8 text-center border-t border-zinc-100 pt-6">
            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-zinc-400">
              Sistem Terenkripsi. Akses Tidak Sah Akan Ditindak.
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}