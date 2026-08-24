import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lumencobarber.com.br"),
  title: "Lumen & Co. | Barbearia Clássica & Hair Studio na Av. Paulista",
  description: "Ateliê de cuidados pessoais na Bela Vista, a 150m do MASP. Cortes de precisão na tesoura, barboterapia com toalha aquecida e visagismo autoral com hora marcada.",
  keywords: [
    "barbearia paulista",
    "barbearia bela vista",
    "barbearia av paulista",
    "hair studio sp",
    "corte de cabelo na tesoura sp",
    "barboterapia toalha quente",
    "morena iluminada paulista",
    "lumen and co"
  ],
  authors: [{ name: "LUMEN & CO. Barber & Studio" }],
  alternates: {
    canonical: "https://lumencobarber.com.br",
  },
  openGraph: {
    title: "Lumen & Co. | Barbearia Clássica & Hair Studio na Av. Paulista",
    description: "Ateliê de cuidados pessoais na Bela Vista, a 150m do MASP. Cortes de precisão, barboterapia e visagismo autoral.",
    url: "https://lumencobarber.com.br",
    siteName: "Lumen & Co. Barber & Studio",
    images: [
      {
        url: "/images/about-atelier.jpg",
        width: 1200,
        height: 630,
        alt: "Ateliê Lumen & Co. na Av. Paulista"
      }
    ],
    locale: "pt_BR",
    type: "website",
  },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23c5a059'><path d='M6 3h12v2H6zm0 16h12v2H6zm2-8h8v2H8zm-4 4h16v2H4zm0-8h16v2H4z'/></svg>",
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
    "name": "LUMEN & CO. Barber & Studio",
    "image": "https://lumencobarber.com.br/images/about-atelier.jpg",
    "url": "https://lumencobarber.com.br",
    "telephone": "+5511999999999",
    "priceRange": "$$",
    "description": "Ateliê de cuidados pessoais na Bela Vista, a 150m do MASP. Cortes de precisão na tesoura, barboterapia com toalha aquecida e visagismo autoral.",
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
      "https://instagram.com",
      "https://facebook.com"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "350"
    }
  };

  return (
    <html lang="pt-BR" className={`${playfair.variable} ${jakarta.variable} dark`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased selection:bg-bronze-500 selection:text-white bg-obsidian-950 text-sand-100 overflow-x-hidden">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
