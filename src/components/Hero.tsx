"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { MessageCircle, Star, Scissors, User, ArrowRight, ShieldCheck, Clock } from "lucide-react";
import { SITE_CONFIG } from "@/data/siteConfig";
import { formatBookingMessage, openWhatsApp } from "@/utils/whatsapp";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/utils/gsap";

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const [service, setService] = useState("corte-signature");
  const [professional, setProfessional] = useState("qualquer");
  const [period, setPeriod] = useState("Proximo disponivel");

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      tl.from(".hero-badge", { opacity: 0, y: 12, duration: 0.5 })
        .from(".hero-title", { opacity: 0, y: 16, duration: 0.6 }, "-=0.3")
        .from(".hero-desc", { opacity: 0, y: 12, duration: 0.5 }, "-=0.3")
        .from(".hero-ctas", { opacity: 0, y: 12, duration: 0.5 }, "-=0.3")
        .from(".hero-proof", { opacity: 0, duration: 0.5 }, "-=0.3")
        .from(".hero-stats > div", { opacity: 0, y: 10, stagger: 0.08, duration: 0.5 }, "-=0.3")
        .from(".hero-card", { opacity: 0, y: 16, duration: 0.7 }, "-=0.5");
    },
    { scope: containerRef }
  );

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const serviceObj = SITE_CONFIG.services.find(s => s.id === service);
    const serviceName = serviceObj ? `${serviceObj.title} (${serviceObj.price})` : "Corte Signature & Fade";

    let profName = "Primeiro profissional disponível";
    if (professional === "alex") profName = "Alexandre 'Alex' Souza (Master Barber)";
    if (professional === "camila") profName = "Camila Torres (Hair Artist)";

    const message = formatBookingMessage({
      service: serviceName,
      professional: profName,
      date: "Hoje / Primeiro disponível",
      period: period === "Proximo disponivel" ? "Mais rápido possível" : period,
      clientName: ""
    });

    openWhatsApp(message);
  };

  const handleDirectWhatsApp = () => {
    openWhatsApp("Olá! Vim pelo site da Lumen & Co. e gostaria de agendar um horário para hoje.");
  };

  return (
    <section ref={containerRef} className="relative min-h-[90vh] flex items-center pt-28 pb-16 overflow-hidden" id="inicio">
      {/* Background Image com Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bg.jpg"
          alt="Ambiente sofisticado da barbearia Lumen & Co. na Av. Paulista"
          fill
          priority
          className="object-cover object-center opacity-10 dark:opacity-100 brightness-105 dark:brightness-[0.32] contrast-[1.05] dark:contrast-[1.15] scale-105 transition-all duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-light-100/98 via-light-100/92 to-light-100 dark:from-dark-900/80 dark:via-dark-900/50 dark:to-dark-900/95 transition-all duration-300" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Apresentação Principal de Alta Conversão */}
          <div className="lg:col-span-7 max-w-2xl">
            <div className="hero-badge inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white dark:bg-dark-800/80 border border-amber-600/30 dark:border-gold-500/30 backdrop-blur-md mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-extrabold text-gray-900 dark:text-gray-200">
                Atendimento com hora marcada na Av. Paulista
              </span>
            </div>

            <h1 className="hero-title font-display text-4xl sm:text-5xl lg:text-6xl font-black text-gray-950 dark:text-white leading-[1.15] tracking-tight mb-6">
              Barbearia premium na <span className="gold-gradient-text">Bela Vista</span>.
            </h1>

            <p className="hero-desc text-lg sm:text-xl text-gray-800 dark:text-gray-200 leading-relaxed mb-6 font-medium">
              Cortes de alta precisão, barboterapia relaxante e visagismo com atendimento exclusivo no coração da Av. Paulista.
            </p>

            {/* CTAs Diretos */}
            <div className="hero-ctas flex flex-col sm:flex-row gap-4 mb-4">
              <button
                onClick={handleDirectWhatsApp}
                className="px-8 py-4 rounded-xl bg-wa hover:bg-wa-dark text-white font-black text-base shadow-wa-glow hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 btn-shine"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                <span>Agendar pelo WhatsApp</span>
              </button>

              <a
                href="#servicos"
                className="px-7 py-4 rounded-xl bg-white hover:bg-amber-50/50 dark:bg-white/5 text-gray-900 dark:text-gold-300 hover:text-amber-800 dark:hover:text-white border border-gray-300 dark:border-gold-500/30 backdrop-blur-md font-bold text-base transition-all shadow-sm flex items-center justify-center gap-2"
              >
                <span>Ver Serviços & Preços</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Prova Social Imediata abaixo do CTA */}
            <div className="hero-proof flex items-center gap-3 pt-2 mb-10">
              <div className="flex text-amber-500 dark:text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-500 dark:fill-amber-400" />
                ))}
              </div>
              <span className="text-xs sm:text-sm font-extrabold text-gray-900 dark:text-gray-300">
                ★ 4.9 no Google · +350 avaliações de clientes satisfeitos
              </span>
            </div>

            {/* Estatísticas Rápidas */}
            <div className="hero-stats grid grid-cols-3 gap-6 pt-6 border-t border-gray-300 dark:border-white/10">
              <div>
                <h3 className="font-display text-2xl sm:text-3xl font-black text-amber-800 dark:text-gold-400">100%</h3>
                <p className="text-xs sm:text-sm text-gray-800 dark:text-gray-400 font-bold">Pontualidade</p>
              </div>
              <div>
                <h3 className="font-display text-2xl sm:text-3xl font-black text-amber-800 dark:text-gold-400">Lounge</h3>
                <p className="text-xs sm:text-sm text-gray-800 dark:text-gray-400 font-bold">Café & Wi-Fi</p>
              </div>
              <div>
                <h3 className="font-display text-2xl sm:text-3xl font-black text-amber-800 dark:text-gold-400">Valet</h3>
                <p className="text-xs sm:text-sm text-gray-800 dark:text-gray-400 font-bold">Manobrista Cortesia</p>
              </div>
            </div>
          </div>

          {/* Widget de Agendamento Rápido no Hero */}
          <div
            className="hero-card lg:col-span-5"
            id="agendamento-express"
          >
            <div className="glass-card-gold p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-elevation-light dark:shadow-elevation relative">
              <div className="text-center mb-6">
                <span className="inline-block text-xs uppercase tracking-widest font-extrabold text-amber-800 dark:text-gold-400 bg-amber-500/15 border border-amber-600/30 px-3 py-1 rounded-full mb-2">
                  Agendamento em 2 Cliques
                </span>
                <h2 className="font-display text-2xl font-black text-gray-950 dark:text-white">Escolha e Agende</h2>
                <p className="text-xs text-gray-700 dark:text-gray-400 mt-1 font-medium">Sem cadastro longo: direto no WhatsApp</p>
              </div>

              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-bold text-gray-900 dark:text-gray-300 mb-1.5">
                    <Scissors className="w-3.5 h-3.5 text-amber-700 dark:text-gold-400" />
                    1. Escolha o serviço
                  </label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    required
                    className="w-full bg-white dark:bg-dark-900/90 border border-gray-300 dark:border-white/15 focus:border-amber-600 rounded-xl px-4 py-3 text-sm text-gray-950 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all shadow-sm"
                  >
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
                    2. Escolha o profissional
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

                <div>
                  <label className="flex items-center gap-1.5 text-xs font-bold text-gray-900 dark:text-gray-300 mb-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-700 dark:text-gold-400" />
                    3. Turno preferido
                  </label>
                  <select
                    value={period}
                    onChange={(e) => setPeriod(e.target.value)}
                    className="w-full bg-white dark:bg-dark-900/90 border border-gray-300 dark:border-white/15 focus:border-amber-600 rounded-xl px-4 py-3 text-sm text-gray-950 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all shadow-sm"
                  >
                    <option value="Proximo disponivel">Próximo horário disponível hoje</option>
                    <option value="Manhã (09h às 12h)">Manhã (09h às 12h)</option>
                    <option value="Tarde (13h às 17h)">Tarde (13h às 17h)</option>
                    <option value="Noite (18h às 21h)">Noite (18h às 21h)</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-wa hover:bg-wa-dark text-white font-black text-base shadow-wa-glow flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-[0.98] btn-shine mt-2"
                >
                  <MessageCircle className="w-5 h-5 fill-white" />
                  <span>Enviar Pedido no WhatsApp</span>
                </button>

                <div className="flex items-center justify-center gap-2 text-xs text-gray-700 dark:text-gray-400 pt-1 font-semibold">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Atendimento rápido e confirmação imediata</span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
