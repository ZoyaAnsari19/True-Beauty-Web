export interface HeroSlide {
  id: number;
  title: string;
  tagline: string;
  benefits: string[];
  buttonText: string;
  image: string;
  bgColor: string;
}

export interface Product {
  id: number;
  name: string;
  highlight: string;
  image: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
}

export interface PromotionalSlide {
  id: number;
  video: string;
  headline: string;
  benefit: string;
  cta: string;
}

export const heroSlides: HeroSlide[] = [
  {
    id: 1,
    title: "True Beauty Skincare Collection",
    tagline: "Premium formulations for radiant, glowing skin. Hydrating mist, serum, foundation & more.",
    benefits: [
      "Luxury ingredients & elegant packaging",
      "Suitable for all skin types",
      "Minimalist, cruelty-free beauty"
    ],
    buttonText: "Shop Now",
    image: "/images/heroSection/allProducts.png",
    bgColor: "from-rose-50 to-pink-50"
  },
  
  {
    id: 3,
    title: "Radiant Serum Collection",
    tagline: "Intensive hydration & glow with our premium serum. Transform your skin with every drop.",
    benefits: [
      "Deep hydration & nourishment",
      "Visible results in days",
      "Luxury skincare experience"
    ],
    buttonText: "Shop Serum",
    image: "/images/products/serum.png",
    bgColor: "from-purple-50 to-pink-50"
  },
  {
    id: 4,
    title: "Day & Night Care Duo",
    tagline: "Complete your skincare routine with our day cream and night cream. 24-hour protection and repair.",
    benefits: [
      "Day cream for protection",
      "Night cream for repair",
      "Perfect skincare harmony"
    ],
    buttonText: "Shop Collection",
    image: "/images/products/dayCream.png",
    bgColor: "from-blue-50 to-rose-50"
  },
  {
    id: 5,
    title: "Essential Skincare Essentials",
    tagline: "Face wash, toner, and moisturizer — the perfect trio for clean, balanced, and hydrated skin.",
    benefits: [
      "Gentle cleansing",
      "Pore refinement",
      "Long-lasting hydration"
    ],
    buttonText: "Shop Essentials",
    image: "/images/products/faceWash.png",
    bgColor: "from-green-50 to-blue-50"
  },
  {
    id: 6,
    title: "Sun Protection & Lip Care",
    tagline: "Protect your skin with SPF and nourish your lips with our premium lip balm collection.",
    benefits: [
      "Broad spectrum protection",
      "Nourishing lip care",
      "Daily essentials"
    ],
    buttonText: "Shop Now",
    image: "/images/products/sunscreen.png",
    bgColor: "from-yellow-50 to-orange-50"
  }
];

