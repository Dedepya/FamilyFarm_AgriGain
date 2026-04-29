import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300 py-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-bold text-white mb-4">
            <span className="text-orange-500">FAMILY</span>FARM
          </h3>
          <p className="text-sm leading-relaxed mb-4">
            Providing the best agricultural products, loans & schemes information, pest suggestions, and weather updates for farmers to maximize their yield.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-stone-400 hover:text-white"><Facebook className="w-5 h-5" /></a>
            <a href="#" className="text-stone-400 hover:text-white"><Twitter className="w-5 h-5" /></a>
            <a href="#" className="text-stone-400 hover:text-white"><Instagram className="w-5 h-5" /></a>
            <a href="#" className="text-stone-400 hover:text-white"><Linkedin className="w-5 h-5" /></a>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-orange-400">Home</Link></li>
            <li><Link to="/loans" className="hover:text-orange-400">Loans & Schemes</Link></li>
            <li><Link to="/pests" className="hover:text-orange-400">Pest Suggestions</Link></li>
            <li><Link to="/weather" className="hover:text-orange-400">Weather Updates</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Categories</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/category/vegetables" className="hover:text-orange-400">Veggies & Fruits</Link></li>
            <li><Link to="/category/rice" className="hover:text-orange-400">Rice</Link></li>
            <li><Link to="/category/pulses" className="hover:text-orange-400">Pulses</Link></li>
            <li><Link to="/category/cashcrops" className="hover:text-orange-400">Cash Crops</Link></li>
            <li><Link to="/category/wheat" className="hover:text-orange-400">Wheat</Link></li>
            <li><Link to="/category/maize" className="hover:text-orange-400">Maize</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Contact Us</h4>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start">
              <MapPin className="w-5 h-5 mr-3 text-orange-500 shrink-0" />
              <span>123 Agri Lane, Farming District, Country 56789</span>
            </li>
            <li className="flex items-center">
              <Phone className="w-5 h-5 mr-3 text-orange-500 shrink-0" />
              <span>4704360721</span>
            </li>
            <li className="flex items-center">
              <Mail className="w-5 h-5 mr-3 text-orange-500 shrink-0" />
              <span>dedeepyayarlagadda2001@gmail.com</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-8 pt-8 border-t border-stone-800 text-center text-sm text-stone-500">
        &copy; {new Date().getFullYear()} AGRI GAIN / FAMILYFARM. All rights reserved.
      </div>
    </footer>
  );
}
