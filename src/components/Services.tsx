"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import * as Tabs from "@radix-ui/react-tabs";
import { FaClock, FaCheck, FaArrowRight } from "react-icons/fa6";
import { SITE_CONFIG, ServiceItem } from "@/data/siteConfig";
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 pt-6">
      {items.map((service) => (
        <SpotlightCard
          key={service.id}
          className="flex flex-col justify-between group hover:border-bronze-500/40 transition-all duration-300"
        >
          {/* Imagem do Serviço com Proporção Elegante */}
          <div className="relative h-56 w-full overflow-hidden">
            <Image
              src={service.image}
              alt={service.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/20 to-transparent" />
            
            {service.badge && (
              <span className="absolute top-4 right-4 bg-obsidian-950/80 backdrop-blur-md text-bronze-300 text-[11px] uppercase tracking-wider font-bold px-3 py-1 rounded-full border border-bronze-500/30">
                {service.badge}
              </span>
            )}
          </div>

          {/* Conteúdo do Card */}
          <div className="p-6 sm:p-7 flex flex-col flex-grow justify-between">
            <div>
              <div className="flex justify-between items-baseline gap-2 mb-2">
                <h3 className="font-display text-xl font-bold text-white group-hover:text-bronze-300 transition-colors">
                  {service.title}
                </h3>
                <span className="font-display text-lg font-black text-bronze-400 whitespace-nowrap">
                  {service.price}
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-sand-400 mb-3 font-medium">
                <FaClock className="w-3 h-3 text-bronze-400" />
                <span>{service.duration} de atendimento</span>
              </div>

              <p className="text-sand-300 text-sm leading-relaxed mb-6 font-light">
                {service.description}
              </p>

              {service.highlights && service.highlights.length > 0 && (
                <div className="space-y-2 pt-4 mb-6 border-t border-white/5">
                  {service.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-sand-400 font-light">
                      <FaCheck className="w-3 h-3 text-emerald-400 shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => handleBooking(service.id)}
              className="w-full py-3.5 rounded-xl bg-white/5 hover:bg-bronze-gradient text-sand-200 hover:text-obsidian-950 font-bold text-xs uppercase tracking-wider border border-white/10 hover:border-transparent transition-all flex items-center justify-center gap-2 btn-shine"
            >
              <span>Solicitar este Procedimento</span>
              <FaArrowRight className="w-3 h-3" />
            </button>
          </div>
        </SpotlightCard>
      ))}
    </div>
  );

  return (
    <>
      <section ref={containerRef} className="py-24 sm:py-32 relative z-10 bg-obsidian-950 border-t border-white/5" id="servicos">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="services-header text-center max-w-2xl mx-auto mb-14">
            <span className="inline-block text-xs uppercase tracking-widest font-bold text-bronze-400 mb-3">
              Menu de Atendimentos
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              Procedimentos & <span className="bronze-text">Investimento</span>
            </h2>
            <p className="text-sand-400 text-base sm:text-lg mt-3 font-light">
              Diagnóstico visagista e lavagem inclusos em todos os atendimentos. Sem surpresas.
            </p>
          </div>

          {/* Radix UI Tabs */}
          <Tabs.Root defaultValue="all" className="services-tabs">
            <Tabs.List className="flex justify-center gap-2 sm:gap-3 flex-wrap mb-10">
              <Tabs.Trigger
                value="all"
                className="px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-sand-400 data-[state=active]:bg-bronze-gradient data-[state=active]:text-obsidian-950 data-[state=active]:font-bold transition-all border border-white/5 data-[state=active]:border-transparent hover:text-white"
              >
                Todos os Procedimentos
              </Tabs.Trigger>
              <Tabs.Trigger
                value="barber"
                className="px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-sand-400 data-[state=active]:bg-bronze-gradient data-[state=active]:text-obsidian-950 data-[state=active]:font-bold transition-all border border-white/5 data-[state=active]:border-transparent hover:text-white"
              >
                Barbearia Clássica
              </Tabs.Trigger>
              <Tabs.Trigger
                value="salon"
                className="px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-sand-400 data-[state=active]:bg-bronze-gradient data-[state=active]:text-obsidian-950 data-[state=active]:font-bold transition-all border border-white/5 data-[state=active]:border-transparent hover:text-white"
              >
                Hair Studio & Visagismo
              </Tabs.Trigger>
              <Tabs.Trigger
                value="spa"
                className="px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-sand-400 data-[state=active]:bg-bronze-gradient data-[state=active]:text-obsidian-950 data-[state=active]:font-bold transition-all border border-white/5 data-[state=active]:border-transparent hover:text-white"
              >
                Terapia Capilar & Spa
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
