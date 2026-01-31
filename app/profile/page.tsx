'use client';

import { useState, useEffect } from 'react';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import ProfileHeader from './components/ProfileHeader';
import ProfileStepper from './components/ProfileStepper';
import PersonalInfoForm from './components/PersonalInfoForm';
import KYCSection from './components/KYCSection';
import AddressList from './components/AddressList';
import SecurityPreferences from './components/SecurityPreferences';

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [isFirstTime, setIsFirstTime] = useState(false);

  useEffect(() => {
    // Get user from localStorage
    const userData = localStorage.getItem('user');
    const profileData = localStorage.getItem('profile');
    
    if (userData) {
      const parsedUser = JSON.parse(userData);
      const parsedProfile = profileData ? JSON.parse(profileData) : null;
      
      setUser({
        ...parsedUser,
        ...parsedProfile
      });

      // Check if first-time user (no profile data or incomplete)
      if (!parsedProfile || !parsedProfile.name || !parsedProfile.addresses?.length) {
        setIsFirstTime(true);
      }
    }

    // Handle hash navigation (for address section)
    if (window.location.hash === '#addresses') {
      setTimeout(() => {
        const element = document.getElementById('addresses');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
    }
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen gradient-bg flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center pt-32 pb-12 px-4">
          <div className="text-center">
            <p className="text-gray-600">Please login to view your profile</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-bg flex flex-col">
      <Header />
      <main className="flex-1 pt-24 pb-12 px-4 md:px-8">
        <div className="container mx-auto max-w-6xl">
          {isFirstTime ? (
            <>
              <ProfileStepper
                user={user}
                setUser={(updatedUser) => {
                  setUser(updatedUser);
                  setIsFirstTime(false);
                }}
                onComplete={() => setIsFirstTime(false)}
              />
            </>
          ) : (
            <>
              <ProfileHeader user={user} isFirstTime={isFirstTime} />
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                {/* Left Column - Personal Info & KYC */}
                <div className="lg:col-span-2 space-y-6">
                  <PersonalInfoForm user={user} setUser={setUser} />
                  <KYCSection user={user} setUser={setUser} />
                  <AddressList user={user} setUser={setUser} />
                </div>

                {/* Right Column - Security & Preferences */}
                <div className="lg:col-span-1">
                  <SecurityPreferences user={user} setUser={setUser} />
                </div>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
