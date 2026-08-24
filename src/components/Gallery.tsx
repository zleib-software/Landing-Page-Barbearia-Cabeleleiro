"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, Sparkles } from "lucide-react";

interface GalleryItem {
  id: string;
  image: string;
  category: "fade" | "beard" | "hair";
  tag: string;
  title: string;
  featured?: boolean;
}

const galleryItems: GalleryItem[] = [
  {
    id: "g1",
    image: "/images/service-haircut.jpg",
    category: "fade",
    tag: "Fade de Alta Precisão",
    title: "Skin Fade Degradê com Navalha e Pompadour",
    featured: true,
  },
  {
    id: "g2",
    image: "/images/service-beard.jpg",
    category: "beard",
    tag: "Barboterapia Spa",
    title: "Alinhamento de Barba com Vapor de Ozônio",
  },
  {
    id: "g3",
    image: "/images/gallery-balayage.jpg",
    category: "hair",
    tag: "Hair Studio",
    title: "Balayage Glow & Mechas Morena Iluminada",
  },
  {
    id: "g4",
    image: "/images/service-salon.jpg",
    category: "hair",
    tag: "Visagismo Feminino",
    title: "Corte em Camadas com Tratamento de Brilho",
  },
  {
    id: "g5",
    image: "/images/barber-alex.jpg",
    category: "fade",
    tag: "Corte Executivo",
    title: "Corte Clássico na Tesoura & Styling Matte",
  },
];

export function Gallery() {
  const [filter, setFilter] = useState<string>("all");

  const filteredItems = filter === "all"
    ? galleryItems
    : galleryItems.filter(item => item.category === filter);

  return (
    <section className="py-20 sm:py-24 relative z-10 bg-light-150/70 dark:bg-dark-950/60 transition-colors duration-300" id="galeria">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="inline-block text-xs uppercase tracking-widest font-bold text-gold-700 dark:text-gold-400 bg-gold-500/10 border border-gold-500/30 px-4 py-1.5 rounded-full mb-4">
            Prova do Trabalho
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-light-950 dark:text-white mb-4">
            Galeria de <span className="gold-gradient-text">Resultados Reais</span>
          </h2>
          <p className="text-light-600 dark:text-gray-400 text-base sm:text-lg">
            Veja as transformações, alinhamentos e finalizações executadas no nosso estúdio.
          </p>
        </div>

        {/* Filtros da Galeria */}
        <div className="flex justify-center gap-2 sm:gap-3 flex-wrap mb-10">
          {[
            { id: "all", label: "Todos os Trabalhos" },
            { id: "fade", label: "Fade & Cortes Masculinos" },
            { id: "beard", label: "Design de Barba" },
            { id: "hair", label: "Hair Studio & Iluminação" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                filter === tab.id
                  ? "bg-gold-gradient text-dark-950 shadow-gold-glow font-bold scale-105"
                  : "bg-light-200/90 dark:bg-dark-800 text-light-700 dark:text-gray-400 hover:text-light-950 dark:hover:text-white border border-light-300 dark:border-white/10 hover:border-gold-500/40"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Layout Visualmente Dominante */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          {/* Card Principal em Destaque (Se filtrado em 'all' ou 'fade') */}
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, idx) => {
              const isDominant = filter === "all" && idx === 0;

              return (
                <motion.div
                  layout
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35 }}
                  className={`relative rounded-3xl overflow-hidden border border-light-300 dark:border-white/10 group shadow-elevation-light dark:shadow-elevation ${
                    isDominant
                      ? "md:col-span-7 min-h-[380px] sm:min-h-[440px]"
                      : filter === "all"
                      ? "md:col-span-5 min-h-[220px] sm:min-h-[240px]"
                      : "md:col-span-6 lg:col-span-4 min-h-[300px]"
                  }`}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-950/95 via-dark-950/40 to-transparent flex flex-col justify-end p-6 sm:p-8 opacity-90 group-hover:opacity-100 transition-opacity">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs uppercase tracking-wider font-extrabold text-gold-400 bg-gold-500/20 px-2.5 py-0.5 rounded-full border border-gold-500/30">
                        {item.tag}
                      </span>
                    </div>
                    <h3 className={`font-display font-bold text-white leading-tight ${isDominant ? "text-xl sm:text-2xl" : "text-base sm:text-lg"}`}>
                      {item.title}
                    </h3>
                    <div className="mt-3 flex items-center gap-2 text-xs text-gray-300 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Eye className="w-4 h-4 text-gold-400" />
                      <span>Ver resultado detalhado</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
