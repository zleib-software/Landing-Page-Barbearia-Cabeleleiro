"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaBars, FaXmark, FaCalendarDays } from "react-icons/fa6";
import { SITE_CONFIG } from "@/data/siteConfig";
import { BookingModal } from "./BookingModal";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [isOpenNow, setIsOpenNow] = useState(true);
  const [statusText, setStatusText] = useState("Aberto hoje");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    const now = new Date();
    const currentDayIndex = now.getDay();
    const currentHour = now.getHours();
    const currentMinutes = now.getMinutes();
    const currentTimeStr = `${String(currentHour).padStart(2, "0")}:${String(currentMinutes).padStart(2, "0")}`;

    const todaySchedule = SITE_CONFIG.schedule.find(s => s.dayIndex === currentDayIndex);

    if (todaySchedule && todaySchedule.isOpen) {
      if (currentTimeStr >= todaySchedule.open && currentTimeStr < todaySchedule.close) {
        setIsOpenNow(true);
        setStatusText(`Aberto até ${todaySchedule.close}`);
      } else if (currentTimeStr < todaySchedule.open) {
        setIsOpenNow(false);
        setStatusText(`Abre às ${todaySchedule.open}`);
      } else {
        setIsOpenNow(false);
        setStatusText(`Fechado agora`);
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
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "glass-nav py-3.5 shadow-2xl"
            : "bg-transparent py-5 sm:py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo Minimalista Editorial */}
          <Link href="#inicio" className="flex items-center gap-2.5 sm:gap-3 group">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-bronze-gradient flex items-center justify-center text-obsidian-950 font-display font-black text-base sm:text-lg shadow-luxury-glow group-hover:scale-105 transition-transform">
              L
            </div>
            <span className="font-display font-bold text-lg sm:text-xl text-white tracking-wider">
              LUMEN<span className="text-bronze-400">&CO.</span>
            </span>
          </Link>

          {/* Links Desktop Enxutos */}
          <nav className="hidden md:flex items-center gap-7 lg:gap-8">
            <Link href="#sobre" className="text-sand-300 hover:text-white text-xs uppercase tracking-widest font-semibold transition-colors">
              O Ateliê
            </Link>
            <Link href="#servicos" className="text-sand-300 hover:text-white text-xs uppercase tracking-widest font-semibold transition-colors">
              Procedimentos
            </Link>
            <Link href="#galeria" className="text-sand-300 hover:text-white text-xs uppercase tracking-widest font-semibold transition-colors">
              Portfólio & Relatos
            </Link>
            <Link href="#visita" className="text-sand-300 hover:text-white text-xs uppercase tracking-widest font-semibold transition-colors">
              Visita & Horários
            </Link>
          </nav>

          {/* Status & CTA Header */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/10 backdrop-blur-md">
              <span className={`w-1.5 h-1.5 rounded-full ${isOpenNow ? "bg-emerald-400 animate-pulse" : "bg-sand-500"}`} />
              <span className="text-sand-300">{statusText}</span>
            </div>

            <button
              onClick={() => setModalOpen(true)}
              className="hidden sm:inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl bg-bronze-gradient text-obsidian-950 font-bold text-xs uppercase tracking-wider shadow-luxury-glow hover:scale-105 active:scale-95 transition-all btn-shine"
            >
              <FaCalendarDays className="w-3.5 h-3.5 text-obsidian-950" />
              <span>Agendar</span>
            </button>

            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden p-2 rounded-xl bg-white/5 text-sand-200 hover:text-white border border-white/10"
              aria-label="Abrir menu"
            >
              <FaBars className="w-5 h-5" />
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer Enxuto */}
      <div
        className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-50 transition-opacity duration-300 md:hidden ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileOpen(false)}
      />

      <aside
        className={`fixed top-0 right-0 h-full w-72 max-w-[80vw] bg-obsidian-900 border-l border-white/10 p-6 z-50 flex flex-col justify-between transition-transform duration-300 ease-out md:hidden shadow-2xl ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-bronze-gradient flex items-center justify-center text-obsidian-950 font-display font-black text-xs">
                L
              </div>
              <span className="font-display font-bold text-base text-white">
                LUMEN<span className="text-bronze-400">&CO.</span>
              </span>
            </div>
            <button
              onClick={() => setMobileOpen(false)}
              className="p-1.5 rounded-full text-sand-400 hover:text-white hover:bg-white/5"
            >
              <FaXmark className="w-4 h-4" />
            </button>
          </div>

          <nav className="flex flex-col gap-4">
            <Link
              href="#sobre"
              onClick={() => setMobileOpen(false)}
              className="text-xs uppercase tracking-wider font-semibold text-sand-300 hover:text-bronze-400 py-1"
            >
              O Ateliê & Fundadores
            </Link>
            <Link
              href="#servicos"
              onClick={() => setMobileOpen(false)}
              className="text-xs uppercase tracking-wider font-semibold text-sand-300 hover:text-bronze-400 py-1"
            >
              Menu de Procedimentos
            </Link>
            <Link
              href="#galeria"
              onClick={() => setMobileOpen(false)}
              className="text-xs uppercase tracking-wider font-semibold text-sand-300 hover:text-bronze-400 py-1"
            >
              Portfólio & Relatos
            </Link>
            <Link
              href="#visita"
              onClick={() => setMobileOpen(false)}
              className="text-xs uppercase tracking-wider font-semibold text-sand-300 hover:text-bronze-400 py-1"
            >
              Visita & Horários
            </Link>
          </nav>
        </div>

        <div className="pt-4 border-t border-white/10 flex flex-col gap-2.5">
          <button
            onClick={() => {
              setMobileOpen(false);
              setModalOpen(true);
            }}
            className="w-full py-3 rounded-xl bg-bronze-gradient text-obsidian-950 font-bold text-xs uppercase tracking-wider shadow-luxury-glow flex items-center justify-center gap-2"
          >
            <FaCalendarDays className="w-4 h-4 text-obsidian-950" />
            <span>Agendar Horário</span>
          </button>
          <p className="text-[11px] text-sand-500 text-center font-light">
            Av. Paulista, 1578 • Bela Vista
          </p>
        </div>
      </aside>

      <BookingModal open={modalOpen} onOpenChange={setModalOpen} />
    </>
  );
}
