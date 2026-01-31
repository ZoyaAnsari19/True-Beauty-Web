'use client';

import { useState, useEffect } from 'react';
import { Search, User, Heart, ShoppingBag, Menu, X, Star } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const heroSlides = [
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
      id: 2,
      title: "Complete Beauty Ritual",
      tagline: "From night cream to Vitamin C serum — everything you need for a flawless skincare routine.",
      benefits: [
        "Expertly crafted formulations",
        "Soft blush & cream aesthetic",
        "Professional-grade results"
      ],
      buttonText: "Shop Now",
      image: "/images/heroSection/allProducts2.png",
      bgColor: "from-pink-50 to-purple-50"
    }
  ];

  const products = [
    {
      id: 1,
      name: "True Beauty Day Cream",
      highlight: "Bright, fresh & hydrated skin all day",
      image: "/images/products/dayCream.png",
      price: 24.99,
      originalPrice: 32.99,
      rating: 4.8,
      reviewCount: 128
    },
    {
      id: 2,
      name: "True Beauty Night Cream",
      highlight: "Repair & nourish while you sleep",
      image: "/images/products/nightCream.png",
      price: 28.99,
      originalPrice: 36.99,
      rating: 4.9,
      reviewCount: 94
    },
    {
      id: 3,
      name: "True Beauty Sunscreen",
      highlight: "Broad spectrum SPF protection",
      image: "/images/products/sunscreen.png",
      price: 22.99,
      originalPrice: 28.99,
      rating: 4.7,
      reviewCount: 156
    },
    {
      id: 4,
      name: "True Beauty Face Wash",
      highlight: "Gentle cleanser for radiant skin",
      image: "/images/products/faceWash.png",
      price: 18.99,
      originalPrice: 24.99,
      rating: 4.6,
      reviewCount: 203
    },
    {
      id: 5,
      name: "True Beauty Serum",
      highlight: "Intensive hydration & glow",
      image: "/images/products/serum.png",
      price: 34.99,
      originalPrice: 44.99,
      rating: 4.9,
      reviewCount: 87
    },
    {
      id: 6,
      name: "True Beauty Moisturizer",
      highlight: "24-hour lasting hydration",
      image: "/images/products/moisturizer.png",
      price: 26.99,
      originalPrice: 32.99,
      rating: 4.7,
      reviewCount: 112
    },
    {
      id: 7,
      name: "True Beauty Toner",
      highlight: "Balance & refine pores",
      image: "/images/products/toner.png",
      price: 19.99,
      originalPrice: 25.99,
      rating: 4.5,
      reviewCount: 76
    },
    {
      id: 8,
      name: "True Beauty Face Mask",
      highlight: "Deep detox & brightening",
      image: "/images/products/faceMask.png",
      price: 16.99,
      originalPrice: 21.99,
      rating: 4.8,
      reviewCount: 145
    },
    {
      id: 9,
      name: "True Beauty Lip Balm",
      highlight: "Nourishing moisture for lips",
      image: "/images/products/lipBalm.png",
      price: 9.99,
      originalPrice: 12.99,
      rating: 4.9,
      reviewCount: 234
    }
  ];

  const promotionalSlides = [
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

  return (
    <div className="min-h-screen gradient-bg">
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b-2 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-3 border-rose-200' : 'bg-white/80 py-5 border-rose-200'}`}>
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <img 
                src="/images/logo/trueBeauty-Logo.png" 
                alt="True Beauty Logo" 
                width={100} 
                height={30} 
                className="object-contain"
              />
              <span className="text-xl font-playfair font-bold text-gray-800 hidden md:block">True Beauty</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-96 px-5 py-2.5 pl-11 rounded-full border border-gray-200 focus:border-pink-300 focus:ring-2 focus:ring-pink-100 transition-all bg-white/80 backdrop-blur-sm text-base"
                />
                <Search className="absolute left-4 top-3 text-gray-400 w-5 h-5" />
              </div>
            </nav>

            {/* Right Navigation Buttons */}
            <div className="hidden lg:flex items-center space-x-4">
              <button className="px-4 py-2 text-gray-700 hover:text-pink-500 transition-colors font-medium">
                <User className="inline mr-2 w-4 h-4" />
                Login
              </button>
              <button className="px-4 py-2 text-gray-700 hover:text-pink-500 transition-colors font-medium">
                Join
              </button>
              <button className="px-4 py-2 text-gray-700 hover:text-pink-500 transition-colors font-medium">
                Affiliate
              </button>
              <div className="relative">
                <ShoppingBag className="w-6 h-6 text-gray-700 hover:text-pink-500 cursor-pointer transition-colors" />
                <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">0</span>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden p-2 text-gray-700"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden mt-4 pb-4 space-y-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full px-4 py-2.5 pl-11 rounded-full border border-gray-200 focus:border-pink-300 bg-white/80 backdrop-blur-sm text-base"
                />
                <Search className="absolute left-4 top-3 text-gray-400 w-5 h-5" />
              </div>
              <div className="flex flex-col space-y-3 pt-2">
                <button className="text-left px-4 py-2 text-gray-700 hover:text-pink-500 transition-colors font-medium">
                  <User className="inline mr-2 w-4 h-4" />
                  Login
                </button>
                <button className="text-left px-4 py-2 text-gray-700 hover:text-pink-500 transition-colors font-medium">
                  Join
                </button>
                <button className="text-left px-4 py-2 text-gray-700 hover:text-pink-500 transition-colors font-medium">
                  Affiliate
                </button>
                <div className="flex items-center px-4 py-2 text-gray-700 hover:text-pink-500 transition-colors font-medium">
                  <ShoppingBag className="mr-2 w-5 h-5" />
                  Cart (0)
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 border-b border-rose-200/60">
        <div className="container mx-auto px-4 md:px-8">
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            navigation={true}
            loop={true}
            className="rounded-3xl overflow-hidden pastel-shadow border border-rose-200/60"
          >
            {heroSlides.map((slide) => (
              <SwiperSlide key={slide.id}>
                <div className={`min-h-[500px] md:min-h-[600px] bg-gradient-to-r ${slide.bgColor} flex flex-col md:flex-row`}>
                  {/* Content Side */}
                  <div className="flex-1 flex items-center p-8 md:p-16 animate-slide-in-left">
                    <div className="max-w-lg">
                      <h1 className="text-4xl md:text-5xl font-playfair font-bold text-gray-800 mb-4 leading-tight">
                        {slide.title}
                      </h1>
                      <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                        {slide.tagline}
                      </p>
                      <ul className="space-y-2 mb-8">
                        {slide.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-gray-600">
                            <span className="w-2 h-2 bg-pink-400 rounded-full flex-shrink-0" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                      <button className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-8 py-3 rounded-full font-medium hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
                        {slide.buttonText}
                      </button>
                    </div>
                  </div>
                  
                  {/* Image Side */}
                  <div className="flex-1 flex items-center justify-center p-8 animate-slide-in-right">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="max-h-80 md:max-h-96 w-auto object-contain drop-shadow-lg"
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Product Grid Section */}
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
                <article
                  key={product.id}
                  className="product-card group bg-white/90 backdrop-blur-sm rounded-xl overflow-hidden border border-rose-100/80 flex flex-col h-full transition-all duration-300 hover:shadow-lg hover:shadow-rose-100/40 hover:border-rose-200/80"
                >
                  {/* Image Container - ~50% card height, object-cover */}
                  <div className="relative h-40 sm:h-44 shrink-0 overflow-hidden bg-rose-50/60">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                    {discountPercent > 0 && (
                      <span className="absolute top-2 left-2 bg-rose-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded-md">
                        {discountPercent}% OFF
                      </span>
                    )}
                    <button
                      className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/95 flex items-center justify-center text-gray-500 hover:text-rose-500 transition-colors duration-300 opacity-0 group-hover:opacity-100 shadow-sm"
                      aria-label="Add to wishlist"
                    >
                      <Heart className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  {/* Content - Compact, no extra whitespace */}
                  <div className="flex flex-col flex-1 p-3.5 md:p-4 min-h-0">
                    <h3 className="font-playfair font-semibold text-gray-800 text-base leading-tight line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-gray-500 text-xs mt-0.5 line-clamp-1">
                      {product.highlight}
                    </p>
                    <div className="flex items-center gap-1.5 mt-2">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-3 h-3 ${star <= Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'}`}
                          />
                        ))}
                      </div>
                      <span className="text-[11px] text-gray-500">{product.rating}</span>
                    </div>
                    {/* Bold price hierarchy */}
                    <div className="flex items-baseline gap-2 mt-2">
                      <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
                      {product.originalPrice > product.price && (
                        <span className="text-xs text-gray-400 line-through font-medium">${product.originalPrice.toFixed(2)}</span>
                      )}
                    </div>
                    {/* Clean CTA */}
                    <div className="mt-3 flex gap-1.5">
                      <button className="flex-1 bg-rose-500 text-white py-2 px-3 rounded-lg text-xs font-medium hover:bg-rose-600 transition-colors duration-300 flex items-center justify-center gap-1.5">
                        <ShoppingBag className="w-3.5 h-3.5" />
                        Add to Cart
                      </button>
                      <button
                        className="w-9 h-9 rounded-lg border border-rose-200 text-gray-500 hover:bg-rose-50 hover:text-rose-500 flex items-center justify-center transition-colors duration-300 shrink-0"
                        aria-label="Wishlist"
                      >
                        <Heart className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
          </div>
        </div>
      </section>

      {/* Promotional Video Carousel */}
      <section className="py-16 md:py-20 border-y border-rose-200/60">
        <div className="container mx-auto px-4 md:px-8">
          <div className="mb-8 md:mb-10">
            <span className="text-rose-500 text-sm font-medium tracking-wider uppercase">Latest & Trending</span>
            <h2 className="text-2xl md:text-3xl font-playfair font-bold text-gray-800 mt-1">Discover the Glow</h2>
          </div>
          <div className="rounded-2xl border border-rose-200/60 p-6 md:p-8 bg-white/30">
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            navigation={true}
            loop={true}
            speed={600}
            slidesPerView={1}
            spaceBetween={24}
            breakpoints={{
              640: { slidesPerView: 1.2, spaceBetween: 20 },
              768: { slidesPerView: 1.5, spaceBetween: 24 },
              1024: { slidesPerView: 2, spaceBetween: 28 },
              1280: { slidesPerView: 2.5, spaceBetween: 32 }
            }}
            className="promo-carousel rounded-2xl overflow-visible"
          >
            {promotionalSlides.map((slide) => (
              <SwiperSlide key={slide.id}>
                <article className="group relative h-80 sm:h-96 md:h-[420px] rounded-2xl overflow-hidden bg-gradient-to-br from-rose-50 to-pink-50 border border-rose-100/60 shadow-[0_8px_32px_rgba(251,113,133,0.12)] transition-all duration-500 hover:shadow-[0_16px_48px_rgba(251,113,133,0.18)] hover:scale-[1.02]">
                  <video
                    src={slide.video}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-rose-900/30 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <h3 className="font-playfair font-bold text-white text-xl md:text-2xl mb-2 drop-shadow-lg">
                      {slide.headline}
                    </h3>
                    <p className="text-white/90 text-sm md:text-base mb-4 max-w-sm">
                      {slide.benefit}
                    </p>
                    <button className="bg-white/95 text-rose-700 px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl">
                      {slide.cta}
                    </button>
                  </div>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white/50 border-b border-rose-200/60">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-2xl bg-white/70 backdrop-blur-sm pastel-shadow animate-fade-in-up">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full flex items-center justify-center">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Premium Quality</h3>
              <p className="text-gray-600">Luxury formulations with natural ingredients for exceptional results</p>
            </div>
            
            <div className="text-center p-6 rounded-2xl bg-white/70 backdrop-blur-sm pastel-shadow animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                <ShoppingBag className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Fast Shipping</h3>
              <p className="text-gray-600">Free shipping on orders over $50 with express delivery options</p>
            </div>
            
            <div className="text-center p-6 rounded-2xl bg-white/70 backdrop-blur-sm pastel-shadow animate-fade-in-up" style={{animationDelay: '0.4s'}}>
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-rose-400 to-purple-400 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Expert Support</h3>
              <p className="text-gray-600">Personalized beauty consultations and 24/7 customer care</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-white border-t-2 border-rose-200/60">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <img 
                src="/images/logo/trueBeauty-Logo.png" 
                alt="True Beauty Logo" 
                width={80} 
                height={25} 
                className="object-contain"
              />
              <span className="text-xl font-playfair font-bold text-gray-800">True Beauty</span>
            </div>
            <p className="text-gray-600 max-w-md mx-auto mb-6">
              Redefining beauty standards with premium, cruelty-free cosmetics crafted for the modern woman.
            </p>
            <div className="flex justify-center space-x-6 text-gray-500">
              <a href="#" className="hover:text-pink-500 transition-colors">About</a>
              <a href="#" className="hover:text-pink-500 transition-colors">Contact</a>
              <a href="#" className="hover:text-pink-500 transition-colors">Privacy</a>
              <a href="#" className="hover:text-pink-500 transition-colors">Terms</a>
            </div>
            <div className="mt-8 pt-6 border-t border-gray-100 text-gray-400 text-sm">
              © 2026 True Beauty. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
