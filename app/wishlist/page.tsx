'use client';

import { useState, useEffect, useRef } from 'react';
import { Heart, ShoppingBag, Star, ArrowLeft, X } from 'lucide-react';
import Link from 'next/link';
import ThemeSelector from '../../components/ThemeSelector';

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  originalPrice: number;
  rating: number;
  highlight: string;
}

const categories = [
  { id: 1, name: 'Skincare', subcategories: ['Cleansers', 'Moisturizers', 'Serums', 'Sunscreen'] },
  { id: 2, name: 'Makeup', subcategories: ['Foundation', 'Lipstick', 'Eyeshadow', 'Mascara'] },
  { id: 3, name: 'Haircare', subcategories: ['Shampoo', 'Conditioner', 'Hair Oil', 'Styling'] },
  { id: 4, name: 'Fragrance', subcategories: ['Perfume', 'Body Mist', 'Deodorant'] },
  { id: 5, name: 'Wellness', subcategories: ['Supplements', 'Tea', 'Vitamins'] }
];

const products: Product[] = [
  { id: 1, name: 'Vitamin C Glow Serum', image: '/images/products/serum-1.jpg', price: 899, originalPrice: 1200, rating: 4.8, highlight: 'Brightening & Antioxidant' },
  { id: 2, name: 'Hydra-Boost Moisturizer', image: '/images/products/moisturizer-1.jpg', price: 649, originalPrice: 850, rating: 4.7, highlight: '24hr Hydration' },
  { id: 3, name: 'Rose Quartz Roller', image: '/images/products/tool-1.jpg', price: 1299, originalPrice: 1800, rating: 4.9, highlight: 'Facial Massager' },
  { id: 4, name: 'Lip Plumping Gloss', image: '/images/products/lip-1.jpg', price: 599, originalPrice: 750, rating: 4.6, highlight: 'Hydrating & Shiny' },
  { id: 5, name: 'Charcoal Face Mask', image: '/images/products/mask-1.jpg', price: 399, originalPrice: 500, rating: 4.5, highlight: 'Deep Cleansing' },
  { id: 6, name: 'Mineral Foundation', image: '/images/products/foundation-1.jpg', price: 1199, originalPrice: 1500, rating: 4.8, highlight: 'Lightweight Coverage' }
];

