import { Link, useNavigate } from 'react-router-dom';
import { Phone, ShieldCheck, ArrowRight, User, AlertCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getFirebaseAuth } from '../firebase';
import { RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult } from 'firebase/auth';

declare global {
  interface Window {
    recaptchaVerifier: any;
  }
}

export default function Login() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+1');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);

  useEffect(() => {
    // Cleanup recaptcha on unmount
    return () => {
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
      }
    };
  }, []);

  const setupRecaptcha = () => {
    try {
      const auth = getFirebaseAuth();
      if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
          size: 'invisible',
          callback: () => {
            // reCAPTCHA solved
          }
        });
      }
    } catch (err: any) {
      console.error("Firebase setup error:", err);
      throw new Error(err.message || "Failed to initialize Firebase Auth");
    }
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setError('');
    
    try {
      setupRecaptcha();
      const auth = getFirebaseAuth();
      const phoneNumber = `${countryCode}${phone}`;
      const appVerifier = window.recaptchaVerifier;
      
      const confirmation = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      setConfirmationResult(confirmation);
      setStep('otp');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to send OTP. Please check your Firebase configuration and try again.');
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setError('');
    
    try {
      if (!confirmationResult) throw new Error('No OTP confirmation found.');
      const result = await confirmationResult.confirm(otp);
      
      // User signed in successfully.
      // In a real app, you would save the user's name to Firestore here
      console.log("Logged in user:", result.user);
      navigate('/');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Invalid OTP. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-stone-50 min-h-screen py-20 flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto bg-white rounded-3xl shadow-lg border border-stone-100 overflow-hidden">
          <div className="bg-green-800 p-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-2">Welcome</h2>
            <p className="text-green-100">Login or create an account with your name and mobile number</p>
          </div>
          
          <div className="p-8">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start">
                <AlertCircle className="h-5 w-5 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <div id="recaptcha-container"></div>

            {step === 'phone' ? (
              <form onSubmit={handleSendOtp} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Full Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-stone-400" />
                    </div>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="block w-full pl-10 pr-3 py-3 border border-stone-200 rounded-xl focus:ring-green-500 focus:border-green-500 bg-stone-50"
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Mobile Number</label>
                  <div className="flex rounded-xl shadow-sm border border-stone-200 overflow-hidden focus-within:ring-2 focus-within:ring-green-500 focus-within:border-green-500 bg-stone-50">
                    <div className="flex items-center pl-3 pr-2 bg-stone-100 border-r border-stone-200">
                      <Phone className="h-5 w-5 text-stone-400 mr-2" />
                      <select
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                        className="bg-transparent text-stone-700 focus:outline-none font-medium appearance-none pr-4 cursor-pointer"
                        style={{ backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23131313%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right center', backgroundSize: '8px auto' }}
                      >
                        <option value="+1">+1 (US)</option>
                        <option value="+91">+91 (IN)</option>
                        <option value="+44">+44 (UK)</option>
                        <option value="+61">+61 (AU)</option>
                        <option value="+86">+86 (CN)</option>
                      </select>
                    </div>
                    <input
                      type="tel"
                      required
                      pattern="[0-9]{10}"
                      maxLength={10}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                      className="block w-full pl-3 pr-3 py-3 focus:outline-none bg-transparent"
                      placeholder="10-digit mobile number"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing || phone.length !== 10 || name.trim().length === 0}
                  className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white transition-colors ${
                    isProcessing || phone.length !== 10 || name.trim().length === 0 ? 'bg-stone-400 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500'
                  }`}
                >
                  {isProcessing ? 'Sending OTP...' : (
                    <>Get OTP <ArrowRight className="ml-2 h-4 w-4" /></>
                  )}
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-6">
                <div className="text-center mb-6">
                  <p className="text-sm text-stone-600">OTP sent to {countryCode} {phone}</p>
                  <button 
                    type="button" 
                    onClick={() => setStep('phone')}
                    className="text-sm text-green-600 font-semibold hover:text-green-700 mt-1"
                  >
                    Change Number
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Enter OTP</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <ShieldCheck className="h-5 w-5 text-stone-400" />
                    </div>
                    <input
                      type="text"
                      required
                      pattern="[0-9]{4,6}"
                      maxLength={6}
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                      className="block w-full pl-10 pr-3 py-3 border border-stone-200 rounded-xl focus:ring-green-500 focus:border-green-500 bg-stone-50 text-center tracking-widest font-bold text-lg"
                      placeholder="••••"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing || otp.length < 4}
                  className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white transition-colors ${
                    isProcessing || otp.length < 4 ? 'bg-stone-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
                  }`}
                >
                  {isProcessing ? 'Verifying...' : (
                    <>Verify & Continue <ArrowRight className="ml-2 h-4 w-4" /></>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
