"use client";

import { useState, useRef } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/utils/gsap";
import { SpotlightCard } from "./SpotlightCard";

const faqData = [
  {
    q: "Como funciona a pontualidade da hora marcada?",
    a: "Trabalhamos com intervalos de 15 minutos entre cada cliente. Isso significa que, se você marcou às 14h, às 14h em ponto o profissional estará te esperando com a bancada pronta. Se você tiver compromisso logo em seguida, pode vir tranquilo que o tempo estimado é cumprido à risca.",
  },
  {
    q: "O café espresso e as bebidas do lounge são cortesia?",
    a: "Sim, 100% por nossa conta! Moemos grãos especiais 100% arábica do Sul de Minas na hora para você degustar com calma antes ou depois do atendimento. Também temos águas aromatizadas e chás no lounge.",
  },
  {
    q: "Como funciona o teste de mecha para mechas e balayage?",
    a: "Antes de aplicar qualquer química clareadora, a Camila faz um teste em uma mecha discreta para checar a elasticidade e resistência do fio. Se o cabelo estiver sensibilizado por químicas anteriores, nós avisamos com total transparência e recomendamos primeiro um tratamento de reconstrução.",
  },
  {
    q: "Atendem noivos ou pequenos grupos para eventos?",
    a: "Com certeza. Podemos reservar o lounge e as bancadas com exclusividade para você e seus padrinhos ou convidados se prepararem com calma, tomando café ou brindando sem pressa. É só mandar uma mensagem no WhatsApp que organizamos os horários em conjunto.",
  },
  {
    q: "Onde estacionar e quais formas de pagamento são aceitas?",
    a: "Temos valet com manobrista cortesia no subsolo do próprio Edifício Barão de Iguape (Av. Paulista, 1578). Aceitamos Pix, cartões de crédito (Visa, Mastercard, Elo, Amex) e débito.",
  },
];

export function FAQ() {
  const containerRef = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useGSAP(
    () => {
      gsap.from(".faq-header", {
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

      gsap.from(".faq-item", {
        scrollTrigger: {
          trigger: ".faq-list",
          start: "top 85%",
          once: true,
        },
        opacity: 0,
        y: 15,
        stagger: 0.08,
        duration: 0.5,
        ease: "power2.out",
      });
    },
    { scope: containerRef }
  );

  const toggleIndex = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section ref={containerRef} className="py-24 sm:py-32 relative z-10 bg-midnight-950 border-t border-teal-500/10" id="faq">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="faq-header text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-xs uppercase tracking-widest font-semibold text-teal-400 mb-2.5">
            Dúvidas Frequentes
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Tudo o que você precisa <span className="text-teal-400 font-light italic">saber antes da visita</span>
          </h2>
          <p className="text-ice-400 text-sm sm:text-base mt-3 font-normal">
            Respostas diretas sobre dinâmica de agendamento, produtos, valet e protocolos de atendimento.
          </p>
        </div>

        <div className="faq-list space-y-4">
          {faqData.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <SpotlightCard
                key={index}
                className={`faq-item overflow-hidden transition-all duration-300 border-teal-500/20 bg-midnight-850 ${
                  isOpen ? "border-teal-500/40" : ""
                }`}
              >
                <button
                  onClick={() => toggleIndex(index)}
                  className="w-full px-6 sm:px-8 py-5 text-left flex items-center justify-between gap-4 font-display font-bold text-white text-base sm:text-lg hover:text-teal-300 transition-colors"
                >
                  <span>{item.q}</span>
                  <FaChevronDown
                    className={`w-4 h-4 text-teal-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 sm:px-8 pb-6 text-ice-300 text-xs sm:text-sm leading-relaxed border-t border-white/5 pt-4 font-normal">
                      {item.a}
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            );
          })}
        </div>

      </div>
    </section>
  );
}
