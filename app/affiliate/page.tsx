'use client';

import { useState, useEffect } from 'react';
import { DollarSign, Package, Users, Wallet, Copy, Check, AlertCircle, Calendar, Filter, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

type ActiveSection = 'products' | 'users' | 'withdraw' | null;
type WithdrawalStatus = 'pending' | 'paid' | 'rejected';

const dummyProducts = [
  { id: 1, name: 'True Beauty Day Cream', image: '/images/products/dayCream.png', price: 1299, commission: 15, affiliateLink: 'https://truebeauty.com/affiliate/day-cream?ref=ABC123' },
  { id: 2, name: 'True Beauty Night Cream', image: '/images/products/nightCream.png', price: 1399, commission: 15, affiliateLink: 'https://truebeauty.com/affiliate/night-cream?ref=ABC123' },
  { id: 3, name: 'True Beauty Serum', image: '/images/products/serum.png', price: 1499, commission: 20, affiliateLink: 'https://truebeauty.com/affiliate/serum?ref=ABC123' },
  { id: 4, name: 'True Beauty Sunscreen', image: '/images/products/sunscreen.png', price: 1199, commission: 12, affiliateLink: 'https://truebeauty.com/affiliate/sunscreen?ref=ABC123' },
  { id: 5, name: 'True Beauty Face Wash', image: '/images/products/faceWash.png', price: 999, commission: 10, affiliateLink: 'https://truebeauty.com/affiliate/face-wash?ref=ABC123' },
  { id: 6, name: 'True Beauty Moisturizer', image: '/images/products/moisturizer.png', price: 1399, commission: 15, affiliateLink: 'https://truebeauty.com/affiliate/moisturizer?ref=ABC123' }
];

const dummyUsers = [
  { id: 1, name: 'Sarah Johnson', phone: '+91 98765 43210', earnings: 20376.50, hasPurchased: true },
  { id: 2, name: 'Emily Chen', phone: '+91 98765 43211', earnings: 0, hasPurchased: false },
  { id: 3, name: 'Michael Brown', phone: '+91 98765 43212', earnings: 25896.00, hasPurchased: true },
  { id: 4, name: 'Jessica Martinez', phone: '+91 98765 43213', earnings: 0, hasPurchased: false },
  { id: 5, name: 'David Wilson', phone: '+91 98765 43214', earnings: 8175.50, hasPurchased: true },
  { id: 6, name: 'Amanda Taylor', phone: '+91 98765 43215', earnings: 35005.25, hasPurchased: true }
];

const dummyWithdrawals: { id: string; amount: number; date: string; status: WithdrawalStatus; remarks: string }[] = [
  { id: 'wd_001', amount: 50000, date: '2026-01-28', status: 'paid', remarks: 'Successfully transferred to bank account' },
  { id: 'wd_002', amount: 25000, date: '2026-01-25', status: 'pending', remarks: 'Under review by finance team' },
  { id: 'wd_003', amount: 75000, date: '2026-01-22', status: 'paid', remarks: 'Successfully transferred to bank account' },
  { id: 'wd_004', amount: 30000, date: '2026-01-20', status: 'rejected', remarks: 'KYC documents incomplete. Please resubmit.' },
  { id: 'wd_005', amount: 100000, date: '2026-01-18', status: 'paid', remarks: 'Successfully transferred to bank account' },
  { id: 'wd_006', amount: 15000, date: '2026-01-15', status: 'pending', remarks: 'Awaiting approval' }
];

const maskPhone = (phone: string): string => {
  const parts = phone.split(' ');
  if (parts.length >= 3) return `${parts[0]} ***** ${parts[parts.length - 1]}`;
  if (phone.length > 7) return phone.slice(0, 4) + '*****' + phone.slice(-5);
  return phone;
};

const getStatusBadge = (status: WithdrawalStatus) => {
  const styles = { pending: 'bg-yellow-50 text-yellow-700 border-yellow-200', paid: 'bg-green-50 text-green-700 border-green-200', rejected: 'bg-red-50 text-red-700 border-red-200' };
  const labels = { pending: 'Pending', paid: 'Paid', rejected: 'Rejected' };
  return <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${styles[status]}`}>{labels[status]}</span>;
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
};

export default function AffiliatePage() {
  const [activeSection, setActiveSection] = useState<ActiveSection>(null);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [showKYC, setShowKYC] = useState(false);
  const [availableBalance] = useState(265600);
  const [kycStatus, setKycStatus] = useState<'pending' | 'verified' | 'rejected' | 'not-submitted'>('not-submitted');
  const [kycFormData, setKycFormData] = useState({ name: '', phone: '', email: '', bank: '', upi: '' });
  const [isKycSubmitting, setIsKycSubmitting] = useState(false);
  const [isKycSubmitted, setIsKycSubmitted] = useState(false);
  const [withdrawFilterStatus, setWithdrawFilterStatus] = useState<WithdrawalStatus | 'all'>('all');

  useEffect(() => {
    localStorage.setItem('isAffiliate', 'true');
    const profileData = localStorage.getItem('profile');
    if (profileData) {
      const profile = JSON.parse(profileData);
      profile.isAffiliate = true;
      localStorage.setItem('profile', JSON.stringify(profile));
    }
  }, []);

  useEffect(() => {
    const profileData = localStorage.getItem('profile');
    if (profileData) {
      const profile = JSON.parse(profileData);
      setKycStatus(profile.kycStatus || 'not-submitted');
    }
  }, []);

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(withdrawAmount);
    if (amount > 0 && amount <= availableBalance) setShowKYC(true);
  };

  const handleKycSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsKycSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsKycSubmitting(false);
    setIsKycSubmitted(true);
  };

  const filteredWithdrawals = withdrawFilterStatus === 'all' ? dummyWithdrawals : dummyWithdrawals.filter(w => w.status === withdrawFilterStatus);
  const totalEarnings = dummyUsers.filter(u => u.hasPurchased).reduce((sum, u) => sum + u.earnings, 0);

  const cards = [
    { id: 'products', title: 'Listed Products', value: '24', icon: Package, color: 'from-blue-500 to-blue-600' },
    { id: 'users', title: 'Affiliated Users', value: '156', icon: Users, color: 'from-green-500 to-green-600' },
    { id: 'withdraw', title: 'Withdrawal & History', value: '₹2,65,600', icon: Wallet, color: 'from-rose-500 to-rose-600' }
  ];

  return (
    <div className="min-h-screen gradient-bg mt-5">
      <Header />
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4 md:px-8">
        <div className="md:hidden mb-4">
          <Link href="/" className="inline-flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Back to home</span>
          </Link>
        </div>
        <div className="hidden md:block lg:hidden mb-4">
          <Link href="/" className="inline-flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Back to home</span>
          </Link>
        </div>
        <div className="mb-8 flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-playfair font-bold text-gray-800 mb-2">Affiliate Dashboard</h1>
            <p className="text-gray-600">Manage your affiliate program and track earnings</p>
          </div>
          <div className="bg-white/95 border border-rose-100 rounded-xl shadow-sm p-5 md:p-6 flex items-center gap-4 min-w-0 md:min-w-[280px]">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center flex-shrink-0">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <div className="min-w-0">
              <p className="text-gray-600 text-sm font-medium mb-0.5">Total Earnings</p>
              <p className="text-2xl md:text-3xl font-bold text-gray-800">₹10,33,350</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {cards.map((card) => {
            const IconComponent = card.icon;
            return (
              <button
                key={card.id}
                onClick={() => setActiveSection(card.id as ActiveSection)}
                className="bg-white/90 border border-rose-100 rounded-xl shadow-sm hover:shadow-md hover:border-rose-200 transition-all duration-300 p-6 text-left cursor-pointer hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${card.color} flex items-center justify-center`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xs text-gray-500 font-medium">Click to view</span>
                </div>
                <h3 className="text-gray-600 text-sm font-medium mb-1">{card.title}</h3>
                <p className="text-2xl md:text-3xl font-bold text-gray-800">{card.value}</p>
              </button>
            );
          })}
        </div>

        <div className="mt-8">
          {activeSection === 'products' && (
            <div className="bg-white/95 border border-rose-100 rounded-2xl shadow-sm p-6 md:p-8">
              <div className="mb-6">
                <h2 className="text-2xl md:text-3xl font-playfair font-bold text-gray-800 mb-2">Listed Products</h2>
                <p className="text-gray-600">Copy your affiliate links and start earning</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {dummyProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          )}

          {activeSection === 'users' && (
            <div className="bg-white/95 border border-rose-100 rounded-2xl shadow-sm p-6 md:p-8">
              <div className="mb-6">
                <h2 className="text-2xl md:text-3xl font-playfair font-bold text-gray-800 mb-2">Affiliated Users</h2>
                <p className="text-gray-600">Track your network and their earnings</p>
              </div>
              <div className="hidden md:block overflow-x-auto border border-gray-200 rounded-lg">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 border-r border-gray-200">Name</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 border-r border-gray-200">Phone</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Earnings Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dummyUsers.map((user, index) => (
                      <tr key={user.id} className={`border-b border-gray-200 hover:bg-gray-50 transition-colors ${index === dummyUsers.length - 1 ? 'border-b-0' : ''}`}>
                        <td className="py-4 px-4 text-gray-800 font-medium border-r border-gray-200">{user.name}</td>
                        <td className="py-4 px-4 text-gray-600 border-r border-gray-200">{maskPhone(user.phone)}</td>
                        <td className="py-4 px-4 text-right text-gray-800 font-semibold">{user.hasPurchased ? `₹${user.earnings.toFixed(2)}` : <span className="text-gray-500 italic">not purchased</span>}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="md:hidden space-y-4">
                {dummyUsers.map((user) => (
                  <div key={user.id} className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <p className="font-bold text-lg text-gray-800 mb-1">{user.name}</p>
                        <p className="text-sm text-gray-600 flex items-center gap-1"><Users className="w-4 h-4" />{maskPhone(user.phone)}</p>
                      </div>
                      <div className="text-right">
                        {user.hasPurchased ? (
                          <p className="font-bold text-lg text-gray-800">₹{user.earnings.toFixed(2)}</p>
                        ) : (
                          <span className="text-gray-500 italic text-sm">not purchased</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <p className="text-sm text-gray-600">Total Earnings from Users: <span className="font-bold text-gray-800">₹{totalEarnings.toFixed(2)}</span></p>
                <p className="text-sm text-gray-600">Showing <span className="font-semibold">{dummyUsers.length}</span> users</p>
              </div>
            </div>
          )}

          {activeSection === 'withdraw' && (
            <div className="bg-white/95 border border-rose-100 rounded-2xl shadow-sm p-6 md:p-8">
              <div className="mb-6">
                <h2 className="text-2xl md:text-3xl font-playfair font-bold text-gray-800 mb-2">Withdraw Funds & History</h2>
                <p className="text-gray-600">Request a withdrawal from your affiliate earnings</p>
              </div>

              {!showKYC ? (
                <div className="max-w-md">
                  <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-800 mb-1">Available Balance</p>
                    <p className="text-3xl font-bold text-blue-900">₹{availableBalance.toLocaleString('en-IN')}</p>
                  </div>

                  <form onSubmit={handleWithdraw} className="space-y-4">
                    <div>
                      <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">Withdrawal Amount</label>
                      <input type="number" id="amount" value={withdrawAmount} onChange={(e) => setWithdrawAmount(e.target.value)} placeholder="0.00" min="1" max={availableBalance} step="0.01" required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
                      <p className="mt-1 text-xs text-gray-500">Minimum withdrawal: ₹830.00</p>
                    </div>

                    {kycStatus !== 'verified' && (
                      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-yellow-800 mb-1">KYC Verification Required</p>
                          <p className="text-xs text-yellow-700 mb-2">Please complete your KYC verification in your profile to enable withdrawals.</p>
                          <a href="/profile" className="text-xs text-yellow-800 underline font-medium hover:text-yellow-900">Go to Profile →</a>
                        </div>
                      </div>
                    )}

                    <button type="submit" disabled={kycStatus !== 'verified' || !withdrawAmount || parseFloat(withdrawAmount) <= 0 || parseFloat(withdrawAmount) > availableBalance} className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg">
                      {kycStatus !== 'verified' ? 'KYC Verification Required' : 'Request to withdraw'}
                    </button>
                  </form>
                </div>
              ) : isKycSubmitted ? (
                <div className="max-w-md mx-auto text-center py-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4"><Check className="w-8 h-8 text-green-600" /></div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Withdrawal Request Submitted</h3>
                  <p className="text-gray-600 mb-4">Your withdrawal request for <span className="font-semibold">₹{withdrawAmount}</span> has been submitted successfully.</p>
                  <p className="text-sm text-gray-500">We'll process your request within 3-5 business days.</p>
                </div>
              ) : (
                <div className="max-w-2xl">
                  <button onClick={() => setShowKYC(false)} className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6 transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Back to withdrawal
                  </button>
                  <div className="mb-6 p-4 bg-rose-50 rounded-lg border border-rose-200">
                    <p className="text-sm text-rose-800 mb-1">Withdrawal Amount</p>
                    <p className="text-2xl font-bold text-rose-900">₹{withdrawAmount}</p>
                  </div>
                  <form onSubmit={handleKycSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="kyc-name" className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                        <input type="text" id="kyc-name" name="name" value={kycFormData.name} onChange={(e) => setKycFormData({ ...kycFormData, name: e.target.value })} required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="John Doe" />
                      </div>
                      <div>
                        <label htmlFor="kyc-phone" className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                        <input type="tel" id="kyc-phone" name="phone" value={kycFormData.phone} onChange={(e) => setKycFormData({ ...kycFormData, phone: e.target.value })} required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="+1 (555) 123-4567" />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="kyc-email" className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                      <input type="email" id="kyc-email" name="email" value={kycFormData.email} onChange={(e) => setKycFormData({ ...kycFormData, email: e.target.value })} required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="john.doe@example.com" />
                    </div>
                    <div>
                      <label htmlFor="kyc-bank" className="block text-sm font-medium text-gray-700 mb-2">Bank Account Details *</label>
                      <input type="text" id="kyc-bank" name="bank" value={kycFormData.bank} onChange={(e) => setKycFormData({ ...kycFormData, bank: e.target.value })} required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="Account Number, IFSC Code, Bank Name" />
                    </div>
                    <div>
                      <label htmlFor="kyc-upi" className="block text-sm font-medium text-gray-700 mb-2">UPI ID *</label>
                      <input type="text" id="kyc-upi" name="upi" value={kycFormData.upi} onChange={(e) => setKycFormData({ ...kycFormData, upi: e.target.value })} required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="yourname@upi" />
                    </div>
                    <div className="pt-4">
                      <button type="submit" disabled={isKycSubmitting} className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg">
                        {isKycSubmitting ? 'Submitting...' : 'Submit Withdrawal Request'}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {!showKYC && (
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                    <div>
                      <h3 className="text-xl md:text-2xl font-playfair font-bold text-gray-800 mb-1">Withdrawal History</h3>
                      <p className="text-sm text-gray-600">Track all your withdrawal requests</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Filter className="w-4 h-4 text-gray-500" />
                      <select value={withdrawFilterStatus} onChange={(e) => setWithdrawFilterStatus(e.target.value as WithdrawalStatus | 'all')} className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white">
                        <option value="all">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="paid">Paid</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </div>
                  </div>
                  {filteredWithdrawals.length === 0 ? (
                    <div className="bg-gray-50 rounded-xl border border-gray-200 p-12 text-center">
                      <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 font-medium mb-1">No withdrawal history</p>
                      <p className="text-sm text-gray-500">Your withdrawal requests will appear here</p>
                    </div>
                  ) : (
                    <>
                      <div className="hidden md:block overflow-x-auto border border-gray-200 rounded-lg">
                        <table className="w-full border-collapse">
                          <thead>
                            <tr className="border-b border-gray-200 bg-gray-50">
                              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 border-r border-gray-200">Amount</th>
                              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 border-r border-gray-200">Date</th>
                              <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700 border-r border-gray-200">Status</th>
                              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Remarks</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredWithdrawals.map((withdrawal, index) => (
                              <tr key={withdrawal.id} className={`border-b border-gray-200 hover:bg-gray-50 transition-colors ${index === filteredWithdrawals.length - 1 ? 'border-b-0' : ''}`}>
                                <td className="py-4 px-4 border-r border-gray-200"><span className="font-bold text-gray-800">₹{withdrawal.amount.toLocaleString('en-IN')}</span></td>
                                <td className="py-4 px-4 text-gray-600 border-r border-gray-200">{formatDate(withdrawal.date)}</td>
                                <td className="py-4 px-4 text-center border-r border-gray-200">{getStatusBadge(withdrawal.status)}</td>
                                <td className="py-4 px-4 text-gray-600 text-sm">{withdrawal.remarks}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div className="md:hidden space-y-4">
                        {filteredWithdrawals.map((withdrawal) => (
                          <div key={withdrawal.id} className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <p className="font-bold text-lg text-gray-800">₹{withdrawal.amount.toLocaleString('en-IN')}</p>
                                <p className="text-sm text-gray-600 mt-1 flex items-center gap-1"><Calendar className="w-4 h-4" />{formatDate(withdrawal.date)}</p>
                              </div>
                              {getStatusBadge(withdrawal.status)}
                            </div>
                            <div className="pt-3 border-t border-gray-100">
                              <p className="text-sm text-gray-600">{withdrawal.remarks}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          )}

          {activeSection === null && (
            <div className="bg-white/95 border border-rose-100 rounded-2xl shadow-sm p-12 text-center">
              <p className="text-gray-600">Select a card above to view details</p>
            </div>
          )}
        </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

function ProductCard({ product }: { product: { id: number; name: string; image: string; price: number; commission: number; affiliateLink: string } }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(product.affiliateLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };
  return (
    <div className="bg-white/95 border border-rose-100 rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col h-full">
      <div className="relative h-40 sm:h-44 shrink-0 overflow-hidden bg-rose-50/60">
        <img src={product.image} alt={product.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out" />
      </div>
      <div className="flex flex-col flex-1 p-4">
        <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">{product.name}</h3>
        <div className="flex items-center justify-between mb-3">
          <span className="text-lg font-bold text-gray-800">₹{product.price.toFixed(2)}</span>
          <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
            {product.commission}% commission (₹{(product.price * product.commission / 100).toFixed(2)})
          </span>
        </div>
        <div className="space-y-2 mt-auto">
          <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
            <input type="text" value={product.affiliateLink} readOnly className="flex-1 text-xs text-gray-600 bg-transparent border-none outline-none truncate" />
            <button onClick={handleCopy} className="flex items-center gap-1 px-3 py-1.5 bg-blue-500 text-white text-xs font-medium rounded-lg hover:bg-blue-600 transition-colors duration-200 flex-shrink-0">
              {copied ? <><Check className="w-3 h-3" />Copied</> : <><Copy className="w-3 h-3" />Copy</>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
