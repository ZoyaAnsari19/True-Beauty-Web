'use client';

import { Phone } from 'lucide-react';

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
}

export default function PhoneInput({ value, onChange, error, disabled }: PhoneInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers and limit to 10 digits
    const input = e.target.value.replace(/\D/g, '').slice(0, 10);
    onChange(input);
  };

  return (
    <div>
      <label 
        htmlFor="phone" 
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        Mobile Number
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <span className="text-gray-500 font-medium">+91</span>
        </div>
        <div className="absolute inset-y-0 left-12 pl-3 flex items-center pointer-events-none">
          <Phone className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="tel"
          id="phone"
          value={value}
          onChange={handleChange}
          disabled={disabled}
          className={`w-full pl-24 pr-4 py-3 rounded-lg border ${
            error 
              ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
              : 'border-gray-300 focus:ring-rose-500 focus:border-rose-500'
          } focus:ring-2 focus:outline-none transition-all disabled:bg-gray-50 disabled:cursor-not-allowed`}
          placeholder="Enter 10 digit mobile number"
          maxLength={10}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? 'phone-error' : undefined}
        />
      </div>
      {error && (
        <p id="phone-error" className="mt-1 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
      <p className="mt-1 text-xs text-gray-500">
        We'll send you a 6-digit OTP to verify your number
      </p>
    </div>
  );
}
