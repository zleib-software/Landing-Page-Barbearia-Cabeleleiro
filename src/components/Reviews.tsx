"use client";

import { useRef } from "react";
import { Star, CheckCircle } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/utils/gsap";

const reviews = [
  {
    initials: "RM",
    name: "Rodrigo Miranda",
    verified: "Cliente Verificado • Google",
    comment:
      "Melhor experiência de barbearia que já tive! O Alex é um artista, o fade ficou impecável e a toalha quente com massagem é surreal. O café espresso na espera e a pontualidade fazem toda a diferença!",
  },
  {
    initials: "LA",
    name: "Larissa Albuquerque",
    verified: "Cliente Verificada • Google",
    comment:
      "Fiz minha balayage com a Camila e meu cabelo ficou simplesmente perfeito, super sedoso e natural. O salão tem um ambiente refinado e o agendamento pelo WhatsApp foi super ágil.",
  },
  {
    initials: "GS",
    name: "Gustavo Silveira",
    verified: "Cliente Verificado • Google",
    comment:
      "Atendimento no horário exato, sem enrolação. O espaço é muito confortável e o cuidado com a higiene e detalhes é de outro nível. Virei cliente fiel!",
  },
];

export function Reviews() {
  const containerRef = useRef<HTMLElement>(null);

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

      gsap.from(".review-card", {
        scrollTrigger: {
          trigger: ".reviews-grid",
          start: "top 85%",
          once: true,
        },
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.5,
        ease: "power2.out",
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="py-20 sm:py-24 relative z-10 bg-light-150/70 dark:bg-dark-950/60 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="reviews-header text-center max-w-3xl mx-auto mb-14">
          <span className="inline-block text-xs uppercase tracking-widest font-bold text-gold-700 dark:text-gold-400 bg-gold-500/10 border border-gold-500/30 px-4 py-1.5 rounded-full mb-4">
            Avaliações Verificadas
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-light-950 dark:text-white mb-4">
            O que dizem os nossos <span className="gold-gradient-text">clientes</span>
          </h2>
          <p className="text-light-600 dark:text-gray-400 text-base sm:text-lg">
            Mais de 350 clientes satisfeitos com nota máxima no Google Meu Negócio.
          </p>
        </div>

        <div className="reviews-grid grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {reviews.map((rev, index) => (
            <div
              key={index}
              className="review-card glass-card p-7 sm:p-8 rounded-3xl border border-light-300 dark:border-white/10 hover:border-gold-500/50 shadow-elevation-light dark:shadow-none flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-light-200 dark:bg-dark-700 border border-gold-500/40 flex items-center justify-center font-display font-bold text-gold-700 dark:text-gold-400 text-sm">
                      {rev.initials}
                    </div>
                    <div>
                      <h3 className="font-bold text-light-950 dark:text-white text-sm sm:text-base leading-tight">
                        {rev.name}
                      </h3>
                      <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 text-xs mt-0.5 font-medium">
                        <CheckCircle className="w-3 h-3" />
                        <span>{rev.verified}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex text-amber-500 dark:text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-500 dark:fill-amber-400" />
                    ))}
                  </div>
                </div>

                <p className="text-light-700 dark:text-gray-300 text-sm italic leading-relaxed font-normal">
                  "{rev.comment}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
