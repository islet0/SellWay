import React from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Layout from '../components/Layout';
import ProductCard from '../components/ProductCard';
import { products } from '../data/mockData';

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const { t } = useTranslation();

  // Filter products by category
  const categoryProducts = products.filter(product => 
    product.category.toLowerCase() === category?.toLowerCase()
  );

  const getCategoryTitle = (cat: string) => {
    switch (cat?.toLowerCase()) {
      case 'men': return t('nav.men');
      case 'women': return t('nav.women');
      case 'kids': return t('nav.kids');
      case 'shoes': return t('nav.shoes');
      case 'accessories': return t('nav.accessories');
      case 'sale': return t('nav.sale');
      default: return cat;
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {getCategoryTitle(category || '')}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our curated collection of {category?.toLowerCase()} products
            </p>
            <div className="mt-6 flex justify-center">
              <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                {categoryProducts.length} Products Found
              </span>
            </div>
          </div>

          {categoryProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {categoryProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m13-8v4a2 2 0 01-2 2H9a2 2 0 01-2-2V5a2 2 0 012-2h6a2 2 0 012 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Products Found</h3>
                <p className="text-gray-600 mb-6">
                  We couldn't find any products in the {category} category yet. Check back soon for new arrivals!
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CategoryPage;