export interface ServiceItem {
  id: string;
  title: string;
  category: "barber" | "salon" | "spa";
  price: string;
  duration: string;
  description: string;
  image: string;
  popular?: boolean;
  badge?: string;
  highlights?: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  specialty: string;
  experience: string;
  bio: string;
  photo: string;
  rating: number;
  instagram: string;
}

export interface ScheduleItem {
  day: string;
  dayIndex: number;
  open: string;
  close: string;
  isOpen: boolean;
  note?: string;
}

export interface ReviewItem {
  id: string;
  name: string;
  context: string;
  role?: string;
  text: string;
  rating: number;
  date: string;
  serviceUsed: string;
}

export const SITE_CONFIG = {
  businessName: "ZLEIB BARBER • Ateliê & Hair Studio",
  tagline: "Ateliê de Barbearia Clássica & Hair Studio Autoral",
  slogan: "Cortes de precisão na tesoura, barboterapia tradicional com toalha aquecida e visagismo contemporâneo a 150m do MASP.",
  
  // WhatsApp de contato padrão
  whatsapp: {
    phoneNumber: "5511999999999",
    defaultMessage: "Olá! Gostaria de consultar horários disponíveis na Zleib Barber.",
  },

  contact: {
    phoneFormatted: "(11) 99999-9999",
    phoneLandline: "(11) 3284-5500",
    email: "recepcao@zleibbarber.com.br",
    address: "Av. Paulista, 1578 - Bela Vista",
    addressComplement: "Edifício Barão de Iguape • 1º Andar",
    cityState: "São Paulo - SP",
    cep: "01310-200",
    referencePoint: "A 150m do MASP e a 3 min a pé da Estação Trianon-MASP",
    instagram: "@zleibbarber",
    instagramUrl: "https://instagram.com",
    facebookUrl: "https://facebook.com",
    googleReviewsUrl: "https://maps.google.com/?q=Av.+Paulista,+1578+-+Bela+Vista,+São+Paulo+-+SP",
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
    { day: "Domingo",       dayIndex: 0, open: "10:00", close: "16:00", isOpen: false, note: "Fechado para atendimentos privativos e noivos" }
  ] as ScheduleItem[],

  // Serviços factuais com fotos reais
  services: [
    {
      id: "corte-signature",
      title: "Corte Signature & Visagismo",
      category: "barber",
      price: "R$ 85",
      duration: "45 min",
      description: "Diagnóstico de formato facial, corte milimétrico na tesoura japonesa ou máquina, lavagem com shampoo mentolado e acabamento na navalha descartável.",
      image: "/images/service-haircut.jpg",
      popular: false,
      badge: "Assinatura Masculina",
      highlights: ["Lavagem com massagem", "Finalização pomada matte", "Acabamento na navalha"]
    },
    {
      id: "barboterapia-spa",
      title: "Barboterapia Tradicional com Vapor",
      category: "barber",
      price: "R$ 75",
      duration: "40 min",
      description: "Emoliência com vapor de ozônio, toalha aquecida a 90°C com óleo essencial de eucalipto, corte com lâmina Feather e bálsamo pós-barba de arnica.",
      image: "/images/service-beard.jpg",
      popular: false,
      badge: "Ritual Clássico",
      highlights: ["Óleo essencial puro", "Toalha aquecida", "Navalhete esterilizado"]
    },
    {
      id: "combo-royal",
      title: "Combo Royal: Cabelo + Barba Completa",
      category: "barber",
      price: "R$ 145",
      duration: "1h 20m",
      description: "Atendimento completo na mesma bancada. Corte visagista + ritual de barboterapia com toalha aquecida, limpeza de contorno e espresso especial no lounge.",
      image: "/images/service-combo.jpg",
      popular: true,
      badge: "Procedimento Completo",
      highlights: ["Corte + Barba completa", "Espresso microlote cortesia", "Alinhamento facial"]
    },
    {
      id: "balayage-glow",
      title: "Balayage Autoral & Mechas Morena Iluminada",
      category: "salon",
      price: "A partir de R$ 380",
      duration: "3h 30m",
      description: "Técnica francesa de mechas à mão livre em tons avelã e caramelo. Preserva a raiz natural, inclui teste de mecha prévio, tonalização e plex antiquebra.",
      image: "/images/gallery-balayage.jpg",
      popular: true,
      badge: "Especialidade Studio",
      highlights: ["Teste de mecha incluso", "Plex protetor da fibra", "Matização personalizada"]
    },
    {
      id: "corte-feminino",
      title: "Corte em Camadas & Visagismo Feminino",
      category: "salon",
      price: "R$ 160",
      duration: "1h 00m",
      description: "Estudo de proporção, corte texturizado para caimento natural, lavagem com protocolo de hidratação e escova modelada com proteção térmica.",
      image: "/images/service-womancut.jpg",
      popular: false,
      badge: "Design em Camadas",
      highlights: ["Consultoria de caimento", "Escova modelada", "Tratamento de brilho"]
    },
    {
      id: "spa-capilar",
      title: "Terapia Capilar Botânica & Detox",
      category: "spa",
      price: "R$ 190",
      duration: "1h 15m",
      description: "Peeling suave no couro cabeludo, vapor de ozônio para desobstrução folicular, reposição lipídica profunda e massagem craniana com aromaterapia.",
      image: "/images/service-spatreatment.jpg",
      popular: false,
      badge: "Saúde do Couro Cabeludo",
      highlights: ["Desintoxicação folicular", "Massagem craniana", "Recuperação da fibra"]
    }
  ] as (ServiceItem & { badge?: string; highlights?: string[] })[],

  team: [
    {
      id: "alex-souza",
      name: "Alexandre Souza",
      role: "Mestre Barbeiro & Cofundador",
      specialty: "Cortes clássicos na tesoura e barboterapia tradicional com toalha aquecida",
      experience: "14 anos de bancada",
      bio: "Formado pela Academia Pivot Point e com passagem por barbearias tradicionais de São Paulo, Alexandre comanda a ala clássica da Zleib Barber com foco rigoroso em pontualidade e caimento natural do cabelo.",
      photo: "/images/barber-alex.jpg",
      rating: 4.9,
      instagram: "@alexandresouza.barber"
    },
    {
      id: "camila-torres",
      name: "Camila Torres",
      role: "Hair Artist & Colorista",
      specialty: "Visagismo feminino, mechas Morena Iluminada e corte em camadas texturizadas",
      experience: "11 anos de experiência",
      bio: "Especialista em visagismo e colorimetria avançada com certificação internacional Wella e L'Oréal. Cria cortes e clareamentos que respeitam a textura natural e a saúde capilar.",
      photo: "/images/stylist-camila.jpg",
      rating: 4.9,
      instagram: "@camilatorres.hair"
    }
  ] as TeamMember[],

  reviews: [
    {
      id: "rev-1",
      name: "Rodrigo Mendonça",
      context: "Cliente há 2 anos • Executivo",
      text: "Pontualidade britânica. Agendo às 14h e às 14h em ponto estou na cadeira do Alexandre. O espresso de entrada e a toalha aquecida com óleo de eucalipto são impecáveis.",
      rating: 5,
      date: "Avaliado no Google há 2 semanas",
      serviceUsed: "Combo Royal"
    },
    {
      id: "rev-2",
      name: "Juliana Peixoto",
      context: "Cliente frequente • Arquiteta",
      text: "A Camila acertou perfeitamente o tom da minha morena iluminada sem agredir meu cabelo. O espaço é calmo, sem barulho e sem aquela muvuca de salão comum.",
      rating: 5,
      date: "Avaliado no Google há 1 mês",
      serviceUsed: "Balayage Autoral"
    },
    {
      id: "rev-3",
      name: "Henrique Farias",
      context: "Cliente mensal • Advogado",
      text: "O corte na tesoura do Alexandre tem caimento perfeito que dura o mês inteiro sem perder a forma. Estacionamento com valet no prédio facilita muito.",
      rating: 5,
      date: "Avaliado no Google há 3 semanas",
      serviceUsed: "Corte Signature"
    }
  ] as ReviewItem[]
};
