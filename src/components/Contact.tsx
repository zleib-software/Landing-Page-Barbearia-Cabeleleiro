"use client";

import { useState, useRef } from "react";
import { FaWhatsapp, FaEnvelope, FaPaperPlane, FaFaceSmile, FaXmark } from "react-icons/fa6";
import { SITE_CONFIG } from "@/data/siteConfig";
import { openWhatsApp } from "@/utils/whatsapp";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/utils/gsap";
import { EmojiPicker } from "./EmojiPicker";
import { SpotlightCard } from "./SpotlightCard";

export function Contact() {
  const containerRef = useRef<HTMLElement>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  useGSAP(
    () => {
      gsap.from(".contact-info", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          once: true,
        },
        opacity: 0,
        x: -20,
        duration: 0.6,
        ease: "power2.out",
      });

      gsap.from(".contact-card", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          once: true,
        },
        opacity: 0,
        x: 20,
        duration: 0.6,
        ease: "power2.out",
      });
    },
    { scope: containerRef }
  );

  const handleEmojiSelect = (emoji: string) => {
    setMessage((prev) => prev + emoji);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let msg = `*MENSAGEM PARA A RECEPÇÃO - ${SITE_CONFIG.businessName}*\n\n`;
    if (name) msg += `*Nome:* ${name}\n`;
    if (phone) msg += `*Telefone:* ${phone}\n`;
    if (subject) msg += `*Assunto:* ${subject}\n`;
    if (message) msg += `*Mensagem:* ${message}\n\n`;
    msg += `_Enviado pelo site oficial._`;

    openWhatsApp(msg);
  };

  return (
    <section ref={containerRef} className="py-24 sm:py-32 relative z-10 bg-obsidian-950 border-t border-white/5" id="contato">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Informações de Contato */}
          <div className="contact-info lg:col-span-6 space-y-6">
            <span className="inline-block text-xs uppercase tracking-widest font-bold text-bronze-400">
              Canal Direto da Recepção
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-[1.15] tracking-tight">
              Fale com a nossa <span className="bronze-text">Equipe</span>
            </h2>
            <p className="text-sand-300 text-base sm:text-lg leading-relaxed font-light">
              Dúvidas sobre compatibilidade de tratamentos, produções de noivos ou eventos privativos são tratadas diretamente com nossa recepção.
            </p>

            <div className="space-y-4 pt-2">
              <SpotlightCard className="p-4 border-white/5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emeraldAction/15 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                    <FaWhatsapp className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-white text-sm">WhatsApp da Recepção</h4>
                    <p className="text-sand-400 text-sm font-light">{SITE_CONFIG.contact.phoneFormatted}</p>
                  </div>
                </div>
              </SpotlightCard>

              <SpotlightCard className="p-4 border-white/5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-bronze-500/10 text-bronze-400 flex items-center justify-center border border-bronze-500/20">
                    <FaEnvelope className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-white text-sm">E-mail Institucional</h4>
                    <p className="text-sand-400 text-sm font-light">{SITE_CONFIG.contact.email}</p>
                  </div>
                </div>
              </SpotlightCard>
            </div>
          </div>

          {/* Formulário Estilo Concierge */}
          <SpotlightCard className="contact-card lg:col-span-6 p-8 sm:p-10 border-bronze-500/30">
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-1">
              Enviar Mensagem
            </h3>
            <p className="text-xs text-sand-400 mb-6 font-light">Resposta em tempo real pelo WhatsApp</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-sand-400 mb-1.5">
                  Nome completo
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: Carlos Eduardo"
                  required
                  className="w-full bg-obsidian-950 border border-white/10 focus:border-bronze-500 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-all placeholder:text-sand-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-sand-400 mb-1.5">
                  Telefone com DDD
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Ex: (11) 98765-4321"
                  className="w-full bg-obsidian-950 border border-white/10 focus:border-bronze-500 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-all placeholder:text-sand-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-sand-400 mb-1.5">
                  Assunto de interesse
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Ex: Agendamento para Noivos ou Avaliação"
                  className="w-full bg-obsidian-950 border border-white/10 focus:border-bronze-500 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-all placeholder:text-sand-600"
                />
              </div>

              <div className="relative">
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-sand-400">
                    Mensagem
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    className="inline-flex items-center gap-1 text-xs text-bronze-400 hover:text-white transition-colors"
                  >
                    {showEmojiPicker ? (
                      <>
                        <FaXmark className="w-3 h-3" />
                        <span>Fechar</span>
                      </>
                    ) : (
                      <>
                        <FaFaceSmile className="w-3 h-3" />
                        <span>Emoji</span>
                      </>
                    )}
                  </button>
                </div>

                {showEmojiPicker && (
                  <div className="mb-3 animate-in fade-in zoom-in-95 duration-200">
                    <EmojiPicker onEmojiSelect={handleEmojiSelect} />
                  </div>
                )}

                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Como podemos te ajudar hoje?"
                  className="w-full bg-obsidian-950 border border-white/10 focus:border-bronze-500 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-all placeholder:text-sand-600 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-wa hover:bg-wa-dark text-white font-extrabold text-xs uppercase tracking-wider shadow-wa-glow flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all btn-shine"
              >
                <FaPaperPlane className="w-3.5 h-3.5" />
                <span>Enviar para a Recepção no WhatsApp</span>
              </button>
            </form>
          </SpotlightCard>

        </div>
      </div>
    </section>
  );
}
