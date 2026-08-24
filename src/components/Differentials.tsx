"use client";

import { useRef } from "react";
import Image from "next/image";
import { FaMugHot, FaWandMagicSparkles, FaClock, FaScissors, FaLeaf, FaWifi, FaArrowRight } from "react-icons/fa6";
import { openWhatsApp } from "@/utils/whatsapp";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/utils/gsap";
import { SpotlightCard } from "./SpotlightCard";

const differentials = [
  {
    icon: FaMugHot,
    title: "Espresso Microlote Sul de Minas",
    description: "Grãos 100% arábica moídos na hora com extração a 9 bar de pressão, servidos como cortesia antes ou após o atendimento.",
  },
  {
    icon: FaWandMagicSparkles,
    title: "Vapor de Ozônio & Toalha a 90°C",
    description: "Emoliência profunda dos poros com óleo essencial puro de eucalipto glóbulus, reduzindo atrito e prevenindo foliculite.",
  },
  {
    icon: FaClock,
    title: "Hora Marcada Rigorosa",
    description: "Bancadas organizadas com intervalos planejados. Seu horário começa no minuto agendado, respeitando sua agenda.",
  },
  {
    icon: FaScissors,
    title: "Lâminas & Tesouras Japonesas",
    description: "Equipamentos de corte de aço cobalto com fio laser para acabamento sem repuxar e sem marcar os fios.",
  },
  {
    icon: FaLeaf,
    title: "Cosméticos de Base Botânica",
    description: "Shampoos, pomadas e tônicos selecionados sem parabenos, sulfatos agressivos ou petrolatos pesados.",
  },
  {
    icon: FaWifi,
    title: "Espaço Climatizado com Wi-Fi 5G",
    description: "Ambiente acusticamente isolado na Av. Paulista, ideal para responder e-mails ou relaxar com tranquilidade.",
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
    <section ref={containerRef} className="py-24 sm:py-32 relative z-10 bg-obsidian-950 border-t border-white/5" id="rituais">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="diff-header text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block text-xs uppercase tracking-widest font-bold text-bronze-400 mb-3">
            Critério Técnico & Hospitalidade
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Rituais que sustentam o nosso <span className="bronze-text">padrão de atendimento</span>
          </h2>
          <p className="text-sand-400 text-base sm:text-lg mt-3 font-light">
            Da escolha do grão de café à temperatura da toalha: cada detalhe foi desenhado para proporcionar conforto e precisão.
          </p>
        </div>

        {/* Cards Grid com Spotlight */}
        <div className="diff-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {differentials.map((item, index) => {
            const Icon = item.icon;
            return (
              <SpotlightCard
                key={index}
                className="diff-card p-7 sm:p-8 flex flex-col justify-between group hover:border-bronze-500/40 transition-all duration-300"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-bronze-500/10 border border-bronze-500/20 flex items-center justify-center text-bronze-400 mb-6 group-hover:bg-bronze-gradient group-hover:text-obsidian-950 transition-all">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-display text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-bronze-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sand-400 text-sm leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>
              </SpotlightCard>
            );
          })}
        </div>

        {/* Banner do Lounge */}
        <div className="diff-banner mt-16 rounded-3xl overflow-hidden bg-obsidian-900 border border-bronze-500/20 grid grid-cols-1 lg:grid-cols-12 items-center shadow-2xl">
          <div className="lg:col-span-6 relative h-64 sm:h-80 lg:h-full min-h-[320px]">
            <Image
              src="/images/experience-lounge.jpg"
              alt="Lounge de espera da Zleib Barber na Avenida Paulista"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/20 to-transparent flex flex-col justify-end p-6">
              <span className="text-bronze-400 text-xs font-bold uppercase tracking-wider mb-1">Espaço & Recepção</span>
              <h3 className="font-display text-xl font-bold text-white mb-2">Hospitalidade Sem Pressa</h3>
              <p className="text-sand-400 text-xs sm:text-sm max-w-md font-light mb-4">
                Enquanto aguarda seu horário, aprecie cafés especiais moídos na hora, seleção de cervejas artesanais ou destilados selecionados.
              </p>
              <button
                onClick={() => openWhatsApp("Olá! Gostaria de consultar horários disponíveis na Zleib Barber.")}
                className="px-7 py-3.5 rounded-xl bg-bronze-gradient text-obsidian-950 font-bold text-xs uppercase tracking-wider shadow-luxury-glow hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-2 btn-shine"
              >
                <span>Consultar Agenda da Recepção</span>
                <FaArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
