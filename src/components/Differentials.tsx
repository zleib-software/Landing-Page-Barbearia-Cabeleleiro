"use client";

import { useRef } from "react";
import Image from "next/image";
import { FaMugHot, FaWandMagicSparkles, FaClock, FaCrown, FaAward, FaWifi, FaArrowRight } from "react-icons/fa6";
import { openWhatsApp } from "@/utils/whatsapp";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/utils/gsap";

const differentials = [
  {
    icon: FaMugHot,
    title: "Lounge & Café Premium",
    description: "Café espresso moído na hora, bebidas selecionadas, poltronas confortáveis e ambiente acolhedor.",
  },
  {
    icon: FaWandMagicSparkles,
    title: "Barboterapia & Toalha Quente",
    description: "Ritual relaxante com vapor de ozônio, toalhas aquecidas e óleos essenciais para a pele.",
  },
  {
    icon: FaClock,
    title: "Pontualidade Britânica",
    description: "Atendimento com hora marcada rigorosa para você não perder tempo esperando.",
  },
  {
    icon: FaCrown,
    title: "Visagismo Personalizado",
    description: "Alinhamento técnico do corte ao formato do seu rosto e estilo pessoal.",
  },
  {
    icon: FaAward,
    title: "Cosméticos Nobres",
    description: "Produtos importados de alta performance que tratam e protegem a saúde dos fios.",
  },
  {
    icon: FaWifi,
    title: "Espaço Executivo & Wi-Fi 5G",
    description: "Ambiente 100% climatizado com conexão ultrarrápida para trabalhar com conforto.",
  },
];

export function Differentials() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".diff-header", {
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

      gsap.from(".diff-card", {
        scrollTrigger: {
          trigger: ".diff-grid",
          start: "top 85%",
          once: true,
        },
        opacity: 0,
        y: 20,
        stagger: 0.08,
        duration: 0.5,
        ease: "power2.out",
      });

      gsap.from(".diff-banner", {
        scrollTrigger: {
          trigger: ".diff-banner",
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

  return (
    <section ref={containerRef} className="py-20 sm:py-24 relative z-10 bg-light-150/70 dark:bg-dark-950/60 transition-colors duration-300" id="experiencia">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="diff-header text-center max-w-3xl mx-auto mb-14">
          <span className="inline-block text-xs uppercase tracking-widest font-bold text-gold-700 dark:text-gold-400 bg-gold-500/10 border border-gold-500/30 px-4 py-1.5 rounded-full mb-4">
            Diferenciais de Alto Padrão
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-light-950 dark:text-white mb-4">
            Muito mais que um corte: uma{" "}
            <span className="gold-gradient-text">experiência VIP</span>
          </h2>
          <p className="text-light-600 dark:text-gray-400 text-base sm:text-lg">
            Criamos um espaço exclusivo para você relaxar e cuidar da sua imagem com comodidade e precisão.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="diff-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {differentials.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="diff-card glass-card p-7 sm:p-8 rounded-2xl border border-light-300 dark:border-white/10 hover:border-gold-500/60 hover:shadow-gold-glow-light dark:hover:shadow-gold-glow transition-all group"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-600 dark:text-gold-400 mb-5 group-hover:bg-gold-gradient group-hover:text-dark-950 group-hover:shadow-gold-glow transition-all">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <h3 className="font-display text-xl font-bold text-light-950 dark:text-white mb-2 group-hover:text-gold-700 dark:group-hover:text-gold-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-light-600 dark:text-gray-400 text-sm leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Banner de Destaque Lounge */}
        <div className="diff-banner mt-14 sm:mt-16 rounded-3xl overflow-hidden glass-card-gold border border-gold-500/40 dark:border-gold-500/30 grid grid-cols-1 lg:grid-cols-12 items-center">
          <div className="lg:col-span-6 relative h-64 sm:h-80 lg:h-full min-h-[300px]">
            <Image
              src="/images/experience-lounge.jpg"
              alt="Lounge executivo da Lumen & Co. com café e poltronas confortáveis"
              fill
              className="object-cover object-center"
              loading="lazy"
            />
          </div>
          <div className="lg:col-span-6 p-7 sm:p-10 lg:p-12">
            <span className="inline-block text-xs uppercase tracking-widest font-bold text-gold-700 dark:text-gold-400 bg-gold-500/10 border border-gold-500/30 px-3 py-1 rounded-full mb-3">
              Espaço Exclusivo
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-light-950 dark:text-white mb-3">
              Lounge & Café de Espera
            </h3>
            <p className="text-light-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed mb-6 font-normal">
              Chegue alguns minutos antes para relaxar, tomar um café espresso especial ou conectar seu notebook no nosso Wi-Fi de alta velocidade.
            </p>
            <button
              onClick={() => openWhatsApp("Olá! Gostaria de agendar um horário na Lumen & Co.")}
              className="px-7 py-3.5 rounded-xl bg-gold-gradient text-dark-950 font-bold text-sm shadow-gold-glow hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-2 btn-shine"
            >
              <span>Agendar Minha Visita</span>
              <FaArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
