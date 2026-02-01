'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Loader, Search, User, ShoppingBag, Menu, X, Grid3x3, ChevronDown, ChevronRight, MapPin, Package, Wallet, LogOut, Phone } from 'lucide-react';

const OTP_STORAGE_KEY = 'tb_otp';
const OTP_PHONE_KEY = 'tb_otp_phone';
const OTP_EXPIRY_KEY = 'tb_otp_expiry';
const OTP_ATTEMPTS_KEY = 'tb_otp_attempts';

function getRandomExpiryMinutes(): number {
  return Math.floor(Math.random() * (5 - 2 + 1) + 2);
}

async function sendOtp(phone: string) {
  await new Promise(resolve => setTimeout(resolve, 1000));
  if (!/^\d{10}$/.test(phone)) return { success: false, message: 'Please enter a valid 10-digit mobile number' };
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiryMinutes = getRandomExpiryMinutes();
  const expiryTime = Date.now() + expiryMinutes * 60 * 1000;
  localStorage.setItem(OTP_STORAGE_KEY, otp);
  localStorage.setItem(OTP_PHONE_KEY, phone);
  localStorage.setItem(OTP_EXPIRY_KEY, expiryTime.toString());
  localStorage.setItem(OTP_ATTEMPTS_KEY, '0');
  if (process.env.NODE_ENV === 'development') {
    console.log('[MVP OTP] Phone:', phone, '| OTP:', otp, '| Expires in:', expiryMinutes, 'minutes');
  }
  return { success: true, message: 'OTP sent successfully', expiryMinutes };
}

async function verifyOtp(phone: string, otp: string) {
  await new Promise(resolve => setTimeout(resolve, 1500));
  const storedOtp = localStorage.getItem(OTP_STORAGE_KEY);
  const storedPhone = localStorage.getItem(OTP_PHONE_KEY);
  const storedExpiry = localStorage.getItem(OTP_EXPIRY_KEY);
  const attempts = parseInt(localStorage.getItem(OTP_ATTEMPTS_KEY) || '0');
  if (attempts >= 5) return { success: false, message: 'Maximum verification attempts reached. Please request a new OTP.' };
  if (!storedOtp || !storedPhone || !storedExpiry) return { success: false, message: 'OTP expired or invalid. Please request a new OTP.' };
  if (storedPhone !== phone) return { success: false, message: 'Phone number mismatch.' };
  if (Date.now() > parseInt(storedExpiry)) {
    clearOtpData();
    return { success: false, message: 'OTP has expired. Please request a new OTP.' };
  }
  if (storedOtp !== otp) {
    localStorage.setItem(OTP_ATTEMPTS_KEY, (attempts + 1).toString());
    const remaining = 5 - attempts - 1;
    return { success: false, message: remaining > 0 ? `Invalid OTP. ${remaining} attempt${remaining === 1 ? '' : 's'} remaining.` : 'Invalid OTP. Please request a new OTP.' };
  }
  clearOtpData();
  const token = `mock-jwt-token-${Date.now()}-${phone}`;
  const existingUser = localStorage.getItem(`user_${phone}`);
  const userData = { id: existingUser ? JSON.parse(existingUser).id : `user_${Date.now()}`, phone, createdAt: existingUser ? JSON.parse(existingUser).createdAt : new Date().toISOString() };
  localStorage.setItem(`user_${phone}`, JSON.stringify(userData));
  localStorage.setItem('authToken', token);
  localStorage.setItem('user', JSON.stringify({ phone, id: userData.id }));
  return { success: true, message: !existingUser ? 'Account created successfully!' : 'Login successful!', token, user: { id: userData.id, phone, isNewUser: !existingUser } };
}

