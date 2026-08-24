"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { FaChevronLeft, FaChevronRight, FaStar, FaCircleCheck, FaArrowUpRightFromSquare } from "react-icons/fa6";
import { SITE_CONFIG } from "@/data/siteConfig";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/utils/gsap";
import { SpotlightCard } from "./SpotlightCard";

interface GalleryItem {
  id: string;
  image: string;
  category: "fade" | "beard" | "hair";
  tag: string;
  title: string;
  technique: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: "g1",
    image: "/images/gallery-fade.jpg",
    category: "fade",
    tag: "Degradê de Precisão",
    title: "Mid Skin Fade com Textura Natural",
    technique: "Transição suave com lâmina de precisão e acabamento sem linha marcada",
  },
  {
    id: "g2",
    image: "/images/service-beard.jpg",
    category: "beard",
    tag: "Barboterapia",
    title: "Alinhamento de Barba com Lâmina Feather",
    technique: "Vapor de ozônio, toalha a 90°C com eucalipto e hidratação calmante",
  },
  {
    id: "g3",
    image: "/images/gallery-balayage.jpg",
    category: "hair",
    tag: "Colorimetria Autoral",
    title: "Balayage Morena Iluminada",
    technique: "Mechas à mão livre sem pó descolorante na raiz e com plex protetor",
  },
  {
    id: "g4",
    image: "/images/service-salon.jpg",
    category: "hair",
    tag: "Visagismo Feminino",
    title: "Corte em Camadas Médias",
    technique: "Estruturação de caimento em ângulo de 45° para leveza e volume",
  },
  {
    id: "g5",
    image: "/images/service-haircut.jpg",
    category: "fade",
    tag: "Alfaiataria Capilar",
    title: "Corte Clássico na Tesoura",
    technique: "Fio laser de aço cobalto com pomada à base de água matte",
  },
];

export function Gallery() {
  const containerRef = useRef<HTMLElement>(null);
  
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    dragFree: true,
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  useGSAP(
    () => {
      gsap.from(".portfolio-header", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          once: true,
        },
        opacity: 0,
        y: 15,
        duration: 0.6,
        ease: "power2.out",
      });

      gsap.from(".portfolio-carousel", {
        scrollTrigger: {
          trigger: ".portfolio-carousel",
          start: "top 85%",
          once: true,
        },
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power2.out",
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="py-20 sm:py-24 relative z-10 bg-obsidian-950 border-t border-white/5" id="galeria">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header com controles de carrossel */}
        <div className="portfolio-header flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <span className="inline-block text-xs uppercase tracking-widest font-bold text-bronze-400 mb-2">
              Portfólio & Prova Social
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              Resultados Reais & <span className="bronze-text">Experiências</span>
            </h2>
            <p className="text-sand-400 text-sm sm:text-base mt-2 font-light max-w-xl">
              Registros fotográficos dos atendimentos combinados a depoimentos de clientes frequentes.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={scrollPrev}
              className="w-11 h-11 rounded-full bg-white/5 hover:bg-bronze-500/20 border border-white/10 hover:border-bronze-500/40 text-sand-300 hover:text-white flex items-center justify-center transition-all"
              aria-label="Item anterior"
            >
              <FaChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={scrollNext}
              className="w-11 h-11 rounded-full bg-white/5 hover:bg-bronze-500/20 border border-white/10 hover:border-bronze-500/40 text-sand-300 hover:text-white flex items-center justify-center transition-all"
              aria-label="Próximo item"
            >
              <FaChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Embla Carousel Viewport unindo Fotos e Relatos */}
        <div className="portfolio-carousel overflow-hidden mb-10" ref={emblaRef}>
          <div className="flex gap-6">
            
            {/* Fotos de Portfólio */}
            {galleryItems.map((item) => (
              <div
                key={item.id}
                className="flex-[0_0_80%] sm:flex-[0_0_42%] lg:flex-[0_0_28%] min-w-0"
              >
                <div className="relative h-[340px] sm:h-[380px] rounded-3xl overflow-hidden border border-white/10 group shadow-2xl">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/95 via-obsidian-950/20 to-transparent flex flex-col justify-end p-5">
                    <span className="text-[10px] uppercase tracking-widest font-bold text-bronze-400 bg-obsidian-950/70 border border-bronze-500/30 px-2.5 py-0.5 rounded-full self-start mb-1.5 backdrop-blur-md">
                      {item.tag}
                    </span>
                    <h4 className="font-display font-bold text-white text-base leading-snug mb-1">
                      {item.title}
                    </h4>
                    <p className="text-xs text-sand-400 line-clamp-2 font-light">
                      {item.technique}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Cards de Depoimento Integrados no Carrossel */}
            {SITE_CONFIG.reviews.map((rev) => (
              <div
                key={rev.id}
                className="flex-[0_0_80%] sm:flex-[0_0_42%] lg:flex-[0_0_28%] min-w-0"
              >
                <SpotlightCard className="p-6 h-[340px] sm:h-[380px] flex flex-col justify-between border-white/10">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex text-amber-400 gap-0.5">
                        {[...Array(rev.rating)].map((_, i) => (
                          <FaStar key={i} className="w-3.5 h-3.5" />
                        ))}
                      </div>
                      <span className="text-[11px] text-sand-500 font-light">
                        {rev.date}
                      </span>
                    </div>

                    <p className="text-sand-200 text-xs sm:text-sm leading-relaxed font-light italic">
                      "{rev.text}"
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                    <div>
                      <h5 className="font-display font-bold text-white text-xs sm:text-sm">
                        {rev.name}
                      </h5>
                      <p className="text-[11px] text-sand-400 font-light">
                        {rev.context}
                      </p>
                    </div>
                    <span className="text-[9px] uppercase font-bold text-bronze-400 bg-bronze-500/10 px-2 py-0.5 rounded-md border border-bronze-500/20">
                      {rev.serviceUsed}
                    </span>
                  </div>
                </SpotlightCard>
              </div>
            ))}

          </div>
        </div>

        {/* Link Verificado Google */}
        <div className="text-center">
          <a
            href={SITE_CONFIG.contact.googleReviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-medium text-sand-300 hover:text-bronze-400 transition-colors underline decoration-dotted"
          >
            <FaCircleCheck className="w-4 h-4 text-emerald-500" />
            <span>Ver todas as 350+ avaliações no Google Meu Negócio</span>
            <FaArrowUpRightFromSquare className="w-3 h-3" />
          </a>
        </div>

      </div>
    </section>
  );
}
