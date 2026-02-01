'use client';

import { useState, useEffect, useRef } from 'react';
import ThemeSelector from '../../components/ThemeSelector';
import Link from 'next/link';
import { Package, Search, User, ShoppingBag, Menu, X, Grid3x3, ChevronDown, ChevronRight, MapPin, Wallet, LogOut } from 'lucide-react';

const categories = [
  { id: 1, name: 'Skincare', href: '/category/skincare', items: [{ id: 1, name: 'Face Wash & Cleansers', href: '/category/skincare/cleansers' }, { id: 2, name: 'Moisturizers', href: '/category/skincare/moisturizers' }, { id: 3, name: 'Serums & Essences', href: '/category/skincare/serums' }, { id: 4, name: 'Sunscreen & SPF', href: '/category/skincare/sunscreen' }, { id: 5, name: 'Toners & Mists', href: '/category/skincare/toners' }, { id: 6, name: 'Face Masks', href: '/category/skincare/masks' }, { id: 7, name: 'Eye Care', href: '/category/skincare/eye-care' }, { id: 8, name: 'Anti-Aging', href: '/category/skincare/anti-aging' }] },
  { id: 2, name: 'Makeup', href: '/category/makeup', items: [{ id: 1, name: 'Foundation & Concealer', href: '/category/makeup/foundation' }, { id: 2, name: 'Lipstick & Lip Care', href: '/category/makeup/lips' }, { id: 3, name: 'Eyeshadow & Palettes', href: '/category/makeup/eyes' }, { id: 4, name: 'Mascara & Eyeliners', href: '/category/makeup/eye-makeup' }, { id: 5, name: 'Blush & Highlighters', href: '/category/makeup/cheeks' }, { id: 6, name: 'Makeup Brushes', href: '/category/makeup/brushes' }, { id: 7, name: 'Setting Sprays', href: '/category/makeup/setting' }, { id: 8, name: 'Makeup Removers', href: '/category/makeup/removers' }] },
  { id: 3, name: 'Bath & Body', href: '/category/bath-body', items: [{ id: 1, name: 'Body Wash & Soaps', href: '/category/bath-body/cleansers' }, { id: 2, name: 'Body Lotions & Creams', href: '/category/bath-body/moisturizers' }, { id: 3, name: 'Body Scrubs & Exfoliants', href: '/category/bath-body/scrubs' }, { id: 4, name: 'Body Oils', href: '/category/bath-body/oils' }, { id: 5, name: 'Hand & Foot Care', href: '/category/bath-body/hand-foot' }, { id: 6, name: 'Bath Bombs & Salts', href: '/category/bath-body/bath-accessories' }, { id: 7, name: 'Deodorants', href: '/category/bath-body/deodorants' }, { id: 8, name: 'Body Mists', href: '/category/bath-body/mists' }] },
  { id: 4, name: 'Haircare', href: '/category/haircare', items: [{ id: 1, name: 'Shampoos', href: '/category/haircare/shampoos' }, { id: 2, name: 'Conditioners', href: '/category/haircare/conditioners' }, { id: 3, name: 'Hair Oils & Serums', href: '/category/haircare/oils' }, { id: 4, name: 'Hair Masks & Treatments', href: '/category/haircare/masks' }, { id: 5, name: 'Hair Styling Products', href: '/category/haircare/styling' }, { id: 6, name: 'Hair Accessories', href: '/category/haircare/accessories' }, { id: 7, name: 'Scalp Care', href: '/category/haircare/scalp' }, { id: 8, name: 'Hair Color', href: '/category/haircare/color' }] },
  { id: 5, name: 'Fragrance', href: '/category/fragrance', items: [{ id: 1, name: 'Perfumes', href: '/category/fragrance/perfumes' }, { id: 2, name: 'Body Mists', href: '/category/fragrance/mists' }, { id: 3, name: 'Eau de Toilette', href: '/category/fragrance/edt' }, { id: 4, name: 'Eau de Parfum', href: '/category/fragrance/edp' }, { id: 5, name: 'Roll-On Perfumes', href: '/category/fragrance/roll-on' }, { id: 6, name: 'Fragrance Gift Sets', href: '/category/fragrance/gift-sets' }, { id: 7, name: 'Scented Candles', href: '/category/fragrance/candles' }, { id: 8, name: 'Room Sprays', href: '/category/fragrance/room-sprays' }] },
  { id: 6, name: 'Wellness', href: '/category/wellness', items: [{ id: 1, name: 'Vitamins & Supplements', href: '/category/wellness/vitamins' }, { id: 2, name: 'Hair & Skin Gummies', href: '/category/wellness/gummies' }, { id: 3, name: 'Wellness Kits', href: '/category/wellness/kits' }, { id: 4, name: 'Ayurvedic Products', href: '/category/wellness/ayurvedic' }, { id: 5, name: 'Herbal Teas', href: '/category/wellness/teas' }, { id: 6, name: 'Self-Care Essentials', href: '/category/wellness/self-care' }, { id: 7, name: 'Wellness Accessories', href: '/category/wellness/accessories' }, { id: 8, name: 'Gift Sets', href: '/category/wellness/gift-sets' }] },
  { id: 7, name: 'Gifting', href: '/category/gifting', items: [{ id: 1, name: 'Skincare Gift Sets', href: '/category/gifting/skincare-sets' }, { id: 2, name: 'Makeup Gift Sets', href: '/category/gifting/makeup-sets' }, { id: 3, name: 'Luxury Gift Boxes', href: '/category/gifting/luxury-boxes' }, { id: 4, name: 'Personalized Gifts', href: '/category/gifting/personalized' }, { id: 5, name: 'Holiday Collections', href: '/category/gifting/holiday' }, { id: 6, name: 'Gift Cards', href: '/category/gifting/gift-cards' }, { id: 7, name: 'Corporate Gifting', href: '/category/gifting/corporate' }, { id: 8, name: 'Wedding Favors', href: '/category/gifting/wedding' }] },
  { id: 8, name: 'Offers', href: '/offers', items: [{ id: 1, name: 'Flash Sales', href: '/offers/flash-sales' }, { id: 2, name: 'Buy 1 Get 1', href: '/offers/bogo' }, { id: 3, name: 'New Arrivals Sale', href: '/offers/new-arrivals' }, { id: 4, name: 'Clearance Sale', href: '/offers/clearance' }, { id: 5, name: 'Combo Offers', href: '/offers/combo' }, { id: 6, name: 'Seasonal Sales', href: '/offers/seasonal' }, { id: 7, name: 'Member Exclusive', href: '/offers/member-exclusive' }, { id: 8, name: 'Bundle Deals', href: '/offers/bundles' }] }
];

