'use client';

import { useState } from 'react';
import { Calendar, Filter } from 'lucide-react';

type WithdrawalStatus = 'pending' | 'processing' | 'paid' | 'rejected';

interface Withdrawal {
  id: string;
  amount: number;
  date: string;
  status: WithdrawalStatus;
  remarks: string;
}

const dummyWithdrawals: Withdrawal[] = [
  {
    id: 'wd_001',
    amount: 50000,
    date: '2026-01-28',
    status: 'paid',
    remarks: 'Successfully transferred to bank account'
  },
  {
    id: 'wd_002',
    amount: 25000,
    date: '2026-01-25',
    status: 'processing',
    remarks: 'Under review by finance team'
  },
  {
    id: 'wd_003',
    amount: 75000,
    date: '2026-01-22',
    status: 'paid',
    remarks: 'Successfully transferred to bank account'
  },
  {
    id: 'wd_004',
    amount: 30000,
    date: '2026-01-20',
    status: 'rejected',
    remarks: 'KYC documents incomplete. Please resubmit.'
  },
  {
    id: 'wd_005',
    amount: 100000,
    date: '2026-01-18',
    status: 'paid',
    remarks: 'Successfully transferred to bank account'
  },
  {
    id: 'wd_006',
    amount: 15000,
    date: '2026-01-15',
    status: 'pending',
    remarks: 'Awaiting approval'
  }
];

const getStatusBadge = (status: WithdrawalStatus) => {
  const styles = {
    pending: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    processing: 'bg-blue-50 text-blue-700 border-blue-200',
    paid: 'bg-green-50 text-green-700 border-green-200',
    rejected: 'bg-red-50 text-red-700 border-red-200'
  };

  const labels = {
    pending: 'Pending',
    processing: 'Processing',
    paid: 'Paid',
    rejected: 'Rejected'
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${styles[status]}`}
    >
      {labels[status]}
    </span>
  );
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
};

export default function WithdrawHistoryTable() {
  const [filterStatus, setFilterStatus] = useState<WithdrawalStatus | 'all'>('all');

  const filteredWithdrawals = filterStatus === 'all'
    ? dummyWithdrawals
    : dummyWithdrawals.filter(w => w.status === filterStatus);

  return (
    <div className="mt-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-xl md:text-2xl font-playfair font-bold text-gray-800 mb-1">
            Withdrawal History
          </h3>
          <p className="text-sm text-gray-600">Track all your withdrawal requests</p>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as WithdrawalStatus | 'all')}
            className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
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
          {/* Desktop Table View */}
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
                  <tr
                    key={withdrawal.id}
                    className={`border-b border-gray-200 hover:bg-gray-50 transition-colors ${
                      index === filteredWithdrawals.length - 1 ? 'border-b-0' : ''
                    }`}
                  >
                    <td className="py-4 px-4 border-r border-gray-200">
                      <span className="font-bold text-gray-800">₹{withdrawal.amount.toLocaleString('en-IN')}</span>
                    </td>
                    <td className="py-4 px-4 text-gray-600 border-r border-gray-200">
                      {formatDate(withdrawal.date)}
                    </td>
                    <td className="py-4 px-4 text-center border-r border-gray-200">
                      {getStatusBadge(withdrawal.status)}
                    </td>
                    <td className="py-4 px-4 text-gray-600 text-sm">
                      {withdrawal.remarks}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden space-y-4">
            {filteredWithdrawals.map((withdrawal) => (
              <div
                key={withdrawal.id}
                className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-bold text-lg text-gray-800">
                      ₹{withdrawal.amount.toLocaleString('en-IN')}
                    </p>
                    <p className="text-sm text-gray-600 mt-1 flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {formatDate(withdrawal.date)}
                    </p>
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
  );
}
