'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { HeroSlide } from '@/app/data/constants';

interface HeroSectionProps {
  slides: HeroSlide[];
  autoplayDelay?: number;
  className?: string;
}

export default function HeroSection({ 
  slides, 
  autoplayDelay = 5000,
  className = '' 
}: HeroSectionProps) {
  return (
    <section className={`pt-24 pb-16 md:pt-32 md:pb-24 border-b border-rose-200/60 ${className}`}>
      <div className="container mx-auto px-4 md:px-8">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          autoplay={{
            delay: autoplayDelay,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          navigation={true}
          loop={true}
          className="rounded-3xl overflow-hidden pastel-shadow border border-rose-200/60"
        >
          {slides.map((slide) => (
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
  );
}
