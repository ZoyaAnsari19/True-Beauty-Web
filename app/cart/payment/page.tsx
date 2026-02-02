'use client';

import { useState, useEffect } from 'react';
import ThemeSelector from '../../../components/ThemeSelector';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
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
      router.replace('/cart/shipping');
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
      <Header />
      <main className="pt-24 pb-16 px-4 md:px-8">
        <div className="container mx-auto max-w-md text-center">
          <div className="md:hidden mb-4 text-left">
            <Link href="/" className="inline-flex items-center p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </Link>
          </div>
          <CreditCard className="w-16 h-16 text-rose-400 mx-auto mb-4" />
          <h1 className="text-2xl font-playfair font-bold text-gray-800 mb-2">Payment</h1>
          <p className="text-gray-600 mb-8">Payment page coming soon. This is an MVP placeholder.</p>
          <Link href="/" className="inline-block bg-rose-500 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-rose-600 transition-colors">
            Back to Home
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}

