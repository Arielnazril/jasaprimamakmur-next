// app/api/login/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // Membaca data yang dikirim dari halaman login
    const { username, password } = await request.json();

    // Kredensial Akun Admin Resmi (Silakan ganti sesuai keinginan)
    const ADMIN_USERNAME = 'admin.jpm';
    const ADMIN_PASSWORD = 'rahasiaadmin123';

    // Validasi kecocokan data
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      const response = NextResponse.json({
        success: true,
        message: 'Login berhasil! Mengalihkan ke dashboard...',
      });

      // Menyimpan token sesi admin di cookie browser (Berlaku selama 3 Jam)
      response.cookies.set('admin_session', 'authenticated_true', {
        httpOnly: true, // Aman dari pencurian script luar (XSS)
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 3, // 3 Jam
        path: '/',
      });

      return response;
    }

    // Jika salah, kirim respon error 401
    return NextResponse.json(
      { success: false, message: 'Username atau Kata Sandi Admin Salah!' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Terjadi kesalahan pada sistem server.' },
      { status: 500 }
    );
  }
}