import Link from "next/link";
import { Instagram, Facebook, MapPin } from "lucide-react";
import { SITE_CONFIG } from "@/data/siteConfig";

export function Footer() {
  return (
    <footer className="bg-light-150 dark:bg-dark-950 border-t border-light-300 dark:border-white/10 pt-16 pb-12 relative z-10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-12">
          {/* Coluna 1: Marca & Redes */}
          <div className="lg:col-span-4">
            <Link href="#inicio" className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-lg bg-gold-gradient flex items-center justify-center text-dark-950 font-display font-black text-lg shadow-gold-glow">
                L
              </div>
              <span className="font-display font-extrabold text-xl text-light-950 dark:text-white tracking-wide">
                LUMEN<span className="gold-gradient-text">&CO.</span>
              </span>
            </Link>
            <p className="text-light-600 dark:text-gray-400 text-sm leading-relaxed mb-5 max-w-sm font-normal">
              Tradição da barbearia clássica e o requinte do moderno hair studio. Cuidado impecável com a sua presença.
            </p>
            <div className="flex gap-2.5">
              <a
                href={SITE_CONFIG.contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-light-200/80 dark:bg-white/5 border border-light-300 dark:border-white/10 flex items-center justify-center text-light-700 dark:text-gray-400 hover:text-dark-950 hover:bg-gold-gradient hover:border-transparent transition-all shadow-sm"
                aria-label="Instagram da Lumen & Co."
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={SITE_CONFIG.contact.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-light-200/80 dark:bg-white/5 border border-light-300 dark:border-white/10 flex items-center justify-center text-light-700 dark:text-gray-400 hover:text-dark-950 hover:bg-gold-gradient hover:border-transparent transition-all shadow-sm"
                aria-label="Facebook da Lumen & Co."
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={SITE_CONFIG.maps.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-light-200/80 dark:bg-white/5 border border-light-300 dark:border-white/10 flex items-center justify-center text-light-700 dark:text-gray-400 hover:text-dark-950 hover:bg-gold-gradient hover:border-transparent transition-all shadow-sm"
                aria-label="Localização no Google Maps"
              >
                <MapPin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Coluna 2: Navegação */}
          <div className="lg:col-span-2">
            <h4 className="font-display font-bold text-light-950 dark:text-white text-sm mb-5">Navegação</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="#inicio" className="text-light-600 hover:text-gold-700 dark:text-gray-400 dark:hover:text-gold-400 transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link href="#servicos" className="text-light-600 hover:text-gold-700 dark:text-gray-400 dark:hover:text-gold-400 transition-colors">
                  Serviços & Preços
                </Link>
              </li>
              <li>
                <Link href="#galeria" className="text-light-600 hover:text-gold-700 dark:text-gray-400 dark:hover:text-gold-400 transition-colors">
                  Galeria de Resultados
                </Link>
              </li>
              <li>
                <Link href="#equipe" className="text-light-600 hover:text-gold-700 dark:text-gray-400 dark:hover:text-gold-400 transition-colors">
                  Profissionais
                </Link>
              </li>
              <li>
                <Link href="#localizacao" className="text-light-600 hover:text-gold-700 dark:text-gray-400 dark:hover:text-gold-400 transition-colors">
                  Localização
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna 3: Serviços Populares */}
          <div className="lg:col-span-3">
            <h4 className="font-display font-bold text-light-950 dark:text-white text-sm mb-5">Procedimentos</h4>
            <ul className="space-y-2.5 text-sm text-light-600 dark:text-gray-400">
              <li>Corte Signature & Fade</li>
              <li>Barboterapia com Toalha Quente</li>
              <li>Combo Royal Executivo</li>
              <li>Design de Mechas Glow</li>
              <li>Spa Capilar & Nutrição</li>
            </ul>
          </div>

          {/* Coluna 4: Localização & Status */}
          <div className="lg:col-span-3">
            <h4 className="font-display font-bold text-light-950 dark:text-white text-sm mb-5">Atendimento</h4>
            <p className="text-light-600 dark:text-gray-400 text-sm leading-relaxed mb-3 font-normal">
              {SITE_CONFIG.contact.address}<br />
              {SITE_CONFIG.contact.cityState}
            </p>
            <p className="text-xs text-gold-700 dark:text-gold-400 font-semibold mb-4">
              WhatsApp: {SITE_CONFIG.contact.phoneFormatted}
            </p>
            <a
              href="#agendamento-express"
              className="inline-block px-4 py-2 rounded-xl bg-gold-gradient text-dark-950 text-xs font-bold transition-all shadow-gold-glow hover:scale-105"
            >
              Agendar Horário
            </a>
          </div>
        </div>

        <div className="pt-6 border-t border-light-300 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-light-500 dark:text-gray-500">
          <p>© {new Date().getFullYear()} LUMEN & CO. Todos os direitos reservados.</p>
          <p className="text-gray-400 dark:text-gray-500">Projeto conceitual — Lumen & Co. Barber & Studio</p>
        </div>
      </div>
    </footer>
  );
}
