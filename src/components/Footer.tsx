import Link from "next/link";
import { FaInstagram, FaFacebookF, FaLocationDot } from "react-icons/fa6";
import { SITE_CONFIG } from "@/data/siteConfig";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-midnight-950 border-t border-babyblue-400/10 pt-16 pb-10 relative z-10 text-ice-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-10 border-b border-babyblue-400/10 items-start">
          
          {/* Logo & Bio */}
          <div className="lg:col-span-5 space-y-3">
            <Link href="#inicio" className="flex items-center gap-2.5 inline-flex">
              <div className="w-8 h-8 rounded bg-babyblue-400 flex items-center justify-center text-midnight-950 font-black text-base shadow-md">
                Z
              </div>
              <span className="font-display font-bold text-xl text-white tracking-wider">
                ZLEIB<span className="text-babyblue-300">BARBER</span>
              </span>
            </Link>
            <p className="text-ice-400 text-xs sm:text-sm max-w-sm leading-relaxed font-light">
              Ateliê de alfaiataria capilar e hair studio autoral na Av. Paulista, 1578. Atendimento pontual com hora marcada e hospitalidade refinada.
            </p>
            <div className="flex items-center gap-2.5 pt-1">
              <a
                href={SITE_CONFIG.contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded bg-midnight-900 border border-babyblue-400/20 flex items-center justify-center text-ice-300 hover:text-white hover:border-babyblue-400 hover:bg-babyblue-400/10 transition-all hover:scale-110"
                aria-label="Instagram"
              >
                <FaInstagram className="w-4 h-4" />
              </a>
              <a
                href={SITE_CONFIG.contact.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded bg-midnight-900 border border-babyblue-400/20 flex items-center justify-center text-ice-300 hover:text-white hover:border-babyblue-400 hover:bg-babyblue-400/10 transition-all hover:scale-110"
                aria-label="Facebook"
              >
                <FaFacebookF className="w-3.5 h-3.5" />
              </a>
              <a
                href={SITE_CONFIG.maps.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded bg-midnight-900 border border-babyblue-400/20 flex items-center justify-center text-ice-300 hover:text-white hover:border-babyblue-400 hover:bg-babyblue-400/10 transition-all hover:scale-110"
                aria-label="Google Maps"
              >
                <FaLocationDot className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Links Rápidos */}
          <div className="lg:col-span-3 space-y-2.5">
            <h4 className="font-display font-bold text-white text-sm">
              Navegação
            </h4>
            <ul className="space-y-1.5 text-xs uppercase tracking-wider text-ice-400 font-medium">
              <li>
                <Link href="#sobre" className="hover:text-babyblue-300 transition-colors">
                  O Ateliê & Fundadores
                </Link>
              </li>
              <li>
                <Link href="#servicos" className="hover:text-babyblue-300 transition-colors">
                  Menu de Procedimentos
                </Link>
              </li>
              <li>
                <Link href="#galeria" className="hover:text-babyblue-300 transition-colors">
                  Portfólio & Relatos
                </Link>
              </li>
              <li>
                <Link href="#visita" className="hover:text-babyblue-300 transition-colors">
                  Visita & Horários
                </Link>
              </li>
            </ul>
          </div>

          {/* Horários */}
          <div className="lg:col-span-4 space-y-2.5">
            <h4 className="font-display font-bold text-white text-sm">
              Atendimento com Hora Marcada
            </h4>
            <div className="text-xs text-ice-400 space-y-1 font-light leading-relaxed">
              <p>Segunda a Quarta: 09h às 20h</p>
              <p>Quinta: 09h às 21h • Sexta: 08h30 às 21h30</p>
              <p>Sábado: 08h30 às 20h</p>
              <p className="text-babyblue-300 pt-1 font-medium">
                Valet cortesia no local para clientes em atendimento.
              </p>
            </div>
          </div>

        </div>

        {/* Linha Inferior */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-ice-500 font-light">
          <p>
            © {currentYear} Zleib Barber • Ateliê & Hair Studio. CNPJ 42.189.304/0001-82.
          </p>
          <p className="text-ice-500 text-center sm:text-right">
            Av. Paulista, 1578 • Bela Vista, São Paulo - SP
          </p>
        </div>
      </div>
    </footer>
  );
}
