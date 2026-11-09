import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Membaca cookie otentikasi sesi admin dari browser
  const adminSession = request.cookies.get('admin_session')?.value;

  // 1. Proteksi Folder Admin: Jika membuka /admin/... TANPA login, lempar balik ke /login
  if (pathname.startsWith('/admin')) {
    if (!adminSession || adminSession !== 'authenticated_true') {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // 2. Proteksi Halaman Login: Jika SUDAH login tapi buka /login, lempar ke /admin/dashboard
  if (pathname === '/login' && adminSession === 'authenticated_true') {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }

  return NextResponse.next();
}

// Rute yang diproteksi oleh middleware
export const config = {
  matcher: ['/admin/:path*', '/login'],
};