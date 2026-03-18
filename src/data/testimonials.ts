export interface Testimonial {
  id: string;
  author: string;
  role?: string;
  quote: string;
  rating: 1 | 2 | 3 | 4 | 5;
  avatar?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: '1',
    author: 'Sofía Martínez',
    role: 'Comensal frecuente',
    quote:
      'La Maison es simplemente incomparable. Cada visita es una experiencia nueva: los sabores son impecables y el servicio, de primera clase. Es el lugar perfecto para celebrar momentos especiales.',
    rating: 5,
    avatar: 'https://i.pravatar.cc/80?img=47',
  },
  {
    id: '2',
    author: 'Carlos Reyes',
    role: 'Crítico gastronómico',
    quote:
      'Rara vez encuentro un restaurante que equilibre tan bien la tradición francesa con ingredientes locales de temporada. El filete al vino tinto es uno de los mejores que he probado en años.',
    rating: 5,
    avatar: 'https://i.pravatar.cc/80?img=12',
  },
  {
    id: '3',
    author: 'Ana Lucía Hernández',
    role: 'Organizadora de eventos',
    quote:
      'Organicé la cena de aniversario de mis padres aquí y todo fue perfecto. El equipo fue muy atento en cada detalle. El ambiente es elegante sin ser pretencioso. ¡Altamente recomendado!',
    rating: 5,
    avatar: 'https://i.pravatar.cc/80?img=31',
  },
];
