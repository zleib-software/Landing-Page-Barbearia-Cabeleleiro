"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Wine, Sparkles, Clock, Crown, Award, Wifi, ArrowRight } from "lucide-react";
import { openWhatsApp } from "@/utils/whatsapp";

const differentials = [
  {
    icon: Wine,
    title: "Open Bar & Café Expresso",
    description: "Desfrute de chopes artesanais selecionados, cafés expressos moídos na hora e drinks cortesia durante o seu atendimento.",
  },
  {
    icon: Sparkles,
    title: "Toalha Quente & Ozonioterapia",
    description: "Ritual clássico de barboterapia com vapor de ozônio, toalhas aquecidas com óleos essenciais e hidratação profunda da pele.",
  },
  {
    icon: Clock,
    title: "Pontualidade Britânica",
    description: "Seu tempo é precioso. Trabalhamos com agenda rigorosamente controlada para garantir zero tempo de espera na sua chegada.",
  },
  {
    icon: Crown,
    title: "Visagismo Personalizado",
    description: "Estudo técnico da proporção do seu rosto, estilo e formato de barba/cabelo para harmonizar e valorizar sua presença.",
  },
  {
    icon: Award,
    title: "Cosméticos de Elite",
    description: "Utilizamos as marcas líderes mundiais em nutrição capilar, pigmentos livres de amônia e pomadas modeladoras de alta performance.",
  },
  {
    icon: Wifi,
    title: "Lounge Gamer & Wi-Fi 5G",
    description: "Ambiente climatizado, poltronas Chesterfield, mesa de sinuca, som ambiente de alta fidelidade e rede Wi-Fi ultrarrápida.",
  },
];

export function Differentials() {
  return (
    <section className="py-24 relative z-10 bg-light-150/70 dark:bg-dark-950/60 transition-colors duration-300" id="experiencia">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-xs uppercase tracking-widest font-bold text-gold-700 dark:text-gold-400 bg-gold-500/10 border border-gold-500/30 px-4 py-1.5 rounded-full mb-4">
            Alto Padrão em Cada Detalhe
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-light-950 dark:text-white mb-4">
            Muito mais que um atendimento, uma{" "}
            <span className="gold-gradient-text">experiência VIP</span>
          </h2>
          <p className="text-light-600 dark:text-gray-400 text-base sm:text-lg">
            Projetamos um espaço exclusivo para você relaxar, desligar da rotina acelerada e cuidar da sua imagem com comodidade absoluta.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {differentials.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="glass-card p-8 rounded-2xl border border-light-300 dark:border-white/10 hover:border-gold-500/60 hover:shadow-gold-glow-light dark:hover:shadow-gold-glow transition-all group"
              >
                <div className="w-14 h-14 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-600 dark:text-gold-400 mb-6 group-hover:bg-gold-gradient group-hover:text-dark-950 group-hover:shadow-gold-glow transition-all">
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="font-display text-xl font-bold text-light-950 dark:text-white mb-3 group-hover:text-gold-700 dark:group-hover:text-gold-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-light-600 dark:text-gray-400 text-sm leading-relaxed font-normal">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Banner de Destaque Lounge */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-16 rounded-3xl overflow-hidden glass-card-gold border border-gold-500/40 dark:border-gold-500/30 grid grid-cols-1 lg:grid-cols-12 items-center"
        >
          <div className="lg:col-span-6 relative h-72 sm:h-96 lg:h-full min-h-[340px]">
            <Image
              src="/images/experience-lounge.jpg"
              alt="Lounge VIP com mesa de sinuca e bar executivo"
              fill
              className="object-cover object-center"
            />
          </div>
          <div className="lg:col-span-6 p-8 sm:p-12">
            <span className="inline-block text-xs uppercase tracking-widest font-bold text-gold-700 dark:text-gold-400 bg-gold-500/10 border border-gold-500/30 px-3 py-1 rounded-full mb-3">
              Ambiente Exclusivo
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-light-950 dark:text-white mb-4">
              Sinta-se em casa no nosso Lounge Club
            </h3>
            <p className="text-light-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed mb-8 font-normal">
              Chegue alguns minutos antes para relaxar na nossa sinuca, tomar uma cerveja artesanal gelada ou colocar o trabalho em dia no nosso espaço executivo com Wi-Fi de alta performance.
            </p>
            <button
              onClick={() => openWhatsApp("Olá! Gostaria de conhecer o espaço e agendar um horário na Lumen & Co.")}
              className="px-7 py-3.5 rounded-xl bg-gold-gradient text-dark-950 font-bold text-sm shadow-gold-glow hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-2 btn-shine"
            >
              <span>Reservar Minha Experiência</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
