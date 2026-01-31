'use client';

import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { Package } from 'lucide-react';

export default function OrdersPage() {
  return (
    <div className="min-h-screen gradient-bg flex flex-col">
      <Header />
      <main className="flex-1 pt-24 pb-12 px-4 md:px-8">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-2xl shadow-sm border border-rose-100/80 p-8 md:p-12 text-center">
            <div className="w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Package className="w-10 h-10 text-rose-500" />
            </div>
            <h1 className="text-2xl md:text-3xl font-playfair font-bold text-gray-800 mb-4">
              Your Orders
            </h1>
            <p className="text-gray-600 mb-6">
              No orders yet. Start shopping to see your orders here!
            </p>
            <a
              href="/"
              className="inline-block px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-lg font-medium hover:from-rose-600 hover:to-pink-600 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Start Shopping
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
