"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { FaStar, FaArrowRight, FaLocationDot, FaClock, FaCalendarDays, FaScissors, FaWandMagicSparkles, FaMugHot, FaCar } from "react-icons/fa6";
import { SITE_CONFIG } from "@/data/siteConfig";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/utils/gsap";
import { BookingModal } from "./BookingModal";

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("corte-signature");

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      tl.from(".hero-badge", { opacity: 0, y: 12, duration: 0.5 })
        .from(".hero-title", { opacity: 0, y: 16, duration: 0.6 }, "-=0.3")
        .from(".hero-desc", { opacity: 0, y: 12, duration: 0.5 }, "-=0.3")
        .from(".hero-ctas", { opacity: 0, y: 12, duration: 0.5 }, "-=0.3")
        .from(".hero-proof", { opacity: 0, duration: 0.5 }, "-=0.3")
        .from(".hero-visual-frame", { opacity: 0, scale: 0.96, duration: 0.7 }, "-=0.5")
        .from(".hero-booking-bar", { opacity: 0, y: 15, duration: 0.5 }, "-=0.4")
        .from(".hero-rituals-strip", { opacity: 0, y: 10, duration: 0.5 }, "-=0.3");
    },
    { scope: containerRef }
  );

  const handleOpenBooking = (serviceId?: string) => {
    if (serviceId) setSelectedService(serviceId);
    setModalOpen(true);
  };

  return (
    <>
      <section ref={containerRef} className="relative min-h-[90vh] flex flex-col justify-center pt-28 sm:pt-32 pb-12 overflow-hidden bg-obsidian-950" id="inicio">
        {/* Background Atmosphere */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-bronze-500/10 rounded-full blur-[130px]" />
          <div className="absolute bottom-10 right-10 w-[450px] h-[250px] bg-emeraldAction/5 rounded-full blur-[110px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Coluna Esquerda: Tipografia Editorial */}
            <div className="lg:col-span-7 space-y-5">
              <div className="hero-badge inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-semibold text-sand-300">
                  Ateliê com hora marcada • Bela Vista, Av. Paulista
                </span>
              </div>

              <h1 className="hero-title font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-sand-50 leading-[1.12] tracking-tight">
                A arte da precisão na tesoura & o cuidado <span className="bronze-text">autoral</span>.
              </h1>

              <p className="hero-desc text-base sm:text-lg text-sand-300 max-w-xl leading-relaxed font-light">
                Cortes milimétricos na tesoura japonesa, barboterapia tradicional com toalha aquecida e visagismo a 150 metros do MASP.
              </p>

              {/* CTAs */}
              <div className="hero-ctas flex flex-col sm:flex-row gap-3.5 pt-1">
                <button
                  onClick={() => handleOpenBooking()}
                  className="px-7 py-3.5 rounded-xl bg-bronze-gradient text-obsidian-950 font-bold text-sm shadow-luxury-glow hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2.5 btn-shine"
                >
                  <FaCalendarDays className="w-4 h-4 text-obsidian-950" />
                  <span>Solicitar Agendamento</span>
                </button>

                <a
                  href="#servicos"
                  className="px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-sand-200 hover:text-white border border-white/10 backdrop-blur-md font-semibold text-sm transition-all flex items-center justify-center gap-2"
                >
                  <span>Menu de Procedimentos</span>
                  <FaArrowRight className="w-3.5 h-3.5 text-bronze-400" />
                </a>
              </div>

              {/* Prova Social */}
              <div className="hero-proof flex items-center gap-3 pt-1">
                <div className="flex text-amber-400 gap-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="w-3.5 h-3.5" />
                  ))}
                </div>
                <a
                  href={SITE_CONFIG.contact.googleReviewsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs sm:text-sm font-semibold text-sand-300 hover:text-bronze-400 underline decoration-dotted transition-colors"
                >
                  ★ 4.9 no Google · +350 avaliações verificadas
                </a>
              </div>
            </div>

            {/* Coluna Direita: Foto Real do Ateliê */}
            <div className="hero-visual-frame lg:col-span-5 relative">
              <div className="relative h-[360px] sm:h-[420px] rounded-3xl overflow-hidden border border-bronze-500/30 shadow-2xl group">
                <Image
                  src="/images/about-atelier.jpg"
                  alt="Interior sofisticado da Lumen & Co. na Paulista"
                  fill
                  priority
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/90 via-obsidian-950/20 to-transparent" />
                
                <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-obsidian-900/80 border border-white/10 backdrop-blur-xl flex items-center justify-between">
                  <div>
                    <h4 className="font-display font-bold text-sm text-white">Av. Paulista, 1578</h4>
                    <p className="text-xs text-sand-400 font-light">A 150m do MASP • Valet cortesia</p>
                  </div>
                  <span className="text-[11px] uppercase tracking-wider font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                    Aberto Hoje
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Barra de Reserva Rápida */}
          <div className="hero-booking-bar mt-10 p-3.5 sm:p-4 rounded-2xl bg-obsidian-900/80 border border-white/10 backdrop-blur-xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-sand-300">
              <span className="font-bold text-white uppercase tracking-wider text-[11px]">Agendamento Direto:</span>
              {SITE_CONFIG.services.slice(0, 3).map((s) => (
                <button
                  key={s.id}
                  onClick={() => handleOpenBooking(s.id)}
                  className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-bronze-500/20 text-sand-300 hover:text-white border border-white/10 hover:border-bronze-500/40 transition-all font-medium text-xs"
                >
                  {s.title} ({s.price})
                </button>
              ))}
            </div>

            <button
              onClick={() => handleOpenBooking()}
              className="w-full md:w-auto px-5 py-2.5 rounded-xl bg-white/10 hover:bg-bronze-gradient text-white hover:text-obsidian-950 font-bold text-xs uppercase tracking-wider transition-all border border-white/10 hover:border-transparent shrink-0 flex items-center justify-center gap-2"
            >
              <span>Ver Todos os Horários</span>
              <FaArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* Tira Compacta de Rituais (Substitui uma seção inteira de diferenciais) */}
          <div className="hero-rituals-strip grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pt-6">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="w-8 h-8 rounded-lg bg-bronze-500/10 text-bronze-400 flex items-center justify-center shrink-0">
                <FaScissors className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0">
                <h5 className="font-bold text-xs text-white truncate">Tesouras Japonesas</h5>
                <p className="text-[11px] text-sand-400 truncate">Fio laser de precisão</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="w-8 h-8 rounded-lg bg-bronze-500/10 text-bronze-400 flex items-center justify-center shrink-0">
                <FaWandMagicSparkles className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0">
                <h5 className="font-bold text-xs text-white truncate">Toalha a 90°C & Vapor</h5>
                <p className="text-[11px] text-sand-400 truncate">Óleo de eucalipto puro</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="w-8 h-8 rounded-lg bg-bronze-500/10 text-bronze-400 flex items-center justify-center shrink-0">
                <FaMugHot className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0">
                <h5 className="font-bold text-xs text-white truncate">Espresso Microlote</h5>
                <p className="text-[11px] text-sand-400 truncate">Sul de Minas cortesia</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="w-8 h-8 rounded-lg bg-bronze-500/10 text-bronze-400 flex items-center justify-center shrink-0">
                <FaCar className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0">
                <h5 className="font-bold text-xs text-white truncate">Valet no Local</h5>
                <p className="text-[11px] text-sand-400 truncate">Manobrista cortesia</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      <BookingModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        defaultService={selectedService}
      />
    </>
  );
}
