'use client';

import { useState, useEffect, useRef } from 'react';
import ThemeSelector from '../../components/ThemeSelector';
import Link from 'next/link';
import { Search, User, ShoppingBag, Menu, X, Grid3x3, ChevronDown, ChevronRight, MapPin, Package, Wallet, LogOut, Check, Save, Plus, Edit, Trash2, Mail, Shield, Bell, Globe, CheckCircle, XCircle, Clock, Upload, FileText } from 'lucide-react';

const categories = [
  { id: 1, name: 'Skincare', href: '/category/skincare', items: [{ id: 1, name: 'Face Wash & Cleansers', href: '/category/skincare/cleansers' }, { id: 2, name: 'Moisturizers', href: '/category/skincare/moisturizers' }, { id: 3, name: 'Serums & Essences', href: '/category/skincare/serums' }, { id: 4, name: 'Sunscreen & SPF', href: '/category/skincare/sunscreen' }, { id: 5, name: 'Toners & Mists', href: '/category/skincare/toners' }, { id: 6, name: 'Face Masks', href: '/category/skincare/masks' }, { id: 7, name: 'Eye Care', href: '/category/skincare/eye-care' }, { id: 8, name: 'Anti-Aging', href: '/category/skincare/anti-aging' }] },
  { id: 2, name: 'Makeup', href: '/category/makeup', items: [{ id: 1, name: 'Foundation & Concealer', href: '/category/makeup/foundation' }, { id: 2, name: 'Lipstick & Lip Care', href: '/category/makeup/lips' }, { id: 3, name: 'Eyeshadow & Palettes', href: '/category/makeup/eyes' }, { id: 4, name: 'Mascara & Eyeliners', href: '/category/makeup/eye-makeup' }, { id: 5, name: 'Blush & Highlighters', href: '/category/makeup/cheeks' }, { id: 6, name: 'Makeup Brushes', href: '/category/makeup/brushes' }, { id: 7, name: 'Setting Sprays', href: '/category/makeup/setting' }, { id: 8, name: 'Makeup Removers', href: '/category/makeup/removers' }] },
  { id: 3, name: 'Bath & Body', href: '/category/bath-body', items: [{ id: 1, name: 'Body Wash & Soaps', href: '/category/bath-body/cleansers' }, { id: 2, name: 'Body Lotions & Creams', href: '/category/bath-body/moisturizers' }, { id: 3, name: 'Body Scrubs & Exfoliants', href: '/category/bath-body/scrubs' }, { id: 4, name: 'Body Oils', href: '/category/bath-body/oils' }, { id: 5, name: 'Hand & Foot Care', href: '/category/bath-body/hand-foot' }, { id: 6, name: 'Bath Bombs & Salts', href: '/category/bath-body/bath-accessories' }, { id: 7, name: 'Deodorants', href: '/category/bath-body/deodorants' }, { id: 8, name: 'Body Mists', href: '/category/bath-body/mists' }] },
  { id: 4, name: 'Haircare', href: '/category/haircare', items: [{ id: 1, name: 'Shampoos', href: '/category/haircare/shampoos' }, { id: 2, name: 'Conditioners', href: '/category/haircare/conditioners' }, { id: 3, name: 'Hair Oils & Serums', href: '/category/haircare/oils' }, { id: 4, name: 'Hair Masks & Treatments', href: '/category/haircare/masks' }, { id: 5, name: 'Hair Styling Products', href: '/category/haircare/styling' }, { id: 6, name: 'Hair Accessories', href: '/category/haircare/accessories' }, { id: 7, name: 'Scalp Care', href: '/category/haircare/scalp' }, { id: 8, name: 'Hair Color', href: '/category/haircare/color' }] },
  { id: 5, name: 'Fragrance', href: '/category/fragrance', items: [{ id: 1, name: 'Perfumes', href: '/category/fragrance/perfumes' }, { id: 2, name: 'Body Mists', href: '/category/fragrance/mists' }, { id: 3, name: 'Eau de Toilette', href: '/category/fragrance/edt' }, { id: 4, name: 'Eau de Parfum', href: '/category/fragrance/edp' }, { id: 5, name: 'Roll-On Perfumes', href: '/category/fragrance/roll-on' }, { id: 6, name: 'Fragrance Gift Sets', href: '/category/fragrance/gift-sets' }, { id: 7, name: 'Scented Candles', href: '/category/fragrance/candles' }, { id: 8, name: 'Room Sprays', href: '/category/fragrance/room-sprays' }] },
  { id: 6, name: 'Wellness', href: '/category/wellness', items: [{ id: 1, name: 'Vitamins & Supplements', href: '/category/wellness/vitamins' }, { id: 2, name: 'Hair & Skin Gummies', href: '/category/wellness/gummies' }, { id: 3, name: 'Wellness Kits', href: '/category/wellness/kits' }, { id: 4, name: 'Ayurvedic Products', href: '/category/wellness/ayurvedic' }, { id: 5, name: 'Herbal Teas', href: '/category/wellness/teas' }, { id: 6, name: 'Self-Care Essentials', href: '/category/wellness/self-care' }, { id: 7, name: 'Wellness Accessories', href: '/category/wellness/accessories' }, { id: 8, name: 'Gift Sets', href: '/category/wellness/gift-sets' }] },
  { id: 7, name: 'Gifting', href: '/category/gifting', items: [{ id: 1, name: 'Skincare Gift Sets', href: '/category/gifting/skincare-sets' }, { id: 2, name: 'Makeup Gift Sets', href: '/category/gifting/makeup-sets' }, { id: 3, name: 'Luxury Gift Boxes', href: '/category/gifting/luxury-boxes' }, { id: 4, name: 'Personalized Gifts', href: '/category/gifting/personalized' }, { id: 5, name: 'Holiday Collections', href: '/category/gifting/holiday' }, { id: 6, name: 'Gift Cards', href: '/category/gifting/gift-cards' }, { id: 7, name: 'Corporate Gifting', href: '/category/gifting/corporate' }, { id: 8, name: 'Wedding Favors', href: '/category/gifting/wedding' }] },
  { id: 8, name: 'Offers', href: '/offers', items: [{ id: 1, name: 'Flash Sales', href: '/offers/flash-sales' }, { id: 2, name: 'Buy 1 Get 1', href: '/offers/bogo' }, { id: 3, name: 'New Arrivals Sale', href: '/offers/new-arrivals' }, { id: 4, name: 'Clearance Sale', href: '/offers/clearance' }, { id: 5, name: 'Combo Offers', href: '/offers/combo' }, { id: 6, name: 'Seasonal Sales', href: '/offers/seasonal' }, { id: 7, name: 'Member Exclusive', href: '/offers/member-exclusive' }, { id: 8, name: 'Bundle Deals', href: '/offers/bundles' }] }
];

