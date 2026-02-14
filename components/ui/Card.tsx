'use client';

import Link from 'next/link';
import { MapPin, Eye, Zap } from 'lucide-react';
import type { Product, BeautyService } from '../../utils/catalog';
import {
  DEFAULT_COUPON_CODE,
  DEFAULT_COUPON_DISCOUNT,
  isDefaultCouponEligibleProduct,
} from '../../utils/coupons';

const cardBaseClass =
  'group bg-white/90 backdrop-blur-sm rounded-xl overflow-hidden border border-rose-100/80 flex flex-col h-full transition-all duration-300 hover:shadow-lg hover:shadow-rose-100/40 hover:border-rose-200/80';

type ProductCardProps = {
  variant: 'product';
  item: Product;
  onBuyNow: (product: Product) => void;
};

type ServiceCardProps = {
  variant: 'service';
  item: BeautyService;
  onBook: () => void;
};

export type CardProps = ProductCardProps | ServiceCardProps;

export function Card(props: CardProps) {
  if (props.variant === 'product') {
    const { item: product, onBuyNow } = props;
    const showCouponBadge = isDefaultCouponEligibleProduct(product);

    return (
      <article className={cardBaseClass}>
        <Link
          href={`/product/${product.id}`}
          className="relative block aspect-square sm:aspect-[4/3] overflow-hidden bg-rose-50/60"
        >
          <img
            src={product.image}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300"
          />
        </Link>
        <div className="flex flex-col flex-1 p-3 sm:p-4 min-h-0 min-w-0 overflow-hidden">
          <h3 className="font-playfair font-semibold text-gray-800 text-sm sm:text-base md:text-lg leading-snug line-clamp-2">
            {product.name}
          </h3>
          <div className="mt-2 flex items-start justify-between gap-2">
            <div className="flex items-baseline gap-1.5 sm:gap-2">
              <span className="text-base sm:text-lg font-bold text-gray-900">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-xs sm:text-sm text-gray-400 line-through">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>
            {showCouponBadge && (
              <div className="hidden sm:flex flex-col items-end">
                <div className="inline-flex items-center rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-semibold px-2 py-0.5">
                  <span className="mr-1">🎟</span>₹
                  {DEFAULT_COUPON_DISCOUNT.toLocaleString('en-IN')} OFF
                </div>
                <p className="mt-0.5 text-[10px] text-emerald-700">
                  Code: <span className="font-semibold">{DEFAULT_COUPON_CODE}</span>
                </p>
              </div>
            )}
          </div>
          <div className="mt-3 flex flex-col gap-2 sm:mt-4 sm:flex-row sm:items-stretch sm:gap-3 min-w-0">
            <button
              type="button"
              onClick={() => onBuyNow(product)}
              className="w-full sm:flex-1 min-w-0 h-10 sm:h-11 px-3 md:px-4 inline-flex items-center justify-center gap-1.5 md:gap-2 bg-rose-500 text-white rounded-lg text-xs sm:text-sm md:text-base font-medium hover:bg-rose-600 transition-colors duration-300 shrink-0 whitespace-nowrap"
            >
              <Zap className="w-3.5 h-3.5 md:w-4 md:h-4 flex-shrink-0" />
              Buy Now
            </button>
            <Link
              href={`/product/${product.id}`}
              className="hidden sm:inline-flex sm:flex-1 min-w-0 h-11 px-3 md:px-4 items-center justify-center gap-1.5 md:gap-2 bg-blue-500 text-white rounded-lg text-xs sm:text-sm md:text-base font-medium hover:bg-blue-600 transition-colors duration-300 shrink-0 whitespace-nowrap"
            >
              <Eye className="w-3.5 h-3.5 md:w-4 md:h-4 flex-shrink-0" />
              View Details
            </Link>
          </div>
          <Link
            href={`/product/${product.id}`}
            className="mt-1 inline-block text-[11px] text-rose-600 hover:text-rose-700 hover:underline sm:hidden"
          >
            View details
          </Link>
        </div>
      </article>
    );
  }

  const { item: service, onBook } = props;
  return (
    <article className={cardBaseClass}>
      <div className="relative h-40 sm:h-48 overflow-hidden bg-rose-50/60">
        <img
          src={service.image}
          alt={service.serviceName}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out"
        />
      </div>
      <div className="flex flex-col flex-1 p-4 sm:p-5">
        <div className="mb-2">
          <p className="text-xs uppercase tracking-wide text-rose-500 font-semibold">
            Beauty Parlour Service
          </p>
          <h3 className="font-playfair font-semibold text-gray-800 text-base sm:text-lg leading-tight line-clamp-2">
            {service.parlourName}
          </h3>
        </div>
        <p className="flex items-center gap-1 text-xs sm:text-sm text-gray-500 mb-2">
          <MapPin className="w-3.5 h-3.5 flex-shrink-0 text-rose-400" />
          <span className="line-clamp-1">{service.location}</span>
        </p>
        <p className="text-sm text-gray-700 font-medium mb-2 line-clamp-2">
          {service.serviceName}
        </p>
        <div className="mt-auto flex flex-col gap-3">
          <div>
            <span className="block text-xs text-gray-500 uppercase tracking-wide">
              Starting from
            </span>
            <span className="text-lg font-bold text-gray-900">
              ₹{service.startingPrice.toLocaleString('en-IN')}
            </span>
          </div>
          <div className="flex flex-row flex-nowrap items-stretch gap-2 md:gap-3 min-w-0">
            <button
              type="button"
              onClick={onBook}
              className="flex-1 min-w-0 md:min-w-[110px] min-h-[40px] md:min-h-[44px] px-3 sm:px-4 py-2 inline-flex items-center justify-center rounded-lg bg-rose-500 text-white text-xs sm:text-sm font-medium hover:bg-rose-600 transition-colors duration-200 shrink-0 whitespace-nowrap"
            >
              Book Appointment
            </button>
            <Link
              href={`/appointment/appointmentDetails?id=${service.id}`}
              className="flex-1 min-w-0 md:min-w-[110px] min-h-[40px] md:min-h-[44px] px-3 sm:px-4 py-2 inline-flex items-center justify-center rounded-lg bg-blue-500 text-white text-xs sm:text-sm font-medium hover:bg-blue-600 transition-colors duration-200 shrink-0 whitespace-nowrap"
            >
              <Eye className="w-3.5 h-3.5 flex-shrink-0 mr-1.5" />
              View Details
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

export default Card;
