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
  quote: string;
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
    email: "contato@zleibbarber.com.br",
    address: "Av. Paulista, 1578 - Bela Vista",
    addressComplement: "Edifício Barão de Iguape • 1º Andar",
    cityState: "São Paulo - SP",
    cep: "01310-200",
    referencePoint: "A 150m do MASP e a 3 min a pé da Estação Trianon-MASP",
    instagram: "@zleibbarber",
    instagramUrl: "https://instagram.com/zleibbarber",
    facebookUrl: "https://facebook.com/zleibbarber",
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

  // Serviços factuais com fotos e durações reais
  services: [
    {
      id: "corte-signature",
      title: "Corte Signature & Visagismo",
      category: "barber",
      price: "R$ 85",
      duration: "45 min",
      description: "Diagnóstico de proporção cranial, corte milimétrico na tesoura japonesa de aço cobalto, lavagem com shampoo mentolado Keune 1922 e finalização na lâmina descartável Feather.",
      image: "/images/service-haircut.jpg",
      popular: false,
      badge: "Tesoura Japonesa",
      highlights: ["Lavagem com massagem capilar", "Finalização pomada matte Keune", "Contorno na lâmina Feather"]
    },
    {
      id: "barboterapia-spa",
      title: "Barboterapia Tradicional com Vapor",
      category: "barber",
      price: "R$ 75",
      duration: "40 min",
      description: "Emoliência profunda com vapor de ozônio, toalha aquecida a 90°C com óleo essencial puro de eucalipto glóbulus, barbear com lâmina japonesa e bálsamo calmante de arnica.",
      image: "/images/service-beard.jpg",
      popular: false,
      badge: "Vapor & Toalha Quente",
      highlights: ["Óleo essencial puro eucalipto", "Toalha a 90°C esterilizada", "Bálsamo anti-irritação"]
    },
    {
      id: "combo-royal",
      title: "Combo Royal: Cabelo + Barba Completa",
      category: "barber",
      price: "R$ 145",
      duration: "1h 20m",
      description: "Atendimento completo na mesma bancada sem pressa. Corte visagista na tesoura + ritual completo de barboterapia, com espresso especial do Sul de Minas servido durante a pausa.",
      image: "/images/service-combo.jpg",
      popular: true,
      badge: "Atendimento Integrado",
      highlights: ["Corte + Barboterapia completa", "Espresso arábica cortesia", "Alinhamento milimétrico"]
    },
    {
      id: "balayage-glow",
      title: "Balayage Autoral & Mechas Morena Iluminada",
      category: "salon",
      price: "A partir de R$ 380",
      duration: "3h 30m",
      description: "Técnica francesa de clareamento à mão livre em degradê avelã e caramelo. Preserva a raiz virgem, inclui teste de mecha prévio, tonalização Wella e plex antiquebra.",
      image: "/images/gallery-balayage.jpg",
      popular: true,
      badge: "Colorimetria Wella",
      highlights: ["Teste de mecha obrigatório", "Plex antiquebra incluso", "Matização personalizada"]
    },
    {
      id: "corte-feminino",
      title: "Corte em Camadas & Visagismo Feminino",
      category: "salon",
      price: "R$ 160",
      duration: "1h 00m",
      description: "Estudo de caimento e proporção, corte texturizado para movimento natural dos fios, higienização com protocolo de nutrição profunda e escova modelada com termoproteção.",
      image: "/images/service-womancut.jpg",
      popular: false,
      badge: "Design Estruturado",
      highlights: ["Consultoria de proporção facial", "Escova modelada duradoura", "Proteção térmica de luxo"]
    },
    {
      id: "spa-capilar",
      title: "Terapia Capilar Botânica & Detox",
      category: "spa",
      price: "R$ 190",
      duration: "1h 15m",
      description: "Peeling suave no couro cabeludo com argila verde, vapor de ozônio para desobstrução dos folículos, reposição lipídica profunda e massagem craniana com aromaterapia.",
      image: "/images/service-spatreatment.jpg",
      popular: false,
      badge: "Protocolo Tricológico",
      highlights: ["Desintoxicação folicular", "Massagem craniana relaxante", "Repositor lipídico puro"]
    }
  ] as (ServiceItem & { badge?: string; highlights?: string[] })[],

  team: [
    {
      id: "alex-souza",
      name: "Alexandre Souza",
      role: "Mestre Barbeiro & Cofundador",
      specialty: "Cortes clássicos na tesoura e barboterapia tradicional com toalha aquecida",
      experience: "14 anos de bancada",
      quote: "O corte perfeito não é aquele que fica bonito só na cadeira, mas o que cresce com caimento impecável por 30 dias.",
      bio: "Formado pela Academia Pivot Point com especialização em visagismo masculino pela Menspire Academy de Londres. Alexandre comanda a ala clássica com rigor técnico e foco em fidelidade de horário.",
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
      quote: "Minha obsessão é iluminar o cabelo preservando 100% da integridade da fibra capilar. Se o teste de mecha não der sinal verde, não fazemos química.",
      bio: "Especialista em colorimetria avançada certificada pela Wella Professionals e L'Oréal Professionnel. Desenvolve técnicas de clareamento sem marcas de raiz que respeitam a textura original.",
      photo: "/images/stylist-camila.jpg",
      rating: 4.9,
      instagram: "@camilatorres.hair"
    }
  ] as TeamMember[],

  reviews: [
    {
      id: "rev-1",
      name: "Rodrigo Mendonça",
      context: "Cliente frequente • Diretor de Operações",
      text: "Pontualidade britânica real. Meu horário era 14h, e às 14h em ponto eu já estava na cadeira. O corte na tesoura do Alexandre não tem comparação na região da Paulista.",
      rating: 5,
      date: "Há 2 semanas no Google",
      serviceUsed: "Combo Royal"
    },
    {
      id: "rev-2",
      name: "Juliana Peixoto",
      context: "Primeira visita • Arquiteta",
      text: "Fiz o teste de mecha com a Camila na terça e realizamos a morena iluminada na quinta. O tom avelã ficou super natural e o cabelo não ficou nem um pouco ressecado. Espaço silencioso, perfeito para quem quer fugir da loucura da Paulista.",
      rating: 5,
      date: "Há 1 mês no Google",
      serviceUsed: "Balayage Autoral"
    },
    {
      id: "rev-3",
      name: "Henrique Farias",
      context: "Cliente há 1 ano • Advogado",
      text: "O valet cortesia no próprio prédio economiza 20 minutos de estacionamento na Paulista. A toalha quente com eucalipto na barba é o melhor ritual pós-expediente.",
      rating: 5,
      date: "Há 3 semanas no Google",
      serviceUsed: "Barboterapia Tradicional"
    },
    {
      id: "rev-4",
      name: "Mariana Siqueira",
      context: "Cliente mensal • Designer",
      text: "Fiz o corte em camadas com a Camila. Ela entendeu exatamente o que eu queria sem tirar comprimento demais. O espresso moído na hora servido no lounge é excelente.",
      rating: 5,
      date: "Há 5 dias no Google",
      serviceUsed: "Corte Feminino"
    }
  ] as ReviewItem[]
};

