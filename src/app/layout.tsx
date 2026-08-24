import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://lumencobarber.com.br"),
  title: "Lumen & Co. | Barbearia Premium na Av. Paulista",
  description: "Barbearia premium na Bela Vista, São Paulo. Cortes, barba, visagismo e tratamentos capilares. Agende seu horário pelo WhatsApp com atendimento exclusivo.",
  keywords: [
    "barbearia bela vista",
    "barbearia paulista",
    "barbearia av paulista",
    "corte de cabelo masculino são paulo",
    "barboterapia são paulo",
    "visagismo masculino",
    "lumen and co"
  ],
  authors: [{ name: "LUMEN & CO." }],
  alternates: {
    canonical: "https://lumencobarber.com.br",
  },
  openGraph: {
    title: "Lumen & Co. | Barbearia Premium na Av. Paulista",
    description: "Barbearia premium na Bela Vista, São Paulo. Cortes, barba e visagismo. Agende seu horário pelo WhatsApp.",
    url: "https://lumencobarber.com.br",
    siteName: "Lumen & Co. Barber & Studio",
    images: [
      {
        url: "/images/hero-bg.jpg",
        width: 1200,
        height: 630,
        alt: "Barbearia Lumen & Co. na Av. Paulista"
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
    "image": "https://lumencobarber.com.br/images/hero-bg.jpg",
    "url": "https://lumencobarber.com.br",
    "telephone": "+5511999999999",
    "priceRange": "$$",
    "description": "Barbearia premium na Bela Vista, São Paulo. Cortes, barba, visagismo e tratamentos capilares.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Av. Paulista, 1578",
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

  const themeInitScript = `
    (function() {
      try {
        var stored = localStorage.getItem('theme');
        var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (stored === 'dark' || (!stored && prefersDark) || (stored === 'system' && prefersDark)) {
          document.documentElement.classList.add('dark');
          document.documentElement.classList.remove('light');
        } else {
          document.documentElement.classList.remove('dark');
          document.documentElement.classList.add('light');
        }
      } catch (e) {}
    })();
  `;

  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased selection:bg-gold-500 selection:text-dark-950 bg-light-100 dark:bg-dark-900 text-light-900 dark:text-gray-100 transition-colors duration-300">
        {children}
      </body>
    </html>
  );
}
