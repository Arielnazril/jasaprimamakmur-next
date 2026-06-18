import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="w-full bg-white text-sika-dark">
      
      {/* 1. HERO SECTION (Spanduk Utama) */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden bg-sika-dark">
        {/* Gambar Latar Pekerja Konstruksi */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070')` 
          }}
        />
        
        {/* Gradasi Gelap Elegan */}
        <div className="absolute inset-0 bg-gradient-to-t from-sika-dark via-transparent to-transparent opacity-90" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <p className="text-sika-orange font-bold text-xs sm:text-sm tracking-widest uppercase mb-3">
            PT. Jasa Prima Makmur
          </p>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight uppercase">
            Membangun Dengan <br />
            <span className="text-sika-orange">Kualitas & Presisi</span>
          </h1>
          
          <p className="mt-6 text-sm sm:text-base text-gray-300 max-w-2xl mx-auto font-medium leading-relaxed">
            PT. Jasa Prima Makmur hadir sebagai mitra strategis konstruksi dan solusi material kelas dunia di seluruh Indonesia.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/tentang-kami"
              className="w-full sm:w-auto bg-sika-orange hover:bg-amber-500 text-sika-dark font-black text-xs uppercase px-8 py-4 rounded-lg shadow-lg shadow-amber-500/20 transition-all text-center tracking-wider"
            >
              Pelajari Profil Kami
            </Link>
            <Link 
              href="/bisnis-kami"
              className="w-full sm:w-auto border-2 border-white hover:bg-white hover:text-sika-dark text-white font-bold text-xs uppercase px-8 py-4 rounded-lg transition-all text-center tracking-wider"
            >
              Layanan Kami
            </Link>
          </div>
        </div>
      </section>

      {/* 2. TENTANG KAMI SECTION */}
      <section className="py-20 bg-sika-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Sisi Kiri: Ilustrasi / Gambar */}
            <div className="relative flex justify-center">
              <div className="relative w-full max-w-md aspect-square bg-blue-100 rounded-2xl overflow-hidden shadow-xl border border-gray-100 flex items-center justify-center p-8">
                {/* Fallback ilustrasi konstruksi modern */}
                <div className="text-center">
                  <div className="w-24 h-24 bg-sika-orange/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-12 h-12 text-sika-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <span className="font-bold text-sm text-gray-500">PT. JPM Engineering System</span>
                </div>
              </div>
            </div>

            {/* Sisi Kanan: Konten Teks */}
            <div className="space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-sika-orange block">
                Tentang Kami
              </span>
              <h2 className="text-3xl font-black text-sika-dark leading-tight uppercase">
                Pengalaman Lebih Dari Satu Dekade
              </h2>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                PT. Jasa Prima Makmur (JPM) adalah pilar kekuatan dalam industri konstruksi Indonesia. Kami bergerak dalam pembangunan infrastruktur strategis, mulai dari gedung, jembatan, hingga sistem pengolahan air (WTP).
              </p>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Kami percaya bahwa setiap struktur yang kami bangun adalah investasi masa depan bagi masyarakat dan mitra bisnis kami.
              </p>
              <div>
                <Link
                  href="/tentang-kami"
                  className="inline-block bg-sika-dark hover:bg-gray-800 text-white font-bold text-xs uppercase px-6 py-3 rounded-lg transition-all tracking-wider"
                >
                  Selengkapnya
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. BIDANG BISNIS KAMI */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-black text-sika-dark uppercase tracking-tight">
            Bidang Bisnis Kami
          </h2>
          <div className="w-12 h-1 bg-sika-orange mx-auto mt-3 mb-16 rounded-full" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Kartu 1: Konstruksi Bangunan */}
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-amber-50 rounded-xl flex items-center justify-center text-2xl text-sika-orange mb-6 font-bold">
                🏢
              </div>
              <h3 className="text-lg font-black text-sika-dark uppercase mb-3">
                Konstruksi Bangunan
              </h3>
              <p className="text-gray-500 text-xs sm:text-sm leading-relaxed max-w-xs">
                Pembangunan fasilitas publik, gedung komersial, dan perumahan dengan standar keamanan tertinggi.
              </p>
            </div>

            {/* Kartu 2: Waterproofing Specialist */}
            <div className="bg-white p-8 rounded-2xl border-2 border-sika-orange shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 bg-sika-orange text-white text-[9px] font-black tracking-widest uppercase py-1">
                Official Sika Partner
              </div>
              <div className="w-14 h-14 bg-red-50 rounded-xl flex items-center justify-center text-2xl text-red-500 mb-6 mt-2 font-bold">
                💧
              </div>
              <h3 className="text-lg font-black text-sika-dark uppercase mb-3">
                Waterproofing Specialist
              </h3>
              <p className="text-gray-500 text-xs sm:text-sm leading-relaxed max-w-xs">
                Solusi perlindungan kebocoran basement, atap, dan kolam renang menggunakan teknologi Sika resmi.
              </p>
            </div>

            {/* Kartu 3: Infrastruktur & Teknik */}
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-amber-50 rounded-xl flex items-center justify-center text-2xl text-sika-orange mb-6 font-bold">
                🛠️
              </div>
              <h3 className="text-lg font-black text-sika-dark uppercase mb-3">
                Infrastruktur & Teknik
              </h3>
              <p className="text-gray-500 text-xs sm:text-sm leading-relaxed max-w-xs">
                Menangani struktur berat seperti jembatan, bendungan, dan instalasi pengolahan air (Intake/WTP).
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 4. PROYEK UNGGULAN (PORTFOLIO MINI) */}
      <section className="py-20 bg-sika-gray border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-black text-sika-dark uppercase tracking-tight">
            Proyek Unggulan
          </h2>
          <div className="w-12 h-1 bg-sika-orange mx-auto mt-3 mb-16 rounded-full" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Proyek 1 */}
            <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all">
              <div className="h-48 bg-gray-200 relative">
                <div className="absolute inset-0 bg-sika-dark/20 group-hover:bg-transparent transition-colors" />
                <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">Dokumentasi Proyek</div>
              </div>
              <div className="p-5 text-left border-t border-gray-50">
                <h4 className="font-black text-xs sm:text-sm uppercase tracking-wide text-sika-dark">
                  WTP PDAM - Nipah Kuning
                </h4>
              </div>
            </div>

            {/* Proyek 2 */}
            <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all">
              <div className="h-48 bg-gray-200 relative">
                <div className="absolute inset-0 bg-sika-dark/20 group-hover:bg-transparent transition-colors" />
                <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">Dokumentasi Proyek</div>
              </div>
              <div className="p-5 text-left border-t border-gray-50">
                <h4 className="font-black text-xs sm:text-sm uppercase tracking-wide text-sika-dark">
                  Intake Jeruju - PDAM
                </h4>
              </div>
            </div>

            {/* Proyek 3 */}
            <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all">
              <div className="h-48 bg-gray-200 relative">
                <div className="absolute inset-0 bg-sika-dark/20 group-hover:bg-transparent transition-colors" />
                <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">Dokumentasi Proyek</div>
              </div>
              <div className="p-5 text-left border-t border-gray-50">
                <h4 className="font-black text-xs sm:text-sm uppercase tracking-wide text-sika-dark">
                  Gereja GKY - 28 Oktober
                </h4>
              </div>
            </div>

          </div>

          <div className="mt-12">
            <Link 
              href="/partner-project"
              className="inline-block border-2 border-sika-orange hover:bg-sika-orange text-sika-dark font-black text-xs uppercase px-8 py-3.5 rounded-lg transition-all tracking-wider"
            >
              Lihat Galeri Proyek Lainnya
            </Link>
          </div>
        </div>
      </section>

      {/* 5. FOOTER */}
      <footer className="bg-sika-dark text-white pt-24 pb-12 border-t-4 border-sika-orange">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    
    {/* GRID UTAMA */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-16 pb-16 border-b border-gray-800/50">
      
      {/* Kolom 1: Perusahaan */}
      <div className="space-y-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-sika-orange rounded-full flex items-center justify-center font-black text-white text-xs shadow-lg shadow-sika-orange/20">
            JPM
          </div>
          <span className="font-black tracking-[0.3em] text-lg text-sika-orange uppercase italic">
            PT. JPM
          </span>
        </div>
        <p className="text-gray-400 text-sm leading-relaxed max-w-xs font-medium">
          Membangun masa depan Indonesia dengan integritas, kualitas, dan inovasi konstruksi yang berkelanjutan. Kami berkomitmen memberikan solusi teknik terbaik bagi bangsa.
        </p>
      </div>

      {/* Kolom 2: Tautan Cepat */}
      <div className="space-y-8 md:pl-10">
        <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-sika-orange">
          Tautan Cepat
        </h4>
        <ul className="space-y-4 text-xs font-bold uppercase tracking-widest">
          <li>
            <Link href="/" className="text-gray-400 hover:text-sika-orange transition-all flex items-center group">
              <span className="w-0 group-hover:w-4 h-[1px] bg-sika-orange mr-0 group-hover:mr-2 transition-all"></span>
              Beranda
            </Link>
          </li>
          <li>
            <Link href="/tentang-kami" className="text-gray-400 hover:text-sika-orange transition-all flex items-center group">
              <span className="w-0 group-hover:w-4 h-[1px] bg-sika-orange mr-0 group-hover:mr-2 transition-all"></span>
              Tentang Kami
            </Link>
          </li>
        </ul>
      </div>

      {/* Kolom 3: Kontak Support */}
      <div className="space-y-8">
        <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-sika-orange">
          Hubungi Kami
        </h4>
        <div className="group bg-zinc-900/30 p-6 border border-gray-800 hover:border-sika-orange transition-all duration-500">
          <span className="text-[9px] text-gray-500 font-black uppercase tracking-widest block mb-2">Email Official</span>
          <div className="flex items-center gap-3">
            <span className="text-lg">✉️</span>
            <span className="text-sm font-bold text-gray-200 group-hover:text-sika-orange transition-colors">
              info@jasaprimamakmur.com
            </span>
          </div>
        </div>
      </div>

    </div>

    {/* Hak Cipta */}
    <div className="pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="text-[9px] font-black text-gray-500 tracking-[0.3em] uppercase text-center md:text-left">
        © 2026 PT. Jasa Prima Makmur. Seluruh Hak Cipta Dilindungi.
      </div>
      <div className="flex gap-6 text-[9px] font-black text-gray-600 uppercase tracking-widest">
        <span className="hover:text-gray-400 cursor-pointer transition-colors">Privacy Policy</span>
        <span className="hover:text-gray-400 cursor-pointer transition-colors">Terms of Service</span>
      </div>
    </div>
    
  </div>
</footer>

    </div>
  );
}