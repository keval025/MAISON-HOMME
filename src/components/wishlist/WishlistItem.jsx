import { Link } from 'react-router-dom';
import { FiTrash2, FiShoppingBag } from 'react-icons/fi';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';

const WishlistItem = ({ item }) => {
  const { removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToCart = () => {
    addToCart(item);
    removeFromWishlist(item.id);
  };

  return (
    <div className="flex gap-5 py-6 border-b border-gray-100 animate-fade-in">
      {/* Image */}
      <Link to={`/product/${item.id}`} className="shrink-0">
        <div className="w-24 h-32 bg-cream-100 overflow-hidden">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>
      </Link>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start gap-4">
          <div className="min-w-0">
            <p className="text-xs text-gold-500 tracking-widest uppercase mb-1 font-medium">
              {item.categoryName}
            </p>
            <Link to={`/product/${item.id}`}>
              <h3 className="text-sm font-medium text-black leading-snug hover:text-gold-600 transition-colors line-clamp-2 mb-2">
                {item.title}
              </h3>
            </Link>
            <p className="text-sm font-semibold text-black">
              ₹{item.price.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
            </p>
          </div>
          <button
            onClick={() => removeFromWishlist(item.id)}
            className="text-gray-400 hover:text-black transition-colors p-1 shrink-0"
            aria-label="Remove from wishlist"
          >
            <FiTrash2 size={16} />
          </button>
        </div>

        {/* Actions */}
        <div className="mt-4 flex gap-3">
          <button
            onClick={handleMoveToCart}
            className="flex items-center gap-2 bg-black text-white px-5 py-2 text-xs tracking-widest uppercase font-medium hover:bg-gold-500 hover:text-black transition-all duration-300"
          >
            <FiShoppingBag size={13} />
            Move to Bag
          </button>
          <Link
            to={`/product/${item.id}`}
            className="border border-gray-300 text-black px-5 py-2 text-xs tracking-widest uppercase font-medium hover:border-black transition-all duration-300"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WishlistItem;
