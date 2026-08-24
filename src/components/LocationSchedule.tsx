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
    text: "Aberto hoje · Atendimento com hora marcada",
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
    const computeStatus = () => {
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
            text: "Fechado agora · Reabre amanhã às 09:00",
          });
        }
      } else {
        setStatusText({
          isOpen: false,
          text: "Fechado hoje · Atendimentos privativos sob reserva",
        });
      }
    };

    computeStatus();
    const timer = setInterval(computeStatus, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section ref={containerRef} className="py-24 sm:py-32 relative z-10 bg-midnight-950 border-t border-teal-500/10" id="visita">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header do Hub */}
        <div className="concierge-header text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-xs uppercase tracking-widest font-semibold text-teal-400 mb-2.5">
            Visita & Localização
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Localização, Horários & <span className="text-teal-400 font-light italic">Concierge</span>
          </h2>
          <p className="text-ice-400 text-sm sm:text-base mt-3 font-normal">
            Em frente ao MASP, a 3 min da Estação Trianon-MASP com serviço de manobrista cortesia no local.
          </p>
        </div>

        {/* Bento Hub */}
        <div className="concierge-bento grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Coluna 1: Mapa */}
          <div className="lg:col-span-5 rounded-2xl overflow-hidden border border-teal-500/20 shadow-2xl min-h-[340px] relative bg-midnight-900">
            <iframe
              src={SITE_CONFIG.maps.embedUrl}
              className="w-full h-full min-h-[340px] border-0 grayscale-[30%] contrast-[1.1] hover:grayscale-0 transition-all duration-500"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização do Ateliê Zleib Barber na Avenida Paulista"
            />
          </div>

          {/* Coluna 2: Informações & Horários */}
          <SpotlightCard className="lg:col-span-4 p-7 flex flex-col justify-between border-teal-500/20 bg-midnight-850">
            <div>
              {/* Badge de Horário em Tempo Real */}
              <div className="mb-5 p-3.5 rounded-xl bg-midnight-900 border border-teal-500/20 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className={`w-2.5 h-2.5 rounded-full ${statusText.isOpen ? "bg-teal-400 animate-pulse" : "bg-red-400"}`} />
                  <span className="text-xs font-bold text-white">
                    {statusText.text}
                  </span>
                </div>
                <FaClock className="w-4 h-4 text-teal-400 shrink-0" />
              </div>

              {/* Endereço */}
              <div className="space-y-3.5 mb-6 text-xs">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-teal-500/10 text-teal-400 flex items-center justify-center shrink-0 border border-teal-500/25">
                    <FaLocationDot className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-bold text-white text-sm mb-0.5">{SITE_CONFIG.contact.address}</h5>
                    <p className="text-ice-400">{SITE_CONFIG.contact.addressComplement}</p>
                    <p className="text-teal-300 font-semibold mt-1">{SITE_CONFIG.contact.referencePoint}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-teal-500/10 text-teal-400 flex items-center justify-center shrink-0 border border-teal-500/25">
                    <FaPhone className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-bold text-white mb-0.5">WhatsApp Recepção</h5>
                    <p className="text-ice-300 font-medium">{SITE_CONFIG.contact.phoneFormatted}</p>
                  </div>
                </div>
              </div>

              {/* Horários com Destaque no Dia Atual */}
              <div className="bg-midnight-900 border border-teal-500/15 rounded-xl p-3.5 text-xs space-y-1.5">
                {scheduleList.map((item) => {
                  const isToday = item.isCurrentDay(currentDay);
                  return (
                    <div
                      key={item.label}
                      className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors ${
                        isToday
                          ? "bg-teal-500/20 text-white font-bold border border-teal-500/40"
                          : "text-ice-400"
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        {isToday && <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />}
                        {item.label}
                      </span>
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
              className="btn-solid-primary mt-6 w-full"
            >
              <FaArrowUpRightFromSquare className="w-3.5 h-3.5 mr-2" />
              <span>Abrir Rota no Google Maps</span>
            </a>
          </SpotlightCard>

          {/* Coluna 3: FAQ Compacto & Contato Direto */}
          <SpotlightCard className="lg:col-span-3 p-7 flex flex-col justify-between border-teal-500/20 bg-midnight-850">
            <div>
              <span className="text-[10px] uppercase tracking-widest font-semibold text-teal-400 block mb-1">
                Dúvidas Rápidas
              </span>
              <h4 className="font-display font-bold text-lg text-white mb-5">
                Informações Úteis
              </h4>

              <div className="space-y-2.5">
                {compactFaqs.map((faq, i) => {
                  const isOpen = openFaq === i;
                  return (
                    <div key={i} className="border border-teal-500/15 rounded-xl overflow-hidden bg-midnight-900">
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : i)}
                        className="w-full p-3 text-left text-xs font-semibold text-ice-200 hover:text-white flex items-center justify-between gap-2 transition-colors"
                      >
                        <span>{faq.q}</span>
                        <FaChevronDown className={`w-3 h-3 text-teal-400 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                      </button>
                      {isOpen && (
                        <div className="px-3 pb-3 pt-1 text-[11px] text-ice-300 leading-relaxed border-t border-white/5">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <button
              onClick={() => openWhatsApp("Olá! Gostaria de falar com a recepção da Zleib Barber.")}
              className="btn-wa-solid mt-6 w-full"
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
