export const PRODUCTS = {
  vegetables: [
    { id: 1, name: 'Fresh Tomatoes', price: 40, unit: 'kg', image: 'https://loremflickr.com/500/400/tomato,vegetable', category: 'vegetables' },
    { id: 2, name: 'Organic Potatoes', price: 30, unit: 'kg', image: 'https://loremflickr.com/500/400/potato,vegetable', category: 'vegetables' },
    { id: 3, name: 'Green Cabbage', price: 25, unit: 'kg', image: 'https://loremflickr.com/500/400/cabbage,vegetable', category: 'vegetables' },
    { id: 4, name: 'Red Onions', price: 50, unit: 'kg', image: 'https://loremflickr.com/500/400/onion,vegetable', category: 'vegetables' },
  ],
  rice: [
    { id: 5, name: 'Basmati Rice', price: 120, unit: 'kg', image: 'https://loremflickr.com/500/400/basmati,rice', category: 'rice' },
    { id: 6, name: 'Sona Masoori', price: 60, unit: 'kg', image: 'https://loremflickr.com/500/400/rice,uncooked', category: 'rice' },
  ],
  pulses: [
    { id: 7, name: 'Toor Dal', price: 110, unit: 'kg', image: 'https://loremflickr.com/500/400/lentils,yellow', category: 'pulses' },
    { id: 8, name: 'Moong Dal', price: 105, unit: 'kg', image: 'https://loremflickr.com/500/400/lentils,green', category: 'pulses' },
  ],
  cashcrops: [
    { id: 9, name: 'Cotton', price: 6000, unit: 'quintal', image: 'https://loremflickr.com/500/400/cotton,plant', category: 'cashcrops' },
    { id: 10, name: 'Sugarcane', price: 300, unit: 'quintal', image: 'https://loremflickr.com/500/400/sugarcane,farm', category: 'cashcrops' },
  ],
  wheat: [
    { id: 11, name: 'Premium Wheat', price: 45, unit: 'kg', image: 'https://loremflickr.com/500/400/wheat,grain', category: 'wheat' },
  ],
  maize: [
    { id: 12, name: 'Yellow Maize', price: 25, unit: 'kg', image: 'https://loremflickr.com/500/400/corn,maize', category: 'maize' },
  ]
};

export const CATEGORY_NAMES = {
  vegetables: 'Veggies & Fruits',
  rice: 'Rice',
  pulses: 'Pulses',
  cashcrops: 'Cash Crops',
  wheat: 'Wheat',
  maize: 'Maize'
};

export const getAllProducts = () => {
  return Object.values(PRODUCTS).flat();
};