export default function OrdersPage() {
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
  const menuRef = useRef<HTMLDivElement>(null);
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  const getCartCount = () => {
    if (typeof window === 'undefined') return 0;
    try {
      const cart = JSON.parse(localStorage.getItem('tb_cart') || '[]');
      return cart.reduce((sum: number, item: { quantity?: number }) => sum + (item.quantity || 1), 0);
    } catch { return 0; }
  };

  useEffect(() => { const handleScroll = () => setIsScrolled(window.scrollY > 20); window.addEventListener('scroll', handleScroll); return () => window.removeEventListener('scroll', handleScroll); }, []);
  useEffect(() => { setCartCount(getCartCount()); }, []);
  useEffect(() => {
    const updateHeaderHeight = () => { const header = document.querySelector('header'); if (header) setHeaderHeight(header.offsetHeight); };
    updateHeaderHeight();
    window.addEventListener('resize', updateHeaderHeight);
    window.addEventListener('scroll', updateHeaderHeight);
    return () => { window.removeEventListener('resize', updateHeaderHeight); window.removeEventListener('scroll', updateHeaderHeight); };
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
  useEffect(() => { if (categoriesMenuOpen && categories.length > 0) setActiveCategory(categories[0].id); }, [categoriesMenuOpen]);
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => { if (e.key === 'Escape' && categoriesMenuOpen) setCategoriesMenuOpen(false); };
    if (categoriesMenuOpen) document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [categoriesMenuOpen]);
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => { if (profileDropdownRef.current && !profileDropdownRef.current.contains(e.target as Node)) setProfileDropdownOpen(false); };
    if (profileDropdownOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [profileDropdownOpen]);

  const handleLogout = () => { localStorage.removeItem('authToken'); localStorage.removeItem('user'); localStorage.removeItem('profile'); sessionStorage.clear(); window.location.href = '/'; };
  const activeCategoryData = categories.find(cat => cat.id === activeCategory);
  const displayName = user?.name || user?.email || `+91 ${user?.phone || ''}`;
  const displayInitials = user?.name ? user.name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2) : user?.email?.[0].toUpperCase() || 'U';

  return (
    <div className="min-h-screen gradient-bg flex flex-col">
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b-2 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-3 border-rose-200' : 'bg-white/80 py-5 border-rose-200'}`}>
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <img src="/images/logo/trueBeauty-Logo.png" alt="True Beauty Logo" width={100} height={30} className="object-contain" />
              <span className="text-xl font-playfair font-bold text-gray-800 hidden md:block">True Beauty</span>
            </div>
            <nav className="hidden lg:flex items-center space-x-8 flex-1 justify-center">
              <div className="relative">
                <input type="text" placeholder="Search products..." className="w-96 px-5 py-2.5 pl-11 rounded-full border border-gray-200 focus:border-pink-300 focus:ring-2 focus:ring-pink-100 transition-all bg-white/80 backdrop-blur-sm text-base" />
                <Search className="absolute left-4 top-3 text-gray-400 w-5 h-5" />
              </div>
            </nav>
            <div className="hidden lg:flex items-center space-x-4">
              {isLoggedIn && user ? (
                <div className="relative" ref={profileDropdownRef}>
                  <button type="button" onClick={() => setProfileDropdownOpen(!profileDropdownOpen)} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">{displayInitials}</div>
                    <span className="hidden md:block text-sm font-medium text-gray-700 max-w-[120px] truncate">{displayName}</span>
                    <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform flex-shrink-0 ${profileDropdownOpen ? 'transform rotate-180' : ''}`} />
                  </button>
                  {profileDropdownOpen && (
                    <>
                      <div className="fixed inset-0 bg-black/20 z-40 lg:hidden" onClick={() => setProfileDropdownOpen(false)} aria-hidden="true" />
                      <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 z-50 overflow-hidden">
                        <div className="px-4 py-3 border-b border-gray-100 bg-gradient-to-r from-rose-50 to-pink-50">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center text-white font-semibold flex-shrink-0">{displayInitials}</div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-gray-800 truncate">{user?.name || 'User'}</p>
                              <p className="text-xs text-gray-600 truncate">{user?.email || `+91 ${user?.phone || ''}`}</p>
                            </div>
                          </div>
                        </div>
                        <nav className="py-2">
                          <Link href="/profile" onClick={() => setProfileDropdownOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"><User className="w-5 h-5 flex-shrink-0" /><span>Personal Info</span></Link>
                          <button type="button" onClick={() => { setProfileDropdownOpen(false); window.location.href = '/profile#addresses'; }} className="w-full flex items-center gap-3 px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-50"><MapPin className="w-5 h-5 flex-shrink-0" /><span>Saved Addresses</span></button>
                          <Link href="/orders" onClick={() => setProfileDropdownOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"><Package className="w-5 h-5 flex-shrink-0" /><span>Orders</span></Link>
                          {isAffiliate && <Link href="/affiliate" onClick={() => setProfileDropdownOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"><Wallet className="w-5 h-5 flex-shrink-0" /><span>KYC & Withdraw</span></Link>}
                          <button type="button" onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-left text-sm text-red-600 hover:bg-red-50"><LogOut className="w-5 h-5 flex-shrink-0" /><span>Logout</span></button>
                        </nav>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <Link href="/login" className="px-4 py-2 text-gray-700 hover:text-pink-500 transition-colors font-medium"><User className="inline mr-2 w-4 h-4" />Login</Link>
              )}
              <div className="relative">
                <button type="button" onClick={() => setCategoriesMenuOpen(!categoriesMenuOpen)} className="px-4 py-2 text-gray-700 hover:text-pink-500 transition-colors font-medium flex items-center gap-2" aria-expanded={categoriesMenuOpen}>
                  <Grid3x3 className="w-4 h-4" /><span className="hidden md:inline">Categories</span>
                </button>
                {categoriesMenuOpen && (
                  <>
                    <div className="fixed inset-0 bg-black/20 z-40" style={{ top: `${headerHeight}px` }} onClick={() => setCategoriesMenuOpen(false)} aria-hidden="true" />
                    <div ref={menuRef} className="fixed left-0 right-0 bg-white border-b border-gray-200 shadow-lg z-50 overflow-hidden" style={{ top: `${headerHeight}px` }}>
                      <div className="container mx-auto px-4 md:px-8">
                        <div className="hidden lg:block py-6">
                          <div className="flex items-start gap-8">
                            <div className="w-64 flex-shrink-0 border-r border-gray-200 pr-6">
                              <div className="space-y-1">
                                {categories.map((category) => (
                                  <button key={category.id} type="button" onMouseEnter={() => setActiveCategory(category.id)} onClick={() => setActiveCategory(category.id)} className={`w-full text-left px-4 py-2.5 text-sm font-medium rounded-md transition-colors ${activeCategory === category.id ? 'bg-rose-50 text-pink-600' : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'}`}>{category.name}</button>
                                ))}
                              </div>
                            </div>
                            {activeCategoryData && (
                              <div className="flex-1 py-2">
                                <div className="grid grid-cols-3 gap-8">
                                  {[0, 1, 2].map((colIndex) => {
                                    const itemsPerColumn = Math.ceil(activeCategoryData.items.length / 3);
                                    const startIndex = colIndex * itemsPerColumn;
                                    const endIndex = Math.min(startIndex + itemsPerColumn, activeCategoryData.items.length);
                                    const columnItems = activeCategoryData.items.slice(startIndex, endIndex);
                                    return (
                                      <div key={colIndex} className="space-y-1">
                                        {columnItems.map((item) => (
                                          <Link key={item.id} href={item.href} onClick={() => setCategoriesMenuOpen(false)} className="block px-2 py-1.5 text-sm text-gray-600 hover:text-pink-600 hover:bg-rose-50 rounded-md transition-colors">{item.name}</Link>
                                        ))}
                                      </div>
                                    );
                                  })}
                                </div>
                                <div className="mt-6 pt-6 border-t border-gray-200">
                                  <Link href={activeCategoryData.href} onClick={() => setCategoriesMenuOpen(false)} className="inline-flex items-center text-sm font-medium text-pink-600 hover:text-pink-700 transition-colors">View All {activeCategoryData.name}<ChevronRight className="w-4 h-4 ml-1" /></Link>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="lg:hidden py-4">
                          <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-gray-800">Categories</h2>
                            <button type="button" onClick={() => setCategoriesMenuOpen(false)} className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors" aria-label="Close menu"><X className="w-5 h-5" /></button>
                          </div>
                          <div className="space-y-1">
                            {categories.map((category) => (
                              <div key={category.id} className="border-b border-gray-100 last:border-b-0">
                                <button type="button" onClick={() => setMobileOpenCategory(mobileOpenCategory === category.id ? null : category.id)} className="w-full flex items-center justify-between px-4 py-3 text-left text-sm font-medium text-gray-800 hover:bg-gray-50 rounded-md transition-colors" aria-expanded={mobileOpenCategory === category.id}>
                                  <span>{category.name}</span>
                                  <ChevronRight className={`w-4 h-4 text-gray-400 transition-transform ${mobileOpenCategory === category.id ? 'transform rotate-90' : ''}`} />
                                </button>
                                {mobileOpenCategory === category.id && (
                                  <div className="px-4 pb-4 space-y-1">
                                    {category.items.map((item) => (
                                      <Link key={item.id} href={item.href} onClick={() => setCategoriesMenuOpen(false)} className="block px-4 py-2 text-sm text-gray-600 hover:text-pink-600 hover:bg-rose-50 rounded-md transition-colors">{item.name}</Link>
                                    ))}
                                    <Link href={category.href} onClick={() => setCategoriesMenuOpen(false)} className="block mt-3 px-4 py-2 text-sm font-medium text-pink-600 hover:text-pink-700 hover:bg-pink-50 rounded-md transition-colors border border-pink-200">View All {category.name}</Link>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
              <ThemeSelector />
              <Link href="/affiliate" className="px-4 py-2 text-gray-700 hover:text-pink-500 transition-colors font-medium">Affiliate</Link>
              <Link href="/cart" className="relative flex items-center">
                <ShoppingBag className="w-6 h-6 text-gray-700 hover:text-pink-500 cursor-pointer transition-colors" />
                <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center min-w-[20px]">{cartCount}</span>
              </Link>
            </div>
            <button className="lg:hidden p-2 text-gray-700" onClick={() => setIsMenuOpen(!isMenuOpen)}>{isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}</button>
          </div>
          {isMenuOpen && (
            <div className="lg:hidden mt-4 pb-4 space-y-4">
              <div className="relative">
                <input type="text" placeholder="Search products..." className="w-full px-4 py-2.5 pl-11 rounded-full border border-gray-200 focus:border-pink-300 bg-white/80 backdrop-blur-sm text-base" />
                <Search className="absolute left-4 top-3 text-gray-400 w-5 h-5" />
              </div>
              <div className="px-4">
                <button type="button" onClick={() => { setCategoriesMenuOpen(true); setIsMenuOpen(false); }} className="px-4 py-2 text-gray-700 hover:text-pink-500 transition-colors font-medium flex items-center gap-2"><Grid3x3 className="w-4 h-4" /><span className="hidden md:inline">Categories</span></button>
              </div>
              <div className="flex flex-col space-y-3 pt-2">
                {isLoggedIn && user ? (
                  <div className="px-4"><Link href="/profile" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2 text-gray-700"><User className="w-5 h-5" />Profile</Link></div>
                ) : (
                  <Link href="/login" className="text-left px-4 py-2 text-gray-700 hover:text-pink-500 transition-colors font-medium" onClick={() => setIsMenuOpen(false)}><User className="inline mr-2 w-4 h-4" />Login</Link>
                )}
                <Link href="/affiliate" className="text-left px-4 py-2 text-gray-700 hover:text-pink-500 transition-colors font-medium block" onClick={() => setIsMenuOpen(false)}>Affiliate</Link>
                <Link href="/cart" onClick={() => setIsMenuOpen(false)} className="flex items-center px-4 py-2 text-gray-700 hover:text-pink-500 transition-colors font-medium"><ShoppingBag className="mr-2 w-5 h-5" />Cart ({cartCount})</Link>
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="flex-1 pt-24 pb-12 px-4 md:px-8">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-2xl shadow-sm border border-rose-100/80 p-8 md:p-12 text-center">
            <div className="w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Package className="w-10 h-10 text-rose-500" />
            </div>
            <h1 className="text-2xl md:text-3xl font-playfair font-bold text-gray-800 mb-4">Your Orders</h1>
            <p className="text-gray-600 mb-6">No orders yet. Start shopping to see your orders here!</p>
            <a href="/" className="inline-block px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-lg font-medium hover:from-rose-600 hover:to-pink-600 transition-all duration-300 shadow-md hover:shadow-lg">Start Shopping</a>
          </div>
        </div>
      </main>

      <footer className="py-12 bg-white border-t-2 border-rose-200/60">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-4">
              <img src="/images/logo/trueBeauty-Logo.png" alt="True Beauty Logo" width={80} height={25} className="object-contain" />
              <span className="text-xl font-playfair font-bold text-gray-800">True Beauty</span>
            </div>
            <p className="text-gray-600 max-w-md mx-auto mb-8">Redefining beauty standards with premium, cruelty-free cosmetics crafted for the modern woman.</p>
            <div className="flex justify-center space-x-6 text-gray-500 mb-8">
              <a href="#" className="hover:text-pink-500 transition-colors">About</a>
              <a href="#" className="hover:text-pink-500 transition-colors">Contact</a>
              <a href="#" className="hover:text-pink-500 transition-colors">Privacy</a>
              <a href="#" className="hover:text-pink-500 transition-colors">Terms</a>
            </div>
            <div className="mt-8 pt-6 border-t border-gray-100 text-gray-400 text-sm">© 2026 True Beauty. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
