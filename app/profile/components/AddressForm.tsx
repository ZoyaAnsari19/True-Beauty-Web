'use client';

import { useState, useEffect } from 'react';
import { Save, X } from 'lucide-react';

interface Address {
  id?: string;
  name: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

interface AddressFormProps {
  address?: Address | null;
  onSave: (address: Address) => void;
  onCancel: () => void;
}

export default function AddressForm({ address, onSave, onCancel }: AddressFormProps) {
  const [formData, setFormData] = useState<Address>({
    name: address?.name || '',
    phone: address?.phone || '',
    addressLine1: address?.addressLine1 || '',
    addressLine2: address?.addressLine2 || '',
    city: address?.city || '',
    state: address?.state || '',
    pincode: address?.pincode || '',
    isDefault: address?.isDefault || false
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    if (!formData.addressLine1.trim()) {
      newErrors.addressLine1 = 'Address line 1 is required';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }

    if (!formData.state.trim()) {
      newErrors.state = 'State is required';
    }

    if (!formData.pincode.trim()) {
      newErrors.pincode = 'Pincode is required';
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = 'Please enter a valid 6-digit pincode';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    setIsSaving(false);

    onSave(formData);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-rose-100/80 p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl md:text-2xl font-playfair font-bold text-gray-800">
          {address ? 'Edit Address' : 'Add New Address'}
        </h2>
        <button
          onClick={onCancel}
          className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
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
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.name
                ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                : 'border-gray-300 focus:ring-rose-500 focus:border-rose-500'
            } focus:ring-2 focus:outline-none transition-all`}
            placeholder="Enter full name"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, '').slice(0, 10);
              setFormData({ ...formData, phone: value });
              if (errors.phone) setErrors({ ...errors, phone: '' });
            }}
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.phone
                ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                : 'border-gray-300 focus:ring-rose-500 focus:border-rose-500'
            } focus:ring-2 focus:outline-none transition-all`}
            placeholder="Enter 10-digit phone number"
            maxLength={10}
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
          )}
        </div>

        {/* Address Line 1 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Address Line 1 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.addressLine1}
            onChange={(e) => {
              setFormData({ ...formData, addressLine1: e.target.value });
              if (errors.addressLine1) setErrors({ ...errors, addressLine1: '' });
            }}
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.addressLine1
                ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                : 'border-gray-300 focus:ring-rose-500 focus:border-rose-500'
            } focus:ring-2 focus:outline-none transition-all`}
            placeholder="House/Flat No., Building Name"
          />
          {errors.addressLine1 && (
            <p className="mt-1 text-sm text-red-600">{errors.addressLine1}</p>
          )}
        </div>

        {/* Address Line 2 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Address Line 2 (Optional)
          </label>
          <input
            type="text"
            value={formData.addressLine2}
            onChange={(e) => setFormData({ ...formData, addressLine2: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-rose-500 focus:border-rose-500 focus:ring-2 focus:outline-none transition-all"
            placeholder="Street, Area, Landmark"
          />
        </div>

        {/* City & State */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              City <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.city}
              onChange={(e) => {
                setFormData({ ...formData, city: e.target.value });
                if (errors.city) setErrors({ ...errors, city: '' });
              }}
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.city
                  ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:ring-rose-500 focus:border-rose-500'
              } focus:ring-2 focus:outline-none transition-all`}
              placeholder="Enter city"
            />
            {errors.city && (
              <p className="mt-1 text-sm text-red-600">{errors.city}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              State <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.state}
              onChange={(e) => {
                setFormData({ ...formData, state: e.target.value });
                if (errors.state) setErrors({ ...errors, state: '' });
              }}
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.state
                  ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:ring-rose-500 focus:border-rose-500'
              } focus:ring-2 focus:outline-none transition-all`}
              placeholder="Enter state"
            />
            {errors.state && (
              <p className="mt-1 text-sm text-red-600">{errors.state}</p>
            )}
          </div>
        </div>

        {/* Pincode */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Pincode <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.pincode}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, '').slice(0, 6);
              setFormData({ ...formData, pincode: value });
              if (errors.pincode) setErrors({ ...errors, pincode: '' });
            }}
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.pincode
                ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                : 'border-gray-300 focus:ring-rose-500 focus:border-rose-500'
            } focus:ring-2 focus:outline-none transition-all`}
            placeholder="Enter 6-digit pincode"
            maxLength={6}
          />
          {errors.pincode && (
            <p className="mt-1 text-sm text-red-600">{errors.pincode}</p>
          )}
        </div>

        {/* Set as Default */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="isDefault"
            checked={formData.isDefault}
            onChange={(e) => setFormData({ ...formData, isDefault: e.target.checked })}
            className="w-4 h-4 text-rose-500 border-gray-300 rounded focus:ring-rose-500"
          />
          <label htmlFor="isDefault" className="text-sm text-gray-700">
            Set as default address
          </label>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <button
            type="submit"
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
                Save Address
              </>
            )}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
