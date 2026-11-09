import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// 1. GET: Ambil semua data produk sika untuk ditampilkan di tabel
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { kodeBarang: 'asc' }
    });
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: 'Gagal mengambil data produk' }, { status: 500 });
  }
}

// 2. POST: Tambah produk baru dari form modal
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { kodeBarang, name, price, stock, unit } = body;

    const newProduct = await prisma.product.create({
      data: {
        kodeBarang,
        name,
        price: parseFloat(price),
        stock: parseInt(stock, 10),
        unit,
      },
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error: any) {
    // Handle jika kode barang duplikat
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'Kode barang sudah terdaftar!' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Gagal menambahkan produk baru' }, { status: 500 });
  }
}

// 3. PUT: Update/perbarui data produk yang diedit
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, kodeBarang, name, price, stock, unit } = body;

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        kodeBarang,
        name,
        price: parseFloat(price),
        stock: parseInt(stock, 10),
        unit,
      },
    });

    return NextResponse.json(updatedProduct);
  } catch (error) {
    return NextResponse.json({ error: 'Gagal memperbarui data produk' }, { status: 500 });
  }
}