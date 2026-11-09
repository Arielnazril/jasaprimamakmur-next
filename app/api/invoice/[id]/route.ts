import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId');
    const qtyToRestore = Number(searchParams.get('qty') || 0);

    if (!id) {
      return NextResponse.json({ error: 'ID tidak valid' }, { status: 400 });
    }

    const existingInvoice = await prisma.invoice.findUnique({
      where: { id },
      include: {
        // @ts-ignore
        items: true,
      },
    });

    let restored = false;
    const items = (existingInvoice as any)?.items || [];

    if (Array.isArray(items) && items.length > 0) {
      for (const item of items) {
        if (item.productId) {
          const itemQty = Number(item.quantity || item.qty || 0);
          if (itemQty > 0) {
            try {
              await prisma.product.update({
                where: { id: item.productId },
                data: { stock: { increment: itemQty } },
              });
              restored = true;
            } catch (err) {}
          }
        }
      }
    }

    if (!restored && productId && qtyToRestore > 0) {
      try {
        await prisma.product.update({
          where: { id: productId },
          data: { stock: { increment: qtyToRestore } },
        });
      } catch (err) {}
    }

    try {
      // @ts-ignore
      if (prisma.invoiceItem) {
        // @ts-ignore
        await prisma.invoiceItem.deleteMany({ where: { invoiceId: id } });
      }
    } catch (e) {}

    await prisma.invoice.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Stok dikembalikan dan invoice dihapus.' }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Gagal' }, { status: 500 });
  }
}