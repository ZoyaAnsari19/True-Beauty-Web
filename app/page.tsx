'use client';

import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Heart, Star, ShoppingBag, User } from 'lucide-react';

const heroSlides = [
  { id: 1, title: "True Beauty Skincare Collection", tagline: "Premium formulations for radiant, glowing skin. Hydrating mist, serum, foundation & more.", benefits: ["Luxury ingredients & elegant packaging", "Suitable for all skin types", "Minimalist, cruelty-free beauty"], buttonText: "Shop Now", image: "/images/heroSection/allProducts.png", bgColor: "from-rose-50 to-pink-50" },
  { id: 3, title: "Radiant Serum Collection", tagline: "Intensive hydration & glow with our premium serum. Transform your skin with every drop.", benefits: ["Deep hydration & nourishment", "Visible results in days", "Luxury skincare experience"], buttonText: "Shop Serum", image: "/images/products/serum.png", bgColor: "from-purple-50 to-pink-50" },
  { id: 4, title: "Day & Night Care Duo", tagline: "Complete your skincare routine with our day cream and night cream. 24-hour protection and repair.", benefits: ["Day cream for protection", "Night cream for repair", "Perfect skincare harmony"], buttonText: "Shop Collection", image: "/images/products/dayCream.png", bgColor: "from-blue-50 to-rose-50" },
  { id: 5, title: "Essential Skincare Essentials", tagline: "Face wash, toner, and moisturizer — the perfect trio for clean, balanced, and hydrated skin.", benefits: ["Gentle cleansing", "Pore refinement", "Long-lasting hydration"], buttonText: "Shop Essentials", image: "/images/products/faceWash.png", bgColor: "from-green-50 to-blue-50" },
  { id: 6, title: "Sun Protection & Lip Care", tagline: "Protect your skin with SPF and nourish your lips with our premium lip balm collection.", benefits: ["Broad spectrum protection", "Nourishing lip care", "Daily essentials"], buttonText: "Shop Now", image: "/images/products/sunscreen.png", bgColor: "from-yellow-50 to-orange-50" }
];

const products = [
  { id: 1, name: "True Beauty Day Cream", highlight: "Bright, fresh & hydrated skin all day", image: "/images/products/dayCream.png", price: 1299, originalPrice: 1699, rating: 4.8, reviewCount: 128 },
  { id: 2, name: "True Beauty Night Cream", highlight: "Repair & nourish while you sleep", image: "/images/products/nightCream.png", price: 1399, originalPrice: 1799, rating: 4.9, reviewCount: 94 },
  { id: 3, name: "True Beauty Sunscreen", highlight: "Broad spectrum SPF protection", image: "/images/products/sunscreen.png", price: 1199, originalPrice: 1599, rating: 4.7, reviewCount: 156 },
  { id: 4, name: "True Beauty Face Wash", highlight: "Gentle cleanser for radiant skin", image: "/images/products/faceWash.png", price: 999, originalPrice: 1399, rating: 4.6, reviewCount: 203 },
  { id: 5, name: "True Beauty Serum", highlight: "Intensive hydration & glow", image: "/images/products/serum.png", price: 1499, originalPrice: 1899, rating: 4.9, reviewCount: 87 },
  { id: 6, name: "True Beauty Moisturizer", highlight: "24-hour lasting hydration", image: "/images/products/moisturizer.png", price: 1399, originalPrice: 1799, rating: 4.7, reviewCount: 112 },
  { id: 7, name: "True Beauty Toner", highlight: "Balance & refine pores", image: "/images/products/toner.png", price: 1099, originalPrice: 1499, rating: 4.5, reviewCount: 76 },
  { id: 8, name: "True Beauty Face Mask", highlight: "Deep detox & brightening", image: "/images/products/faceMask.png", price: 1199, originalPrice: 1599, rating: 4.8, reviewCount: 145 },
  { id: 9, name: "True Beauty Lip Balm", highlight: "Nourishing moisture for lips", image: "/images/products/lipBalm.png", price: 999, originalPrice: 1299, rating: 4.9, reviewCount: 234 }
];

