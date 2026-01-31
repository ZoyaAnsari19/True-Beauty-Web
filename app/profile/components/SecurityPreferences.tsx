'use client';

import { Shield, Bell, Globe } from 'lucide-react';

interface SecurityPreferencesProps {
  user: any;
  setUser: (user: any) => void;
}

export default function SecurityPreferences({ user, setUser }: SecurityPreferencesProps) {
  return (
    <div className="space-y-6">
      {/* Security Settings */}
      <div className="bg-white rounded-2xl shadow-sm border border-rose-100/80 p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="w-6 h-6 text-rose-500" />
          <h2 className="text-xl md:text-2xl font-playfair font-bold text-gray-800">
            Security
          </h2>
        </div>
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">Password</p>
            <button className="text-sm text-rose-600 hover:text-rose-700 font-medium">
              Change Password
            </button>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">Two-Factor Authentication</p>
            <button className="text-sm text-rose-600 hover:text-rose-700 font-medium">
              Enable 2FA
            </button>
          </div>
        </div>
      </div>

      {/* Preferences */}
      <div className="bg-white rounded-2xl shadow-sm border border-rose-100/80 p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <Bell className="w-6 h-6 text-rose-500" />
          <h2 className="text-xl md:text-2xl font-playfair font-bold text-gray-800">
            Preferences
          </h2>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="text-sm font-medium text-gray-800">Email Notifications</p>
              <p className="text-xs text-gray-600">Receive updates via email</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-rose-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-500"></div>
            </label>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="text-sm font-medium text-gray-800">SMS Notifications</p>
              <p className="text-xs text-gray-600">Receive updates via SMS</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-rose-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-500"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Language & Region */}
      <div className="bg-white rounded-2xl shadow-sm border border-rose-100/80 p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <Globe className="w-6 h-6 text-rose-500" />
          <h2 className="text-xl md:text-2xl font-playfair font-bold text-gray-800">
            Language & Region
          </h2>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Language
            </label>
            <select className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-rose-500 focus:border-rose-500 focus:ring-2 focus:outline-none transition-all">
              <option value="en">English</option>
              <option value="hi">Hindi</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Currency
            </label>
            <select className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-rose-500 focus:border-rose-500 focus:ring-2 focus:outline-none transition-all">
              <option value="INR">Indian Rupee (₹)</option>
              <option value="USD">US Dollar ($)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
