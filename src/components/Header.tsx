"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MessageCircle, Menu, X, Sun, Moon, Laptop } from "lucide-react";
import { SITE_CONFIG } from "@/data/siteConfig";
import { openWhatsApp } from "@/utils/whatsapp";
import { useTheme } from "@/utils/useTheme";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isOpenNow, setIsOpenNow] = useState(true);
  const [statusText, setStatusText] = useState("Aberto agora");
  const { theme, resolvedTheme, toggleTheme, setTheme, mounted } = useTheme();

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
          <nav className="hidden lg:flex items-center gap-8">
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

          {/* Status, Theme Toggle & CTA Header */}
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

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl bg-light-200/80 dark:bg-white/5 text-light-800 dark:text-gold-300 hover:text-gold-600 dark:hover:text-white border border-light-300 dark:border-white/10 shadow-sm transition-all hover:scale-105 active:scale-95"
              aria-label={
                mounted
                  ? resolvedTheme === "dark"
                    ? "Mudar para modo claro"
                    : "Mudar para modo escuro"
                  : "Alternar tema"
              }
              title={
                mounted
                  ? `Tema atual: ${theme === "system" ? "Sistema (" + resolvedTheme + ")" : resolvedTheme}. Clique para alternar.`
                  : "Alternar tema"
              }
            >
              {mounted ? (
                resolvedTheme === "dark" ? (
                  <Sun className="w-4 h-4 text-amber-400" />
                ) : (
                  <Moon className="w-4 h-4 text-indigo-700" />
                )
              ) : (
                <Sun className="w-4 h-4 text-amber-400 opacity-50" />
              )}
            </button>

            {/* CTA WhatsApp Button */}
            <button
              onClick={() => openWhatsApp("Olá! Gostaria de agendar um horário na Lumen & Co.")}
              className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gold-gradient text-dark-950 font-bold text-sm shadow-gold-glow hover:scale-105 active:scale-95 transition-all btn-shine"
            >
              <MessageCircle className="w-4 h-4 fill-dark-950" />
              <span>Agendar Horário</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 rounded-lg bg-light-200/80 dark:bg-white/5 text-light-800 dark:text-gray-200 hover:text-light-950 dark:hover:text-white border border-light-300 dark:border-white/10"
              aria-label="Abrir menu mobile"
            >
              <Menu className="w-6 h-6" />
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
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Theme Selector in Mobile Menu */}
          <div className="mb-6 p-3 rounded-2xl bg-light-200/70 dark:bg-dark-800 border border-light-300 dark:border-white/10">
            <div className="text-xs font-bold text-light-600 dark:text-gray-400 mb-2 flex items-center justify-between">
              <span>Aparência / Tema</span>
              <span className="text-[10px] uppercase font-bold text-gold-600 dark:text-gold-400">
                {theme === "system" ? "Automático" : theme === "dark" ? "Escuro" : "Claro"}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              <button
                onClick={() => setTheme("light")}
                className={`py-1.5 px-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                  theme === "light"
                    ? "bg-white text-light-950 shadow-sm border border-gold-500/40"
                    : "text-light-700 dark:text-gray-400 hover:text-light-950 dark:hover:text-white"
                }`}
              >
                <Sun className="w-3.5 h-3.5 text-amber-500" />
                <span>Claro</span>
              </button>
              <button
                onClick={() => setTheme("dark")}
                className={`py-1.5 px-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                  theme === "dark"
                    ? "bg-dark-900 text-white shadow-sm border border-gold-500/40"
                    : "text-light-700 dark:text-gray-400 hover:text-light-950 dark:hover:text-white"
                }`}
              >
                <Moon className="w-3.5 h-3.5 text-indigo-400" />
                <span>Escuro</span>
              </button>
              <button
                onClick={() => setTheme("system")}
                className={`py-1.5 px-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                  theme === "system"
                    ? "bg-gold-gradient text-dark-950 shadow-sm font-bold"
                    : "text-light-700 dark:text-gray-400 hover:text-light-950 dark:hover:text-white"
                }`}
              >
                <Laptop className="w-3.5 h-3.5" />
                <span>Auto</span>
              </button>
            </div>
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
            <MessageCircle className="w-5 h-5 fill-white" />
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