export const products: Product[] = [
  {
    id: 1,
    name: "True Beauty Day Cream",
    highlight: "Bright, fresh & hydrated skin all day",
    image: "/images/products/dayCream.png",
    price: 2074.17, // ₹ (24.99 * 83)
    originalPrice: 2738.17, // ₹ (32.99 * 83)
    rating: 4.8,
    reviewCount: 128
  },
  {
    id: 2,
    name: "True Beauty Night Cream",
    highlight: "Repair & nourish while you sleep",
    image: "/images/products/nightCream.png",
    price: 2406.17, // ₹ (28.99 * 83)
    originalPrice: 3070.17, // ₹ (36.99 * 83)
    rating: 4.9,
    reviewCount: 94
  },
  {
    id: 3,
    name: "True Beauty Sunscreen",
    highlight: "Broad spectrum SPF protection",
    image: "/images/products/sunscreen.png",
    price: 1908.17, // ₹ (22.99 * 83)
    originalPrice: 2406.17, // ₹ (28.99 * 83)
    rating: 4.7,
    reviewCount: 156
  },
  {
    id: 4,
    name: "True Beauty Face Wash",
    highlight: "Gentle cleanser for radiant skin",
    image: "/images/products/faceWash.png",
    price: 1576.17, // ₹ (18.99 * 83)
    originalPrice: 2074.17, // ₹ (24.99 * 83)
    rating: 4.6,
    reviewCount: 203
  },
  {
    id: 5,
    name: "True Beauty Serum",
    highlight: "Intensive hydration & glow",
    image: "/images/products/serum.png",
    price: 2904.17, // ₹ (34.99 * 83)
    originalPrice: 3734.17, // ₹ (44.99 * 83)
    rating: 4.9,
    reviewCount: 87
  },
  {
    id: 6,
    name: "True Beauty Moisturizer",
    highlight: "24-hour lasting hydration",
    image: "/images/products/moisturizer.png",
    price: 2240.17, // ₹ (26.99 * 83)
    originalPrice: 2738.17, // ₹ (32.99 * 83)
    rating: 4.7,
    reviewCount: 112
  },
  {
    id: 7,
    name: "True Beauty Toner",
    highlight: "Balance & refine pores",
    image: "/images/products/toner.png",
    price: 1659.17, // ₹ (19.99 * 83)
    originalPrice: 2157.17, // ₹ (25.99 * 83)
    rating: 4.5,
    reviewCount: 76
  },
  {
    id: 8,
    name: "True Beauty Face Mask",
    highlight: "Deep detox & brightening",
    image: "/images/products/faceMask.png",
    price: 1410.17, // ₹ (16.99 * 83)
    originalPrice: 1825.17, // ₹ (21.99 * 83)
    rating: 4.8,
    reviewCount: 145
  },
  {
    id: 9,
    name: "True Beauty Lip Balm",
    highlight: "Nourishing moisture for lips",
    image: "/images/products/lipBalm.png",
    price: 829.17, // ₹ (9.99 * 83)
    originalPrice: 1078.17, // ₹ (12.99 * 83)
    rating: 4.9,
    reviewCount: 234
  }
];

export const promotionalSlides: PromotionalSlide[] = [
  {
    id: 1,
    video: "/videos/video1.mp4",
    headline: "Glow from Within",
    benefit: "Serums that deliver visible radiance in days",
    cta: "Shop Serums"
  },
  {
    id: 2,
    video: "/videos/video2.mp4",
    headline: "Deep Hydration",
    benefit: "24-hour moisture for plump, dewy skin",
    cta: "Shop Moisturizers"
  },
  {
    id: 3,
    video: "/videos/video3.mp4",
    headline: "Gentle Rituals",
    benefit: "Cleansers that nourish as they purify",
    cta: "Shop Cleansers"
  },
  {
    id: 4,
    video: "/videos/video4.mp4",
    headline: "Protect & Perfect",
    benefit: "SPF that feels like skincare, never greasy",
    cta: "Shop Sunscreen"
  }
];

export type CategoryTag = 'new' | 'trending' | 'bestseller';

export interface CategoryItem {
  id: number;
  name: string;
  href: string;
  tag?: CategoryTag;
}

export interface Category {
  id: number;
  name: string;
  href: string;
  icon?: string;
  items: CategoryItem[];
  featured?: {
    title: string;
    description: string;
    image: string;
    href: string;
  };
}

