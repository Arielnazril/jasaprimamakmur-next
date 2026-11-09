import "./globals.css";
import ConditionalNavbar from "./components/ConditionalNavbar"; 

// Metadata SEO
export const metadata = {
  title: "PT. JASA PRIMA MAKMUR - Official Distributor Sika",
  description: "Kelola Proyek dan Material Sika dengan Mudah melalui Dashboard Kemitraan JPM.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
      className="h-full antialiased"
    >
      <body 
        suppressHydrationWarning 
        className="min-h-full flex flex-col bg-white text-sika-dark"
      >
        {/* Menggunakan wrapper kondisional navbar yang baru */}
        <ConditionalNavbar />
        
        {/* Konten halaman utama */}
        <main className="flex-grow">
          {children}
        </main>
      </body>
    </html>
  );
}