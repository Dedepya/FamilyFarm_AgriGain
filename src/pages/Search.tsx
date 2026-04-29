import { useSearchParams } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { getAllProducts } from '../data/products';
import { useCart } from '../context/CartContext';

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const { addToCart } = useCart();
  
  const allProducts = getAllProducts();
  const filteredProducts = allProducts.filter(product => 
    product.name.toLowerCase().includes(query.toLowerCase()) ||
    product.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-stone-800">Search Results</h1>
        <p className="text-stone-500 mt-2">
          {filteredProducts.length} {filteredProducts.length === 1 ? 'result' : 'results'} found for "{query}"
        </p>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <div key={product.id} className="bg-white rounded-xl shadow-sm border border-stone-100 overflow-hidden hover:shadow-md transition-shadow">
              <div className="h-48 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-5">
                <div className="text-xs text-stone-400 uppercase tracking-wider mb-1">{product.category}</div>
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
          <p className="text-stone-500 text-lg">No products found matching your search.</p>
          <p className="text-stone-400 mt-2">Try checking your spelling or using more general terms.</p>
        </div>
      )}
    </div>
  );
}
