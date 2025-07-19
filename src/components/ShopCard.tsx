
import React from 'react';
import { Link } from 'react-router-dom';
import { Star, CheckCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Shop } from '../data/mockData';

interface ShopCardProps {
  shop: Shop;
}

const ShopCard: React.FC<ShopCardProps> = ({ shop }) => {
  const { t } = useTranslation();

  return (
    <Link to={`/shop/${shop.id}`} className="block">
      <div className="shop-card overflow-hidden group">
        {/* Banner */}
        <div className="relative h-[230px] overflow-hidden">
          <img
            src={shop.banner}
            alt={shop.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          
          {/* Shop Info Overlay */}
          <div className="absolute bottom-4 left-4 text-white">
            <div className="flex items-center space-x-2 mb-2">
              <img
                src={shop.logo}
                alt={shop.name}
                className="w-12 h-12 rounded-full border-2 border-white"
              />
              <div>
                <div className="flex items-center space-x-1">
                  <h3 className="text-lg font-bold">{shop.name}</h3>
                  {shop.isVerified && (
                    <CheckCircle className="h-4 w-4 text-green-400" />
                  )}
                </div>
                <div className="flex items-center space-x-1 text-sm">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>{shop.rating}</span>
                  <span className="text-gray-300">({shop.totalProducts} {t('common.products').toLowerCase()})</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-3">
            <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
              {shop.category}
            </span>
          </div>
          
          <p className="text-gray-600 text-sm leading-relaxed">
            {shop.description}
          </p>

          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>{shop.totalProducts} {t('common.products')}</span>
              <span className="text-primary font-medium group-hover:underline">
                {t('common.visitStore')} →
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ShopCard;
