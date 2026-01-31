'use client';

import { DollarSign, Package, Users, Wallet } from 'lucide-react';

interface SummaryCardsProps {
  onCardClick: (section: 'products' | 'users' | 'withdraw' | null) => void;
}

export default function SummaryCards({ onCardClick }: SummaryCardsProps) {
  const cards = [
    {
      id: 'products',
      title: 'Listed Products',
      value: '24',
      icon: Package,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      id: 'users',
      title: 'Affiliated Users',
      value: '156',
      icon: Users,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50'
    },
    {
      id: 'earnings',
      title: 'Total Earnings',
      value: '₹10,33,350',
      icon: DollarSign,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      id: 'withdraw',
      title: 'Withdraw',
      value: '₹2,65,600',
      icon: Wallet,
      color: 'from-rose-500 to-rose-600',
      bgColor: 'bg-rose-50'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {cards.map((card) => {
        const IconComponent = card.icon;
        const isClickable = card.id !== 'earnings';
        
        return (
          <button
            key={card.id}
            onClick={() => {
              if (isClickable) {
                onCardClick(card.id as 'products' | 'users' | 'withdraw');
              }
            }}
            disabled={!isClickable}
            className={`bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6 text-left ${
              isClickable ? 'cursor-pointer hover:-translate-y-1' : 'cursor-default'
            } ${!isClickable ? 'opacity-90' : ''}`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${card.color} flex items-center justify-center`}>
                <IconComponent className="w-6 h-6 text-white" />
              </div>
              {isClickable && (
                <span className="text-xs text-gray-500 font-medium">Click to view</span>
              )}
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">{card.title}</h3>
            <p className="text-2xl md:text-3xl font-bold text-gray-800">{card.value}</p>
          </button>
        );
      })}
    </div>
  );
}
