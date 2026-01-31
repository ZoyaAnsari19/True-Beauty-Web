'use client';

import Header from '@/app/components/Header';
import HeroSection from '@/app/components/sections/HeroSection';
import ProductGrid from '@/app/components/sections/ProductGrid';
import PromotionalCarousel from '@/app/components/sections/PromotionalCarousel';
import FeaturesSection from '@/app/components/sections/FeaturesSection';
import Footer from '@/app/components/Footer';
import { heroSlides, products, promotionalSlides } from '@/app/data/constants';

export default function Home() {
  return (
    <div className="min-h-screen gradient-bg">
      <Header />
      <HeroSection slides={heroSlides} />
      <ProductGrid products={products} />
      <PromotionalCarousel slides={promotionalSlides} />
      <FeaturesSection />
      <Footer />
    </div>
  );
}
