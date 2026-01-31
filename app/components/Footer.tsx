'use client';

import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setIsSubmitted(true);
    setEmail('');
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <footer className="py-12 bg-white border-t-2 border-rose-200/60">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <img 
              src="/images/logo/trueBeauty-Logo.png" 
              alt="True Beauty Logo" 
              width={80} 
              height={25} 
              className="object-contain"
            />
            <span className="text-xl font-playfair font-bold text-gray-800">True Beauty</span>
          </div>
          <p className="text-gray-600 max-w-md mx-auto mb-8">
            Redefining beauty standards with premium, cruelty-free cosmetics crafted for the modern woman.
          </p>

          {/* Join Community Form
          <div className="max-w-md mx-auto mb-10 px-6 py-8 bg-gradient-to-br from-rose-50/80 to-pink-50/80 backdrop-blur-sm rounded-2xl border border-rose-200/60 shadow-[0_4px_20px_rgba(251,113,133,0.08)]">
            <h3 className="font-playfair font-semibold text-gray-800 text-xl md:text-2xl mb-2 text-center">
              Join Our Community
            </h3>
            <p className="text-gray-600 text-sm mb-6 text-center">
              Get exclusive beauty tips, early access to new products, and special offers
            </p>
            {isSubmitted ? (
              <div className="text-center py-4">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-rose-100 mb-3">
                  <svg className="w-6 h-6 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-rose-600 font-medium">Thank you for joining!</p>
                <p className="text-gray-500 text-sm mt-1">Check your email for a welcome message</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="w-full px-5 py-3.5 rounded-full border border-rose-200/80 bg-white/90 backdrop-blur-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-300/50 focus:border-rose-300 transition-all duration-300 text-sm md:text-base"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white px-6 py-3.5 rounded-full font-medium hover:from-rose-600 hover:to-pink-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none text-sm md:text-base"
                >
                  {isSubmitting ? 'Joining...' : 'Join Now'}
                </button>
              </form>
            )}
          </div> */}

          <div className="flex justify-center space-x-6 text-gray-500 mb-8">
            <a href="#" className="hover:text-pink-500 transition-colors">About</a>
            <a href="#" className="hover:text-pink-500 transition-colors">Contact</a>
            <a href="#" className="hover:text-pink-500 transition-colors">Privacy</a>
            <a href="#" className="hover:text-pink-500 transition-colors">Terms</a>
          </div>
          <div className="mt-8 pt-6 border-t border-gray-100 text-gray-400 text-sm">
            © 2026 True Beauty. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
