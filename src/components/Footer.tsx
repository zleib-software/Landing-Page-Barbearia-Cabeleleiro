import Link from "next/link";
import { Instagram, Facebook, MapPin } from "lucide-react";
import { SITE_CONFIG } from "@/data/siteConfig";

export function Footer() {
  return (
    <footer className="bg-light-150 dark:bg-dark-950 border-t border-light-300 dark:border-white/10 pt-20 pb-12 relative z-10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          {/* Coluna 1: Marca & Redes */}
          <div className="lg:col-span-4">
            <Link href="#inicio" className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gold-gradient flex items-center justify-center text-dark-950 font-display font-black text-xl shadow-gold-glow">
                L
              </div>
              <span className="font-display font-extrabold text-2xl text-light-950 dark:text-white tracking-wide">
                LUMEN<span className="gold-gradient-text">&CO.</span>
              </span>
            </Link>
            <p className="text-light-600 dark:text-gray-400 text-sm leading-relaxed mb-6 max-w-sm font-normal">
              A união perfeita entre a tradição da barbearia clássica e o requinte do moderno hair studio. Cuidando da sua imagem com maestria.
            </p>
            <div className="flex gap-3">
              <a
                href={SITE_CONFIG.contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-light-200/80 dark:bg-white/5 border border-light-300 dark:border-white/10 flex items-center justify-center text-light-700 dark:text-gray-400 hover:text-dark-950 hover:bg-gold-gradient hover:border-transparent transition-all shadow-sm"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={SITE_CONFIG.contact.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-light-200/80 dark:bg-white/5 border border-light-300 dark:border-white/10 flex items-center justify-center text-light-700 dark:text-gray-400 hover:text-dark-950 hover:bg-gold-gradient hover:border-transparent transition-all shadow-sm"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={SITE_CONFIG.maps.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-light-200/80 dark:bg-white/5 border border-light-300 dark:border-white/10 flex items-center justify-center text-light-700 dark:text-gray-400 hover:text-dark-950 hover:bg-gold-gradient hover:border-transparent transition-all shadow-sm"
                aria-label="Google Maps"
              >
                <MapPin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Coluna 2: Navegação */}
          <div className="lg:col-span-2">
            <h4 className="font-display font-bold text-light-950 dark:text-white text-base mb-6">Navegação</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="#experiencia" className="text-light-600 hover:text-gold-700 dark:text-gray-400 dark:hover:text-gold-400 transition-colors">
                  Experiência VIP
                </Link>
              </li>
              <li>
                <Link href="#servicos" className="text-light-600 hover:text-gold-700 dark:text-gray-400 dark:hover:text-gold-400 transition-colors">
                  Serviços & Preços
                </Link>
              </li>
              <li>
                <Link href="#galeria" className="text-light-600 hover:text-gold-700 dark:text-gray-400 dark:hover:text-gold-400 transition-colors">
                  Galeria de Estilos
                </Link>
              </li>
              <li>
                <Link href="#equipe" className="text-light-600 hover:text-gold-700 dark:text-gray-400 dark:hover:text-gold-400 transition-colors">
                  Nossos Mestres
                </Link>
              </li>
              <li>
                <Link href="#faq" className="text-light-600 hover:text-gold-700 dark:text-gray-400 dark:hover:text-gold-400 transition-colors">
                  Dúvidas Frequentes
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna 3: Serviços Populares */}
          <div className="lg:col-span-3">
            <h4 className="font-display font-bold text-light-950 dark:text-white text-base mb-6">Procedimentos VIP</h4>
            <ul className="space-y-3 text-sm text-light-600 dark:text-gray-400">
              <li>Corte Signature & Fade</li>
              <li>Barboterapia com Toalha Quente</li>
              <li>Combo Royal Executivo</li>
              <li>Mechas & Balayage Glow</li>
              <li>Spa Capilar & Nutrição Profunda</li>
            </ul>
          </div>

          {/* Coluna 4: Localização & Status */}
          <div className="lg:col-span-3">
            <h4 className="font-display font-bold text-light-950 dark:text-white text-base mb-6">Onde Estamos</h4>
            <p className="text-light-600 dark:text-gray-400 text-sm leading-relaxed mb-4 font-normal">
              {SITE_CONFIG.contact.address}<br />
              {SITE_CONFIG.contact.cityState} • CEP {SITE_CONFIG.contact.cep}
            </p>
            <p className="text-xs text-gold-700 dark:text-gold-400 font-semibold mb-4">
              WhatsApp: {SITE_CONFIG.contact.phoneFormatted}
            </p>
            <a
              href="#localizacao"
              className="inline-block px-5 py-2.5 rounded-xl bg-light-200/80 dark:bg-white/5 hover:bg-gold-500/15 text-gold-800 dark:text-gold-300 hover:text-gold-950 dark:hover:text-white border border-gold-500/40 dark:border-gold-500/30 text-xs font-bold transition-all shadow-sm"
            >
              Ver no Google Maps
            </a>
          </div>
        </div>

        <div className="pt-8 border-t border-light-300 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-light-500 dark:text-gray-500">
          <p>© {new Date().getFullYear()} LUMEN & CO. Barber & Studio. Todos os direitos reservados.</p>
          <p>Landing Page de Alta Conversão com Modo Claro & Escuro</p>
        </div>
      </div>
    </footer>
  );
}
