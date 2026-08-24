"use client";

import { useRef, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { FaStar, FaCircleCheck, FaArrowUpRightFromSquare, FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { SITE_CONFIG } from "@/data/siteConfig";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/utils/gsap";
import { SpotlightCard } from "./SpotlightCard";

export function Reviews() {
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
      gsap.from(".reviews-header", {
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

      gsap.from(".reviews-slider", {
        scrollTrigger: {
          trigger: ".reviews-slider",
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
    <section ref={containerRef} className="py-24 sm:py-32 relative z-10 bg-obsidian-950 border-t border-white/5" id="avaliaçoes">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header com controles do carrossel */}
        <div className="reviews-header flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="inline-block text-xs uppercase tracking-widest font-bold text-bronze-400 mb-3">
              Avaliações Verificadas
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              Relatos da <span className="bronze-text">Nossa Bancada</span>
            </h2>
            <p className="text-sand-400 text-base mt-2 font-light max-w-xl">
              Depoimentos espontâneos registrados por clientes frequentes no Google Meu Negócio.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={scrollPrev}
              className="w-12 h-12 rounded-full bg-white/5 hover:bg-bronze-500/20 border border-white/10 hover:border-bronze-500/40 text-sand-300 hover:text-white flex items-center justify-center transition-all"
              aria-label="Avaliação anterior"
            >
              <FaChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={scrollNext}
              className="w-12 h-12 rounded-full bg-white/5 hover:bg-bronze-500/20 border border-white/10 hover:border-bronze-500/40 text-sand-300 hover:text-white flex items-center justify-center transition-all"
              aria-label="Próxima avaliação"
            >
              <FaChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Embla Carousel Viewport */}
        <div className="reviews-slider overflow-hidden mb-12" ref={emblaRef}>
          <div className="flex gap-6">
            {SITE_CONFIG.reviews.map((rev) => (
              <div
                key={rev.id}
                className="flex-[0_0_88%] sm:flex-[0_0_48%] lg:flex-[0_0_32%] min-w-0"
              >
                <SpotlightCard className="p-7 sm:p-8 h-full flex flex-col justify-between border-white/10">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex text-amber-400 gap-1">
                        {[...Array(rev.rating)].map((_, i) => (
                          <FaStar key={i} className="w-3.5 h-3.5" />
                        ))}
                      </div>
                      <span className="text-xs text-sand-500 font-light">
                        {rev.date}
                      </span>
                    </div>

                    <p className="text-sand-200 text-sm leading-relaxed mb-6 font-light italic">
                      "{rev.text}"
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                    <div>
                      <h4 className="font-display font-bold text-white text-sm">
                        {rev.name}
                      </h4>
                      <p className="text-xs text-sand-400 font-light">
                        {rev.context}
                      </p>
                    </div>
                    <span className="text-[10px] uppercase font-bold text-bronze-400 bg-bronze-500/10 px-2.5 py-1 rounded-md border border-bronze-500/20">
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
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-sand-300 hover:text-bronze-400 transition-colors underline decoration-dotted"
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
