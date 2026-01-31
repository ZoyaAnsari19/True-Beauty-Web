'use client';

import { User } from 'lucide-react';

interface ProfileHeaderProps {
  user: any;
  isFirstTime: boolean;
}

export default function ProfileHeader({ user, isFirstTime }: ProfileHeaderProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-rose-100/80 p-6 md:p-8">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
        {/* Avatar */}
        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center flex-shrink-0">
          <User className="w-10 h-10 md:w-12 md:h-12 text-white" />
        </div>

        {/* User Info */}
        <div className="flex-1">
          <h1 className="text-2xl md:text-3xl font-playfair font-bold text-gray-800 mb-2">
            {user.name || 'User Profile'}
          </h1>
          <p className="text-gray-600 mb-1">
            <span className="font-medium">Phone:</span> +91 {user.phone || 'N/A'}
          </p>
          {user.email && (
            <p className="text-gray-600">
              <span className="font-medium">Email:</span> {user.email}
            </p>
          )}
        </div>

        {/* First Time Badge */}
        {isFirstTime && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-2">
            <p className="text-sm text-yellow-800 font-medium">
              Complete your profile to continue
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
