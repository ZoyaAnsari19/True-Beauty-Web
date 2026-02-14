'use client';

import { useState, useEffect } from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, CreditCard } from 'lucide-react';
import {
  moveAppliedCouponToHistoryOnOrderSuccess,
  recordCouponUsage,
  getUserIdForCouponUsage,
  getCouponByCode,
} from '../../../utils/coupons';

const COUPON_STORAGE_KEY = 'tb_cart_coupon';

export default function PaymentPage() {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);
  const [isPlacing, setIsPlacing] = useState(false);

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

  const handlePlaceOrder = () => {
    setIsPlacing(true);
    const orderId = `TB-ORD-${Date.now()}`;

    try {
      const stored = localStorage.getItem(COUPON_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as { code: string; discount: number };
        if (parsed?.code && typeof parsed.discount === 'number') {
          moveAppliedCouponToHistoryOnOrderSuccess(
            orderId,
            parsed.code,
            parsed.discount
          );
          const coupon = getCouponByCode(parsed.code);
          const userData = localStorage.getItem('user');
          const user = userData ? JSON.parse(userData) : null;
          const userId = getUserIdForCouponUsage(user);
          if (coupon && userId) recordCouponUsage(coupon, userId);
          localStorage.removeItem(COUPON_STORAGE_KEY);
        }
      }
      localStorage.removeItem('tb_cart');
      localStorage.setItem('tb_last_order_id', orderId);
    } finally {
      setIsPlacing(false);
      router.push('/profile/orders');
    }
  };

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
          <p className="text-gray-600 mb-6">Complete your order. Applied coupon will be moved to Coupon History after success.</p>
          <button
            type="button"
            onClick={handlePlaceOrder}
            disabled={isPlacing}
            className="inline-block bg-rose-500 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-rose-600 disabled:opacity-70 transition-colors mb-4"
          >
            {isPlacing ? 'Placing order...' : 'Place order'}
          </button>
          <br />
          <Link href="/" className="inline-block text-gray-600 hover:text-gray-800 text-sm font-medium">
            Back to Home
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}

