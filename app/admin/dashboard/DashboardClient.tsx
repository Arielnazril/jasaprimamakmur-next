'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';

interface DashboardClientProps {
  initialInvoices: any[];
  stats: {
    totalInvoices: number;
    totalOmset: number;
  };
}

// ⚡ FUNGSI KONVERSI ANGKA KE TERBILANG RUPIAH
function terbilangRupiah(nominal: number): string {
  const n = Math.abs(Math.round(nominal));
  if (n === 0) return 'NOL RUPIAH';

  const angka = ['', 'SATU', 'DUA', 'TIGA', 'EMPAT', 'LIMA', 'ENAM', 'TUTUH', 'DELAPAN', 'SEBILAN', 'SEPULUH', 'SEBELAS'];

  const konversi = (x: number): string => {
    let temp = '';
    if (x < 12) {
      temp = ' ' + angka[x];
    } else if (x < 20) {
      temp = konversi(x - 10) + ' BELAS';
    } else if (x < 100) {
      temp = konversi(Math.floor(x / 10)) + ' PULUH' + konversi(x % 10);
    } else if (x < 200) {
      temp = ' SERATUS' + konversi(x - 100);
    } else if (x < 1000) {
      temp = konversi(Math.floor(x / 100)) + ' RATUS' + konversi(x % 100);
    } else if (x < 2000) {
      temp = ' SERIBU' + konversi(x - 1000);
    } else if (x < 1000000) {
      temp = konversi(Math.floor(x / 1000)) + ' RIBU' + konversi(x % 1000);
    } else if (x < 1000000000) {
      temp = konversi(Math.floor(x / 1000000)) + ' JUTA' + konversi(x % 1000000);
    } else if (x < 1000000000000) {
      temp = konversi(Math.floor(x / 1000000000)) + ' MILYAR' + konversi(x % 1000000000);
    }
    return temp;
  };

  return (konversi(n).trim() + ' RUPIAH').toUpperCase();
}

