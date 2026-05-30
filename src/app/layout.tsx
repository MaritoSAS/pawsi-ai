
import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Pawsi AI | Gestión Inteligente de Salud Animal',
  description: 'Plataforma de gestión inteligente de salud pública animal para municipios — ONG Fucolla, Salta, Argentina',
  icons: { icon: '/logo-pawsi.png' },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
