"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const galleryItems = [
  {
    image: "/images/service-haircut.jpg",
    tag: "Barbearia Clássica",
    title: "Fade Navalhado & Pompadour Executivo",
  },
  {
    image: "/images/service-beard.jpg",
    tag: "Barboterapia",
    title: "Design de Barba & Hidratação com Ozônio",
  },
  {
    image: "/images/gallery-balayage.jpg",
    tag: "Hair Studio",
    title: "Balayage Honey & Ondas Naturais Sedosas",
  },
  {
    image: "/images/service-salon.jpg",
    tag: "Styling & Visagismo",
    title: "Blowout & Tratamento de Brilho Tridimensional",
  },
];

export function Gallery() {
  return (
    <section className="py-24 relative z-10 bg-light-150/70 dark:bg-dark-950/60 transition-colors duration-300" id="galeria">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-xs uppercase tracking-widest font-bold text-gold-700 dark:text-gold-400 bg-gold-500/10 border border-gold-500/30 px-4 py-1.5 rounded-full mb-4">
            Portfólio em Destaque
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-light-950 dark:text-white mb-4">
            Galeria de <span className="gold-gradient-text">Resultados & Estilo</span>
          </h2>
          <p className="text-light-600 dark:text-gray-400 text-base sm:text-lg">
            Confira um pouco das produções, alinhamentos e transformações realizadas pelos nossos especialistas.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {galleryItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -6 }}
              className="relative h-80 sm:h-96 rounded-2xl overflow-hidden border border-light-300 dark:border-white/10 group shadow-elevation-light dark:shadow-elevation"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/50 to-transparent flex flex-col justify-end p-6 opacity-90 group-hover:opacity-100 transition-opacity">
                <span className="text-xs uppercase tracking-wider font-bold text-gold-400 mb-1">
                  {item.tag}
                </span>
                <h3 className="font-display text-lg font-bold text-white leading-tight">
                  {item.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
