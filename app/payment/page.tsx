'use client';

import { useState, useEffect } from 'react';
import ThemeSelector from '../../components/ThemeSelector';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, CreditCard } from 'lucide-react';

export default function PaymentPage() {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      router.replace('/login');
      return;
    }
    const address = localStorage.getItem('tb_shipping_address');
    if (!address) {
      router.replace('/shipping');
      return;
    }
    setIsChecking(false);
  }, [router]);

  if (isChecking) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-bg">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b-2 border-rose-200 py-4">
        <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
          <Link href="/shipping" className="flex items-center gap-2 text-gray-700 hover:text-pink-500 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back</span>
          </Link>
          <div className="flex items-center gap-1">
            <img src="/images/logo/trueBeauty-Logo.png" alt="True Beauty" width={80} height={24} className="object-contain" />
            <span className="text-lg font-playfair font-bold text-gray-800 hidden sm:inline">True Beauty</span>
          </div>
          <div className="flex items-center space-x-2">
            <ThemeSelector />
            <div className="w-20" />
          </div>
        </div>
      </header>

      <main className="pt-28 pb-16 px-4 md:px-8">
        <div className="container mx-auto max-w-md text-center">
          <CreditCard className="w-16 h-16 text-rose-400 mx-auto mb-4" />
          <h1 className="text-2xl font-playfair font-bold text-gray-800 mb-2">Payment</h1>
          <p className="text-gray-600 mb-8">Payment page coming soon. This is an MVP placeholder.</p>
          <Link href="/" className="inline-block bg-rose-500 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-rose-600 transition-colors">
            Back to Home
          </Link>
        </div>
      </main>
    </div>
  );
}
