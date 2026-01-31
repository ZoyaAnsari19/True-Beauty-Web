'use client';

import ProductCard from './ProductCard';

const dummyProducts = [
  {
    id: 1,
    name: 'True Beauty Day Cream',
    image: '/images/products/dayCream.png',
    price: 2074.17, // ₹ (24.99 * 83)
    commission: 15,
    affiliateLink: 'https://truebeauty.com/affiliate/day-cream?ref=ABC123'
  },
  {
    id: 2,
    name: 'True Beauty Night Cream',
    image: '/images/products/nightCream.png',
    price: 2406.17, // ₹ (28.99 * 83)
    commission: 15,
    affiliateLink: 'https://truebeauty.com/affiliate/night-cream?ref=ABC123'
  },
  {
    id: 3,
    name: 'True Beauty Serum',
    image: '/images/products/serum.png',
    price: 2904.17, // ₹ (34.99 * 83)
    commission: 20,
    affiliateLink: 'https://truebeauty.com/affiliate/serum?ref=ABC123'
  },
  {
    id: 4,
    name: 'True Beauty Sunscreen',
    image: '/images/products/sunscreen.png',
    price: 1908.17, // ₹ (22.99 * 83)
    commission: 12,
    affiliateLink: 'https://truebeauty.com/affiliate/sunscreen?ref=ABC123'
  },
  {
    id: 5,
    name: 'True Beauty Face Wash',
    image: '/images/products/faceWash.png',
    price: 1576.17, // ₹ (18.99 * 83)
    commission: 10,
    affiliateLink: 'https://truebeauty.com/affiliate/face-wash?ref=ABC123'
  },
  {
    id: 6,
    name: 'True Beauty Moisturizer',
    image: '/images/products/moisturizer.png',
    price: 2240.17, // ₹ (26.99 * 83)
    commission: 15,
    affiliateLink: 'https://truebeauty.com/affiliate/moisturizer?ref=ABC123'
  }
];

export default function ProductList() {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-playfair font-bold text-gray-800 mb-2">
          Listed Products
        </h2>
        <p className="text-gray-600">Copy your affiliate links and start earning</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {dummyProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
