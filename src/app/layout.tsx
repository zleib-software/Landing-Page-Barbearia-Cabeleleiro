import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://lumencobarber.com.br"),
  title: "LUMEN & CO. | Barbearia & Hair Studio de Luxo",
  description: "Barbearia premium e hair salon de alto padrão. Cortes masculinos e femininos, barboterapia, mechas, tratamentos e atendimento VIP com agendamento via WhatsApp.",
  keywords: ["barbearia", "cabeleireiro", "hair salon", "salão de beleza", "barboterapia", "corte masculino", "fade", "balayage", "agendamento whatsapp", "recife", "são paulo"],
  authors: [{ name: "LUMEN & CO." }],
  openGraph: {
    title: "LUMEN & CO. | Barbearia & Hair Studio de Luxo",
    description: "A arte do estilo e cuidado pessoal em alto padrão. Agende seu horário direto no WhatsApp.",
    images: ["/images/hero-bg.jpg"],
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
    "@type": "HairSalon",
    "name": "LUMEN & CO. Barber & Studio",
    "image": "https://lumencobarber.com.br/images/hero-bg.jpg",
    "telephone": "+5511999999999",
    "priceRange": "$$",
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
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "09:00",
        "closes": "20:00"
      }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "348"
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
