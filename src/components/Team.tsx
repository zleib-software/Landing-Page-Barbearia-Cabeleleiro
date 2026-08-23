"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MessageCircle, Award, Instagram } from "lucide-react";
import { SITE_CONFIG, TeamMember } from "@/data/siteConfig";
import { formatTeamMessage, openWhatsApp } from "@/utils/whatsapp";

export function Team() {
  const handleTeamBooking = (member: TeamMember) => {
    const msg = formatTeamMessage(member.name, member.role);
    openWhatsApp(msg);
  };

  return (
    <section className="py-24 relative z-10" id="equipe">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-xs uppercase tracking-widest font-bold text-gold-700 dark:text-gold-400 bg-gold-500/10 border border-gold-500/30 px-4 py-1.5 rounded-full mb-4">
            Nossa Bancada de Mestres
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-light-950 dark:text-white mb-4">
            Profissionais <span className="gold-gradient-text">Especialistas</span>
          </h2>
          <p className="text-light-600 dark:text-gray-400 text-base sm:text-lg">
            Mestres barbeiros e visagistas premiados, sempre prontos para entregar o melhor acabamento e consultoria técnica.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {SITE_CONFIG.team.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              whileHover={{ y: -6 }}
              className="glass-card rounded-3xl overflow-hidden border border-light-300 dark:border-white/10 hover:border-gold-500/60 hover:shadow-gold-glow-light dark:hover:shadow-gold-glow flex flex-col group transition-all"
            >
              <div className="relative h-80 w-full overflow-hidden">
                <Image
                  src={member.photo}
                  alt={member.name}
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-8 flex flex-col flex-grow justify-between">
                <div>
                  <h3 className="font-display text-2xl font-bold text-light-950 dark:text-white mb-1">
                    {member.name}
                  </h3>
                  <div className="text-gold-600 dark:text-gold-400 text-sm font-bold mb-3">
                    {member.role}
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-light-200 dark:bg-white/5 border border-light-300 dark:border-white/10 text-xs text-light-800 dark:text-gray-300 mb-4 font-semibold">
                    <Award className="w-3.5 h-3.5 text-gold-600 dark:text-gold-400" />
                    <span>{member.experience}</span>
                  </div>

                  <p className="text-light-700 dark:text-gray-400 text-sm leading-relaxed mb-6 font-normal">
                    {member.specialty}
                  </p>
                </div>

                <button
                  onClick={() => handleTeamBooking(member)}
                  className="w-full py-3.5 rounded-xl bg-gold-gradient text-dark-950 font-bold text-sm shadow-gold-glow flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all btn-shine"
                >
                  <MessageCircle className="w-4 h-4 fill-dark-950" />
                  <span>Agendar com {member.name.split(" ")[0]}</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
