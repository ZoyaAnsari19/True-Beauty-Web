'use client';

import { Heart, ShoppingBag, User } from 'lucide-react';

export default function FeaturesSection() {
  const features = [
    {
      icon: Heart,
      title: "Premium Quality",
      description: "Luxury formulations with natural ingredients for exceptional results",
      gradient: "from-pink-400 to-rose-400",
      delay: "0s"
    },
    {
      icon: ShoppingBag,
      title: "Fast Shipping",
      description: "Free shipping on orders over $50 with express delivery options",
      gradient: "from-purple-400 to-pink-400",
      delay: "0.2s"
    },
    {
      icon: User,
      title: "Expert Support",
      description: "Personalized beauty consultations and 24/7 customer care",
      gradient: "from-rose-400 to-purple-400",
      delay: "0.4s"
    }
  ];

  return (
    <section className="py-16 bg-white/50 border-b border-rose-200/60">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div 
                key={index}
                className="text-center p-6 rounded-2xl bg-white/70 backdrop-blur-sm pastel-shadow animate-fade-in-up"
                style={{ animationDelay: feature.delay }}
              >
                <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${feature.gradient} rounded-full flex items-center justify-center`}>
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
