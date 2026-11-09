import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      invoiceNo,
      totalAmount,
      productId,
      quantity,
      qty,
      price,
      items,
      billTo,
      customerName,
      clientName,
      itemDescription,
      productName,
      unit,
      subTotal,
      taxAmount,
      freight,
      poNumber,
    } = body;

    // Ambil nama pelanggan dari payload
    const rawCustomerName = String(customerName || billTo || clientName || '').trim();
    if (!rawCustomerName) {
      return NextResponse.json({ error: 'Nama pelanggan wajib diisi' }, { status: 400 });
    }
    const finalCustomerName = rawCustomerName.toUpperCase();

    const finalInvoiceNo = String(invoiceNo || `INV-${Date.now()}`);
    const finalTotalAmount = Number(totalAmount || 0);
    const targetProductId = String(productId || items?.[0]?.productId || '');
    const targetQty = Number(quantity || qty || items?.[0]?.quantity || 1);
    const targetPrice = Number(price || items?.[0]?.price || 0);
    const finalItemDesc = String(itemDescription || productName || items?.[0]?.name || '').trim();
    const finalUnit = String(unit || items?.[0]?.unit || 'PAIL').toUpperCase();

    // 1. Cari atau Buat Customer di tabel Customer
    let cust = await prisma.customer.findFirst({
      where: { name: finalCustomerName },
    });

    if (!cust) {
      cust = await prisma.customer.create({
        data: {
          name: finalCustomerName,
          address: 'Alamat Belum Diisi',
        },
      });
    }

    // 2. Buat Record Invoice dengan Customer ID yang Valid
    const newInvoice = await prisma.invoice.create({
      data: {
        invoiceNo: finalInvoiceNo,
        poNumber: poNumber || null,
        date: new Date(),
        subTotal: Number(subTotal || finalTotalAmount),
        taxAmount: Number(taxAmount || 0),
        freight: Number(freight || 0),
        totalAmount: finalTotalAmount,
        customerId: cust.id, // Kunci ID Customer
      },
      include: {
        customer: true,
      },
    });

    // 3. Potong Stok Produk
    if (targetProductId && targetQty > 0) {
      try {
        await prisma.product.update({
          where: { id: targetProductId },
          data: { stock: { decrement: targetQty } },
        });
      } catch (prodErr) {
        console.warn("Update decrement stock error:", prodErr);
      }

      // 4. Buat Detail Item
      try {
        await prisma.invoiceItem.create({
          data: {
            invoiceId: newInvoice.id,
            productId: targetProductId,
            quantity: targetQty,
            unitPrice: targetPrice,
            amount: targetQty * targetPrice,
          },
        });
      } catch (itemErr) {
        console.warn("Create invoice item error:", itemErr);
      }
    }

    const resultObj = {
      ...newInvoice,
      billTo: cust.name,
      customerName: cust.name,
      clientName: cust.name,
      customer: cust,
      productId: targetProductId,
      itemDescription: finalItemDesc,
      productName: finalItemDesc,
      quantity: targetQty,
      qty: targetQty,
      unit: finalUnit,
      price: targetPrice,
    };

    return NextResponse.json(resultObj, { status: 201 });
  } catch (error: any) {
    console.error('🔴 ERROR API POST INVOICE:', error);
    return NextResponse.json(
      { error: error?.message || 'Gagal menyimpan invoice.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const invoices = await prisma.invoice.findMany({
      orderBy: { date: 'desc' },
      include: {
        items: {
          include: { product: true },
        },
        customer: true,
      },
    });

    const formattedInvoices = invoices.map((inv: any) => {
      const firstItem = inv.items && inv.items[0];
      const custName = inv.customer?.name || 'PELANGGAN UMUM';
      const itemQty = firstItem?.quantity || 1;
      const itemDesc = firstItem?.product?.name || '';
      const itemUnit = firstItem?.product?.unit || 'PAIL';

      return {
        ...inv,
        billTo: custName,
        customerName: custName,
        clientName: custName,
        itemDescription: itemDesc,
        productName: itemDesc,
        quantity: itemQty,
        qty: itemQty,
        unit: itemUnit,
        items: inv.items || [],
      };
    });

    return NextResponse.json(formattedInvoices, { status: 200 });
  } catch (error: any) {
    console.error('🔴 ERROR API GET INVOICE:', error);
    return NextResponse.json([], { status: 200 });
  }
}