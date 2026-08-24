"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaWhatsapp, FaBars, FaXmark } from "react-icons/fa6";
import { SITE_CONFIG } from "@/data/siteConfig";
import { openWhatsApp } from "@/utils/whatsapp";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isOpenNow, setIsOpenNow] = useState(true);
  const [statusText, setStatusText] = useState("Aberto agora");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // Calcula status em tempo real
    const now = new Date();
    const currentDayIndex = now.getDay();
    const currentHour = now.getHours();
    const currentMinutes = now.getMinutes();
    const currentTimeStr = `${String(currentHour).padStart(2, "0")}:${String(currentMinutes).padStart(2, "0")}`;

    const todaySchedule = SITE_CONFIG.schedule.find(s => s.dayIndex === currentDayIndex);

    if (todaySchedule && todaySchedule.isOpen) {
      if (currentTimeStr >= todaySchedule.open && currentTimeStr < todaySchedule.close) {
        setIsOpenNow(true);
        setStatusText(`Aberto agora • Fecha às ${todaySchedule.close}`);
      } else if (currentTimeStr < todaySchedule.open) {
        setIsOpenNow(false);
        setStatusText(`Fechado • Abre às ${todaySchedule.open}`);
      } else {
        setIsOpenNow(false);
        setStatusText(`Fechado • Reabre amanhã`);
      }
    } else {
      setIsOpenNow(false);
      setStatusText("Fechado hoje");
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "glass-nav py-3.5 shadow-lg dark:shadow-2xl dark:shadow-black/80"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="#inicio" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-gold-gradient flex items-center justify-center text-dark-950 font-display font-black text-xl shadow-gold-glow group-hover:scale-105 transition-transform">
              L
            </div>
            <span className="font-display font-extrabold text-xl sm:text-2xl text-light-950 dark:text-white tracking-wide">
              LUMEN<span className="gold-gradient-text">&CO.</span>
            </span>
          </Link>

          {/* Nav Desktop */}
          <nav className="hidden lg:flex items-center gap-7 xl:gap-8">
            <Link href="#experiencia" className="text-light-700 hover:text-light-950 dark:text-gray-300 dark:hover:text-white text-sm font-semibold transition-colors">
              Experiência VIP
            </Link>
            <Link href="#servicos" className="text-light-700 hover:text-light-950 dark:text-gray-300 dark:hover:text-white text-sm font-semibold transition-colors">
              Serviços & Preços
            </Link>
            <Link href="#galeria" className="text-light-700 hover:text-light-950 dark:text-gray-300 dark:hover:text-white text-sm font-semibold transition-colors">
              Galeria
            </Link>
            <Link href="#equipe" className="text-light-700 hover:text-light-950 dark:text-gray-300 dark:hover:text-white text-sm font-semibold transition-colors">
              Especialistas
            </Link>
            <Link href="#localizacao" className="text-light-700 hover:text-light-950 dark:text-gray-300 dark:hover:text-white text-sm font-semibold transition-colors">
              Localização
            </Link>
            <Link href="#faq" className="text-light-700 hover:text-light-950 dark:text-gray-300 dark:hover:text-white text-sm font-semibold transition-colors">
              Dúvidas
            </Link>
          </nav>

          {/* Status & CTA Header */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Live Status Badge */}
            <div
              className={`hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md border ${
                isOpenNow
                  ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
                  : "bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400"
              }`}
            >
              <span className="relative flex h-2 w-2">
                <span
                  className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                    isOpenNow ? "bg-emerald-400" : "bg-amber-400"
                  }`}
                ></span>
                <span
                  className={`relative inline-flex rounded-full h-2 w-2 ${
                    isOpenNow ? "bg-emerald-500" : "bg-amber-500"
                  }`}
                ></span>
              </span>
              <span>{statusText}</span>
            </div>

            {/* CTA WhatsApp Button */}
            <button
              onClick={() => openWhatsApp("Olá! Gostaria de agendar um horário na Lumen & Co.")}
              className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gold-gradient text-dark-950 font-bold text-sm shadow-gold-glow hover:scale-105 active:scale-95 transition-all btn-shine"
            >
              <FaWhatsapp className="w-4 h-4 text-dark-950" />
              <span>Agendar Horário</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 rounded-lg bg-light-200/80 dark:bg-white/5 text-light-800 dark:text-gray-200 hover:text-light-950 dark:hover:text-white border border-light-300 dark:border-white/10"
              aria-label="Abrir menu mobile"
            >
              <FaBars className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Backdrop & Drawer */}
      <div
        className={`fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm z-50 transition-opacity duration-300 lg:hidden ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileOpen(false)}
      />

      <aside
        className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-light-50 dark:bg-dark-900 border-l border-light-300 dark:border-gold-500/30 p-6 z-50 flex flex-col justify-between transition-transform duration-300 ease-out lg:hidden shadow-2xl ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div>
          <div className="flex items-center justify-between pb-5 border-b border-light-300 dark:border-white/10 mb-6">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gold-gradient flex items-center justify-center text-dark-950 font-display font-black text-lg">
                L
              </div>
              <span className="font-display font-bold text-lg text-light-950 dark:text-white">
                LUMEN<span className="gold-gradient-text">&CO.</span>
              </span>
            </div>
            <button
              onClick={() => setMobileOpen(false)}
              className="p-1.5 rounded-full bg-light-200 dark:bg-white/5 text-light-700 dark:text-gray-400 hover:text-light-950 dark:hover:text-white"
            >
              <FaXmark className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex flex-col gap-3">
            <Link
              href="#experiencia"
              onClick={() => setMobileOpen(false)}
              className="text-base font-semibold text-light-800 hover:text-gold-600 dark:text-gray-200 dark:hover:text-gold-400 py-1"
            >
              💎 Experiência VIP
            </Link>
            <Link
              href="#servicos"
              onClick={() => setMobileOpen(false)}
              className="text-base font-semibold text-light-800 hover:text-gold-600 dark:text-gray-200 dark:hover:text-gold-400 py-1"
            >
              ✂️ Serviços & Preços
            </Link>
            <Link
              href="#galeria"
              onClick={() => setMobileOpen(false)}
              className="text-base font-semibold text-light-800 hover:text-gold-600 dark:text-gray-200 dark:hover:text-gold-400 py-1"
            >
              📸 Galeria de Estilos
            </Link>
            <Link
              href="#equipe"
              onClick={() => setMobileOpen(false)}
              className="text-base font-semibold text-light-800 hover:text-gold-600 dark:text-gray-200 dark:hover:text-gold-400 py-1"
            >
              💈 Nossos Mestres
            </Link>
            <Link
              href="#localizacao"
              onClick={() => setMobileOpen(false)}
              className="text-base font-semibold text-light-800 hover:text-gold-600 dark:text-gray-200 dark:hover:text-gold-400 py-1"
            >
              📍 Localização & Horários
            </Link>
            <Link
              href="#faq"
              onClick={() => setMobileOpen(false)}
              className="text-base font-semibold text-light-800 hover:text-gold-600 dark:text-gray-200 dark:hover:text-gold-400 py-1"
            >
              ❓ Dúvidas Frequentes
            </Link>
            <Link
              href="#contato"
              onClick={() => setMobileOpen(false)}
              className="text-base font-semibold text-light-800 hover:text-gold-600 dark:text-gray-200 dark:hover:text-gold-400 py-1"
            >
              💬 Fale Conosco
            </Link>
          </nav>
        </div>

        <div className="pt-6 border-t border-light-300 dark:border-white/10 flex flex-col gap-3">
          <button
            onClick={() => {
              setMobileOpen(false);
              openWhatsApp("Olá! Gostaria de agendar um horário na Lumen & Co.");
            }}
            className="w-full py-3 rounded-xl bg-wa hover:bg-wa-dark text-white font-bold text-sm shadow-wa-glow flex items-center justify-center gap-2"
          >
            <FaWhatsapp className="w-5 h-5 text-white" />
            <span>Agendar pelo WhatsApp</span>
          </button>
          <p className="text-xs text-light-500 dark:text-gray-500 text-center">
            {SITE_CONFIG.contact.address} • {SITE_CONFIG.contact.phoneFormatted}
          </p>
        </div>
      </aside>
    </>
  );
}
