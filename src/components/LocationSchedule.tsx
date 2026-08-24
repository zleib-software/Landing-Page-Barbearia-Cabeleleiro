"use client";

import { useEffect, useState, useRef } from "react";
import { FaLocationDot, FaPhone, FaArrowUpRightFromSquare, FaCalendarDays, FaClock, FaChevronDown, FaWhatsapp } from "react-icons/fa6";
import { SITE_CONFIG } from "@/data/siteConfig";
import { openWhatsApp } from "@/utils/whatsapp";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/utils/gsap";
import { SpotlightCard } from "./SpotlightCard";

const scheduleList = [
  { label: "Segunda a Quarta", hours: "09:00 às 20:00", openHour: 9, closeHour: 20, isCurrentDay: (d: number) => d >= 1 && d <= 3 },
  { label: "Quinta-feira", hours: "09:00 às 21:00", openHour: 9, closeHour: 21, isCurrentDay: (d: number) => d === 4 },
  { label: "Sexta-feira", hours: "08:30 às 21:30", openHour: 8.5, closeHour: 21.5, isCurrentDay: (d: number) => d === 5 },
  { label: "Sábado", hours: "08:30 às 20:00", openHour: 8.5, closeHour: 20, isCurrentDay: (d: number) => d === 6 },
  { label: "Domingo", hours: "Atendimentos privativos e noivos", openHour: 0, closeHour: 0, isCurrentDay: (d: number) => d === 0 },
];

const compactFaqs = [
  {
    q: "Como funciona a garantia do horário marcado?",
    a: "Trabalhamos com intervalos planejados entre atendimentos. Seu horário começa no minuto agendado, garantindo total pontualidade.",
  },
  {
    q: "O lounge e os cafés são cobrados à parte?",
    a: "Não. Os expressos de microlote do Sul de Minas e bebidas do lounge são cortesias para todos os clientes em atendimento.",
  },
  {
    q: "Como funciona o estacionamento?",
    a: "Dispomos de serviço de valet cortesia no próprio edifício da Av. Paulista para clientes com agendamento ativo.",
  },
];

