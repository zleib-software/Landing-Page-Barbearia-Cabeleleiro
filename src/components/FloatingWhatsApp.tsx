"use client";

import { useState, useEffect } from "react";
import { FaWhatsapp, FaXmark, FaPaperPlane } from "react-icons/fa6";
import { SITE_CONFIG } from "@/data/siteConfig";
import { openWhatsApp } from "@/utils/whatsapp";

export function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState("");
  const [isVisible, setIsVisible] = useState(false);

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
  };

  const handleQuickOption = (text: string) => {
    openWhatsApp(`Olá! ${text} (Zleib Barber)`);
    setIsOpen(false);
  };

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      openWhatsApp(`Olá! ${inputText.trim()}`);
      setInputText("");
      setIsOpen(false);
    }
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Botão Fixo no Mobile */}
      <div className="fixed bottom-4 left-4 right-4 z-50 sm:hidden">
        <button
          onClick={() => openWhatsApp("Olá! Gostaria de consultar horários disponíveis na Zleib Barber.")}
          className="btn-wa-solid w-full !py-3.5 !text-xs !shadow-2xl"
          aria-label="Agendar horário pelo WhatsApp"
        >
          <FaWhatsapp className="w-5 h-5 mr-2" />
          <span>Agendar pelo WhatsApp</span>
        </button>
      </div>

      {/* Assistente Flutuante no Desktop */}
      <div className="hidden sm:block fixed bottom-6 right-6 z-50">
        {isOpen && (
          <div className="absolute bottom-16 right-0 w-[320px] bg-midnight-900 border border-babyblue-400/20 rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in slide-in-from-bottom-3 duration-200">
            {/* Header */}
            <div className="bg-[#1ea952] p-4 flex items-center justify-between text-white">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-white text-[#1ea952] flex items-center justify-center font-bold">
                  <FaWhatsapp className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs leading-tight">Recepção Zleib Barber</h4>
                  <p className="text-[10px] text-white/80 mt-0.5">Online agora</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded text-white/80 hover:text-white"
                aria-label="Fechar"
              >
                <FaXmark className="w-4 h-4" />
              </button>
            </div>

            {/* Opções */}
            <div className="p-4 bg-midnight-950 space-y-2.5">
              <div className="bg-midnight-850 border border-babyblue-400/10 rounded-xl p-3 text-xs text-ice-200 leading-relaxed">
                Olá! Como podemos te ajudar hoje?
              </div>

              <div className="space-y-2 pt-1">
                <button
                  onClick={() => handleQuickOption("Gostaria de agendar um horário para hoje")}
                  className="w-full text-left p-2.5 rounded bg-midnight-900 hover:bg-babyblue-400/15 text-ice-200 hover:text-babyblue-200 font-semibold text-xs border border-babyblue-400/20 transition-all"
                >
                  Consultar horários para hoje
                </button>
                <button
                  onClick={() => handleQuickOption("Quero agendar o Combo Royal (Corte + Barba)")}
                  className="w-full text-left p-2.5 rounded bg-midnight-900 hover:bg-babyblue-400/15 text-ice-200 hover:text-babyblue-200 font-semibold text-xs border border-babyblue-400/20 transition-all"
                >
                  Agendar Combo Royal
                </button>
              </div>
            </div>

            {/* Input */}
            <div className="p-3 bg-midnight-900 border-t border-babyblue-400/10">
              <form onSubmit={handleInputSubmit} className="flex items-center gap-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Digite sua mensagem..."
                  className="flex-1 bg-midnight-950 border border-babyblue-400/20 focus:border-babyblue-400 rounded-lg px-3 py-2 text-xs text-white focus:outline-none placeholder:text-ice-500"
                />
                <button
                  type="submit"
                  className="w-8 h-8 rounded bg-[#1ea952] hover:bg-[#168841] text-white flex items-center justify-center shrink-0"
                  aria-label="Enviar"
                >
                  <FaPaperPlane className="w-3 h-3" />
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Botão Flutuante */}
        <button
          onClick={handleToggle}
          className="w-13 h-13 p-3.5 rounded-full bg-[#1ea952] hover:bg-[#168841] text-white flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition-transform"
          aria-label="Abrir WhatsApp"
        >
          <FaWhatsapp className="w-6 h-6 text-white" />
        </button>
      </div>
    </>
  );
}
