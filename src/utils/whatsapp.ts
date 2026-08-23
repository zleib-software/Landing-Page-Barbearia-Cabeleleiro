import { SITE_CONFIG } from "@/data/siteConfig";

export interface BookingData {
  service: string;
  professional?: string;
  date?: string;
  period?: string;
  clientName?: string;
  notes?: string;
}

export function buildWhatsAppUrl(text: string, phone: string = SITE_CONFIG.whatsapp.phoneNumber): string {
  const cleanPhone = phone.replace(/\D/g, "");
  const encodedText = encodeURIComponent(text);
  return `https://wa.me/${cleanPhone}?text=${encodedText}`;
}

export function openWhatsApp(text: string, phone?: string): void {
  const url = buildWhatsAppUrl(text, phone);
  if (typeof window !== "undefined") {
    window.open(url, "_blank", "noopener,noreferrer");
  }
}

export function formatBookingMessage({ service, professional, date, period, clientName, notes }: BookingData): string {
  let msg = `*SOLICITAÇÃO DE AGENDAMENTO - ${SITE_CONFIG.businessName}*\n\n`;

  if (clientName && clientName.trim()) {
    msg += `*Cliente:* ${clientName.trim()}\n`;
  }

  if (service && service.trim()) {
    msg += `*Serviço desejado:* ${service.trim()}\n`;
  }

  if (professional && professional.trim() && professional !== "qualquer") {
    msg += `*Profissional de preferência:* ${professional.trim()}\n`;
  } else {
    msg += `*Profissional:* Qualquer disponível\n`;
  }

  if (date && date.trim()) {
    let dateDisplay = date;
    if (date.includes("-")) {
      const parts = date.split("-");
      if (parts.length === 3) {
        dateDisplay = `${parts[2]}/${parts[1]}/${parts[0]}`;
      }
    }
    msg += `*Data sugerida:* ${dateDisplay}\n`;
  }

  if (period && period.trim()) {
    msg += `*Período/Horário:* ${period.trim()}\n`;
  }

  if (notes && notes.trim()) {
    msg += `*Observações:* ${notes.trim()}\n`;
  }

  msg += `\n_Olá! Poderia confirmar se há disponibilidade para esse horário? Obrigado(a)!_`;
  return msg;
}

export function formatServiceMessage(serviceTitle: string, price?: string): string {
  let msg = `Olá! Gostaria de agendar o serviço: *${serviceTitle}*`;
  if (price) {
    msg += ` (${price})`;
  }
  msg += ` na *${SITE_CONFIG.businessName}*.\nQuais são os horários disponíveis para esta semana?`;
  return msg;
}

export function formatTeamMessage(name: string, role: string): string {
  return `Olá! Gostaria de verificar a agenda e marcar um horário com *${name}* (${role}) na *${SITE_CONFIG.businessName}*. Poderiam me informar os dias e horários livres?`;
}
