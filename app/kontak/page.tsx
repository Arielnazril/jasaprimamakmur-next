'use client';

import React from 'react';
import NextLink from 'next/link';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans antialiased text-zinc-900 selection:bg-[#FFCD00] selection:text-zinc-950">
      
      {/* ================= 1. HERO SECTION (TERANG & BERSIH) ================= */}
      {/* Background menggunakan pola transparan halus agar tidak membosankan */}
      <section className="relative pt-20 pb-16 px-5 text-center bg-white border-b border-zinc-100 overflow-hidden">
        {/* Ornamen Latar Belakang Subtle */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)', backgroundSize: '32px 32px' }}>
        </div>
        
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-zinc-950 tracking-tight leading-tight mb-6">
            Mari Bangun Masa Depan <br className="hidden md:block" />
            Bersama Jasa Prima Makmur
          </h1>
          <button className="bg-[#FFCD00] text-zinc-950 font-black uppercase text-[10px] md:text-xs tracking-widest px-8 py-3.5 rounded-xl shadow-sm hover:bg-amber-400 transition-all active:scale-95">
            Konsultasi Gratis Sekarang
          </button>
        </div>
      </section>

      {/* ================= 2. MAIN CONTACT CARDS (KUNING & PUTIH) ================= */}
      <section className="px-4 max-w-6xl mx-auto mt-12 mb-8 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* KOTAK KIRI: INFO KONTAK (KUNING SIKA) */}
          <div className="bg-[#FFCD00] rounded-[2rem] p-8 md:p-10 shadow-md flex flex-col justify-center">
            <h2 className="text-xl md:text-2xl font-black text-zinc-950 mb-8">Hubungi Tim Kami</h2>
            
            <div className="space-y-6">
              {/* Alamat */}
              <div className="flex items-start gap-4">
                <div className="bg-white/50 p-2.5 rounded-full text-zinc-950 shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xs font-black text-zinc-950 mb-0.5 uppercase tracking-wider">Alamat Gudang</h4>
                  <p className="text-sm font-medium text-zinc-800">Alamat Gudang, Jalan Sepakat II Dalam Komplek</p>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-start gap-4">
                <div className="bg-white/50 p-2.5 rounded-full text-zinc-950 shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xs font-black text-zinc-950 mb-0.5 uppercase tracking-wider">WhatsApp Center</h4>
                  <p className="text-sm font-medium text-zinc-800">+62 812-5642-6582</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="bg-white/50 p-2.5 rounded-full text-zinc-950 shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xs font-black text-zinc-950 mb-0.5 uppercase tracking-wider">Email Support</h4>
                  <p className="text-sm font-medium text-zinc-800">jasaprimamakmur.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* KOTAK KANAN: FORMULIR PESAN (PUTIH BERSIH) */}
          <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-lg border border-zinc-100 flex flex-col justify-center">
            <h2 className="text-xl md:text-2xl font-black text-zinc-950 mb-6">Kirimkan Pesan Anda</h2>
            
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input 
                  type="text" 
                  placeholder="Nama" 
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm outline-none transition-all focus:border-[#FFCD00] focus:ring-1 focus:ring-[#FFCD00] placeholder:text-zinc-400 font-medium"
                />
                <input 
                  type="text" 
                  placeholder="No. HP / WA" 
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm outline-none transition-all focus:border-[#FFCD00] focus:ring-1 focus:ring-[#FFCD00] placeholder:text-zinc-400 font-medium"
                />
              </div>
              <input 
                type="email" 
                placeholder="Email" 
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm outline-none transition-all focus:border-[#FFCD00] focus:ring-1 focus:ring-[#FFCD00] placeholder:text-zinc-400 font-medium"
              />
              <textarea 
                rows={4}
                placeholder="Pesan anda" 
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm outline-none transition-all focus:border-[#FFCD00] focus:ring-1 focus:ring-[#FFCD00] placeholder:text-zinc-400 resize-none font-medium"
              />
              <button 
                type="button" 
                className="w-full bg-[#FFF5CC] hover:bg-[#FFCD00] text-zinc-950 font-black tracking-widest uppercase text-xs px-6 py-4 rounded-xl transition-all active:scale-[0.98]"
              >
                Kontak
              </button>
            </form>
          </div>

        </div>
      </section>

      {/* ================= 3. LAYANAN UNGGULAN KAMI (ELEMEN TAMBAHAN) ================= */}
      <section className="px-4 max-w-6xl mx-auto mb-12">
        <h3 className="text-lg md:text-xl font-black text-zinc-950 mb-4 px-2">Layanan Unggulan Kami</h3>
        
        {/* Grid 4 Kolom di PC, 2 Kolom di HP */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-100 flex flex-col items-center text-center hover:border-[#FFCD00] transition-colors">
            <svg className="w-8 h-8 text-red-600 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h4 className="text-xs md:text-sm font-black uppercase text-zinc-950">Distributor Resmi Sika</h4>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-100 flex flex-col items-center text-center hover:border-[#FFCD00] transition-colors">
            <svg className="w-8 h-8 text-zinc-800 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <h4 className="text-xs md:text-sm font-black uppercase text-zinc-950">Konsultasi Konstruksi</h4>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-100 flex flex-col items-center text-center hover:border-[#FFCD00] transition-colors">
            <svg className="w-8 h-8 text-zinc-800 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <h4 className="text-xs md:text-sm font-black uppercase text-zinc-950">Supervisi Proyek</h4>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-100 flex flex-col items-center text-center hover:border-[#FFCD00] transition-colors">
            <svg className="w-8 h-8 text-zinc-800 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h4 className="text-xs md:text-sm font-black uppercase text-zinc-950">Laporan Berkala</h4>
          </div>

        </div>
      </section>

      {/* ================= 4. MAP & QUICK WHATSAPP CTA ================= */}
      <section className="px-4 max-w-6xl mx-auto pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Peta Lokasi Gudang */}
          <div>
            <h3 className="text-lg md:text-xl font-black text-zinc-950 mb-4 px-2">Gudang Utama Kami di Sungai Raya</h3>
            <div className="bg-white p-2 rounded-2xl shadow-sm border border-zinc-100 h-64 w-full">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.817951631566!2d109.35626!3d-0.0524458!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e1d59955bc6fba3%3A0x6b4453b0e352ab53!2sSungai%20Raya%2C%20Kubu%20Raya%20Regency%2C%20West%20Kalimantan!5e0!3m2!1sen!2sid!4v1700000000000" 
                className="w-full h-full rounded-xl"
                style={{ border: 0 }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Peta Lokasi Gudang"
              />
            </div>
          </div>

          {/* Kotak Chat Cepat WhatsApp */}
          <div className="flex flex-col">
            <h3 className="text-lg md:text-xl font-black text-transparent mb-4 px-2 hidden md:block select-none">Quick Actions</h3>
            <div className="bg-[#FFF9E5] border border-[#FFCD00]/20 rounded-2xl p-8 flex flex-col items-center justify-center text-center h-64 shadow-sm">
              <h3 className="text-xl md:text-2xl font-black text-zinc-950 mb-2">Butuh Bantuan Segera?</h3>
              <p className="text-sm md:text-base font-bold text-zinc-700 mb-6">Hubungi Kami di +62 812-5642-6582</p>
              <NextLink 
                href="https://wa.me/6281256426582" 
                target="_blank"
                className="bg-[#FFCD00] hover:bg-amber-400 text-zinc-950 font-black tracking-widest uppercase text-xs px-8 py-3.5 rounded-xl transition-all active:scale-95 flex items-center gap-2 shadow-sm"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.964 9.964 0 001.333 4.993L2 22l5.233-1.237a9.994 9.994 0 004.779 1.217h.004c5.505 0 9.988-4.478 9.989-9.984 0-2.669-1.037-5.176-2.926-7.066A9.954 9.954 0 0012.012 2zm5.394 14.281c-.226.638-1.322 1.21-1.815 1.258-.458.045-1.045.148-3.411-.834-3.376-1.399-5.556-4.839-5.724-5.064-.168-.225-1.365-1.821-1.365-3.473 0-1.651.863-2.463 1.173-2.791.311-.328.675-.41.901-.41.226 0 .452.001.65.01.205.009.48-.08.75.57.28.677.954 2.33.1037 2.536.083.206.128.491-.036.82-.163.328-.248.534-.496.82-.248.286-.516.614-.741.862-.248.271-.508.56-.226 1.04.282.48 1.251 2.062 2.684 3.337 1.854 1.65 3.398 2.158 3.88 2.383.481.226.764.19.1052-.083.287-.272 1.246-1.448 1.58-1.944.334-.496.668-.413 1.103-.248.435.165 2.748 1.294 3.218 1.528.47.234.783.351.897.545.113.194.113 1.127-.113 1.765z"/>
                </svg>
                Mulai Chat di WhatsApp
              </NextLink>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}