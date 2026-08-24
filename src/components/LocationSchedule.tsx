"use client";

import { useEffect, useState, useRef } from "react";
import { FaLocationDot, FaPhone, FaArrowUpRightFromSquare, FaClock, FaChevronDown, FaWhatsapp } from "react-icons/fa6";
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
          text: `Aberto agora · Fecha às ${closeFormatted}`,
        });
      } else if (currentHour < todayConfig.openHour) {
        const openFormatted = todayConfig.hours.split(" às")[0] || "09:00";
        setStatusText({
          isOpen: false,
          text: `Fechado agora · Abre às ${openFormatted}`,
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
    <section ref={containerRef} className="py-20 sm:py-24 relative z-10 bg-midnight-950 border-t border-babyblue-400/10" id="visita">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header do Hub */}
        <div className="concierge-header text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block text-xs uppercase tracking-widest font-bold text-babyblue-300 mb-2">
            Visita & Concierge
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Localização, Horários & <span className="text-babyblue-300">Atendimento</span>
          </h2>
          <p className="text-ice-400 text-sm sm:text-base mt-2 font-normal">
            Em frente ao MASP, a 3 min da Estação Trianon com serviço de manobrista no local.
          </p>
        </div>

        {/* Bento Hub */}
        <div className="concierge-bento grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Coluna 1: Mapa */}
          <div className="lg:col-span-5 rounded-2xl overflow-hidden border border-babyblue-400/20 shadow-2xl min-h-[320px] relative">
            <iframe
              src={SITE_CONFIG.maps.embedUrl}
              className="w-full h-full min-h-[320px] border-0 grayscale-[40%] contrast-[1.1] hover:grayscale-0 transition-all duration-500"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização do Ateliê Lumen & Co."
            />
          </div>

          {/* Coluna 2: Informações */}
          <SpotlightCard className="lg:col-span-4 p-6 flex flex-col justify-between border-babyblue-400/20 bg-midnight-850">
            <div>
              <div className="mb-4 p-3 rounded-lg bg-midnight-900 border border-babyblue-400/20 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${statusText.isOpen ? "bg-babyblue-300 animate-pulse" : "bg-red-500"}`} />
                  <span className="text-xs font-bold text-white">
                    {statusText.text}
                  </span>
                </div>
                <FaClock className="w-3.5 h-3.5 text-babyblue-300 shrink-0" />
              </div>

              {/* Endereço */}
              <div className="space-y-3 mb-5 text-xs">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded bg-babyblue-400/10 text-babyblue-300 flex items-center justify-center shrink-0 border border-babyblue-400/20">
                    <FaLocationDot className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-white mb-0.5">{SITE_CONFIG.contact.address}</h5>
                    <p className="text-ice-400">{SITE_CONFIG.contact.addressComplement}</p>
                    <p className="text-babyblue-300 font-semibold mt-0.5">{SITE_CONFIG.contact.referencePoint}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded bg-babyblue-400/10 text-babyblue-300 flex items-center justify-center shrink-0 border border-babyblue-400/20">
                    <FaPhone className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-white mb-0.5">WhatsApp Recepção</h5>
                    <p className="text-ice-300 font-medium">{SITE_CONFIG.contact.phoneFormatted}</p>
                  </div>
                </div>
              </div>

              {/* Horários */}
              <div className="bg-midnight-900 border border-babyblue-400/10 rounded-lg p-3 text-xs space-y-1">
                {scheduleList.map((item) => {
                  const isToday = item.isCurrentDay(currentDay);
                  return (
                    <div
                      key={item.label}
                      className={`flex items-center justify-between px-2 py-1 rounded text-[11px] ${
                        isToday
                          ? "bg-babyblue-400/20 text-white font-bold border border-babyblue-400/40"
                          : "text-ice-400"
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
              className="btn-solid-primary mt-4 w-full !py-2.5 !text-xs"
            >
              <FaArrowUpRightFromSquare className="w-3 h-3 mr-1.5" />
              <span>Abrir Rota no Maps</span>
            </a>
          </SpotlightCard>

          {/* Coluna 3: FAQ */}
          <SpotlightCard className="lg:col-span-3 p-6 flex flex-col justify-between border-babyblue-400/20 bg-midnight-850">
            <div>
              <span className="text-[10px] uppercase tracking-widest font-bold text-babyblue-300 block mb-1">
                Dúvidas Rápidas
              </span>
              <h4 className="font-display font-bold text-base text-white mb-4">
                Informações Úteis
              </h4>

              <div className="space-y-2">
                {compactFaqs.map((faq, i) => {
                  const isOpen = openFaq === i;
                  return (
                    <div key={i} className="border border-babyblue-400/10 rounded-lg overflow-hidden bg-midnight-900">
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : i)}
                        className="w-full p-2.5 text-left text-xs font-bold text-ice-200 hover:text-white flex items-center justify-between gap-2"
                      >
                        <span>{faq.q}</span>
                        <FaChevronDown className={`w-3 h-3 text-babyblue-300 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                      </button>
                      {isOpen && (
                        <div className="px-2.5 pb-2.5 pt-1 text-[11px] text-ice-400 leading-relaxed border-t border-white/5">
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
              className="btn-wa-solid mt-4 w-full !py-2.5 !text-xs"
            >
              <FaWhatsapp className="w-4 h-4 mr-2" />
              <span>Falar no WhatsApp</span>
            </button>
          </SpotlightCard>

        </div>

      </div>
    </section>
  );
}
