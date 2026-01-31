'use client';

import { useState } from 'react';
import { ArrowLeft, Check } from 'lucide-react';

interface KYCFormProps {
  withdrawAmount: string;
  onBack: () => void;
}

export default function KYCForm({ withdrawAmount, onBack }: KYCFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    bank: '',
    upi: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="max-w-md mx-auto text-center py-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
          <Check className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Withdrawal Request Submitted</h3>
        <p className="text-gray-600 mb-4">
          Your withdrawal request for <span className="font-semibold">₹{withdrawAmount}</span> has been submitted successfully.
        </p>
        <p className="text-sm text-gray-500">
          We'll process your request within 3-5 business days.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to withdrawal
      </button>

      <div className="mb-6 p-4 bg-rose-50 rounded-lg border border-rose-200">
        <p className="text-sm text-rose-800 mb-1">Withdrawal Amount</p>
        <p className="text-2xl font-bold text-rose-900">₹{withdrawAmount}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="+1 (555) 123-4567"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            placeholder="john.doe@example.com"
          />
        </div>

        <div>
          <label htmlFor="bank" className="block text-sm font-medium text-gray-700 mb-2">
            Bank Account Details *
          </label>
          <input
            type="text"
            id="bank"
            name="bank"
            value={formData.bank}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            placeholder="Account Number, IFSC Code, Bank Name"
          />
        </div>

        <div>
          <label htmlFor="upi" className="block text-sm font-medium text-gray-700 mb-2">
            UPI ID *
          </label>
          <input
            type="text"
            id="upi"
            name="upi"
            value={formData.upi}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            placeholder="yourname@upi"
          />
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Withdrawal Request'}
          </button>
        </div>
      </form>
    </div>
  );
}
