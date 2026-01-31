'use client';

import { useRef, useEffect } from 'react';

interface OtpInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
  length?: number;
}

export default function OtpInput({ 
  value, 
  onChange, 
  error, 
  disabled = false,
  length = 6 
}: OtpInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Focus first input on mount
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index: number, inputValue: string) => {
    // Only allow single digit
    if (inputValue.length > 1) return;
    
    // Only allow numbers
    if (inputValue && !/^\d$/.test(inputValue)) return;

    const newValue = value.split('');
    newValue[index] = inputValue;
    const updatedValue = newValue.join('').slice(0, length);
    onChange(updatedValue);

    // Auto-focus next input
    if (inputValue && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace
    if (e.key === 'Backspace' && !value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
    if (pastedData.length === length) {
      onChange(pastedData);
      // Focus last input after paste
      inputRefs.current[length - 1]?.focus();
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Enter OTP
      </label>
      <div className="flex gap-2 justify-center">
        {Array.from({ length }).map((_, index) => (
          <input
            key={index}
            ref={(el) => { inputRefs.current[index] = el; }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={value[index] || ''}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            disabled={disabled}
            className={`w-12 h-12 text-center text-lg font-semibold rounded-lg border ${
              error 
                ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                : 'border-gray-300 focus:ring-rose-500 focus:border-rose-500'
            } focus:ring-2 focus:outline-none transition-all disabled:bg-gray-50 disabled:cursor-not-allowed`}
            aria-label={`OTP digit ${index + 1}`}
          />
        ))}
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-600 text-center" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
