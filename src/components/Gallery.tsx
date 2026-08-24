"use client";

import { useRef, useCallback } from "react";
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
    image: "/images/gallery-balayage.jpg",
    category: "hair",
    tag: "Colorimetria Wella",
    title: "Balayage Morena Iluminada",
    technique: "Mechas à mão livre sem pó na raiz e com plex protetor antiquebra",
  },
  {
    id: "g3",
    image: "/images/gallery-beard.jpg",
    category: "beard",
    tag: "Barboterapia Tradicional",
    title: "Alinhamento de Barba com Lâmina Feather",
    technique: "Vapor de ozônio medicinal, toalha a 90°C e hidratação com óleo de eucalipto",
  },
  {
    id: "g4",
    image: "/images/gallery-layers.jpg",
    category: "hair",
    tag: "Visagismo Feminino",
    title: "Corte em Camadas & Franja Curtain",
    technique: "Estruturação de caimento em ângulo de 45° para leveza, balanço e volume natural",
  },
  {
    id: "g5",
    image: "/images/gallery-texture.jpg",
    category: "fade",
    tag: "Alfaiataria Capilar",
    title: "Corte Texturizado na Tesoura",
    technique: "Tesouras japonesas de aço cobalto com pomada à base de água Keune Matte",
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
    <section ref={containerRef} className="py-24 sm:py-32 relative z-10 bg-midnight-900 border-t border-teal-500/10" id="galeria">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header com controles de carrossel */}
        <div className="portfolio-header flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="inline-block text-xs uppercase tracking-widest font-semibold text-teal-400 mb-2.5">
              Portfólio de Atendimentos
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              Resultados Reais & <span className="text-teal-400 font-light italic">Execuções Técnicas</span>
            </h2>
            <p className="text-ice-400 text-sm sm:text-base mt-3 font-normal max-w-xl">
              Registros fotográficos dos trabalhos realizados no ateliê e relatos de quem confia na nossa bancada.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={scrollPrev}
              className="w-11 h-11 rounded-lg bg-midnight-850 hover:bg-teal-500/15 border border-teal-500/20 text-ice-300 hover:text-teal-200 flex items-center justify-center transition-all"
              aria-label="Item anterior"
            >
              <FaChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={scrollNext}
              className="w-11 h-11 rounded-lg bg-midnight-850 hover:bg-teal-500/15 border border-teal-500/20 text-ice-300 hover:text-teal-200 flex items-center justify-center transition-all"
              aria-label="Próximo item"
            >
              <FaChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Embla Carousel Viewport */}
        <div className="portfolio-carousel overflow-hidden mb-12" ref={emblaRef}>
          <div className="flex gap-6">
            
            {/* Fotos de Portfólio com Imagens Únicas */}
            {galleryItems.map((item) => (
              <div
                key={item.id}
                className="flex-[0_0_85%] sm:flex-[0_0_46%] lg:flex-[0_0_30%] min-w-0"
              >
                <div className="relative h-[360px] sm:h-[400px] rounded-2xl overflow-hidden border border-teal-500/20 group shadow-2xl">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-midnight-950 via-midnight-950/25 to-transparent flex flex-col justify-end p-6">
                    <span className="text-[10px] uppercase tracking-widest font-bold text-teal-300 bg-midnight-900/90 border border-teal-500/30 px-3 py-1 rounded-md self-start mb-2 backdrop-blur-md">
                      {item.tag}
                    </span>
                    <h4 className="font-display font-bold text-white text-lg leading-snug mb-1">
                      {item.title}
                    </h4>
                    <p className="text-xs text-ice-300 line-clamp-2 font-light">
                      {item.technique}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Cards de Depoimento Variados */}
            {SITE_CONFIG.reviews.map((rev) => (
              <div
                key={rev.id}
                className="flex-[0_0_85%] sm:flex-[0_0_46%] lg:flex-[0_0_30%] min-w-0"
              >
                <SpotlightCard className="p-7 h-[360px] sm:h-[400px] flex flex-col justify-between border-teal-500/20 bg-midnight-850">
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex text-amber-400 gap-1">
                        {[...Array(rev.rating)].map((_, i) => (
                          <FaStar key={i} className="w-3.5 h-3.5" />
                        ))}
                      </div>
                      <span className="text-xs text-ice-400 font-light">
                        {rev.date}
                      </span>
                    </div>

                    <p className="text-ice-200 text-xs sm:text-sm leading-relaxed font-normal italic">
                      "{rev.text}"
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                    <div>
                      <h5 className="font-display font-bold text-white text-sm">
                        {rev.name}
                      </h5>
                      <p className="text-xs text-ice-400 font-light">
                        {rev.context}
                      </p>
                    </div>
                    <span className="text-[10px] uppercase font-bold text-teal-300 bg-teal-500/10 px-2.5 py-1 rounded border border-teal-500/20">
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
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-ice-300 hover:text-teal-300 transition-colors underline decoration-dotted"
          >
            <FaCircleCheck className="w-4 h-4 text-teal-400" />
            <span>Ver todas as 350+ avaliações reais no Google Meu Negócio</span>
            <FaArrowUpRightFromSquare className="w-3 h-3" />
          </a>
        </div>

      </div>
    </section>
  );
}
