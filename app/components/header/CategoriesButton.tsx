'use client';

import { useState, useEffect } from 'react';
import { Grid3x3 } from 'lucide-react';
import MegaMenu from './MegaMenu';

export default function CategoriesButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(80);

  // Calculate header height
  useEffect(() => {
    const updateHeaderHeight = () => {
      const header = document.querySelector('header');
      if (header) {
        setHeaderHeight(header.offsetHeight);
      }
    };

    updateHeaderHeight();
    window.addEventListener('resize', updateHeaderHeight);
    window.addEventListener('scroll', updateHeaderHeight);

    return () => {
      window.removeEventListener('resize', updateHeaderHeight);
      window.removeEventListener('scroll', updateHeaderHeight);
    };
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      {/* Categories Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 text-gray-700 hover:text-pink-500 transition-colors font-medium flex items-center gap-2"
        aria-expanded={isOpen}
        aria-label="Toggle categories menu"
      >
        <Grid3x3 className="w-4 h-4" />
        <span className="hidden md:inline">Categories</span>
      </button>

      {/* Mega Menu */}
      <MegaMenu 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
        headerHeight={headerHeight}
      />
    </>
  );
}
