'use client';

import { useState, useEffect } from 'react';
import KYCForm from './KYCForm';
import WithdrawHistoryTable from './WithdrawHistoryTable';
import { AlertCircle } from 'lucide-react';

export default function WithdrawSection() {
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [showKYC, setShowKYC] = useState(false);
  const [availableBalance] = useState(265600); // ₹ (3200 * 83)
  const [kycStatus, setKycStatus] = useState<'pending' | 'verified' | 'rejected' | 'not-submitted'>('not-submitted');

  useEffect(() => {
    // Get KYC status from profile
    const profileData = localStorage.getItem('profile');
    if (profileData) {
      const profile = JSON.parse(profileData);
      setKycStatus(profile.kycStatus || 'not-submitted');
    }
  }, []);

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(withdrawAmount);
    if (amount > 0 && amount <= availableBalance) {
      setShowKYC(true);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-playfair font-bold text-gray-800 mb-2">
          Withdraw Funds & History
        </h2>
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
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
                Withdrawal Amount
              </label>
              <input
                type="number"
                id="amount"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                placeholder="0.00"
                min="1"
                max={availableBalance}
                step="0.01"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
              <p className="mt-1 text-xs text-gray-500">
                Minimum withdrawal: ₹830.00
              </p>
            </div>

            {kycStatus !== 'verified' && (
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-yellow-800 mb-1">
                    KYC Verification Required
                  </p>
                  <p className="text-xs text-yellow-700 mb-2">
                    Please complete your KYC verification in your profile to enable withdrawals.
                  </p>
                  <a
                    href="/profile"
                    className="text-xs text-yellow-800 underline font-medium hover:text-yellow-900"
                  >
                    Go to Profile →
                  </a>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={
                kycStatus !== 'verified' ||
                !withdrawAmount ||
                parseFloat(withdrawAmount) <= 0 ||
                parseFloat(withdrawAmount) > availableBalance
              }
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
            >
              {kycStatus !== 'verified' ? 'KYC Verification Required' : 'Request to withdraw'}
            </button>
          </form>
        </div>
      ) : (
        <KYCForm
          withdrawAmount={withdrawAmount}
          onBack={() => setShowKYC(false)}
        />
      )}

      {/* Withdrawal History Table */}
      {!showKYC && <WithdrawHistoryTable />}
    </div>
  );
}
