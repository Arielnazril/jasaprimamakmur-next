import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ success: true, message: 'Logout berhasil' });
  
  // ⚡ Hapus cookie admin_session dari browser
  response.cookies.set('admin_session', '', {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    maxAge: 0, // Set 0 agar cookie langsung kadaluarsa / terhapus
    path: '/',
  });

  return response;
}