export function LocationSchedule() {
  const containerRef = useRef<HTMLElement>(null);
  const [currentDay, setCurrentDay] = useState<number>(1);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [statusText, setStatusText] = useState<{ isOpen: boolean; text: string }>({
    isOpen: true,
    text: "Verificando...",
  });

  useGSAP(
    () => {
      gsap.from(".concierge-header", {
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

      gsap.from(".concierge-bento", {
        scrollTrigger: {
          trigger: ".concierge-bento",
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

  useEffect(() => {
    const now = new Date();
    const day = now.getDay();
    const currentHour = now.getHours() + now.getMinutes() / 60;
    setCurrentDay(day);

    const todayConfig = scheduleList.find(s => s.isCurrentDay(day));

    if (todayConfig && day !== 0) {
      if (currentHour >= todayConfig.openHour && currentHour < todayConfig.closeHour) {
        const closeFormatted = todayConfig.hours.split("às ")[1] || "20:00";
        setStatusText({
          isOpen: true,
          text: `Aberto agora · Fecha hoje às ${closeFormatted}`,
        });
      } else if (currentHour < todayConfig.openHour) {
        const openFormatted = todayConfig.hours.split(" às")[0] || "09:00";
        setStatusText({
          isOpen: false,
          text: `Fechado agora · Abre hoje às ${openFormatted}`,
        });
      } else {
        setStatusText({
          isOpen: false,
          text: "Fechado agora · Reabre amanhã",
        });
      }
    } else {
      setStatusText({
        isOpen: false,
        text: "Fechado hoje · Reabre segunda às 09:00",
      });
    }
  }, []);

  return (
    <section ref={containerRef} className="py-20 sm:py-24 relative z-10 bg-obsidian-950 border-t border-white/5" id="visita">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header do Hub */}
        <div className="concierge-header text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block text-xs uppercase tracking-widest font-bold text-bronze-400 mb-2">
            Visita & Concierge
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Localização, Horários & <span className="bronze-text">Atendimento</span>
          </h2>
          <p className="text-sand-400 text-sm sm:text-base mt-2 font-light">
            Em frente ao MASP, com fácil acesso pelo Metrô Trianon e serviço de manobrista no local.
          </p>
        </div>

        {/* Bento Hub 3 Colunas Integrando Mapa, Horários e FAQ */}
        <div className="concierge-bento grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Coluna 1: Mapa Interativo (5 Cols) */}
          <div className="lg:col-span-5 rounded-3xl overflow-hidden border border-bronze-500/20 shadow-2xl min-h-[320px] relative">
            <iframe
              src={SITE_CONFIG.maps.embedUrl}
              className="w-full h-full min-h-[320px] border-0 grayscale-[40%] contrast-[1.1] hover:grayscale-0 transition-all duration-500"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização do Ateliê Lumen & Co."
            />
          </div>

          {/* Coluna 2: Informações de Horário & Endereço (4 Cols) */}
          <SpotlightCard className="lg:col-span-4 p-6 flex flex-col justify-between border-white/10">
            <div>
              {/* Status Aberto em Tempo Real */}
              <div className="mb-4 p-3 rounded-xl bg-obsidian-950 border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${statusText.isOpen ? "bg-emerald-400 animate-pulse" : "bg-red-400"}`} />
                  <span className="text-xs font-semibold text-white">
                    {statusText.text}
                  </span>
                </div>
                <FaClock className="w-3.5 h-3.5 text-bronze-400 shrink-0" />
              </div>

              {/* Endereço */}
              <div className="space-y-3 mb-5 text-xs">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-bronze-500/10 text-bronze-400 flex items-center justify-center shrink-0 border border-bronze-500/20">
                    <FaLocationDot className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-white mb-0.5">{SITE_CONFIG.contact.address}</h5>
                    <p className="text-sand-400 font-light">{SITE_CONFIG.contact.addressComplement}</p>
                    <p className="text-bronze-400 font-medium mt-0.5">{SITE_CONFIG.contact.referencePoint}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-bronze-500/10 text-bronze-400 flex items-center justify-center shrink-0 border border-bronze-500/20">
                    <FaPhone className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-white mb-0.5">WhatsApp Recepção</h5>
                    <p className="text-sand-400 font-light">{SITE_CONFIG.contact.phoneFormatted}</p>
                  </div>
                </div>
              </div>

              {/* Horários da Semana */}
              <div className="bg-obsidian-950 border border-white/5 rounded-xl p-3 text-xs space-y-1">
                {scheduleList.map((item) => {
                  const isToday = item.isCurrentDay(currentDay);
                  return (
                    <div
                      key={item.label}
                      className={`flex items-center justify-between px-2 py-1 rounded-md text-[11px] ${
                        isToday
                          ? "bg-bronze-500/15 text-white font-bold border border-bronze-500/30"
                          : "text-sand-400 font-light"
                      }`}
                    >
                      <span>{item.label}</span>
                      <span>{item.hours}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <a
              href={SITE_CONFIG.maps.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 w-full py-2.5 rounded-xl bg-bronze-gradient text-obsidian-950 font-bold text-xs uppercase tracking-wider shadow-luxury-glow flex items-center justify-center gap-1.5 hover:scale-105 active:scale-95 transition-all btn-shine"
            >
              <FaArrowUpRightFromSquare className="w-3 h-3" />
              <span>Abrir Rota no Maps</span>
            </a>
          </SpotlightCard>

          {/* Coluna 3: FAQ Rápido & WhatsApp Direto (3 Cols) */}
          <SpotlightCard className="lg:col-span-3 p-6 flex flex-col justify-between border-white/10">
            <div>
              <span className="text-[10px] uppercase tracking-widest font-bold text-bronze-400 block mb-2">
                Dúvidas Rápidas
              </span>
              <h4 className="font-display font-bold text-base text-white mb-4">
                Informações Úteis
              </h4>

              <div className="space-y-2">
                {compactFaqs.map((faq, i) => {
                  const isOpen = openFaq === i;
                  return (
                    <div key={i} className="border border-white/5 rounded-xl overflow-hidden bg-obsidian-950">
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : i)}
                        className="w-full p-2.5 text-left text-xs font-semibold text-sand-200 hover:text-white flex items-center justify-between gap-2"
                      >
                        <span>{faq.q}</span>
                        <FaChevronDown className={`w-3 h-3 text-bronze-400 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                      </button>
                      {isOpen && (
                        <div className="px-2.5 pb-2.5 pt-1 text-[11px] text-sand-400 font-light leading-relaxed border-t border-white/5">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <button
              onClick={() => openWhatsApp("Olá! Gostaria de falar com a recepção da Lumen & Co.")}
              className="mt-4 w-full py-2.5 rounded-xl bg-wa hover:bg-wa-dark text-white font-extrabold text-xs uppercase tracking-wider shadow-wa-glow flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 btn-shine"
            >
              <FaWhatsapp className="w-4 h-4 text-white" />
              <span>WhatsApp Recepção</span>
            </button>
          </SpotlightCard>

        </div>

      </div>
    </section>
  );
}
