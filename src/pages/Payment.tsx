import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CreditCard, CheckCircle, ArrowLeft } from 'lucide-react';

export default function Payment() {
  const { totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      clearCart();
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <div className="max-w-md mx-auto bg-white rounded-3xl shadow-lg border border-stone-100 p-12">
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-stone-800 mb-4">Payment Successful!</h2>
          <p className="text-stone-600 mb-8">Your order has been placed successfully. You will receive a confirmation email shortly.</p>
          <button 
            onClick={() => navigate('/')}
            className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <button 
          onClick={() => navigate('/checkout')}
          className="flex items-center text-stone-600 hover:text-green-600 mb-8 font-medium"
        >
          <ArrowLeft className="w-5 h-5 mr-2" /> Back to Checkout
        </button>
        
        <h1 className="text-3xl font-bold text-stone-800 mb-8">Payment Details</h1>
        
        <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-8">
          <div className="mb-8 p-6 bg-stone-50 rounded-xl flex justify-between items-center">
            <span className="text-lg font-medium text-stone-700">Total Amount to Pay</span>
            <span className="text-2xl font-bold text-green-600">₹{totalPrice + 50}</span>
          </div>

          <form onSubmit={handlePayment} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">Cardholder Name</label>
              <input
                type="text"
                required
                className="block w-full px-4 py-3 border border-stone-200 rounded-xl focus:ring-green-500 focus:border-green-500 bg-stone-50"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">Card Number</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <CreditCard className="h-5 w-5 text-stone-400" />
                </div>
                <input
                  type="text"
                  required
                  pattern="\d{16}"
                  maxLength={16}
                  className="block w-full pl-10 pr-3 py-3 border border-stone-200 rounded-xl focus:ring-green-500 focus:border-green-500 bg-stone-50"
                  placeholder="0000 0000 0000 0000"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Expiry Date</label>
                <input
                  type="text"
                  required
                  placeholder="MM/YY"
                  pattern="\d{2}/\d{2}"
                  maxLength={5}
                  className="block w-full px-4 py-3 border border-stone-200 rounded-xl focus:ring-green-500 focus:border-green-500 bg-stone-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">CVV</label>
                <input
                  type="text"
                  required
                  pattern="\d{3,4}"
                  maxLength={4}
                  className="block w-full px-4 py-3 border border-stone-200 rounded-xl focus:ring-green-500 focus:border-green-500 bg-stone-50"
                  placeholder="123"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className={`w-full flex justify-center items-center py-4 px-4 border border-transparent rounded-xl shadow-sm text-lg font-bold text-white transition-colors ${
                isProcessing ? 'bg-stone-400 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-600'
              }`}
            >
              {isProcessing ? 'Processing...' : `Pay ₹${totalPrice + 50}`}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
