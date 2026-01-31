'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { PromotionalSlide } from '@/app/data/constants';

interface PromotionalCarouselProps {
  slides: PromotionalSlide[];
  autoplayDelay?: number;
}

export default function PromotionalCarousel({ slides, autoplayDelay = 4000 }: PromotionalCarouselProps) {
  return (
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
              delay: autoplayDelay,
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
            {slides.map((slide) => (
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
  );
}
