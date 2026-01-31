'use client';

import { useState } from 'react';
import { Save, Check, X, Mail } from 'lucide-react';

interface PersonalInfoFormProps {
  user: any;
  setUser: (user: any) => void;
}

export default function PersonalInfoForm({ user, setUser }: PersonalInfoFormProps) {
  const [formData, setFormData] = useState({
    name: user.name || '',
    email: user.email || '',
    dateOfBirth: user.dateOfBirth || '',
    gender: user.gender || ''
  });
  const [isEditing, setIsEditing] = useState(!user.name);
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [emailVerification, setEmailVerification] = useState({
    show: false,
    newEmail: '',
    code: ''
  });

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;

    setIsSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Update user data
    const updatedUser = {
      ...user,
      ...formData
    };

    setUser(updatedUser);
    localStorage.setItem('profile', JSON.stringify(updatedUser));
    
    setIsSaving(false);
    setIsEditing(false);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  const handleEmailChange = () => {
    if (!formData.email || errors.email) return;
    
    setEmailVerification({
      show: true,
      newEmail: formData.email,
      code: ''
    });
  };

  const handleEmailVerify = async () => {
    // Simulate email verification
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setEmailVerification({ show: false, newEmail: '', code: '' });
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-rose-100/80 p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl md:text-2xl font-playfair font-bold text-gray-800 mb-1">
            Personal Information
          </h2>
          <p className="text-sm text-gray-600">Manage your personal details</p>
        </div>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 text-sm font-medium text-rose-600 hover:text-rose-700 transition-colors"
          >
            Edit
          </button>
        )}
      </div>

      {success && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
          <Check className="w-5 h-5 text-green-600" />
          <p className="text-sm text-green-700">Profile updated successfully!</p>
        </div>
      )}

      <div className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value });
              if (errors.name) setErrors({ ...errors, name: '' });
            }}
            disabled={!isEditing}
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.name
                ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                : 'border-gray-300 focus:ring-rose-500 focus:border-rose-500'
            } focus:ring-2 focus:outline-none transition-all disabled:bg-gray-50 disabled:cursor-not-allowed`}
            placeholder="Enter your full name"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
          )}
        </div>

        {/* Phone (Read-only) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            value={`+91 ${user.phone || ''}`}
            disabled
            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 cursor-not-allowed"
          />
          <p className="mt-1 text-xs text-gray-500">Phone number cannot be changed</p>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  if (errors.email) setErrors({ ...errors, email: '' });
                }}
                disabled={!isEditing || emailVerification.show}
                className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                  errors.email
                    ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                    : 'border-gray-300 focus:ring-rose-500 focus:border-rose-500'
                } focus:ring-2 focus:outline-none transition-all disabled:bg-gray-50 disabled:cursor-not-allowed`}
                placeholder="Enter your email address"
              />
            </div>
            {isEditing && formData.email && !emailVerification.show && (
              <button
                onClick={handleEmailChange}
                className="px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
              >
                Verify
              </button>
            )}
          </div>
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
          {emailVerification.show && (
            <div className="mt-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800 mb-3">
                Verification code sent to {emailVerification.newEmail}
              </p>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={emailVerification.code}
                  onChange={(e) => setEmailVerification({ ...emailVerification, code: e.target.value })}
                  className="flex-1 px-3 py-2 rounded-lg border border-blue-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Enter verification code"
                  maxLength={6}
                />
                <button
                  onClick={handleEmailVerify}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
                >
                  Verify
                </button>
                <button
                  onClick={() => setEmailVerification({ show: false, newEmail: '', code: '' })}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date of Birth
          </label>
          <input
            type="date"
            value={formData.dateOfBirth}
            onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
            disabled={!isEditing}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-rose-500 focus:border-rose-500 focus:ring-2 focus:outline-none transition-all disabled:bg-gray-50 disabled:cursor-not-allowed"
          />
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gender
          </label>
          <select
            value={formData.gender}
            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
            disabled={!isEditing}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-rose-500 focus:border-rose-500 focus:ring-2 focus:outline-none transition-all disabled:bg-gray-50 disabled:cursor-not-allowed"
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
            <option value="prefer-not-to-say">Prefer not to say</option>
          </select>
        </div>

        {/* Action Buttons */}
        {isEditing && (
          <div className="flex gap-3 pt-4">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex-1 bg-gradient-to-r from-rose-500 to-pink-500 text-white py-3 rounded-lg font-medium hover:from-rose-600 hover:to-pink-600 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:transform-none flex items-center justify-center gap-2"
            >
              {isSaving ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Save Changes
                </>
              )}
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setFormData({
                  name: user.name || '',
                  email: user.email || '',
                  dateOfBirth: user.dateOfBirth || '',
                  gender: user.gender || ''
                });
                setErrors({});
                setEmailVerification({ show: false, newEmail: '', code: '' });
              }}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
