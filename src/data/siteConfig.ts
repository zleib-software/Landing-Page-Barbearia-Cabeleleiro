export interface ServiceItem {
  id: string;
  title: string;
  category: "barber" | "salon" | "spa";
  price: string;
  duration: string;
  description: string;
  image: string;
  popular?: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  experience: string;
  specialty: string;
  photo: string;
  instagram: string;
}

export interface ScheduleItem {
  day: string;
  dayIndex: number; // 0 = Domingo, 1 = Segunda, ..., 6 = Sábado
  open: string;
  close: string;
  isOpen: boolean;
  note?: string;
}

export const SITE_CONFIG = {
  businessName: "LUMEN & CO. Barber & Studio",
  tagline: "A Arte do Estilo & Cuidado Pessoal em Alto Padrão",
  slogan: "Muito mais que um corte. Uma experiência exclusiva com atendimento premium, barbearia clássica e hair studio de excelência.",
  
  // WhatsApp de contato padrão
  whatsapp: {
    phoneNumber: "5511999999999",
    defaultMessage: "Olá! Vim através do site da Lumen & Co. e gostaria de agendar um horário.",
  },

  contact: {
    phoneFormatted: "(11) 99999-9999",
    phoneLandline: "(11) 3333-3333",
    email: "contato@lumencobarber.com.br",
    address: "Av. Paulista, 1578 - Bela Vista",
    cityState: "São Paulo - SP",
    cep: "01310-200",
    instagram: "@lumencobarber",
    instagramUrl: "https://instagram.com",
    facebookUrl: "https://facebook.com"
  },

  maps: {
    directionsUrl: "https://maps.google.com/?q=Av.+Paulista,+1578+-+Bela+Vista,+São+Paulo+-+SP",
    embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.106696296001!2d-46.65657118447545!3d-23.561081184682977!2m3!1f0!2f0!3f0!3m2!1i1024!2f768!4f13.1!3m3!1m2!1s0x94ce59c8da0aa315%3A0xd59f9431f2c9776a!2sAv.%20Paulista%2C%201578%20-%20Bela%20Vista%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2001310-200!5e0!3m2!1spt-BR!2sbr!4v1692800000000!5m2!1spt-BR!2sbr"
  },

  schedule: [
    { day: "Segunda-feira", dayIndex: 1, open: "09:00", close: "20:00", isOpen: true },
    { day: "Terça-feira",   dayIndex: 2, open: "09:00", close: "20:00", isOpen: true },
    { day: "Quarta-feira",  dayIndex: 3, open: "09:00", close: "20:00", isOpen: true },
    { day: "Quinta-feira",  dayIndex: 4, open: "09:00", close: "21:00", isOpen: true },
    { day: "Sexta-feira",   dayIndex: 5, open: "08:30", close: "21:30", isOpen: true },
    { day: "Sábado",        dayIndex: 6, open: "08:30", close: "20:00", isOpen: true },
    { day: "Domingo",       dayIndex: 0, open: "10:00", close: "16:00", isOpen: false, note: "Fechado para eventos privados" }
  ] as ScheduleItem[],

  services: [
    {
      id: "corte-signature",
      title: "Corte Signature & Fade",
      category: "barber",
      price: "R$ 85",
      duration: "45 min",
      description: "Lavagem com massagem capilar, corte milimétrico na tesoura ou máquina, acabamento com navalha e finalização com pomada matte premium.",
      image: "/images/service-haircut.jpg",
      popular: true
    },
    {
      id: "barboterapia-spa",
      title: "Barboterapia Spa & Toalha Quente",
      category: "barber",
      price: "R$ 75",
      duration: "40 min",
      description: "Esfoliação facial, vapor de ozônio, óleos essenciais relaxantes, toalha quente, navalhete descartável e pós-barba hidratante calmante.",
      image: "/images/service-beard.jpg",
      popular: true
    },
    {
      id: "combo-royal",
      title: "Combo Royal (Corte + Barba)",
      category: "barber",
      price: "R$ 145",
      duration: "1h 20m",
      description: "Experiência completa masculina: corte personalizado, barboterapia relaxante, alinhamento de sobrancelhas e uma cerveja artesanal ou café expresso cortesia.",
      image: "/images/service-haircut.jpg",
      popular: true
    },
    {
      id: "balayage-glow",
      title: "Design de Mechas & Balayage Glow",
      category: "salon",
      price: "A partir de R$ 380",
      duration: "3h 30m",
      description: "Técnica francesa personalizada de iluminação dos fios, matização com pigmentos nobres, teste de mecha e tratamento anti-danos.",
      image: "/images/gallery-balayage.jpg",
      popular: true
    },
    {
      id: "corte-feminino",
      title: "Corte & Visagismo Feminino",
      category: "salon",
      price: "R$ 160",
      duration: "1h 00m",
      description: "Análise visagista de traços do rosto e estilo de vida, lavagem relaxante com produtos importados, corte e escova modelada.",
      image: "/images/service-salon.jpg",
      popular: false
    },
    {
      id: "spa-capilar",
      title: "Spa Capilar & Nutrição Profunda",
      category: "spa",
      price: "R$ 190",
      duration: "1h 15m",
      description: "Desintoxicação do couro cabeludo, reposição lipídica e hídrica profunda, ozonioterapia e massagem revigorante craniana.",
      image: "/images/service-salon.jpg",
      popular: false
    }
  ] as ServiceItem[],

  team: [
    {
      id: "alex-souza",
      name: "Alexandre 'Alex' Souza",
      role: "Master Barber & Visagista Masculino",
      experience: "12 Anos de Experiência",
      specialty: "Cortes clássicos executivos, transição milimétrica na navalha (fade), barboterapia de alta precisão e visagismo.",
      photo: "/images/barber-alex.jpg",
      instagram: "@alex_barberluxe"
    },
    {
      id: "camila-torres",
      name: "Camila Torres",
      role: "Hair Artist & Colorimetrista",
      experience: "9 Anos de Experiência",
      specialty: "Balayage personalizada, morena iluminada, corte visagista feminino e recuperação de cabelos sensibilizados.",
      photo: "/images/stylist-camila.jpg",
      instagram: "@camila.hairstudio"
    }
  ] as TeamMember[]
};
