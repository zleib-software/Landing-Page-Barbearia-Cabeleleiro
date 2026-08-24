"use client";

import { useEffect, useState, useRef } from "react";
import { MapPin, Phone, ExternalLink, Calendar, Clock } from "lucide-react";
import { SITE_CONFIG } from "@/data/siteConfig";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/utils/gsap";

const scheduleList = [
  { label: "Seg", full: "Segunda-feira", dayIndex: 1, hours: "09:00 às 20:00", openHour: 9, closeHour: 20, isOpenDay: true },
  { label: "Ter", full: "Terça-feira", dayIndex: 2, hours: "09:00 às 20:00", openHour: 9, closeHour: 20, isOpenDay: true },
  { label: "Qua", full: "Quarta-feira", dayIndex: 3, hours: "09:00 às 20:00", openHour: 9, closeHour: 20, isOpenDay: true },
  { label: "Qui", full: "Quinta-feira", dayIndex: 4, hours: "09:00 às 21:00", openHour: 9, closeHour: 21, isOpenDay: true },
  { label: "Sex", full: "Sexta-feira", dayIndex: 5, hours: "08:30 às 21:30", openHour: 8.5, closeHour: 21.5, isOpenDay: true },
  { label: "Sáb", full: "Sábado", dayIndex: 6, hours: "08:30 às 20:00", openHour: 8.5, closeHour: 20, isOpenDay: true },
  { label: "Dom", full: "Domingo", dayIndex: 0, hours: "Fechado", openHour: 0, closeHour: 0, isOpenDay: false },
];

export function LocationSchedule() {
  const containerRef = useRef<HTMLElement>(null);
  const [currentDayIndex, setCurrentDayIndex] = useState<number>(1);
  const [statusText, setStatusText] = useState<{ isOpen: boolean; text: string }>({
    isOpen: true,
    text: "Verificando horário...",
  });

  useGSAP(
    () => {
      gsap.from(".location-header", {
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

      gsap.from(".location-map", {
        scrollTrigger: {
          trigger: ".location-grid",
          start: "top 85%",
          once: true,
        },
        opacity: 0,
        x: -20,
        duration: 0.6,
        ease: "power2.out",
      });

      gsap.from(".location-info", {
        scrollTrigger: {
          trigger: ".location-grid",
          start: "top 85%",
          once: true,
        },
        opacity: 0,
        x: 20,
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
    setCurrentDayIndex(day);

    const todayConfig = scheduleList.find(s => s.dayIndex === day);

    if (todayConfig && todayConfig.isOpenDay) {
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
          text: `Fechado agora · Abre hoje às ${openFormatted}`,
        });
      } else {
        setStatusText({
          isOpen: false,
          text: "Fechado agora · Abre amanhã às 09:00",
        });
      }
    } else {
      setStatusText({
        isOpen: false,
        text: "Fechado hoje · Abre segunda às 09:00",
      });
    }
  }, []);

  return (
    <section ref={containerRef} className="py-20 sm:py-24 relative z-10" id="localizacao">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="location-header text-center max-w-3xl mx-auto mb-14">
          <span className="inline-block text-xs uppercase tracking-widest font-bold text-gold-700 dark:text-gold-400 bg-gold-500/10 border border-gold-500/30 px-4 py-1.5 rounded-full mb-4">
            Venha nos Visitar
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-light-950 dark:text-white mb-4">
            Localização & <span className="gold-gradient-text">Horários</span>
          </h2>
          <p className="text-light-600 dark:text-gray-400 text-base sm:text-lg">
            Fácil acesso na Av. Paulista com valet e estacionamento conveniado.
          </p>
        </div>

        <div className="location-grid grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Iframe Interativo do Google Maps */}
          <div className="location-map lg:col-span-7 rounded-3xl overflow-hidden border border-gold-500/40 dark:border-gold-500/30 shadow-elevation-light dark:shadow-elevation min-h-[380px] sm:min-h-[420px] relative">
            <iframe
              src={SITE_CONFIG.maps.embedUrl}
              className="w-full h-full min-h-[380px] sm:min-h-[420px] border-0 grayscale-[20%] dark:grayscale-[40%] contrast-[1.05] dark:contrast-[1.1] hover:grayscale-0 transition-all duration-500"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização da Barbearia no Google Maps"
            />
          </div>

          {/* Card de Informações e Horários */}
          <div className="location-info lg:col-span-5 glass-card p-6 sm:p-8 rounded-3xl border border-light-300 dark:border-white/10 shadow-elevation-light dark:shadow-none flex flex-col justify-between">
            <div>
              {/* Status Aberto / Fechado em Tempo Real */}
              <div className="mb-6 p-3.5 rounded-2xl bg-light-200/90 dark:bg-dark-900 border border-light-300 dark:border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className={`w-3 h-3 rounded-full ${statusText.isOpen ? "bg-emerald-500 animate-pulse" : "bg-red-500"}`} />
                  <span className="text-xs sm:text-sm font-extrabold text-light-950 dark:text-white">
                    {statusText.text}
                  </span>
                </div>
                <Clock className="w-4 h-4 text-gold-600 dark:text-gold-400 shrink-0" />
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-600 dark:text-gold-400 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-light-950 dark:text-white text-sm mb-0.5">Endereço</h3>
                    <p className="text-light-700 dark:text-gray-300 text-xs sm:text-sm font-medium">{SITE_CONFIG.contact.address}</p>
                    <p className="text-xs text-gold-600 dark:text-gold-400 font-semibold">
                      {SITE_CONFIG.contact.cityState} • Valet cortesia
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-600 dark:text-gold-400 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-light-950 dark:text-white text-sm mb-0.5">Contato</h3>
                    <p className="text-light-700 dark:text-gray-300 text-xs sm:text-sm font-medium">WhatsApp: {SITE_CONFIG.contact.phoneFormatted}</p>
                  </div>
                </div>
              </div>

              {/* Tabela de Horários Escaneável */}
              <div className="bg-light-150/90 dark:bg-dark-950/70 border border-light-300 dark:border-white/10 rounded-2xl p-4 mb-6">
                <div className="flex items-center gap-2 text-light-950 dark:text-white font-bold text-xs uppercase tracking-wider mb-3">
                  <Calendar className="w-3.5 h-3.5 text-gold-600 dark:text-gold-400" />
                  <span>Horários de Funcionamento</span>
                </div>

                <div className="grid grid-cols-1 gap-1.5">
                  {scheduleList.map((item) => {
                    const isToday = item.dayIndex === currentDayIndex;
                    return (
                      <div
                        key={item.label}
                        className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs ${
                          isToday
                            ? "bg-gold-500/20 text-light-950 dark:text-white font-bold border border-gold-500/40"
                            : "text-light-600 dark:text-gray-400"
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span className="font-bold">{item.label}</span>
                          {isToday && (
                            <span className="px-1.5 py-0.2 rounded-full bg-gold-gradient text-dark-950 text-[9px] font-extrabold uppercase">
                              Hoje
                            </span>
                          )}
                        </span>
                        <span className={!item.isOpenDay ? "text-red-500 dark:text-red-400 font-semibold" : "font-medium"}>
                          {item.hours}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <a
              href={SITE_CONFIG.maps.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 rounded-xl bg-gold-gradient text-dark-950 font-bold text-sm shadow-gold-glow flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all btn-shine"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Como Chegar no Maps</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
