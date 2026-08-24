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
            ? "glass-nav py-3 shadow-xl"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo Minimalista em Azul Bebê */}
          <Link href="#inicio" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded bg-babyblue-400 flex items-center justify-center text-midnight-950 font-black text-sm group-hover:scale-105 transition-transform shadow-md">
              L
            </div>
            <span className="font-display font-bold text-lg sm:text-xl text-white tracking-wider">
              LUMEN<span className="text-babyblue-300">&CO.</span>
            </span>
          </Link>

          {/* Links Desktop */}
          <nav className="hidden md:flex items-center gap-7 lg:gap-8">
            <Link href="#sobre" className="text-ice-300 hover:text-babyblue-300 text-xs uppercase tracking-widest font-bold transition-colors">
              O Ateliê
            </Link>
            <Link href="#servicos" className="text-ice-300 hover:text-babyblue-300 text-xs uppercase tracking-widest font-bold transition-colors">
              Procedimentos
            </Link>
            <Link href="#galeria" className="text-ice-300 hover:text-babyblue-300 text-xs uppercase tracking-widest font-bold transition-colors">
              Portfólio & Relatos
            </Link>
            <Link href="#visita" className="text-ice-300 hover:text-babyblue-300 text-xs uppercase tracking-widest font-bold transition-colors">
              Visita & Horários
            </Link>
          </nav>

          {/* Status & CTA Header */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded bg-midnight-900 border border-babyblue-400/20 text-xs font-semibold">
              <span className={`w-2 h-2 rounded-full ${isOpenNow ? "bg-babyblue-300 animate-pulse" : "bg-ice-500"}`} />
              <span className="text-ice-300">{statusText}</span>
            </div>

            <button
              onClick={() => setModalOpen(true)}
              className="btn-solid-primary !py-2 !px-4 !text-[11px]"
            >
              <FaCalendarDays className="w-3.5 h-3.5 mr-1.5" />
              <span>Agendar</span>
            </button>

            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden p-2 rounded bg-midnight-900 text-ice-200 hover:text-white border border-babyblue-400/20"
              aria-label="Abrir menu"
            >
              <FaBars className="w-5 h-5" />
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 bg-black/85 backdrop-blur-sm z-50 transition-opacity duration-300 md:hidden ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileOpen(false)}
      />

      <aside
        className={`fixed top-0 right-0 h-full w-72 max-w-[80vw] bg-midnight-900 border-l border-babyblue-400/20 p-6 z-50 flex flex-col justify-between transition-transform duration-300 ease-out md:hidden shadow-2xl ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-babyblue-400/10 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded bg-babyblue-400 flex items-center justify-center text-midnight-950 font-black text-xs">
                L
              </div>
              <span className="font-display font-bold text-base text-white">
                LUMEN<span className="text-babyblue-300">&CO.</span>
              </span>
            </div>
            <button
              onClick={() => setMobileOpen(false)}
              className="p-1.5 rounded text-ice-400 hover:text-white hover:bg-white/5"
            >
              <FaXmark className="w-4 h-4" />
            </button>
          </div>

          <nav className="flex flex-col gap-4">
            <Link
              href="#sobre"
              onClick={() => setMobileOpen(false)}
              className="text-xs uppercase tracking-wider font-bold text-ice-300 hover:text-babyblue-300 py-1"
            >
              O Ateliê & Fundadores
            </Link>
            <Link
              href="#servicos"
              onClick={() => setMobileOpen(false)}
              className="text-xs uppercase tracking-wider font-bold text-ice-300 hover:text-babyblue-300 py-1"
            >
              Menu de Procedimentos
            </Link>
            <Link
              href="#galeria"
              onClick={() => setMobileOpen(false)}
              className="text-xs uppercase tracking-wider font-bold text-ice-300 hover:text-babyblue-300 py-1"
            >
              Portfólio & Relatos
            </Link>
            <Link
              href="#visita"
              onClick={() => setMobileOpen(false)}
              className="text-xs uppercase tracking-wider font-bold text-ice-300 hover:text-babyblue-300 py-1"
            >
              Visita & Horários
            </Link>
          </nav>
        </div>

        <div className="pt-4 border-t border-babyblue-400/10 flex flex-col gap-2.5">
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
            Av. Paulista, 1578 • Bela Vista
          </p>
        </div>
      </aside>

      <BookingModal open={modalOpen} onOpenChange={setModalOpen} />
    </>
  );
}
