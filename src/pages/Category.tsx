import { useParams } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { PRODUCTS, CATEGORY_NAMES } from '../data/products';
import { useCart } from '../context/CartContext';

export default function Category() {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  
  const categoryId = id as keyof typeof PRODUCTS;
  
  // If no category ID, show all categories
  if (!id) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-stone-800">All Products</h1>
          <p className="text-stone-500 mt-2">Browse our complete selection of high-quality agricultural products.</p>
        </div>

        <div className="space-y-12">
          {Object.entries(PRODUCTS).map(([catKey, products]) => (
            <div key={catKey}>
              <h2 className="text-2xl font-bold text-stone-800 mb-6">{CATEGORY_NAMES[catKey as keyof typeof CATEGORY_NAMES]}</h2>
              {products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {products.map(product => (
                    <div key={product.id} className="bg-white rounded-xl shadow-sm border border-stone-100 overflow-hidden hover:shadow-md transition-shadow">
                      <div className="h-48 overflow-hidden">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-5">
                        <h3 className="text-lg font-semibold text-stone-800 mb-2">{product.name}</h3>
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-xl font-bold text-green-700">₹{product.price} <span className="text-sm text-stone-500 font-normal">/ {product.unit}</span></span>
                        </div>
                        <button 
                          onClick={() => addToCart({
                            id: product.id,
                            name: product.name,
                            price: product.price,
                            image: product.image
                          })}
                          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-medium transition-colors flex items-center justify-center"
                        >
                          <ShoppingCart className="w-4 h-4 mr-2" /> Add to Cart
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 bg-white rounded-xl border border-stone-100">
                  <p className="text-stone-500">No products in this category.</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Show specific category when ID is provided
  const products = PRODUCTS[categoryId] || [];
  const categoryName = CATEGORY_NAMES[categoryId] || 'Products';

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-stone-800">{categoryName}</h1>
        <p className="text-stone-500 mt-2">Browse our selection of high-quality {categoryName.toLowerCase()}.</p>
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <div key={product.id} className="bg-white rounded-xl shadow-sm border border-stone-100 overflow-hidden hover:shadow-md transition-shadow">
              <div className="h-48 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-stone-800 mb-2">{product.name}</h3>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xl font-bold text-green-700">₹{product.price} <span className="text-sm text-stone-500 font-normal">/ {product.unit}</span></span>
                </div>
                <button 
                  onClick={() => addToCart({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image
                  })}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-medium transition-colors flex items-center justify-center"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" /> Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-xl border border-stone-100">
          <p className="text-stone-500 text-lg">No products found in this category.</p>
        </div>
      )}
    </div>
  );
}
