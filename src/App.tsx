/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Category from './pages/Category';
import Loans from './pages/Loans';
import Pests from './pages/Pests';
import Weather from './pages/Weather';
import Login from './pages/Login';
import Search from './pages/Search';
import Checkout from './pages/Checkout';
import Payment from './pages/Payment';
import ChatAssistant from './components/ChatAssistant';

export default function App() {
  return (
    <Router basename="/FamilyFarm_AgriGain/">
      <CartProvider>
        <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900 font-sans">
          <Header />
          <main className="flex-grow">
            <Routes>
              {/* Redirect root to vegetables category */}
              <Route path="/" element={<Navigate to="category/vegetables" replace />} />
              <Route path="/category/:id" element={<Category />} />
              <Route path="/search" element={<Search />} />
              <Route path="/loans" element={<Loans />} />
              <Route path="/pests" element={<Pests />} />
              <Route path="/weather" element={<Weather />} />
              <Route path="/login" element={<Login />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/payment" element={<Payment />} />
            </Routes>
          </main>
          <Footer />
          <ChatAssistant />
        </div>
      </CartProvider>
    </Router>
  );
}
