import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, Phone, Mail, Menu } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '../context/CartContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { totalItems } = useCart();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-green-700 text-white py-2 px-4 text-sm">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span className="flex items-center"><Phone className="w-4 h-4 mr-2" /> 4704360721</span>
            <span className="flex items-center hidden sm:flex"><Mail className="w-4 h-4 mr-2" /> dedeepyayarlagadda2001@gmail.com</span>
          </div>
          <div className="flex space-x-4">
            <Link to="/login" className="hover:text-green-200">Login / Sign Up</Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-green-800 flex items-center">
            <span className="text-orange-500 mr-1">FAMILY</span>FARM
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <form onSubmit={handleSearch} className="relative w-full">
              <input 
                type="text" 
                placeholder="Search a product..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border-2 border-green-600 rounded-full py-2 px-4 pr-10 focus:outline-none focus:border-green-700"
              />
              <button type="submit" className="absolute right-0 top-0 mt-2 mr-3 text-green-600">
                <Search className="w-5 h-5" />
              </button>
            </form>
          </div>

          {/* Cart & Mobile Menu */}
          <div className="flex items-center space-x-6">
            <Link to="/checkout" className="flex items-center text-green-800 hover:text-green-600 relative">
              <ShoppingCart className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
              <span className="ml-2 font-semibold hidden sm:block">Cart</span>
            </Link>
            <button 
              className="md:hidden text-green-800"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className={`bg-green-800 text-white ${isMenuOpen ? 'block' : 'hidden'} md:block`}>
        <div className="container mx-auto px-4">
          <ul className="flex flex-col md:flex-row md:space-x-8 py-2 md:py-0">
            <li><Link to="/" className="block py-2 md:py-4 hover:text-orange-400 font-medium">Best Deals</Link></li>
            <li><Link to="/loans" className="block py-2 md:py-4 hover:text-orange-400 font-medium">Loans & Schemes</Link></li>
            <li><Link to="/pests" className="block py-2 md:py-4 hover:text-orange-400 font-medium">Pest Suggestions</Link></li>
            <li><Link to="/weather" className="block py-2 md:py-4 hover:text-orange-400 font-medium">Weather Updates</Link></li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
