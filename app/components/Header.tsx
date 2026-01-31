'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, User, ShoppingBag, Menu, X, Grid3x3 } from 'lucide-react';
import ProfileDropdown from './profile/ProfileDropdown';
import CategoriesButton from './header/CategoriesButton';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isAffiliate, setIsAffiliate] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Check if user is logged in and get user data
    const authToken = localStorage.getItem('authToken');
    const userData = localStorage.getItem('user');
    const profileData = localStorage.getItem('profile');
    
    setIsLoggedIn(!!authToken);
    
    if (authToken && userData) {
      const parsedUser = JSON.parse(userData);
      const parsedProfile = profileData ? JSON.parse(profileData) : null;
      
      setUser({
        ...parsedUser,
        ...parsedProfile
      });

      // Check if user is affiliate (dummy check - checking if user has visited affiliate page)
      // In production, this would come from user role in database
      setIsAffiliate(!!localStorage.getItem('isAffiliate') || !!parsedProfile?.isAffiliate);
    }
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b-2 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-3 border-rose-200' : 'bg-white/80 py-5 border-rose-200'}`}>
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img 
              src="/images/logo/trueBeauty-Logo.png" 
              alt="True Beauty Logo" 
              width={100} 
              height={30} 
              className="object-contain"
            />
            <span className="text-xl font-playfair font-bold text-gray-800 hidden md:block">True Beauty</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8 flex-1 justify-center">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-96 px-5 py-2.5 pl-11 rounded-full border border-gray-200 focus:border-pink-300 focus:ring-2 focus:ring-pink-100 transition-all bg-white/80 backdrop-blur-sm text-base"
              />
              <Search className="absolute left-4 top-3 text-gray-400 w-5 h-5" />
            </div>
          </nav>

          {/* Right Navigation Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            {isLoggedIn && user ? (
              <ProfileDropdown user={user} isAffiliate={isAffiliate} />
            ) : (
              <Link 
                href="/login"
                className="px-4 py-2 text-gray-700 hover:text-pink-500 transition-colors font-medium"
              >
                <User className="inline mr-2 w-4 h-4" />
                Login
              </Link>
            )}
            <CategoriesButton />
            <Link 
              href="/affiliate"
              className="px-4 py-2 text-gray-700 hover:text-pink-500 transition-colors font-medium"
            >
              Affiliate
            </Link>
            <div className="relative">
              <ShoppingBag className="w-6 h-6 text-gray-700 hover:text-pink-500 cursor-pointer transition-colors" />
              <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">0</span>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden p-2 text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 space-y-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-2.5 pl-11 rounded-full border border-gray-200 focus:border-pink-300 bg-white/80 backdrop-blur-sm text-base"
              />
              <Search className="absolute left-4 top-3 text-gray-400 w-5 h-5" />
            </div>
            <div className="px-4">
              <CategoriesButton />
            </div>
            <div className="flex flex-col space-y-3 pt-2">
              {isLoggedIn && user ? (
                <div className="px-4">
                  <ProfileDropdown user={user} isAffiliate={isAffiliate} />
                </div>
              ) : (
                <Link 
                  href="/login"
                  className="text-left px-4 py-2 text-gray-700 hover:text-pink-500 transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="inline mr-2 w-4 h-4" />
                  Login
                </Link>
              )}
              <Link 
                href="/affiliate"
                className="text-left px-4 py-2 text-gray-700 hover:text-pink-500 transition-colors font-medium block"
                onClick={() => setIsMenuOpen(false)}
              >
                Affiliate
              </Link>
              <div className="flex items-center px-4 py-2 text-gray-700 hover:text-pink-500 transition-colors font-medium">
                <ShoppingBag className="mr-2 w-5 h-5" />
                Cart (0)
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