function clearOtpData() {
  localStorage.removeItem(OTP_STORAGE_KEY);
  localStorage.removeItem(OTP_PHONE_KEY);
  localStorage.removeItem(OTP_EXPIRY_KEY);
  localStorage.removeItem(OTP_ATTEMPTS_KEY);
}

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
  const [seconds, setSeconds] = useState(180);
  const [isExpired, setIsExpired] = useState(false);
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isAffiliate, setIsAffiliate] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const profileDropdownRef = useRef<HTMLDivElement>(null);
  const [cartCount, setCartCount] = useState(0);

  const getCartCount = () => {
    if (typeof window === 'undefined') return 0;
    try {
      const cart = JSON.parse(localStorage.getItem('tb_cart') || '[]');
      return cart.reduce((sum: number, item: { quantity?: number }) => sum + (item.quantity || 1), 0);
    } catch { return 0; }
  };

  useEffect(() => { clearOtpData(); }, []);
  useEffect(() => { setCartCount(getCartCount()); }, []);
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    const userData = localStorage.getItem('user');
    const profileData = localStorage.getItem('profile');
    setIsLoggedIn(!!authToken);
    if (authToken && userData) {
      const parsedUser = JSON.parse(userData);
      const parsedProfile = profileData ? JSON.parse(profileData) : null;
      setUser({ ...parsedUser, ...parsedProfile });
      setIsAffiliate(!!localStorage.getItem('isAffiliate') || !!parsedProfile?.isAffiliate);
    }
  }, []);
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(e.target as Node)) setProfileDropdownOpen(false);
    };
    if (profileDropdownOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [profileDropdownOpen]);
  useEffect(() => {
    if (seconds > 0 && !isLoading && step === 'otp') {
      const timer = setInterval(() => {
        setSeconds((prev) => (prev <= 1 ? (setIsExpired(true), 0) : prev - 1));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [seconds, isLoading, step]);

  const validatePhone = (phoneNumber: string): boolean => {
    if (!phoneNumber) { setPhoneError('Mobile number is required'); return false; }
    if (phoneNumber.length !== 10) { setPhoneError('Please enter a valid 10-digit mobile number'); return false; }
    if (!/^\d{10}$/.test(phoneNumber)) { setPhoneError('Mobile number should contain only digits'); return false; }
    setPhoneError('');
    return true;
  };

  const handleSendOtp = async () => {
    setError('');
    if (!validatePhone(phone)) return;
    setIsLoading(true);
    try {
      const response = await sendOtp(phone);
      if (response.success) {
        setStep('otp');
        setOtp('');
        setOtpError('');
        setSeconds((response.expiryMinutes ?? 3) * 60);
        setIsExpired(false);
      } else {
        setPhoneError(response.message || 'Failed to send OTP. Please try again.');
      }
    } catch { setPhoneError('Something went wrong. Please try again.'); } finally { setIsLoading(false); }
  };

  const handleVerifyOtp = async () => {
    setError(''); setOtpError('');
    if (otp.length !== 6) { setOtpError('Please enter complete 6-digit OTP'); return; }
    setIsLoading(true);
    try {
      const response = await verifyOtp(phone, otp);
      if (response.success && response.token && response.user) router.push('/');
      else setOtpError(response.message || 'Invalid OTP. Please try again.');
    } catch { setOtpError('Something went wrong. Please try again.'); } finally { setIsLoading(false); }
  };

  const handleResendOtp = async () => {
    setError(''); setOtpError(''); setOtp('');
    if (!validatePhone(phone)) { setStep('phone'); return; }
    setIsLoading(true);
    try {
      const response = await sendOtp(phone);
      if (response.success) {
        setSeconds((response.expiryMinutes ?? 3) * 60);
        setIsExpired(false);
      } else {
        setOtpError(response.message || 'Failed to resend OTP. Please try again.');
      }
    } catch { setOtpError('Something went wrong. Please try again.'); } finally { setIsLoading(false); }
  };

  const handleBackToPhone = () => {
    setStep('phone'); setOtp(''); setOtpError(''); clearOtpData();
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    localStorage.removeItem('profile');
    clearOtpData();
    window.location.href = '/';
  };

  const formatTime = (secs: number) => `${Math.floor(secs / 60)}:${(secs % 60).toString().padStart(2, '0')}`;
  const displayName = user?.name || user?.email || `+91 ${user?.phone || ''}`;
  const displayInitials = user?.name ? user.name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2) : user?.email?.[0].toUpperCase() || 'U';

  return (
    <div className="min-h-screen gradient-bg flex flex-col">
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b-2 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-3 border-rose-200' : 'bg-white/80 py-5 border-rose-200'}`}>
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <img src="/images/logo/trueBeauty-Logo.png" alt="True Beauty Logo" width={100} height={30} className="object-contain" />
              <span className="text-xl font-playfair font-bold text-gray-800 hidden md:block">True Beauty</span>
            </div>
            <nav className="hidden lg:flex items-center space-x-8 flex-1 justify-center">
              <div className="relative">
                <input type="text" placeholder="Search products..." className="w-96 px-5 py-2.5 pl-11 rounded-full border border-gray-200 focus:border-pink-300 focus:ring-2 focus:ring-pink-100 transition-all bg-white/80 backdrop-blur-sm text-base" />
                <Search className="absolute left-4 top-3 text-gray-400 w-5 h-5" />
              </div>
            </nav>
            <div className="hidden lg:flex items-center space-x-4">
              {isLoggedIn && user ? (
                <div className="relative" ref={profileDropdownRef}>
                  <button type="button" onClick={() => setProfileDropdownOpen(!profileDropdownOpen)} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">{displayInitials}</div>
                    <span className="hidden md:block text-sm font-medium text-gray-700 max-w-[120px] truncate">{displayName}</span>
                    <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform flex-shrink-0 ${profileDropdownOpen ? 'transform rotate-180' : ''}`} />
                  </button>
                  {profileDropdownOpen && (
                    <>
                      <div className="fixed inset-0 bg-black/20 z-40 lg:hidden" onClick={() => setProfileDropdownOpen(false)} aria-hidden="true" />
                      <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 z-50 overflow-hidden">
                        <div className="px-4 py-3 border-b border-gray-100 bg-gradient-to-r from-rose-50 to-pink-50">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center text-white font-semibold flex-shrink-0">{displayInitials}</div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-gray-800 truncate">{user?.name || 'User'}</p>
                              <p className="text-xs text-gray-600 truncate">{user?.email || `+91 ${user?.phone || ''}`}</p>
                            </div>
                          </div>
                        </div>
                        <nav className="py-2">
                          <Link href="/profile" onClick={() => setProfileDropdownOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"><User className="w-5 h-5 flex-shrink-0" /><span>Personal Info</span></Link>
                          <button type="button" onClick={() => { setProfileDropdownOpen(false); window.location.href = '/profile#addresses'; }} className="w-full flex items-center gap-3 px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-50"><MapPin className="w-5 h-5 flex-shrink-0" /><span>Saved Addresses</span></button>
                          <Link href="/orders" onClick={() => setProfileDropdownOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"><Package className="w-5 h-5 flex-shrink-0" /><span>Orders</span></Link>
                          {isAffiliate && <Link href="/affiliate" onClick={() => setProfileDropdownOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"><Wallet className="w-5 h-5 flex-shrink-0" /><span>KYC & Withdraw</span></Link>}
                          <button type="button" onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-left text-sm text-red-600 hover:bg-red-50"><LogOut className="w-5 h-5 flex-shrink-0" /><span>Logout</span></button>
                        </nav>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <Link href="/login" className="px-4 py-2 text-gray-700 hover:text-pink-500 transition-colors font-medium"><User className="inline mr-2 w-4 h-4" />Login</Link>
              )}
              <Link href="/affiliate" className="px-4 py-2 text-gray-700 hover:text-pink-500 transition-colors font-medium">Affiliate</Link>
              <Link href="/cart" className="relative flex items-center">
                <ShoppingBag className="w-6 h-6 text-gray-700 hover:text-pink-500 cursor-pointer transition-colors" />
                <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center min-w-[20px]">{cartCount}</span>
              </Link>
            </div>
            <button className="lg:hidden p-2 text-gray-700" onClick={() => setIsMenuOpen(!isMenuOpen)}>{isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}</button>
          </div>
          {isMenuOpen && (
            <div className="lg:hidden mt-4 pb-4 space-y-4">
              <div className="relative">
                <input type="text" placeholder="Search products..." className="w-full px-4 py-2.5 pl-11 rounded-full border border-gray-200 focus:border-pink-300 bg-white/80 backdrop-blur-sm text-base" />
                <Search className="absolute left-4 top-3 text-gray-400 w-5 h-5" />
              </div>
              <div className="flex flex-col space-y-3 pt-2">
                {isLoggedIn && user ? (
                  <Link href="/profile" onClick={() => setIsMenuOpen(false)} className="text-left px-4 py-2 text-gray-700 hover:text-pink-500 transition-colors font-medium flex items-center gap-2"><User className="w-5 h-5" />Profile</Link>
                ) : (
                  <Link href="/login" className="text-left px-4 py-2 text-gray-700 hover:text-pink-500 transition-colors font-medium" onClick={() => setIsMenuOpen(false)}><User className="inline mr-2 w-4 h-4" />Login</Link>
                )}
                <Link href="/affiliate" className="text-left px-4 py-2 text-gray-700 hover:text-pink-500 transition-colors font-medium block" onClick={() => setIsMenuOpen(false)}>Affiliate</Link>
                <Link href="/cart" onClick={() => setIsMenuOpen(false)} className="flex items-center px-4 py-2 text-gray-700 hover:text-pink-500 transition-colors font-medium"><ShoppingBag className="mr-2 w-5 h-5" />Cart ({cartCount})</Link>
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center pt-32 pb-12 px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-playfair font-bold text-gray-800 mb-2">{step === 'phone' ? 'Welcome Back' : 'Verify OTP'}</h1>
            <p className="text-gray-600">{step === 'phone' ? 'Sign in with your mobile number' : `Enter the OTP sent to +91 ${phone}`}</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-rose-100/80 p-6 md:p-8">
            {step === 'phone' ? (
              <div className="space-y-5">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Mobile Number</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><span className="text-gray-500 font-medium">+91</span></div>
                    <div className="absolute inset-y-0 left-12 pl-3 flex items-center pointer-events-none"><Phone className="h-5 w-5 text-gray-400" /></div>
                    <input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))} disabled={isLoading} className={`w-full pl-24 pr-4 py-3 rounded-lg border ${phoneError ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-rose-500 focus:border-rose-500'} focus:ring-2 focus:outline-none transition-all disabled:bg-gray-50 disabled:cursor-not-allowed`} placeholder="Enter 10 digit mobile number" maxLength={10} aria-invalid={!!phoneError} />
                  </div>
                  {phoneError && <p id="phone-error" className="mt-1 text-sm text-red-600" role="alert">{phoneError}</p>}
                  <p className="mt-1 text-xs text-gray-500">We'll send you a 6-digit OTP to verify your number</p>
                </div>

                {error && <div className="p-3 bg-red-50 border border-red-200 rounded-lg"><p className="text-sm text-red-600">{error}</p></div>}

                <button type="button" onClick={handleSendOtp} disabled={isLoading || phone.length !== 10} className="w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white py-3 rounded-lg font-medium hover:from-rose-600 hover:to-pink-600 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:transform-none flex items-center justify-center gap-2">
                  {isLoading ? <><Loader className="w-5 h-5 animate-spin" />Sending OTP...</> : 'Send OTP'}
                </button>
              </div>
            ) : (
              <div className="space-y-5">
                <button type="button" onClick={handleBackToPhone} className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors mb-2">
                  <ArrowLeft className="w-4 h-4" />Change number
                </button>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Enter OTP</label>
                  <div className="flex gap-2 justify-center">
                    {Array.from({ length: 6 }).map((_, index) => (
                      <input key={index} ref={(el) => { otpInputRefs.current[index] = el; }} type="text" inputMode="numeric" maxLength={1} value={otp[index] || ''} onChange={(e) => {
                        const inputValue = e.target.value.replace(/\D/g, '').slice(0, 1);
                        if (inputValue && !/^\d$/.test(inputValue)) return;
                        const newValue = otp.split('');
                        newValue[index] = inputValue;
                        const updatedValue = newValue.join('').slice(0, 6);
                        setOtp(updatedValue);
                        if (inputValue && index < 5) otpInputRefs.current[index + 1]?.focus();
                      }} onKeyDown={(e) => {
                        if (e.key === 'Backspace' && !otp[index] && index > 0) otpInputRefs.current[index - 1]?.focus();
                      }} onPaste={(e) => {
                        e.preventDefault();
                        const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
                        if (pastedData.length === 6) { setOtp(pastedData); otpInputRefs.current[5]?.focus(); }
                      }} disabled={isLoading} className={`w-12 h-12 text-center text-lg font-semibold rounded-lg border ${otpError ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-rose-500 focus:border-rose-500'} focus:ring-2 focus:outline-none transition-all disabled:bg-gray-50 disabled:cursor-not-allowed`} aria-label={`OTP digit ${index + 1}`} />
                    ))}
                  </div>
                  {otpError && <p className="mt-2 text-sm text-red-600 text-center" role="alert">{otpError}</p>}
                </div>

                {error && <div className="p-3 bg-red-50 border border-red-200 rounded-lg"><p className="text-sm text-red-600">{error}</p></div>}

                {isExpired || seconds === 0 ? (
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">Didn't receive OTP?</p>
                    <button type="button" onClick={handleResendOtp} disabled={isLoading} className="text-sm font-medium text-rose-600 hover:text-rose-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">Resend OTP</button>
                  </div>
                ) : (
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Resend OTP in <span className="font-semibold text-rose-600">{formatTime(seconds)}</span></p>
                  </div>
                )}

                <button type="button" onClick={handleVerifyOtp} disabled={isLoading || otp.length !== 6} className="w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white py-3 rounded-lg font-medium hover:from-rose-600 hover:to-pink-600 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:transform-none flex items-center justify-center gap-2">
                  {isLoading ? <><Loader className="w-5 h-5 animate-spin" />Verifying...</> : 'Verify OTP'}
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="py-12 bg-white border-t-2 border-rose-200/60">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-4">
              <img src="/images/logo/trueBeauty-Logo.png" alt="True Beauty Logo" width={80} height={25} className="object-contain" />
              <span className="text-xl font-playfair font-bold text-gray-800">True Beauty</span>
            </div>
            <p className="text-gray-600 max-w-md mx-auto mb-8">Redefining beauty standards with premium, cruelty-free cosmetics crafted for the modern woman.</p>
            <div className="flex justify-center space-x-6 text-gray-500 mb-8">
              <a href="#" className="hover:text-pink-500 transition-colors">About</a>
              <a href="#" className="hover:text-pink-500 transition-colors">Contact</a>
              <a href="#" className="hover:text-pink-500 transition-colors">Privacy</a>
              <a href="#" className="hover:text-pink-500 transition-colors">Terms</a>
            </div>
            <div className="mt-8 pt-6 border-t border-gray-100 text-gray-400 text-sm">© 2026 True Beauty. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
