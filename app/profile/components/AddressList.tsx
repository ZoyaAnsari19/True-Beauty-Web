'use client';

import { useState } from 'react';
import { Plus, MapPin, Edit, Trash2, Check, X } from 'lucide-react';
import AddressForm from './AddressForm';

interface Address {
  id: string;
  name: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

interface AddressListProps {
  user: any;
  setUser: (user: any) => void;
}

export default function AddressList({ user, setUser }: AddressListProps) {
  const [addresses, setAddresses] = useState<Address[]>(
    user.addresses || []
  );
  const [showForm, setShowForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleAdd = () => {
    if (addresses.length >= 5) {
      alert('Maximum 5 addresses allowed');
      return;
    }
    setEditingAddress(null);
    setShowForm(true);
  };

  const handleEdit = (address: Address) => {
    setEditingAddress(address);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this address?')) return;

    setDeletingId(id);
    await new Promise(resolve => setTimeout(resolve, 500));

    const updatedAddresses = addresses.filter(addr => addr.id !== id);
    setAddresses(updatedAddresses);

    const updatedUser = {
      ...user,
      addresses: updatedAddresses
    };
    setUser(updatedUser);
    localStorage.setItem('profile', JSON.stringify(updatedUser));

    setDeletingId(null);
  };

  const handleSetDefault = async (id: string) => {
    const updatedAddresses = addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    }));

    setAddresses(updatedAddresses);

    const updatedUser = {
      ...user,
      addresses: updatedAddresses
    };
    setUser(updatedUser);
    localStorage.setItem('profile', JSON.stringify(updatedUser));
  };

  const handleSave = (address: Address) => {
    if (editingAddress) {
      // Update existing
      const updatedAddresses = addresses.map(addr =>
        addr.id === editingAddress.id ? address : addr
      );
      setAddresses(updatedAddresses);
    } else {
      // Add new
      const newAddress = { ...address, id: `addr_${Date.now()}` };
      setAddresses([...addresses, newAddress]);
    }

    const updatedUser = {
      ...user,
      addresses: editingAddress
        ? addresses.map(addr => (addr.id === editingAddress.id ? address : addr))
        : [...addresses, { ...address, id: `addr_${Date.now()}` }]
    };
    setUser(updatedUser);
    localStorage.setItem('profile', JSON.stringify(updatedUser));

    setShowForm(false);
    setEditingAddress(null);
  };

  if (showForm) {
    return (
      <AddressForm
        address={editingAddress}
        onSave={handleSave}
        onCancel={() => {
          setShowForm(false);
          setEditingAddress(null);
        }}
      />
    );
  }

  return (
    <div id="addresses" className="bg-white rounded-2xl shadow-sm border border-rose-100/80 p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl md:text-2xl font-playfair font-bold text-gray-800 mb-1">
            Saved Addresses
          </h2>
          <p className="text-sm text-gray-600">
            {addresses.length} of 5 addresses saved
          </p>
        </div>
        <button
          onClick={handleAdd}
          disabled={addresses.length >= 5}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-lg font-medium hover:from-rose-600 hover:to-pink-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
        >
          <Plus className="w-5 h-5" />
          Add Address
        </button>
      </div>

      {addresses.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
          <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-2">No addresses saved yet</p>
          <p className="text-sm text-gray-500 mb-4">Add your first address to get started</p>
          <button
            onClick={handleAdd}
            className="px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors"
          >
            Add Address
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {addresses.map((address) => (
            <div
              key={address.id}
              className={`border rounded-lg p-4 transition-all ${
                address.isDefault
                  ? 'border-rose-400 bg-rose-50'
                  : 'border-gray-200 hover:border-gray-300'
              } ${deletingId === address.id ? 'opacity-50' : ''}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-5 h-5 text-rose-500" />
                    <h3 className="font-semibold text-gray-800">{address.name}</h3>
                    {address.isDefault && (
                      <span className="px-2 py-0.5 bg-rose-500 text-white text-xs font-medium rounded">
                        Default
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{address.phone}</p>
                  <p className="text-sm text-gray-700 mb-1">
                    {address.addressLine1}
                    {address.addressLine2 && `, ${address.addressLine2}`}
                  </p>
                  <p className="text-sm text-gray-700">
                    {address.city}, {address.state} - {address.pincode}
                  </p>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  {!address.isDefault && (
                    <button
                      onClick={() => handleSetDefault(address.id)}
                      className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      title="Set as default"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    onClick={() => handleEdit(address)}
                    className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Edit address"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(address.id)}
                    disabled={deletingId === address.id}
                    className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                    title="Delete address"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
