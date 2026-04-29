import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, ArrowRight } from 'lucide-react';

export default function Checkout() {
  const { items, removeFromCart, updateQuantity, totalPrice } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold text-stone-800 mb-4">Your Cart is Empty</h2>
        <p className="text-stone-600 mb-8">Looks like you haven't added anything to your cart yet.</p>
        <Link to="/" className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-stone-800 mb-8">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-6">
            <h2 className="text-xl font-semibold mb-6">Order Items</h2>
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 border-b border-stone-100 pb-6 last:border-0 last:pb-0">
                  <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-xl" />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-stone-800">{item.name}</h3>
                    <p className="text-green-600 font-bold">₹{item.price}</p>
                    <div className="flex items-center mt-2 space-x-4">
                      <div className="flex items-center border border-stone-200 rounded-lg">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-3 py-1 text-stone-600 hover:bg-stone-50 rounded-l-lg"
                        >-</button>
                        <span className="px-3 py-1 text-stone-800 font-medium">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-1 text-stone-600 hover:bg-stone-50 rounded-r-lg"
                        >+</button>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-600 p-2"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <div className="text-right font-bold text-stone-800">
                    ₹{item.price * item.quantity}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-6 sticky top-24">
            <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
            <div className="space-y-4 text-stone-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium text-stone-800">₹{totalPrice}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-medium text-stone-800">₹50</span>
              </div>
              <div className="border-t border-stone-100 pt-4 flex justify-between text-lg font-bold text-stone-800">
                <span>Total</span>
                <span className="text-green-600">₹{totalPrice + 50}</span>
              </div>
            </div>
            <button 
              onClick={() => navigate('/payment')}
              className="w-full mt-8 flex justify-center items-center py-3 px-4 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 transition-colors"
            >
              Proceed to Payment <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
