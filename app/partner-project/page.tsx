'use client';

import React from 'react';
import NextLink from 'next/link';
import Link from 'next/link';

export default function PartnerProject() {
  
  // DATA PROYEK UTAMA
  const portofolio = [
    {
      id: 1,
      category: 'WATER TREATMENT',
      title: 'PDAM - Nipah Kuning',
      desc: 'Pembangunan struktur utama Sistem WTP untuk pengolahan air bersih standar nasional dengan efisiensi maksimal.',
      imgUrl: 'https://images.unsplash.com/photo-1541888081635-08e2f69430c5?q=80&w=1000',
    },
    {
      id: 2,
      category: 'CIVIL ENGINEERING',
      title: 'Intake Jeruju - PDAM',
      desc: 'Struktur pengambilan air baku dengan sistem pembesian khusus dan proteksi beton dari erosi sungai.',
      imgUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1000',
    },
    {
      id: 3,
      category: 'PUBLIC FACILITY',
      title: 'Gereja GKY - 28 Oktober',
      desc: 'Konstruksi gedung ibadah dengan bentang lebar yang mengutamakan aspek estetika dan kekuatan struktur bangunan.',
      imgUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000',
    }
  ];

  // DATA SEKTOR KEAHLIAN
  const sektorKeahlian = [
    { title: 'Infrastruktur Jalan & Jembatan', total: '14 Proyek' },
    { title: 'Fasilitas Pengolahan Air (WTP)', total: '8 Proyek' },
    { title: 'Gedung Komersial & Publik', total: '19 Proyek' },
    { title: 'Proteksi Struktur & Waterproofing', total: '35+ Proyek' }
  ];

  // DATA ALUR KERJA
  const alurKerja = [
    { step: '01', title: 'Analisis Teknis & Spesifikasi', detail: 'Mengkaji cetak biru proyek dan menentukan titik kritis struktur yang memerlukan penanganan khusus.' },
    { step: '02', title: 'Integrasi Material Resmi Sika', detail: 'Memastikan seluruh material pelapis, grouting, dan admixture menggunakan standar orisinal Sika.' },
    { step: '03', title: 'Eksekusi & Pengawasan Ketat', detail: 'Penerapan teknik konstruksi modern oleh aplikator bersertifikat demi hasil yang presisi.' },
    { step: '04', title: 'Uji Mutu & Penyerahan', detail: 'Inspeksi akhir terhadap ketahanan air, kekuatan beban, dan kerapian arsitektural sebelum serah terima.' }
  ];

  return (
    <div className="w-full bg-[#FAFAFA] text-zinc-950 font-sans min-h-screen selection:bg-[#FFCD00] selection:text-zinc-950 antialiased">
      
      {/* ================= SEKSI 1: HERO SECTION ================= */}
      <section className="relative bg-zinc-950 border-b border-zinc-100 py-20 md:py-32 px-5 text-center overflow-hidden">
        {/* Gambar Latar Belakang Terkait Website Konstruksi */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-25 transform scale-105"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070')` 
          }}
        />
        {/* Overlay Gradasi Gelap Elegan */}
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/80 via-zinc-950/60 to-zinc-950" />

        <div className="relative z-10 max-w-4xl mx-auto">
          <span className="text-[#FFCD00] font-black text-[10px] md:text-xs tracking-widest uppercase mb-3 block">
            PORTOFOLIO PROYEK
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-black uppercase tracking-tight text-white leading-tight mb-4 max-w-3xl mx-auto">
            Menampilkan dedikasi kami dalam membangun infrastruktur vital dengan presisi teknik tinggi.
          </h1>
          <div className="w-12 h-1 bg-[#FFCD00] mx-auto rounded-full mt-4" />
        </div>
      </section>

      {/* ================= SEKSI 2: STATISTIK PENCAPAIAN ================= */}
      <section className="py-6 -mt-8 px-4 max-w-7xl mx-auto relative z-10">
        <div className="bg-white rounded-2xl border border-zinc-100 shadow-lg grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-4 p-6 md:p-10 text-center">
          <div className="px-2">
            <p className="text-2xl md:text-4xl font-black text-zinc-950">50+</p>
            <p className="text-[10px] md:text-xs font-bold text-zinc-400 uppercase tracking-wider mt-1">Proyek Selesai</p>
          </div>
          <div className="px-2 border-l border-zinc-100">
            <p className="text-2xl md:text-4xl font-black text-zinc-950">100%</p>
            <p className="text-[10px] md:text-xs font-bold text-zinc-400 uppercase tracking-wider mt-1">Mutu Sika</p>
          </div>
          <div className="px-2 border-t md:border-t-0 md:border-l border-zinc-100 pt-4 md:pt-0">
            <p className="text-2xl md:text-4xl font-black text-zinc-950">10+</p>
            <p className="text-[10px] md:text-xs font-bold text-zinc-400 uppercase tracking-wider mt-1">Mitra Instansi</p>
          </div>
          <div className="px-2 border-t md:border-t-0 md:border-l border-zinc-100 pt-4 md:pt-0">
            <p className="text-2xl md:text-4xl font-black text-zinc-950">100%</p>
            <p className="text-[10px] md:text-xs font-bold text-zinc-400 uppercase tracking-wider mt-1">Klien Puas</p>
          </div>
        </div>
      </section>

      {/* ================= SEKSI 3: INTI PARTNER PROJECT ================= */}
      <section className="py-16 md:py-24 px-5 max-w-7xl mx-auto">
        
        <div className="text-center mb-12 md:mb-16">
          <span className="text-zinc-400 font-black text-[9px] md:text-[10px] tracking-[0.2em] uppercase mb-1 block">
            EXCELLENCE IN CONSTRUCTION
          </span>
          <h2 className="text-2xl md:text-4xl font-black uppercase text-zinc-950 mb-3">
            Partner Project
          </h2>
          <p className="text-zinc-500 font-medium max-w-2xl mx-auto text-xs md:text-base leading-relaxed">
            Kami bangga menjadi bagian dari pembangunan Kalimantan Barat melalui proyek-proyek strategis berikut:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {portofolio.map((item) => (
            <div 
              key={item.id} 
              className="bg-white rounded-2xl md:rounded-[2rem] overflow-hidden border border-zinc-100 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col"
            >
              <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden bg-zinc-200">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 md:group-hover:scale-105"
                  style={{ backgroundImage: `url(${item.imgUrl})` }}
                />
                <div className="absolute inset-0 bg-black/5" />
                <div className="absolute top-3 left-3 bg-[#FFCD00] text-zinc-950 text-[8px] md:text-[9px] font-black tracking-widest uppercase px-2.5 py-1.5 rounded shadow-sm">
                  {item.category}
                </div>
              </div>

              <div className="p-6 md:p-8 flex flex-col flex-grow">
                <h3 className="text-lg md:text-xl font-black uppercase text-zinc-950 mb-2 group-hover:text-[#FFCD00] transition-colors line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-xs md:text-sm font-medium text-zinc-500 leading-relaxed mb-6 flex-grow">
                  {item.desc}
                </p>
                
                {/* PERBAIKAN IKON PANAH DI SINI: Ditambahkan w-max, w-4 h-4, dan shrink-0 */}
                <NextLink 
                  href="#" 
                  className="inline-flex items-center gap-2 text-[11px] md:text-xs font-black tracking-widest uppercase text-zinc-950 hover:text-[#FFCD00] transition-colors mt-auto group w-max"
                >
                  Lihat Dokumentasi
                  <svg className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </NextLink>

              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= SEKSI 4: REKAM JEJAK SEKTOR KEAHLIAN ================= */}
      <section className="py-16 md:py-24 px-5 bg-zinc-950 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center md:text-left mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-[#FFCD00] font-black text-[10px] md:text-xs tracking-widest uppercase mb-1 block">
                COMPREHENSIVE SECTORS
              </span>
              <h2 className="text-xl md:text-4xl font-black uppercase tracking-tight">
                Cakupan Sektor Konstruksi Kami
              </h2>
            </div>
            <p className="text-zinc-400 font-medium max-w-md text-xs md:text-sm leading-relaxed mx-auto md:mx-0">
              Portofolio pengerjaan kami mencakup diversifikasi bidang yang luas, membuktikan kapabilitas teknis tim lapangan.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {sektorKeahlian.map((sektor, index) => (
              <div key={index} className="bg-zinc-900 border border-zinc-800 p-6 md:p-8 rounded-xl flex flex-col justify-between h-36 md:h-48 hover:border-[#FFCD00] transition-colors">
                <span className="text-zinc-700 font-black text-xs md:text-sm">0{index + 1}</span>
                <div>
                  <h4 className="text-sm md:text-base font-black uppercase tracking-wide mb-0.5">{sektor.title}</h4>
                  <p className="text-[10px] md:text-xs font-bold text-[#FFCD00] tracking-widest uppercase">{sektor.total}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SEKSI 5: ALUR KERJA/SOP KONSTRUKSI ================= */}
      <section className="py-16 md:py-24 px-5 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-zinc-400 font-black text-[10px] md:text-xs tracking-widest uppercase mb-1 block">
            HOW WE COMMIT
          </span>
          <h2 className="text-2xl md:text-3xl font-black uppercase text-zinc-950">
            Metode & Manajemen Proyek
          </h2>
          <div className="w-8 h-1 bg-[#FFCD00] mx-auto rounded-full mt-2.5" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
          {alurKerja.map((alur, index) => (
            <div key={index} className="relative group border-l-2 border-zinc-100 pl-4 md:border-l-0 md:pl-0">
              <div className="text-3xl md:text-4xl font-black text-zinc-200 group-hover:text-[#FFCD00] transition-colors mb-2">{alur.step}</div>
              <h3 className="text-sm md:text-base font-black uppercase text-zinc-950 mb-1">{alur.title}</h3>
              <p className="text-xs font-medium text-zinc-500 leading-relaxed">{alur.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= SEKSI 6: CTA PENUTUP ================= */}
      <section className="pb-20 px-4 bg-white text-center">
        <div className="max-w-4xl mx-auto bg-zinc-950 rounded-2xl md:rounded-[2rem] p-8 md:p-16 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-[#FFCD00]" />
          
          <h2 className="text-xl md:text-3xl font-black uppercase text-white mb-3 tracking-wide">
            Wujudkan Proyek Anda Bersama Kami
          </h2>
          <p className="text-zinc-400 font-medium mb-8 text-xs md:text-base max-w-xl mx-auto leading-relaxed">
            Konsultasikan kebutuhan konstruksi dan infrastruktur Anda dengan tim ahli kami
          </p>
          <NextLink 
            href="/kontak"
            className="inline-block bg-[#FFCD00] text-zinc-950 font-black text-[10px] md:text-xs px-8 md:px-10 py-3.5 md:py-4 rounded-lg uppercase tracking-widest hover:bg-amber-400 transition-all shadow-md active:scale-95 w-full sm:w-auto text-center"
          >
            Hubungi Kami Sekarang
          </NextLink>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-sika-dark text-white pt-16 sm:pt-20 pb-10 border-t-4 border-sika-orange">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* GRID UTAMA */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 sm:gap-16 pb-12 sm:pb-16 border-b border-gray-800/80">
            
            {/* Kolom 1: Perusahaan */}
            <div className="space-y-5 text-left">
              <div className="flex items-center gap-3">
                <div className="h-10 w-auto bg-white/10 p-1 rounded-xl flex items-center justify-center border border-white/10 shadow-lg shadow-sika-orange/10">
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
              </ul>
            </div>

            {/* Kolom 3: Kontak Support */}
            <div className="space-y-5 text-left">
              <h4 className="text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] text-sika-orange">
                Hubungi Kami
              </h4>
              <div className="group bg-zinc-900/60 p-5 sm:p-6 rounded-2xl border border-gray-800 hover:border-sika-orange/50 transition-all duration-300">
                <span className="text-[9px] text-gray-500 font-black uppercase tracking-widest block mb-1.5">Email Official</span>
                <div className="flex items-center gap-3">
                  <span className="text-base sm:text-lg">✉️</span>
                  <span className="text-xs sm:text-sm font-bold text-gray-200 group-hover:text-sika-orange transition-colors break-all">
                    info@jasaprimamakmur.com
                  </span>
                </div>
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