const promotionalSlides = [
  { id: 1, video: "/videos/video1.mp4", headline: "Glow from Within", benefit: "Serums that deliver visible radiance in days", cta: "Shop Serums" },
  { id: 2, video: "/videos/video2.mp4", headline: "Deep Hydration", benefit: "24-hour moisture for plump, dewy skin", cta: "Shop Moisturizers" },
  { id: 3, video: "/videos/video3.mp4", headline: "Gentle Rituals", benefit: "Cleansers that nourish as they purify", cta: "Shop Cleansers" },
  { id: 4, video: "/videos/video4.mp4", headline: "Protect & Perfect", benefit: "SPF that feels like skincare, never greasy", cta: "Shop Sunscreen" }
];

const categories = [
  { id: 1, name: 'Skincare', href: '/category/skincare', items: [{ id: 1, name: 'Face Wash & Cleansers', href: '/category/skincare/cleansers' }, { id: 2, name: 'Moisturizers', href: '/category/skincare/moisturizers' }, { id: 3, name: 'Serums & Essences', href: '/category/skincare/serums' }, { id: 4, name: 'Sunscreen & SPF', href: '/category/skincare/sunscreen' }, { id: 5, name: 'Toners & Mists', href: '/category/skincare/toners' }, { id: 6, name: 'Face Masks', href: '/category/skincare/masks' }, { id: 7, name: 'Eye Care', href: '/category/skincare/eye-care' }, { id: 8, name: 'Anti-Aging', href: '/category/skincare/anti-aging' }] },
  { id: 2, name: 'Makeup', href: '/category/makeup', items: [{ id: 1, name: 'Foundation & Concealer', href: '/category/makeup/foundation' }, { id: 2, name: 'Lipstick & Lip Care', href: '/category/makeup/lips' }, { id: 3, name: 'Eyeshadow & Palettes', href: '/category/makeup/eyes' }, { id: 4, name: 'Mascara & Eyeliners', href: '/category/makeup/eye-makeup' }, { id: 5, name: 'Blush & Highlighters', href: '/category/makeup/cheeks' }, { id: 6, name: 'Makeup Brushes', href: '/category/makeup/brushes' }, { id: 7, name: 'Setting Sprays', href: '/category/makeup/setting' }, { id: 8, name: 'Makeup Removers', href: '/category/makeup/removers' }] },
  { id: 3, name: 'Bath & Body', href: '/category/bath-body', items: [{ id: 1, name: 'Body Wash & Soaps', href: '/category/bath-body/cleansers' }, { id: 2, name: 'Body Lotions & Creams', href: '/category/bath-body/moisturizers' }, { id: 3, name: 'Body Scrubs & Exfoliants', href: '/category/bath-body/scrubs' }, { id: 4, name: 'Body Oils', href: '/category/bath-body/oils' }, { id: 5, name: 'Hand & Foot Care', href: '/category/bath-body/hand-foot' }, { id: 6, name: 'Bath Bombs & Salts', href: '/category/bath-body/bath-accessories' }, { id: 7, name: 'Deodorants', href: '/category/bath-body/deodorants' }, { id: 8, name: 'Body Mists', href: '/category/bath-body/mists' }] },
  { id: 4, name: 'Haircare', href: '/category/haircare', items: [{ id: 1, name: 'Shampoos', href: '/category/haircare/shampoos' }, { id: 2, name: 'Conditioners', href: '/category/haircare/conditioners' }, { id: 3, name: 'Hair Oils & Serums', href: '/category/haircare/oils' }, { id: 4, name: 'Hair Masks & Treatments', href: '/category/haircare/masks' }, { id: 5, name: 'Hair Styling Products', href: '/category/haircare/styling' }, { id: 6, name: 'Hair Accessories', href: '/category/haircare/accessories' }, { id: 7, name: 'Scalp Care', href: '/category/haircare/scalp' }, { id: 8, name: 'Hair Color', href: '/category/haircare/color' }] },
  { id: 5, name: 'Fragrance', href: '/category/fragrance', items: [{ id: 1, name: 'Perfumes', href: '/category/fragrance/perfumes' }, { id: 2, name: 'Body Mists', href: '/category/fragrance/mists' }, { id: 3, name: 'Eau de Toilette', href: '/category/fragrance/edt' }, { id: 4, name: 'Eau de Parfum', href: '/category/fragrance/edp' }, { id: 5, name: 'Roll-On Perfumes', href: '/category/fragrance/roll-on' }, { id: 6, name: 'Fragrance Gift Sets', href: '/category/fragrance/gift-sets' }, { id: 7, name: 'Scented Candles', href: '/category/fragrance/candles' }, { id: 8, name: 'Room Sprays', href: '/category/fragrance/room-sprays' }] },
  { id: 6, name: 'Wellness', href: '/category/wellness', items: [{ id: 1, name: 'Vitamins & Supplements', href: '/category/wellness/vitamins' }, { id: 2, name: 'Hair & Skin Gummies', href: '/category/wellness/gummies' }, { id: 3, name: 'Wellness Kits', href: '/category/wellness/kits' }, { id: 4, name: 'Ayurvedic Products', href: '/category/wellness/ayurvedic' }, { id: 5, name: 'Herbal Teas', href: '/category/wellness/teas' }, { id: 6, name: 'Self-Care Essentials', href: '/category/wellness/self-care' }, { id: 7, name: 'Wellness Accessories', href: '/category/wellness/accessories' }, { id: 8, name: 'Gift Sets', href: '/category/wellness/gift-sets' }] },
  { id: 7, name: 'Gifting', href: '/category/gifting', items: [{ id: 1, name: 'Skincare Gift Sets', href: '/category/gifting/skincare-sets' }, { id: 2, name: 'Makeup Gift Sets', href: '/category/gifting/makeup-sets' }, { id: 3, name: 'Luxury Gift Boxes', href: '/category/gifting/luxury-boxes' }, { id: 4, name: 'Personalized Gifts', href: '/category/gifting/personalized' }, { id: 5, name: 'Holiday Collections', href: '/category/gifting/holiday' }, { id: 6, name: 'Gift Cards', href: '/category/gifting/gift-cards' }, { id: 7, name: 'Corporate Gifting', href: '/category/gifting/corporate' }, { id: 8, name: 'Wedding Favors', href: '/category/gifting/wedding' }] },
  { id: 8, name: 'Offers', href: '/offers', items: [{ id: 1, name: 'Flash Sales', href: '/offers/flash-sales' }, { id: 2, name: 'Buy 1 Get 1', href: '/offers/bogo' }, { id: 3, name: 'New Arrivals Sale', href: '/offers/new-arrivals' }, { id: 4, name: 'Clearance Sale', href: '/offers/clearance' }, { id: 5, name: 'Combo Offers', href: '/offers/combo' }, { id: 6, name: 'Seasonal Sales', href: '/offers/seasonal' }, { id: 7, name: 'Member Exclusive', href: '/offers/member-exclusive' }, { id: 8, name: 'Bundle Deals', href: '/offers/bundles' }] }
];

