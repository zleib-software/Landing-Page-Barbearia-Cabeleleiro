"use client";

import { useRef } from "react";
import Image from "next/image";
import { FaMugHot, FaScissors, FaClock, FaWandMagicSparkles, FaLeaf, FaCar, FaArrowRight } from "react-icons/fa6";
import { openWhatsApp } from "@/utils/whatsapp";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/utils/gsap";
import { SpotlightCard } from "./SpotlightCard";

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

      gsap.from(".diff-feature", {
        scrollTrigger: {
          trigger: ".diff-grid",
          start: "top 85%",
          once: true,
        },
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.5,
        ease: "power2.out",
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="py-24 sm:py-32 relative z-10 bg-midnight-900 border-t border-teal-500/10" id="rituais">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="diff-header text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-xs uppercase tracking-widest font-semibold text-teal-400 mb-2.5">
            Critério Técnico & Hospitalidade
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Rituais que sustentam o nosso <span className="text-teal-400 font-light italic">padrão de atendimento</span>
          </h2>
          <p className="text-ice-400 text-sm sm:text-base mt-3 font-normal">
            Da escolha do grão de café moído na hora à lâmina japonesa descartável: cada detalhe foi desenhado para proporcionar conforto e precisão milimétrica.
          </p>
        </div>

        {/* Grid Assimétrico: 2 Hero Features Maiores + 3 Cards Compactos */}
        <div className="diff-grid space-y-8">
          
          {/* Linha 1: 2 Hero Features em Destaque com Imagem e Prova Concreta */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Hero Feature 1: Tesouras Japonesas & Cosméticos Keune (7 colunas) */}
            <div className="lg:col-span-7 rounded-2xl overflow-hidden bg-midnight-850 border border-teal-500/20 shadow-2xl diff-feature flex flex-col justify-between group">
              <div className="relative h-64 sm:h-72 w-full overflow-hidden">
                <Image
                  src="/images/service-haircut.jpg"
                  alt="Tesouras japonesas de precisão e finalização Keune 1922"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight-850 via-midnight-850/40 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-midnight-950/85 backdrop-blur-md text-[10px] uppercase font-bold tracking-wider text-teal-300 border border-teal-500/30">
                    Aço Cobalto & Keune 1922
                  </span>
                </div>
              </div>

              <div className="p-7 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-teal-500/10 border border-teal-500/25 flex items-center justify-center text-teal-400">
                      <FaScissors className="w-4 h-4" />
                    </div>
                    <h3 className="font-display text-2xl font-bold text-white">
                      Alfaiataria na Tesoura & Produtos Nobres
                    </h3>
                  </div>
                  <p className="text-ice-300 text-sm sm:text-base leading-relaxed font-normal">
                    Equipamentos japoneses de aço cobalto com fio laser que cortam sem repuxar. Utilizamos exclusivamente a linha masculina premium <strong>Keune 1922</strong> e navalhetes com lâminas <strong>Feather Japan</strong> 100% descartáveis.
                  </p>
                </div>
              </div>
            </div>

            {/* Hero Feature 2: Barboterapia a 90°C & Óleo Puro Eucalipto (5 colunas) */}
            <div className="lg:col-span-5 rounded-2xl overflow-hidden bg-midnight-850 border border-teal-500/20 shadow-2xl diff-feature flex flex-col justify-between group">
              <div className="relative h-64 sm:h-72 w-full overflow-hidden">
                <Image
                  src="/images/service-beard.jpg"
                  alt="Barboterapia com vapor de ozônio e toalha aquecida"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight-850 via-midnight-850/40 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-midnight-950/85 backdrop-blur-md text-[10px] uppercase font-bold tracking-wider text-teal-300 border border-teal-500/30">
                    Vapor & Aromaterapia
                  </span>
                </div>
              </div>

              <div className="p-7 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-teal-500/10 border border-teal-500/25 flex items-center justify-center text-teal-400">
                      <FaWandMagicSparkles className="w-4 h-4" />
                    </div>
                    <h3 className="font-display text-2xl font-bold text-white">
                      Barboterapia com Toalha a 90°C
                    </h3>
                  </div>
                  <p className="text-ice-300 text-sm leading-relaxed font-normal">
                    Emoliência profunda dos folículos com vapor de ozônio medicinal e toalha vaporizada com óleo essencial puro de eucalipto glóbulus, prevenindo foliculite.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Linha 2: 3 Cards Compactos com Spotlight */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1: Pontualidade */}
            <SpotlightCard className="diff-feature p-7 flex flex-col justify-between bg-midnight-850 hover:border-teal-500/40 transition-all">
              <div>
                <div className="w-10 h-10 rounded-lg bg-teal-500/10 border border-teal-500/25 flex items-center justify-center text-teal-400 mb-5">
                  <FaClock className="w-4 h-4" />
                </div>
                <h4 className="font-display text-xl font-bold text-white mb-2">
                  Hora Marcada Rigorosa
                </h4>
                <p className="text-ice-400 text-xs sm:text-sm leading-relaxed font-normal">
                  Bancadas com intervalos planejados de 15 minutos entre atendimentos. Seu procedimento se inicia pontualmente no minuto agendado.
                </p>
              </div>
            </SpotlightCard>

            {/* Card 2: Lounge & Espresso */}
            <SpotlightCard className="diff-feature p-7 flex flex-col justify-between bg-midnight-850 hover:border-teal-500/40 transition-all">
              <div>
                <div className="w-10 h-10 rounded-lg bg-teal-500/10 border border-teal-500/25 flex items-center justify-center text-teal-400 mb-5">
                  <FaMugHot className="w-4 h-4" />
                </div>
                <h4 className="font-display text-xl font-bold text-white mb-2">
                  Espresso Sul de Minas Cortesia
                </h4>
                <p className="text-ice-400 text-xs sm:text-sm leading-relaxed font-normal">
                  Grãos 100% arábica moídos na hora em máquina italiana, com lounge silencioso e isolamento acústico em plena Av. Paulista.
                </p>
              </div>
            </SpotlightCard>

            {/* Card 3: Valet no Prédio */}
            <SpotlightCard className="diff-feature p-7 flex flex-col justify-between bg-midnight-850 hover:border-teal-500/40 transition-all">
              <div>
                <div className="w-10 h-10 rounded-lg bg-teal-500/10 border border-teal-500/25 flex items-center justify-center text-teal-400 mb-5">
                  <FaCar className="w-4 h-4" />
                </div>
                <h4 className="font-display text-xl font-bold text-white mb-2">
                  Valet Manobrista no Edifício
                </h4>
                <p className="text-ice-400 text-xs sm:text-sm leading-relaxed font-normal">
                  Estacionamento com manobrista cortesia no subsolo do Edifício Barão de Iguape durante todo o período do seu atendimento.
                </p>
              </div>
            </SpotlightCard>

          </div>

          {/* Banner Consolidado do Lounge */}
          <div className="rounded-2xl overflow-hidden bg-midnight-850 border border-teal-500/20 grid grid-cols-1 lg:grid-cols-12 items-center shadow-2xl mt-8">
            <div className="lg:col-span-6 relative h-64 sm:h-80 min-h-[280px]">
              <Image
                src="/images/experience-lounge.jpg"
                alt="Lounge de espera da Zleib Barber na Avenida Paulista"
                fill
                className="object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-midnight-850/40 to-midnight-850 hidden lg:block" />
            </div>

            <div className="lg:col-span-6 p-7 sm:p-10 flex flex-col justify-center">
              <span className="text-teal-400 text-xs font-semibold uppercase tracking-widest mb-1.5">
                Hospitalidade Sem Pressa
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-3">
                Um refúgio de tranquilidade no coração de São Paulo
              </h3>
              <p className="text-ice-300 text-sm leading-relaxed font-normal mb-6">
                Enquanto aguarda seu horário, desfrute de cafés especiais, seleção de bebidas e Wi-Fi 5G em um ambiente climatizado e acusticamente planejado.
              </p>
              <div>
                <button
                  onClick={() => openWhatsApp("Olá! Gostaria de consultar horários disponíveis na Zleib Barber.")}
                  className="btn-solid-primary"
                >
                  <span>Consultar Agenda da Recepção</span>
                  <FaArrowRight className="w-3.5 h-3.5 ml-2" />
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
