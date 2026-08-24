"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { FaAward, FaCalendarDays } from "react-icons/fa6";
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
      <section ref={containerRef} className="py-20 sm:py-24 relative z-10 bg-obsidian-950 border-t border-white/5" id="sobre">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header & Manifesto da Casa */}
          <div className="about-header text-center max-w-3xl mx-auto mb-14">
            <span className="inline-block text-xs uppercase tracking-widest font-bold text-bronze-400 mb-3">
              O Ateliê & Corpo Técnico
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              A precisão do ofício conduzida por quem <span className="bronze-text">fundou a casa</span>
            </h2>
            <p className="text-sand-300 text-sm sm:text-base leading-relaxed font-light mt-4">
              Fundada em 2021 na Av. Paulista, a <strong>Lumen & Co.</strong> reúne a tradição da alfaiataria capilar na tesoura à técnica contemporânea de visagismo e colorimetria segura. Atendimento exclusivo conduzido diretamente pelos fundadores.
            </p>
          </div>

          {/* Cards dos Fundadores / Mestres Lado a Lado */}
          <div className="about-founders-grid grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {SITE_CONFIG.team.map((member) => (
              <SpotlightCard
                key={member.id}
                className="flex flex-col justify-between group hover:border-bronze-500/40 transition-all duration-300"
              >
                <div className="relative h-72 sm:h-80 w-full overflow-hidden">
                  <Image
                    src={member.photo}
                    alt={member.name}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/20 to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5">
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-0.5">
                      {member.name}
                    </h3>
                    <p className="text-bronze-400 text-xs font-semibold">
                      {member.role}
                    </p>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow justify-between">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-sand-300 mb-3 font-light">
                      <FaAward className="w-3.5 h-3.5 text-bronze-400" />
                      <span>{member.experience}</span>
                    </div>

                    <p className="text-sand-200 text-xs sm:text-sm font-medium leading-relaxed mb-2">
                      {member.specialty}
                    </p>

                    <p className="text-sand-400 text-xs leading-relaxed mb-5 font-light">
                      {member.bio}
                    </p>
                  </div>

                  <button
                    onClick={() => handleBooking(member)}
                    className="w-full py-3 rounded-xl bg-bronze-gradient text-obsidian-950 font-bold text-xs uppercase tracking-wider shadow-luxury-glow flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all btn-shine"
                  >
                    <FaCalendarDays className="w-3.5 h-3.5 text-obsidian-950" />
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
