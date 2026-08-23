"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqData = [
  {
    q: "Preciso agendar com antecedência ou atendem por ordem de chegada?",
    a: "Recomendamos fortemente o agendamento prévio via WhatsApp para garantir o seu horário exclusivo sem espera. No entanto, também atendemos clientes que chegam sem agendamento havendo encaixe disponível na bancada.",
  },
  {
    q: "Quais são as formas de pagamento aceitas?",
    a: "Aceitamos Pix (com confirmação instantânea), todos os cartões de crédito e débito (Visa, Mastercard, Elo, American Express), além de Apple Pay, Google Pay e dinheiro.",
  },
  {
    q: "As bebidas do lounge e open bar são realmente gratuitas?",
    a: "Sim! Todos os nossos clientes em atendimento têm direito a cafés expressos especiais, água saborizada, sucos e um chope artesanal ou cerveja gelada como cortesia da casa.",
  },
  {
    q: "Como funciona a Barboterapia com Toalha Quente?",
    a: "É um procedimento relaxante e higiênico. Aplicamos vapor de ozônio para higienização e abertura dos poros, seguido de esfoliação suave, toalha aquecida com óleo essencial de eucalipto, corte do contorno na navalha descartável e aplicação de bálsamo calmante anti-foliculite.",
  },
  {
    q: "Possuem pacotes para Noivos, Padrinhos ou Eventos?",
    a: "Sim! Temos pacotes VIP personalizados para o 'Dia do Noivo' e preparação de noivas/madrinhas, com fechamento exclusivo do lounge, massagem, banho, charutos, buffet especial e fotografia. Consulte-nos pelo WhatsApp para uma proposta personalizada.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleIndex = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-24 relative z-10 bg-light-150/70 dark:bg-dark-950/60 transition-colors duration-300" id="faq">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-xs uppercase tracking-widest font-bold text-gold-700 dark:text-gold-400 bg-gold-500/10 border border-gold-500/30 px-4 py-1.5 rounded-full mb-4">
            Tire suas Dúvidas
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-light-950 dark:text-white mb-4">
            Perguntas <span className="gold-gradient-text">Frequentes</span>
          </h2>
          <p className="text-light-600 dark:text-gray-400 text-base sm:text-lg">
            Tudo o que você precisa saber sobre nossos agendamentos, formas de pagamento e serviços.
          </p>
        </div>

        <div className="space-y-4">
          {faqData.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`glass-card rounded-2xl border transition-colors overflow-hidden ${
                  isOpen
                    ? "border-gold-500/60 shadow-gold-glow-light dark:shadow-gold-glow"
                    : "border-light-300 dark:border-white/10"
                }`}
              >
                <button
                  onClick={() => toggleIndex(index)}
                  className="w-full px-6 sm:px-8 py-5 text-left flex items-center justify-between gap-4 font-semibold text-light-950 dark:text-white text-base sm:text-lg"
                >
                  <span>{item.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-gold-600 dark:text-gold-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                    >
                      <div className="px-6 sm:px-8 pb-6 text-light-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed border-t border-light-200 dark:border-white/5 pt-4 font-normal">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
