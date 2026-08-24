"use client";

import { useState, useRef } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/utils/gsap";
import { SpotlightCard } from "./SpotlightCard";

const faqData = [
  {
    q: "Como funciona o agendamento e qual a antecedência recomendada?",
    a: "Trabalhamos prioritariamente com hora marcada para garantir que você sente na cadeira exatamente no minuto combinado. Para atendimentos em horários nobres (almoço, após as 18h e sábados), recomendamos agendar com 1 a 2 dias de antecedência.",
  },
  {
    q: "O café e as bebidas do lounge têm custo adicional?",
    a: "Não. Todos os cafés expressos especiais de microlote, águas e bebidas selecionadas servidas no lounge são cortesias oferecidas a todos os clientes durante o atendimento.",
  },
  {
    q: "Como funciona a garantia do teste de mecha na Balayage?",
    a: "Antes de qualquer química, a Camila realiza uma mecha de teste para avaliar a resistência da fibra e a saúde dos fios. Se houver qualquer fragilidade, propomos um protocolo de reconstrução prévio.",
  },
  {
    q: "Vocês atendem noivos ou grupos para produções especiais?",
    a: "Sim. Temos a opção de reserva privativa da bancada e do lounge para o Dia do Noivo, padrinhos ou celebrações. Os pacotes são estruturados sob medida pela nossa recepção.",
  },
  {
    q: "Onde estacionar e quais as formas de pagamento aceitas?",
    a: "Oferecemos serviço de valet cortesia no próprio edifício para clientes em atendimento. Aceitamos Pix, cartões de crédito (Visa, Mastercard, Elo, Amex) e débito.",
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
    <section ref={containerRef} className="py-24 sm:py-32 relative z-10 bg-obsidian-950 border-t border-white/5" id="faq">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="faq-header text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block text-xs uppercase tracking-widest font-bold text-bronze-400 mb-3">
            Dúvidas Frequentes
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Informações sobre o <span className="bronze-text">Atendimento</span>
          </h2>
          <p className="text-sand-400 text-base sm:text-lg mt-3 font-light">
            Respostas sobre política de horário, produtos utilizados e estrutura do ateliê.
          </p>
        </div>

        <div className="faq-list space-y-4">
          {faqData.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <SpotlightCard
                key={index}
                className={`faq-item overflow-hidden transition-all duration-300 border-white/10 ${
                  isOpen ? "border-bronze-500/40" : ""
                }`}
              >
                <button
                  onClick={() => toggleIndex(index)}
                  className="w-full px-6 sm:px-8 py-5 text-left flex items-center justify-between gap-4 font-display font-bold text-white text-base sm:text-lg hover:text-bronze-300 transition-colors"
                >
                  <span>{item.q}</span>
                  <FaChevronDown
                    className={`w-4 h-4 text-bronze-400 shrink-0 transition-transform duration-300 ${
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
                    <div className="px-6 sm:px-8 pb-6 text-sand-300 text-sm sm:text-base leading-relaxed border-t border-white/5 pt-4 font-light">
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
