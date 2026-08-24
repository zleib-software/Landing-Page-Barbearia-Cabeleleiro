"use client";

import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { FaWhatsapp, FaXmark, FaScissors, FaUser, FaClock, FaShieldHalved } from "react-icons/fa6";
import { SITE_CONFIG } from "@/data/siteConfig";
import { formatBookingMessage, openWhatsApp } from "@/utils/whatsapp";

interface BookingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultService?: string;
  defaultProfessional?: string;
}

export function BookingModal({
  open,
  onOpenChange,
  defaultService = "corte-signature",
  defaultProfessional = "qualquer",
}: BookingModalProps) {
  const [service, setService] = useState(defaultService);
  const [professional, setProfessional] = useState(defaultProfessional);
  const [period, setPeriod] = useState("Proximo disponivel");
  const [clientName, setClientName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const serviceObj = SITE_CONFIG.services.find((s) => s.id === service);
    const serviceName = serviceObj ? `${serviceObj.title} (${serviceObj.price})` : "Corte Signature & Visagismo";

    let profName = "Primeiro especialista disponível";
    if (professional === "alex") profName = "Alexandre Souza (Mestre Barbeiro)";
    if (professional === "camila") profName = "Camila Torres (Hair Artist & Colorista)";

    const message = formatBookingMessage({
      service: serviceName,
      professional: profName,
      date: "Hoje / Próximo horário vago",
      period: period === "Proximo disponivel" ? "Mais rápido possível" : period,
      clientName: clientName.trim(),
    });

    openWhatsApp(message);
    onOpenChange(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 animate-in fade-in duration-300" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg p-6 sm:p-8 bg-obsidian-900 border border-bronze-500/30 rounded-3xl shadow-2xl z-50 text-sand-100 animate-in zoom-in-95 fade-in duration-200 focus:outline-none max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
            <div>
              <span className="text-[11px] uppercase tracking-widest font-bold text-bronze-400">
                Concierge de Atendimento
              </span>
              <Dialog.Title className="font-display text-2xl sm:text-3xl font-black text-white mt-0.5">
                Solicitar Agendamento
              </Dialog.Title>
            </div>
            <Dialog.Close className="p-2 rounded-full text-sand-400 hover:text-white hover:bg-white/5 transition-colors">
              <FaXmark className="w-5 h-5" />
            </Dialog.Close>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-sand-400 mb-1.5">
                Seu Nome (opcional)
              </label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Ex: Carlos Eduardo"
                className="w-full bg-obsidian-950 border border-white/10 focus:border-bronze-500 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-all placeholder:text-sand-600"
              />
            </div>

            <div>
              <label className="flex items-center gap-1.5 text-xs font-semibold text-sand-400 mb-1.5">
                <FaScissors className="w-3.5 h-3.5 text-bronze-400" />
                Procedimento Desejado
              </label>
              <select
                value={service}
                onChange={(e) => setService(e.target.value)}
                required
                className="w-full bg-obsidian-950 border border-white/10 focus:border-bronze-500 rounded-xl px-4 py-3 text-sm text-white font-medium focus:outline-none transition-all"
              >
                {SITE_CONFIG.services.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.title} — {s.price}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="flex items-center gap-1.5 text-xs font-semibold text-sand-400 mb-1.5">
                <FaUser className="w-3.5 h-3.5 text-bronze-400" />
                Especialista
              </label>
              <select
                value={professional}
                onChange={(e) => setProfessional(e.target.value)}
                className="w-full bg-obsidian-950 border border-white/10 focus:border-bronze-500 rounded-xl px-4 py-3 text-sm text-white font-medium focus:outline-none transition-all"
              >
                <option value="qualquer">Primeiro especialista disponível</option>
                <option value="alex">Alexandre Souza (Mestre Barbeiro)</option>
                <option value="camila">Camila Torres (Hair Artist & Colorista)</option>
              </select>
            </div>

            <div>
              <label className="flex items-center gap-1.5 text-xs font-semibold text-sand-400 mb-1.5">
                <FaClock className="w-3.5 h-3.5 text-bronze-400" />
                Turno Preferido
              </label>
              <select
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className="w-full bg-obsidian-950 border border-white/10 focus:border-bronze-500 rounded-xl px-4 py-3 text-sm text-white font-medium focus:outline-none transition-all"
              >
                <option value="Proximo disponivel">Próximo horário vago hoje</option>
                <option value="Manhã (09h às 12h)">Manhã (09h às 12h)</option>
                <option value="Tarde (13h às 17h)">Tarde (13h às 17h)</option>
                <option value="Noite (18h às 21h)">Noite (18h às 21h)</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-wa hover:bg-wa-dark text-white font-black text-sm shadow-wa-glow flex items-center justify-center gap-2.5 transition-all hover:scale-[1.02] active:scale-[0.98] btn-shine mt-4"
            >
              <FaWhatsapp className="w-5 h-5 text-white" />
              <span>Enviar Pedido para a Recepção no WhatsApp</span>
            </button>

            <div className="flex items-center justify-center gap-2 text-xs text-sand-500 pt-2 font-medium">
              <FaShieldHalved className="w-3.5 h-3.5 text-emerald-500" />
              <span>Confirmação em tempo real com a recepção</span>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
