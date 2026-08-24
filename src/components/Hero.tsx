"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { FaStar, FaArrowRight, FaCalendarDays, FaScissors, FaWandMagicSparkles, FaMugHot, FaCar } from "react-icons/fa6";
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
      <section ref={containerRef} className="relative min-h-[88vh] flex flex-col justify-center pt-28 sm:pt-32 pb-12 overflow-hidden bg-midnight-950" id="inicio">
        {/* Background Atmosphere Azul Suave */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-babyblue-500/10 rounded-full blur-[140px]" />
          <div className="absolute bottom-10 right-10 w-[450px] h-[250px] bg-blue-600/10 rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Coluna Esquerda: Tipografia & Botões Sólidos Azul Bebê */}
            <div className="lg:col-span-7 space-y-5">
              <div className="hero-badge inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-babyblue-400/10 border border-babyblue-400/30">
                <span className="w-2 h-2 rounded-full bg-babyblue-300 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider text-babyblue-200">
                  Av. Paulista, 1578 • Bela Vista
                </span>
              </div>

              <h1 className="hero-title font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.12] tracking-tight">
                A arte da precisão na tesoura & o cuidado <span className="text-babyblue-300">autoral</span>.
              </h1>

              <p className="hero-desc text-base sm:text-lg text-ice-300 max-w-xl leading-relaxed font-normal">
                Cortes milimétricos na tesoura japonesa, barboterapia tradicional com toalha aquecida e visagismo a 150 metros do MASP.
              </p>

              {/* Botões: Azul Bebê Sólido + Ghost Borda Nítida */}
              <div className="hero-ctas flex flex-col sm:flex-row gap-3 pt-1">
                <button
                  onClick={() => handleOpenBooking()}
                  className="btn-solid-primary"
                >
                  <FaCalendarDays className="w-4 h-4 mr-2" />
                  <span>Agendar Horário</span>
                </button>

                <a
                  href="#servicos"
                  className="btn-outline-clean"
                >
                  <span>Ver Procedimentos</span>
                  <FaArrowRight className="w-3.5 h-3.5 ml-2 text-babyblue-300" />
                </a>
              </div>

              {/* Prova Social */}
              <div className="hero-proof flex items-center gap-3 pt-1">
                <div className="flex text-babyblue-300 gap-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="w-3.5 h-3.5" />
                  ))}
                </div>
                <a
                  href={SITE_CONFIG.contact.googleReviewsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs sm:text-sm font-semibold text-ice-300 hover:text-babyblue-200 underline decoration-dotted transition-colors"
                >
                  ★ 4.9 no Google · +350 avaliações de clientes
                </a>
              </div>
            </div>

            {/* Coluna Direita: Foto Real */}
            <div className="hero-visual-frame lg:col-span-5 relative">
              <div className="relative h-[360px] sm:h-[420px] rounded-2xl overflow-hidden border border-babyblue-400/20 shadow-2xl group">
                <Image
                  src="/images/about-atelier.jpg"
                  alt="Interior sofisticado da Zleib Barber na Paulista"
                  fill
                  priority
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight-950/90 via-transparent to-transparent" />
                
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-midnight-900/90 border border-babyblue-400/20 backdrop-blur-md flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-white">Av. Paulista, 1578</h4>
                    <p className="text-xs text-ice-400 font-light">Em frente ao MASP • Valet cortesia</p>
                  </div>
                  <span className="text-[10px] uppercase tracking-wider font-extrabold text-babyblue-300 bg-babyblue-400/10 px-2.5 py-1 rounded border border-babyblue-400/20">
                    Aberto Hoje
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Barra de Reserva Rápida */}
          <div className="hero-booking-bar mt-10 p-3.5 rounded-xl bg-midnight-850 border border-babyblue-400/15 shadow-xl flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2 text-xs text-ice-300">
              <span className="font-bold text-white uppercase tracking-wider text-[11px]">Agendamento Direto:</span>
              {SITE_CONFIG.services.slice(0, 3).map((s) => (
                <button
                  key={s.id}
                  onClick={() => handleOpenBooking(s.id)}
                  className="px-3 py-1.5 rounded bg-midnight-900 hover:bg-babyblue-400/15 text-ice-200 hover:text-babyblue-200 border border-babyblue-400/20 transition-all font-semibold text-xs"
                >
                  {s.title} ({s.price})
                </button>
              ))}
            </div>

            <button
              onClick={() => handleOpenBooking()}
              className="w-full md:w-auto px-4 py-2 rounded bg-midnight-700 hover:bg-babyblue-400 hover:text-midnight-950 text-white font-bold text-xs uppercase tracking-wider transition-all border border-babyblue-400/30 shrink-0 flex items-center justify-center gap-1.5"
            >
              <span>Ver Todos</span>
              <FaArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* Tira de Rituais */}
          <div className="hero-rituals-strip grid grid-cols-2 md:grid-cols-4 gap-3 pt-6">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-midnight-850 border border-babyblue-400/10">
              <div className="w-8 h-8 rounded bg-babyblue-400/10 text-babyblue-300 flex items-center justify-center shrink-0 border border-babyblue-400/20">
                <FaScissors className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0">
                <h5 className="font-bold text-xs text-white truncate">Tesouras Japonesas</h5>
                <p className="text-[11px] text-ice-400 truncate">Fio laser de precisão</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg bg-midnight-850 border border-babyblue-400/10">
              <div className="w-8 h-8 rounded bg-babyblue-400/10 text-babyblue-300 flex items-center justify-center shrink-0 border border-babyblue-400/20">
                <FaWandMagicSparkles className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0">
                <h5 className="font-bold text-xs text-white truncate">Toalha a 90°C & Vapor</h5>
                <p className="text-[11px] text-ice-400 truncate">Óleo de eucalipto puro</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg bg-midnight-850 border border-babyblue-400/10">
              <div className="w-8 h-8 rounded bg-babyblue-400/10 text-babyblue-300 flex items-center justify-center shrink-0 border border-babyblue-400/20">
                <FaMugHot className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0">
                <h5 className="font-bold text-xs text-white truncate">Espresso Microlote</h5>
                <p className="text-[11px] text-ice-400 truncate">Sul de Minas cortesia</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg bg-midnight-850 border border-babyblue-400/10">
              <div className="w-8 h-8 rounded bg-babyblue-400/10 text-babyblue-300 flex items-center justify-center shrink-0 border border-babyblue-400/20">
                <FaCar className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0">
                <h5 className="font-bold text-xs text-white truncate">Valet no Local</h5>
                <p className="text-[11px] text-ice-400 truncate">Manobrista cortesia</p>
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
