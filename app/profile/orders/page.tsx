'use client';

import { useState, useEffect } from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Link from 'next/link';
import { Package, ArrowLeft } from 'lucide-react';

const ORDERS_STORAGE_KEY = 'tb_orders';

type OrderItem = { id: number; name: string; price: number; image: string; quantity: number };

type StoredOrder = {
  orderId: string;
  placedAt: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  total: number;
};

function getStoredOrders(): StoredOrder[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(ORDERS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<StoredOrder[]>([]);

  useEffect(() => {
    setOrders(getStoredOrders());
  }, []);

  return (
    <div className="min-h-screen gradient-bg flex flex-col">
      <Header />
      <main className="flex-1 pt-24 pb-12 px-4 md:px-8">
        <div className="container mx-auto max-w-4xl">
          <div className="md:hidden mb-4">
            <Link
              href="/profile"
              className="inline-flex items-center p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </Link>
          </div>
          <div className="hidden lg:block mb-4">
            <Link
              href="/profile"
              className="inline-flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Back to profile</span>
            </Link>
          </div>

          <h1 className="text-2xl md:text-3xl font-playfair font-bold text-gray-800 mb-6">
            Your Orders
          </h1>

          {orders.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm border border-rose-100/80 p-8 md:p-12 text-center">
              <div className="w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Package className="w-10 h-10 text-rose-500" />
              </div>
              <p className="text-gray-600 mb-6">
                No orders yet. Start shopping to see your orders here!
              </p>
              <Link
                href="/"
                className="inline-block px-6 py-3 bg-gradient-to-r from-[#FF3C8C] to-[#FF0066] text-white rounded-lg font-medium hover:opacity-95 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div
                  key={order.orderId}
                  className="bg-white rounded-2xl shadow-sm border border-rose-100/80 overflow-hidden"
                >
                  <div className="p-4 md:p-5 border-b border-rose-100/80 flex flex-wrap items-center justify-between gap-2 bg-rose-50/30">
                    <div>
                      <p className="text-sm font-semibold text-gray-800">
                        Order #{order.orderId.replace('TB-ORD-', '')}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Placed on{' '}
                        {new Date(order.placedAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                    <p className="text-lg font-bold text-rose-600">
                      ₹{order.total.toLocaleString('en-IN')}
                    </p>
                  </div>
                  <div className="p-4 md:p-5">
                    <ul className="space-y-3">
                      {order.items.map((item) => {
                        const qty = item.quantity || 1;
                        const lineTotal = item.price * qty;
                        return (
                          <li
                            key={`${order.orderId}-${item.id}-${item.name}`}
                            className="flex gap-3 md:gap-4 items-center py-2 border-b border-gray-100 last:border-0"
                          >
                            <Link
                              href={`/product/${item.id}`}
                              className="flex-shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-lg overflow-hidden bg-rose-50 border border-rose-100"
                            >
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            </Link>
                            <div className="flex-1 min-w-0">
                              <Link
                                href={`/product/${item.id}`}
                                className="font-medium text-gray-800 hover:text-rose-600 line-clamp-2"
                              >
                                {item.name}
                              </Link>
                              <p className="text-sm text-gray-500 mt-0.5">
                                Qty: {qty} × ₹{item.price.toLocaleString('en-IN')}
                              </p>
                            </div>
                            <p className="text-sm font-semibold text-gray-800 flex-shrink-0">
                              ₹{lineTotal.toLocaleString('en-IN')}
                            </p>
                          </li>
                        );
                      })}
                    </ul>
                    <div className="mt-4 pt-4 border-t border-gray-200 space-y-1.5 text-sm">
                      <div className="flex justify-between text-gray-600">
                        <span>Subtotal</span>
                        <span>₹{order.subtotal.toLocaleString('en-IN')}</span>
                      </div>
                      {order.discount > 0 && (
                        <div className="flex justify-between text-emerald-600">
                          <span>Coupon discount</span>
                          <span>-₹{order.discount.toLocaleString('en-IN')}</span>
                        </div>
                      )}
                      <div className="flex justify-between font-semibold text-gray-800 pt-2">
                        <span>Total</span>
                        <span>₹{order.total.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
