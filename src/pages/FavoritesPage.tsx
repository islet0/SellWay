
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import AuthModal from '../components/AuthModal';
import Chatbot from '../components/Chatbot';
import { useApp } from '../contexts/AppContext';
import { products } from '../data/mockData';

const FavoritesPage = () => {
  const { state } = useApp();
  const { t } = useTranslation();

  const favoriteProducts = products.filter(product => 
    state.favorites.includes(product.id)
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center space-x-3 mb-8">
          <Heart className="h-8 w-8 text-red-500 fill-current" />
          <h1 className="text-3xl font-bold text-gray-900">{t('nav.favorites')}</h1>
        </div>

        {favoriteProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favoriteProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              No favorites yet
            </h2>
            <p className="text-gray-600 mb-8">
              Start exploring and add products to your favorites!
            </p>
            <Link
              to="/"
              className="inline-flex items-center bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        )}
      </div>

      <AuthModal />
      <Chatbot />
    </div>
  );
};

export default FavoritesPage;
