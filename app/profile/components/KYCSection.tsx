'use client';

import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Clock, Upload, FileText } from 'lucide-react';

interface KYCSectionProps {
  user: any;
  setUser: (user: any) => void;
}

type KYCStatus = 'pending' | 'verified' | 'rejected' | 'not-submitted';

export default function KYCSection({ user, setUser }: KYCSectionProps) {
  const [kycStatus, setKycStatus] = useState<KYCStatus>(
    user.kycStatus || 'not-submitted'
  );
  const [isUploading, setIsUploading] = useState(false);
  const [documents, setDocuments] = useState({
    aadhar: user.kycDocuments?.aadhar || null,
    pan: user.kycDocuments?.pan || null
  });

  const getStatusIcon = () => {
    switch (kycStatus) {
      case 'verified':
        return <CheckCircle className="w-6 h-6 text-green-600" />;
      case 'rejected':
        return <XCircle className="w-6 h-6 text-red-600" />;
      case 'pending':
        return <Clock className="w-6 h-6 text-yellow-600" />;
      default:
        return <FileText className="w-6 h-6 text-gray-400" />;
    }
  };

  const getStatusText = () => {
    switch (kycStatus) {
      case 'verified':
        return 'Verified';
      case 'rejected':
        return 'Rejected';
      case 'pending':
        return 'Under Review';
      default:
        return 'Not Submitted';
    }
  };

  const getStatusColor = () => {
    switch (kycStatus) {
      case 'verified':
        return 'bg-green-50 border-green-200 text-green-700';
      case 'rejected':
        return 'bg-red-50 border-red-200 text-red-700';
      case 'pending':
        return 'bg-yellow-50 border-yellow-200 text-yellow-700';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-700';
    }
  };

  const handleFileUpload = async (type: 'aadhar' | 'pan', file: File) => {
    setIsUploading(true);
    
    // Simulate file upload
    await new Promise(resolve => setTimeout(resolve, 1500));

    const newDocuments = {
      ...documents,
      [type]: {
        name: file.name,
        uploadedAt: new Date().toISOString()
      }
    };

    setDocuments(newDocuments);

    // Update status to pending if both documents uploaded
    if (newDocuments.aadhar && newDocuments.pan && kycStatus === 'not-submitted') {
      setKycStatus('pending');
      
      const updatedUser = {
        ...user,
        kycStatus: 'pending',
        kycDocuments: newDocuments
      };
      setUser(updatedUser);
      localStorage.setItem('profile', JSON.stringify(updatedUser));
    } else {
      const updatedUser = {
        ...user,
        kycDocuments: newDocuments
      };
      setUser(updatedUser);
      localStorage.setItem('profile', JSON.stringify(updatedUser));
    }

    setIsUploading(false);
  };

  // Auto-verification for development (30 seconds after pending status)
  useEffect(() => {
    if (kycStatus === 'pending') {
      // Auto-verify after delay (30 seconds for development, 5 minutes for production-like testing)
      const verificationDelay = process.env.NODE_ENV === 'development' 
        ? 30000 // 30 seconds for development
        : 5 * 60 * 1000; // 5 minutes for production-like testing

      const timer = setTimeout(() => {
        setKycStatus('verified');
        const updatedUser = {
          ...user,
          kycStatus: 'verified'
        };
        setUser(updatedUser);
        localStorage.setItem('profile', JSON.stringify(updatedUser));
      }, verificationDelay);

      return () => clearTimeout(timer);
    }
  }, [kycStatus, user, setUser]);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-rose-100/80 p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl md:text-2xl font-playfair font-bold text-gray-800 mb-1">
            KYC & Verification
          </h2>
          <p className="text-sm text-gray-600">
            Required for withdrawals, not for product orders
          </p>
        </div>
        <div className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${getStatusColor()}`}>
          {getStatusIcon()}
          <span className="font-medium text-sm">{getStatusText()}</span>
        </div>
      </div>

      {kycStatus === 'rejected' && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-800 font-medium mb-1">Verification Rejected</p>
          <p className="text-sm text-red-600">
            Your documents were rejected. Please upload clear, valid documents and try again.
          </p>
        </div>
      )}

      {kycStatus === 'verified' && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-green-800 font-medium">
            ✓ Your KYC is verified. You can now withdraw funds.
          </p>
        </div>
      )}

      <div className="space-y-4">
        {/* Aadhar Card */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Aadhar Card <span className="text-red-500">*</span>
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-rose-400 transition-colors">
            {documents.aadhar ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="w-8 h-8 text-green-600" />
                  <div className="text-left">
                    <p className="text-sm font-medium text-gray-800">{documents.aadhar.name}</p>
                    <p className="text-xs text-gray-500">
                      Uploaded {new Date(documents.aadhar.uploadedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
            ) : (
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileUpload('aadhar', file);
                  }}
                  disabled={isUploading}
                  className="hidden"
                />
                <div className="flex flex-col items-center gap-2">
                  <Upload className="w-8 h-8 text-gray-400" />
                  <p className="text-sm text-gray-600">
                    Click to upload Aadhar Card
                  </p>
                  <p className="text-xs text-gray-500">JPG, PNG or PDF (Max 5MB)</p>
                </div>
              </label>
            )}
          </div>
        </div>

        {/* PAN Card */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            PAN Card <span className="text-red-500">*</span>
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-rose-400 transition-colors">
            {documents.pan ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="w-8 h-8 text-green-600" />
                  <div className="text-left">
                    <p className="text-sm font-medium text-gray-800">{documents.pan.name}</p>
                    <p className="text-xs text-gray-500">
                      Uploaded {new Date(documents.pan.uploadedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
            ) : (
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileUpload('pan', file);
                  }}
                  disabled={isUploading}
                  className="hidden"
                />
                <div className="flex flex-col items-center gap-2">
                  <Upload className="w-8 h-8 text-gray-400" />
                  <p className="text-sm text-gray-600">
                    Click to upload PAN Card
                  </p>
                  <p className="text-xs text-gray-500">JPG, PNG or PDF (Max 5MB)</p>
                </div>
              </label>
            )}
          </div>
        </div>

        {isUploading && (
          <div className="text-center py-4">
            <div className="inline-block w-6 h-6 border-2 border-rose-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-gray-600 mt-2">Uploading document...</p>
          </div>
        )}

        <div className="pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            * KYC verification is required to enable withdrawal functionality. 
            You can still place orders without KYC verification.
          </p>
        </div>
      </div>
    </div>
  );
}
