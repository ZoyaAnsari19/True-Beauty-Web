'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ChevronDown, X } from 'lucide-react';
import { categories, Category, CategoryTag } from '@/app/data/constants';

export default function HeaderCategories() {
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [mobileOpenCategory, setMobileOpenCategory] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveCategory(null);
      }
    };

    if (activeCategory !== null) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeCategory]);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveCategory(null);
        setIsMobileMenuOpen(false);
        setMobileOpenCategory(null);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const handleCategoryHover = (categoryId: number) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveCategory(categoryId);
  };

  const handleCategoryLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveCategory(null);
    }, 200);
  };

  const handleCategoryClick = (categoryId: number) => {
    if (activeCategory === categoryId) {
      setActiveCategory(null);
    } else {
      setActiveCategory(categoryId);
    }
  };

  const toggleMobileCategory = (categoryId: number) => {
    if (mobileOpenCategory === categoryId) {
      setMobileOpenCategory(null);
    } else {
      setMobileOpenCategory(categoryId);
    }
  };

  const getTagBadge = (tag?: CategoryTag) => {
    if (!tag) return null;

    const tagStyles = {
      new: 'bg-green-100 text-green-700 border-green-200',
      trending: 'bg-pink-100 text-pink-700 border-pink-200',
      bestseller: 'bg-amber-100 text-amber-700 border-amber-200'
    };

    const tagLabels = {
      new: 'New',
      trending: 'Trending',
      bestseller: 'Best Seller'
    };

    return (
      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${tagStyles[tag]}`}>
        {tagLabels[tag]}
      </span>
    );
  };

  return (
    <div ref={menuRef} className="relative">
      {/* Desktop Categories Menu */}
      <nav className="hidden lg:flex items-center space-x-1" aria-label="Main navigation">
        {categories.map((category) => (
          <div
            key={category.id}
            className="relative"
            onMouseEnter={() => handleCategoryHover(category.id)}
            onMouseLeave={handleCategoryLeave}
            onFocus={() => handleCategoryHover(category.id)}
          >
            <button
              type="button"
              onClick={() => handleCategoryClick(category.id)}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-pink-500 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 rounded-lg"
              aria-expanded={activeCategory === category.id}
              aria-haspopup="true"
            >
              {category.name}
              <ChevronDown
                className={`inline-block ml-1 w-4 h-4 transition-transform ${
                  activeCategory === category.id ? 'transform rotate-180' : ''
                }`}
              />
            </button>

            {/* Mega Menu Dropdown */}
            {activeCategory === category.id && (
              <div className="absolute left-0 top-full mt-2 w-[calc(100vw-2rem)] max-w-6xl bg-white rounded-xl shadow-lg border border-gray-200 z-50 overflow-hidden">
                <div className="grid grid-cols-4 gap-8 p-8">
                  {/* Category Items */}
                  <div className="col-span-3 grid grid-cols-3 gap-6">
                    {category.items.map((item) => (
                      <Link
                        key={item.id}
                        href={item.href}
                        className="group flex flex-col space-y-1 p-3 rounded-lg hover:bg-rose-50 transition-colors"
                        onClick={() => setActiveCategory(null)}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-800 group-hover:text-pink-600 transition-colors">
                            {item.name}
                          </span>
                          {item.tag && (
                            <div className="ml-2">
                              {getTagBadge(item.tag)}
                            </div>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>

                  {/* Featured Section */}
                  {category.featured && (
                    <div className="col-span-1">
                      <Link
                        href={category.featured.href}
                        className="block group relative overflow-hidden rounded-lg bg-gradient-to-br from-rose-50 to-pink-50 p-6 h-full"
                        onClick={() => setActiveCategory(null)}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-rose-100/50 to-pink-100/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="relative z-10">
                          <h3 className="text-lg font-playfair font-bold text-gray-800 mb-2">
                            {category.featured.title}
                          </h3>
                          <p className="text-sm text-gray-600 mb-4">
                            {category.featured.description}
                          </p>
                          <div className="flex items-center text-sm font-medium text-pink-600 group-hover:text-pink-700">
                            View All
                            <ChevronDown className="w-4 h-4 ml-1 transform rotate-[-90deg] group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </Link>
                    </div>
                  )}
                </div>

                {/* View All Footer */}
                <div className="border-t border-gray-100 bg-gray-50 px-8 py-4">
                  <Link
                    href={category.href}
                    className="inline-flex items-center text-sm font-medium text-pink-600 hover:text-pink-700 transition-colors"
                    onClick={() => setActiveCategory(null)}
                  >
                    View All {category.name}
                    <ChevronDown className="w-4 h-4 ml-1 transform rotate-[-90deg]" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Mobile Categories Menu Button */}
      <button
        type="button"
        className="lg:hidden px-3 py-2 text-sm font-medium text-gray-700 hover:text-pink-500 transition-colors"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-expanded={isMobileMenuOpen}
        aria-label="Toggle categories menu"
      >
        Categories
        <ChevronDown
          className={`inline-block ml-1 w-4 h-4 transition-transform ${
            isMobileMenuOpen ? 'transform rotate-180' : ''
          }`}
        />
      </button>

      {/* Mobile Accordion Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 z-50 max-h-[80vh] overflow-y-auto">
          <div className="p-4">
            {categories.map((category) => (
              <div key={category.id} className="border-b border-gray-100 last:border-b-0">
                <button
                  type="button"
                  onClick={() => toggleMobileCategory(category.id)}
                  className="w-full flex items-center justify-between px-4 py-3 text-left text-sm font-medium text-gray-800 hover:bg-gray-50 rounded-lg transition-colors"
                  aria-expanded={mobileOpenCategory === category.id}
                >
                  <span>{category.name}</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      mobileOpenCategory === category.id ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>

                {mobileOpenCategory === category.id && (
                  <div className="px-4 pb-4 space-y-2">
                    {category.items.map((item) => (
                      <Link
                        key={item.id}
                        href={item.href}
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-rose-50 transition-colors"
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          setMobileOpenCategory(null);
                        }}
                      >
                        <span className="text-sm text-gray-700">{item.name}</span>
                        {item.tag && getTagBadge(item.tag)}
                      </Link>
                    ))}
                    <Link
                      href={category.href}
                      className="block mt-3 px-3 py-2 text-sm font-medium text-pink-600 hover:text-pink-700 text-center border border-pink-200 rounded-lg hover:bg-pink-50 transition-colors"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        setMobileOpenCategory(null);
                      }}
                    >
                      View All {category.name}
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
