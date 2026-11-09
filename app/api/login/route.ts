import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const username = String(body.username || '').trim().toLowerCase();
    const password = String(body.password || '').trim();

    // ⚡ Menerima kredensial admin apapun yang diisi (admin.jpm / admin)
    const isUserValid = username === 'admin.jpm' || username === 'admin';
    const isPassValid = password === 'rahasiaadmin123' || password === 'admin123' || password === 'admin' || password.length > 0;

    if (isUserValid && isPassValid) {
      // 🚀 Buat respon sukses
      const response = NextResponse.json(
        { success: true, message: 'Login Berhasil' },
        { status: 200 }
      );

      // ⚡ Simpan cookie otentikasi (Aman untuk IP LAN 192.168.1.8)
      response.cookies.set('admin_session', 'authenticated_true', {
        httpOnly: true,
        secure: false, // Wajib false agar bekerja di HTTP IP 192.168.1.8
        sameSite: 'lax',
        maxAge: 60 * 60 * 24, // 24 Jam
        path: '/',
      });

      return response;
    }

    return NextResponse.json(
      { success: false, error: 'Username atau Password salah!' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Kesalahan Server API' },
      { status: 500 }
    );
  }
}