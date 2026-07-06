import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Droplets, Sun, Sprout, Wheat, Tractor } from 'lucide-react';

const CATEGORIES = [
  { id: 'vegetables', name: 'Veggies & Fruits', icon: Leaf, color: 'bg-green-100 text-green-600' },
  { id: 'rice', name: 'Rice', icon: Droplets, color: 'bg-blue-100 text-blue-600' },
  { id: 'pulses', name: 'Pulses', icon: Sprout, color: 'bg-orange-100 text-orange-600' },
  { id: 'cashcrops', name: 'Cash Crops', icon: Tractor, color: 'bg-purple-100 text-purple-600' },
  { id: 'wheat', name: 'Wheat', icon: Wheat, color: 'bg-yellow-100 text-yellow-600' },
  { id: 'maize', name: 'Maize', icon: Sun, color: 'bg-amber-100 text-amber-600' },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-green-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://loremflickr.com/1920/1080/farm,landscape" 
            alt="Farm field" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Empowering Farmers with <span className="text-orange-400">AGRI GAIN</span>
            </h1>
            <p className="text-lg md:text-xl mb-8 text-green-100">
              Your one-stop destination for agricultural products, loans, pest control suggestions, and real-time weather updates.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/category" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-semibold transition-colors flex items-center">
                Shop Now <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link to="/loans" className="bg-white hover:bg-green-50 text-green-900 px-8 py-3 rounded-full font-semibold transition-colors">
                Explore Loans
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-stone-800 mb-4">Shop by Category</h2>
            <p className="text-stone-500 max-w-2xl mx-auto">Browse our wide selection of high-quality agricultural products directly from trusted sources.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {CATEGORIES.map((cat) => (
              <Link 
                key={cat.id} 
                to={`/category/${cat.id}`}
                className="group flex flex-col items-center p-6 rounded-2xl border border-stone-100 hover:border-green-200 hover:shadow-lg transition-all bg-white"
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${cat.color} group-hover:scale-110 transition-transform`}>
                  <cat.icon className="w-8 h-8" />
                </div>
                <h3 className="font-semibold text-stone-800 text-center group-hover:text-green-600 transition-colors">{cat.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-stone-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-6">
                <Sun className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-stone-800 mb-3">Weather Updates</h3>
              <p className="text-stone-600 mb-4">Get real-time weather forecasts to plan your farming activities effectively and protect your crops.</p>
              <Link to="/weather" className="text-blue-600 font-semibold hover:text-blue-700 flex items-center">
                Check Weather <ArrowRight className="ml-1 w-4 h-4" />
              </Link>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mb-6">
                <Leaf className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-stone-800 mb-3">Pest Suggestions</h3>
              <p className="text-stone-600 mb-4">Identify pests and get expert recommendations on how to protect your crops safely and efficiently.</p>
              <Link to="/pests" className="text-green-600 font-semibold hover:text-green-700 flex items-center">
                View Solutions <ArrowRight className="ml-1 w-4 h-4" />
              </Link>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center mb-6">
                <Tractor className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-stone-800 mb-3">Loans & Schemes</h3>
              <p className="text-stone-600 mb-4">Discover government schemes and financial assistance programs available for farmers in your region.</p>
              <Link to="/loans" className="text-orange-600 font-semibold hover:text-orange-700 flex items-center">
                Explore Options <ArrowRight className="ml-1 w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
