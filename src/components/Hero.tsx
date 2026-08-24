"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { FaStar, FaArrowRight, FaCalendarDays, FaShieldHalved } from "react-icons/fa6";
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
        .from(".hero-visual-frame", { opacity: 0, scale: 0.97, duration: 0.7 }, "-=0.5")
        .from(".hero-booking-bar", { opacity: 0, y: 15, duration: 0.5 }, "-=0.4");
    },
    { scope: containerRef }
  );

  const handleOpenBooking = (serviceId?: string) => {
    if (serviceId) setSelectedService(serviceId);
    setModalOpen(true);
  };

  return (
    <>
      <section ref={containerRef} className="relative min-h-[90vh] flex flex-col justify-center pt-28 sm:pt-36 pb-16 overflow-hidden bg-midnight-950" id="inicio">
        {/* Background Atmosphere Verde-Petróleo Sutil */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-teal-500/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-10 right-10 w-[500px] h-[300px] bg-teal-900/15 rounded-full blur-[130px]" />
          <div className="absolute inset-0 grain-overlay opacity-30" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Coluna Esquerda: Tipografia Editorial & CTAs */}
            <div className="lg:col-span-7 space-y-6">
              <div className="hero-badge inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30">
                <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                <span className="text-xs font-semibold uppercase tracking-wider text-teal-300">
                  Av. Paulista, 1578 • 150m do MASP
                </span>
              </div>

              <h1 className="hero-title font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.12] tracking-tight">
                A arte da precisão na tesoura & o cuidado <span className="text-teal-400 font-light italic">autoral</span>.
              </h1>

              <p className="hero-desc text-base sm:text-lg text-ice-300 max-w-xl leading-relaxed font-normal">
                Cortes milimétricos com tesouras japonesas, barboterapia tradicional com toalha a 90°C e visagismo contemporâneo com hora marcada rigorosa.
              </p>

              {/* Botões: Assinatura Teal Sólido + Ghost Nítido */}
              <div className="hero-ctas flex flex-col sm:flex-row gap-3.5 pt-1">
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
                  <span>Ver Procedimentos & Valores</span>
                  <FaArrowRight className="w-3.5 h-3.5 ml-2 text-teal-300" />
                </a>
              </div>

              {/* Prova Social Verificada */}
              <div className="hero-proof flex flex-wrap items-center gap-3 pt-2">
                <div className="flex text-amber-400 gap-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="w-4 h-4" />
                  ))}
                </div>
                <a
                  href={SITE_CONFIG.contact.googleReviewsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs sm:text-sm font-semibold text-ice-300 hover:text-teal-300 underline decoration-dotted transition-colors flex items-center gap-1.5"
                >
                  <span>★ 4.9 no Google · +350 avaliações de clientes</span>
                  <FaShieldHalved className="w-3.5 h-3.5 text-teal-400" />
                </a>
              </div>
            </div>

            {/* Coluna Direita: Fotografia Real do Espaço */}
            <div className="hero-visual-frame lg:col-span-5 relative">
              <div className="relative h-[380px] sm:h-[450px] rounded-2xl overflow-hidden border border-teal-500/25 shadow-2xl group">
                <Image
                  src="/images/about-atelier.jpg"
                  alt="Interior sofisticado da Zleib Barber na Avenida Paulista"
                  fill
                  priority
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight-950/90 via-midnight-950/20 to-transparent" />
                
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-midnight-900/95 border border-teal-500/20 backdrop-blur-md flex items-center justify-between">
                  <div>
                    <h4 className="font-display font-bold text-base text-white">Av. Paulista, 1578</h4>
                    <p className="text-xs text-ice-400 font-light">Em frente ao MASP • Valet cortesia</p>
                  </div>
                  <span className="text-[10px] uppercase tracking-wider font-extrabold text-teal-300 bg-teal-500/10 px-2.5 py-1 rounded border border-teal-500/25">
                    Atendimento Privativo
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Barra de Reserva Rápida */}
          <div className="hero-booking-bar mt-12 p-4 rounded-xl bg-midnight-850 border border-teal-500/20 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-3.5">
            <div className="flex flex-wrap items-center gap-2.5 text-xs text-ice-300">
              <span className="font-semibold text-white uppercase tracking-wider text-[11px]">Agendamento Direto:</span>
              {SITE_CONFIG.services.slice(0, 3).map((s) => (
                <button
                  key={s.id}
                  onClick={() => handleOpenBooking(s.id)}
                  className="px-3.5 py-1.5 rounded-lg bg-midnight-900 hover:bg-teal-500/15 text-ice-200 hover:text-teal-200 border border-teal-500/20 transition-all font-medium text-xs"
                >
                  {s.title} ({s.price})
                </button>
              ))}
            </div>

            <button
              onClick={() => handleOpenBooking()}
              className="w-full md:w-auto px-4 py-2 rounded-lg bg-midnight-800 hover:bg-teal-500 hover:text-midnight-950 text-white font-bold text-xs uppercase tracking-wider transition-all border border-teal-500/30 shrink-0 flex items-center justify-center gap-1.5"
            >
              <span>Ver Todos</span>
              <FaArrowRight className="w-3 h-3" />
            </button>
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
