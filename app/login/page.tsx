'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import PhoneInput from '@/app/components/login/PhoneInput';
import OtpInput from '@/app/components/login/OtpInput';
import Timer from '@/app/components/login/Timer';
import { sendOtp, verifyOtp, clearOtpData } from '@/app/utils/auth';
import { ArrowLeft, Loader } from 'lucide-react';

type Step = 'phone' | 'otp';

export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [phoneError, setPhoneError] = useState<string>('');
  const [otpError, setOtpError] = useState<string>('');
  const [devOtp, setDevOtp] = useState<string>('');

  // Clear any existing OTP data on mount
  useEffect(() => {
    clearOtpData();
  }, []);

  const validatePhone = (phoneNumber: string): boolean => {
    if (!phoneNumber) {
      setPhoneError('Mobile number is required');
      return false;
    }
    if (phoneNumber.length !== 10) {
      setPhoneError('Please enter a valid 10-digit mobile number');
      return false;
    }
    if (!/^\d{10}$/.test(phoneNumber)) {
      setPhoneError('Mobile number should contain only digits');
      return false;
    }
    setPhoneError('');
    return true;
  };

  const handleSendOtp = async () => {
    setError('');
    
    if (!validatePhone(phone)) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await sendOtp(phone);
      
      if (response.success) {
        // Store OTP for development display
        if (response.otp) {
          setDevOtp(response.otp);
        }
        setStep('otp');
        setOtp('');
        setOtpError('');
      } else {
        setPhoneError(response.message || 'Failed to send OTP. Please try again.');
      }
    } catch (err) {
      setPhoneError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setError('');
    setOtpError('');

    if (otp.length !== 6) {
      setOtpError('Please enter complete 6-digit OTP');
      return;
    }

    setIsLoading(true);
    try {
      const response = await verifyOtp(phone, otp);
      
      if (response.success && response.token && response.user) {
        // Success - redirect to home
        router.push('/');
      } else {
        setOtpError(response.message || 'Invalid OTP. Please try again.');
      }
    } catch (err) {
      setOtpError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setError('');
    setOtpError('');
    setOtp('');
    
    if (!validatePhone(phone)) {
      setStep('phone');
      return;
    }

    setIsLoading(true);
    try {
      const response = await sendOtp(phone);
      
      if (response.success) {
        // Store OTP for development display
        if (response.otp) {
          setDevOtp(response.otp);
        }
        // OTP resent successfully
      } else {
        setOtpError(response.message || 'Failed to resend OTP. Please try again.');
      }
    } catch (err) {
      setOtpError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToPhone = () => {
    setStep('phone');
    setOtp('');
    setOtpError('');
    setDevOtp('');
    clearOtpData();
  };

  return (
    <div className="min-h-screen gradient-bg flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center pt-32 pb-12 px-4">
        <div className="w-full max-w-md">
          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-playfair font-bold text-gray-800 mb-2">
              {step === 'phone' ? 'Welcome Back' : 'Verify OTP'}
            </h1>
            <p className="text-gray-600">
              {step === 'phone' 
                ? 'Sign in with your mobile number' 
                : `Enter the OTP sent to +91 ${phone}`
              }
            </p>
          </div>

          {/* Login Form Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-rose-100/80 p-6 md:p-8">
            {step === 'phone' ? (
              <div className="space-y-5">
                <PhoneInput
                  value={phone}
                  onChange={setPhone}
                  error={phoneError}
                  disabled={isLoading}
                />

                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleSendOtp}
                  disabled={isLoading || phone.length !== 10}
                  className="w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white py-3 rounded-lg font-medium hover:from-rose-600 hover:to-pink-600 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:transform-none flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      Sending OTP...
                    </>
                  ) : (
                    'Send OTP'
                  )}
                </button>
              </div>
            ) : (
              <div className="space-y-5">
                <button
                  type="button"
                  onClick={handleBackToPhone}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors mb-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Change number
                </button>

                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  error={otpError}
                  disabled={isLoading}
                />

                {/* Development OTP Display */}
                {devOtp && (
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-xs text-blue-800 font-medium mb-1">Development Mode - OTP:</p>
                    <p className="text-lg font-bold text-blue-900">{devOtp}</p>
                    <p className="text-xs text-blue-600 mt-1">Check browser console for OTP details</p>
                  </div>
                )}

                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                )}

                <Timer
                  initialSeconds={180} // 3 minutes
                  onResend={handleResendOtp}
                  disabled={isLoading}
                />

                <button
                  type="button"
                  onClick={handleVerifyOtp}
                  disabled={isLoading || otp.length !== 6}
                  className="w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white py-3 rounded-lg font-medium hover:from-rose-600 hover:to-pink-600 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:transform-none flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    'Verify OTP'
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
