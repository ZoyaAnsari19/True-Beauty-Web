'use client';

import { useState, useEffect } from 'react';
import { Check, Circle } from 'lucide-react';
import PersonalInfoForm from './PersonalInfoForm';
import AddressForm from './AddressForm';

interface ProfileStepperProps {
  user: any;
  setUser: (user: any) => void;
  onComplete: () => void;
}

type Step = 'personal' | 'address' | 'complete';

export default function ProfileStepper({ user, setUser, onComplete }: ProfileStepperProps) {
  const [currentStep, setCurrentStep] = useState<Step>('personal');
  const [completedSteps, setCompletedSteps] = useState<Step[]>([]);

  useEffect(() => {
    // Check if personal info is complete
    if (user.name) {
      setCompletedSteps(['personal']);
      setCurrentStep('address');
    }
  }, [user]);

  const handlePersonalComplete = () => {
    setCompletedSteps(['personal']);
    setCurrentStep('address');
  };

  const handleAddressComplete = () => {
    setCompletedSteps(['personal', 'address']);
    setCurrentStep('complete');
    setTimeout(() => {
      onComplete();
    }, 2000);
  };

  const steps = [
    { id: 'personal', label: 'Personal Information' },
    { id: 'address', label: 'Primary Address' },
    { id: 'complete', label: 'Complete' }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-rose-100/80 p-6 md:p-8 mb-6">
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-playfair font-bold text-gray-800 mb-2">
          Complete Your Profile
        </h2>
        <p className="text-gray-600">
          Please complete these steps to continue with checkout
        </p>
      </div>

      {/* Stepper */}
      <div className="flex items-center justify-between mb-8">
        {steps.map((step, index) => {
          const isCompleted = completedSteps.includes(step.id as Step);
          const isCurrent = currentStep === step.id;
          const isPast = index < steps.findIndex(s => s.id === currentStep);

          return (
            <div key={step.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${
                    isCompleted
                      ? 'bg-green-500 border-green-500 text-white'
                      : isCurrent
                      ? 'bg-rose-500 border-rose-500 text-white'
                      : 'bg-white border-gray-300 text-gray-400'
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-6 h-6" />
                  ) : (
                    <span className="font-semibold">{index + 1}</span>
                  )}
                </div>
                <p
                  className={`mt-2 text-xs md:text-sm text-center font-medium ${
                    isCurrent ? 'text-rose-600' : isCompleted ? 'text-green-600' : 'text-gray-400'
                  }`}
                >
                  {step.label}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-2 ${
                    isPast || isCompleted ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Step Content */}
      <div className="mt-8">
        {currentStep === 'personal' && (
          <div>
            <PersonalInfoForm 
              user={user} 
              setUser={(updatedUser) => {
                setUser(updatedUser);
                // Auto-advance if name is filled
                if (updatedUser.name && !completedSteps.includes('personal')) {
                  setTimeout(() => {
                    handlePersonalComplete();
                  }, 500);
                }
              }} 
            />
            <div className="mt-6 flex justify-end">
              <button
                onClick={handlePersonalComplete}
                disabled={!user.name}
                className="px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-lg font-medium hover:from-rose-600 hover:to-pink-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
              >
                Continue to Address
              </button>
            </div>
          </div>
        )}

        {currentStep === 'address' && (
          <div>
            <AddressForm
              address={null}
              onSave={(address) => {
                const updatedUser = {
                  ...user,
                  addresses: [{ ...address, id: `addr_${Date.now()}`, isDefault: true }]
                };
                setUser(updatedUser);
                localStorage.setItem('profile', JSON.stringify(updatedUser));
                handleAddressComplete();
              }}
              onCancel={() => {}}
            />
          </div>
        )}

        {currentStep === 'complete' && (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-2xl font-playfair font-bold text-gray-800 mb-2">
              Profile Complete!
            </h3>
            <p className="text-gray-600">
              You can now proceed with checkout
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
