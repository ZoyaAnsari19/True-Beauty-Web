'use client';

const dummyUsers = [
  {
    id: 1,
    name: 'Sarah Johnson',
    phone: '+91 98765 43210',
    earnings: 20376.50,
    hasPurchased: true
  },
  {
    id: 2,
    name: 'Emily Chen',
    phone: '+91 98765 43211',
    earnings: 0,
    hasPurchased: false
  },
  {
    id: 3,
    name: 'Michael Brown',
    phone: '+91 98765 43212',
    earnings: 25896.00,
    hasPurchased: true
  },
  {
    id: 4,
    name: 'Jessica Martinez',
    phone: '+91 98765 43213',
    earnings: 0,
    hasPurchased: false
  },
  {
    id: 5,
    name: 'David Wilson',
    phone: '+91 98765 43214',
    earnings: 8175.50,
    hasPurchased: true
  },
  {
    id: 6,
    name: 'Amanda Taylor',
    phone: '+91 98765 43215',
    earnings: 35005.25,
    hasPurchased: true
  }
];

// Function to mask phone number
const maskPhone = (phone: string): string => {
  // Extract the last 5 digits
  const parts = phone.split(' ');
  if (parts.length >= 3) {
    const lastPart = parts[parts.length - 1];
    const masked = '*****';
    return `${parts[0]} ${masked} ${lastPart}`;
  }
  // Fallback: mask middle digits
  if (phone.length > 7) {
    return phone.slice(0, 4) + '*****' + phone.slice(-5);
  }
  return phone;
};

export default function AffiliateUsersTable() {
  // Calculate total earnings only from users who have purchased
  const totalEarnings = dummyUsers
    .filter(user => user.hasPurchased)
    .reduce((sum, user) => sum + user.earnings, 0);

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-playfair font-bold text-gray-800 mb-2">
          Affiliated Users
        </h2>
        <p className="text-gray-600">Track your network and their earnings</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Name</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Phone</th>
              <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Earnings</th>
            </tr>
          </thead>
          <tbody>
            {dummyUsers.map((user) => (
              <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="py-4 px-4 text-gray-800 font-medium">{user.name}</td>
                <td className="py-4 px-4 text-gray-600">{maskPhone(user.phone)}</td>
                <td className="py-4 px-4 text-right text-gray-800 font-semibold">
                  {user.hasPurchased ? (
                    `₹${user.earnings.toFixed(2)}`
                  ) : (
                    <span className="text-gray-400 italic">purchasing</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-6 pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="text-sm text-gray-600">
          Total Earnings from Users: <span className="font-bold text-gray-800">₹{totalEarnings.toFixed(2)}</span>
        </p>
        <p className="text-sm text-gray-600">
          Showing <span className="font-semibold">{dummyUsers.length}</span> users
        </p>
      </div>
    </div>
  );
}
