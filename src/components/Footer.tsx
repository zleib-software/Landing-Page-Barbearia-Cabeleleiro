import Link from "next/link";
import { FaInstagram, FaFacebookF, FaLocationDot } from "react-icons/fa6";
import { SITE_CONFIG } from "@/data/siteConfig";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-light-200 dark:bg-dark-950 border-t border-light-300 dark:border-white/10 pt-16 pb-12 relative z-10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-light-300 dark:border-white/10">
          {/* Logo & Bio */}
          <div className="lg:col-span-5 space-y-4">
            <Link href="#inicio" className="flex items-center gap-3 inline-flex">
              <div className="w-10 h-10 rounded-lg bg-gold-gradient flex items-center justify-center text-dark-950 font-display font-black text-xl shadow-gold-glow">
                L
              </div>
              <span className="font-display font-bold text-2xl text-light-950 dark:text-white tracking-wide">
                LUMEN<span className="gold-gradient-text">&CO.</span>
              </span>
            </Link>
            <p className="text-light-600 dark:text-gray-400 text-sm max-w-sm leading-relaxed">
              O mais exclusivo estúdio de barbearia, cuidados masculinos e visagismo da Av. Paulista. Pontualidade, técnica e sofisticação para o homem moderno.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={SITE_CONFIG.contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-light-300/80 dark:bg-white/5 border border-light-400/50 dark:border-white/10 flex items-center justify-center text-light-800 dark:text-gray-300 hover:text-gold-600 dark:hover:text-gold-400 hover:border-gold-500/50 transition-all hover:scale-110"
                aria-label="Instagram"
              >
                <FaInstagram className="w-5 h-5" />
              </a>
              <a
                href={SITE_CONFIG.contact.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-light-300/80 dark:bg-white/5 border border-light-400/50 dark:border-white/10 flex items-center justify-center text-light-800 dark:text-gray-300 hover:text-gold-600 dark:hover:text-gold-400 hover:border-gold-500/50 transition-all hover:scale-110"
                aria-label="Facebook"
              >
                <FaFacebookF className="w-4 h-4" />
              </a>
              <a
                href={SITE_CONFIG.maps.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-light-300/80 dark:bg-white/5 border border-light-400/50 dark:border-white/10 flex items-center justify-center text-light-800 dark:text-gray-300 hover:text-gold-600 dark:hover:text-gold-400 hover:border-gold-500/50 transition-all hover:scale-110"
                aria-label="Google Maps"
              >
                <FaLocationDot className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links Rápidos */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-display font-bold text-light-950 dark:text-white text-base">
              Navegação
            </h4>
            <ul className="space-y-2 text-sm text-light-600 dark:text-gray-400">
              <li>
                <Link href="#experiencia" className="hover:text-gold-600 dark:hover:text-gold-400 transition-colors">
                  Experiência VIP
                </Link>
              </li>
              <li>
                <Link href="#servicos" className="hover:text-gold-600 dark:hover:text-gold-400 transition-colors">
                  Serviços & Preços
                </Link>
              </li>
              <li>
                <Link href="#galeria" className="hover:text-gold-600 dark:hover:text-gold-400 transition-colors">
                  Galeria de Estilos
                </Link>
              </li>
              <li>
                <Link href="#equipe" className="hover:text-gold-600 dark:hover:text-gold-400 transition-colors">
                  Nossos Especialistas
                </Link>
              </li>
              <li>
                <Link href="#localizacao" className="hover:text-gold-600 dark:hover:text-gold-400 transition-colors">
                  Localização & Horários
                </Link>
              </li>
              <li>
                <Link href="#faq" className="hover:text-gold-600 dark:hover:text-gold-400 transition-colors">
                  Dúvidas Frequentes
                </Link>
              </li>
            </ul>
          </div>

          {/* Horários & Atendimento */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-display font-bold text-light-950 dark:text-white text-base">
              Atendimento Exclusivo
            </h4>
            <div className="text-sm text-light-600 dark:text-gray-400 space-y-1.5 leading-relaxed">
              <p>Segunda a Quarta: 09h às 20h</p>
              <p>Quinta: 09h às 21h</p>
              <p>Sexta: 08h30 às 21h30</p>
              <p>Sábado: 08h30 às 20h</p>
              <p className="text-xs text-gold-600 dark:text-gold-400 pt-1 font-semibold">
                Valet cortesia no local para clientes agendados.
              </p>
            </div>
          </div>
        </div>

        {/* Linha Inferior com Copyright e Disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-light-500 dark:text-gray-500">
          <p>
            © {currentYear} Lumen & Co. Barber & Studio. Todos os direitos reservados.
          </p>
          <p className="text-light-400 dark:text-gray-600 text-center sm:text-right">
            Projeto conceitual — Lumen & Co. Barber & Studio.
          </p>
        </div>
      </div>
    </footer>
  );
}
