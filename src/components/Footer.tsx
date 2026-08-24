import Link from "next/link";
import { FaInstagram, FaFacebookF, FaLocationDot } from "react-icons/fa6";
import { SITE_CONFIG } from "@/data/siteConfig";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-midnight-950 border-t border-teal-500/10 pt-16 pb-12 relative z-10 text-ice-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-teal-500/10 items-start">
          
          {/* Logo & Bio */}
          <div className="lg:col-span-5 space-y-4">
            <Link href="#inicio" className="flex items-center gap-2.5 inline-flex">
              <div className="w-8 h-8 rounded-lg bg-teal-500 flex items-center justify-center text-midnight-950 font-black text-base shadow-md">
                Z
              </div>
              <span className="font-display font-bold text-xl text-white tracking-wider">
                ZLEIB<span className="text-teal-400 font-light ml-1">BARBER</span>
              </span>
            </Link>
            <p className="text-ice-400 text-xs sm:text-sm max-w-sm leading-relaxed font-normal">
              Ateliê de alfaiataria capilar na tesoura, barboterapia tradicional com toalha aquecida e hair studio autoral na Av. Paulista, 1578. Atendimento exclusivo com hora marcada.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a
                href={SITE_CONFIG.contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-midnight-900 border border-teal-500/20 flex items-center justify-center text-ice-300 hover:text-white hover:border-teal-400 hover:bg-teal-500/10 transition-all hover:scale-105"
                aria-label="Instagram Zleib Barber"
              >
                <FaInstagram className="w-4 h-4" />
              </a>
              <a
                href={SITE_CONFIG.contact.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-midnight-900 border border-teal-500/20 flex items-center justify-center text-ice-300 hover:text-white hover:border-teal-400 hover:bg-teal-500/10 transition-all hover:scale-105"
                aria-label="Facebook Zleib Barber"
              >
                <FaFacebookF className="w-3.5 h-3.5" />
              </a>
              <a
                href={SITE_CONFIG.maps.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-midnight-900 border border-teal-500/20 flex items-center justify-center text-ice-300 hover:text-white hover:border-teal-400 hover:bg-teal-500/10 transition-all hover:scale-105"
                aria-label="Google Maps Rota"
              >
                <FaLocationDot className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Links Rápidos */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-display font-bold text-white text-base">
              Navegação
            </h4>
            <ul className="space-y-2 text-xs uppercase tracking-wider text-ice-400 font-medium">
              <li>
                <Link href="#sobre" className="hover:text-teal-300 transition-colors">
                  O Ateliê & Fundadores
                </Link>
              </li>
              <li>
                <Link href="#rituais" className="hover:text-teal-300 transition-colors">
                  Diferenciais de Alto Padrão
                </Link>
              </li>
              <li>
                <Link href="#servicos" className="hover:text-teal-300 transition-colors">
                  Menu de Procedimentos
                </Link>
              </li>
              <li>
                <Link href="#galeria" className="hover:text-teal-300 transition-colors">
                  Portfólio & Relatos
                </Link>
              </li>
              <li>
                <Link href="#equipe" className="hover:text-teal-300 transition-colors">
                  Especialistas
                </Link>
              </li>
              <li>
                <Link href="#visita" className="hover:text-teal-300 transition-colors">
                  Visita & Horários
                </Link>
              </li>
            </ul>
          </div>

          {/* Horários */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-display font-bold text-white text-base">
              Atendimento com Hora Marcada
            </h4>
            <div className="text-xs text-ice-400 space-y-1.5 font-normal leading-relaxed">
              <p>Segunda a Quarta: 09h às 20h</p>
              <p>Quinta: 09h às 21h • Sexta: 08h30 às 21h30</p>
              <p>Sábado: 08h30 às 20h</p>
              <p>Domingo: Atendimentos privativos e noivos sob reserva</p>
              <p className="text-teal-300 pt-1 font-semibold">
                Valet com manobrista cortesia no próprio edifício.
              </p>
            </div>
          </div>

        </div>

        {/* Linha Inferior */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-ice-400 font-normal">
          <p>
            © {currentYear} Zleib Barber • Ateliê & Hair Studio. Todos os direitos reservados.
          </p>
          <p className="text-ice-400 text-center sm:text-right">
            Av. Paulista, 1578 • Bela Vista, São Paulo - SP
          </p>
        </div>
      </div>
    </footer>
  );
}
