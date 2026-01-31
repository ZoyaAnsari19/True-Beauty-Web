'use client';

import { useState, useEffect } from 'react';

interface TimerProps {
  initialSeconds: number;
  onExpire?: () => void;
  onResend: () => void;
  disabled?: boolean;
}

export default function Timer({ initialSeconds, onExpire, onResend, disabled }: TimerProps) {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    if (seconds > 0 && !disabled) {
      const timer = setInterval(() => {
        setSeconds((prev) => {
          if (prev <= 1) {
            setIsExpired(true);
            if (onExpire) onExpire();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [seconds, disabled, onExpire]);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const sec = secs % 60;
    return `${mins}:${sec.toString().padStart(2, '0')}`;
  };

  const handleResend = () => {
    setSeconds(initialSeconds);
    setIsExpired(false);
    onResend();
  };

  if (isExpired || seconds === 0) {
    return (
      <div className="text-center">
        <p className="text-sm text-gray-600 mb-2">Didn't receive OTP?</p>
        <button
          type="button"
          onClick={handleResend}
          disabled={disabled}
          className="text-sm font-medium text-rose-600 hover:text-rose-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Resend OTP
        </button>
      </div>
    );
  }

  return (
    <div className="text-center">
      <p className="text-sm text-gray-600">
        Resend OTP in <span className="font-semibold text-rose-600">{formatTime(seconds)}</span>
      </p>
    </div>
  );
}
