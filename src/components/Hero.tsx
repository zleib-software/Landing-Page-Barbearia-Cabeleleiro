"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { MessageCircle, Star, Calendar, Clock, Scissors, User, ArrowRight, ShieldCheck } from "lucide-react";
import { SITE_CONFIG } from "@/data/siteConfig";
import { formatBookingMessage, openWhatsApp } from "@/utils/whatsapp";

export function Hero() {
  const [service, setService] = useState("");
  const [professional, setProfessional] = useState("qualquer");
  const [date, setDate] = useState("");
  const [period, setPeriod] = useState("");
  const [clientName, setClientName] = useState("");
  const [minDate, setMinDate] = useState("");

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setMinDate(today);
    setDate(today);
  }, []);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const serviceObj = SITE_CONFIG.services.find(s => s.id === service);
    const serviceName = serviceObj ? `${serviceObj.title} (${serviceObj.price})` : service || "Serviço a definir";

    let profName = "Qualquer profissional disponível";
    if (professional === "alex") profName = "Alexandre 'Alex' Souza (Master Barber)";
    if (professional === "camila") profName = "Camila Torres (Hair Artist)";

    const message = formatBookingMessage({
      service: serviceName,
      professional: profName,
      date: date || "Hoje / Primeiro disponível",
      period: period || "Qualquer período",
      clientName: clientName
    });

    openWhatsApp(message);
  };

  return (
    <section className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden" id="inicio">
      {/* Background Image com Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bg.jpg"
          alt="Ambiente sofisticado da barbearia e hair studio Lumen & Co."
          fill
          priority
          className="object-cover object-center opacity-10 dark:opacity-100 brightness-105 dark:brightness-[0.32] contrast-[1.05] dark:contrast-[1.15] scale-105 transition-all duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-light-100/98 via-light-100/92 to-light-100 dark:from-dark-900/80 dark:via-dark-900/50 dark:to-dark-900/95 transition-all duration-300" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Apresentação Principal */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-7 max-w-2xl"
          >
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white dark:bg-dark-800/80 border border-amber-600/30 dark:border-gold-500/30 backdrop-blur-md mb-6 shadow-sm">
              <div className="flex text-amber-500 dark:text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-500 dark:fill-amber-400" />
                ))}
              </div>
              <span className="text-xs font-extrabold text-gray-900 dark:text-gray-200">
                4.9 ★ no Google (350+ avaliações)
              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-gray-950 dark:text-white leading-[1.15] tracking-tight mb-6">
              Eleve seu visual com a{" "}
              <span className="gold-gradient-text">experiência premium</span> que você merece.
            </h1>

            <p className="text-base sm:text-lg text-gray-800 dark:text-gray-300 leading-relaxed mb-8 font-medium">
              Do clássico ao contemporâneo. Cortes milimétricos, barboterapia relaxante, visagismo e tratamentos capilares em um lounge exclusivo com open bar cortesia.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <a
                href="#agendamento-express"
                className="px-8 py-4 rounded-xl bg-gold-gradient text-dark-950 font-black text-base shadow-gold-glow hover:scale-105 active:scale-95 transition-all flex items-center gap-3 btn-shine"
              >
                <span>Agendamento Rápido</span>
                <ArrowRight className="w-5 h-5" />
              </a>

              <a
                href="#servicos"
                className="px-7 py-4 rounded-xl bg-white hover:bg-amber-50/50 dark:bg-white/5 text-gray-900 dark:text-gold-300 hover:text-amber-800 dark:hover:text-white border border-gray-300 dark:border-gold-500/30 backdrop-blur-md font-bold text-base transition-all shadow-sm"
              >
                <span>Ver Serviços & Preços</span>
              </a>
            </div>

            {/* Estatísticas */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-300 dark:border-white/10">
              <div>
                <h3 className="font-display text-2xl sm:text-3xl font-black text-amber-800 dark:text-gold-400">+15k</h3>
                <p className="text-xs sm:text-sm text-gray-800 dark:text-gray-400 font-bold">Clientes Atendidos</p>
              </div>
              <div>
                <h3 className="font-display text-2xl sm:text-3xl font-black text-amber-800 dark:text-gold-400">12 Anos</h3>
                <p className="text-xs sm:text-sm text-gray-800 dark:text-gray-400 font-bold">De Tradição & Arte</p>
              </div>
              <div>
                <h3 className="font-display text-2xl sm:text-3xl font-black text-amber-800 dark:text-gold-400">100%</h3>
                <p className="text-xs sm:text-sm text-gray-800 dark:text-gray-400 font-bold">Produtos Nobres</p>
              </div>
            </div>
          </motion.div>

          {/* Widget de Agendamento Rápido no Hero */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-5"
            id="agendamento-express"
          >
            <div className="glass-card-gold p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-elevation-light dark:shadow-elevation relative">
              <div className="text-center mb-6">
                <span className="inline-block text-xs uppercase tracking-widest font-extrabold text-amber-800 dark:text-gold-400 bg-amber-500/15 border border-amber-600/30 px-3 py-1 rounded-full mb-2">
                  Reserva Express
                </span>
                <h2 className="font-display text-2xl font-black text-gray-950 dark:text-white">Agendar Horário Online</h2>
                <p className="text-xs text-gray-700 dark:text-gray-400 mt-1 font-medium">Preencha e envie direto ao nosso WhatsApp</p>
              </div>

              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-bold text-gray-900 dark:text-gray-300 mb-1.5">
                    <Scissors className="w-3.5 h-3.5 text-amber-700 dark:text-gold-400" />
                    Qual serviço você deseja?
                  </label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    required
                    className="w-full bg-white dark:bg-dark-900/90 border border-gray-300 dark:border-white/15 focus:border-amber-600 rounded-xl px-4 py-3 text-sm text-gray-950 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all shadow-sm"
                  >
                    <option value="" disabled>Selecione o serviço...</option>
                    {SITE_CONFIG.services.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.title} ({s.price})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="flex items-center gap-1.5 text-xs font-bold text-gray-900 dark:text-gray-300 mb-1.5">
                    <User className="w-3.5 h-3.5 text-amber-700 dark:text-gold-400" />
                    Profissional de Preferência
                  </label>
                  <select
                    value={professional}
                    onChange={(e) => setProfessional(e.target.value)}
                    className="w-full bg-white dark:bg-dark-900/90 border border-gray-300 dark:border-white/15 focus:border-amber-600 rounded-xl px-4 py-3 text-sm text-gray-950 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all shadow-sm"
                  >
                    <option value="qualquer">Qualquer profissional disponível</option>
                    <option value="alex">Alexandre 'Alex' Souza (Master Barber)</option>
                    <option value="camila">Camila Torres (Hair Artist & Visagista)</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-bold text-gray-900 dark:text-gray-300 mb-1.5">
                      <Calendar className="w-3.5 h-3.5 text-amber-700 dark:text-gold-400" />
                      Data Preferida
                    </label>
                    <input
                      type="date"
                      min={minDate}
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      required
                      className="w-full bg-white dark:bg-dark-900/90 border border-gray-300 dark:border-white/15 focus:border-amber-600 rounded-xl px-4 py-3 text-sm text-gray-950 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all shadow-sm"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-bold text-gray-900 dark:text-gray-300 mb-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-700 dark:text-gold-400" />
                      Turno / Período
                    </label>
                    <select
                      value={period}
                      onChange={(e) => setPeriod(e.target.value)}
                      required
                      className="w-full bg-white dark:bg-dark-900/90 border border-gray-300 dark:border-white/15 focus:border-amber-600 rounded-xl px-4 py-3 text-sm text-gray-950 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all shadow-sm"
                    >
                      <option value="" disabled>Selecione o turno...</option>
                      <option value="Manhã (09h às 12h)">Manhã (09h às 12h)</option>
                      <option value="Tarde (13h às 17h)">Tarde (13h às 17h)</option>
                      <option value="Noite (18h às 21h)">Noite (18h às 21h)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-1.5 text-xs font-bold text-gray-900 dark:text-gray-300 mb-1.5">
                    <User className="w-3.5 h-3.5 text-amber-700 dark:text-gold-400" />
                    Seu Nome (Opcional)
                  </label>
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Como podemos te chamar?"
                    className="w-full bg-white dark:bg-dark-900/90 border border-gray-300 dark:border-white/15 focus:border-amber-600 rounded-xl px-4 py-3 text-sm text-gray-950 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all placeholder:text-gray-400 shadow-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-wa hover:bg-wa-dark text-white font-black text-base shadow-wa-glow flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-[0.98] btn-shine"
                >
                  <MessageCircle className="w-5 h-5 fill-white" />
                  <span>Confirmar no WhatsApp</span>
                </button>

                <div className="flex items-center justify-center gap-2 text-xs text-gray-700 dark:text-gray-500 pt-1 font-semibold">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Atendimento rápido e confirmação imediata</span>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