export default function DashboardClient({ initialInvoices, stats }: DashboardClientProps) {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState('Ringkasan Utama');

  const [invoices, setInvoices] = useState<any[]>(initialInvoices || []);
  const [products, setProducts] = useState<any[]>([]);

  // ⚡ STATE MODAL FORM INVOICE
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
  const [invoiceForm, setInvoiceForm] = useState({
    invoiceNo: '',
    invoiceDate: '',
    shipDate: '',
    poNumber: '',
    billTo: '',
    itemDescription: '',
    quantity: '1',
    unit: 'PAIL',
    unitPrice: '0',
    subTotal: '0',
    tax: '0',
    freight: '0',
    say: '',
    approvedBy: 'JULIANA',
  });

  // ⚡ STATE MODAL TRANSAKSI KILAT MEWAH
  const [isQuickTxModalOpen, setIsQuickTxModalOpen] = useState(false);
  const [selectedQuickProduct, setSelectedQuickProduct] = useState<any>(null);
  const [quickTxForm, setQuickTxForm] = useState({
    customerName: '',
    quantity: 1,
  });

  // ⚡ STATE MODAL BACA PESAN MASUK
  const [selectedMessage, setSelectedMessage] = useState<any>(null);
  const [inboxList, setInboxList] = useState([
    { id: 1, name: 'PT. WIKA Gedung Tbk', email: 'procurement@wikagedung.co.id', date: 'Hari ini, 09:30', subject: 'Permintaan Penawaran Sika ViscoCrete 5002N (50 Drum)', message: 'Mohon dikirimkan surat penawaran resmi untuk proyek jalan tol Serpong-Balaraja sebanyak 50 Drum Sika ViscoCrete 5002N.', status: 'Belum Dibaca' },
    { id: 2, name: 'CV. Karya Utama Mandiri', email: 'logistik@karyautama.com', date: 'Kemarin, 16:45', subject: 'Konfirmasi Jadwal Pengiriman Sika Waterbar', message: 'Invoice INV-1710592800000 sudah kami bayar lunas. Mohon kepastian tanggal armada barang tiba di gudang kami.', status: 'Perlu Tindak Lanjut' },
    { id: 3, name: 'Bpk. Hendra Wijaya (Proyek APARTEMEN PARK)', email: 'hendra.w@gmail.com', date: '08 Nov 2026', subject: 'Konsultasi Spesifikasi Waterproofing Sika', message: 'Apakah produk Sika Top 107 Seal cocok untuk kebutuhan waterproofing basement area basah lantai 2?', status: 'Selesai' },
  ]);

  // ⚡ STATE PENGATURAN WEB ENTERPRISE
  const [webSettings, setWebSettings] = useState({
    companyName: 'PT. Jasa Prima Makmur',
    adminEmail: 'admin.jpm@jasaprimamakmur.co.id',
    defaultTaxRate: '11',
    systemStatus: 'ONLINE (SERVER AKTIF)',
    autoBackup: true,
  });

  const fetchInvoices = async () => {
    try {
      const res = await fetch('/api/invoice');
      if (res.ok) {
        const data = await res.json();
        setInvoices(data);
      }
    } catch (error) {
      console.error("Gagal memuat data invoice:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    } catch (error) {
      console.error("Gagal memuat data produk:", error);
    }
  };

  useEffect(() => {
    setInvoices(initialInvoices);
  }, [initialInvoices]);

  useEffect(() => {
    fetchProducts();
    fetchInvoices();
  }, []);

  useEffect(() => {
    if (activeMenu === 'Stok Produk Sika' || activeMenu === 'Ringkasan Utama' || activeMenu === 'Manajemen Invoice & Faktur Pajak') {
      fetchProducts();
      fetchInvoices();
    }
  }, [activeMenu]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<any>(null);
  const [formData, setFormData] = useState({
    kodeBarang: '',
    name: '',
    price: '',
    stock: '',
    unit: 'PAIL',
  });

  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [viewProduct, setViewProduct] = useState<any>(null);

  const [deleteTarget, setDeleteTarget] = useState<{ id: string; name: string; type: 'PRODUCT' | 'INVOICE' } | null>(null);

  // ⚡ HELPER MENGAMBIL NAMA PELANGGAN AKURAT DARI DATABASE
  const getCustomerName = (inv: any) => {
    if (!inv) return 'PELANGGAN UMUM';
    
    // Ambil nama dari relasi Prisma Customer
    if (inv.customer && typeof inv.customer === 'object' && inv.customer.name) {
      return inv.customer.name;
    }
    
    // Fallback ke properti pendukung
    if (inv.billTo && inv.billTo !== 'PELANGGAN UMUM') return inv.billTo;
    if (inv.customerName && inv.customerName !== 'PELANGGAN UMUM') return inv.customerName;
    if (inv.clientName && inv.clientName !== 'PELANGGAN UMUM') return inv.clientName;

    return 'PELANGGAN UMUM';
  };

  // ⚡ HELPER MENCARI PRODUK TERKAIT
  const findMatchingProduct = (inv: any) => {
    if (!inv) return null;

    const rawId = inv.productId || (inv.items && inv.items[0]?.productId);
    if (rawId) {
      const byId = products.find((p) => String(p.id || p._id) === String(rawId));
      if (byId) return byId;
    }
    
    const invDesc = (inv.itemDescription || (inv.items && inv.items[0]?.name) || inv.productName || '').toLowerCase().trim();
    if (invDesc) {
      const byName = products.find((p) => {
        const pName = p.name.toLowerCase().trim();
        return pName === invDesc || pName.includes(invDesc) || invDesc.includes(pName);
      });
      if (byName) return byName;
    }

    const itemPrice = Number(inv.price || (inv.items && inv.items[0]?.price) || 0);
    if (itemPrice > 0) {
      const byPrice = products.find((p) => Number(p.price) === itemPrice);
      if (byPrice) return byPrice;
    }

    return null;
  };

  // ⚡ HELPER MENGHITUNG QUANTITY INVOICE
  const calculateInvoiceQty = (inv: any) => {
    if (!inv) return 1;

    const directQty = Number(inv.quantity || inv.qty || inv.totalQty || 0);
    if (directQty > 0) return directQty;

    if (Array.isArray(inv.items) && inv.items.length > 0) {
      const itemQty = inv.items.reduce((acc: number, item: any) => {
        return acc + Number(item.quantity || item.qty || 0);
      }, 0);
      if (itemQty > 0) return itemQty;
    }

    const totalAmt = Number(inv.totalAmount || 0);
    if (totalAmt > 0) {
      const invPrice = Number(inv.price || (inv.items && inv.items[0]?.price) || 0);
      if (invPrice > 0) {
        return Math.round(totalAmt / invPrice);
      }

      const matchedProd = findMatchingProduct(inv);
      const targetPrice = Number(matchedProd?.price || 0);
      if (targetPrice > 0) {
        return Math.round(totalAmt / targetPrice);
      }
    }

    return 1;
  };

  // ⚡ BUKA FORM INVOICE & POPULATE FIELD (FIX: AMBIL NAMA PELANGGAN DENGAN AKURAT)
  const handleOpenInvoiceForm = (inv: any) => {
    setSelectedInvoice(inv);

    const matchedProduct = findMatchingProduct(inv);
    let computedQty = calculateInvoiceQty(inv);

    const firstItem = inv.items && inv.items[0];
    const actualUnit = matchedProduct?.unit || firstItem?.unit || inv.unit || 'UNIT';

    const unitPrice = Number(inv.price || firstItem?.price || matchedProduct?.price || (inv.totalAmount ? Number(inv.totalAmount) / computedQty : 0));
    const calculatedSubTotal = Number(inv.totalAmount || (computedQty * unitPrice));
    
    const taxVal = Number(inv.tax || 0);
    const freightVal = Number(inv.freight || 0);
    const grandTotal = calculatedSubTotal + taxVal + freightVal;

    // Ambil nama pelanggan asli yang diinput saat Transaksi Kilat
    const targetCustomerName = getCustomerName(inv);

    setInvoiceForm({
      invoiceNo: inv.invoiceNo || `INV-${Date.now()}`,
      invoiceDate: inv.date ? new Date(inv.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      shipDate: inv.shipDate || new Date().toISOString().split('T')[0],
      poNumber: inv.poNumber || '',
      billTo: targetCustomerName, // Nama pelanggan dari Stok/Transaksi Kilat akan terkunci di sini
      itemDescription: inv.itemDescription || matchedProduct?.name || firstItem?.name || inv.productName || '',
      quantity: String(computedQty),
      unit: String(actualUnit).toUpperCase(),
      unitPrice: String(unitPrice),
      subTotal: String(calculatedSubTotal),
      tax: String(taxVal),
      freight: String(freightVal),
      say: terbilangRupiah(grandTotal),
      approvedBy: inv.approvedBy || 'JULIANA',
    });

    setIsInvoiceModalOpen(true);
  };

  const handleTaxOrFreightChange = (field: 'tax' | 'freight', value: string) => {
    const updatedForm = { ...invoiceForm, [field]: value };
    const subTotalNum = Number(updatedForm.subTotal || 0);
    const taxNum = Number(updatedForm.tax || 0);
    const freightNum = Number(updatedForm.freight || 0);
    
    const totalGrand = subTotalNum + taxNum + freightNum;
    updatedForm.say = terbilangRupiah(totalGrand);

    setInvoiceForm(updatedForm);
  };

  const handleSaveAndPrintInvoice = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedInvoice) return;

    const invId = selectedInvoice.id || selectedInvoice._id || invoiceForm.invoiceNo;
    const queryParams = new URLSearchParams(invoiceForm).toString();

    try {
      await fetch(`/api/invoice`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: invId,
          ...invoiceForm,
          billTo: invoiceForm.billTo,
          customerName: invoiceForm.billTo,
          isInvoicePrinted: true,
        }),
      }).catch(() => {});
    } catch (error) {
      console.error("Gagal update invoice:", error);
    } finally {
      setIsInvoiceModalOpen(false);
      await fetchInvoices();
      window.open(`/admin/invoice/${invId}?${queryParams}`, '_blank');
    }
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = '/api/products';
    const targetId = currentProduct?.id || currentProduct?._id;
    const method = targetId ? 'PUT' : 'POST';

    const parsedPrice = Number(formData.price);
    const parsedStock = Number(formData.stock);

    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      toast.error('Masukkan nominal harga satuan yang valid!');
      return;
    }

    const payload = {
      kodeBarang: formData.kodeBarang,
      name: formData.name,
      price: parsedPrice,
      stock: parsedStock,
      unit: formData.unit,
    };

    const body = targetId ? { id: targetId, ...payload } : payload;

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        setIsModalOpen(false);
        setFormData({ kodeBarang: '', name: '', price: '', stock: '', unit: 'PAIL' });
        toast.success(targetId ? 'Produk Berhasil Diperbarui!' : 'Produk Baru Berhasil Terdaftar!');
        setCurrentProduct(null);
        await fetchProducts();
      } else {
        const errData = await res.json().catch(() => ({}));
        toast.error(errData.error || errData.message || 'Gagal menyimpan produk.');
      }
    } catch (error) {
      console.error(error);
      toast.error('Terjadi interupsi saat menghubungi server.');
    }
  };

  const handleDeleteProduct = async (id: string) => {
    const prod = products.find((p) => (p.id || p._id) === id);
    if (prod) {
      setDeleteTarget({ id, name: prod.name, type: 'PRODUCT' });
    }
  };

  const handleDeleteInvoice = async (invoiceId: string, invoiceNo: string) => {
    setDeleteTarget({ id: invoiceId, name: invoiceNo, type: 'INVOICE' });
  };

  const handleCreatePendingFaktur = async (inv: any) => {
    try {
      const res = await fetch('/api/faktur', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          invoiceId: inv.id || inv._id,
          productId: inv.productId || (inv.items && inv.items[0]?.productId),
          quantity: calculateInvoiceQty(inv),
          totalAmount: inv.totalAmount,
          customerName: getCustomerName(inv),
          date: new Date().toISOString(),
        }),
      });

      if (res.ok) {
        toast.success(`Faktur Pajak untuk ${inv.invoiceNo} berhasil diterbitkan!`);
        await fetchInvoices();
      } else {
        toast.error('Gagal menerbitkan Faktur Pajak.');
      }
    } catch (error) {
      toast.error('Terjadi kesalahan saat memproses Faktur Pajak.');
    }
  };

  const confirmDeleteExecution = async () => {
    if (!deleteTarget) return;
    const { id, name, type } = deleteTarget;

    try {
      if (type === 'PRODUCT') {
        let res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
        if (!res.ok) {
          res = await fetch(`/api/products?id=${id}`, { method: 'DELETE' });
        }

        if (res.ok) {
          toast.success('Produk Berhasil Dihapus!');
          await fetchProducts();
        } else {
          toast.error('Gagal menghapus produk.');
        }
      } else if (type === 'INVOICE') {
        const targetInvoice = invoices.find((inv) => String(inv.id || inv._id) === String(id));
        const matchedProd = targetInvoice ? findMatchingProduct(targetInvoice) : null;
        
        let targetProductId = matchedProd ? String(matchedProd.id || matchedProd._id) : (targetInvoice?.productId || (targetInvoice?.items && targetInvoice.items[0]?.productId) || '');
        let restoreQty = targetInvoice ? calculateInvoiceQty(targetInvoice) : 0;

        let deleteUrl = `/api/invoice?id=${id}&productId=${targetProductId}&qty=${restoreQty}`;
        let res = await fetch(deleteUrl, { method: 'DELETE' });
        if (!res.ok) {
          deleteUrl = `/api/invoice/${id}?productId=${targetProductId}&qty=${restoreQty}`;
          res = await fetch(deleteUrl, { method: 'DELETE' });
        }

        if (res.ok) {
          if (targetProductId && restoreQty > 0) {
            const currentProd = products.find((p) => String(p.id || p._id) === String(targetProductId));
            if (currentProd) {
              const updatedStock = Number(currentProd.stock || 0) + restoreQty;
              await fetch('/api/products', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  id: targetProductId,
                  stock: updatedStock,
                }),
              }).catch(() => {});
            }
          }

          toast.success(`Invoice ${name} Berhasil Dihapus & Stok Kembali Utuh!`);
          await fetchProducts();
          await fetchInvoices();
          router.refresh();
        } else {
          toast.error('Gagal menghapus data invoice.');
        }
      }
    } catch (error) {
      console.error("Gagal menghapus:", error);
      toast.error('Terjadi kesalahan saat menghapus data.');
    } finally {
      setDeleteTarget(null);
    }
  };

  const handleOpenQuickTxModal = (product: any) => {
    setSelectedQuickProduct(product);
    setQuickTxForm({
      customerName: '',
      quantity: 1,
    });
    setIsQuickTxModalOpen(true);
  };

  // ⚡ EKSEKUSI TRANSAKSI KILAT
  const handleExecuteQuickTransaction = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedQuickProduct) return;

    const product = selectedQuickProduct;
    const customerInput = quickTxForm.customerName.trim();
    const quantity = Number(quickTxForm.quantity);

    if (!customerInput) {
      toast.error('Nama pelanggan wajib diisi!');
      return;
    }

    if (isNaN(quantity) || quantity <= 0) {
      toast.error('Jumlah kuantitas pembelian tidak valid!');
      return;
    }

    if (quantity > product.stock) {
      toast.error(`Jumlah kuantitas (${quantity}) melebihi stok gudang (${product.stock})!`);
      return;
    }

    const targetId = String(product.id || product._id);
    const newInvoiceNo = `INV-${Date.now()}`;
    const productPrice = Number(product.price);
    const totalAmount = productPrice * quantity;
    const customerName = customerInput.toUpperCase();

    try {
      // Panggil API invoice saja, backend yang akan urus pembuatan customer & invoice
      const invoiceRes = await fetch('/api/invoice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          invoiceNo: newInvoiceNo,
          totalAmount: totalAmount,
          subTotal: totalAmount,
          taxAmount: 0,
          freight: 0,
          customerName: customerName,
          billTo: customerName,
          productId: targetId,
          quantity: quantity,
          price: productPrice,
          unit: product.unit,
          itemDescription: product.name,
          productName: product.name,
        }),
      });

      if (!invoiceRes.ok) {
        const errorData = await invoiceRes.json().catch(() => ({}));
        throw new Error(errorData.error || errorData.message || 'Gagal membuat invoice');
      }

      toast.success(`Sukses! Invoice ${newInvoiceNo} dibuat untuk ${customerName}.`);
      setIsQuickTxModalOpen(false);
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || 'Gagal memproses transaksi.');
    } finally {
      await fetchProducts();
      await fetchInvoices();
      router.refresh();
      setActiveMenu('Manajemen Invoice & Faktur Pajak');
    }
  };

  const handleSaveWebSettings = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Pengaturan Web Enterprise Berhasil Disimpan!');
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/logout', { method: 'POST' }).catch(() => {});
      document.cookie = 'admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      window.location.href = '/login';
    } catch (error) {
      console.error('Gagal memproses logout:', error);
      window.location.href = '/login';
    }
  };

  const menuItems = [
    { 
      name: 'Ringkasan Utama', 
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" />
        </svg>
      )
    },
    { 
      name: 'Manajemen Invoice & Faktur Pajak',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
        </svg>
      ),
      badge: invoices.length > 0 ? invoices.length : undefined
    },
    { 
      name: 'Pesan Masuk', 
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25 2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
        </svg>
      ),
      badge: inboxList.length
    },
    { 
      name: 'Stok Produk Sika', 
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-5.25v9" />
        </svg>
      )
    },
    { 
      name: 'Pengaturan Web', 
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.43l-1.003.767c-.3.23-.452.617-.432.998.004.074.006.147.006.22c0 .072-.002.146-.006.22a1.104 1.104 0 0 1-.432.998l1.002.767a1.124 1.124 0 0 1 .26 1.43l-1.296 2.247a1.125 1.125 0 0 1-1.37.49l-1.216-.456a1.125 1.125 0 0 1-1.07.124c-.073.044-.146.087-.22.128-.332.183-.582.495-.645.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.43l1.004-.767c.304-.23.456-.618.434-1-.004-.073-.006-.146-.006-.22 0-.073.002-.146.006-.22a1.104 1.104 0 0 1 .434-.998l-1.004-.767a1.124 1.124 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.49l1.216.456c.356.133.751.072 1.076-.124.072-.041.146-.084.218-.128.333-.183.582-.495.646-.869l.214-1.28z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        </svg>
      )
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-zinc-900 font-sans antialiased flex flex-col md:flex-row relative">
      <Toaster position="top-right" reverseOrder={false} />
      
      {/* NAVBAR MOBILE */}
      <header className="md:hidden bg-zinc-950 text-white px-4 py-4 flex justify-between items-center sticky top-0 z-30 w-full shadow-md">
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-5 bg-[#FFCD00] rounded-[2px]"></div>
          <div className="flex flex-col">
            <span className="font-black text-xs tracking-wider uppercase">JPM PANEL</span>
            <span className="text-[8px] text-[#FFCD00] font-black tracking-widest uppercase">Sika Distributor</span>
          </div>
        </div>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-1 text-white hover:text-[#FFCD00] transition-colors focus:outline-none"
        >
          {isMobileMenuOpen ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </header>

      {/* SIDEBAR DASHBOARD */}
      <aside className={`
        w-64 bg-zinc-950 text-zinc-400 p-5 flex flex-col justify-between shrink-0
        fixed md:sticky top-[53px] md:top-0 h-[calc(100vh-53px)] md:h-screen z-20 transition-transform duration-300 border-r border-zinc-900 shadow-xl
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="space-y-7">
          <div className="hidden md:flex items-center gap-3 px-2 py-1 border-b border-zinc-900 pb-5">
            <div className="w-3 h-7 bg-[#FFCD00] rounded-[2px] shadow-sm shadow-[#FFCD00]/50"></div>
            <div className="flex flex-col">
              <span className="font-black text-base tracking-wider uppercase text-white">JPM PANEL</span>
              <span className="text-[9px] text-[#FFCD00] font-black tracking-widest uppercase">Sika Distributor</span>
            </div>
          </div>

          <nav className="space-y-1">
            {menuItems.map((item) => {
              const isActive = activeMenu === item.name;
              return (
                <a
                  key={item.name}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveMenu(item.name);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-3.5 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 group relative ${
                    isActive 
                      ? 'bg-[#FFCD00] text-zinc-950 font-black shadow-lg shadow-[#FFCD00]/10' 
                      : 'hover:bg-zinc-900 hover:text-white text-zinc-400'
                  }`}
                >
                  <span className={`${isActive ? 'text-zinc-950' : 'text-zinc-500 group-hover:text-[#FFCD00] transition-colors'}`}>
                    {item.icon}
                  </span>
                  <span>{item.name}</span>
                  
                  {item.badge && (
                    <span className={`ml-auto text-[10px] px-2 py-0.5 rounded-full font-black ${
                      isActive ? 'bg-zinc-950 text-[#FFCD00]' : 'bg-amber-500/20 text-[#FFCD00]'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </a>
              );
            })}
          </nav>
        </div>

        <div className="border-t border-zinc-900 pt-4 space-y-3">
          <div className="flex items-center gap-3 px-2 py-1.5 rounded-xl bg-zinc-900/50 border border-zinc-800">
            <div className="w-8 h-8 bg-zinc-800 text-[#FFCD00] font-black rounded-lg flex items-center justify-center text-xs border border-zinc-700 shadow-sm">
              AD
            </div>
            <div className="flex flex-col truncate">
              <span className="text-xs font-bold text-white truncate">Administrator</span>
              <span className="text-[9px] font-medium text-zinc-500 truncate">admin.jpm</span>
            </div>
          </div>
          
          <button 
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center gap-3 text-xs font-black text-red-400 hover:text-red-500 hover:bg-red-500/10 px-4 py-3 rounded-xl transition-all uppercase tracking-wider border border-transparent hover:border-red-500/20 cursor-pointer shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
            </svg>
            <span>Keluar Sistem</span>
          </button>
        </div>
      </aside>

      {/* Backdrop Mobile */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-zinc-950/40 backdrop-blur-sm z-10 md:hidden top-[53px]"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* AREA KONTEN UTAMA */}
      <main className="flex-1 p-4 md:p-10 max-w-7xl w-full mx-auto space-y-6 md:space-y-8 overflow-hidden">
        
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-zinc-200 pb-5 gap-3">
          <div>
            <div className="text-[9px] md:text-[10px] font-black uppercase tracking-widest bg-amber-500/10 text-amber-600 px-2.5 py-1 rounded-lg inline-block mb-1.5 border border-amber-500/20 shadow-sm">
              Panel Kendali Utama
            </div>
            <h1 className="text-lg md:text-2xl font-black text-zinc-950 tracking-tight">
              {activeMenu}
            </h1>
            <p className="text-[11px] md:text-xs font-medium text-zinc-500 mt-0.5">
              Data operasional web PT. Jasa Prima Makmur secara real-time.
            </p>
          </div>
          
          <div className="flex items-center gap-2.5 bg-white px-3.5 py-2 rounded-xl border border-zinc-200 shadow-sm self-start sm:self-auto">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 shadow-sm shadow-emerald-500"></span>
            </span>
            <span className="text-[10px] md:text-[11px] font-black text-zinc-800 uppercase tracking-wider">Terhubung</span>
          </div>
        </header>

        {/* TAB 1: RINGKASAN UTAMA */}
        {activeMenu === 'Ringkasan Utama' && (
          <>
            <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:grid-cols-3">
              <div className="bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-zinc-200 hover:shadow-md transition-shadow duration-300">
                <span className="text-[10px] font-black uppercase text-zinc-400 tracking-wider">Total Invoice Riil</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <h3 className="text-2xl md:text-3xl font-black text-zinc-950 tracking-tight">{invoices.length}</h3>
                  <span className="text-[9px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">Database</span>
                </div>
              </div>
              
              <div className="bg-[#FFFDF0] p-5 md:p-6 rounded-2xl shadow-sm border border-amber-200/80 hover:shadow-md transition-shadow duration-300">
                <span className="text-[10px] font-black uppercase text-amber-700 tracking-wider">Omset Faktur Berjalan</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <h3 className="text-lg md:text-xl font-black text-zinc-950 tracking-tight">Rp {stats.totalOmset.toLocaleString('id-ID')}</h3>
                </div>
              </div>
              
              <div className="bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-zinc-200 hover:shadow-md transition-shadow duration-300">
                <span className="text-[10px] font-black uppercase text-zinc-400 tracking-wider">Varian Jenis Material</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <h3 className="text-2xl md:text-3xl font-black text-zinc-950 tracking-tight">{products.length}</h3>
                  <span className="text-[9px] font-medium text-zinc-400">SKU Terdaftar</span>
                </div>
              </div>
            </section>

            <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white rounded-2xl shadow-md border border-zinc-200/80 overflow-hidden">
                <div className="px-6 py-4 border-b border-zinc-100 flex justify-between items-center bg-zinc-900 text-white">
                  <div className="flex items-center gap-2.5">
                    <span className="w-1.5 h-4 bg-[#FFCD00] rounded-full"></span>
                    <h2 className="text-xs font-black uppercase tracking-wider text-white">Aktivitas Transaksi Gudang</h2>
                  </div>
                  <span 
                    className="text-[10px] font-black uppercase tracking-wider text-amber-400 bg-amber-400/10 px-3 py-1 rounded-lg border border-amber-400/20 cursor-pointer hover:bg-amber-400 hover:text-zinc-950 transition-all duration-200 shadow-sm" 
                    onClick={() => setActiveMenu('Manajemen Invoice & Faktur Pajak')}
                  >
                    Lihat Semua
                  </span>
                </div>
                
                <div className="overflow-x-auto block w-full">
                  <table className="w-full text-left border-collapse min-w-[550px]">
                    <thead>
                      <tr className="bg-zinc-900/95 text-[10px] uppercase font-black text-zinc-400 border-b border-zinc-800">
                        <th className="px-6 py-3.5 tracking-wider">No. Invoice</th>
                        <th className="px-6 py-3.5 tracking-wider">Nama Pelanggan</th>
                        <th className="px-6 py-3.5 tracking-wider">Tanggal</th>
                        <th className="px-6 py-3.5 text-right tracking-wider pr-6">Nilai Tagihan</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100 font-medium text-xs text-zinc-700 bg-white">
                      {invoices.length === 0 ? (
                        <tr>
                          <td colSpan={4} className="px-6 py-12 text-center text-zinc-400 font-bold uppercase text-[10px] tracking-wider bg-zinc-50/10">
                            Belum ada aktivitas penjualan barang terekam.
                          </td>
                        </tr>
                      ) : (
                        invoices.slice(0, 5).map((inv) => (
                          <tr key={inv.id || inv._id} className="hover:bg-amber-500/[0.04] transition-all duration-150 group">
                            <td className="px-6 py-4 font-mono font-bold text-amber-600 tracking-tight whitespace-nowrap group-hover:text-amber-700 group-hover:translate-x-0.5 transition-transform">
                              {inv.invoiceNo}
                            </td>
                            <td className="px-6 py-4 text-zinc-950 font-black uppercase truncate max-w-[160px] whitespace-nowrap">
                              {getCustomerName(inv)}
                            </td>
                            <td className="px-6 py-4 text-zinc-500 whitespace-nowrap">
                              {new Date(inv.date).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}
                            </td>
                            <td className="px-6 py-4 text-right font-mono font-black text-zinc-950 pr-6 whitespace-nowrap">
                              Rp {inv.totalAmount ? Number(inv.totalAmount).toLocaleString('id-ID') : 0}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 p-5 space-y-4">
                <h2 className="text-[10px] md:text-xs font-black uppercase tracking-wider text-zinc-950 border-b border-zinc-100 pb-2.5">🚨 Kontrol Logistik & Sistem</h2>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-zinc-700">Status Gudang Utama</span>
                    <span className="text-emerald-600 font-black">Aktif</span>
                  </div>
                  <div className="w-full bg-zinc-100 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full w-[100%] shadow-sm"></div>
                  </div>
                </div>
                <div className="bg-[#FFFDF0] border border-[#FFECA0] p-4 rounded-xl">
                  <p className="text-[11px] font-medium text-zinc-700 leading-relaxed">
                    📌 <strong>Otomatisasi:</strong> Setiap pembuatan Invoice baru memotong sisa kuantitas barang di modul <strong>Stok Produk Sika</strong>, dan menghapus Invoice mengembalikan kuantitas stoknya secara otomatis.
                  </p>
                </div>
              </div>
            </section>
          </>
        )}

        {/* TAB 2: MANAJEMEN INVOICE & FAKTUR PAJAK */}
        {activeMenu === 'Manajemen Invoice & Faktur Pajak' && (
          <div className="bg-white border border-zinc-200/80 rounded-2xl shadow-md overflow-hidden transition-all">
            <div className="p-5 border-b border-zinc-200/80 flex justify-between items-center bg-gradient-to-r from-zinc-900 via-zinc-900 to-zinc-950 text-white">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-4 bg-[#FFCD00] rounded-sm"></span>
                  <h2 className="text-xs md:text-sm font-black uppercase tracking-wider text-white">Daftar Invoice & Faktur Pajak Resmi JPM</h2>
                </div>
                <p className="text-[11px] text-zinc-400 mt-1">Klik cetak untuk membuka dokumen bebas style asli dari database.</p>
              </div>
            </div>

            <div className="overflow-x-auto block w-full bg-white">
              <table className="w-full text-left border-collapse min-w-[900px]">
                <thead>
                  <tr className="bg-zinc-900 text-[10px] font-black text-zinc-400 uppercase tracking-wider border-b border-zinc-800">
                    <th className="py-4 px-6 whitespace-nowrap">No. Invoice</th>
                    <th className="py-4 px-6 whitespace-nowrap">Nama Pelanggan</th>
                    <th className="py-4 px-6 whitespace-nowrap">Tanggal Buat</th>
                    <th className="py-4 px-6 text-center whitespace-nowrap w-28">Stok Dibeli</th>
                    <th className="py-4 px-6 text-right whitespace-nowrap">Total Tagihan</th>
                    <th className="py-4 px-6 text-center whitespace-nowrap w-44">Status Dokumen</th>
                    <th className="py-4 px-6 text-center whitespace-nowrap w-48">Cetak Dokumen</th>
                    <th className="py-4 px-6 text-center whitespace-nowrap w-20">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 text-xs font-medium text-zinc-700 bg-white">
                  {invoices.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="py-16 text-center text-zinc-400 font-bold uppercase text-[10px] tracking-wider bg-zinc-50/20">
                        Belum ada invoice di database gudang.
                      </td>
                    </tr>
                  ) : (
                    invoices.map((inv) => {
                      const computedQty = calculateInvoiceQty(inv);
                      const isInvDone = Boolean(inv.isInvoicePrinted || inv.shipDate || inv.poNumber);
                      const isFakturReady = Boolean(inv.hasFaktur !== false);

                      return (
                        <tr key={inv.id || inv._id || inv.invoiceNo} className="hover:bg-amber-500/[0.03] transition-all duration-150 group">
                          <td className="py-4.5 px-6 font-mono font-bold text-amber-600 tracking-tight whitespace-nowrap group-hover:text-amber-700 group-hover:translate-x-0.5 transition-transform">
                            {inv.invoiceNo}
                          </td>
                          <td className="py-4.5 px-6 font-black uppercase text-zinc-950 truncate max-w-[170px] whitespace-nowrap">
                            {getCustomerName(inv)}
                          </td>
                          <td className="py-4.5 px-6 text-zinc-500 whitespace-nowrap">
                            {new Date(inv.date).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}
                          </td>
                          
                          <td className="py-4.5 px-6 text-center whitespace-nowrap">
                            <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-500/10 via-amber-500/15 to-amber-500/10 text-amber-900 px-2.5 py-1 rounded-lg font-mono font-black text-xs border border-amber-300/60 shadow-sm shadow-amber-500/5 group-hover:border-amber-400 transition-colors">
                              <span>{computedQty}</span>
                              <span className="font-sans text-[9px] text-amber-700 font-bold uppercase tracking-wider">QTY</span>
                            </span>
                          </td>

                          <td className="py-4.5 px-6 text-right font-mono font-black text-zinc-950 whitespace-nowrap text-sm">
                            Rp {inv.totalAmount ? Number(inv.totalAmount).toLocaleString('id-ID') : 0}
                          </td>

                          <td className="py-4.5 px-6 text-center whitespace-nowrap">
                            {isInvDone && isFakturReady ? (
                              <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full text-[10px] font-black border border-emerald-200/80 shadow-sm">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                Lengkap (Inv + Pajak)
                              </span>
                            ) : isInvDone ? (
                              <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full text-[10px] font-black border border-blue-200/80 shadow-sm">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                                Inv Selesai (Pajak Pending)
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-800 px-2.5 py-1 rounded-full text-[10px] font-black border border-amber-200/80 shadow-sm">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping"></span>
                                Form Pending / Belum Dicetak
                              </span>
                            )}
                          </td>

                          <td className="py-4.5 px-6 whitespace-nowrap">
                            <div className="flex gap-1.5 justify-center">
                              <button
                                onClick={() => handleOpenInvoiceForm(inv)}
                                className="bg-[#FFCD00] hover:bg-amber-400 text-zinc-950 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider border border-amber-400 transition-all duration-150 shadow-sm hover:shadow active:scale-95 flex items-center gap-1 cursor-pointer"
                              >
                                📄 INV
                              </button>

                              {isFakturReady ? (
                                <Link
                                  href={`/admin/faktur/${inv.id || inv._id}`}
                                  target="_blank"
                                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all duration-150 shadow-sm hover:shadow active:scale-95 flex items-center gap-1"
                                >
                                  🧾 PAJAK
                                </Link>
                              ) : (
                                <button
                                  onClick={() => handleCreatePendingFaktur(inv)}
                                  className="bg-zinc-50 hover:bg-zinc-100 text-zinc-400 hover:text-zinc-700 px-2.5 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider border border-dashed border-zinc-300 transition-all duration-150 active:scale-95 flex items-center gap-1"
                                  title="Klik untuk menerbitkan Faktur Pajak sekarang"
                                >
                                  ➕ Buat Pajak
                                </button>
                              )}
                            </div>
                          </td>

                          <td className="py-4.5 px-6 whitespace-nowrap text-center">
                            <button
                              onClick={() => handleDeleteInvoice(inv.id || inv._id, inv.invoiceNo)}
                              className="p-2 text-zinc-400 hover:text-red-600 rounded-xl hover:bg-red-50 border border-transparent hover:border-red-100 transition-all duration-150 active:scale-95"
                              title="Hapus Invoice"
                            >
                              <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                              </svg>
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: PESAN MASUK (INBOX HUB ENTERPRISE) */}
        {activeMenu === 'Pesan Masuk' && (
          <div className="space-y-4 md:space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-zinc-900 text-white p-4 md:p-5 rounded-2xl border border-zinc-800 shadow-md gap-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-7 bg-[#FFCD00] rounded-sm"></div>
                <div>
                  <h2 className="text-xs md:text-sm font-black uppercase tracking-wider text-white">Hub Pesan & Penawaran Masuk</h2>
                  <p className="text-[11px] text-zinc-400">Pesan dari calon pembeli & permintaan penawaran resmi Sika Distributor.</p>
                </div>
              </div>
              <span className="bg-amber-500/20 text-[#FFCD00] px-3.5 py-1.5 rounded-xl font-black text-xs border border-amber-500/30 uppercase tracking-widest">
                {inboxList.length} Pesan Aktif
              </span>
            </div>

            <div className="bg-white border border-zinc-200/80 rounded-2xl shadow-md overflow-hidden">
              <div className="overflow-x-auto block w-full">
                <table className="w-full text-left border-collapse min-w-[750px]">
                  <thead>
                    <tr className="bg-zinc-900 text-[10px] font-black text-zinc-400 uppercase tracking-wider border-b border-zinc-800">
                      <th className="py-4 px-6 whitespace-nowrap">Pengirim</th>
                      <th className="py-4 px-6 whitespace-nowrap">Subjek / Perihal</th>
                      <th className="py-4 px-6 whitespace-nowrap w-40">Waktu</th>
                      <th className="py-4 px-6 text-center whitespace-nowrap w-36">Status</th>
                      <th className="py-4 px-6 text-center whitespace-nowrap w-28">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100 text-xs font-medium text-zinc-700 bg-white">
                    {inboxList.map((msg) => (
                      <tr key={msg.id} className="hover:bg-amber-500/[0.03] transition-all duration-150 group">
                        <td className="py-4.5 px-6 whitespace-nowrap">
                          <div className="flex flex-col">
                            <span className="font-black text-zinc-950 uppercase">{msg.name}</span>
                            <span className="text-[10px] text-zinc-400 font-mono">{msg.email}</span>
                          </div>
                        </td>
                        <td className="py-4.5 px-6 font-bold text-zinc-900 truncate max-w-[280px]">
                          {msg.subject}
                        </td>
                        <td className="py-4.5 px-6 text-zinc-500 whitespace-nowrap font-mono text-[11px]">
                          {msg.date}
                        </td>
                        <td className="py-4.5 px-6 text-center whitespace-nowrap">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black tracking-wider border shadow-sm ${
                            msg.status === 'Belum Dibaca'
                              ? 'bg-amber-50 text-amber-700 border-amber-300'
                              : msg.status === 'Perlu Tindak Lanjut'
                              ? 'bg-blue-50 text-blue-700 border-blue-200'
                              : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          }`}>
                            {msg.status}
                          </span>
                        </td>
                        <td className="py-4.5 px-6 whitespace-nowrap text-center">
                          <button
                            onClick={() => setSelectedMessage(msg)}
                            className="bg-zinc-900 hover:bg-zinc-800 text-[#FFCD00] px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all shadow-sm active:scale-95"
                          >
                            👁 Baca
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: STOK PRODUK SIKA */}
        {activeMenu === 'Stok Produk Sika' && (
          <div className="space-y-4 md:space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-zinc-900 text-white p-4 md:p-5 rounded-2xl border border-zinc-800 shadow-md gap-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-7 bg-[#FFCD00] rounded-sm"></div>
                <div>
                  <h2 className="text-xs md:text-sm font-black uppercase tracking-wider text-white">Gudang Logistik Sika & Aspal</h2>
                  <p className="text-[11px] text-zinc-400">Kelola stok barang, penyesuaian harga, dan pembuatan transaksi kilat.</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setCurrentProduct(null);
                  setFormData({ kodeBarang: '', name: '', price: '', stock: '', unit: 'PAIL' });
                  setIsModalOpen(true);
                }}
                className="w-full sm:w-auto bg-[#FFCD00] text-zinc-950 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider hover:bg-amber-400 transition-all duration-200 shadow-md border border-amber-400 flex items-center justify-center gap-2 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Tambah Produk Baru
              </button>
            </div>

            <div className="bg-white border border-zinc-200/80 rounded-2xl shadow-md overflow-hidden">
              <div className="overflow-x-auto block w-full">
                <table className="w-full text-left border-collapse min-w-[850px]">
                  <thead>
                    <tr className="bg-zinc-900 text-[10px] font-black text-zinc-400 uppercase tracking-wider border-b border-zinc-800">
                      <th className="py-4 px-6 whitespace-nowrap w-28">Kode</th>
                      <th className="py-4 px-6 whitespace-nowrap">Nama Material Barang</th>
                      <th className="py-4 px-6 whitespace-nowrap w-56">Harga Satuan Dasar</th>
                      <th className="py-4 px-6 text-center whitespace-nowrap w-36">Volume Stok</th>
                      <th className="py-4 px-6 text-center whitespace-nowrap w-48">Buat Transaksi Kilat</th>
                      <th className="py-4 px-6 text-center whitespace-nowrap w-36">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100 text-xs font-medium text-zinc-700 bg-white">
                    {products.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-16 text-center text-zinc-400 font-bold uppercase text-[10px] tracking-wider bg-zinc-50/20">
                          Belum ada produk Sika yang terdaftar.
                        </td>
                      </tr>
                    ) : (
                      products.map((prod) => (
                        <tr key={prod.id || prod._id} className="hover:bg-amber-500/[0.03] transition-all duration-150 group">
                          <td className="py-4.5 px-6 font-mono font-bold text-zinc-400 tracking-tight whitespace-nowrap group-hover:text-zinc-700 uppercase">
                            {prod.kodeBarang}
                          </td>
                          <td className="py-4.5 px-6 font-black text-zinc-900 uppercase tracking-tight truncate max-w-[220px] whitespace-nowrap">
                            {prod.name}
                          </td>
                          <td className="py-4.5 px-6 font-mono font-bold text-zinc-950 whitespace-nowrap text-xs">
                            Rp {Number(prod.price).toLocaleString('id-ID')} / <span className="text-zinc-400 font-sans text-[11px] font-bold uppercase">{prod.unit}</span>
                          </td>
                          <td className="py-4.5 px-6 text-center whitespace-nowrap">
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black tracking-wider border shadow-sm ${
                              prod.stock <= 10 
                                ? 'bg-red-50 text-red-600 border-red-200' 
                                : 'bg-emerald-50 text-emerald-700 border-emerald-200/80'
                            }`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${prod.stock <= 10 ? 'bg-red-500' : 'bg-emerald-500'}`}></span>
                              {prod.stock} {prod.unit}
                            </span>
                          </td>
                          <td className="py-4.5 px-6 whitespace-nowrap">
                            <div className="flex justify-center">
                              <button
                                onClick={() => handleOpenQuickTxModal(prod)}
                                className="bg-zinc-950 text-[#FFCD00] hover:bg-amber-400 hover:text-zinc-950 px-4 py-2 rounded-xl font-black uppercase text-[10px] tracking-wider transition-all duration-150 border border-zinc-900 shadow-sm hover:shadow active:scale-95 flex items-center gap-1.5 cursor-pointer"
                                title="Buat Invoice & Faktur Pajak Sekaligus"
                              >
                                <span>⚡ Inv & Pajak</span>
                              </button>
                            </div>
                          </td>
                          <td className="py-4.5 px-6 whitespace-nowrap">
                            <div className="flex gap-1.5 justify-center items-center">
                              <button
                                onClick={() => {
                                  setViewProduct(prod);
                                  setIsViewModalOpen(true);
                                }}
                                className="p-2 text-zinc-400 hover:text-zinc-950 hover:bg-zinc-100 rounded-lg border border-transparent hover:border-zinc-200 transition-all active:scale-95 cursor-pointer"
                                title="Lihat Detail Produk"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg>
                              </button>
                              <button
                                onClick={() => {
                                  setCurrentProduct(prod);
                                  setFormData({
                                    kodeBarang: prod.kodeBarang,
                                    name: prod.name,
                                    price: prod.price.toString(),
                                    stock: prod.stock.toString(),
                                    unit: prod.unit,
                                  });
                                  setIsModalOpen(true);
                                }}
                                className="p-2 text-zinc-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg border border-transparent hover:border-blue-100 transition-all active:scale-95 cursor-pointer"
                                title="Edit Detail Produk"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                </svg>
                              </button>
                              <button
                                onClick={() => handleDeleteProduct(prod.id || prod._id)}
                                className="p-2 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded-lg border border-transparent hover:border-red-100 transition-all active:scale-95 cursor-pointer"
                                title="Hapus Produk"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                              </svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: PENGATURAN WEB (ENTERPRISE CONFIGURATION) */}
        {activeMenu === 'Pengaturan Web' && (
          <div className="bg-white border border-zinc-200/80 rounded-2xl shadow-md p-6 md:p-8 space-y-6">
            <div className="border-b border-zinc-100 pb-4">
              <h2 className="text-sm md:text-base font-black text-zinc-950 uppercase tracking-wide">⚙️ Konfigurasi Portal Enterprise JPM</h2>
              <p className="text-xs text-zinc-500">Kelola identitas resmi, alamat surel pengirim invoice, dan status proteksi sistem.</p>
            </div>

            <form onSubmit={handleSaveWebSettings} className="space-y-5 max-w-2xl">
              <div>
                <label className="text-xs font-black text-zinc-700 uppercase tracking-wider block mb-1">Nama Resmi Perusahaan</label>
                <input 
                  type="text" 
                  value={webSettings.companyName} 
                  onChange={(e) => setWebSettings({ ...webSettings, companyName: e.target.value })} 
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200 text-xs font-bold focus:outline-zinc-950" 
                />
              </div>

              <div>
                <label className="text-xs font-black text-zinc-700 uppercase tracking-wider block mb-1">Email Administrator & Gateway</label>
                <input 
                  type="email" 
                  value={webSettings.adminEmail} 
                  onChange={(e) => setWebSettings({ ...webSettings, adminEmail: e.target.value })} 
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200 text-xs font-mono font-bold focus:outline-zinc-950" 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-black text-zinc-700 uppercase tracking-wider block mb-1">Tarif PPN Standar (%)</label>
                  <input 
                    type="number" 
                    value={webSettings.defaultTaxRate} 
                    onChange={(e) => setWebSettings({ ...webSettings, defaultTaxRate: e.target.value })} 
                    className="w-full px-4 py-3 rounded-xl border border-zinc-200 text-xs font-mono font-bold focus:outline-zinc-950" 
                  />
                </div>
                <div>
                  <label className="text-xs font-black text-zinc-700 uppercase tracking-wider block mb-1">Status Keamanan Server</label>
                  <input 
                    type="text" 
                    readOnly 
                    value={webSettings.systemStatus} 
                    className="w-full px-4 py-3 rounded-xl border border-emerald-200 text-xs font-black bg-emerald-50 text-emerald-700 cursor-not-allowed" 
                  />
                </div>
              </div>

              <div className="pt-3">
                <button 
                  type="submit" 
                  className="bg-[#FFCD00] hover:bg-amber-400 text-zinc-950 px-6 py-3.5 rounded-xl text-xs font-black uppercase tracking-wider shadow-md transition-all border border-amber-400 cursor-pointer"
                >
                  💾 Simpan Perubahan Konfigurasi
                </button>
              </div>
            </form>
          </div>
        )}

      </main>

      {/* 🚀 MODAL POPUP TRANSAKSI KILAT BERGAYA MEWAH */}
      {isQuickTxModalOpen && selectedQuickProduct && (
        <div className="fixed inset-0 bg-zinc-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden border border-zinc-200 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            {/* Header Gelap Emas */}
            <div className="bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 p-6 text-white flex justify-between items-center border-b border-zinc-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#FFCD00] rounded-2xl flex items-center justify-center text-zinc-950 font-black text-lg shadow-md shadow-[#FFCD00]/20">
                  ⚡
                </div>
                <div>
                  <h3 className="font-black text-sm uppercase tracking-wider text-white">Transaksi Kilat Otomatis</h3>
                  <p className="text-[10px] text-[#FFCD00] font-mono font-bold uppercase mt-0.5">Terbitkan Invoice & Faktur Pajak Sekaligus</p>
                </div>
              </div>
              <button 
                onClick={() => setIsQuickTxModalOpen(false)} 
                className="w-8 h-8 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-full flex items-center justify-center font-bold transition text-xs border border-zinc-700 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleExecuteQuickTransaction} className="p-6 space-y-5">
              {/* Box Info Produk */}
              <div className="bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent p-4 rounded-2xl border border-amber-300/60 flex justify-between items-center">
                <div>
                  <span className="text-[9px] font-black uppercase text-amber-700 tracking-wider block">Produk Terpilih</span>
                  <span className="text-xs font-black text-zinc-950 uppercase">{selectedQuickProduct.name}</span>
                  <span className="text-[10px] font-mono text-zinc-500 block font-bold mt-0.5">Kode: {selectedQuickProduct.kodeBarang}</span>
                </div>
                <div className="text-right">
                  <span className="text-[9px] font-black uppercase text-zinc-400 tracking-wider block">Harga Satuan</span>
                  <span className="text-xs font-mono font-black text-zinc-950">Rp {Number(selectedQuickProduct.price).toLocaleString('id-ID')}</span>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-black uppercase text-zinc-700 tracking-wider block mb-1">
                    Nama Pelanggan / Perusahaan Pembeli
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="CONTOH: PT. WASKITA KARYA (PERSERO)"
                    value={quickTxForm.customerName}
                    onChange={(e) => setQuickTxForm({ ...quickTxForm, customerName: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-zinc-200 text-xs font-bold uppercase focus:outline-zinc-950 shadow-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-black uppercase text-zinc-700 tracking-wider block mb-1">
                      Kuantitas ({selectedQuickProduct.unit})
                    </label>
                    <input
                      type="number"
                      required
                      min={1}
                      max={selectedQuickProduct.stock}
                      value={quickTxForm.quantity}
                      onChange={(e) => setQuickTxForm({ ...quickTxForm, quantity: Number(e.target.value) })}
                      className="w-full px-4 py-3 rounded-xl border border-zinc-200 text-xs font-mono font-bold focus:outline-zinc-950 shadow-sm"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase text-zinc-400 tracking-wider block mb-1">
                      Stok Gudang Sisa
                    </label>
                    <div className="px-4 py-3 bg-zinc-100 rounded-xl text-xs font-mono font-black text-zinc-800 border border-zinc-200">
                      {selectedQuickProduct.stock - quickTxForm.quantity} {selectedQuickProduct.unit}
                    </div>
                  </div>
                </div>

                {/* Perhitungan Total Ringkasan */}
                <div className="bg-zinc-950 p-4 rounded-2xl text-white space-y-2 border border-zinc-800 shadow-inner">
                  <div className="flex justify-between text-[11px] font-bold text-zinc-400">
                    <span>Estimasi Total Tagihan:</span>
                    <span className="text-[#FFCD00] font-mono font-black text-sm">
                      Rp {(Number(selectedQuickProduct.price) * (quickTxForm.quantity || 1)).toLocaleString('id-ID')}
                    </span>
                  </div>
                  <div className="text-[9px] text-zinc-500 font-medium">
                    ⚡ Sistem akan menerbitkan nomor invoice baru, Faktur Pajak otomatis, dan mengurangi stok gudang secara real-time.
                  </div>
                </div>
              </div>

              <div className="flex gap-2.5 pt-2 justify-end">
                <button
                  type="button"
                  onClick={() => setIsQuickTxModalOpen(false)}
                  className="px-5 py-3 rounded-xl text-xs font-bold text-zinc-500 hover:bg-zinc-100 transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="bg-[#FFCD00] text-zinc-950 hover:bg-amber-400 px-6 py-3.5 rounded-xl text-xs font-black uppercase tracking-wider transition shadow-lg border border-amber-400 flex items-center gap-2 cursor-pointer"
                >
                  <span>🚀 TERBITKAN TRANSAKSI SEKARANG</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 📬 MODAL POPUP BACA PESAN MASUK */}
      {selectedMessage && (
        <div className="fixed inset-0 bg-zinc-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden border border-zinc-200 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="bg-zinc-950 p-5 text-white flex justify-between items-center border-b border-zinc-800">
              <div>
                <span className="text-[9px] text-[#FFCD00] font-black uppercase tracking-widest block">Detail Inbox Client</span>
                <h3 className="font-black text-xs uppercase tracking-wider text-white">{selectedMessage.name}</h3>
              </div>
              <button 
                onClick={() => setSelectedMessage(null)} 
                className="w-7 h-7 bg-zinc-900 text-zinc-400 hover:text-white rounded-full flex items-center justify-center font-bold transition text-xs"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="border-b border-zinc-100 pb-3">
                <span className="text-[10px] font-black uppercase text-zinc-400 tracking-wider block">Perihal Pesan:</span>
                <h4 className="text-xs font-black text-zinc-950 mt-0.5">{selectedMessage.subject}</h4>
                <span className="text-[10px] text-zinc-400 font-mono mt-1 block">{selectedMessage.email} &bull; {selectedMessage.date}</span>
              </div>

              <div className="bg-zinc-50 p-4 rounded-2xl border border-zinc-100">
                <p className="text-xs text-zinc-700 leading-relaxed font-medium">
                  "{selectedMessage.message}"
                </p>
              </div>
            </div>

            <div className="bg-zinc-50 px-6 py-3.5 border-t border-zinc-100 flex justify-end">
              <button
                onClick={() => setSelectedMessage(null)}
                className="bg-[#FFCD00] text-zinc-950 hover:bg-amber-400 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider shadow-sm transition"
              >
                Tutup Pesan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VIEW DETAIL POPUP PRODUK */}
      {isViewModalOpen && viewProduct && (
        <div className="fixed inset-0 bg-zinc-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden border border-zinc-200 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="bg-zinc-950 p-5 text-white flex justify-between items-center border-b border-zinc-800">
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-5 bg-[#FFCD00] rounded-[2px]"></div>
                <div>
                  <h3 className="font-black text-xs uppercase tracking-wider text-white">Detail Manufaktur Material</h3>
                  <p className="text-[10px] text-[#FFCD00] font-mono tracking-wider font-bold mt-0.5">{viewProduct.kodeBarang}</p>
                </div>
              </div>
              <button 
                onClick={() => setIsViewModalOpen(false)} 
                className="w-7 h-7 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white text-xs rounded-full flex items-center justify-center font-bold transition"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <span className="text-[10px] font-black uppercase text-zinc-400 tracking-wider block mb-0.5">Nama Resmi Produk</span>
                <p className="text-xs md:text-sm font-black text-zinc-950 uppercase tracking-tight leading-snug bg-zinc-50 p-3.5 rounded-2xl border border-zinc-100">
                  {viewProduct.name}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="border border-zinc-100 bg-zinc-50/50 p-3.5 rounded-2xl">
                  <span className="text-[10px] font-black uppercase text-zinc-400 tracking-wider block mb-0.5">Harga Satuan</span>
                  <div className="text-xs md:text-sm font-mono font-bold text-zinc-950">
                    Rp {Number(viewProduct.price).toLocaleString('id-ID')}
                  </div>
                </div>
                <div className="border border-zinc-100 bg-zinc-50/50 p-3.5 rounded-2xl">
                  <span className="text-[10px] font-black uppercase text-zinc-400 tracking-wider block mb-0.5">Stok Gudang</span>
                  <div className="flex items-center gap-1">
                    <span className="text-xs md:text-sm font-mono font-black text-zinc-950">
                      {viewProduct.stock} <span className="font-sans text-[10px] text-zinc-500 font-bold uppercase">{viewProduct.unit}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-zinc-50 px-6 py-3.5 flex justify-end border-t border-zinc-100">
              <button 
                type="button" 
                onClick={() => setIsViewModalOpen(false)} 
                className="bg-[#FFCD00] text-zinc-950 hover:bg-amber-400 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition shadow-sm"
              >
                Selesai & Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL FORM TAMBAH/EDIT PRODUK */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-zinc-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 border border-zinc-200 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex justify-between items-center border-b border-zinc-100 pb-3">
              <h3 className="font-black text-xs uppercase tracking-wider text-zinc-950">
                {currentProduct ? '📝 Perbarui Detail Logistik' : '🚀 Registrasi Barang Kena Pajak'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-zinc-400 hover:text-zinc-600 text-sm font-bold">✕</button>
            </div>
            
            <form onSubmit={handleSaveProduct} className="space-y-3.5">
              <div>
                <label className="text-[10px] font-black uppercase text-zinc-400 block mb-1">Kode Barang / SKUs</label>
                <input 
                  type="text" 
                  required 
                  value={formData.kodeBarang} 
                  onChange={(e) => setFormData({...formData, kodeBarang: e.target.value})} 
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 text-xs font-mono font-bold focus:outline-zinc-950" 
                  placeholder="Contoh: SK-001" 
                />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase text-zinc-400 block mb-1">Nama Deskripsi Material</label>
                <input 
                  type="text" 
                  required 
                  value={formData.name} 
                  onChange={(e) => setFormData({...formData, name: e.target.value})} 
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 text-xs font-bold uppercase focus:outline-zinc-950" 
                  placeholder="Contoh: SIKA VISCOCRETE 5002N @200 LITER" 
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-black uppercase text-zinc-400 block mb-1">Harga Satuan (Rp)</label>
                  <input 
                    type="number" 
                    required 
                    value={formData.price} 
                    onChange={(e) => setFormData({...formData, price: e.target.value})} 
                    className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 text-xs font-mono font-bold focus:outline-zinc-950" 
                    placeholder="5000000"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase text-zinc-400 block mb-1">Stok</label>
                  <input 
                    type="number" 
                    required 
                    value={formData.stock} 
                    onChange={(e) => setFormData({...formData, stock: e.target.value})} 
                    className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 text-xs font-mono font-bold focus:outline-zinc-950" 
                    placeholder="30"
                  />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-black uppercase text-zinc-400 block mb-1">Satuan Kemasan</label>
                <select 
                  value={formData.unit} 
                  onChange={(e) => setFormData({...formData, unit: e.target.value})} 
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 text-xs font-bold focus:outline-zinc-950 bg-white"
                >
                  <option value="PAIL">PAIL</option>
                  <option value="SAK">SAK</option>
                  <option value="DRUM">DRUM</option>
                  <option value="KG">KG</option>
                  <option value="UNIT">UNIT</option>
                  <option value="ROLL">ROLL</option>
                </select>
              </div>

              <div className="flex gap-2 pt-3 justify-end border-t border-zinc-100">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2.5 rounded-xl text-xs font-bold text-zinc-500 hover:bg-zinc-100 transition">Batal</button>
                <button type="submit" className="bg-zinc-950 text-[#FFCD00] px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider hover:bg-zinc-900 transition shadow-md">Simpan Data</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 🔓 MODAL FORM INVOICE (FIX: FIELD BILL TO SEKARANG TERKUNCI & MEMBACA NAMA TERDAFTAR) */}
      {isInvoiceModalOpen && selectedInvoice && (
        <div className="fixed inset-0 bg-zinc-950/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 border border-zinc-200 shadow-2xl space-y-4 max-h-[92vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-150">
            <div className="flex justify-between items-center border-b border-zinc-100 pb-3">
              <div>
                <h3 className="font-black text-xs uppercase tracking-wider text-zinc-950 flex items-center gap-1.5">
                  <span>🔒 FORM INVOICE JPM:</span>
                  <span className="font-mono text-amber-600">{invoiceForm.invoiceNo}</span>
                </h3>
                <p className="text-[10px] text-zinc-500 mt-0.5">Periksa rincian data dan detail pengiriman sebelum mencetak PDF.</p>
              </div>
              <button onClick={() => setIsInvoiceModalOpen(false)} className="text-zinc-400 hover:text-zinc-600 text-sm font-bold">✕</button>
            </div>

            <form onSubmit={handleSaveAndPrintInvoice} className="space-y-3.5">
              <div className="grid grid-cols-2 gap-3 bg-zinc-100 p-3 rounded-2xl border border-zinc-200">
                <div>
                  <label className="text-[10px] font-black uppercase text-zinc-500 block mb-1 flex items-center gap-1">
                    <span>INVOICE NO.</span>
                    <span className="text-[8px] bg-zinc-300 px-1 py-0.2 rounded text-zinc-700">🔒 TERKUNCI</span>
                  </label>
                  <input
                    type="text"
                    readOnly
                    value={invoiceForm.invoiceNo}
                    className="w-full px-3 py-2 rounded-xl border border-zinc-300 text-xs font-mono font-bold bg-zinc-200/80 text-zinc-700 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase text-zinc-500 block mb-1 flex items-center gap-1">
                    <span>INVOICE DATE</span>
                    <span className="text-[8px] bg-zinc-300 px-1 py-0.2 rounded text-zinc-700">🔒 TERKUNCI</span>
                  </label>
                  <input
                    type="date"
                    readOnly
                    value={invoiceForm.invoiceDate}
                    className="w-full px-3 py-2 rounded-xl border border-zinc-300 text-xs font-mono font-bold bg-zinc-200/80 text-zinc-700 cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-black uppercase text-zinc-500 block mb-1">SHIP DATE</label>
                  <input
                    type="date"
                    required
                    value={invoiceForm.shipDate}
                    onChange={(e) => setInvoiceForm({ ...invoiceForm, shipDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-zinc-200 text-xs font-mono font-bold focus:outline-zinc-950"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase text-zinc-500 block mb-1">
                    PO NUMBER <span className="text-[9px] font-normal text-zinc-400 lowercase">(opsional)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: PO-2026/01"
                    value={invoiceForm.poNumber}
                    onChange={(e) => setInvoiceForm({ ...invoiceForm, poNumber: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-zinc-200 text-xs font-mono font-bold focus:outline-zinc-950"
                  />
                </div>
              </div>

              {/* FIELD BILL TO SEKARANG TERKUNCI DENGAN MANUSIAWI */}
              <div>
                <label className="text-[10px] font-black uppercase text-zinc-500 block mb-1 flex items-center gap-1">
                  <span>BILL TO (NAMA & ALAMAT PELANGGAN / PERUSAHAAN)</span>
                  <span className="text-[8px] bg-zinc-300 px-1.5 py-0.5 rounded font-black text-zinc-700">🔒 TERKUNCI (DARI TRANSAKSI)</span>
                </label>
                <textarea
                  readOnly
                  rows={2}
                  value={invoiceForm.billTo}
                  className="w-full px-3 py-2 rounded-xl border border-zinc-300 text-xs font-bold uppercase bg-zinc-100 text-zinc-800 cursor-not-allowed tracking-wide"
                />
              </div>

              <div className="border border-zinc-300 p-3.5 rounded-2xl space-y-3 bg-zinc-50">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-700 block">📦 RINCIAN BARANG (DARI DATABASE)</span>
                  <span className="text-[8px] bg-zinc-300 px-1.5 py-0.5 rounded font-black text-zinc-700">🔒 TERKUNCI</span>
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase text-zinc-500 block mb-1">ITEM DESCRIPTION</label>
                  <input
                    type="text"
                    readOnly
                    value={invoiceForm.itemDescription}
                    className="w-full px-3 py-2 rounded-xl border border-zinc-300 text-xs font-bold uppercase bg-zinc-200/70 text-zinc-800 cursor-not-allowed"
                  />
                </div>
                <div className="grid grid-cols-3 gap-2.5">
                  <div>
                    <label className="text-[10px] font-black uppercase text-zinc-500 block mb-1">QUANTITY</label>
                    <input
                      type="number"
                      readOnly
                      value={invoiceForm.quantity}
                      className="w-full px-3 py-2 rounded-xl border border-zinc-300 text-xs font-mono font-bold bg-zinc-200/70 text-zinc-800 cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase text-zinc-500 block mb-1">UNIT</label>
                    <input
                      type="text"
                      readOnly
                      value={invoiceForm.unit}
                      className="w-full px-3 py-2 rounded-xl border border-zinc-300 text-xs font-bold uppercase bg-zinc-200/70 text-zinc-800 cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase text-zinc-500 block mb-1">UNIT PRICE (RP)</label>
                    <input
                      type="number"
                      readOnly
                      value={invoiceForm.unitPrice}
                      className="w-full px-3 py-2 rounded-xl border border-zinc-300 text-xs font-mono font-bold bg-zinc-200/70 text-zinc-800 cursor-not-allowed"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2.5 bg-zinc-50 p-3 rounded-2xl border border-zinc-100">
                <div>
                  <label className="text-[10px] font-black uppercase text-zinc-500 block mb-1 flex items-center gap-0.5">
                    <span>SUB TOTAL</span>
                    <span className="text-[8px] bg-zinc-300 px-1 py-0.2 rounded text-zinc-700">🔒</span>
                  </label>
                  <input
                    type="number"
                    readOnly
                    value={invoiceForm.subTotal}
                    className="w-full px-3 py-2 rounded-xl border border-zinc-300 text-xs font-mono font-bold bg-zinc-200/70 text-zinc-800 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase text-zinc-500 block mb-1">TAX (PPN RP)</label>
                  <input
                    type="number"
                    value={invoiceForm.tax}
                    onChange={(e) => handleTaxOrFreightChange('tax', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-zinc-200 text-xs font-mono font-bold focus:outline-zinc-950 bg-white"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase text-zinc-500 block mb-1">FREIGHT (ONGKIR RP)</label>
                  <input
                    type="number"
                    value={invoiceForm.freight}
                    onChange={(e) => handleTaxOrFreightChange('freight', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-zinc-200 text-xs font-mono font-bold focus:outline-zinc-950 bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black uppercase text-zinc-500 block mb-1 flex items-center gap-1">
                  <span>SAY (TERBILANG RUPIAH)</span>
                  <span className="text-[8px] bg-zinc-300 px-1.5 py-0.5 rounded font-black text-zinc-700">🔒 TERKUNCI (OTOMATIS)</span>
                </label>
                <input
                  type="text"
                  readOnly
                  value={invoiceForm.say}
                  className="w-full px-3 py-2 rounded-xl border border-zinc-300 text-xs font-bold uppercase bg-zinc-100 text-zinc-800 cursor-not-allowed tracking-wide"
                />
              </div>

              <div>
                <label className="text-[10px] font-black uppercase text-zinc-500 block mb-1">APPROVED BY</label>
                <input
                  type="text"
                  required
                  value={invoiceForm.approvedBy}
                  onChange={(e) => setInvoiceForm({ ...invoiceForm, approvedBy: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-zinc-200 text-xs font-bold uppercase focus:outline-zinc-950"
                />
              </div>

              <div className="flex gap-2 pt-3 justify-end border-t border-zinc-100">
                <button
                  type="button"
                  onClick={() => setIsInvoiceModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-zinc-500 hover:bg-zinc-100 transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="bg-[#FFCD00] text-zinc-950 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider hover:bg-amber-400 transition shadow-md border border-amber-400 flex items-center gap-1.5 cursor-pointer"
                >
                  <span>💾 SIMPAN & CETAK PDF INVOICE</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL DIALOG KONFIRMASI HAPUS */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-zinc-950/70 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full overflow-hidden border border-zinc-200 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="bg-zinc-950 px-5 py-4 text-white flex justify-between items-center border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-3.5 bg-red-500 rounded-[1px]"></div>
                <span className="font-black text-[11px] uppercase tracking-wider text-white">Konfirmasi Tindakan</span>
              </div>
              <button 
                onClick={() => setDeleteTarget(null)} 
                className="text-zinc-400 hover:text-white text-xs font-bold transition focus:outline-none"
              >
                ✕
              </button>
            </div>

            <div className="p-6 text-center space-y-4">
              <div className="w-12 h-12 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center text-xl mx-auto border border-red-200 animate-pulse">
                ⚠️
              </div>
              <div className="space-y-1.5">
                <h4 className="text-xs font-black uppercase text-zinc-950 tracking-tight">Hapus Data Permanen?</h4>
                <p className="text-[11px] text-zinc-500 font-medium leading-relaxed">
                  Apakah Anda yakin ingin menghapus <strong className="text-zinc-950 uppercase font-mono bg-zinc-100 px-1 py-0.5 rounded font-bold break-all">{deleteTarget.name}</strong> dari sistem? Tindakan ini akan mengembalikan stok barang ke gudang.
                </p>
              </div>
            </div>

            <div className="bg-zinc-50 px-5 py-3.5 flex gap-2 border-t border-zinc-100">
              <button 
                type="button" 
                onClick={() => setDeleteTarget(null)} 
                className="flex-1 bg-white hover:bg-zinc-100 border border-zinc-200 text-zinc-700 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition shadow-sm focus:outline-none cursor-pointer"
              >
                Batal
              </button>
              <button 
                type="button" 
                onClick={confirmDeleteExecution} 
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition shadow-md focus:outline-none cursor-pointer"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}