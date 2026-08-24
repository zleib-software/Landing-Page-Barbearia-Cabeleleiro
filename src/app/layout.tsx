import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://zleibbarber.com.br"),
  title: "Zleib Barber • Ateliê de Barbearia & Hair Studio na Av. Paulista",
  description: "Ateliê de cuidados capilares na Bela Vista, a 150m do MASP. Cortes milimétricos na tesoura, barboterapia tradicional com toalha aquecida e visagismo autoral com hora marcada.",
  keywords: [
    "zleib barber",
    "barbearia paulista",
    "barbearia bela vista",
    "barbearia av paulista",
    "hair studio sp",
    "corte de cabelo na tesoura sp",
    "barboterapia toalha quente",
    "morena iluminada paulista"
  ],
  authors: [{ name: "ZLEIB BARBER • Ateliê & Hair Studio" }],
  alternates: {
    canonical: "https://zleibbarber.com.br",
  },
  openGraph: {
    title: "Zleib Barber • Ateliê de Barbearia & Hair Studio na Av. Paulista",
    description: "Ateliê de cuidados capilares na Bela Vista, a 150m do MASP. Cortes de precisão, barboterapia e visagismo autoral.",
    url: "https://zleibbarber.com.br",
    siteName: "Zleib Barber • Ateliê & Hair Studio",
    images: [
      {
        url: "/images/about-atelier.jpg",
        width: 1200,
        height: 630,
        alt: "Ateliê Zleib Barber na Av. Paulista"
      }
    ],
    locale: "pt_BR",
    type: "website",
  },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2314b8a6'><text x='50%' y='55%' dominant-baseline='middle' text-anchor='middle' font-family='serif' font-weight='900' font-size='18' fill='%2305080e'>Z</text></svg>",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BarberShop",
    "name": "Zleib Barber • Ateliê & Hair Studio",
    "image": "https://zleibbarber.com.br/images/about-atelier.jpg",
    "url": "https://zleibbarber.com.br",
    "telephone": "+5511999999999",
    "priceRange": "$$",
    "description": "Ateliê de cuidados capilares na Bela Vista, a 150m do MASP. Cortes de precisão na tesoura, barboterapia com toalha aquecida e visagismo autoral.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Av. Paulista, 1578 - 1º Andar",
      "addressLocality": "São Paulo",
      "addressRegion": "SP",
      "postalCode": "01310-200",
      "addressCountry": "BR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -23.561081,
      "longitude": -46.656571
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday"],
        "opens": "09:00",
        "closes": "20:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Thursday"],
        "opens": "09:00",
        "closes": "21:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Friday"],
        "opens": "08:30",
        "closes": "21:30"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Saturday"],
        "opens": "08:30",
        "closes": "20:00"
      }
    ],
    "sameAs": [
      "https://instagram.com/zleibbarber",
      "https://facebook.com/zleibbarber"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "350"
    }
  };

  return (
    <html lang="pt-BR" className={`${cormorant.variable} ${jakarta.variable} dark`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased selection:bg-teal-500 selection:text-midnight-950 bg-midnight-950 text-ice-100 overflow-x-hidden">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
