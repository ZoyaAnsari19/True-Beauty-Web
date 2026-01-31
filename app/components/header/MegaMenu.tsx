'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { X, ChevronRight } from 'lucide-react';
import { categories, Category } from '@/app/data/constants';

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  headerHeight: number;
}

export default function MegaMenu({ isOpen, onClose, headerHeight }: MegaMenuProps) {
  const [activeCategory, setActiveCategory] = useState<number | null>(categories[0]?.id || null);
  const [mobileOpenCategory, setMobileOpenCategory] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Set first category as active when menu opens
  useEffect(() => {
    if (isOpen && categories.length > 0) {
      setActiveCategory(categories[0].id);
    }
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  // Handle category hover (desktop)
  const handleCategoryHover = (categoryId: number) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveCategory(categoryId);
  };

  const handleCategoryLeave = () => {
    // Keep the active category on leave for better UX
  };

  // Handle category click (mobile)
  const toggleMobileCategory = (categoryId: number) => {
    if (mobileOpenCategory === categoryId) {
      setMobileOpenCategory(null);
    } else {
      setMobileOpenCategory(categoryId);
    }
  };

  // Get active category data
  const activeCategoryData = categories.find(cat => cat.id === activeCategory);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/20 z-40"
        style={{ top: `${headerHeight}px` }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Mega Menu Container */}
      <div 
        ref={menuRef}
        className="fixed left-0 right-0 bg-white border-b border-gray-200 shadow-lg z-50 overflow-hidden"
        style={{ top: `${headerHeight}px` }}
        role="menu"
        aria-label="Categories menu"
      >
        <div className="container mx-auto px-4 md:px-8">
          {/* Desktop Layout */}
          <div className="hidden lg:block py-6">
            <div className="flex items-start gap-8">
              {/* Left Column - Main Categories */}
              <div className="w-64 flex-shrink-0 border-r border-gray-200 pr-6">
                <div className="space-y-1">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      type="button"
                      onMouseEnter={() => handleCategoryHover(category.id)}
                      onMouseLeave={handleCategoryLeave}
                      onClick={() => handleCategoryHover(category.id)}
                      className={`w-full text-left px-4 py-2.5 text-sm font-medium rounded-md transition-colors ${
                        activeCategory === category.id
                          ? 'bg-rose-50 text-pink-600'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                      } focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2`}
                      aria-selected={activeCategory === category.id}
                      role="menuitem"
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Columns - Subcategories */}
              {activeCategoryData && (
                <div className="flex-1 py-2">
                  <div className="grid grid-cols-3 gap-8">
                    {/* Split items into 3 columns */}
                    {[0, 1, 2].map((colIndex) => {
                      const itemsPerColumn = Math.ceil(activeCategoryData.items.length / 3);
                      const startIndex = colIndex * itemsPerColumn;
                      const endIndex = Math.min(startIndex + itemsPerColumn, activeCategoryData.items.length);
                      const columnItems = activeCategoryData.items.slice(startIndex, endIndex);

                      return (
                        <div key={colIndex} className="space-y-1">
                          {columnItems.map((item) => (
                            <Link
                              key={item.id}
                              href={item.href}
                              onClick={onClose}
                              className="block px-2 py-1.5 text-sm text-gray-600 hover:text-pink-600 hover:bg-rose-50 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                              role="menuitem"
                            >
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      );
                    })}
                  </div>

                  {/* View All Link */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <Link
                      href={activeCategoryData.href}
                      onClick={onClose}
                      className="inline-flex items-center text-sm font-medium text-pink-600 hover:text-pink-700 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 rounded-md px-2 py-1"
                    >
                      View All {activeCategoryData.name}
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Layout - Accordion */}
          <div className="lg:hidden py-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Categories</h2>
              <button
                type="button"
                onClick={onClose}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-1">
              {categories.map((category) => (
                <div key={category.id} className="border-b border-gray-100 last:border-b-0">
                  <button
                    type="button"
                    onClick={() => toggleMobileCategory(category.id)}
                    className="w-full flex items-center justify-between px-4 py-3 text-left text-sm font-medium text-gray-800 hover:bg-gray-50 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                    aria-expanded={mobileOpenCategory === category.id}
                  >
                    <span>{category.name}</span>
                    <ChevronRight
                      className={`w-4 h-4 text-gray-400 transition-transform ${
                        mobileOpenCategory === category.id ? 'transform rotate-90' : ''
                      }`}
                    />
                  </button>

                  {mobileOpenCategory === category.id && (
                    <div className="px-4 pb-4 space-y-1">
                      {category.items.map((item) => (
                        <Link
                          key={item.id}
                          href={item.href}
                          onClick={onClose}
                          className="block px-4 py-2 text-sm text-gray-600 hover:text-pink-600 hover:bg-rose-50 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                        >
                          {item.name}
                        </Link>
                      ))}
                      <Link
                        href={category.href}
                        onClick={onClose}
                        className="block mt-3 px-4 py-2 text-sm font-medium text-pink-600 hover:text-pink-700 hover:bg-pink-50 rounded-md transition-colors border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                      >
                        View All {category.name}
                      </Link>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