type Step = 'personal' | 'address' | 'complete';
interface Address { id?: string; name: string; phone: string; addressLine1: string; addressLine2?: string; city: string; state: string; pincode: string; isDefault: boolean; }

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [isFirstTime, setIsFirstTime] = useState(false);
  const [stepperStep, setStepperStep] = useState<Step>('personal');
  const [completedSteps, setCompletedSteps] = useState<Step[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', dateOfBirth: '', gender: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [emailVerification, setEmailVerification] = useState({ show: false, newEmail: '', code: '' });
  const [kycStatus, setKycStatus] = useState<'pending' | 'verified' | 'rejected' | 'not-submitted'>('not-submitted');
  const [isUploading, setIsUploading] = useState(false);
  const [documents, setDocuments] = useState({ aadhar: null as { name: string; uploadedAt: string } | null, pan: null as { name: string; uploadedAt: string } | null });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAffiliate, setIsAffiliate] = useState(false);
  const [categoriesMenuOpen, setCategoriesMenuOpen] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(80);
  const [activeCategory, setActiveCategory] = useState<number | null>(categories[0]?.id || null);
  const [mobileOpenCategory, setMobileOpenCategory] = useState<number | null>(null);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const menuRef = useRef<HTMLDivElement>(null);
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  const getCartCount = () => {
    if (typeof window === 'undefined') return 0;
    try {
      const cart = JSON.parse(localStorage.getItem('tb_cart') || '[]');
      return cart.reduce((sum: number, item: { quantity?: number }) => sum + (item.quantity || 1), 0);
    } catch { return 0; }
  };

  useEffect(() => {
    const userData = localStorage.getItem('user');
    const profileData = localStorage.getItem('profile');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      const parsedProfile = profileData ? JSON.parse(profileData) : null;
      const merged = { ...parsedUser, ...parsedProfile };
      setUser(merged);
      setFormData({ name: merged.name || '', email: merged.email || '', dateOfBirth: merged.dateOfBirth || '', gender: merged.gender || '' });
      setAddresses(merged.addresses || []);
      setKycStatus(merged.kycStatus || 'not-submitted');
      setDocuments({ aadhar: merged.kycDocuments?.aadhar || null, pan: merged.kycDocuments?.pan || null });
      if (!parsedProfile || !parsedProfile.name || !parsedProfile.addresses?.length) setIsFirstTime(true);
    }
    if (window.location.hash === '#addresses') {
      setTimeout(() => document.getElementById('addresses')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 300);
    }
  }, []);

  useEffect(() => { if (user?.name) { setCompletedSteps(['personal']); setStepperStep('address'); } }, [user?.name]);
  useEffect(() => { const h = () => setIsScrolled(window.scrollY > 20); window.addEventListener('scroll', h); return () => window.removeEventListener('scroll', h); }, []);
  useEffect(() => {
    const updateHeaderHeight = () => { const header = document.querySelector('header'); if (header) setHeaderHeight(header.offsetHeight); };
    updateHeaderHeight();
    window.addEventListener('resize', updateHeaderHeight);
    window.addEventListener('scroll', updateHeaderHeight);
    return () => { window.removeEventListener('resize', updateHeaderHeight); window.removeEventListener('scroll', updateHeaderHeight); };
  }, []);
  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    const userData = localStorage.getItem('user');
    const profileData = localStorage.getItem('profile');
    setIsLoggedIn(!!authToken);
    if (authToken && userData) {
      const parsedUser = JSON.parse(userData);
      const parsedProfile = profileData ? JSON.parse(profileData) : null;
      setUser((u: any) => u ? u : { ...parsedUser, ...parsedProfile });
      setIsAffiliate(!!localStorage.getItem('isAffiliate') || !!parsedProfile?.isAffiliate);
    }
  }, []);
  useEffect(() => { if (categoriesMenuOpen && categories.length > 0) setActiveCategory(categories[0].id); }, [categoriesMenuOpen]);
  useEffect(() => { setCartCount(getCartCount()); }, []);
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => { if (profileDropdownRef.current && !profileDropdownRef.current.contains(e.target as Node)) setProfileDropdownOpen(false); };
    if (profileDropdownOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [profileDropdownOpen]);

  useEffect(() => {
    if (kycStatus === 'pending') {
      const timer = setTimeout(() => {
        setKycStatus('verified');
        const updated = { ...user, kycStatus: 'verified' };
        setUser(updated);
        localStorage.setItem('profile', JSON.stringify(updated));
      }, process.env.NODE_ENV === 'development' ? 30000 : 300000);
      return () => clearTimeout(timer);
    }
  }, [kycStatus]);

  const handleLogout = () => { localStorage.removeItem('authToken'); localStorage.removeItem('user'); localStorage.removeItem('profile'); sessionStorage.clear(); window.location.href = '/'; };
  const activeCategoryData = categories.find(cat => cat.id === activeCategory);
  const displayName = user?.name || user?.email || `+91 ${user?.phone || ''}`;
  const displayInitials = user?.name ? user.name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2) : user?.email?.[0].toUpperCase() || 'U';

  const validatePersonal = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Please enter a valid email address';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSavePersonal = async () => {
    if (!validatePersonal()) return;
    setIsSaving(true);
    await new Promise(r => setTimeout(r, 1000));
    const updated = { 
      ...user, 
      name: formData.name || '', 
      email: formData.email || '', 
      dateOfBirth: formData.dateOfBirth || '', 
      gender: formData.gender || '' 
    };
    setUser(updated);
    localStorage.setItem('profile', JSON.stringify(updated));
    setIsSaving(false);
    setIsEditing(false);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  const handleFileUpload = async (type: 'aadhar' | 'pan', file: File) => {
    setIsUploading(true);
    await new Promise(r => setTimeout(r, 1500));
    const newDocuments = { ...documents, [type]: { name: file.name, uploadedAt: new Date().toISOString() } };
    setDocuments(newDocuments);
    const newStatus = newDocuments.aadhar && newDocuments.pan && kycStatus === 'not-submitted' ? 'pending' : kycStatus;
    if (newDocuments.aadhar && newDocuments.pan && kycStatus === 'not-submitted') setKycStatus('pending');
    const updated = { ...user, kycStatus: newStatus, kycDocuments: newDocuments };
    setUser(updated);
    localStorage.setItem('profile', JSON.stringify(updated));
    setIsUploading(false);
  };

  const getStatusIcon = () => { switch (kycStatus) { case 'verified': return <CheckCircle className="w-6 h-6 text-green-600" />; case 'rejected': return <XCircle className="w-6 h-6 text-red-600" />; case 'pending': return <Clock className="w-6 h-6 text-yellow-600" />; default: return <FileText className="w-6 h-6 text-gray-400" />; } };
  const getStatusText = () => { switch (kycStatus) { case 'verified': return 'Verified'; case 'rejected': return 'Rejected'; case 'pending': return 'Under Review'; default: return 'Not Submitted'; } };
  const getStatusColor = () => { switch (kycStatus) { case 'verified': return 'bg-green-50 border-green-200 text-green-700'; case 'rejected': return 'bg-red-50 border-red-200 text-red-700'; case 'pending': return 'bg-yellow-50 border-yellow-200 text-yellow-700'; default: return 'bg-gray-50 border-gray-200 text-gray-700'; } };

  const handlePersonalComplete = () => { setCompletedSteps(['personal']); setStepperStep('address'); };
  const handleAddressComplete = (address: Address) => {
    const newAddr = { ...address, id: `addr_${Date.now()}`, isDefault: true };
    const updated = { 
      ...user, 
      addresses: [newAddr] 
    };
    setUser(updated);
    setAddresses([newAddr]);
    localStorage.setItem('profile', JSON.stringify(updated));
    setCompletedSteps(['personal', 'address']);
    setStepperStep('complete');
    setTimeout(() => setIsFirstTime(false), 2000);
  };

  const handleAddressSave = (address: Address) => {
    let updatedAddrs: Address[];
    
    if (editingAddress) {
      updatedAddrs = addresses.map(a => a.id === editingAddress.id ? address : a);
    } else {
      const newAddr = { ...address, id: `addr_${Date.now()}` };
      updatedAddrs = [...addresses, newAddr];
    }
    
    const updated = { ...user, addresses: updatedAddrs };
    setUser(updated);
    localStorage.setItem('profile', JSON.stringify(updated));
    setShowAddressForm(false);
    setEditingAddress(null);
  };

  const handleAddressDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this address?')) return;
    setDeletingId(id);
    await new Promise(r => setTimeout(r, 500));
    const updatedAddrs = addresses.filter(a => a?.id !== id);
    setAddresses(updatedAddrs);
    const updated = { ...user, addresses: updatedAddrs };
    setUser(updated);
    localStorage.setItem('profile', JSON.stringify(updated));
    setDeletingId(null);
  };

  const handleSetDefault = (id: string | undefined) => {
    if (!id) return;
    const updatedAddrs = addresses.map(a => ({ ...a, isDefault: a.id === id }));
    setAddresses(updatedAddrs);
    const updated = { ...user, addresses: updatedAddrs };
    setUser(updated);
    localStorage.setItem('profile', JSON.stringify(updated));
  };

  if (!user) {
    return (
      <div className="min-h-screen gradient-bg flex flex-col">
        <ProfileHeaderInner isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} isScrolled={isScrolled} isLoggedIn={isLoggedIn} user={null} isAffiliate={false} profileDropdownOpen={false} setProfileDropdownOpen={() => {}} profileDropdownRef={profileDropdownRef} handleLogout={handleLogout} categoriesMenuOpen={false} setCategoriesMenuOpen={() => {}} headerHeight={80} activeCategory={null} setActiveCategory={() => {}} mobileOpenCategory={null} setMobileOpenCategory={() => {}} menuRef={menuRef} activeCategoryData={null} categories={categories} cartCount={cartCount} />
        <main className="flex-1 flex items-center justify-center pt-32 pb-12 px-4">
          <div className="text-center"><p className="text-gray-600">Please login to view your profile</p></div>
        </main>
        <ProfileFooter />
      </div>
    );
  }

  const headerProps = { isMenuOpen, setIsMenuOpen, isScrolled, isLoggedIn, user, isAffiliate, profileDropdownOpen, setProfileDropdownOpen, profileDropdownRef, handleLogout, categoriesMenuOpen, setCategoriesMenuOpen, headerHeight, activeCategory, setActiveCategory, mobileOpenCategory, setMobileOpenCategory, menuRef, activeCategoryData, categories, cartCount };

  return (
    <div className="min-h-screen gradient-bg flex flex-col">
      <ProfileHeaderInner {...headerProps} />
      <main className="flex-1 pt-24 pb-12 px-4 md:px-8">
        <div className="container mx-auto max-w-6xl">
          {isFirstTime ? (
            <div className="bg-white rounded-2xl shadow-sm border border-rose-100/80 p-6 md:p-8 mb-6">
              <div className="mb-8">
                <h2 className="text-2xl md:text-3xl font-playfair font-bold text-gray-800 mb-2">Complete Your Profile</h2>
                <p className="text-gray-600">Please complete these steps to continue with checkout</p>
              </div>
              <div className="flex items-center justify-between mb-8">
                {[{ id: 'personal', label: 'Personal Information' }, { id: 'address', label: 'Primary Address' }, { id: 'complete', label: 'Complete' }].map((step, index) => {
                  const isCompleted = completedSteps.includes(step.id as Step);
                  const isCurrent = stepperStep === step.id;
                  return (
                    <div key={step.id} className="flex items-center flex-1">
                      <div className="flex flex-col items-center flex-1">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${isCompleted ? 'bg-green-500 border-green-500 text-white' : isCurrent ? 'bg-rose-500 border-rose-500 text-white' : 'bg-white border-gray-300 text-gray-400'}`}>
                          {isCompleted ? <Check className="w-6 h-6" /> : <span className="font-semibold">{index + 1}</span>}
                        </div>
                        <p className={`mt-2 text-xs md:text-sm text-center font-medium ${isCurrent ? 'text-rose-600' : isCompleted ? 'text-green-600' : 'text-gray-400'}`}>{step.label}</p>
                      </div>
                      {index < 2 && <div className={`flex-1 h-0.5 mx-2 ${isCompleted ? 'bg-green-500' : 'bg-gray-300'}`} />}
                    </div>
                  );
                })}
              </div>
              <div className="mt-8">
                {stepperStep === 'personal' && (
                  <div>
                    <PersonalInfoInline user={user} formData={formData} setFormData={setFormData} isEditing={isEditing} setIsEditing={setIsEditing} isSaving={isSaving} success={success} errors={errors} setErrors={setErrors} emailVerification={emailVerification} setEmailVerification={setEmailVerification} handleSave={handleSavePersonal} validate={validatePersonal} />
                    <div className="mt-6 flex justify-end">
                      <button onClick={handlePersonalComplete} disabled={!user.name} className="px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-lg font-medium hover:from-rose-600 hover:to-pink-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg">Continue to Address</button>
                    </div>
                  </div>
                )}
                {stepperStep === 'address' && (
                  <AddressFormInline address={null} onSave={(addr) => handleAddressComplete(addr)} onCancel={() => {}} />
                )}
                {stepperStep === 'complete' && (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"><Check className="w-10 h-10 text-green-600" /></div>
                    <h3 className="text-2xl font-playfair font-bold text-gray-800 mb-2">Profile Complete!</h3>
                    <p className="text-gray-600">You can now proceed with checkout</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <>
              <div className="bg-white rounded-2xl shadow-sm border border-rose-100/80 p-6 md:p-8">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center flex-shrink-0"><User className="w-10 h-10 md:w-12 md:h-12 text-white" /></div>
                  <div className="flex-1">
                    <h1 className="text-2xl md:text-3xl font-playfair font-bold text-gray-800 mb-2">{user.name || 'User Profile'}</h1>
                    <p className="text-gray-600 mb-1"><span className="font-medium">Phone:</span> +91 {user.phone || 'N/A'}</p>
                    {user.email && <p className="text-gray-600"><span className="font-medium">Email:</span> {user.email}</p>}
                  </div>
                  {isFirstTime && <div className="bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-2"><p className="text-sm text-yellow-800 font-medium">Complete your profile to continue</p></div>}
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                <div className="lg:col-span-2 space-y-6">
                  <PersonalInfoInline user={user} formData={formData} setFormData={setFormData} isEditing={isEditing} setIsEditing={setIsEditing} isSaving={isSaving} success={success} errors={errors} setErrors={setErrors} emailVerification={emailVerification} setEmailVerification={setEmailVerification} handleSave={handleSavePersonal} validate={validatePersonal} />
                  <KYCSectionInline kycStatus={kycStatus} getStatusIcon={getStatusIcon} getStatusText={getStatusText} getStatusColor={getStatusColor} documents={documents} handleFileUpload={handleFileUpload} isUploading={isUploading} user={user} setUser={setUser} />
                  {showAddressForm ? <AddressFormInline address={editingAddress} onSave={handleAddressSave} onCancel={() => { setShowAddressForm(false); setEditingAddress(null); }} /> : (
                    <div id="addresses" className="bg-white rounded-2xl shadow-sm border border-rose-100/80 p-6 md:p-8">
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <h2 className="text-xl md:text-2xl font-playfair font-bold text-gray-800 mb-1">Saved Addresses</h2>
                          <p className="text-sm text-gray-600">{addresses.length} of 5 addresses saved</p>
                        </div>
                        <button onClick={() => { setEditingAddress(null); setShowAddressForm(true); }} disabled={addresses.length >= 5} className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-lg font-medium hover:from-rose-600 hover:to-pink-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"><Plus className="w-5 h-5" />Add Address</button>
                      </div>
                      {addresses.length === 0 ? (
                        <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
                          <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-600 mb-2">No addresses saved yet</p>
                          <p className="text-sm text-gray-500 mb-4">Add your first address to get started</p>
                          <button onClick={() => setShowAddressForm(true)} className="px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors">Add Address</button>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {addresses.map((addr) => (
                            <div key={addr.id} className={`border rounded-lg p-4 transition-all ${addr.isDefault ? 'border-rose-400 bg-rose-50' : 'border-gray-200 hover:border-gray-300'} ${deletingId === addr.id ? 'opacity-50' : ''}`}>
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-2"><MapPin className="w-5 h-5 text-rose-500" /><h3 className="font-semibold text-gray-800">{addr.name}</h3>{addr.isDefault && <span className="px-2 py-0.5 bg-rose-500 text-white text-xs font-medium rounded">Default</span>}</div>
                                  <p className="text-sm text-gray-600 mb-1">{addr.phone}</p>
                                  <p className="text-sm text-gray-700 mb-1">{addr.addressLine1}{addr.addressLine2 && `, ${addr.addressLine2}`}</p>
                                  <p className="text-sm text-gray-700">{addr.city}, {addr.state} - {addr.pincode}</p>
                                </div>
                                <div className="flex items-center gap-2 ml-4">
                                  {!addr.isDefault && addr.id && <button onClick={() => addr.id && handleSetDefault(addr.id)} className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Set as default"><Check className="w-4 h-4" /></button>}
                                  <button onClick={() => { setEditingAddress(addr); setShowAddressForm(true); }} className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit address"><Edit className="w-4 h-4" /></button>
                                  <button onClick={() => addr.id && handleAddressDelete(addr.id)} disabled={deletingId === addr.id} className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50" title="Delete address"><Trash2 className="w-4 h-4" /></button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <div className="lg:col-span-1">
                  <div className="space-y-6">
                    <div className="bg-white rounded-2xl shadow-sm border border-rose-100/80 p-6 md:p-8">
                      <div className="flex items-center gap-3 mb-6"><Shield className="w-6 h-6 text-rose-500" /><h2 className="text-xl md:text-2xl font-playfair font-bold text-gray-800">Security</h2></div>
                      <div className="space-y-4">
                        <div className="p-4 bg-gray-50 rounded-lg"><p className="text-sm text-gray-600 mb-2">Password</p><button className="text-sm text-rose-600 hover:text-rose-700 font-medium">Change Password</button></div>
                        <div className="p-4 bg-gray-50 rounded-lg"><p className="text-sm text-gray-600 mb-2">Two-Factor Authentication</p><button className="text-sm text-rose-600 hover:text-rose-700 font-medium">Enable 2FA</button></div>
                      </div>
                    </div>
                    <div className="bg-white rounded-2xl shadow-sm border border-rose-100/80 p-6 md:p-8">
                      <div className="flex items-center gap-3 mb-6"><Bell className="w-6 h-6 text-rose-500" /><h2 className="text-xl md:text-2xl font-playfair font-bold text-gray-800">Preferences</h2></div>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"><div><p className="text-sm font-medium text-gray-800">Email Notifications</p><p className="text-xs text-gray-600">Receive updates via email</p></div><label className="relative inline-flex items-center cursor-pointer"><input type="checkbox" className="sr-only peer" defaultChecked /><div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-rose-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-500"></div></label></div>
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"><div><p className="text-sm font-medium text-gray-800">SMS Notifications</p><p className="text-xs text-gray-600">Receive updates via SMS</p></div><label className="relative inline-flex items-center cursor-pointer"><input type="checkbox" className="sr-only peer" /><div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-rose-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-500"></div></label></div>
                      </div>
                    </div>
                    <div className="bg-white rounded-2xl shadow-sm border border-rose-100/80 p-6 md:p-8">
                      <div className="flex items-center gap-3 mb-6"><Globe className="w-6 h-6 text-rose-500" /><h2 className="text-xl md:text-2xl font-playfair font-bold text-gray-800">Language & Region</h2></div>
                      <div className="space-y-4">
                        <div><label className="block text-sm font-medium text-gray-700 mb-2">Language</label><select className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-rose-500 focus:border-rose-500 focus:ring-2 focus:outline-none transition-all"><option value="en">English</option><option value="hi">Hindi</option></select></div>
                        <div><label className="block text-sm font-medium text-gray-700 mb-2">Currency</label><select className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-rose-500 focus:border-rose-500 focus:ring-2 focus:outline-none transition-all"><option value="INR">Indian Rupee (₹)</option><option value="USD">US Dollar ($)</option></select></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
      <ProfileFooter />
    </div>
  );
}

function ProfileHeaderInner(props: any) {
  const { isMenuOpen, setIsMenuOpen, isScrolled, isLoggedIn, user, isAffiliate, profileDropdownOpen, setProfileDropdownOpen, profileDropdownRef, handleLogout, categoriesMenuOpen, setCategoriesMenuOpen, headerHeight, activeCategory, setActiveCategory, mobileOpenCategory, setMobileOpenCategory, menuRef, activeCategoryData, categories, cartCount = 0 } = props;
  const displayName = user?.name || user?.email || `+91 ${user?.phone || ''}`;
  const displayInitials = user?.name ? user.name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2) : user?.email?.[0].toUpperCase() || 'U';
  const headerClassName = isScrolled ? 'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b-2 bg-white/95 backdrop-blur-md shadow-sm py-3 border-rose-200' : 'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b-2 bg-white/80 py-5 border-rose-200';
  useEffect(() => { const h = (e: KeyboardEvent) => { if (e.key === 'Escape' && categoriesMenuOpen) setCategoriesMenuOpen(false); }; if (categoriesMenuOpen) document.addEventListener('keydown', h); return () => document.removeEventListener('keydown', h); }, [categoriesMenuOpen, setCategoriesMenuOpen]);
  return (
    <header className={headerClassName}>
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <img src="/images/logo/trueBeauty-Logo.png" alt="True Beauty Logo" width={100} height={30} className="object-contain" />
            <span className="text-xl font-playfair font-bold text-gray-800 hidden md:block">True Beauty</span>
          </div>
          <nav className="hidden lg:flex items-center space-x-8 flex-1 justify-center">
            <div className="relative"><input type="text" placeholder="Search products..." className="w-96 px-5 py-2.5 pl-11 rounded-full border border-gray-200 focus:border-pink-300 focus:ring-2 focus:ring-pink-100 transition-all bg-white/80 backdrop-blur-sm text-base" /><Search className="absolute left-4 top-3 text-gray-400 w-5 h-5" /></div>
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
                          <div className="flex-1 min-w-0"><p className="text-sm font-semibold text-gray-800 truncate">{user?.name || 'User'}</p><p className="text-xs text-gray-600 truncate">{user?.email || `+91 ${user?.phone || ''}`}</p></div>
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
            <div className="relative">
              <button type="button" onClick={() => setCategoriesMenuOpen(!categoriesMenuOpen)} className="px-4 py-2 text-gray-700 hover:text-pink-500 transition-colors font-medium flex items-center gap-2" aria-expanded={categoriesMenuOpen}><Grid3x3 className="w-4 h-4" /><span className="hidden md:inline">Categories</span></button>
              {categoriesMenuOpen && (
                <>
                  <div className="fixed inset-0 bg-black/20 z-40" style={{ top: `${headerHeight}px` }} onClick={() => setCategoriesMenuOpen(false)} aria-hidden="true" />
                  <div ref={menuRef} className="fixed left-0 right-0 bg-white border-b border-gray-200 shadow-lg z-50 overflow-hidden" style={{ top: `${headerHeight}px` }}>
                    <div className="container mx-auto px-4 md:px-8">
                      <div className="hidden lg:block py-6">
                        <div className="flex items-start gap-8">
                          <div className="w-64 flex-shrink-0 border-r border-gray-200 pr-6">
                            <div className="space-y-1">{categories.map((cat: { id: number; name: string; href: string }) => <button key={cat.id} type="button" onMouseEnter={() => setActiveCategory(cat.id)} onClick={() => setActiveCategory(cat.id)} className={`w-full text-left px-4 py-2.5 text-sm font-medium rounded-md transition-colors ${activeCategory === cat.id ? 'bg-rose-50 text-pink-600' : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'}`}>{cat.name}</button>)}</div>
                          </div>
                          {activeCategoryData && (
                            <div className="flex-1 py-2">
                              <div className="grid grid-cols-3 gap-8">{[0, 1, 2].map((colIndex) => { const itemsPerColumn = Math.ceil(activeCategoryData.items.length / 3); const startIndex = colIndex * itemsPerColumn; const endIndex = Math.min(startIndex + itemsPerColumn, activeCategoryData.items.length); return <div key={colIndex} className="space-y-1">{activeCategoryData.items.slice(startIndex, endIndex).map((item: { id: number; href: string; name: string }) => <Link key={item.id} href={item.href} onClick={() => setCategoriesMenuOpen(false)} className="block px-2 py-1.5 text-sm text-gray-600 hover:text-pink-600 hover:bg-rose-50 rounded-md transition-colors">{item.name}</Link>)}</div>; })}</div>
                              <div className="mt-6 pt-6 border-t border-gray-200"><Link href={activeCategoryData.href} onClick={() => setCategoriesMenuOpen(false)} className="inline-flex items-center text-sm font-medium text-pink-600 hover:text-pink-700 transition-colors">View All {activeCategoryData.name}<ChevronRight className="w-4 h-4 ml-1" /></Link></div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="lg:hidden py-4">
                        <div className="flex items-center justify-between mb-4"><h2 className="text-lg font-semibold text-gray-800">Categories</h2><button type="button" onClick={() => setCategoriesMenuOpen(false)} className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors" aria-label="Close menu"><X className="w-5 h-5" /></button></div>
                        <div className="space-y-1">
                          {categories.map((cat: typeof categories[number]) => (
                            <div key={cat.id} className="border-b border-gray-100 last:border-b-0">
                              <button type="button" onClick={() => setMobileOpenCategory(mobileOpenCategory === cat.id ? null : cat.id)} className="w-full flex items-center justify-between px-4 py-3 text-left text-sm font-medium text-gray-800 hover:bg-gray-50 rounded-md transition-colors" aria-expanded={mobileOpenCategory === cat.id}>
                                <span>{cat.name}</span>
                                <ChevronRight className={`w-4 h-4 text-gray-400 transition-transform ${mobileOpenCategory === cat.id ? 'transform rotate-90' : ''}`} />
                              </button>
                              {mobileOpenCategory === cat.id && (
                                <div className="px-4 pb-4 space-y-1">
                                  {cat.items.map((item: typeof cat.items[number]) => (
                                    <Link key={item.id} href={item.href} onClick={() => setCategoriesMenuOpen(false)} className="block px-4 py-2 text-sm text-gray-600 hover:text-pink-600 hover:bg-rose-50 rounded-md transition-colors">{item.name}</Link>
                                  ))}
                                  <Link href={cat.href} onClick={() => setCategoriesMenuOpen(false)} className="block mt-3 px-4 py-2 text-sm font-medium text-pink-600 hover:text-pink-700 hover:bg-pink-50 rounded-md transition-colors border border-pink-200">View All {cat.name}</Link>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  </>
                )}
              </div>
              <ThemeSelector />
              <Link href="/affiliate" className="px-4 py-2 text-gray-700 hover:text-pink-500 transition-colors font-medium">Affiliate</Link>
              <Link href="/cart" className="relative flex items-center"><ShoppingBag className="w-6 h-6 text-gray-700 hover:text-pink-500 cursor-pointer transition-colors" /><span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center min-w-[20px]">{cartCount}</span></Link>
            </div>
            <button className="lg:hidden p-2 text-gray-700" onClick={() => setIsMenuOpen(!isMenuOpen)}>{isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}</button>
          </div>
          {isMenuOpen && (
            <div className="lg:hidden mt-4 pb-4 space-y-4">
              <div className="relative">
                <input type="text" placeholder="Search products..." className="w-full px-4 py-2.5 pl-11 rounded-full border border-gray-200 focus:border-pink-300 bg-white/80 backdrop-blur-sm text-base" />
                <Search className="absolute left-4 top-3 text-gray-400 w-5 h-5" />
              </div>
              <div className="px-4">
                <button type="button" onClick={() => { setCategoriesMenuOpen(true); setIsMenuOpen(false); }} className="px-4 py-2 text-gray-700 hover:text-pink-500 transition-colors font-medium flex items-center gap-2">
                  <Grid3x3 className="w-4 h-4" /><span className="hidden md:inline">Categories</span>
                </button>
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
  );
}

function ProfileFooter() {
  return (
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
  );
}

function PersonalInfoInline(props: any) {
  const { user, formData, setFormData, isEditing, setIsEditing, isSaving, success, errors, setErrors, emailVerification, setEmailVerification, handleSave } = props;
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-rose-100/80 p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <div><h2 className="text-xl md:text-2xl font-playfair font-bold text-gray-800 mb-1">Personal Information</h2><p className="text-sm text-gray-600">Manage your personal details</p></div>
        {!isEditing && <button onClick={() => setIsEditing(true)} className="px-4 py-2 text-sm font-medium text-rose-600 hover:text-rose-700 transition-colors">Edit</button>}
      </div>
      {success && <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2"><Check className="w-5 h-5 text-green-600" /><p className="text-sm text-green-700">Profile updated successfully!</p></div>}
      <div className="space-y-4">
        <div><label className="block text-sm font-medium text-gray-700 mb-2">Full Name <span className="text-red-500">*</span></label><input type="text" value={formData.name} onChange={(e) => { setFormData({ ...formData, name: e.target.value }); if (errors.name) setErrors({ ...errors, name: '' }); }} disabled={!isEditing} className={`w-full px-4 py-3 rounded-lg border ${errors.name ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-rose-500 focus:border-rose-500'} focus:ring-2 focus:outline-none transition-all disabled:bg-gray-50 disabled:cursor-not-allowed`} placeholder="Enter your full name" />{errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}</div>
        <div><label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label><input type="tel" value={`+91 ${user?.phone || ''}`} disabled className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 cursor-not-allowed" /><p className="mt-1 text-xs text-gray-500">Phone number cannot be changed</p></div>
        <div><label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label><div className="flex gap-2"><div className="flex-1 relative"><Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" /><input type="email" value={formData.email} onChange={(e) => { setFormData({ ...formData, email: e.target.value }); if (errors.email) setErrors({ ...errors, email: '' }); }} disabled={!isEditing || emailVerification.show} className={`w-full pl-10 pr-4 py-3 rounded-lg border ${errors.email ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-rose-500 focus:border-rose-500'} focus:ring-2 focus:outline-none transition-all disabled:bg-gray-50 disabled:cursor-not-allowed`} placeholder="Enter your email address" /></div>{isEditing && formData.email && !emailVerification.show && <button type="button" onClick={() => setEmailVerification({ show: true, newEmail: formData.email, code: '' })} className="px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium">Verify</button>}</div>{errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}{emailVerification.show && <div className="mt-3 p-4 bg-blue-50 border border-blue-200 rounded-lg"><p className="text-sm text-blue-800 mb-3">Verification code sent to {emailVerification.newEmail}</p><div className="flex gap-2"><input type="text" value={emailVerification.code} onChange={(e) => setEmailVerification({ ...emailVerification, code: e.target.value })} className="flex-1 px-3 py-2 rounded-lg border border-blue-300 focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="Enter verification code" maxLength={6} /><button type="button" onClick={async () => { await new Promise(r => setTimeout(r, 1000)); setEmailVerification({ show: false, newEmail: '', code: '' }); }} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm">Verify</button><button type="button" onClick={() => setEmailVerification({ show: false, newEmail: '', code: '' })} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"><span className="text-sm">✕</span></button></div></div>}</div>
        <div><label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label><input type="date" value={formData.dateOfBirth} onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })} disabled={!isEditing} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-rose-500 focus:border-rose-500 focus:ring-2 focus:outline-none transition-all disabled:bg-gray-50 disabled:cursor-not-allowed" /></div>
        <div><label className="block text-sm font-medium text-gray-700 mb-2">Gender</label><select value={formData.gender} onChange={(e) => setFormData({ ...formData, gender: e.target.value })} disabled={!isEditing} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-rose-500 focus:border-rose-500 focus:ring-2 focus:outline-none transition-all disabled:bg-gray-50 disabled:cursor-not-allowed"><option value="">Select gender</option><option value="male">Male</option><option value="female">Female</option><option value="other">Other</option><option value="prefer-not-to-say">Prefer not to say</option></select></div>
        {isEditing && <div className="flex gap-3 pt-4"><button type="button" onClick={handleSave} disabled={isSaving} className="flex-1 bg-gradient-to-r from-rose-500 to-pink-500 text-white py-3 rounded-lg font-medium hover:from-rose-600 hover:to-pink-600 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:transform-none flex items-center justify-center gap-2">{isSaving ? <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />Saving...</> : <><Save className="w-5 h-5" />Save Changes</>}</button><button type="button" onClick={() => { setIsEditing(false); setFormData({ name: user?.name || '', email: user?.email || '', dateOfBirth: user?.dateOfBirth || '', gender: user?.gender || '' }); setErrors({}); setEmailVerification({ show: false, newEmail: '', code: '' }); }} className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors">Cancel</button></div>}
      </div>
    </div>
  );
}
function KYCSectionInline(props: any) {
  const { kycStatus, getStatusIcon, getStatusText, getStatusColor, documents, handleFileUpload, isUploading, user, setUser } = props;
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-rose-100/80 p-6 md:p-8">
      <div className="flex items-center justify-between mb-6"><div><h2 className="text-xl md:text-2xl font-playfair font-bold text-gray-800 mb-1">KYC & Verification</h2><p className="text-sm text-gray-600">Required for withdrawals, not for product orders</p></div><div className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${getStatusColor()}`}>{getStatusIcon()}<span className="font-medium text-sm">{getStatusText()}</span></div></div>
      {kycStatus === 'rejected' && <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg"><p className="text-sm text-red-800 font-medium mb-1">Verification Rejected</p><p className="text-sm text-red-600">Your documents were rejected. Please upload clear, valid documents and try again.</p></div>}
      {kycStatus === 'verified' && <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg"><p className="text-sm text-green-800 font-medium">✓ Your KYC is verified. You can now withdraw funds.</p></div>}
      <div className="space-y-4">
        <div><label className="block text-sm font-medium text-gray-700 mb-2">Aadhar Card <span className="text-red-500">*</span></label><div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-rose-400 transition-colors">{documents.aadhar ? <div className="flex items-center justify-between"><div className="flex items-center gap-3"><FileText className="w-8 h-8 text-green-600" /><div className="text-left"><p className="text-sm font-medium text-gray-800">{documents.aadhar.name}</p><p className="text-xs text-gray-500">Uploaded {new Date(documents.aadhar.uploadedAt).toLocaleDateString()}</p></div></div><CheckCircle className="w-5 h-5 text-green-600" /></div> : <label className="cursor-pointer"><input type="file" accept="image/*,.pdf" onChange={(e) => { const file = e.target.files?.[0]; if (file) handleFileUpload('aadhar', file); }} disabled={isUploading} className="hidden" /><div className="flex flex-col items-center gap-2"><Upload className="w-8 h-8 text-gray-400" /><p className="text-sm text-gray-600">Click to upload Aadhar Card</p><p className="text-xs text-gray-500">JPG, PNG or PDF (Max 5MB)</p></div></label>}</div></div>
        <div><label className="block text-sm font-medium text-gray-700 mb-2">PAN Card <span className="text-red-500">*</span></label><div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-rose-400 transition-colors">{documents.pan ? <div className="flex items-center justify-between"><div className="flex items-center gap-3"><FileText className="w-8 h-8 text-green-600" /><div className="text-left"><p className="text-sm font-medium text-gray-800">{documents.pan.name}</p><p className="text-xs text-gray-500">Uploaded {new Date(documents.pan.uploadedAt).toLocaleDateString()}</p></div></div><CheckCircle className="w-5 h-5 text-green-600" /></div> : <label className="cursor-pointer"><input type="file" accept="image/*,.pdf" onChange={(e) => { const file = e.target.files?.[0]; if (file) handleFileUpload('pan', file); }} disabled={isUploading} className="hidden" /><div className="flex flex-col items-center gap-2"><Upload className="w-8 h-8 text-gray-400" /><p className="text-sm text-gray-600">Click to upload PAN Card</p><p className="text-xs text-gray-500">JPG, PNG or PDF (Max 5MB)</p></div></label>}</div></div>
        {isUploading && <div className="text-center py-4"><div className="inline-block w-6 h-6 border-2 border-rose-500 border-t-transparent rounded-full animate-spin" /><p className="text-sm text-gray-600 mt-2">Uploading document...</p></div>}
        <div className="pt-4 border-t border-gray-200"><p className="text-xs text-gray-500">* KYC verification is required to enable withdrawal functionality. You can still place orders without KYC verification.</p></div>
      </div>
    </div>
  );
}

function AddressFormInline({ address, onSave, onCancel }: { address: Address | null; onSave: (a: Address) => void; onCancel: () => void }) {
  const [formData, setFormData] = useState<Address>({ name: address?.name || '', phone: address?.phone || '', addressLine1: address?.addressLine1 || '', addressLine2: address?.addressLine2 || '', city: address?.city || '', state: address?.state || '', pincode: address?.pincode || '', isDefault: address?.isDefault || false });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);
  const validate = () => { const newErrors: Record<string, string> = {}; if (!formData.name.trim()) newErrors.name = 'Name is required'; if (!formData.phone.trim()) newErrors.phone = 'Phone number is required'; else if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Please enter a valid 10-digit phone number'; if (!formData.addressLine1.trim()) newErrors.addressLine1 = 'Address line 1 is required'; if (!formData.city.trim()) newErrors.city = 'City is required'; if (!formData.state.trim()) newErrors.state = 'State is required'; if (!formData.pincode.trim()) newErrors.pincode = 'Pincode is required'; else if (!/^\d{6}$/.test(formData.pincode)) newErrors.pincode = 'Please enter a valid 6-digit pincode'; setErrors(newErrors); return Object.keys(newErrors).length === 0; };
  const handleSubmit = async (e: React.FormEvent) => { e.preventDefault(); if (!validate()) return; setIsSaving(true); await new Promise(r => setTimeout(r, 800)); setIsSaving(false); onSave(formData); };
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-rose-100/80 p-6 md:p-8">
      <div className="flex items-center justify-between mb-6"><h2 className="text-xl md:text-2xl font-playfair font-bold text-gray-800">{address ? 'Edit Address' : 'Add New Address'}</h2><button onClick={onCancel} className="p-2 text-gray-400 hover:text-gray-600 transition-colors"><span className="text-lg">✕</span></button></div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div><label className="block text-sm font-medium text-gray-700 mb-2">Full Name <span className="text-red-500">*</span></label><input type="text" value={formData.name} onChange={(e) => { setFormData({ ...formData, name: e.target.value }); if (errors.name) setErrors({ ...errors, name: '' }); }} className={`w-full px-4 py-3 rounded-lg border ${errors.name ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-rose-500 focus:border-rose-500'} focus:ring-2 focus:outline-none transition-all`} placeholder="Enter full name" />{errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}</div>
        <div><label className="block text-sm font-medium text-gray-700 mb-2">Phone Number <span className="text-red-500">*</span></label><input type="tel" value={formData.phone} onChange={(e) => { const value = e.target.value.replace(/\D/g, '').slice(0, 10); setFormData({ ...formData, phone: value }); if (errors.phone) setErrors({ ...errors, phone: '' }); }} className={`w-full px-4 py-3 rounded-lg border ${errors.phone ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-rose-500 focus:border-rose-500'} focus:ring-2 focus:outline-none transition-all`} placeholder="Enter 10-digit phone number" maxLength={10} />{errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}</div>
        <div><label className="block text-sm font-medium text-gray-700 mb-2">Address Line 1 <span className="text-red-500">*</span></label><input type="text" value={formData.addressLine1} onChange={(e) => { setFormData({ ...formData, addressLine1: e.target.value }); if (errors.addressLine1) setErrors({ ...errors, addressLine1: '' }); }} className={`w-full px-4 py-3 rounded-lg border ${errors.addressLine1 ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-rose-500 focus:border-rose-500'} focus:ring-2 focus:outline-none transition-all`} placeholder="House/Flat No., Building Name" />{errors.addressLine1 && <p className="mt-1 text-sm text-red-600">{errors.addressLine1}</p>}</div>
        <div><label className="block text-sm font-medium text-gray-700 mb-2">Address Line 2 (Optional)</label><input type="text" value={formData.addressLine2} onChange={(e) => setFormData({ ...formData, addressLine2: e.target.value })} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-rose-500 focus:border-rose-500 focus:ring-2 focus:outline-none transition-all" placeholder="Street, Area, Landmark" /></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4"><div><label className="block text-sm font-medium text-gray-700 mb-2">City <span className="text-red-500">*</span></label><input type="text" value={formData.city} onChange={(e) => { setFormData({ ...formData, city: e.target.value }); if (errors.city) setErrors({ ...errors, city: '' }); }} className={`w-full px-4 py-3 rounded-lg border ${errors.city ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-rose-500 focus:border-rose-500'} focus:ring-2 focus:outline-none transition-all`} placeholder="Enter city" />{errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}</div><div><label className="block text-sm font-medium text-gray-700 mb-2">State <span className="text-red-500">*</span></label><input type="text" value={formData.state} onChange={(e) => { setFormData({ ...formData, state: e.target.value }); if (errors.state) setErrors({ ...errors, state: '' }); }} className={`w-full px-4 py-3 rounded-lg border ${errors.state ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-rose-500 focus:border-rose-500'} focus:ring-2 focus:outline-none transition-all`} placeholder="Enter state" />{errors.state && <p className="mt-1 text-sm text-red-600">{errors.state}</p>}</div></div>
        <div><label className="block text-sm font-medium text-gray-700 mb-2">Pincode <span className="text-red-500">*</span></label><input type="text" value={formData.pincode} onChange={(e) => { const value = e.target.value.replace(/\D/g, '').slice(0, 6); setFormData({ ...formData, pincode: value }); if (errors.pincode) setErrors({ ...errors, pincode: '' }); }} className={`w-full px-4 py-3 rounded-lg border ${errors.pincode ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-rose-500 focus:border-rose-500'} focus:ring-2 focus:outline-none transition-all`} placeholder="Enter 6-digit pincode" maxLength={6} />{errors.pincode && <p className="mt-1 text-sm text-red-600">{errors.pincode}</p>}</div>
        <div className="flex items-center gap-2"><input type="checkbox" id="isDefault" checked={formData.isDefault} onChange={(e) => setFormData({ ...formData, isDefault: e.target.checked })} className="w-4 h-4 text-rose-500 border-gray-300 rounded focus:ring-rose-500" /><label htmlFor="isDefault" className="text-sm text-gray-700">Set as default address</label></div>
        <div className="flex gap-3 pt-4"><button type="submit" disabled={isSaving} className="flex-1 bg-gradient-to-r from-rose-500 to-pink-500 text-white py-3 rounded-lg font-medium hover:from-rose-600 hover:to-pink-600 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:transform-none flex items-center justify-center gap-2">{isSaving ? <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />Saving...</> : <><Save className="w-5 h-5" />Save Address</>}</button><button type="button" onClick={onCancel} className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors">Cancel</button></div>
      </form>
    </div>
  );
}
