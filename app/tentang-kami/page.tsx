import React from 'react';
import Link from 'next/link';

export default function TentangKami() {
  return (
    <div className="w-full bg-white text-sika-dark font-sans">
      
      {/* 1. HERO SECTION TENTANG KAMI */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-sika-dark">
        {/* Background Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070')` 
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-sika-dark" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white">
          <span className="bg-red-600 text-white text-[9px] font-bold tracking-widest uppercase px-3 py-1 rounded mb-4 inline-block">
            Official Distributor
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight uppercase leading-tight">
            Solusi Konstruksi Terbaik
          </h1>
          <p className="mt-3 text-xs sm:text-sm text-gray-300 max-w-xl mx-auto font-medium">
            Distributor Resmi Produk Sika & Kontraktor Terpercaya
          </p>
          
          {/* Menu Navigasi Produk Mini */}
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 bg-white p-6 rounded-2xl shadow-xl text-sika-dark border border-gray-100 max-w-3xl mx-auto">
            <div className="flex flex-col items-center p-2">
              <span className="text-xl mb-1">💧</span>
              <span className="text-xs font-bold">Waterproofing</span>
            </div>
            <div className="flex flex-col items-center p-2">
              <span className="text-xl mb-1">🧱</span>
              <span className="text-xs font-bold">Flooring</span>
            </div>
            <div className="flex flex-col items-center p-2">
              <span className="text-xl mb-1">📦</span>
              <span className="text-xs font-bold">Grouting</span>
            </div>
            <div className="flex flex-col items-center p-2">
              <span className="text-xl mb-1">✅</span>
              <span className="text-xs font-bold">Admixture</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. VISI & MISI SECTION */}
      <section className="py-20 bg-zinc-50/60">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-sika-dark uppercase tracking-tight">
              Visi & Misi
            </h2>
            <div className="w-10 h-0.5 bg-sika-orange mx-auto mt-2" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* Box Visi */}
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xl">👁️</span>
                <h3 className="text-lg font-bold text-sika-dark">Visi Kami</h3>
              </div>
              <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
                Menjadi distributor resmi dan mitra kontraktor nomor satu di Indonesia yang mengutamakan kualitas produk Sika serta ketepatan aplikasi di lapangan, membangun industri konstruksi yang aman dan berumur panjang.
              </p>
            </div>

            {/* Box Misi */}
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xl">🚀</span>
                <h3 className="text-lg font-bold text-sika-dark">Misi Kami</h3>
              </div>
              <ul className="space-y-3 text-gray-500 text-xs sm:text-sm leading-relaxed list-disc list-inside">
                <li>Menjamin ketersediaan produk Sika original dan berkualitas tinggi bagi seluruh klien.</li>
                <li>Memberikan solusi teknis tepat guna, hemat biaya, namun memiliki daya tahan struktural yang maksimal.</li>
                <li>Menyediakan tenaga aplikator kontraktor dengan standardisasi keahlian dan disiplin kerja tinggi.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3. GUDANG KAMI SECTION (GALERI STOK) */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-sika-dark uppercase tracking-tight">
            Gudang Kami
          </h2>
          <p className="text-xs text-gray-400 mt-2 mb-12">
            Pasokan material original untuk memenuhi stok secara berkesinambungan.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Foto 1 */}
            <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm group">
              <div className="h-56 bg-zinc-100 bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1000')` }} />
              <div className="p-4 flex justify-between items-center bg-zinc-50 border-t border-gray-100">
                <span className="text-[10px] bg-sika-orange text-sika-dark font-black px-3 py-1 rounded uppercase">Material Sika</span>
                <span className="text-xs font-bold text-gray-500">Ready Stock</span>
              </div>
            </div>

            {/* Foto 2 */}
            <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm group">
              <div className="h-56 bg-zinc-100 bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1565793298595-6a879b1d9492?q=80&w=1000')` }} />
              <div className="p-4 flex justify-between items-center bg-zinc-50 border-t border-gray-100">
                <span className="text-[10px] bg-sika-orange text-sika-dark font-black px-3 py-1 rounded uppercase">Material Sika</span>
                <span className="text-xs font-bold text-gray-500">Ready Stock</span>
              </div>
            </div>

            {/* Foto 3 */}
            <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm group">
              <div className="h-56 bg-zinc-100 bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=1000')` }} />
              <div className="p-4 flex justify-between items-center bg-zinc-50 border-t border-gray-100">
                <span className="text-[10px] bg-sika-orange text-sika-dark font-black px-3 py-1 rounded uppercase">Material Sika</span>
                <span className="text-xs font-bold text-gray-500">Ready Stock</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PRINSIP KERJA KAMI */}
      <section className="py-16 bg-sika-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-black uppercase tracking-tight text-white">
            Prinsip Kerja Kami
          </h2>
          <div className="w-10 h-0.5 bg-sika-orange mx-auto mt-2 mb-12" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <span className="text-3xl text-sika-orange mb-3">🛡️</span>
              <h4 className="text-sm font-bold uppercase tracking-wider mb-2">Keaslian Produk</h4>
              <p className="text-xs text-gray-400 max-w-xs leading-relaxed">
                Jaminan material 100% original langsung dari produsen utama Sika Indonesia.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl text-sika-orange mb-3">🛠️</span>
              <h4 className="text-sm font-bold uppercase tracking-wider mb-2">Tenaga Ahli</h4>
              <p className="text-xs text-gray-400 max-w-xs leading-relaxed">
                Dikerjakan oleh tim aplikator bersertifikat resmi dengan pengalaman teknis tinggi.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl text-sika-orange mb-3">⏱️</span>
              <h4 className="text-sm font-bold uppercase tracking-wider mb-2">Tepat Waktu</h4>
              <p className="text-xs text-gray-400 max-w-xs leading-relaxed">
                Manajemen timeline proyek yang ketat guna memastikan penyerahan tepat pada jadwalnya.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION BANNER */}
      <section className="py-16 bg-white px-4">
        <div className="max-w-5xl mx-auto bg-gradient-to-r from-sika-orange to-amber-500 p-8 sm:p-12 rounded-3xl text-center shadow-lg shadow-amber-500/10 text-sika-dark relative overflow-hidden">
          <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight">
            Butuh Material Sika atau Jasa Konstruksi?
          </h3>
          <p className="text-xs sm:text-sm font-medium opacity-90 mt-2 mb-6 max-w-xl mx-auto">
            Hubungi tim ahli PT. Jasa Prima Makmur untuk konsultasi produk gratis dan estimasi biaya proyek Anda.
          </p>
          <Link 
            href="/kontak"
            className="inline-block bg-sika-dark hover:bg-zinc-800 text-white font-bold text-xs uppercase px-8 py-3.5 rounded-full tracking-wider shadow-md transition-all"
          >
            Hubungi Kami Sekarang →
          </Link>
        </div>
      </section>

      {/* 6. FOOTER */}
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