export default function WishlistPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isAffiliate, setIsAffiliate] = useState(false);
  const [categoriesMenuOpen, setCategoriesMenuOpen] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(80);
  const [activeCategory, setActiveCategory] = useState<number | null>(categories[0]?.id || null);
  const [mobileOpenCategory, setMobileOpenCategory] = useState<number | null>(null);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [wishlist, setWishlist] = useState<Product[]>([]);

  const menuRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const updateHeaderHeight = () => {
      const header = document.querySelector('header');
      if (header) setHeaderHeight(header.offsetHeight);
    };
    updateHeaderHeight();
    window.addEventListener('resize', updateHeaderHeight);
    window.addEventListener('scroll', updateHeaderHeight);
    return () => {
      window.removeEventListener('resize', updateHeaderHeight);
      window.removeEventListener('scroll', updateHeaderHeight);
    };
  }, []);

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    const userData = localStorage.getItem('user');
    const profileData = localStorage.getItem('profile');
    setIsLoggedIn(!!authToken);
    if (authToken && userData) {
      const parsedUser = JSON.parse(userData);
      const parsedProfile = profileData ? JSON.parse(profileData) : null;
      setUser({ ...parsedUser, ...parsedProfile });
      setIsAffiliate(!!localStorage.getItem('isAffiliate') || !!parsedProfile?.isAffiliate);
    }
  }, []);

  useEffect(() => {
    if (categoriesMenuOpen && categories.length > 0) setActiveCategory(categories[0].id);
  }, [categoriesMenuOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => { 
      if (e.key === 'Escape' && categoriesMenuOpen) setCategoriesMenuOpen(false); 
    };
    if (categoriesMenuOpen) document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [categoriesMenuOpen]);

  useEffect(() => {
    const cartCount = getCartCount();
    setCartCount(cartCount);
    
    const wishlistData = getWishlist();
    setWishlist(wishlistData);
  }, []);

  const getCartCount = () => {
    if (typeof window === 'undefined') return 0;
    try {
      const cart = JSON.parse(localStorage.getItem('tb_cart') || '[]');
      return cart.reduce((sum: number, item: { quantity?: number }) => sum + (item.quantity || 1), 0);
    } catch { return 0; }
  };

  const getWishlist = (): Product[] => {
    if (typeof window === 'undefined') return [];
    try {
      const wishlist = JSON.parse(localStorage.getItem('tb_wishlist') || '[]');
      return wishlist.map((id: number) => products.find(p => p.id === id)).filter(Boolean);
    } catch { return []; }
  };

  const removeFromWishlist = (productId: number) => {
    if (typeof window === 'undefined') return;
    try {
      const wishlist = JSON.parse(localStorage.getItem('tb_wishlist') || '[]');
      const updatedWishlist = wishlist.filter((id: number) => id !== productId);
      localStorage.setItem('tb_wishlist', JSON.stringify(updatedWishlist));
      setWishlist(wishlist.map((id: number) => products.find(p => p.id === id)).filter(Boolean));
    } catch { }
  };

  const isProductInCart = (productId: number) => {
    if (typeof window === 'undefined') return false;
    try {
      const cart = JSON.parse(localStorage.getItem('tb_cart') || '[]');
      return cart.some((item: { productId: number }) => item.productId === productId);
    } catch { return false; }
  };

  const addToCart = (product: Product) => {
    if (typeof window === 'undefined') return;
    try {
      const cart = JSON.parse(localStorage.getItem('tb_cart') || '[]');
      const existingItem = cart.find((item: { productId: number }) => item.productId === product.id);
      if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 1) + 1;
      } else {
        cart.push({ productId: product.id, quantity: 1 });
      }
      localStorage.setItem('tb_cart', JSON.stringify(cart));
      setCartCount(getCartCount());
    } catch { }
  };

  const activeCategoryData = categories.find(c => c.id === activeCategory) || categories[0];
  const displayName = user?.name || user?.email || `+91 ${user?.phone || ''}`;
  const displayInitials = user?.name ? user.name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2) : user?.email?.[0].toUpperCase() || 'U';

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50/30 via-white to-purple-50/30">
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'border-b-2 bg-white/95 backdrop-blur-md shadow-sm py-3 border-rose-200' : 'border-b-2 bg-white/80 py-5 border-rose-200'}`}>
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Link href="/" className="flex items-center gap-1">
                <img src="/images/logo/trueBeauty-Logo.png" alt="True Beauty Logo" width={100} height={30} className="object-contain" />
                <span className="text-xl font-playfair font-bold text-gray-800 hidden md:block">True Beauty</span>
              </Link>
            </div>
            <nav className="hidden lg:flex items-center space-x-8 flex-1 justify-center">
              <div className="relative">
                <input type="text" placeholder="Search products..." className="w-96 px-5 py-2.5 pl-11 rounded-full border border-gray-200 focus:border-pink-300 focus:ring-2 focus:ring-pink-100 transition-all bg-white/80 backdrop-blur-sm text-base" />
                <svg className="absolute left-4 top-3 text-gray-400 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </nav>
            <div className="hidden lg:flex items-center space-x-4">
              {isLoggedIn && user ? (
                <div className="relative" ref={profileDropdownRef}>
                  <button type="button" onClick={() => setProfileDropdownOpen(!profileDropdownOpen)} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                      {displayInitials}
                    </div>
                    <span className="hidden md:block text-sm font-medium text-gray-700 max-w-[120px] truncate">
                      {displayName}
                    </span>
                    <svg className={`w-4 h-4 text-gray-500 transition-transform ${profileDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {profileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900 truncate">{user.name || user.email}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                      <Link href="/profile" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                        <User className="w-4 h-4 mr-3" />
                        My Profile
                      </Link>
                      <Link href="/orders" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                        <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        My Orders
                      </Link>
                      <Link href="/wishlist" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 bg-rose-50 text-rose-600">
                        <Heart className="w-4 h-4 mr-3" />
                        Wishlist
                      </Link>
                      <div className="border-t border-gray-100 my-2"></div>
                      <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                        <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link href="/login" className="flex items-center gap-2 text-gray-700 hover:text-pink-500 transition-colors font-medium">
                  <User className="w-5 h-5" />
                  Login
                </Link>
              )}
              <ThemeSelector />
              <Link href="/affiliate" className="text-gray-700 hover:text-pink-500 transition-colors font-medium">Affiliate</Link>
              <Link href="/cart" className="flex items-center gap-2 text-gray-700 hover:text-pink-500 transition-colors font-medium relative">
                <ShoppingBag className="w-5 h-5" />
                Cart
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-2">
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1' : ''}`}></span>
                <span className={`block w-6 h-0.5 bg-gray-700 my-1 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1' : ''}`}></span>
              </div>
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
            <div className="container mx-auto px-4 py-4">
              <div className="space-y-3">
                <div className="relative">
                  <input type="text" placeholder="Search products..." className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-200 focus:border-pink-300 focus:ring-2 focus:ring-pink-100" />
                  <svg className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                {isLoggedIn && user ? (
                  <div className="px-4 py-2">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center text-white font-semibold">
                        {displayInitials}
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{displayName}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </div>
                    <Link href="/profile" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2 text-gray-700 py-2">
                      <User className="w-5 h-5" />Profile
                    </Link>
                    <Link href="/orders" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2 text-gray-700 py-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                      My Orders
                    </Link>
                    <Link href="/wishlist" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2 text-gray-700 py-2 bg-rose-50 text-rose-600 rounded-lg">
                      <Heart className="w-5 h-5" />Wishlist
                    </Link>
                  </div>
                ) : (
                  <Link href="/login" className="text-left px-4 py-2 text-gray-700 hover:text-pink-500 transition-colors font-medium block" onClick={() => setIsMenuOpen(false)}>
                    <User className="inline mr-2 w-4 h-4" />Login
                  </Link>
                )}
                <Link href="/affiliate" className="text-left px-4 py-2 text-gray-700 hover:text-pink-500 transition-colors font-medium block" onClick={() => setIsMenuOpen(false)}>Affiliate</Link>
                <Link href="/cart" onClick={() => setIsMenuOpen(false)} className="flex items-center px-4 py-2 text-gray-700 hover:text-pink-500 transition-colors font-medium">
                  <ShoppingBag className="mr-2 w-5 h-5" />Cart ({cartCount})
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center gap-4 mb-8">
            <Link href="/" className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </Link>
            <div>
              <h1 className="text-2xl md:text-3xl font-playfair font-bold text-gray-800">My Wishlist</h1>
              <p className="text-gray-600 mt-1">{wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} saved</p>
            </div>
          </div>

          {wishlist.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 bg-rose-100 rounded-full flex items-center justify-center">
                <Heart className="w-12 h-12 text-rose-400" />
              </div>
              <h2 className="text-2xl font-playfair font-bold text-gray-800 mb-2">Your wishlist is empty</h2>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">Start adding products you love to your wishlist</p>
              <Link href="/" className="inline-flex items-center gap-2 bg-rose-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-rose-600 transition-colors">
                <ShoppingBag className="w-5 h-5" />
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
              {wishlist.map((product) => {
                const discountPercent = Math.round((1 - product.price / product.originalPrice) * 100);
                return (
                  <article key={product.id} className="product-card group bg-white/90 backdrop-blur-sm rounded-xl overflow-hidden border border-rose-100/80 flex flex-col h-full transition-all duration-300 hover:shadow-lg hover:shadow-rose-100/40 hover:border-rose-200/80">
                    <div className="relative h-40 sm:h-44 shrink-0 overflow-hidden bg-rose-50/60">
                      <img src={product.image} alt={product.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out" />
                      {discountPercent > 0 && (
                        <span className="absolute top-2 left-2 bg-rose-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded-md">
                          {discountPercent}% OFF
                        </span>
                      )}
                      <button 
                        onClick={() => removeFromWishlist(product.id)}
                        className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/95 flex items-center justify-center text-rose-500 hover:bg-rose-50 transition-colors duration-300 shadow-sm"
                        aria-label="Remove from wishlist"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="flex flex-col flex-1 p-3.5 md:p-4 min-h-0">
                      <h3 className="font-playfair font-semibold text-gray-800 text-base leading-tight line-clamp-2">
                        {product.name}
                      </h3>
                      <p className="text-gray-500 text-xs mt-0.5 line-clamp-1">{product.highlight}</p>
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
                      <div className="flex items-baseline gap-2 mt-2">
                        <span className="text-lg font-bold text-gray-900">₹{product.price.toFixed(2)}</span>
                        {product.originalPrice > product.price && (
                          <span className="text-xs text-gray-400 line-through font-medium">
                            ₹{product.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                      <div className="mt-3 flex gap-1.5">
                        {isProductInCart(product.id) ? (
                          <Link 
                            href="/cart" 
                            className="flex-1 bg-rose-600 text-white py-2 px-3 rounded-lg text-xs font-medium hover:bg-rose-700 transition-colors duration-300 flex items-center justify-center gap-1.5"
                          >
                            <ShoppingBag className="w-3.5 h-3.5" />Go to Cart
                          </Link>
                        ) : (
                          <button 
                            onClick={() => addToCart(product)}
                            className="flex-1 bg-rose-500 text-white py-2 px-3 rounded-lg text-xs font-medium hover:bg-rose-600 transition-colors duration-300 flex items-center justify-center gap-1.5"
                          >
                            <ShoppingBag className="w-3.5 h-3.5" />Add to Cart
                          </button>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function User({ className }: { className?: string }) { 
  return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>; 
}