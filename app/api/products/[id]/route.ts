import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Menggunakan instance global yang sama dengan file lainnya

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    // ⚡ SOLUSI NEXT.JS 14/15: Amankan pembacaan params jika bertipe Promise
    const resolvedParams = 'then' in params ? await params : params;
    const productId = resolvedParams.id;

    if (!productId || productId === 'undefined') {
      return NextResponse.json({ error: 'ID produk tidak valid atau kosong' }, { status: 400 });
    }

    // Menghapus produk berdasarkan ID dari database SQLite
    await prisma.product.delete({
      where: { id: productId },
    });

    // Menambahkan status 200 agar dibaca sukses oleh `res.ok` di frontend
    return NextResponse.json(
      { message: 'Produk berhasil dihapus', success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saat menghapus produk:", error);
    return NextResponse.json(
      { error: 'Gagal menghapus produk dari database' },
      { status: 500 }
    );
  }
}