"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Mail, Phone, Send } from "lucide-react";
import { SITE_CONFIG } from "@/data/siteConfig";
import { openWhatsApp } from "@/utils/whatsapp";

export function Contact() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let msg = `*MENSAGEM DE CONTATO - ${SITE_CONFIG.businessName}*\n\n`;
    if (name) msg += `*Nome:* ${name}\n`;
    if (phone) msg += `*Telefone:* ${phone}\n`;
    if (subject) msg += `*Assunto:* ${subject}\n`;
    if (message) msg += `*Mensagem:* ${message}\n\n`;
    msg += `_Aguardo retorno da recepção._`;

    openWhatsApp(msg);
  };

  return (
    <section className="py-24 relative z-10" id="contato">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Coluna Texto & Contatos */}
          <div className="lg:col-span-6">
            <span className="inline-block text-xs uppercase tracking-widest font-bold text-gold-700 dark:text-gold-400 bg-gold-500/10 border border-gold-500/30 px-4 py-1.5 rounded-full mb-4">
              Atendimento Personalizado
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-light-950 dark:text-white mb-6">
              Tem alguma dúvida ou pedido <span className="gold-gradient-text">especial</span>?
            </h2>
            <p className="text-light-700 dark:text-gray-300 text-base sm:text-lg leading-relaxed mb-8 font-normal">
              Preencha o formulário rápido e nossa recepção receberá sua mensagem diretamente no WhatsApp para um retorno ágil e personalizado.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-2xl glass-card border border-light-300 dark:border-white/10">
                <div className="w-12 h-12 rounded-xl bg-wa/15 text-wa flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 fill-wa" />
                </div>
                <div>
                  <h4 className="font-bold text-light-950 dark:text-white text-sm">WhatsApp Oficial</h4>
                  <p className="text-light-600 dark:text-gray-400 text-sm font-medium">{SITE_CONFIG.contact.phoneFormatted}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-2xl glass-card border border-light-300 dark:border-white/10">
                <div className="w-12 h-12 rounded-xl bg-gold-500/15 text-gold-600 dark:text-gold-400 flex items-center justify-center">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-light-950 dark:text-white text-sm">E-mail Corporativo</h4>
                  <p className="text-light-600 dark:text-gray-400 text-sm font-medium">{SITE_CONFIG.contact.email}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Formulário */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-6 glass-card-gold p-8 sm:p-10 rounded-3xl border border-gold-500/40 dark:border-gold-500/30"
          >
            <h3 className="font-display text-2xl font-bold text-light-950 dark:text-white mb-2">
              Enviar Mensagem Direta
            </h3>
            <p className="text-xs text-light-600 dark:text-gray-400 mb-6">Fale diretamente com nossa recepção</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-light-800 dark:text-gray-300 mb-1.5">
                  Seu Nome
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: Carlos Eduardo"
                  required
                  className="w-full bg-white dark:bg-dark-900/90 border border-light-300 dark:border-white/15 focus:border-gold-500 rounded-xl px-4 py-3 text-sm text-light-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-gold-500/20 transition-all placeholder:text-light-400 dark:placeholder:text-gray-600 shadow-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-light-800 dark:text-gray-300 mb-1.5">
                  Seu Telefone / WhatsApp
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Ex: (81) 98765-4321"
                  className="w-full bg-white dark:bg-dark-900/90 border border-light-300 dark:border-white/15 focus:border-gold-500 rounded-xl px-4 py-3 text-sm text-light-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-gold-500/20 transition-all placeholder:text-light-400 dark:placeholder:text-gray-600 shadow-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-light-800 dark:text-gray-300 mb-1.5">
                  Assunto / Serviço
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Ex: Dia do Noivo, Agendamento ou Dúvida"
                  className="w-full bg-white dark:bg-dark-900/90 border border-light-300 dark:border-white/15 focus:border-gold-500 rounded-xl px-4 py-3 text-sm text-light-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-gold-500/20 transition-all placeholder:text-light-400 dark:placeholder:text-gray-600 shadow-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-light-800 dark:text-gray-300 mb-1.5">
                  Sua Mensagem
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Como podemos te ajudar hoje?"
                  className="w-full bg-white dark:bg-dark-900/90 border border-light-300 dark:border-white/15 focus:border-gold-500 rounded-xl px-4 py-3 text-sm text-light-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-gold-500/20 transition-all placeholder:text-light-400 dark:placeholder:text-gray-600 resize-none shadow-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-wa hover:bg-wa-dark text-white font-extrabold text-sm shadow-wa-glow flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all btn-shine"
              >
                <Send className="w-4 h-4" />
                <span>Enviar para o WhatsApp</span>
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