export default function Home() {
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const wishlistData = JSON.parse(localStorage.getItem('tb_wishlist') || '[]');
    setWishlist(wishlistData);
  }, []);

  const addToCart = (product: { id: number; name: string; price: number; image: string }) => {
    const cart: { id: number; name: string; price: number; image: string; quantity: number }[] = JSON.parse(localStorage.getItem('tb_cart') || '[]');
    const existing = cart.find((p) => p.id === product.id);
    if (existing) existing.quantity += 1;
    else cart.push({ ...product, quantity: 1 });
    localStorage.setItem('tb_cart', JSON.stringify(cart));
  };

  const isProductInCart = (productId: number) => {
    if (!isClient) return false;
    try {
      const cart = JSON.parse(localStorage.getItem('tb_cart') || '[]');
      return cart.some((p: { id: number }) => p.id === productId);
    } catch { 
      return false; 
    }
  };

  const toggleWishlist = (productId: number) => {
    if (typeof window === 'undefined') return;
    try {
      const currentWishlist = [...wishlist];
      const index = currentWishlist.indexOf(productId);
      
      if (index > -1) {
        currentWishlist.splice(index, 1);
      } else {
        currentWishlist.push(productId);
      }
      
      localStorage.setItem('tb_wishlist', JSON.stringify(currentWishlist));
      setWishlist(currentWishlist);
    } catch { }
  };

  return (
    <div className="min-h-screen gradient-bg">
      <Header />
      <main className="pt-24 pb-16 md:pt-32 md:pb-24">
      <section className="pb-16 md:pb-24 border-b border-rose-200/60">
        <div className="container mx-auto px-4 md:px-8">
          <Swiper modules={[Autoplay, Pagination, Navigation]} autoplay={{ delay: 5000, disableOnInteraction: false }} pagination={{ clickable: true }} navigation={true} loop={true} className="rounded-3xl overflow-hidden pastel-shadow border border-rose-200/60">
            {heroSlides.map((slide) => (
              <SwiperSlide key={slide.id}>
                <div className={`min-h-[500px] md:min-h-[600px] bg-gradient-to-r ${slide.bgColor} flex flex-col md:flex-row`}>
                  <div className="flex-1 flex items-center p-8 md:p-16 animate-slide-in-left">
                    <div className="max-w-lg">
                      <h1 className="text-4xl md:text-5xl font-playfair font-bold text-gray-800 mb-4 leading-tight">{slide.title}</h1>
                      <p className="text-gray-600 text-lg mb-6 leading-relaxed">{slide.tagline}</p>
                      <ul className="space-y-2 mb-8">
                        {slide.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-gray-600"><span className="w-2 h-2 bg-pink-400 rounded-full flex-shrink-0" />{benefit}</li>
                        ))}
                      </ul>
                      <button className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-8 py-3 rounded-full font-medium hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">{slide.buttonText}</button>
                    </div>
                  </div>
                  <div className="flex-1 flex items-center justify-center p-8 animate-slide-in-right">
                    <img src={slide.image} alt={slide.title} className="max-h-80 md:max-h-96 w-auto object-contain drop-shadow-lg" />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      <section className="py-16 md:py-24 border-b border-rose-200/60">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-10 md:mb-12">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-800 mb-2">Shop Our Collection</h2>
            <p className="text-gray-600 max-w-xl mx-auto text-sm md:text-base">Premium skincare & beauty essentials crafted for radiant, healthy skin</p>
          </div>
          <div className="shopping-zone rounded-2xl md:rounded-3xl p-6 md:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
              {products.map((product) => {
                const discountPercent = Math.round((1 - product.price / product.originalPrice) * 100);
                return (
                  <article key={product.id} className="product-card group bg-white/90 backdrop-blur-sm rounded-xl overflow-hidden border border-rose-100/80 flex flex-col h-full transition-all duration-300 hover:shadow-lg hover:shadow-rose-100/40 hover:border-rose-200/80">
                    <div className="relative h-40 sm:h-44 shrink-0 overflow-hidden bg-rose-50/60">
                      <img src={product.image} alt={product.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out" />
                      {discountPercent > 0 && <span className="absolute top-2 left-2 bg-rose-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded-md">{discountPercent}% OFF</span>}
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWishlist(product.id);
                        }}
                        className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/95 flex items-center justify-center text-rose-500 hover:bg-rose-50 transition-colors duration-300 opacity-0 group-hover:opacity-100 shadow-sm"
                        aria-label={wishlist.includes(product.id) ? "Remove from wishlist" : "Add to wishlist"}
                      >
                        <Heart className={`w-3.5 h-3.5 ${wishlist.includes(product.id) ? 'fill-rose-500' : ''}`} />
                      </button>
                    </div>
                    <div className="flex flex-col flex-1 p-3.5 md:p-4 min-h-0">
                      <h3 className="font-playfair font-semibold text-gray-800 text-base leading-tight line-clamp-2">{product.name}</h3>
                      <p className="text-gray-500 text-xs mt-0.5 line-clamp-1">{product.highlight}</p>
                      <div className="flex items-center gap-1.5 mt-2">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} className={`w-3 h-3 ${star <= Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'}`} />
                          ))}
                        </div>
                        <span className="text-[11px] text-gray-500">{product.rating}</span>
                      </div>
                      <div className="flex items-baseline gap-2 mt-2">
                        <span className="text-lg font-bold text-gray-900">₹{product.price.toFixed(2)}</span>
                        {product.originalPrice > product.price && <span className="text-xs text-gray-400 line-through font-medium">₹{product.originalPrice.toFixed(2)}</span>}
                      </div>
                      <div className="mt-3">
                        {isProductInCart(product.id) ? (
                        <Link href="/cart" className="w-full bg-rose-600 text-white py-2 px-3 rounded-lg text-xs font-medium hover:bg-rose-700 transition-colors duration-300 flex items-center justify-center gap-1.5"><ShoppingBag className="w-3.5 h-3.5" />Go to Cart</Link>
                      ) : (
                        <button onClick={() => addToCart(product)} className="w-full bg-rose-500 text-white py-2 px-3 rounded-lg text-xs font-medium hover:bg-rose-600 transition-colors duration-300 flex items-center justify-center gap-1.5"><ShoppingBag className="w-3.5 h-3.5" />Add to Cart</button>
                      )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 border-y border-rose-200/60">
        <div className="container mx-auto px-4 md:px-8">
          <div className="mb-8 md:mb-10">
            <span className="text-rose-500 text-sm font-medium tracking-wider uppercase">Latest & Trending</span>
            <h2 className="text-2xl md:text-3xl font-playfair font-bold text-gray-800 mt-1">Discover the Glow</h2>
          </div>
          <div className="rounded-2xl border border-rose-200/60 p-6 md:p-8 bg-white/30">
            <Swiper modules={[Autoplay, Pagination, Navigation]} autoplay={{ delay: 4000, disableOnInteraction: false }} pagination={{ clickable: true }} navigation={true} loop={true} speed={600} slidesPerView={1} spaceBetween={24} breakpoints={{ 640: { slidesPerView: 1.2, spaceBetween: 20 }, 768: { slidesPerView: 1.5, spaceBetween: 24 }, 1024: { slidesPerView: 2, spaceBetween: 28 }, 1280: { slidesPerView: 2.5, spaceBetween: 32 } }} className="promo-carousel rounded-2xl overflow-visible">
              {promotionalSlides.map((slide) => (
                <SwiperSlide key={slide.id}>
                  <article className="group relative h-80 sm:h-96 md:h-[420px] rounded-2xl overflow-hidden bg-gradient-to-br from-rose-50 to-pink-50 border border-rose-100/60 shadow-[0_8px_32px_rgba(251,113,133,0.12)] transition-all duration-500 hover:shadow-[0_16px_48px_rgba(251,113,133,0.18)] hover:scale-[1.02]">
                    <video src={slide.video} autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-rose-900/30 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                      <h3 className="font-playfair font-bold text-white text-xl md:text-2xl mb-2 drop-shadow-lg">{slide.headline}</h3>
                      <p className="text-white/90 text-sm md:text-base mb-4 max-w-sm">{slide.benefit}</p>
                      <button className="bg-white/95 text-rose-700 px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl">{slide.cta}</button>
                    </div>
                  </article>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white/50 border-b border-rose-200/60">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[{ icon: Heart, title: "Premium Quality", description: "Luxury formulations with natural ingredients for exceptional results", gradient: "from-pink-400 to-rose-400", delay: "0s" }, { icon: ShoppingBag, title: "Fast Shipping", description: "Free shipping on orders over $50 with express delivery options", gradient: "from-purple-400 to-pink-400", delay: "0.2s" }, { icon: User, title: "Expert Support", description: "Personalized beauty consultations and 24/7 customer care", gradient: "from-rose-400 to-purple-400", delay: "0.4s" }].map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="text-center p-6 rounded-2xl bg-white/70 backdrop-blur-sm pastel-shadow animate-fade-in-up" style={{ animationDelay: feature.delay }}>
                  <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${feature.gradient} rounded-full flex items-center justify-center`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      </main>
      <Footer />
    </div>
  );
}
