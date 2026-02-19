import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiHeart, FiShoppingBag, FiEye } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    toggleWishlist(product);
  };

  const inWishlist = isInWishlist(product.id);

  return (
    <div
      className="group relative bg-white animate-fade-in"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden aspect-[3/4] bg-cream-100">
        <Link to={`/product/${product.id}`}>
          <img
            src={isHovered && product.hoverImage ? product.hoverImage : product.image}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        </Link>

        {/* Badges */}
        {product.badge && (
          <span className={`absolute top-3 left-3 text-xs tracking-widest uppercase font-medium px-3 py-1 ${
            product.badge === 'Sale' ? 'bg-red-600 text-white' : 'bg-black text-white'
          }`}>
            {product.badge}
          </span>
        )}

        {!product.inStock && (
          <span className="absolute top-3 left-3 text-xs tracking-widest uppercase font-medium px-3 py-1 bg-gray-400 text-white">
            Sold Out
          </span>
        )}

        {/* Action Buttons */}
        <div className={`absolute right-3 top-3 flex flex-col gap-2 transition-all duration-300 ${
          isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
        }`}>
          {/* Wishlist */}
          <button
            onClick={handleWishlist}
            className={`w-9 h-9 flex items-center justify-center transition-all duration-200 ${
              inWishlist ? 'bg-gold-500 text-black' : 'bg-white text-black hover:bg-gold-500 hover:text-black'
            } shadow-md`}
            aria-label="Add to wishlist"
          >
            <FiHeart size={15} fill={inWishlist ? 'currentColor' : 'none'} />
          </button>

          {/* Quick View */}
          <Link
            to={`/product/${product.id}`}
            className="w-9 h-9 bg-white flex items-center justify-center text-black hover:bg-gold-500 transition-all duration-200 shadow-md"
            aria-label="Quick view"
          >
            <FiEye size={15} />
          </Link>
        </div>

        {/* Add to Cart Overlay */}
        <div className={`absolute bottom-0 left-0 right-0 transition-all duration-300 ${
          isHovered && product.inStock ? 'translate-y-0' : 'translate-y-full'
        }`}>
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock || addedToCart}
            className={`w-full py-3 text-xs tracking-widest uppercase font-medium transition-all duration-300 ${
              addedToCart
                ? 'bg-gold-500 text-black'
                : 'bg-black text-white hover:bg-gold-500 hover:text-black'
            }`}
          >
            {addedToCart ? '✓ Added to Bag' : (
              <span className="flex items-center justify-center gap-2">
                <FiShoppingBag size={13} />
                Add to Bag
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="pt-4 pb-2 ml-2">
        <Link to={`/product/${product.id}`}>
          <p className="text-xs text-gold-500 tracking-widest uppercase mb-1 font-medium">
            {product.categoryName}
          </p>
          <h3 className="text-sm font-medium text-black leading-snug mb-2 group-hover:text-gold-600 transition-colors line-clamp-2">
            {product.title}
          </h3>
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-black">
            ₹{product.price.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
          </span>
          {product.badge === 'Sale' && (
            <span className="text-xs text-gray-400 line-through">
              ₹{(product.price * 1.3).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
            </span>
          )}
        </div>
        {/* Rating */}
        <div className="flex items-center gap-1.5 mt-1.5">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={`text-xs ${i < Math.floor(product.rating?.rate || 4) ? 'text-gold-500' : 'text-gray-300'}`}>
                ★
              </span>
            ))}
          </div>
          <span className="text-xs text-gray-400">({product.reviews})</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
