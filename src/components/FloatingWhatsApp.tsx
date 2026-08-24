"use client";

import { useState, useEffect } from "react";
import { FaWhatsapp, FaXmark, FaPaperPlane, FaFaceSmile } from "react-icons/fa6";
import { SITE_CONFIG } from "@/data/siteConfig";
import { openWhatsApp } from "@/utils/whatsapp";
import { EmojiPicker } from "./EmojiPicker";

export function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState("");
  const [hasBadge, setHasBadge] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 250) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) setHasBadge(false);
  };

  const handleQuickOption = (text: string) => {
    openWhatsApp(`Olá! ${text} (${SITE_CONFIG.businessName})`);
    setIsOpen(false);
  };

  const handleEmojiSelect = (emoji: string) => {
    setInputText((prev) => prev + emoji);
  };

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      openWhatsApp(`Olá! ${inputText.trim()}`);
      setInputText("");
      setIsOpen(false);
      setShowEmoji(false);
    }
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Botão Fixo de Alta Conversão no Mobile (Bottom Pill) */}
      <div className="fixed bottom-5 left-4 right-4 z-50 sm:hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
        <button
          onClick={() => openWhatsApp("Olá! Vim pelo site da Lumen & Co. e gostaria de agendar um horário hoje.")}
          className="w-full py-3.5 px-6 rounded-2xl bg-wa hover:bg-wa-dark text-white font-extrabold text-sm shadow-wa-glow flex items-center justify-center gap-2.5 transition-transform active:scale-95 border border-white/20"
          aria-label="Agendar horário pelo WhatsApp"
        >
          <FaWhatsapp className="w-5 h-5 text-white shrink-0" />
          <span>Agendar pelo WhatsApp</span>
        </button>
      </div>

      {/* Assistente Flutuante no Desktop */}
      <div className="hidden sm:block fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-5 duration-300">
        {/* Modal / Popup do Chat Assistente */}
        {isOpen && (
          <div className="absolute bottom-20 right-0 w-[350px] bg-white dark:bg-dark-900 border border-gold-500/40 dark:border-gold-500/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-200">
            {/* Header do Chat */}
            <div className="bg-gradient-to-r from-emerald-700 to-emerald-900 p-4 flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white text-emerald-800 flex items-center justify-center font-bold">
                  <FaWhatsapp className="w-6 h-6 text-emerald-800" />
                </div>
                <div>
                  <h4 className="font-bold text-sm leading-tight">Lumen & Co. Barber</h4>
                  <p className="text-[11px] text-emerald-200 flex items-center gap-1 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    Online • Resposta imediata
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setIsOpen(false);
                  setShowEmoji(false);
                }}
                className="p-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/10"
                aria-label="Fechar assistente"
              >
                <FaXmark className="w-4 h-4" />
              </button>
            </div>

            {/* Corpo das Mensagens */}
            <div className="p-4 bg-light-100 dark:bg-dark-950 space-y-3">
              <div className="bg-white dark:bg-dark-800 border border-light-300 dark:border-white/10 rounded-2xl rounded-tl-none p-3.5 text-xs text-light-900 dark:text-gray-200 leading-relaxed shadow-sm">
                👋 Olá! Como podemos te atender hoje na <strong>LUMEN & CO.</strong>?
              </div>

              <div className="space-y-2 pt-1">
                <button
                  onClick={() => handleQuickOption("Gostaria de agendar um horário para hoje")}
                  className="w-full text-left p-2.5 rounded-xl bg-gold-500/10 hover:bg-gold-gradient text-gold-800 dark:text-gold-400 hover:text-dark-950 font-semibold text-xs border border-gold-500/30 transition-all shadow-sm"
                >
                  📅 Agendar horário para hoje
                </button>
                <button
                  onClick={() => handleQuickOption("Quero agendar o Combo Royal (Corte + Barba)")}
                  className="w-full text-left p-2.5 rounded-xl bg-gold-500/10 hover:bg-gold-gradient text-gold-800 dark:text-gold-400 hover:text-dark-950 font-semibold text-xs border border-gold-500/30 transition-all shadow-sm"
                >
                  ✂️ Agendar Combo Royal
                </button>
                <button
                  onClick={() => handleQuickOption("Gostaria de tirar uma dúvida sobre serviços")}
                  className="w-full text-left p-2.5 rounded-xl bg-gold-500/10 hover:bg-gold-gradient text-gold-800 dark:text-gold-400 hover:text-dark-950 font-semibold text-xs border border-gold-500/30 transition-all shadow-sm"
                >
                  💬 Falar com atendente
                </button>
              </div>

              {showEmoji && (
                <div className="pt-2 animate-in fade-in zoom-in-95 duration-200">
                  <EmojiPicker onEmojiSelect={handleEmojiSelect} />
                </div>
              )}
            </div>

            {/* Footer do Chat com Input Livre */}
            <div className="p-3 bg-white dark:bg-dark-900 border-t border-light-300 dark:border-white/10">
              <form onSubmit={handleInputSubmit} className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowEmoji(!showEmoji)}
                  className="p-2 rounded-xl text-gray-500 hover:text-gold-600 dark:hover:text-gold-400 hover:bg-light-200 dark:hover:bg-dark-800 transition-colors"
                  aria-label="Selecionar emoji"
                >
                  <FaFaceSmile className="w-4 h-4" />
                </button>
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Digite sua mensagem..."
                  className="flex-1 bg-light-100 dark:bg-dark-950 border border-light-300 dark:border-white/15 focus:border-gold-500 rounded-xl px-3 py-2 text-xs text-light-950 dark:text-white focus:outline-none placeholder:text-light-400 dark:placeholder:text-gray-600"
                />
                <button
                  type="submit"
                  className="w-9 h-9 rounded-xl bg-wa hover:bg-wa-dark text-white flex items-center justify-center shrink-0 shadow-wa-glow"
                  aria-label="Enviar mensagem"
                >
                  <FaPaperPlane className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Botão Flutuante Circular Desktop */}
        <button
          onClick={handleToggle}
          className="w-14 h-14 rounded-full bg-wa hover:bg-wa-light text-white flex items-center justify-center shadow-wa-glow animate-wa-pulse hover:scale-110 active:scale-95 transition-transform relative"
          aria-label="Abrir assistente WhatsApp"
        >
          <FaWhatsapp className="w-7 h-7 text-white" />
          {hasBadge && (
            <span className="absolute top-0 right-0 w-4 h-4 rounded-full bg-red-500 border-2 border-white dark:border-dark-950 text-[9px] font-extrabold flex items-center justify-center text-white">
              1
            </span>
          )}
        </button>
      </div>
    </>
  );
}
