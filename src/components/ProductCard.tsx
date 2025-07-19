
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star, ShoppingCart } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Product } from '../data/mockData';
import { useApp } from '../contexts/AppContext';
import { useToast } from '../hooks/use-toast';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { state, dispatch } = useApp();
  const { toast } = useToast();
  const { t } = useTranslation();

  const isFavorite = state.favorites.includes(product.id);
  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch({ type: 'TOGGLE_FAVORITE', payload: product.id });
    
    toast({
      title: isFavorite ? t('common.removedFromFavorites') : t('common.addedToFavorites'),
      description: isFavorite 
        ? `${product.name} removed from your favorites`
        : `${product.name} added to your favorites`
    });
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      shopId: product.shopId,
      selectedColor: product.colors?.[0],
      selectedSize: product.sizes?.[0]
    };

    dispatch({ type: 'ADD_TO_CART', payload: cartItem });
    
    toast({
      title: t('common.addedToCart'),
      description: `${product.name} has been added to your cart`
    });
  };

  return (
    <div className="product-card overflow-hidden group">
      <Link to={`/product/${product.id}`} className="block">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          
          {/* Discount Badge */}
          {discountPercentage > 0 && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
              -{discountPercentage}%
            </div>
          )}

          {/* Favorite Button */}
          <button
            onClick={handleToggleFavorite}
            className={`absolute top-2 right-2 p-2 rounded-full transition-all duration-200 ${
              isFavorite
                ? 'bg-red-500 text-white'
                : 'bg-white/80 text-gray-600 hover:bg-white hover:text-red-500'
            }`}
          >
            <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
          </button>

          {/* Quick Add to Cart */}
          <button
            onClick={handleAddToCart}
            className="absolute bottom-2 right-2 p-2 bg-primary text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-primary/90 transform translate-y-2 group-hover:translate-y-0"
            title={t('common.addToCart')}
          >
            <ShoppingCart className="h-4 w-4" />
          </button>

          {/* Stock Status */}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white font-medium">{t('common.outOfStock')}</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="mb-2">
            <h3 className="font-medium text-gray-900 group-hover:text-primary transition-colors line-clamp-2">
              {product.name}
            </h3>
            <p className="text-sm text-gray-500 mt-1">{product.category}</p>
          </div>

          {/* Rating */}
          <div className="flex items-center space-x-1 mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(product.rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">
              {product.rating} ({product.reviewCount})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Colors Preview */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center space-x-1 mt-2">
              <span className="text-xs text-gray-500">{t('common.colors')}:</span>
              <div className="flex space-x-1">
                {product.colors.slice(0, 4).map((color, index) => (
                  <div
                    key={index}
                    className="w-4 h-4 rounded-full border border-gray-300"
                    style={{ backgroundColor: color.toLowerCase() }}
                    title={color}
                  />
                ))}
                {product.colors.length > 4 && (
                  <span className="text-xs text-gray-500">+{product.colors.length - 4}</span>
                )}
              </div>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
