export type BeautyService = {
  id: number;
  /** Category slug this service is associated with (e.g. 'skincare', 'makeup') */
  category: string;
  parlourName: string;
  /** Short location tag (area + city) */
  location: string;
  /** Full address line for detail page */
  address: string;
  /** Primary contact number */
  phone: string;
  /** Working hours string, e.g. "10:00 AM – 8:00 PM" */
  workingHours: string;
  serviceName: string;
  image: string;
  startingPrice: number;
  /** List of services offered at this parlour (Hair, Facial, Makeup, etc.) */
  servicesOffered: string[];
};

export const beautyServices: BeautyService[] = [
  {
    id: 1,
    category: 'skincare',
    parlourName: 'Glow & Grace Skin Studio',
    location: 'Andheri West, Mumbai',
    address: '2nd Floor, Pearl Plaza, SV Road, Andheri West, Mumbai, Maharashtra 400058',
    phone: '+91 98765 12345',
    workingHours: '10:00 AM – 8:00 PM (Mon–Sun)',
    serviceName: 'Hydra Glow Facial',
    image: '/images/services/hydra-glow-facial.jpg',
    startingPrice: 1499,
    servicesOffered: ['Hydra Facials', 'Skin Polishing', 'Detan Treatments', 'Bridal Facials'],
  },
  {
    id: 2,
    category: 'skincare',
    parlourName: 'True Beauty Skin Lounge',
    location: 'Koregaon Park, Pune',
    address: 'Lane 6, Koregaon Park, Near ABC Mall, Pune, Maharashtra 411001',
    phone: '+91 91234 56789',
    workingHours: '11:00 AM – 9:00 PM (Tue–Sun)',
    serviceName: 'Bridal Radiance Package',
    image: '/images/services/bridal-radiance.jpg',
    startingPrice: 3499,
    servicesOffered: ['Bridal Facials', 'Pre-bridal Packages', 'Body Polishing', 'Makeup Trials'],
  },
  {
    id: 3,
    category: 'makeup',
    parlourName: 'Blush & Blend Studio',
    location: 'Saket, New Delhi',
    address: '3rd Floor, Elegance Plaza, Saket District Centre, New Delhi 110017',
    phone: '+91 99888 77665',
    workingHours: '9:30 AM – 8:30 PM (Mon–Sat)',
    serviceName: 'Party Makeup & Styling',
    image: '/images/services/party-makeup.jpg',
    startingPrice: 1999,
    servicesOffered: ['Party Makeup', 'Cocktail Makeup', 'Bridal Makeup', 'Hair Styling'],
  },
  {
    id: 4,
    category: 'haircare',
    parlourName: 'Crown & Curls Salon',
    location: 'Banjara Hills, Hyderabad',
    address: 'Road No. 12, Banjara Hills, Opp. City Centre, Hyderabad, Telangana 500034',
    phone: '+91 90123 45678',
    workingHours: '10:00 AM – 9:00 PM (Mon–Sun)',
    serviceName: 'Keratin Smoothening Treatment',
    image: '/images/services/keratin-treatment.jpg',
    startingPrice: 2999,
    servicesOffered: ['Keratin Treatment', 'Smoothening', 'Hair Spa', 'Haircut & Styling'],
  },
  {
    id: 5,
    category: 'wellness',
    parlourName: 'Serenity Spa & Wellness',
    location: 'MG Road, Bengaluru',
    address: '1st Floor, Lotus Towers, MG Road, Bengaluru, Karnataka 560001',
    phone: '+91 93030 11223',
    workingHours: '11:00 AM – 10:00 PM (All days)',
    serviceName: 'Aromatherapy Spa Ritual',
    image: '/images/services/aroma-spa.jpg',
    startingPrice: 2499,
    servicesOffered: ['Aromatherapy Massage', 'Body Spa', 'Head Massage', 'Detox Rituals'],
  },
];

export function getServicesByCategory(categorySlug?: string) {
  if (!categorySlug || categorySlug === 'all') {
    return beautyServices;
  }
  return beautyServices.filter((service) => service.category === categorySlug);
}

export function getServiceById(id: number | string): BeautyService | undefined {
  const numericId = typeof id === 'string' ? parseInt(id, 10) : id;
  if (Number.isNaN(numericId)) return undefined;
  return beautyServices.find((service) => service.id === numericId);
}


