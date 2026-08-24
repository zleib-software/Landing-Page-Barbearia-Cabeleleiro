"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { FaAward, FaCalendarDays, FaQuoteLeft } from "react-icons/fa6";
import { SITE_CONFIG, TeamMember } from "@/data/siteConfig";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/utils/gsap";
import { SpotlightCard } from "./SpotlightCard";
import { BookingModal } from "./BookingModal";

export function Team() {
  const containerRef = useRef<HTMLElement>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProf, setSelectedProf] = useState("qualquer");

  useGSAP(
    () => {
      gsap.from(".team-header", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          once: true,
        },
        opacity: 0,
        y: 15,
        duration: 0.6,
        ease: "power2.out",
      });

      gsap.from(".team-card", {
        scrollTrigger: {
          trigger: ".team-grid",
          start: "top 85%",
          once: true,
        },
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.5,
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
      <section ref={containerRef} className="py-24 sm:py-32 relative z-10 bg-midnight-950 border-t border-teal-500/10" id="equipe">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="team-header text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block text-xs uppercase tracking-widest font-semibold text-teal-400 mb-2.5">
              Corpo Técnico & Fundadores
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              Especialistas dedicados a <span className="text-teal-400 font-light italic">cada bancada</span>
            </h2>
            <p className="text-ice-400 text-sm sm:text-base mt-3 font-normal">
              Atendimento conduzido diretamente pelos fundadores responsáveis pela assinatura técnica do ateliê.
            </p>
          </div>

          <div className="team-grid grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">
            {SITE_CONFIG.team.map((member) => (
              <SpotlightCard
                key={member.id}
                className="team-card flex flex-col justify-between group hover:border-teal-500/40 transition-all duration-300 bg-midnight-850"
              >
                <div className="relative h-80 sm:h-96 w-full overflow-hidden shrink-0">
                  <Image
                    src={member.photo}
                    alt={member.name}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-midnight-950 via-midnight-950/25 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-1">
                      {member.name}
                    </h3>
                    <p className="text-teal-400 text-xs sm:text-sm font-semibold uppercase tracking-wider">
                      {member.role}
                    </p>
                  </div>
                </div>

                <div className="p-7 sm:p-8 flex flex-col flex-grow justify-between">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-midnight-900 border border-teal-500/20 text-xs text-ice-300 mb-4 font-medium">
                      <FaAward className="w-3.5 h-3.5 text-teal-400" />
                      <span>{member.experience}</span>
                    </div>

                    {/* Citação Pessoal */}
                    <div className="mb-4 p-3.5 rounded-xl bg-midnight-900/90 border-l-2 border-teal-400 text-ice-200 text-xs sm:text-sm italic flex gap-2">
                      <FaQuoteLeft className="w-3 h-3 text-teal-400 shrink-0 mt-0.5" />
                      <p>"{member.quote}"</p>
                    </div>

                    <p className="text-white text-sm font-semibold leading-relaxed mb-3">
                      {member.specialty}
                    </p>

                    <p className="text-ice-400 text-xs sm:text-sm leading-relaxed mb-6 font-normal">
                      {member.bio}
                    </p>
                  </div>

                  <button
                    onClick={() => handleBooking(member)}
                    className="btn-solid-primary w-full"
                  >
                    <FaCalendarDays className="w-4 h-4 mr-2" />
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
