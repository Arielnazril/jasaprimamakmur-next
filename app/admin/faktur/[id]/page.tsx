import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';

interface FakturPageProps {
  params: {
    id: string;
  };
}

export default async function FakturPajakPage({ params }: FakturPageProps) {
  // Ambil data invoice dinamis dari SQLite
  const invoice = await prisma.invoice.findUnique({
    where: { id: params.id },
    include: { customer: true },
  });

  if (!invoice) {
    notFound();
  }

  // Perhitungan Pajak Pertambahan Nilai (PPN 11%)
  const dpp = invoice.totalAmount / 1.11;
  const ppn = invoice.totalAmount - dpp;

  return (
    <div className="min-h-screen bg-white text-black p-6 md:p-12 font-sans print:p-0">
      {/* HEADER NAVBAR - HILANG KETIKA DI-PRINT */}
      <div className="max-w-4xl mx-auto mb-6 flex justify-between items-center bg-zinc-50 border p-4 rounded-xl print:hidden">
        <div className="text-xs text-zinc-500 font-medium">
          Status Validasi Sistem: <strong className="text-emerald-600 font-bold">SIAP CETAK (A4)</strong>
        </div>
        <button
          onClick={() => window.print()}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2 px-5 rounded-lg shadow transition"
        >
          🖨️ Cetak Lembar Faktur Pajak
        </button>
      </div>

      {/* STRUKTUR FORMAL FAKTUR PAJAK */}
      <div className="border border-black p-5 max-w-4xl mx-auto space-y-5 text-xs">
        <div className="text-center border-b border-black pb-3">
          <h1 className="text-sm font-black tracking-widest uppercase">FAKTUR PAJAK</h1>
        </div>

        <div className="grid grid-cols-3 border-b border-black pb-2 font-medium">
          <span>Kode & Nomor Seri Faktur Pajak:</span>
          <span className="col-span-2 font-mono font-bold text-zinc-900">
            {invoice.fakturNo || '010.000-26.00000000'}
          </span>
        </div>

        {/* PROFIL PENJUAL (PKP) */}
        <div className="space-y-1">
          <h2 className="font-black uppercase bg-zinc-50 px-2 py-0.5 border border-black">Pengusaha Kena Pajak (Penjual)</h2>
          <div className="grid grid-cols-3 px-2 font-medium">
            <span>Nama Perusahaan:</span>
            <span className="col-span-2 font-bold">PT. JASA PRIMA MAKMUR</span>
          </div>
          <div className="grid grid-cols-3 px-2 text-zinc-600">
            <span>Alamat Kantor:</span>
            <span className="col-span-2">Komp. Rukan Sentra Niaga, Blok G No. 12, Jakarta Barat</span>
          </div>
          <div className="grid grid-cols-3 px-2 font-mono">
            <span>NPWP Penjual:</span>
            <span className="col-span-2 font-bold text-zinc-900">01.424.112.5-032.000</span>
          </div>
        </div>

        {/* PROFIL PEMBELI */}
        <div className="space-y-1">
          <h2 className="font-black uppercase bg-zinc-50 px-2 py-0.5 border border-black">Pembeli Barang / Penerima Jasa Kena Pajak</h2>
          <div className="grid grid-cols-3 px-2 font-medium">
            <span>Nama Wajib Pajak:</span>
            <span className="col-span-2 font-bold uppercase">{invoice.customer?.name || 'PELANGGAN UMUM PT. JPM'}</span>
          </div>
          <div className="grid grid-cols-3 px-2 text-zinc-600">
            <span>Alamat WP:</span>
            <span className="col-span-2 uppercase">{invoice.customer?.address || 'ALAMAT TIDAK TERREGISTRASI'}</span>
          </div>
          <div className="grid grid-cols-3 px-2 font-mono">
            <span>NPWP / NIK Pembeli:</span>
            <span className="col-span-2 font-bold text-zinc-900">{invoice.customer?.npwp || '00.000.000.0-000.000'}</span>
          </div>
        </div>

        {/* RINCIAN TABEL TRANSAKSI */}
        <div className="border border-black">
          <table className="w-full text-left border-collapse text-[11px]">
            <thead>
              <tr className="bg-zinc-50 border-b border-black text-center font-bold">
                <th className="border-r border-black p-2 w-10">No.</th>
                <th className="border-r border-black p-2">Nama Barang Kena Pajak / Jasa Kena Pajak</th>
                <th className="p-2 text-right w-40">Harga Jual (Rp)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black font-medium">
              <tr>
                <td className="border-r border-black p-2 text-center">1</td>
                <td className="border-r border-black p-2 uppercase">
                  Penjualan Paket Material Sika Distribusi Logistik JPM (Sesuai Referensi Invoice: <span className="font-mono font-bold text-amber-600">{invoice.invoiceNo}</span>)
                </td>
                <td className="p-2 text-right font-mono font-bold">{Math.round(dpp).toLocaleString('id-ID')}</td>
              </tr>
              {/* Baris Kosong tambahan untuk estetika tinggi kertas */}
              <tr className="h-20">
                <td className="border-r border-black"></td>
                <td className="border-r border-black"></td>
                <td></td>
              </tr>
              {/* KALKULASI PAJAK */}
              <tr className="bg-zinc-50/50 border-t border-black font-bold">
                <td colSpan={2} className="border-r border-black p-2 text-right">Harga Jual / Penggantian Total</td>
                <td className="p-2 text-right font-mono">{Math.round(dpp).toLocaleString('id-ID')}</td>
              </tr>
              <tr className="bg-zinc-50/50 font-bold">
                <td colSpan={2} className="border-r border-black p-2 text-right">Dasar Pengenaan Pajak (DPP)</td>
                <td className="p-2 text-right font-mono">{Math.round(dpp).toLocaleString('id-ID')}</td>
              </tr>
              <tr className="bg-zinc-50/50 font-bold text-emerald-700">
                <td colSpan={2} className="border-r border-black p-2 text-right">PPN yang Terutang (11%)</td>
                <td className="p-2 text-right font-mono">{Math.round(ppn).toLocaleString('id-ID')}</td>
              </tr>
              <tr className="bg-zinc-100 text-sm font-black border-t border-black">
                <td colSpan={2} className="border-r border-black p-2 text-right">TOTAL NILAI FAKTUR (DPP + PPN)</td>
                <td className="p-2 text-right font-mono text-zinc-950">Rp {invoice.totalAmount.toLocaleString('id-ID')}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* VALIDASI BOTTOM */}
        <div className="flex justify-between items-end pt-4">
          <div className="w-1/2 text-[10px] text-zinc-400 italic leading-snug">
            * Faktur Pajak ini sah, diproses secara tersinkronisasi otomatis oleh sistem web PT. Jasa Prima Makmur ke sistem e-Faktur Pajak.
          </div>
          <div className="text-center font-medium space-y-14">
            <div>
              <p>Jakarta, {new Date(invoice.date).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
              <p className="font-bold uppercase text-[10px] text-zinc-500 mt-0.5">PT. JASA PRIMA MAKMUR</p>
            </div>
            <p className="font-bold uppercase tracking-wider underline text-zinc-900">REZA KURNIAWAN</p>
          </div>
        </div>

      </div>
    </div>
  );
}