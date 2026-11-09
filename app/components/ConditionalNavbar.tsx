'use client'; // Gunakan client hook hanya di komponen kecil ini

import { usePathname } from "next/navigation";
import Navbar from "./Navbar"; 

export default function ConditionalNavbar() {
  const pathname = usePathname();

  // Menentukan halaman mana saja yang tidak boleh memunculkan Navbar utama
  const isAuthOrAdminPage = pathname.startsWith('/admin') || pathname.startsWith('/login');

  // Jika di halaman admin atau login, jangan render apapun
  if (isAuthOrAdminPage) {
    return null;
  }

  // Jika di halaman biasa (Beranda, Kontak, dll), render Navbar bawaan
  return <Navbar />;
}