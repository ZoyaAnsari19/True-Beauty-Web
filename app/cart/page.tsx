'use client';

import { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';
import { ShoppingBag, Trash2, Minus, Plus, ArrowLeft } from 'lucide-react';

type CartItem = { id: number; name: string; price: number; image: string; quantity: number };

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('tb_cart') || '[]');
    setCartItems(cart);
  }, []);

  const updateCart = (updated: CartItem[]) => {
    const filtered = updated.filter((i) => i.quantity > 0);
    localStorage.setItem('tb_cart', JSON.stringify(filtered));
    setCartItems(filtered);
  };

  const removeItem = (productId: number) => {
    updateCart(cartItems.filter((i) => i.id !== productId));
  };

  const changeQuantity = (productId: number, delta: number) => {
    const updated = cartItems.map((item) => {
      if (item.id !== productId) return item;
      const qty = Math.max(0, (item.quantity || 1) + delta);
      return { ...item, quantity: qty };
    });
    updateCart(updated.filter((i) => i.quantity > 0));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

  return (
    <div className="min-h-screen gradient-bg">
      <Header />
      <main className="pt-24 pb-16 px-4 md:px-8">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-4">
            <Link href="/" className="inline-flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors md:hidden">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Back to home</span>
            </Link>
            <Link href="/" className="hidden md:inline-flex lg:hidden items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Back to home</span>
            </Link>
            <Link href="/" className="hidden lg:inline-flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Back to home</span>
            </Link>
          </div>
          {cartItems.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingBag className="w-20 h-20 text-rose-200 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Your cart is empty</h2>
              <p className="text-gray-600 mb-6">Add some products to get started.</p>
              <Link href="/" className="inline-block bg-rose-500 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-rose-600 transition-colors">
                Continue Shopping
              </Link>
            </div>
          ) : (
            <>
              <h1 className="text-2xl md:text-3xl font-playfair font-bold text-gray-800 mb-8">Cart ({cartItems.length} item{cartItems.length !== 1 ? 's' : ''})</h1>

              <div className="space-y-4 mb-8">
                {cartItems.map((item) => (
                  <div key={item.id} className="bg-white rounded-xl shadow-sm border border-rose-100 p-4 md:p-5 flex gap-4">
                    <img src={item.image} alt={item.name} className="w-20 h-20 md:w-24 md:h-24 rounded-lg object-cover bg-rose-50 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-800 truncate">{item.name}</h3>
                      <p className="text-lg font-bold text-rose-600 mt-1">₹{item.price.toFixed(2)}</p>
                      <div className="flex items-center gap-2 mt-3">
                        <div className="flex items-center border border-gray-200 rounded-lg">
                          <button type="button" onClick={() => changeQuantity(item.id, -1)} className="p-2 text-gray-600 hover:bg-rose-50 hover:text-rose-600 transition-colors rounded-l-lg">
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="px-3 py-1 text-sm font-medium min-w-[2rem] text-center">{item.quantity || 1}</span>
                          <button type="button" onClick={() => changeQuantity(item.id, 1)} className="p-2 text-gray-600 hover:bg-rose-50 hover:text-rose-600 transition-colors rounded-r-lg">
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <button type="button" onClick={() => removeItem(item.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors" aria-label="Remove">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <p className="text-lg font-bold text-gray-800 flex-shrink-0">
                      ₹{((item.quantity || 1) * item.price).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-rose-100 p-6 sticky bottom-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-medium text-gray-700">Subtotal</span>
                  <span className="text-xl font-bold text-gray-800">₹{subtotal.toFixed(2)}</span>
                </div>
                <Link href="/cart/shipping" className="block w-full bg-rose-500 text-white py-3 rounded-lg font-medium text-center hover:bg-rose-600 transition-colors">
                  Proceed to Checkout
                </Link>
                <Link href="/" className="block w-full mt-3 py-2.5 text-center text-rose-600 font-medium hover:text-rose-700 transition-colors">
                  Continue Shopping
                </Link>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
