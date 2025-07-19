
import React from 'react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, CheckCircle, TrendingUp, Sparkles, ShoppingBag, Users, Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header';
import ShopCard from '../components/ShopCard';
import ProductCard from '../components/ProductCard';
import AuthModal from '../components/AuthModal';
import Chatbot from '../components/Chatbot';
import { shops, products } from '../data/mockData';

const Index = () => {
  const { t } = useTranslation();
  const featuredProducts = products.slice(0, 8);
  const featuredShops = shops;

  return (
    <Layout>
      {/* Professional Hero Section with Rich Black/Grey Theme */}
      <section className="relative min-h-screen hero-showcase overflow-hidden">
        {/* Background Image with Lower Opacity */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800 opacity-30"></div>
        
        {/* Subtle Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-32 h-32 bg-white/5 rounded-full animate-float blur-xl"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 bg-white/3 rounded-full animate-bounce blur-lg" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/2 rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-40 w-16 h-16 bg-white/5 rounded-full animate-ping"></div>
          <div className="absolute bottom-40 left-40 w-20 h-20 bg-white/3 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        </div>

        {/* Floating Shopping Icons */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 text-white/30 animate-float">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <div className="absolute top-1/3 right-1/4 text-white/25 animate-float" style={{ animationDelay: '1.5s' }}>
            <Star className="w-6 h-6" />
          </div>
          <div className="absolute bottom-1/3 left-1/6 text-white/35 animate-float" style={{ animationDelay: '0.8s' }}>
            <Sparkles className="w-7 h-7" />
          </div>
          <div className="absolute bottom-1/4 right-1/6 text-white/30 animate-float" style={{ animationDelay: '2s' }}>
            <Zap className="w-5 h-5" />
          </div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 flex items-center min-h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="text-center text-white">
              <div className="inline-flex items-center px-6 py-3 glass-effect rounded-full mb-8">
                
                <span className="text-sm font-medium">{t('hero.welcomeMessage') || 'Welcome to the Future of Shopping'}</span>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-white">
                  {t('hero.title') || 'Discover Your Style'}
                </span>
                <br />
                <span className="text-3xl md:text-5xl text-white/95 font-light mt-4 block">
                  {t('hero.subtitle') || 'Shop with Confidence'}
                </span>
              </h1>

              <p className="text-xl md:text-2xl mb-12 text-gray-300 max-w-4xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.3s' }}>
                {t('hero.description') || 'Experience the future of online shopping with AI-powered recommendations, virtual try-ons, and personalized style guidance.'}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in" style={{ animationDelay: '0.6s' }}>
                <Link
                  to="#featured-shops"
                  className="group bg-white text-primary px-10 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-2xl text-lg flex items-center"
                >
                  <Users className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                  {t('hero.exploreShops') || 'Explore Shops'}
                </Link>
                <Link
                  to="#featured-products"
                  className="group glass-effect border border-white/30 text-white px-10 py-4 rounded-full font-semibold hover:bg-white/10 transition-all duration-300 hover:scale-105 text-lg flex items-center"
                >
                  {t('hero.viewProducts') || 'View Products'}
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Feature Pills */}
              {/* <div className="flex flex-wrap justify-center gap-4 mt-12 animate-fade-in" style={{ animationDelay: '0.9s' }}>
                <div className="glass-effect px-6 py-3 rounded-full text-sm font-medium">
                  AI-Powered Recommendations
                </div>
                <div className="glass-effect px-6 py-3 rounded-full text-sm font-medium">
                  Virtual Try-On
                </div>
                <div className="glass-effect px-6 py-3 rounded-full text-sm font-medium">
                  Free Delivery
                </div>
                <div className="glass-effect px-6 py-3 rounded-full text-sm font-medium">
                  Premium Quality
                </div>
              </div> */}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/70 animate-bounce">
          <div className="flex flex-col items-center">
            <span className="text-sm mb-2">{t('hero.scrollDown') || 'Scroll Down'}</span>
            <ArrowRight className="w-4 h-4 rotate-90" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-background relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="p-8 rounded-xl hover:bg-card transition-colors group shadow-lg">
              <div className="text-4xl font-bold text-primary mb-3 group-hover:scale-110 transition-transform">50+</div>
              <div className="text-muted-foreground text-lg">{t('stats.brands')}</div>
            </div>
            <div className="p-8 rounded-xl hover:bg-card transition-colors group shadow-lg">
              <div className="text-4xl font-bold text-primary mb-3 group-hover:scale-110 transition-transform">10k+</div>
              <div className="text-muted-foreground text-lg">{t('stats.customers')}</div>
            </div>
            <div className="p-8 rounded-xl hover:bg-card transition-colors group shadow-lg">
              <div className="text-4xl font-bold text-primary mb-3 group-hover:scale-110 transition-transform">99.9%</div>
              <div className="text-muted-foreground text-lg">{t('stats.uptime')}</div>
            </div>
            <div className="p-8 rounded-xl hover:bg-card transition-colors group shadow-lg">
              <div className="text-4xl font-bold text-primary mb-3 group-hover:scale-110 transition-transform">24/7</div>
              <div className="text-muted-foreground text-lg">{t('stats.support')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Shops */}
      <section id="featured-shops" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              {t('sections.featuredShops')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('sections.featuredShopsDesc')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {featuredShops.map((shop, index) => (
              <div
                key={shop.id}
                className="animate-fade-in hover:scale-105 transition-transform duration-300"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <ShopCard shop={shop} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section id="featured-products" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              {t('sections.trendingProducts')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('sections.trendingProductsDesc')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, index) => (
              <div
                key={product.id}
                className="animate-fade-in hover:scale-105 transition-transform duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link
              to="/products"
              className="inline-flex items-center bg-primary text-primary-foreground px-10 py-4 rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300 hover:scale-105 shadow-lg text-lg group"
            >
              {t('common.viewAll')}
              <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              {t('sections.whyChoose')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center p-8 bg-card rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group hover:scale-105">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <CheckCircle className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-foreground">{t('features.verifiedSellers')}</h3>
              <p className="text-muted-foreground leading-relaxed">{t('features.verifiedSellersDesc')}</p>
            </div>

            <div className="text-center p-8 bg-card rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group hover:scale-105">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Star className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-foreground">{t('features.qualityProducts')}</h3>
              <p className="text-muted-foreground leading-relaxed">{t('features.qualityProductsDesc')}</p>
            </div>

            <div className="text-center p-8 bg-card rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group hover:scale-105">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <TrendingUp className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-foreground">{t('features.bestPrices')}</h3>
              <p className="text-muted-foreground leading-relaxed">{t('features.bestPricesDesc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 professional-gradient"></div>
        <div className="max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {t('sections.readyToShop')}
          </h2>
          <p className="text-xl mb-10 text-gray-300 max-w-3xl mx-auto">
            {t('sections.readyToShopDesc')}
          </p>
          <Link
            to="/products"
            className="inline-flex items-center bg-primary-foreground text-primary px-10 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-xl text-lg group"
          >
            {t('sections.startShopping')}
            <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      <AuthModal />
      <Chatbot />
    </Layout>
  );
};

export default Index;
