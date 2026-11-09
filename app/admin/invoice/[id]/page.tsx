'use client';

import React, { useEffect } from 'react';
import { useSearchParams, useParams } from 'next/navigation';

export default function PrintInvoicePage() {
  const params = useParams();
  const searchParams = useSearchParams();

  // Membaca seluruh data dari Form Modal
  const invoiceNo = params?.id ? String(params.id) : searchParams.get('invoiceNo') || 'INV-2026/001';
  const invoiceDate = searchParams.get('invoiceDate') || new Date().toLocaleDateString('id-ID');
  const shipDate = searchParams.get('shipDate') || '';
  const poNumber = searchParams.get('poNumber') || '';
  const billTo = searchParams.get('billTo') || '';
  const itemDescription = searchParams.get('itemDescription') || '';
  const quantity = Number(searchParams.get('quantity') || 0);
  const unit = searchParams.get('unit') || 'PAIL';
  const unitPrice = Number(searchParams.get('unitPrice') || 0);
  const subTotalInput = Number(searchParams.get('subTotal') || (quantity * unitPrice));
  const tax = Number(searchParams.get('tax') || 0);
  const freight = Number(searchParams.get('freight') || 0);
  const say = searchParams.get('say') || '';
  const approvedBy = searchParams.get('approvedBy') || 'JULIANA';

  const amount = quantity * unitPrice;
  const subTotal = subTotalInput || amount;
  const grandTotal = subTotal + tax + freight;

  // Otomatis jalankan dialog cetak browser
  useEffect(() => {
    const timer = setTimeout(() => {
      window.print();
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white text-black p-8 font-sans max-w-[210mm] mx-auto text-xs border border-zinc-200 print:border-none print:p-0">
      <style jsx global>{`
        @page {
          size: A4 portrait;
          margin: 10mm;
        }
        @media print {
          body {
            -webkit-print-color-adjust: exact;
          }
        }
      `}</style>

      {/* KOP SURAT ATAS */}
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-3">
          <div className="bg-[#004B87] text-white px-3 py-1 font-black text-3xl tracking-tighter">
            JPM
          </div>
          <div>
            <h1 className="font-bold text-base text-[#004B87] tracking-tight">PT. JASA PRIMA MAKMUR</h1>
            <p className="text-[10px] text-zinc-700">Jl. Sepakat II Ayani, Komplek Azka Permal No. 3. Pontianak</p>
            <p className="text-[10px] text-zinc-700">Telp : 0852-4949-6552 / Email : jasaprimamakmur@gmail.com</p>
          </div>
        </div>

        {/* BOX INVOICE NO & INVOICE DATE */}
        <div className="w-48 text-center space-y-1">
          <div className="border border-black">
            <div className="bg-zinc-100 font-bold border-b border-black text-[9px] py-0.5">INVOICE NO.</div>
            <div className="py-1 font-bold text-xs">{invoiceNo}</div>
          </div>
          <div className="border border-black">
            <div className="bg-zinc-100 font-bold border-b border-black text-[9px] py-0.5">INVOICE DATE</div>
            <div className="py-1 text-xs">{invoiceDate}</div>
          </div>
        </div>
      </div>

      {/* JUDUL DOKUMEN */}
      <div className="text-center font-black text-2xl tracking-widest my-3 border-b-2 border-black pb-1 uppercase">
        INVOICE
      </div>

      {/* SHIP DATE, PO NUMBER & BILL TO */}
      <div className="grid grid-cols-12 gap-2 mb-3">
        <div className="col-span-4 space-y-1">
          <div className="border border-black h-12">
            <div className="bg-zinc-100 font-bold text-[9px] border-b border-black px-1 py-0.5 uppercase">SHIP DATE</div>
            <div className="px-2 py-1 font-medium">{shipDate}</div>
          </div>
          <div className="border border-black h-12">
            <div className="bg-zinc-100 font-bold text-[9px] border-b border-black px-1 py-0.5 uppercase">PO NUMBER</div>
            <div className="px-2 py-1 font-mono font-bold">{poNumber}</div>
          </div>
        </div>
        <div className="col-span-8 border border-black h-[100px]">
          <div className="bg-zinc-100 font-bold text-[9px] border-b border-black px-1 py-0.5 uppercase">BILL TO:</div>
          <div className="px-2 py-1 font-bold uppercase whitespace-pre-line">{billTo}</div>
        </div>
      </div>

      {/* TABEL ITEM RINCIAN BARANG */}
      <table className="w-full border-collapse border border-black mb-2 text-center">
        <thead>
          <tr className="bg-zinc-100 text-[9px] font-bold border-b border-black">
            <th className="border-r border-black w-10 py-1">NO</th>
            <th className="border-r border-black py-1 text-left px-2">ITEM DESCRIPTION</th>
            <th className="border-r border-black w-24 py-1">QUANTITY</th>
            <th className="border-r border-black w-16 py-1">UNIT</th>
            <th className="border-r border-black w-32 py-1">UNIT PRICE</th>
            <th className="w-36 py-1">AMOUNT</th>
          </tr>
        </thead>
        <tbody className="text-xs">
          <tr className="border-b border-zinc-200">
            <td className="border-r border-black py-2">1</td>
            <td className="border-r border-black px-2 text-left font-bold uppercase">{itemDescription}</td>
            <td className="border-r border-black py-2 font-mono">{quantity > 0 ? quantity : ''}</td>
            <td className="border-r border-black py-2 font-bold uppercase">{unit}</td>
            <td className="border-r border-black py-2 text-right px-2 font-mono">
              <span className="float-left">Rp</span> {unitPrice > 0 ? unitPrice.toLocaleString('id-ID') : '-'}
            </td>
            <td className="py-2 text-right px-2 font-mono">
              <span className="float-left">Rp</span> {amount > 0 ? amount.toLocaleString('id-ID') : '-'}
            </td>
          </tr>
          {/* BARIS KOSONG PERSIS SEPERTI GAMBAR TEMPLAT INVOICE */}
          {[...Array(6)].map((_, i) => (
            <tr key={i} className="border-b border-zinc-100 h-6">
              <td className="border-r border-black"></td>
              <td className="border-r border-black"></td>
              <td className="border-r border-black"></td>
              <td className="border-r border-black"></td>
              <td className="border-r border-black"></td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* AREA PERHITUNGAN TOTAL & OTORISASI */}
      <div className="grid grid-cols-12 gap-2 mb-4">
        <div className="col-span-7 space-y-2">
          {/* SAY (TERBILANG) */}
          <div className="border border-black p-1.5 flex items-start gap-2 h-14">
            <span className="font-bold text-[9px] uppercase">SAY:</span>
            <span className="italic font-medium uppercase text-xs">{say}</span>
          </div>

          {/* APPROVED BY & PAYMENT */}
          <div className="grid grid-cols-2 gap-2 pt-2">
            <div>
              <div className="text-[9px] font-bold uppercase mb-1">APPROVED BY :</div>
              <div className="border border-black p-3 text-center w-36 h-20 flex flex-col justify-between">
                <div className="bg-[#004B87] text-white font-black text-xl py-0.5 px-1 w-full text-center">
                  JPM
                </div>
                <div className="font-bold text-xs uppercase border-t border-black pt-0.5">{approvedBy}</div>
              </div>
            </div>

            <div className="text-[10px] space-y-0.5 pt-4">
              <div className="font-bold text-xs">Payment</div>
              <div className="flex gap-2">
                <span className="font-bold w-10">BCA</span>
                <span>: 7345224246</span>
              </div>
              <div className="flex gap-2">
                <span className="font-bold w-10">A.N</span>
                <span className="font-bold uppercase">: PT. JASA PRIMA MAKMUR</span>
              </div>
            </div>
          </div>
        </div>

        {/* TABEL PERHITUNGAN SUB TOTAL, TAX, FREIGHT, TOTAL */}
        <div className="col-span-5">
          <table className="w-full border-collapse border border-black text-xs">
            <tbody>
              <tr className="border-b border-black">
                <td className="bg-zinc-100 font-bold text-[9px] px-2 py-1 border-r border-black uppercase">SUB TOTAL</td>
                <td className="px-2 py-1 text-right font-mono">
                  <span className="float-left">Rp</span> {subTotal > 0 ? subTotal.toLocaleString('id-ID') : '-'}
                </td>
              </tr>
              <tr className="border-b border-black">
                <td className="bg-zinc-100 font-bold text-[9px] px-2 py-1 border-r border-black uppercase">TAX</td>
                <td className="px-2 py-1 text-right font-mono">
                  <span className="float-left">Rp</span> {tax > 0 ? tax.toLocaleString('id-ID') : '-'}
                </td>
              </tr>
              <tr className="border-b border-black">
                <td className="bg-zinc-100 font-bold text-[9px] px-2 py-1 border-r border-black uppercase">FREIGHT</td>
                <td className="px-2 py-1 text-right font-mono">
                  <span className="float-left">Rp</span> {freight > 0 ? freight.toLocaleString('id-ID') : '-'}
                </td>
              </tr>
              <tr className="bg-zinc-200 font-black">
                <td className="px-2 py-1.5 border-r border-black uppercase text-[10px]">TOTAL</td>
                <td className="px-2 py-1.5 text-right font-mono text-sm">
                  <span className="float-left">Rp</span> {grandTotal > 0 ? grandTotal.toLocaleString('id-ID') : '-'}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="text-center text-[8px] text-zinc-400 mt-8 tracking-widest uppercase">
        INTERNAL
      </div>
    </div>
  );
}