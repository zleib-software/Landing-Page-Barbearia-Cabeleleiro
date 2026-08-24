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
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "glass-nav py-3.5 shadow-2xl"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo Minimalista ZLEIB BARBER */}
          <Link href="#inicio" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-teal-500 flex items-center justify-center text-midnight-950 font-black text-sm group-hover:scale-105 transition-transform shadow-md">
              Z
            </div>
            <span className="font-display font-bold text-xl sm:text-2xl text-white tracking-wider">
              ZLEIB<span className="text-teal-400 font-light ml-1">BARBER</span>
            </span>
          </Link>

          {/* Links Desktop - Tipografia Limpa Sem Emojis */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#sobre" className="text-ice-300 hover:text-teal-300 text-xs uppercase tracking-widest font-semibold transition-colors">
              O Ateliê
            </Link>
            <Link href="#rituais" className="text-ice-300 hover:text-teal-300 text-xs uppercase tracking-widest font-semibold transition-colors">
              Diferenciais
            </Link>
            <Link href="#servicos" className="text-ice-300 hover:text-teal-300 text-xs uppercase tracking-widest font-semibold transition-colors">
              Procedimentos
            </Link>
            <Link href="#galeria" className="text-ice-300 hover:text-teal-300 text-xs uppercase tracking-widest font-semibold transition-colors">
              Portfólio
            </Link>
            <Link href="#equipe" className="text-ice-300 hover:text-teal-300 text-xs uppercase tracking-widest font-semibold transition-colors">
              Especialistas
            </Link>
            <Link href="#visita" className="text-ice-300 hover:text-teal-300 text-xs uppercase tracking-widest font-semibold transition-colors">
              Localização
            </Link>
          </nav>

          {/* Status Discreto & CTA Único */}
          <div className="flex items-center gap-3.5">
            {/* Status Indicator (Discreto badge, não botão) */}
            <div className="hidden lg:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-midnight-850 border border-teal-500/20 text-xs font-medium">
              <span className={`w-2 h-2 rounded-full ${isOpenNow ? "bg-teal-400 animate-pulse" : "bg-ice-500"}`} />
              <span className="text-ice-300">{statusText}</span>
            </div>

            {/* CTA Primário */}
            <button
              onClick={() => setModalOpen(true)}
              className="btn-solid-primary !py-2.5 !px-4 !text-xs"
            >
              <FaCalendarDays className="w-3.5 h-3.5 mr-1.5" />
              <span>Agendar Horário</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden p-2 rounded-lg bg-midnight-850 text-ice-200 hover:text-white border border-teal-500/20"
              aria-label="Abrir menu de navegação"
            >
              <FaBars className="w-5 h-5" />
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 bg-black/80 backdrop-blur-md z-50 transition-opacity duration-300 md:hidden ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileOpen(false)}
      />

      <aside
        className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-midnight-900 border-l border-teal-500/20 p-6 z-50 flex flex-col justify-between transition-transform duration-300 ease-out md:hidden shadow-2xl ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-teal-500/15 mb-6">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-teal-500 flex items-center justify-center text-midnight-950 font-black text-sm">
                Z
              </div>
              <span className="font-display font-bold text-lg text-white">
                ZLEIB<span className="text-teal-400 font-light ml-1">BARBER</span>
              </span>
            </div>
            <button
              onClick={() => setMobileOpen(false)}
              className="p-2 rounded-lg text-ice-400 hover:text-white hover:bg-white/5"
              aria-label="Fechar menu"
            >
              <FaXmark className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex flex-col gap-4">
            <Link
              href="#sobre"
              onClick={() => setMobileOpen(false)}
              className="text-xs uppercase tracking-widest font-semibold text-ice-300 hover:text-teal-300 py-1.5 transition-colors"
            >
              O Ateliê & Fundadores
            </Link>
            <Link
              href="#rituais"
              onClick={() => setMobileOpen(false)}
              className="text-xs uppercase tracking-widest font-semibold text-ice-300 hover:text-teal-300 py-1.5 transition-colors"
            >
              Diferenciais de Alto Padrão
            </Link>
            <Link
              href="#servicos"
              onClick={() => setMobileOpen(false)}
              className="text-xs uppercase tracking-widest font-semibold text-ice-300 hover:text-teal-300 py-1.5 transition-colors"
            >
              Menu de Procedimentos
            </Link>
            <Link
              href="#galeria"
              onClick={() => setMobileOpen(false)}
              className="text-xs uppercase tracking-widest font-semibold text-ice-300 hover:text-teal-300 py-1.5 transition-colors"
            >
              Portfólio & Relatos
            </Link>
            <Link
              href="#equipe"
              onClick={() => setMobileOpen(false)}
              className="text-xs uppercase tracking-widest font-semibold text-ice-300 hover:text-teal-300 py-1.5 transition-colors"
            >
              Especialistas
            </Link>
            <Link
              href="#visita"
              onClick={() => setMobileOpen(false)}
              className="text-xs uppercase tracking-widest font-semibold text-ice-300 hover:text-teal-300 py-1.5 transition-colors"
            >
              Visita & Horários
            </Link>
          </nav>
        </div>

        <div className="pt-4 border-t border-teal-500/15 flex flex-col gap-3">
          <div className="flex items-center gap-2 text-xs font-medium text-ice-300">
            <span className={`w-2 h-2 rounded-full ${isOpenNow ? "bg-teal-400 animate-pulse" : "bg-ice-500"}`} />
            <span>{statusText}</span>
          </div>

          <button
            onClick={() => {
              setMobileOpen(false);
              setModalOpen(true);
            }}
            className="btn-solid-primary w-full"
          >
            <FaCalendarDays className="w-4 h-4 mr-2" />
            <span>Agendar Horário</span>
          </button>

          <p className="text-[11px] text-ice-400 text-center font-light">
            Av. Paulista, 1578 • Bela Vista, SP
          </p>
        </div>
      </aside>

      <BookingModal open={modalOpen} onOpenChange={setModalOpen} />
    </>
  );
}
