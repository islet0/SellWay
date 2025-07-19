import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, Heart, User, LogOut, Settings, ChevronDown, Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useApp } from '../contexts/AppContext';
import { useToast } from '../hooks/use-toast';
import LanguageSelector from './LanguageSelector';
import Icon from '/public/SellWay.png';
const Header = () => {
  const { state, dispatch } = useApp();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleAuthClick = () => {
    if (state.user) {
      dispatch({ type: 'SET_USER', payload: null });
      toast({
        title: t('auth.loggedOut'),
        description: t('auth.loggedOutMessage')
      });
    } else {
      navigate('/login');
    }
    setMobileMenuOpen(false);
  };

  const toggleCategory = (categoryKey: string) => {
    setExpandedCategory(expandedCategory === categoryKey ? null : categoryKey);
  };

  const cartItemsCount = state.cart.reduce((total, item) => total + item.quantity, 0);
  const favoritesCount = state.favorites.length;

  const mainCategories = [
    { 
      name: t('nav.women'), 
      path: '/category/women',
      key: 'women',
      subcategories: {
        clothing: {
          name: t('nav.clothing'),
          items: [
            { name: t('nav.dresses'), path: '/category/women/dresses' },
            { name: t('nav.tops'), path: '/category/women/tops' },
            { name: t('nav.jeans'), path: '/category/women/jeans' },
            { name: t('nav.coats'), path: '/category/women/coats' },
            { name: t('nav.skirts'), path: '/category/women/skirts' },
            { name: t('nav.lingerie'), path: '/category/women/lingerie' }
          ]
        },
        shoes: {
          name: t('nav.shoes'),
          items: [
            { name: t('nav.heels'), path: '/category/women/heels' },
            { name: t('nav.flats'), path: '/category/women/flats' },
            { name: t('nav.boots'), path: '/category/women/boots' },
            { name: t('nav.sneakers'), path: '/category/women/sneakers' },
            { name: t('nav.sandals'), path: '/category/women/sandals' }
          ]
        },
        accessories: {
          name: t('nav.accessories'),
          items: [
            { name: t('nav.bags'), path: '/category/women/bags' },
            { name: t('nav.jewelry'), path: '/category/women/jewelry' },
            { name: t('nav.watches'), path: '/category/women/watches' },
            { name: t('nav.scarves'), path: '/category/women/scarves' },
            { name: t('nav.sunglasses'), path: '/category/women/sunglasses' }
          ]
        }
      }
    },
    { 
      name: t('nav.men'), 
      path: '/category/men',
      key: 'men',
      subcategories: {
        clothing: {
          name: t('nav.clothing'),
          items: [
            { name: t('nav.shirts'), path: '/category/men/shirts' },
            { name: t('nav.jeans'), path: '/category/men/jeans' },
            { name: t('nav.jackets'), path: '/category/men/jackets' },
            { name: t('nav.suits'), path: '/category/men/suits' },
            { name: t('nav.tshirts'), path: '/category/men/tshirts' },
            { name: t('nav.sweaters'), path: '/category/men/sweaters' }
          ]
        },
        shoes: {
          name: t('nav.shoes'),
          items: [
            { name: t('nav.dress_shoes'), path: '/category/men/dress-shoes' },
            { name: t('nav.sneakers'), path: '/category/men/sneakers' },
            { name: t('nav.boots'), path: '/category/men/boots' },
            { name: t('nav.loafers'), path: '/category/men/loafers' },
            { name: t('nav.sandals'), path: '/category/men/sandals' }
          ]
        },
        accessories: {
          name: t('nav.accessories'),
          items: [
            { name: t('nav.watches'), path: '/category/men/watches' },
            { name: t('nav.wallets'), path: '/category/men/wallets' },
            { name: t('nav.belts'), path: '/category/men/belts' },
            { name: t('nav.ties'), path: '/category/men/ties' },
            { name: t('nav.sunglasses'), path: '/category/men/sunglasses' }
          ]
        }
      }
    },
    { 
      name: t('nav.kids'), 
      path: '/category/kids',
      key: 'kids',
      subcategories: {
        clothing: {
          name: t('nav.clothing'),
          items: [
            { name: t('nav.baby_clothes'), path: '/category/kids/baby-clothes' },
            { name: t('nav.girl_clothing'), path: '/category/kids/girls' },
            { name: t('nav.boy_clothing'), path: '/category/kids/boys' },
            { name: t('nav.school_uniforms'), path: '/category/kids/uniforms' }
          ]
        },
        shoes: {
          name: t('nav.shoes'),
          items: [
            { name: t('nav.baby_shoes'), path: '/category/kids/baby-shoes' },
            { name: t('nav.school_shoes'), path: '/category/kids/school-shoes' },
            { name: t('nav.sport_shoes'), path: '/category/kids/sport-shoes' },
            { name: t('nav.sandals'), path: '/category/kids/sandals' }
          ]
        },
        accessories: {
          name: t('nav.accessories'),
          items: [
            { name: t('nav.backpacks'), path: '/category/kids/backpacks' },
            { name: t('nav.toys'), path: '/category/kids/toys' },
            { name: t('nav.hair_accessories'), path: '/category/kids/hair-accessories' }
          ]
        }
      }
    },
    { 
      name: t('nav.sale'), 
      path: '/category/sale',
      key: 'sale'
    }
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      {/* Top bar with language only */}
      <div className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-end h-8">
            <div className="flex items-center space-x-4">
              <LanguageSelector />
              <Link 
                to="/virtual-tryon" 
                className="text-sm hover:text-gray-300 transition-colors hidden md:block"
              >
                {t('nav.virtualTryOn')}
              </Link>
              {/* <Link 
                to="/ar-shopping" 
                className="text-sm hover:text-gray-300 transition-colors hidden md:block"
              >
                {t('nav.arShopping')}
              </Link> */}
            </div>
          </div>
        </div>
      </div>

      {/* Main header with logo, categories, search and actions */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 hover:text-primary focus:outline-none"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 mr-10 ">
            <img 
              src={Icon}
              alt="SellWay" 
              className="h-[50px] w-[200px] object-contain"
            />
          </Link>

          {/* Desktop Categories Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {mainCategories.map((category) => (
              <div
                key={category.key}
                className="relative"
                onMouseEnter={() => setHoveredCategory(category.key)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                <Link
                  to={category.path}
                  className={`text-sm font-medium transition-colors flex items-center py-3 ${
                    category.key === 'sale' 
                      ? 'text-red-600 hover:text-red-700' 
                      : 'text-gray-900 hover:text-primary'
                  }`}
                >
                  {category.name}
                  {category.subcategories && <ChevronDown className="ml-1 h-3 w-3" />}
                </Link>
                
                {/* Desktop Category Dropdown */}
                {hoveredCategory === category.key && category.subcategories && (
                  <div className="absolute top-full left-0 w-96 bg-white shadow-xl border border-gray-200 rounded-lg z-50 p-6">
                    <div className="grid grid-cols-1 gap-6">
                      {Object.entries(category.subcategories).map(([subKey, subcategory]) => (
                        <div key={subKey}>
                          <h3 className="font-semibold text-gray-900 mb-3">{subcategory.name}</h3>
                          <ul className="space-y-2">
                            {subcategory.items.map((item) => (
                              <li key={item.name}>
                                <Link 
                                  to={item.path}
                                  className="text-sm text-gray-600 hover:text-primary transition-colors block py-1"
                                >
                                  {item.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Search Bar - Shows on medium and larger screens */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder={t('nav.searchPlaceholder')}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
              />
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {state.user && (
              <Link 
                to="/ceo-dashboard" 
                className="p-2 text-gray-600 hover:text-primary transition-colors hidden md:block"
                title="Dashboard"
              >
                <Settings className="h-5 w-5" />
              </Link>
            )}

            <Link 
              to="/favorites" 
              className="relative p-2 text-gray-600 hover:text-primary transition-colors"
              title={t('nav.favorites')}
            >
              <Heart className="h-5 w-5" />
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {favoritesCount}
                </span>
              )}
            </Link>

            <Link 
              to="/cart" 
              className="relative p-2 text-gray-600 hover:text-primary transition-colors"
              title={t('nav.cart')}
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            <div className="hidden md:flex items-center space-x-2">
              {state.user ? (
                <div className="flex items-center space-x-2">
                  <Link
                    to="/profile"
                    className="text-sm text-gray-700 hover:text-primary transition-colors"
                  >
                    {t('nav.welcome')}, {state.user.name}
                  </Link>
                  <button
                    onClick={handleAuthClick}
                    className="p-2 text-gray-600 hover:text-primary transition-colors"
                    title={t('nav.logout')}
                  >
                    <LogOut className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleAuthClick}
                  className="flex items-center space-x-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                >
                  <User className="h-4 w-4" />
                  <span className="text-sm font-medium">{t('nav.login')}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar - Shows only on small screens */}
      <div className="md:hidden px-4 py-2 bg-gray-50">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder={t('nav.searchPlaceholder')}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
          />
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-80 bg-white shadow-xl transform ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:hidden`}>
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <img 
                src={Icon}
                alt="SellWay" 
                className="h-8 w-8 object-contain"
              />
              <span className="text-xl font-bold text-gray-900">SellWay</span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Sidebar Content */}
          <div className="flex-1 overflow-y-auto">
            <nav className="px-4 py-6">
              {/* Mobile Categories */}
              <ul className="space-y-2">
                {mainCategories.map((category) => (
                  <li key={category.key}>
                    <div className="flex flex-col">
                      {category.subcategories ? (
                        <>
                          <button
                            onClick={() => toggleCategory(category.key)}
                            className={`flex items-center justify-between w-full px-3 py-2 text-left rounded-md ${
                              category.key === 'sale' 
                                ? 'text-red-600 hover:bg-red-50' 
                                : 'text-gray-700 hover:bg-gray-50'
                            }`}
                          >
                            <span className="font-medium">{category.name}</span>
                            <ChevronDown 
                              className={`h-4 w-4 transition-transform ${
                                expandedCategory === category.key ? 'transform rotate-180' : ''
                              }`}
                            />
                          </button>
                          {expandedCategory === category.key && (
                            <div className="pl-4 mt-1 space-y-1">
                              {Object.entries(category.subcategories).map(([subKey, subcategory]) => (
                                <div key={subKey} className="mb-3">
                                  <h4 className="font-medium text-gray-900 px-3 py-1">{subcategory.name}</h4>
                                  <ul className="pl-4">
                                    {subcategory.items.map((item) => (
                                      <li key={item.name}>
                                        <Link
                                          to={item.path}
                                          onClick={() => setMobileMenuOpen(false)}
                                          className="block px-3 py-1 text-gray-600 hover:text-primary"
                                        >
                                          {item.name}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>
                          )}
                        </>
                      ) : (
                        <Link 
                          to={category.path}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`px-3 py-2 rounded-md ${
                            category.key === 'sale' 
                              ? 'text-red-600 hover:bg-red-50' 
                              : 'text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          {category.name}
                        </Link>
                      )}
                    </div>
                  </li>
                ))}
              </ul>

              {/* Additional Mobile Links */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <Link 
                  to="/virtual-tryon" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
                >
                  {t('nav.virtualTryOn')}
                </Link>
                {/* <Link 
                  to="/ar-shopping" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
                >
                  {t('nav.arShopping')}
                </Link> */}
              </div>

              {/* User Section */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                {state.user ? (
                  <>
                    <div className="px-3 py-2 text-sm text-gray-500">
                      {t('nav.welcome')}, {state.user.name}
                    </div>
                    <Link
                      to="/profile"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
                    >
                      {t('nav.profile')}
                    </Link>
                    {state.user && (
                      <Link
                        to="/ceo-dashboard"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
                      >
                        {t('nav.dashboard')}
                      </Link>
                    )}
                    <button
                      onClick={handleAuthClick}
                      className="w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
                    >
                      {t('nav.logout')}
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleAuthClick}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors mt-4"
                  >
                    <User className="h-4 w-4" />
                    <span>{t('nav.login')}</span>
                  </button>
                )}
              </div>
            </nav>
          </div>
        </div>
      </div>

      {/* Overlay when mobile menu is open */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;