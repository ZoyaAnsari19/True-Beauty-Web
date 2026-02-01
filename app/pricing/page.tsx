'use client';

import { useState, useEffect, useRef } from 'react';
import ThemeSelector from '../../components/ThemeSelector';
import { Check, ArrowRight, Star, Users, Zap, Shield } from 'lucide-react';
import Link from 'next/link';
import { getThemeById } from '../../utils/themeUtils';

export default function PricingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isAffiliate, setIsAffiliate] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [themeToPurchase, setThemeToPurchase] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const profileDropdownRef = useRef<HTMLDivElement>(null);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const getCartCount = () => {
    if (typeof window === 'undefined') return 0;
    try {
      const cart = JSON.parse(localStorage.getItem('tb_cart') || '[]');
      return cart.reduce((sum: number, item: { quantity?: number }) => sum + (item.quantity || 1), 0);
    } catch { return 0; }
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setCartCount(getCartCount());
  }, []);

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    const userData = localStorage.getItem('user');
    const profileData = localStorage.getItem('profile');
    const themePurchase = localStorage.getItem('theme_to_purchase');
    
    setIsLoggedIn(!!authToken);
    if (authToken && userData) {
      const parsedUser = JSON.parse(userData);
      const parsedProfile = profileData ? JSON.parse(profileData) : null;
      setUser({ ...parsedUser, ...parsedProfile });
      setIsAffiliate(!!localStorage.getItem('isAffiliate') || !!parsedProfile?.isAffiliate);
    }
    
    // Check if user is coming to purchase a theme
    if (themePurchase) {
      setThemeToPurchase(themePurchase);
    }
  }, []);

  const displayName = user?.name || user?.email || `+91 ${user?.phone || ''}`;
  const displayInitials = user?.name ? user.name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2) : user?.email?.[0].toUpperCase() || 'U';

  const plans = [
    {
      name: "Starter",
      price: "₹999",
      period: "/month",
      description: "Perfect for individuals getting started",
      features: [
        "Up to 100 products",
        "Basic analytics dashboard",
        "Email support",
        "Standard templates",
        "1GB storage"
      ],
      popular: false
    },
    {
      name: "Professional",
      price: "₹2,499",
      period: "/month",
      description: "Ideal for growing businesses",
      features: [
        "Up to 1,000 products",
        "Advanced analytics & reporting",
        "Priority email & chat support",
        "Custom templates",
        "10GB storage",
        "API access",
        "Multi-user accounts"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "₹4,999",
      period: "/month",
      description: "For large scale operations",
      features: [
        "Unlimited products",
        "Real-time analytics",
        "24/7 dedicated support",
        "White-label customization",
        "Unlimited storage",
        "Full API access",
        "Unlimited users",
        "Custom integrations"
      ],
      popular: false
    }
  ];

  const handleSelectPlan = (planName: string) => {
    localStorage.setItem('selectedPlan', planName);
    
    // If user is purchasing a theme, store it for later processing
    if (themeToPurchase) {
      localStorage.setItem('theme_purchase_in_progress', themeToPurchase);
    }
    
    window.location.href = '/pricing/subscribe';
  };

  const getThemeName = (themeId: string) => {
    const theme = getThemeById(themeId);
    return theme ? theme.name : 'Premium Theme';
  };

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
                        <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        My Profile
                      </Link>
                      <Link href="/orders" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                        <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        My Orders
                      </Link>
                      <Link href="/wishlist" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                        <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
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
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Login
                </Link>
              )}
              <Link href="/affiliate" className="text-gray-700 hover:text-pink-500 transition-colors font-medium">Affiliate</Link>
              <Link href="/cart" className="flex items-center gap-2 text-gray-700 hover:text-pink-500 transition-colors font-medium relative">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
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
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Profile
                    </Link>
                    <Link href="/orders" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2 text-gray-700 py-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                      My Orders
                    </Link>
                    <Link href="/wishlist" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2 text-gray-700 py-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      Wishlist
                    </Link>
                  </div>
                ) : (
                  <Link href="/login" className="text-left px-4 py-2 text-gray-700 hover:text-pink-500 transition-colors font-medium block" onClick={() => setIsMenuOpen(false)}>
                    <svg className="inline mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Login
                  </Link>
                )}
                <Link href="/affiliate" className="text-left px-4 py-2 text-gray-700 hover:text-pink-500 transition-colors font-medium block" onClick={() => setIsMenuOpen(false)}>Affiliate</Link>
                <Link href="/cart" onClick={() => setIsMenuOpen(false)} className="flex items-center px-4 py-2 text-gray-700 hover:text-pink-500 transition-colors font-medium">
                  <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  Cart ({cartCount})
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-8">
          {/* Theme Purchase Banner */}
          {themeToPurchase && (
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 mb-8 text-white text-center">
              <div className="flex items-center justify-center gap-3 mb-3">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
                <h2 className="text-2xl font-bold">Theme Purchase</h2>
              </div>
              <p className="text-lg mb-2">You're purchasing the <span className="font-bold">{getThemeName(themeToPurchase)}</span> theme</p>
              <p className="opacity-90">Select a plan below to complete your purchase</p>
            </div>
          )}

          {/* Hero Section */}
          <div className={`text-center mb-16 ${themeToPurchase ? 'mt-8' : ''}`}>
            <h1 className="text-4xl md:text-5xl font-playfair font-bold text-gray-800 mb-4">
              {themeToPurchase ? 'Complete Your Theme Purchase' : 'Choose Your Perfect Plan'}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {themeToPurchase 
                ? 'Select a subscription plan to unlock your premium theme' 
                : 'Scale your beauty business with our powerful e-commerce solutions'}
            </p>
          </div>

          {/* Plans Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {plans.map((plan, index) => (
              <div 
                key={index} 
                className={`relative bg-white rounded-2xl border-2 p-8 transition-all duration-300 hover:shadow-xl ${
                  plan.popular 
                    ? 'border-rose-500 shadow-lg scale-105' 
                    : 'border-gray-200 hover:border-rose-300'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-rose-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-500 ml-1">{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleSelectPlan(plan.name)}
                  className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
                    plan.popular
                      ? 'bg-rose-500 hover:bg-rose-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                  }`}
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>

          {/* Features Section */}
          <div className="bg-white rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl font-playfair font-bold text-center text-gray-800 mb-12">
              Everything You Need to Succeed
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-rose-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Lightning Fast</h3>
                <p className="text-gray-600">Optimized performance for the best user experience</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-purple-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Secure & Reliable</h3>
                <p className="text-gray-600">Enterprise-grade security for your business data</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-blue-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">24/7 Support</h3>
                <p className="text-gray-600">Dedicated support team ready to help you succeed</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}