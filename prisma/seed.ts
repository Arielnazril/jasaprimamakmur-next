import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Memulai proses seeding data...');

  // 1. Bersihkan data lama agar tidak duplikat saat dijalankan ulang
  await prisma.invoiceItem.deleteMany({});
  await prisma.invoice.deleteMany({});
  await prisma.product.deleteMany({});
  await prisma.customer.deleteMany({});

  // 2. Buat Contoh Data Pelanggan (Sesuai contoh invoice Anda)
  const customer = await prisma.customer.create({
    data: {
      name: 'NAIRUZ SYIFA MUMTAZA',
      address: 'Jl. Paris II, Komplek Paris Royal No. B5, Pontianak Tenggara, Kota Pontianak, Kalimantan Barat',
      npwp: '00.000.000.0-000.000', // Isi NPWP jika ada
      nik: '6171012345670001',
      email: 'nairuz.syifa@example.com'
    },
  });
  console.log('✓ Data Pelanggan berhasil dibuat:', customer.name);

  // 3. Buat Contoh Data Produk Sika
  const product1 = await prisma.product.create({
    data: {
      kodeBarang: 'PROD-001',
      name: 'SIKA VISCOCRETE 3115N',
      unit: 'PAIL',
      price: 1500000, // Rp 1.500.000
      stock: 50
    },
  });

  const product2 = await prisma.product.create({
    data: {
      kodeBarang: 'PROD-002',
      name: 'TM ASPHALT BITUMEN',
      unit: 'KG',
      price: 25000, // Rp 25.000
      stock: 1000
    },
  });
  console.log('✓ Data Produk Sika berhasil dibuat');

  // 4. Buat Contoh Transaksi Invoice + Faktur Pajak
  // Kita hitung manual dulu untuk data seed ini
  const qty1 = 5;  // 5 Pail Sika
  const qty2 = 200; // 200 KG Asphalt
  const subTotal = (qty1 * product1.price) + (qty2 * product2.price); // (5*1.5jt) + (200*25rb) = 7.5jt + 5jt = 12.500.000
  const taxAmount = subTotal * 0.11; // PPN 11% = 1.375.000
  const totalAmount = subTotal + taxAmount; // 13.875.000

  const invoice = await prisma.invoice.create({
    data: {
      invoiceNo: 'INV-2026-0001',
      poNumber: 'PO-JPM-9921',
      fakturNo: '040.026-26.06724808', // Format nomor seri faktur pajak DJP
      customerId: customer.id,
      subTotal: subTotal,
      taxAmount: taxAmount,
      freight: 0,
      totalAmount: totalAmount,
      items: {
        create: [
          {
            productId: product1.id,
            quantity: qty1,
            unitPrice: product1.price,
            amount: qty1 * product1.price
          },
          {
            productId: product2.id,
            quantity: qty2,
            unitPrice: product2.price,
            amount: qty2 * product2.price
          }
        ]
      }
    }
  });

  console.log('✓ Invoice & Faktur Pajak tiruan berhasil dibuat!');
  console.log('ID Invoice untuk testing Anda adalah:', invoice.id);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });