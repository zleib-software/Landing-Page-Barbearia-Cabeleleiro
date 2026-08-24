"use client";

import { useState, useRef } from "react";
import { FaWhatsapp, FaEnvelope, FaPaperPlane } from "react-icons/fa6";
import { SITE_CONFIG } from "@/data/siteConfig";
import { openWhatsApp } from "@/utils/whatsapp";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/utils/gsap";
import { SpotlightCard } from "./SpotlightCard";

export function Contact() {
  const containerRef = useRef<HTMLElement>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [channel, setChannel] = useState<"whatsapp" | "email">("whatsapp");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (channel === "whatsapp") {
      let msg = `*MENSAGEM PARA A RECEPÇÃO - ${SITE_CONFIG.businessName}*\n\n`;
      if (name) msg += `*Nome:* ${name}\n`;
      if (phone) msg += `*Telefone:* ${phone}\n`;
      if (email) msg += `*E-mail:* ${email}\n`;
      if (subject) msg += `*Assunto:* ${subject}\n`;
      if (message) msg += `*Mensagem:* ${message}\n\n`;
      msg += `_Enviado pelo site oficial._`;
      openWhatsApp(msg);
    } else {
      const subjectEncoded = encodeURIComponent(`[Contato Site] ${subject || "Dúvida / Atendimento"}`);
      const bodyEncoded = encodeURIComponent(
        `Nome: ${name}\nTelefone: ${phone}\nE-mail: ${email}\n\nMensagem:\n${message}\n\nEnviado via formulário do site Zleib Barber.`
      );
      window.location.href = `mailto:${SITE_CONFIG.contact.email}?subject=${subjectEncoded}&body=${bodyEncoded}`;
    }
  };

  return (
    <section ref={containerRef} className="py-24 sm:py-32 relative z-10 bg-midnight-950 border-t border-teal-500/10" id="contato">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Informações de Contato */}
          <div className="contact-info lg:col-span-6 space-y-6">
            <span className="inline-block text-xs uppercase tracking-widest font-semibold text-teal-400">
              Canal Direto da Recepção
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-[1.15] tracking-tight">
              Fale com a nossa <span className="text-teal-400 font-light italic">Recepção</span>
            </h2>
            <p className="text-ice-300 text-base sm:text-lg leading-relaxed font-normal">
              Dúvidas sobre compatibilidade de tratamentos, produções de noivos, mechas ou agendamentos corporativos são tratadas diretamente com nossa equipe.
            </p>

            <div className="space-y-4 pt-2">
              <SpotlightCard className="p-4 border-teal-500/20 bg-midnight-850">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                    <FaWhatsapp className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-white text-sm">WhatsApp da Recepção</h4>
                    <p className="text-ice-400 text-sm font-light">{SITE_CONFIG.contact.phoneFormatted}</p>
                  </div>
                </div>
              </SpotlightCard>

              <SpotlightCard className="p-4 border-teal-500/20 bg-midnight-850">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center border border-teal-500/20">
                    <FaEnvelope className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-white text-sm">E-mail Institucional</h4>
                    <p className="text-ice-400 text-sm font-light">{SITE_CONFIG.contact.email}</p>
                  </div>
                </div>
              </SpotlightCard>
            </div>
          </div>

          {/* Formulário Estilo Concierge com Opção de Envio (WhatsApp ou E-mail) */}
          <SpotlightCard className="contact-card lg:col-span-6 p-8 sm:p-10 border-teal-500/25 bg-midnight-850">
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-1">
              Enviar Mensagem
            </h3>
            <p className="text-xs text-ice-400 mb-6 font-normal">Escolha o canal de sua preferência para envio</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Seletor de Canal */}
              <div className="grid grid-cols-2 gap-3 mb-2">
                <button
                  type="button"
                  onClick={() => setChannel("whatsapp")}
                  className={`p-3 rounded-lg border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                    channel === "whatsapp"
                      ? "bg-wa/20 border-wa text-white font-bold"
                      : "bg-midnight-900 border-white/10 text-ice-400 hover:text-white"
                  }`}
                >
                  <FaWhatsapp className="w-4 h-4 text-emerald-400" />
                  <span>Enviar via WhatsApp</span>
                </button>

                <button
                  type="button"
                  onClick={() => setChannel("email")}
                  className={`p-3 rounded-lg border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                    channel === "email"
                      ? "bg-teal-500/20 border-teal-400 text-white font-bold"
                      : "bg-midnight-900 border-white/10 text-ice-400 hover:text-white"
                  }`}
                >
                  <FaEnvelope className="w-4 h-4 text-teal-400" />
                  <span>Enviar via E-mail</span>
                </button>
              </div>

              <div>
                <label className="block text-xs font-semibold text-ice-300 mb-1.5">
                  Nome completo
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: Carlos Eduardo"
                  required
                  className="w-full bg-midnight-900 border border-teal-500/20 focus:border-teal-400 rounded-lg px-4 py-3 text-sm text-white focus:outline-none transition-all placeholder:text-ice-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-ice-300 mb-1.5">
                    Telefone com DDD
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Ex: (11) 98765-4321"
                    required={channel === "whatsapp"}
                    className="w-full bg-midnight-900 border border-teal-500/20 focus:border-teal-400 rounded-lg px-4 py-3 text-sm text-white focus:outline-none transition-all placeholder:text-ice-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-ice-300 mb-1.5">
                    E-mail
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Ex: carlos@email.com"
                    required={channel === "email"}
                    className="w-full bg-midnight-900 border border-teal-500/20 focus:border-teal-400 rounded-lg px-4 py-3 text-sm text-white focus:outline-none transition-all placeholder:text-ice-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-ice-300 mb-1.5">
                  Assunto de interesse
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Ex: Agendamento para Noivos ou Avaliação"
                  className="w-full bg-midnight-900 border border-teal-500/20 focus:border-teal-400 rounded-lg px-4 py-3 text-sm text-white focus:outline-none transition-all placeholder:text-ice-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-ice-300 mb-1.5">
                  Mensagem
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Como podemos te ajudar hoje?"
                  required
                  className="w-full bg-midnight-900 border border-teal-500/20 focus:border-teal-400 rounded-lg px-4 py-3 text-sm text-white focus:outline-none transition-all placeholder:text-ice-500 resize-none"
                />
              </div>

              <button
                type="submit"
                className={`w-full py-4 rounded-lg font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                  channel === "whatsapp"
                    ? "btn-wa-solid !shadow-lg"
                    : "btn-solid-primary !shadow-lg"
                }`}
              >
                <FaPaperPlane className="w-3.5 h-3.5" />
                <span>
                  {channel === "whatsapp" ? "Enviar para a Recepção no WhatsApp" : "Enviar Mensagem por E-mail"}
                </span>
              </button>
            </form>
          </SpotlightCard>

        </div>
      </div>
    </section>
  );
}
