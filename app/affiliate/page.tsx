'use client';

import { useState, useEffect } from 'react';
import SummaryCards from './components/SummaryCards';
import ProductList from './components/ProductList';
import AffiliateUsersTable from './components/AffiliateUsersTable';
import WithdrawSection from './components/WithdrawSection';

type ActiveSection = 'products' | 'users' | 'withdraw' | null;

export default function AffiliatePage() {
  const [activeSection, setActiveSection] = useState<ActiveSection>(null);

  useEffect(() => {
    // Mark user as affiliate when they visit this page
    localStorage.setItem('isAffiliate', 'true');
    
    // Also update profile data if exists
    const profileData = localStorage.getItem('profile');
    if (profileData) {
      const profile = JSON.parse(profileData);
      profile.isAffiliate = true;
      localStorage.setItem('profile', JSON.stringify(profile));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-24 pb-12">
      <div className="container mx-auto px-4 md:px-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-playfair font-bold text-gray-800 mb-2">
            Affiliate Dashboard
          </h1>
          <p className="text-gray-600">Manage your affiliate program and track earnings</p>
        </div>

        <SummaryCards onCardClick={setActiveSection} />

        <div className="mt-8">
          {activeSection === 'products' && <ProductList />}
          {activeSection === 'users' && <AffiliateUsersTable />}
          {activeSection === 'withdraw' && <WithdrawSection />}
          {activeSection === null && (
            <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
              <p className="text-gray-600">Select a card above to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
