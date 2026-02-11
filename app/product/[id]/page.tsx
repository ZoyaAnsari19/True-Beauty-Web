'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Link from 'next/link';
import { getProductById } from '../../../utils/catalog';
import { ArrowLeft, ShoppingBag, Star, Zap } from 'lucide-react';

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [cartVersion, setCartVersion] = useState(0);
  const product = getProductById(params.id as string);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const addToCart = () => {
    if (!product) return;
    const cart: { id: number; name: string; price: number; image: string; quantity: number }[] = JSON.parse(localStorage.getItem('tb_cart') || '[]');
    const existing = cart.find((p) => p.id === product.id);
    if (existing) existing.quantity += 1;
    else cart.push({ id: product.id, name: product.name, price: product.price, image: product.image, quantity: 1 });
    localStorage.setItem('tb_cart', JSON.stringify(cart));
    setCartVersion((v) => v + 1);
  };

  const isInCart = () => {
    if (!isClient || !product) return false;
    const cart = JSON.parse(localStorage.getItem('tb_cart') || '[]');
    return cart.some((p: { id: number }) => p.id === product.id);
  };

  if (!product) {
    return (
      <div className="min-h-screen gradient-bg">
        <Header />
        <main className="pt-24 pb-16 px-4 md:px-8">
          <div className="container mx-auto text-center py-16">
            <p className="text-gray-600 mb-4">Product not found</p>
            <Link href="/" className="text-rose-500 font-medium hover:underline">Back to home</Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const discountPercent = Math.round((1 - product.price / product.originalPrice) * 100);

  return (
    <div className="min-h-screen gradient-bg">
      <Header />
      <main className="pt-24 pb-16 px-4 md:px-8">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-6">
            <Link href="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-rose-500 transition-colors text-sm font-medium">
              <ArrowLeft className="w-4 h-4" /> Back to shop
            </Link>
          </div>
          <div className="bg-white/95 rounded-2xl border border-rose-100 shadow-sm overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 p-6 md:p-8">
              <div className="relative aspect-square max-w-md mx-auto md:mx-0 rounded-xl overflow-hidden bg-rose-50/60">
                <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
                {discountPercent > 0 && (
                  <span className="absolute top-3 left-3 bg-rose-500 text-white text-xs font-semibold px-2 py-1 rounded-md">{discountPercent}% OFF</span>
                )}
              </div>
              <div className="flex flex-col">
                <h1 className="text-2xl md:text-3xl font-playfair font-bold text-gray-800 mb-2">{product.name}</h1>
                <p className="text-rose-600 font-medium mb-3">{product.highlight}</p>
                {'bullets' in product && Array.isArray((product as { bullets?: string[] }).bullets) && (
                  <ul className="space-y-1.5 mb-4">
                    {((product as { bullets: string[] }).bullets).map((point, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-400 flex-shrink-0 mt-1.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                )}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className={`w-4 h-4 ${star <= Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'}`} />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">{product.rating} ({product.reviewCount} reviews)</span>
                </div>
                <div className="flex items-baseline gap-3 mb-6">
                  <span className="text-2xl font-bold text-gray-900">₹{product.price.toFixed(2)}</span>
                  {product.originalPrice > product.price && (
                    <span className="text-base text-gray-400 line-through font-medium">₹{product.originalPrice.toFixed(2)}</span>
                  )}
                </div>
                <div className="mt-auto flex flex-row gap-3">
                  <button onClick={() => { addToCart(); router.push('/cart'); }} className="flex-1 bg-rose-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-rose-600 transition-colors flex items-center justify-center gap-2">
                    <Zap className="w-5 h-5" /> Buy Now
                  </button>
                  {isInCart() ? (
                    <Link href="/cart" className="flex-1 bg-white border-2 border-rose-500 text-rose-600 py-3 px-4 rounded-lg font-medium hover:bg-rose-50 transition-colors flex items-center justify-center gap-2">
                      <ShoppingBag className="w-5 h-5" /> Go to Cart
                    </Link>
                  ) : (
                    <button onClick={addToCart} className="flex-1 bg-white border-2 border-rose-500 text-rose-600 py-3 px-4 rounded-lg font-medium hover:bg-rose-50 transition-colors flex items-center justify-center gap-2">
                      <ShoppingBag className="w-5 h-5" /> Add to Cart
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
