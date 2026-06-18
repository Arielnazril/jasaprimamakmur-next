'use client';

import React from 'react';

export default function BisnisKami() {
  
  // DATA TETAP SAMA
  const solusiKonstruksi = [
    {
      title: 'Konstruksi Gedung',
      desc: 'Pembangunan gedung perkantoran, fasilitas publik, dan area komersial dengan manajemen proyek yang ketat.',
      icon: (
        <svg className="w-10 h-10 text-[#FFCD00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    },
    {
      title: 'Jasa Kontruksi',
      desc: 'Spesialisasi dalam struktur berat termasuk jembatan, jalan raya, dan fondasi infrastruktur strategis',
      icon: (
        <svg className="w-10 h-10 text-[#FFCD00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
      )
    },
    {
      title: 'Renovasi & Perawatan',
      desc: 'Layanan pemeliharaan struktur dan peremajaan bangunan guna memastikan aset Anda tetap prima',
      icon: (
        <svg className="w-10 h-10 text-[#FFCD00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    }
  ];

  const produkSika = [
    'WATERPROOFING',
    'FLOORING SYSTEMS',
    'GROUTING & REPAIR',
    'SEALING & BONDING'
  ];

  return (
    <div className="w-full bg-[#f9f9f9] text-zinc-950 font-sans min-h-screen">
      
      {/* --- SEKSI 1: HERO (Dibuat lebih Bold & Luas) --- */}
      <section className="pt-32 pb-20 px-6 text-center bg-white">
         <div className="max-w-5xl mx-auto">
            <span className="text-[#FFCD00] font-black text-xs tracking-[0.4em] uppercase mb-6 block">
              Layanan & Bisnis
            </span>
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-zinc-950 leading-[1.1] mb-8">
              Solusi Menyeluruh untuk <br/> Konstruksi Modern & Material Berkualitas
            </h1>
            <div className="w-24 h-2 bg-[#FFCD00] mx-auto"></div>
         </div>
      </section>

      {/* --- SEKSI 2: SOLUSI KONSTRUKSI (Grid lebih rapi) --- */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
         <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="text-left">
               <h2 className="text-3xl font-black uppercase text-zinc-950 tracking-tight">
                 Solusi Konstruksi Kami
               </h2>
               <div className="h-1 w-20 bg-[#FFCD00] mt-2"></div>
            </div>
            <p className="text-zinc-500 max-w-md text-sm font-medium leading-relaxed">
              Kami mengintegrasikan pengalaman lapangan bertahun-tahun dengan teknik modern untuk memberikan hasil terbaik.
            </p>
         </div>
         
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {solusiKonstruksi.map((item, i) => (
              <div key={i} className="p-10 bg-white border border-zinc-200 hover:border-[#FFCD00] transition-all duration-300 group">
                 <div className="mb-8 group-hover:scale-110 transition-transform duration-300">
                   {item.icon}
                 </div>
                 <h3 className="text-lg font-black uppercase text-zinc-950 mb-4">{item.title}</h3>
                 <p className="text-sm font-medium text-zinc-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
         </div>
      </section>

      {/* --- SEKSI 3: SOLUSI PRODUK SIKA (Grid 4 Kotak Seimbang) --- */}
      <section className="py-24 px-6 bg-zinc-950 text-white">
         <div className="max-w-7xl mx-auto text-center">
            <span className="text-[#FFCD00] font-black text-xs tracking-[0.4em] uppercase mb-4 block">
              Jenis Product
            </span>
            <h2 className="text-3xl md:text-5xl font-black uppercase mb-12 tracking-tighter">
              Solusi Produk Sika
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
              {produkSika.map((prod, i) => (
                <div key={i} className="bg-zinc-900 border border-zinc-800 p-10 flex items-center justify-center text-center hover:bg-[#FFCD00] hover:text-zinc-950 transition-all duration-300 cursor-pointer aspect-square md:aspect-auto md:h-40">
                  <span className="font-black uppercase text-sm tracking-widest">{prod}</span>
                </div>
              ))}
            </div>

            <button className="bg-[#FFCD00] text-zinc-950 font-black text-xs px-12 py-5 rounded-none uppercase tracking-[0.2em] hover:bg-white transition-all shadow-lg active:scale-95">
              Pesan Material Sekarang
            </button>
         </div>
      </section>

      {/* --- SEKSI 4: CTA KONSULTASI (Industrial Look) --- */}
      <section className="py-24 px-6 bg-white">
  <div className="max-w-6xl mx-auto bg-[#FFCD00] p-16 md:p-24 text-center relative overflow-hidden border border-zinc-950/5 shadow-sm">
    
    {/* Elemen Dekoratif Halus (Watermark SIKA di pojok) */}
    <div className="absolute -top-10 -right-10 text-zinc-950/10 font-black text-[12rem] select-none pointer-events-none tracking-tighter">
      SIKA
    </div>
    
    <div className="relative z-10">
      <h2 className="text-4xl md:text-6xl font-black uppercase text-zinc-950 mb-8 tracking-tighter leading-[0.9]">
        Butuh Konsultasi <br className="hidden md:block"/> Teknis Proyek?
      </h2>
      
      <p className="text-zinc-950/80 font-bold mb-12 text-base md:text-lg max-w-2xl mx-auto leading-relaxed uppercase tracking-tight">
        Tim ahli kami siap memberikan rekomendasi produk dan metode aplikasi terbaik sesuai standar internasional.
      </p>

      {/* BUTTON YANG SUDAH DIRAPIKAN */}
      <button className="group relative inline-flex items-center gap-4 bg-zinc-950 text-white font-black text-[11px] md:text-xs px-12 py-6 uppercase tracking-[0.3em] transition-all duration-300 hover:bg-zinc-800 hover:shadow-2xl active:scale-95 shadow-xl">
        <span>Hubungi Kami Sekarang</span>
        
        {/* Ikon Panah (SVG Standar - Aman dari Error) */}
        <svg 
          className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </button>
    </div>

    {/* Aksen Garis di bawah */}
    <div className="absolute bottom-0 left-0 w-full h-2 bg-zinc-950/10"></div>
  </div>
</section>
      
    </div>
  );
}