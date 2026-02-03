export type Product = {
  id: number;
  name: string;
  highlight: string;
  image: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  bullets?: string[];
  category: string;
  subcategory: string;
};

export const products: Product[] = [
  { id: 1, name: "True Beauty Day Cream", highlight: "Bright, fresh & hydrated skin all day", image: "/images/products/dayCream.png", price: 1299, originalPrice: 1699, rating: 4.8, reviewCount: 128, bullets: ["SPF-enriched day protection", "Lightweight, non-greasy formula", "Suitable for all skin types", "Dermatologist tested"], category: "skincare", subcategory: "moisturizers" },
  { id: 2, name: "True Beauty Night Cream", highlight: "Repair & nourish while you sleep", image: "/images/products/nightCream.png", price: 1399, originalPrice: 1799, rating: 4.9, reviewCount: 94, bullets: ["Deep repair & regeneration", "Rich, nourishing texture", "Reduces fine lines overnight", "Free from parabens"], category: "skincare", subcategory: "moisturizers" },
  { id: 3, name: "True Beauty Sunscreen", highlight: "Broad spectrum SPF protection", image: "/images/products/sunscreen.png", price: 1199, originalPrice: 1599, rating: 4.7, reviewCount: 156, bullets: ["Broad spectrum SPF 50+", "Water-resistant formula", "No white cast", "Reef-safe & cruelty-free"], category: "skincare", subcategory: "sunscreen" },
  { id: 4, name: "True Beauty Face Wash", highlight: "Gentle cleanser for radiant skin", image: "/images/products/faceWash.png", price: 999, originalPrice: 1399, rating: 4.6, reviewCount: 203, bullets: ["Gentle, pH-balanced formula", "Removes dirt & makeup", "Does not strip natural oils", "With natural extracts"], category: "skincare", subcategory: "cleansers" },
  { id: 5, name: "True Beauty Serum", highlight: "Intensive hydration & glow", image: "/images/products/serum.png", price: 1499, originalPrice: 1899, rating: 4.9, reviewCount: 87, bullets: ["Concentrated active ingredients", "Visible glow in days", "Fast-absorbing, lightweight", "Vitamin C & hyaluronic acid"], category: "skincare", subcategory: "serums" },
  { id: 6, name: "True Beauty Moisturizer", highlight: "24-hour lasting hydration", image: "/images/products/moisturizer.png", price: 1399, originalPrice: 1799, rating: 4.7, reviewCount: 112, bullets: ["Long-lasting 24h hydration", "Strengthens skin barrier", "Non-comedogenic", "For day & night use"], category: "skincare", subcategory: "moisturizers" },
  { id: 7, name: "True Beauty Toner", highlight: "Balance & refine pores", image: "/images/products/toner.png", price: 1099, originalPrice: 1499, rating: 4.5, reviewCount: 76, bullets: ["Balances skin pH", "Refines pores & texture", "Prepares skin for serums", "Alcohol-free formula"], category: "skincare", subcategory: "toners" },
  { id: 8, name: "True Beauty Face Mask", highlight: "Deep detox & brightening", image: "/images/products/faceMask.png", price: 1199, originalPrice: 1599, rating: 4.8, reviewCount: 145, bullets: ["Deep cleansing clay base", "Removes impurities", "Brightens & evens tone", "Use 1–2 times a week"], category: "skincare", subcategory: "masks" },
  { id: 9, name: "True Beauty Lip Balm", highlight: "Nourishing moisture for lips", image: "/images/products/lipBalm.png", price: 999, originalPrice: 1299, rating: 4.9, reviewCount: 234, bullets: ["Long-lasting moisture", "Natural oils & shea butter", "SPF protection", "No fragrance irritation"], category: "skincare", subcategory: "moisturizers" },
  { id: 10, name: "Classic Pearl Studs", highlight: "Elegant sterling silver with pearl", image: "/images/products/dayCream.png", price: 899, originalPrice: 1199, rating: 4.8, reviewCount: 42, category: "jewellery", subcategory: "earrings" },
  { id: 11, name: "Rose Gold Pendant", highlight: "Minimalist pendant for everyday wear", image: "/images/products/serum.png", price: 1499, originalPrice: 1999, rating: 4.9, reviewCount: 28, category: "jewellery", subcategory: "pendants" }
];

export function getProductById(id: number | string) {
  const numId = typeof id === 'string' ? parseInt(id, 10) : id;
  return products.find((p) => p.id === numId) ?? null;
}

export function getProductsByCategory(categorySlug: string, subcategorySlug?: string): Product[] {
  let list = products.filter((p) => p.category === categorySlug);
  if (subcategorySlug) list = list.filter((p) => p.subcategory === subcategorySlug);
  return list;
}
