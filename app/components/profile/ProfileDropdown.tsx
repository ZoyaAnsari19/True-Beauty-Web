'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { 
  User, 
  MapPin, 
  Package, 
  Wallet, 
  LogOut, 
  ChevronDown
} from 'lucide-react';

interface ProfileDropdownProps {
  user: {
    name?: string;
    phone?: string;
    email?: string;
  };
  isAffiliate?: boolean;
  onAddressClick?: () => void;
}

export default function ProfileDropdown({ 
  user, 
  isAffiliate = false,
  onAddressClick 
}: ProfileDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  // Close dropdown on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Keyboard accessibility
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
        // Return focus to trigger button
        const button = dropdownRef.current?.querySelector('button[aria-expanded]') as HTMLButtonElement;
        button?.focus();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleLogout = () => {
    // Clear auth session
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    localStorage.removeItem('profile');
    sessionStorage.clear();
    
    // Close dropdown
    setIsOpen(false);
    
    // Redirect to home
    router.push('/');
    router.refresh();
  };

  const handleAddressClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(false);
    if (onAddressClick) {
      onAddressClick();
    } else {
      // Navigate to profile and scroll to addresses section
      router.push('/profile#addresses');
      // Scroll after navigation
      setTimeout(() => {
        const element = document.getElementById('addresses');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  };

  const menuItems = [
    {
      id: 'personal',
      label: 'Personal Info',
      icon: User,
      href: '/profile',
      onClick: () => setIsOpen(false)
    },
    {
      id: 'addresses',
      label: 'Saved Addresses',
      icon: MapPin,
      href: '#',
      onClick: handleAddressClick
    },
    {
      id: 'orders',
      label: 'Orders',
      icon: Package,
      href: '/orders',
      onClick: () => setIsOpen(false)
    },
    ...(isAffiliate ? [{
      id: 'kyc',
      label: 'KYC & Withdraw',
      icon: Wallet,
      href: '/affiliate',
      onClick: () => setIsOpen(false)
    }] : []),
    {
      id: 'logout',
      label: 'Logout',
      icon: LogOut,
      href: '#',
      onClick: handleLogout,
      isDestructive: true
    }
  ];

  const displayName = user.name || user.email || `+91 ${user.phone || ''}`;
  const displayInitials = user.name 
    ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : user.email?.[0].toUpperCase() || 'U';

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Avatar Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsOpen(!isOpen);
          }
        }}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="User menu"
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
          {displayInitials}
        </div>
        <span className="hidden md:block text-sm font-medium text-gray-700 max-w-[120px] truncate">
          {displayName}
        </span>
        <ChevronDown 
          className={`w-4 h-4 text-gray-500 transition-transform flex-shrink-0 ${
            isOpen ? 'transform rotate-180' : ''
          }`} 
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop for mobile */}
          <div 
            className="fixed inset-0 bg-black/20 z-40 lg:hidden"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Dropdown Card */}
          <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 z-50 overflow-hidden">
            {/* User Info Header */}
            <div className="px-4 py-3 border-b border-gray-100 bg-gradient-to-r from-rose-50 to-pink-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center text-white font-semibold flex-shrink-0">
                  {displayInitials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800 truncate">
                    {user.name || 'User'}
                  </p>
                  <p className="text-xs text-gray-600 truncate">
                    {user.email || `+91 ${user.phone || ''}`}
                  </p>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <nav className="py-2" role="menu">
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                const isLast = index === menuItems.length - 1;
                
                if (item.href === '#') {
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={item.onClick}
                      role="menuitem"
                      className={`w-full flex items-center gap-3 px-4 py-3 text-left text-sm transition-colors ${
                        item.isDestructive
                          ? 'text-red-600 hover:bg-red-50'
                          : 'text-gray-700 hover:bg-gray-50'
                      } focus:outline-none focus:bg-gray-50 focus:ring-2 focus:ring-rose-500 focus:ring-inset`}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          item.onClick();
                        }
                      }}
                    >
                      <Icon className="w-5 h-5 flex-shrink-0" />
                      <span>{item.label}</span>
                    </button>
                  );
                }

                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={item.onClick}
                    role="menuitem"
                    className={`flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
                      item.isDestructive
                        ? 'text-red-600 hover:bg-red-50'
                        : 'text-gray-700 hover:bg-gray-50'
                    } focus:outline-none focus:bg-gray-50 focus:ring-2 focus:ring-rose-500 focus:ring-inset ${
                      !isLast ? 'border-b border-gray-100' : ''
                    }`}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </>
      )}
    </div>
  );
}