export const categories: Category[] = [
  {
    id: 1,
    name: 'Skincare',
    href: '/category/skincare',
    items: [
      { id: 1, name: 'Face Wash & Cleansers', href: '/category/skincare/cleansers', tag: 'bestseller' },
      { id: 2, name: 'Moisturizers', href: '/category/skincare/moisturizers', tag: 'trending' },
      { id: 3, name: 'Serums & Essences', href: '/category/skincare/serums', tag: 'new' },
      { id: 4, name: 'Sunscreen & SPF', href: '/category/skincare/sunscreen', tag: 'bestseller' },
      { id: 5, name: 'Toners & Mists', href: '/category/skincare/toners' },
      { id: 6, name: 'Face Masks', href: '/category/skincare/masks', tag: 'trending' },
      { id: 7, name: 'Eye Care', href: '/category/skincare/eye-care' },
      { id: 8, name: 'Anti-Aging', href: '/category/skincare/anti-aging', tag: 'new' }
    ],
    featured: {
      title: 'Complete Skincare Routine',
      description: 'Build your perfect skincare routine',
      image: '/images/products/serum.png',
      href: '/category/skincare'
    }
  },
  {
    id: 2,
    name: 'Makeup',
    href: '/category/makeup',
    items: [
      { id: 1, name: 'Foundation & Concealer', href: '/category/makeup/foundation', tag: 'bestseller' },
      { id: 2, name: 'Lipstick & Lip Care', href: '/category/makeup/lips', tag: 'trending' },
      { id: 3, name: 'Eyeshadow & Palettes', href: '/category/makeup/eyes', tag: 'new' },
      { id: 4, name: 'Mascara & Eyeliners', href: '/category/makeup/eye-makeup' },
      { id: 5, name: 'Blush & Highlighters', href: '/category/makeup/cheeks', tag: 'trending' },
      { id: 6, name: 'Makeup Brushes', href: '/category/makeup/brushes' },
      { id: 7, name: 'Setting Sprays', href: '/category/makeup/setting' },
      { id: 8, name: 'Makeup Removers', href: '/category/makeup/removers' }
    ],
    featured: {
      title: 'New Makeup Collection',
      description: 'Discover our latest makeup launches',
      image: '/images/products/lipBalm.png',
      href: '/category/makeup'
    }
  },
  {
    id: 3,
    name: 'Bath & Body',
    href: '/category/bath-body',
    items: [
      { id: 1, name: 'Body Wash & Soaps', href: '/category/bath-body/cleansers', tag: 'bestseller' },
      { id: 2, name: 'Body Lotions & Creams', href: '/category/bath-body/moisturizers', tag: 'trending' },
      { id: 3, name: 'Body Scrubs & Exfoliants', href: '/category/bath-body/scrubs', tag: 'new' },
      { id: 4, name: 'Body Oils', href: '/category/bath-body/oils' },
      { id: 5, name: 'Hand & Foot Care', href: '/category/bath-body/hand-foot' },
      { id: 6, name: 'Bath Bombs & Salts', href: '/category/bath-body/bath-accessories', tag: 'trending' },
      { id: 7, name: 'Deodorants', href: '/category/bath-body/deodorants' },
      { id: 8, name: 'Body Mists', href: '/category/bath-body/mists' }
    ],
    featured: {
      title: 'Luxury Bath Experience',
      description: 'Transform your bath routine',
      image: '/images/products/moisturizer.png',
      href: '/category/bath-body'
    }
  },
  {
    id: 4,
    name: 'Haircare',
    href: '/category/haircare',
    items: [
      { id: 1, name: 'Shampoos', href: '/category/haircare/shampoos', tag: 'bestseller' },
      { id: 2, name: 'Conditioners', href: '/category/haircare/conditioners', tag: 'trending' },
      { id: 3, name: 'Hair Oils & Serums', href: '/category/haircare/oils', tag: 'new' },
      { id: 4, name: 'Hair Masks & Treatments', href: '/category/haircare/masks' },
      { id: 5, name: 'Hair Styling Products', href: '/category/haircare/styling' },
      { id: 6, name: 'Hair Accessories', href: '/category/haircare/accessories' },
      { id: 7, name: 'Scalp Care', href: '/category/haircare/scalp', tag: 'trending' },
      { id: 8, name: 'Hair Color', href: '/category/haircare/color' }
    ],
    featured: {
      title: 'Healthy Hair Essentials',
      description: 'Nourish and strengthen your hair',
      image: '/images/products/dayCream.png',
      href: '/category/haircare'
    }
  },
  {
    id: 5,
    name: 'Fragrance',
    href: '/category/fragrance',
    items: [
      { id: 1, name: 'Perfumes', href: '/category/fragrance/perfumes', tag: 'bestseller' },
      { id: 2, name: 'Body Mists', href: '/category/fragrance/mists', tag: 'trending' },
      { id: 3, name: 'Eau de Toilette', href: '/category/fragrance/edt', tag: 'new' },
      { id: 4, name: 'Eau de Parfum', href: '/category/fragrance/edp' },
      { id: 5, name: 'Roll-On Perfumes', href: '/category/fragrance/roll-on' },
      { id: 6, name: 'Fragrance Gift Sets', href: '/category/fragrance/gift-sets', tag: 'trending' },
      { id: 7, name: 'Scented Candles', href: '/category/fragrance/candles' },
      { id: 8, name: 'Room Sprays', href: '/category/fragrance/room-sprays' }
    ],
    featured: {
      title: 'Signature Fragrances',
      description: 'Discover your signature scent',
      image: '/images/products/nightCream.png',
      href: '/category/fragrance'
    }
  },
  {
    id: 6,
    name: 'Wellness',
    href: '/category/wellness',
    items: [
      { id: 1, name: 'Vitamins & Supplements', href: '/category/wellness/vitamins', tag: 'bestseller' },
      { id: 2, name: 'Hair & Skin Gummies', href: '/category/wellness/gummies', tag: 'trending' },
      { id: 3, name: 'Wellness Kits', href: '/category/wellness/kits', tag: 'new' },
      { id: 4, name: 'Ayurvedic Products', href: '/category/wellness/ayurvedic' },
      { id: 5, name: 'Herbal Teas', href: '/category/wellness/teas' },
      { id: 6, name: 'Self-Care Essentials', href: '/category/wellness/self-care', tag: 'trending' },
      { id: 7, name: 'Wellness Accessories', href: '/category/wellness/accessories' },
      { id: 8, name: 'Gift Sets', href: '/category/wellness/gift-sets' }
    ],
    featured: {
      title: 'Holistic Wellness',
      description: 'Beauty from within',
      image: '/images/products/faceMask.png',
      href: '/category/wellness'
    }
  },
  {
    id: 7,
    name: 'Gifting',
    href: '/category/gifting',
    items: [
      { id: 1, name: 'Skincare Gift Sets', href: '/category/gifting/skincare-sets', tag: 'bestseller' },
      { id: 2, name: 'Makeup Gift Sets', href: '/category/gifting/makeup-sets', tag: 'trending' },
      { id: 3, name: 'Luxury Gift Boxes', href: '/category/gifting/luxury-boxes', tag: 'new' },
      { id: 4, name: 'Personalized Gifts', href: '/category/gifting/personalized' },
      { id: 5, name: 'Holiday Collections', href: '/category/gifting/holiday', tag: 'trending' },
      { id: 6, name: 'Gift Cards', href: '/category/gifting/gift-cards' },
      { id: 7, name: 'Corporate Gifting', href: '/category/gifting/corporate' },
      { id: 8, name: 'Wedding Favors', href: '/category/gifting/wedding' }
    ],
    featured: {
      title: 'Perfect Gift Sets',
      description: 'Thoughtful gifts for loved ones',
      image: '/images/products/toner.png',
      href: '/category/gifting'
    }
  },
  {
    id: 8,
    name: 'Offers',
    href: '/offers',
    items: [
      { id: 1, name: 'Flash Sales', href: '/offers/flash-sales', tag: 'trending' },
      { id: 2, name: 'Buy 1 Get 1', href: '/offers/bogo', tag: 'bestseller' },
      { id: 3, name: 'New Arrivals Sale', href: '/offers/new-arrivals', tag: 'new' },
      { id: 4, name: 'Clearance Sale', href: '/offers/clearance' },
      { id: 5, name: 'Combo Offers', href: '/offers/combo', tag: 'trending' },
      { id: 6, name: 'Seasonal Sales', href: '/offers/seasonal' },
      { id: 7, name: 'Member Exclusive', href: '/offers/member-exclusive' },
      { id: 8, name: 'Bundle Deals', href: '/offers/bundles', tag: 'bestseller' }
    ],
    featured: {
      title: 'Special Offers',
      description: 'Limited time deals',
      image: '/images/products/sunscreen.png',
      href: '/offers'
    }
  }
];
