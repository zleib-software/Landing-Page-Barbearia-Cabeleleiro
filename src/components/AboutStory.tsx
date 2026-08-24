"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { FaAward, FaCalendarDays, FaQuoteLeft } from "react-icons/fa6";
import { SITE_CONFIG, TeamMember } from "@/data/siteConfig";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/utils/gsap";
import { SpotlightCard } from "./SpotlightCard";
import { BookingModal } from "./BookingModal";

export function AboutStory() {
  const containerRef = useRef<HTMLElement>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProf, setSelectedProf] = useState("qualquer");

  useGSAP(
    () => {
      gsap.from(".about-header", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          once: true,
        },
        opacity: 0,
        y: 15,
        duration: 0.6,
      });

      gsap.from(".about-founders-grid", {
        scrollTrigger: {
          trigger: ".about-founders-grid",
          start: "top 85%",
          once: true,
        },
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power2.out",
      });
    },
    { scope: containerRef }
  );

  const handleBooking = (member: TeamMember) => {
    setSelectedProf(member.id === "alex-souza" ? "alex" : "camila");
    setModalOpen(true);
  };

  return (
    <>
      <section ref={containerRef} className="py-24 sm:py-28 relative z-10 bg-midnight-950 border-t border-teal-500/10" id="sobre">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header & Manifesto da Casa */}
          <div className="about-header text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block text-xs uppercase tracking-widest font-semibold text-teal-400 mb-2.5">
              O Ateliê & Corpo Técnico
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              A precisão do ofício conduzida por quem <span className="text-teal-400 font-light italic">fundou a casa</span>
            </h2>
            <p className="text-ice-300 text-sm sm:text-base leading-relaxed font-normal mt-3.5">
              Fundada em 2021 na Av. Paulista, a <strong>Zleib Barber</strong> uniu a técnica milimétrica da alfaiataria capilar na tesoura à colorimetria segura e ao visagismo contemporâneo. Cada cliente é atendido individualmente, sem fila de espera ou rotatividade impessoal.
            </p>
          </div>

          {/* Cards dos Fundadores com Voz Própria e Citações */}
          <div className="about-founders-grid grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">
            {SITE_CONFIG.team.map((member) => (
              <SpotlightCard
                key={member.id}
                className="group hover:border-teal-500/40 transition-all duration-300 bg-midnight-850"
              >
                <div className="relative h-72 sm:h-80 w-full overflow-hidden shrink-0">
                  <Image
                    src={member.photo}
                    alt={member.name}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-midnight-950 via-midnight-950/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-display text-2xl font-bold text-white mb-0.5">
                      {member.name}
                    </h3>
                    <p className="text-teal-400 text-xs font-semibold uppercase tracking-wider">
                      {member.role}
                    </p>
                  </div>
                </div>

                <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between">
                  <div className="flex flex-col flex-1 mb-6">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-midnight-900 border border-teal-500/20 text-xs text-ice-300 mb-4 font-medium self-start">
                      <FaAward className="w-3.5 h-3.5 text-teal-400" />
                      <span>{member.experience}</span>
                    </div>

                    {/* Citação Pessoal de Assinatura */}
                    <div className="mb-4 p-3.5 rounded-xl bg-midnight-900/90 border-l-2 border-teal-400 text-ice-200 text-xs sm:text-sm italic flex gap-2">
                      <FaQuoteLeft className="w-3 h-3 text-teal-400 shrink-0 mt-0.5" />
                      <p>"{member.quote}"</p>
                    </div>

                    <p className="text-white text-xs sm:text-sm font-semibold leading-relaxed mb-2">
                      {member.specialty}
                    </p>

                    <p className="text-ice-400 text-xs leading-relaxed font-normal flex-1">
                      {member.bio}
                    </p>
                  </div>

                  <button
                    onClick={() => handleBooking(member)}
                    className="btn-solid-primary w-full mt-auto shrink-0"
                  >
                    <FaCalendarDays className="w-3.5 h-3.5 mr-2" />
                    <span>Agendar com {member.name.split(" ")[0]}</span>
                  </button>
                </div>
              </SpotlightCard>
            ))}
          </div>

        </div>
      </section>

      <BookingModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        defaultProfessional={selectedProf}
      />
    </>
  );
}
