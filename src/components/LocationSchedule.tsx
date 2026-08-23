"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, ExternalLink, Calendar, MessageCircle } from "lucide-react";
import { SITE_CONFIG } from "@/data/siteConfig";

export function LocationSchedule() {
  const [currentDayIndex, setCurrentDayIndex] = useState(1);

  useEffect(() => {
    setCurrentDayIndex(new Date().getDay());
  }, []);

  return (
    <section className="py-24 relative z-10" id="localizacao">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-xs uppercase tracking-widest font-bold text-gold-700 dark:text-gold-400 bg-gold-500/10 border border-gold-500/30 px-4 py-1.5 rounded-full mb-4">
            Venha nos Visitar
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-light-950 dark:text-white mb-4">
            Localização & <span className="gold-gradient-text">Horários de Atendimento</span>
          </h2>
          <p className="text-light-600 dark:text-gray-400 text-base sm:text-lg">
            Fácil acesso no coração da cidade com estacionamento conveniado e manobrista cortesia.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Iframe Interativo do Google Maps */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 rounded-3xl overflow-hidden border border-gold-500/40 dark:border-gold-500/30 shadow-elevation-light dark:shadow-elevation min-h-[420px] relative"
          >
            <iframe
              src={SITE_CONFIG.maps.embedUrl}
              className="w-full h-full min-h-[420px] border-0 grayscale-[20%] dark:grayscale-[40%] contrast-[1.05] dark:contrast-[1.1] hover:grayscale-0 transition-all duration-500"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização no Google Maps"
            />
          </motion.div>

          {/* Card de Informações e Horários */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 glass-card p-8 sm:p-10 rounded-3xl border border-light-300 dark:border-white/10 shadow-elevation-light dark:shadow-none flex flex-col justify-between"
          >
            <div>
              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-600 dark:text-gold-400 shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-light-950 dark:text-white text-base mb-1">Endereço Principal</h3>
                    <p className="text-light-700 dark:text-gray-300 text-sm font-medium">{SITE_CONFIG.contact.address}</p>
                    <p className="text-xs text-gold-600 dark:text-gold-400 mt-1 font-semibold">
                      {SITE_CONFIG.contact.cityState} • Valet com manobrista cortesia
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-600 dark:text-gold-400 shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-light-950 dark:text-white text-base mb-1">Contato Telefônico</h3>
                    <p className="text-light-700 dark:text-gray-300 text-sm font-medium">WhatsApp: {SITE_CONFIG.contact.phoneFormatted}</p>
                    <p className="text-xs text-light-500 dark:text-gray-400">Fixo: {SITE_CONFIG.contact.phoneLandline}</p>
                  </div>
                </div>
              </div>

              {/* Tabela de Horários com "Hoje" */}
              <div className="bg-light-150/90 dark:bg-dark-950/70 border border-light-300 dark:border-white/10 rounded-2xl p-5 mb-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-light-950 dark:text-white font-bold text-sm">
                    <Calendar className="w-4 h-4 text-gold-600 dark:text-gold-400" />
                    <span>Horários da Semana</span>
                  </div>
                </div>

                <div className="space-y-2">
                  {SITE_CONFIG.schedule.map((item) => {
                    const isToday = item.dayIndex === currentDayIndex;
                    return (
                      <div
                        key={item.day}
                        className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs ${
                          isToday
                            ? "bg-gold-500/15 text-light-950 dark:text-white font-bold border border-gold-500/30"
                            : "text-light-600 dark:text-gray-400"
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          {item.day}
                          {isToday && (
                            <span className="px-1.5 py-0.5 rounded-full bg-gold-gradient text-dark-950 text-[10px] font-extrabold uppercase">
                              Hoje
                            </span>
                          )}
                        </span>
                        <span className={!item.isOpen ? "text-red-500 dark:text-red-400" : ""}>
                          {item.isOpen ? `${item.open} às ${item.close}` : (item.note || "Fechado")}
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
              className="w-full py-4 rounded-xl bg-gold-gradient text-dark-950 font-bold text-sm shadow-gold-glow flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all btn-shine"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Abrir Rota no Google Maps</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
