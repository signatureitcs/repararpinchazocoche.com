import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Reparación Pinchazos Camión 24h | Toda España',
  description: 'Servicio urgente de reparación de neumáticos de camión y furgoneta a domicilio. Disponible 24 horas, 365 días en toda España. Llama ahora: +34 911 676 448',
  metadataBase: new URL('https://repararpinchazocoche.com'),
  alternates: { canonical: 'https://repararpinchazocoche.com' },
  openGraph: {
    siteName: 'Reparación Pinchazos Camión 24h',
    locale: 'es_ES',
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
  verification: {
    google: 'PVvgaRHFrH90uMRmFumfi1ljxfMMwOHjkyzcqoo7y4I',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-70HG8Q49DT" strategy="afterInteractive" />
        <Script id="ga4" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-70HG8Q49DT');
        `}</Script>
      </head>
      <body className="${inter.className} bg-white text-gray-900 antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
