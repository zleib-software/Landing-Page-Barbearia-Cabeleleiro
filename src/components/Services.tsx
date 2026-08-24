"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { FaWhatsapp, FaClock } from "react-icons/fa6";
import { SITE_CONFIG, ServiceItem } from "@/data/siteConfig";
import { formatServiceMessage, openWhatsApp } from "@/utils/whatsapp";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/utils/gsap";

type ServiceWithBadge = ServiceItem & { badge?: string };

export function Services() {
  const containerRef = useRef<HTMLElement>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const servicesList = SITE_CONFIG.services as ServiceWithBadge[];

  const filteredServices = activeCategory === "all"
    ? servicesList
    : servicesList.filter(s => s.category === activeCategory);

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

      gsap.from(".service-card", {
        scrollTrigger: {
          trigger: ".services-grid",
          start: "top 85%",
          once: true,
        },
        opacity: 0,
        y: 20,
        stagger: 0.08,
        duration: 0.5,
        ease: "power2.out",
      });
    },
    { scope: containerRef }
  );

  // Animação suave ao trocar de categoria
  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current.querySelectorAll(".service-card"),
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.35, stagger: 0.04, ease: "power2.out" }
      );
    }
  }, [activeCategory]);

  const handleServiceBooking = (service: ServiceWithBadge) => {
    const msg = formatServiceMessage(service.title, service.price);
    openWhatsApp(msg);
  };

  return (
    <section ref={containerRef} className="py-20 sm:py-24 relative z-10" id="servicos">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="services-header text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block text-xs uppercase tracking-widest font-bold text-gold-700 dark:text-gold-400 bg-gold-500/10 border border-gold-500/30 px-4 py-1.5 rounded-full mb-4">
            Menu de Procedimentos
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-light-950 dark:text-white mb-4">
            Serviços & <span className="gold-gradient-text">Tabela de Preços</span>
          </h2>
          <p className="text-light-600 dark:text-gray-400 text-base sm:text-lg">
            Valores transparentes e sem surpresas. Escolha o procedimento e agende com 1 clique.
          </p>
        </div>

        {/* Filtros de Categoria */}
        <div className="flex justify-center gap-2 sm:gap-3 flex-wrap mb-10">
          {[
            { id: "all", label: "✨ Todos os Procedimentos" },
            { id: "barber", label: "💈 Barbearia & Fade" },
            { id: "salon", label: "✂️ Hair Studio & Mechas" },
            { id: "spa", label: "🧖 Spa & Tratamentos" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id)}
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                activeCategory === tab.id
                  ? "bg-gold-gradient text-dark-950 shadow-gold-glow scale-105 font-bold"
                  : "bg-light-200/90 dark:bg-dark-800 text-light-700 dark:text-gray-400 hover:text-light-950 dark:hover:text-white border border-light-300 dark:border-white/10 hover:border-gold-500/40"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Grid de Serviços */}
        <div className="services-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredServices.map((service) => {
            const badgeText = service.badge || (service.popular ? "Mais Escolhido" : null);

            return (
              <article
                key={service.id}
                className={`service-card glass-card rounded-2xl overflow-hidden border ${
                  service.popular
                    ? "border-gold-500/50 shadow-gold-glow-light dark:shadow-gold-glow"
                    : "border-light-300 dark:border-white/10"
                } hover:border-gold-500/70 flex flex-col group transition-all`}
              >
                {/* Imagem do Serviço */}
                <div className="relative h-48 sm:h-52 w-full overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  {badgeText && (
                    <span className="absolute top-3 right-3 bg-gold-gradient text-dark-950 text-xs font-black px-3 py-1 rounded-full shadow-lg border border-white/20">
                      {badgeText}
                    </span>
                  )}
                </div>

                {/* Corpo do Card */}
                <div className="p-6 flex flex-col flex-grow justify-between">
                  <div>
                    <div className="flex justify-between items-start gap-3 mb-2">
                      <h3 className="font-display text-lg sm:text-xl font-bold text-light-950 dark:text-white group-hover:text-gold-700 dark:group-hover:text-gold-300 transition-colors">
                        {service.title}
                      </h3>
                      <span className="font-display font-black text-lg sm:text-xl text-gold-600 dark:text-gold-400 whitespace-nowrap">
                        {service.price}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-light-600 dark:text-gray-400 mb-3 font-semibold">
                      <FaClock className="w-3.5 h-3.5 text-gold-600 dark:text-gold-400" />
                      <span>{service.duration}</span>
                    </div>

                    <p className="text-light-700 dark:text-gray-300 text-sm leading-relaxed mb-6 font-normal">
                      {service.description}
                    </p>
                  </div>

                  <button
                    onClick={() => handleServiceBooking(service)}
                    className="w-full py-3 rounded-xl bg-wa hover:bg-wa-dark text-white font-bold text-sm shadow-wa-glow flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] btn-shine"
                  >
                    <FaWhatsapp className="w-4 h-4 text-white" />
                    <span>Agendar este Serviço</span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
