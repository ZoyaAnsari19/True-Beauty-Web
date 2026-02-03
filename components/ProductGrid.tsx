'use client';

import { useMemo, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Zap, Eye } from 'lucide-react';
import { products, getProductsByCategory } from '../utils/products';
import { getCategoryNameBySlug } from '../utils/categories';
import type { Product } from '../utils/products';

type ProductGridProps = {
  /** When provided, filter by category (and optional subcategory). When omitted, show all products or use `products` prop. */
  categorySlug?: string;
  subcategorySlug?: string;
  /** Pre-filtered products (e.g. from category page). When provided, used as-is and categorySlug is ignored. */
  products?: Product[];
  /** Optional title above the grid. When categorySlug is set and title not provided, shows "Showing [Category] Products". */
  title?: string;
  /** Optional subtitle. */
  subtitle?: string;
};

const EMPTY_MESSAGE = 'No products available in this category yet.';

export default function ProductGrid({
  categorySlug,
  subcategorySlug,
  products: productsProp,
  title: titleProp,
  subtitle,
}: ProductGridProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryFromUrl = categorySlug ?? searchParams.get('category') ?? '';
  const subcategoryFromUrl = subcategorySlug ?? searchParams.get('subcategory') ?? '';

  const addToCartAndGo = (product: Product) => {
    const cart: { id: number; name: string; price: number; image: string; quantity: number }[] =
      typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('tb_cart') || '[]') : [];
    const existing = cart.find((p) => p.id === product.id);
    if (existing) existing.quantity += 1;
    else cart.push({ id: product.id, name: product.name, price: product.price, image: product.image, quantity: 1 });
    if (typeof window !== 'undefined') localStorage.setItem('tb_cart', JSON.stringify(cart));
    router.push('/cart');
  };

  const filteredProducts = useMemo(() => {
    if (productsProp) return productsProp;
    if (categoryFromUrl) return getProductsByCategory(categoryFromUrl, subcategoryFromUrl || undefined);
    return products;
  }, [productsProp, categoryFromUrl, subcategoryFromUrl]);

  useEffect(() => {
    if (!categoryFromUrl || typeof document === 'undefined') return;
    const el = document.getElementById('products');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [categoryFromUrl]);

  const title = titleProp ?? (categoryFromUrl ? `Showing ${getCategoryNameBySlug(categoryFromUrl)} Products` : 'Shop Our Collection');
  const showSubtitle = subtitle && !categoryFromUrl;
  const showEmptyState = filteredProducts.length === 0;

  return (
    <div className="w-full">
      {(title || showSubtitle) && (
        <div className="text-center mb-8 md:mb-10">
          {title && (
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-playfair font-bold text-gray-800 mb-2">
              {title}
            </h2>
          )}
          {showSubtitle && (
            <p className="text-gray-600 max-w-xl mx-auto text-sm md:text-base">{subtitle}</p>
          )}
        </div>
      )}

      {showEmptyState ? (
        <div className="text-center py-12 md:py-16 px-4 rounded-2xl bg-white/50 border border-rose-100/80">
          <p className="text-gray-600 text-base md:text-lg mb-4">{EMPTY_MESSAGE}</p>
          {categoryFromUrl && (
            <Link
              href="/"
              className="inline-flex items-center text-rose-600 hover:text-rose-700 font-medium text-sm"
            >
              ← Back to all products
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
          {filteredProducts.map((product) => (
            <article
              key={product.id}
              className="group bg-white/90 backdrop-blur-sm rounded-xl overflow-hidden border border-rose-100/80 flex flex-col h-full transition-all duration-300 hover:shadow-lg hover:shadow-rose-100/40 hover:border-rose-200/80"
            >
              <div className="relative aspect-square sm:aspect-[4/3] overflow-hidden bg-rose-50/60">
                <img
                  src={product.image}
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col flex-1 p-4 sm:p-5 min-h-0">
                <h3 className="font-playfair font-semibold text-gray-800 text-base sm:text-lg leading-tight line-clamp-2">
                  {product.name}
                </h3>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-lg font-bold text-gray-900">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  {product.originalPrice > product.price && (
                    <span className="text-sm text-gray-400 line-through">
                      ₹{product.originalPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                </div>
                <div className="mt-4 flex-1 flex items-end gap-2">
                  <button
                    type="button"
                    onClick={() => addToCartAndGo(product)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 bg-rose-500 text-white py-2.5 px-3 rounded-lg text-xs sm:text-sm font-medium hover:bg-rose-600 transition-colors duration-300"
                  >
                    <Zap className="w-3.5 h-3.5 flex-shrink-0" />
                    Buy Now
                  </button>
                  <Link
                    href={`/product/${product.id}`}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 bg-blue-500 text-white py-2.5 px-3 rounded-lg text-xs sm:text-sm font-medium hover:bg-blue-600 transition-colors duration-300"
                  >
                    <Eye className="w-3.5 h-3.5 flex-shrink-0" />
                    View Product
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
