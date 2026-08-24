"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import * as Tabs from "@radix-ui/react-tabs";
import { FaClock, FaCheck, FaArrowRight } from "react-icons/fa6";
import { SITE_CONFIG } from "@/data/siteConfig";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/utils/gsap";
import { SpotlightCard } from "./SpotlightCard";
import { BookingModal } from "./BookingModal";

export function Services() {
  const containerRef = useRef<HTMLElement>(null);
  const [selectedService, setSelectedService] = useState<string>("corte-signature");
  const [modalOpen, setModalOpen] = useState(false);

  useGSAP(
    () => {
      gsap.from(".services-header", {
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

      gsap.from(".services-tabs", {
        scrollTrigger: {
          trigger: ".services-tabs",
          start: "top 85%",
          once: true,
        },
        opacity: 0,
        y: 15,
        duration: 0.5,
        ease: "power2.out",
      });
    },
    { scope: containerRef }
  );

  const handleBooking = (serviceId: string) => {
    setSelectedService(serviceId);
    setModalOpen(true);
  };

  const renderServiceCards = (items: typeof SITE_CONFIG.services) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6 items-stretch">
      {items.map((service) => (
        <SpotlightCard
          key={service.id}
          className="group hover:border-teal-500/40 transition-all duration-300 bg-midnight-850"
        >
          {/* Imagem Única de cada Serviço com Altura Uniforme */}
          <div className="relative h-56 w-full overflow-hidden shrink-0">
            <Image
              src={service.image}
              alt={service.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-midnight-950 via-midnight-950/15 to-transparent" />
            
            {service.badge && (
              <span className="absolute top-3.5 right-3.5 bg-midnight-950/90 backdrop-blur-md text-teal-300 text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-md border border-teal-500/30">
                {service.badge}
              </span>
            )}
          </div>

          {/* Conteúdo com Alinhamento Sincronizado */}
          <div className="p-6 flex flex-col flex-1 justify-between">
            <div className="flex flex-col flex-1">
              
              {/* Título e Preço */}
              <div className="flex justify-between items-start gap-3 mb-2.5 min-h-[3rem]">
                <h3 className="font-display text-xl font-bold text-white group-hover:text-teal-300 transition-colors leading-snug">
                  {service.title}
                </h3>
                <span className="font-bold text-base text-teal-400 whitespace-nowrap shrink-0">
                  {service.price}
                </span>
              </div>

              {/* Duração */}
              <div className="flex items-center gap-1.5 text-xs text-ice-400 mb-3 font-semibold shrink-0">
                <FaClock className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <span>{service.duration} de atendimento</span>
              </div>

              {/* Descrição Factual */}
              <p className="text-ice-300 text-xs sm:text-sm leading-relaxed mb-4 font-normal flex-1">
                {service.description}
              </p>

              {/* Destaques Técnicos */}
              {service.highlights && service.highlights.length > 0 && (
                <div className="space-y-1.5 pt-3.5 mb-6 border-t border-white/5 shrink-0">
                  {service.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-ice-400 font-medium">
                      <FaCheck className="w-3 h-3 text-teal-400 shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Botão no Rodapé do Card */}
            <button
              onClick={() => handleBooking(service.id)}
              className="btn-outline-clean w-full !py-2.5 !text-xs mt-auto shrink-0 hover:!bg-teal-500 hover:!border-teal-500 hover:!text-midnight-950"
            >
              <span>Solicitar Horário</span>
              <FaArrowRight className="w-3 h-3 ml-2" />
            </button>
          </div>
        </SpotlightCard>
      ))}
    </div>
  );

  return (
    <>
      <section ref={containerRef} className="py-24 sm:py-32 relative z-10 bg-midnight-950 border-t border-teal-500/10" id="servicos">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="services-header text-center max-w-2xl mx-auto mb-14">
            <span className="inline-block text-xs uppercase tracking-widest font-semibold text-teal-400 mb-2.5">
              Menu de Atendimentos
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              Procedimentos & <span className="text-teal-400 font-light italic">Valores</span>
            </h2>
            <p className="text-ice-400 text-sm sm:text-base mt-3 font-normal">
              Diagnóstico de proporção cranial, produtos de alta gama e lavagem inclusos em todos os atendimentos.
            </p>
          </div>

          {/* Radix UI Tabs com Design Minimalista Sem Emojis */}
          <Tabs.Root defaultValue="all" className="services-tabs">
            <Tabs.List className="flex justify-center gap-2.5 flex-wrap mb-10">
              <Tabs.Trigger
                value="all"
                className="px-5 py-2.5 rounded-lg text-xs uppercase tracking-wider font-semibold text-ice-300 data-[state=active]:bg-teal-500 data-[state=active]:text-midnight-950 border border-teal-500/20 data-[state=active]:border-teal-500 transition-all hover:text-white"
              >
                Todos os Serviços
              </Tabs.Trigger>
              <Tabs.Trigger
                value="barber"
                className="px-5 py-2.5 rounded-lg text-xs uppercase tracking-wider font-semibold text-ice-300 data-[state=active]:bg-teal-500 data-[state=active]:text-midnight-950 border border-teal-500/20 data-[state=active]:border-teal-500 transition-all hover:text-white"
              >
                Barbearia Clássica
              </Tabs.Trigger>
              <Tabs.Trigger
                value="salon"
                className="px-5 py-2.5 rounded-lg text-xs uppercase tracking-wider font-semibold text-ice-300 data-[state=active]:bg-teal-500 data-[state=active]:text-midnight-950 border border-teal-500/20 data-[state=active]:border-teal-500 transition-all hover:text-white"
              >
                Hair Studio & Mechas
              </Tabs.Trigger>
              <Tabs.Trigger
                value="spa"
                className="px-5 py-2.5 rounded-lg text-xs uppercase tracking-wider font-semibold text-ice-300 data-[state=active]:bg-teal-500 data-[state=active]:text-midnight-950 border border-teal-500/20 data-[state=active]:border-teal-500 transition-all hover:text-white"
              >
                Terapia Capilar & Detox
              </Tabs.Trigger>
            </Tabs.List>

            <Tabs.Content value="all">
              {renderServiceCards(SITE_CONFIG.services)}
            </Tabs.Content>

            <Tabs.Content value="barber">
              {renderServiceCards(SITE_CONFIG.services.filter(s => s.category === "barber"))}
            </Tabs.Content>

            <Tabs.Content value="salon">
              {renderServiceCards(SITE_CONFIG.services.filter(s => s.category === "salon"))}
            </Tabs.Content>

            <Tabs.Content value="spa">
              {renderServiceCards(SITE_CONFIG.services.filter(s => s.category === "spa"))}
            </Tabs.Content>
          </Tabs.Root>

        </div>
      </section>

      <BookingModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        defaultService={selectedService}
      />
    </>
  );
}
