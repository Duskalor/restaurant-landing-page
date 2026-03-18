export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  category: 'entrada' | 'principal' | 'postre' | 'bebida';
  image: string;
  featured: boolean;
}

export const menuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Carpaccio de Res',
    description: 'Finas láminas de res con aceite de oliva, alcaparras, parmesano y rúcula fresca.',
    price: 'S/ 185',
    category: 'entrada',
    image: 'https://images.unsplash.com/photo-1546549032-9571cd6b27df?w=600&q=80',
    featured: true,
  },
  {
    id: '2',
    name: 'Sopa de Cebolla Gratinada',
    description: 'Receta tradicional francesa con caldo de res, cebolla caramelizada y queso gruyère.',
    price: 'S/145',
    category: 'entrada',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&q=80',
    featured: false,
  },
  {
    id: '3',
    name: 'Filete al Vino Tinto',
    description: 'Filete de res término medio con reducción de vino tinto, papas dauphinoise y espárragos.',
    price: 'S/395',
    category: 'principal',
    image: 'https://images.unsplash.com/photo-1558030006-450675393462?w=600&q=80',
    featured: true,
  },
  {
    id: '4',
    name: 'Salmón en Costra de Hierbas',
    description: 'Salmón atlántico con costra de hierbas finas, puré de coliflor y salsa de limón.',
    price: 'S/345',
    category: 'principal',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&q=80',
    featured: true,
  },
  {
    id: '5',
    name: 'Risotto de Champiñones',
    description: 'Arroz arborio cremoso con mezcla de hongos silvestres, trufa negra y parmesano añejo.',
    price: 'S/295',
    category: 'principal',
    image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=600&q=80',
    featured: false,
  },
  {
    id: '6',
    name: 'Tarta Tatin de Manzana',
    description: 'Clásico postre francés con manzanas caramelizadas, masa hojaldrada y helado de vainilla.',
    price: 'S/135',
    category: 'postre',
    image: 'https://images.unsplash.com/photo-1568571780765-9276ac8b75a2?w=600&q=80',
    featured: true,
  },
  {
    id: '7',
    name: 'Crème Brûlée',
    description: 'Natilla de vainilla de Madagascar con cobertura de caramelo tostado al momento.',
    price: 'S/115',
    category: 'postre',
    image: 'https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=600&q=80',
    featured: false,
  },
  {
    id: '8',
    name: 'Mousse de Chocolate Oscuro',
    description: 'Mousse aireado de chocolate 72% con frambuesas frescas y polvo de oro.',
    price: 'S/125',
    category: 'postre',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&q=80',
    featured: true,
  },
];

export const featuredItems = menuItems.filter((item) => item.featured);
