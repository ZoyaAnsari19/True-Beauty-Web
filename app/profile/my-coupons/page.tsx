'use client';

import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Link from 'next/link';
import { ArrowLeft, TicketPercent } from 'lucide-react';
import { getStoredCoupons } from '../../../utils/coupons';

export default function MyCouponsPage() {
  const coupons = getStoredCoupons();

  return (
    <div className="min-h-screen gradient-bg flex flex-col">
      <Header />

      <main className="flex-1 pt-24 pb-12 px-4 md:px-8">
        <div className="container mx-auto max-w-4xl">
          {/* Back link */}
          <div className="md:hidden mb-4">
            <Link
              href="/"
              className="inline-flex items-center p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </Link>
          </div>
          <div className="hidden lg:block mb-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">
                Back to home
              </span>
            </Link>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-rose-100/80 p-6 md:p-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-rose-100 flex items-center justify-center">
                <TicketPercent className="w-7 h-7 text-rose-500" />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-playfair font-bold text-gray-800">
                  My Coupons
                </h1>
                <p className="text-sm text-gray-600">
                  View available coupons and their details.
                </p>
              </div>
            </div>

            {coupons.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 mb-2">
                  You don&apos;t have any coupons yet.
                </p>
                <p className="text-sm text-gray-500">
                  Coupons you earn or receive will appear here.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {coupons.map((coupon) => (
                  <div
                    key={coupon.code}
                    className="border border-rose-100 rounded-xl p-4 md:p-5 bg-rose-50/40 flex flex-col md:flex-row md:items-center md:justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-rose-500 text-white text-xs font-semibold tracking-wide">
                          {coupon.code}
                        </span>
                        {!coupon.active && (
                          <span className="text-xs font-medium text-red-500">
                            Inactive
                          </span>
                        )}
                      </div>
                      {coupon.description && (
                        <p className="text-sm text-gray-800">
                          {coupon.description}
                        </p>
                      )}
                      <p className="mt-1 text-xs text-gray-600">
                        Flat ₹{coupon.discountAmount} off on eligible items •
                        Min cart ₹{coupon.minCartTotal}
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        Valid from{' '}
                        <span className="font-medium">{coupon.startDate}</span>{' '}
                        to{' '}
                        <span className="font-medium">{coupon.expiryDate}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

