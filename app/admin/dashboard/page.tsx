import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import DashboardClient from './DashboardClient';

export default async function AdminDashboard() {
  // Ambil data Invoice asli dari database SQLite (tanpa include customer untuk mencegah error data kosong)
  const invoices = await prisma.invoice.findMany({
    orderBy: {
      date: 'desc', // Menggunakan 'date' sesuai skema yang Anda miliki
    },
  });

  // Hitung statistik riil dari database
  const totalInvoices = invoices.length;
  const totalOmset = invoices.reduce((acc, inv) => acc + (inv.totalAmount || 0), 0);

  return (
    <DashboardClient 
      initialInvoices={invoices} 
      stats={{ totalInvoices, totalOmset }} 
    />
  );
}