'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '../../../../components/Header';
import Footer from '../../../../components/Footer';
import { ArrowLeft, Loader, Store, Building2, MapPin, CreditCard, FileText, Upload, Check } from 'lucide-react';

const BUSINESS_TYPES = [
  { value: 'product', label: 'Product' },
  { value: 'service', label: 'Service' },
  { value: 'both', label: 'Both' },
] as const;

type BusinessType = (typeof BUSINESS_TYPES)[number]['value'];

interface FormData {
  businessName: string;
  businessType: BusinessType;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;
  bankName: string;
  accountNumber: string;
  ifsc: string;
  accountHolderName: string;
  panGst: string;
}

export default function SellerApplyPage() {
  const router = useRouter();
  const [user, setUser] = useState<{ phone?: string; id?: string } | null>(null);
  const [formData, setFormData] = useState<FormData>({
    businessName: '',
    businessType: 'product',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
    bankName: '',
    accountNumber: '',
    ifsc: '',
    accountHolderName: '',
    panGst: '',
  });
  const [documents, setDocuments] = useState<{ name: string; uploadedAt: string }[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const authToken = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
    const userData = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
    const profileData = typeof window !== 'undefined' ? localStorage.getItem('profile') : null;
    if (!authToken || !userData) {
      router.replace('/login');
      return;
    }
    const parsed = JSON.parse(userData);
    const profile = profileData ? JSON.parse(profileData) : {};
    setUser({ ...parsed, ...profile });
  }, [router]);

  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (!formData.businessName.trim()) e.businessName = 'Business name is required';
    if (!formData.addressLine1.trim()) e.addressLine1 = 'Address line 1 is required';
    if (!formData.city.trim()) e.city = 'City is required';
    if (!formData.state.trim()) e.state = 'State is required';
    if (!formData.pincode.trim()) e.pincode = 'Pincode is required';
    else if (!/^\d{6}$/.test(formData.pincode)) e.pincode = 'Enter a valid 6-digit pincode';
    if (!formData.bankName.trim()) e.bankName = 'Bank name is required';
    if (!formData.accountNumber.trim()) e.accountNumber = 'Account number is required';
    if (!formData.ifsc.trim()) e.ifsc = 'IFSC is required';
    if (!formData.accountHolderName.trim()) e.accountHolderName = 'Account holder name is required';
    if (!formData.panGst.trim()) e.panGst = 'PAN / GST is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setDocuments((prev) => [...prev, { name: file.name, uploadedAt: new Date().toISOString() }]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || !user?.phone) return;
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1000));
    const application = {
      ...formData,
      documents,
      submittedAt: new Date().toISOString(),
      status: 'pending',
    };
    localStorage.setItem('seller_application', JSON.stringify(application));
    const profileJson = localStorage.getItem('profile');
    const profile = profileJson ? JSON.parse(profileJson) : {};
    const updatedProfile = { ...profile, sellerStatus: 'pending', sellerApplication: application };
    localStorage.setItem('profile', JSON.stringify(updatedProfile));
    const userPhone = user.phone;
    const userKey = `user_${userPhone}`;
    const existingUser = localStorage.getItem(userKey);
    if (existingUser) {
      localStorage.setItem(userKey, JSON.stringify({ ...JSON.parse(existingUser), sellerStatus: 'pending' }));
    }
    setIsSubmitting(false);
    setSubmitted(true);
  };

  if (user === null) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-rose-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen gradient-bg flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center px-4 py-16">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-rose-100/80 p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-playfair font-bold text-gray-800 mb-2">Application Submitted</h1>
            <p className="text-gray-600 mb-6">Your seller application is under review. We will notify you once it is approved.</p>
            <Link href="/profile" className="inline-block bg-gradient-to-r from-[#FF3C8C] to-[#FF0066] text-white px-6 py-2.5 rounded-lg font-medium hover:opacity-95">
              Back to Profile
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-bg flex flex-col">
      <Header />
      <main className="flex-1 pt-20 sm:pt-24 pb-12 px-4">
        <div className="max-w-2xl mx-auto">
          <Link href="/profile" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Profile
          </Link>
          <div className="bg-white rounded-2xl shadow-sm border border-rose-100/80 p-6 md:p-8">
            <div className="flex items-center gap-3 mb-8">
              <Store className="w-8 h-8 text-rose-500" />
              <div>
                <h1 className="text-2xl md:text-3xl font-playfair font-bold text-gray-800">Seller Application</h1>
                <p className="text-gray-600 text-sm">Apply to sell on True Beauty</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <section>
                <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-rose-500" /> Business Details
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Business Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.businessName}
                      onChange={(e) => {
                        setFormData({ ...formData, businessName: e.target.value });
                        if (errors.businessName) setErrors({ ...errors, businessName: '' });
                      }}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.businessName ? 'border-red-300' : 'border-gray-300'
                      } focus:ring-2 focus:ring-rose-500 focus:border-rose-500 focus:outline-none`}
                      placeholder="Your business or brand name"
                    />
                    {errors.businessName && <p className="mt-1 text-sm text-red-600">{errors.businessName}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Business Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.businessType}
                      onChange={(e) => setFormData({ ...formData, businessType: e.target.value as BusinessType })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-rose-500 focus:outline-none"
                    >
                      {BUSINESS_TYPES.map((t) => (
                        <option key={t.value} value={t.value}>
                          {t.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-rose-500" /> Business Address
                </h2>
                <div className="space-y-4">
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
                        errors.addressLine1 ? 'border-red-300' : 'border-gray-300'
                      } focus:ring-2 focus:ring-rose-500 focus:outline-none`}
                      placeholder="Building, street"
                    />
                    {errors.addressLine1 && <p className="mt-1 text-sm text-red-600">{errors.addressLine1}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address Line 2 (Optional)</label>
                    <input
                      type="text"
                      value={formData.addressLine2}
                      onChange={(e) => setFormData({ ...formData, addressLine2: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:outline-none"
                      placeholder="Area, landmark"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                          errors.city ? 'border-red-300' : 'border-gray-300'
                        } focus:ring-2 focus:ring-rose-500 focus:outline-none`}
                        placeholder="City"
                      />
                      {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
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
                          errors.state ? 'border-red-300' : 'border-gray-300'
                        } focus:ring-2 focus:ring-rose-500 focus:outline-none`}
                        placeholder="State"
                      />
                      {errors.state && <p className="mt-1 text-sm text-red-600">{errors.state}</p>}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pincode <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.pincode}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          pincode: e.target.value.replace(/\D/g, '').slice(0, 6),
                        });
                        if (errors.pincode) setErrors({ ...errors, pincode: '' });
                      }}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.pincode ? 'border-red-300' : 'border-gray-300'
                      } focus:ring-2 focus:ring-rose-500 focus:outline-none`}
                      placeholder="6-digit pincode"
                      maxLength={6}
                    />
                    {errors.pincode && <p className="mt-1 text-sm text-red-600">{errors.pincode}</p>}
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-rose-500" /> Bank Details
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bank Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.bankName}
                      onChange={(e) => {
                        setFormData({ ...formData, bankName: e.target.value });
                        if (errors.bankName) setErrors({ ...errors, bankName: '' });
                      }}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.bankName ? 'border-red-300' : 'border-gray-300'
                      } focus:ring-2 focus:ring-rose-500 focus:outline-none`}
                      placeholder="Name of bank"
                    />
                    {errors.bankName && <p className="mt-1 text-sm text-red-600">{errors.bankName}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Account Holder Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.accountHolderName}
                      onChange={(e) => {
                        setFormData({ ...formData, accountHolderName: e.target.value });
                        if (errors.accountHolderName) setErrors({ ...errors, accountHolderName: '' });
                      }}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.accountHolderName ? 'border-red-300' : 'border-gray-300'
                      } focus:ring-2 focus:ring-rose-500 focus:outline-none`}
                      placeholder="As per bank account"
                    />
                    {errors.accountHolderName && (
                      <p className="mt-1 text-sm text-red-600">{errors.accountHolderName}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Account Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.accountNumber}
                      onChange={(e) => {
                        setFormData({ ...formData, accountNumber: e.target.value });
                        if (errors.accountNumber) setErrors({ ...errors, accountNumber: '' });
                      }}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.accountNumber ? 'border-red-300' : 'border-gray-300'
                      } focus:ring-2 focus:ring-rose-500 focus:outline-none`}
                      placeholder="Bank account number"
                    />
                    {errors.accountNumber && <p className="mt-1 text-sm text-red-600">{errors.accountNumber}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      IFSC Code <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.ifsc}
                      onChange={(e) => {
                        setFormData({ ...formData, ifsc: e.target.value.toUpperCase() });
                        if (errors.ifsc) setErrors({ ...errors, ifsc: '' });
                      }}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.ifsc ? 'border-red-300' : 'border-gray-300'
                      } focus:ring-2 focus:ring-rose-500 focus:outline-none`}
                      placeholder="e.g. SBIN0001234"
                    />
                    {errors.ifsc && <p className="mt-1 text-sm text-red-600">{errors.ifsc}</p>}
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-rose-500" /> PAN / GST
                </h2>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    PAN or GST Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.panGst}
                    onChange={(e) => {
                      setFormData({ ...formData, panGst: e.target.value });
                      if (errors.panGst) setErrors({ ...errors, panGst: '' });
                    }}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.panGst ? 'border-red-300' : 'border-gray-300'
                    } focus:ring-2 focus:ring-rose-500 focus:outline-none`}
                    placeholder="PAN or GSTIN"
                  />
                  {errors.panGst && <p className="mt-1 text-sm text-red-600">{errors.panGst}</p>}
                </div>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Upload className="w-5 h-5 text-rose-500" /> Upload Documents
                </h2>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-rose-400 transition-colors">
                  <input
                    type="file"
                    accept=".pdf,image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="seller-docs"
                  />
                  <label htmlFor="seller-docs" className="cursor-pointer flex flex-col items-center gap-2">
                    <Upload className="w-10 h-10 text-gray-400" />
                    <p className="text-sm text-gray-600">Click to upload documents (GST, registration, etc.)</p>
                    <p className="text-xs text-gray-500">PDF or images</p>
                  </label>
                  {documents.length > 0 && (
                    <ul className="mt-4 text-left text-sm text-gray-700 space-y-1">
                      {documents.map((d, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-rose-500" /> {d.name}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </section>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-[#FF3C8C] to-[#FF0066] text-white py-3 rounded-lg font-medium hover:opacity-95 transition-all disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" /> Submitting...
                  </>
                ) : (
                  'Submit Application'
                )}
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

