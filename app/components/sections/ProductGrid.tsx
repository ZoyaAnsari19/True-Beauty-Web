'use client';

import { Heart, ShoppingBag, Star } from 'lucide-react';
import { Product } from '@/app/data/constants';

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  return (
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
                  {/* Image Container */}
                  <div className="relative h-40 sm:h-44 shrink-0 overflow-hidden bg-rose-50/60">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out"
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
                  {/* Content */}
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
                    {/* Price */}
                    <div className="flex items-baseline gap-2 mt-2">
                      <span className="text-lg font-bold text-gray-900">₹{product.price.toFixed(2)}</span>
                      {product.originalPrice > product.price && (
                        <span className="text-xs text-gray-400 line-through font-medium">₹{product.originalPrice.toFixed(2)}</span>
                      )}
                    </div>
                    {/* CTA */}
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
  );
}
