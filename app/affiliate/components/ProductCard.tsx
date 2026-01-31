'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  commission: number;
  affiliateLink: string;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(product.affiliateLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col h-full">
      {/* Image Container - Cover Style */}
      <div className="relative h-40 sm:h-44 shrink-0 overflow-hidden bg-rose-50/60">
        <img
          src={product.image}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out"
        />
      </div>
      
      {/* Content */}
      <div className="flex flex-col flex-1 p-4">
        <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">{product.name}</h3>
        <div className="flex items-center justify-between mb-3">
          <span className="text-lg font-bold text-gray-800">₹{product.price.toFixed(2)}</span>
          <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
            {product.commission}% commission
          </span>
        </div>
        <div className="space-y-2 mt-auto">
          <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
            <input
              type="text"
              value={product.affiliateLink}
              readOnly
              className="flex-1 text-xs text-gray-600 bg-transparent border-none outline-none truncate"
            />
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 px-3 py-1.5 bg-blue-500 text-white text-xs font-medium rounded-lg hover:bg-blue-600 transition-colors duration-200 flex-shrink-0"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  Copy
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
