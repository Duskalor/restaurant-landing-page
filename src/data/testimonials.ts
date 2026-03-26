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
    author: 'Valentina Ríos',
    role: 'Viajera, Buenos Aires',
    quote:
      'El tour al Valle Sagrado superó todas mis expectativas. Los guías conocen cada rincón de los Andes y te explican la historia inca con una pasión increíble. Volví a casa completamente transformada.',
    rating: 5,
    avatar: 'https://i.pravatar.cc/80?img=47',
  },
  {
    id: '2',
    author: 'Martín Cabrera',
    role: 'Viajero, Ciudad de México',
    quote:
      'Hice el tour de senderismo a Choquequirao y fue la experiencia más impresionante de mi vida. La logística fue impecable, el equipo de soporte estuvo en todo momento y las vistas son de otro mundo.',
    rating: 5,
    avatar: 'https://i.pravatar.cc/80?img=12',
  },
  {
    id: '3',
    author: 'Gabriela Montoya',
    role: 'Viajera, Bogotá',
    quote:
      'Contratamos el tour familiar por Cusco y Machu Picchu y fue un acierto total. Los guías se adaptaron al ritmo de los chicos, explicaron todo con paciencia y la organización fue perfecta de principio a fin.',
    rating: 5,
    avatar: 'https://i.pravatar.cc/80?img=31',
  },
];
