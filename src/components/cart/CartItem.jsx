import { Link } from 'react-router-dom';
import { FiTrash2, FiMinus, FiPlus } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';

const CartItem = ({ item }) => {
  const { removeFromCart, updateQuantity } = useCart();

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
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <span className="uppercase tracking-wider">Size: {item.selectedSize}</span>
              <span className="uppercase tracking-wider">Color: {item.selectedColor}</span>
            </div>
          </div>
          <button
            onClick={() => removeFromCart(item.cartId)}
            className="text-gray-400 hover:text-black transition-colors p-1 shrink-0"
            aria-label="Remove item"
          >
            <FiTrash2 size={16} />
          </button>
        </div>

        {/* Quantity & Price */}
        <div className="flex items-center justify-between mt-4">
          {/* Quantity Control */}
          <div className="flex items-center border border-gray-300">
            <button
              onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
              disabled={item.quantity <= 1}
              className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-black disabled:opacity-30 transition-colors"
            >
              <FiMinus size={12} />
            </button>
            <span className="w-10 text-center text-sm font-medium">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
              className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-black transition-colors"
            >
              <FiPlus size={12} />
            </button>
          </div>

          {/* Price */}
          <div className="text-right">
            <p className="text-sm font-semibold text-black">
              ₹{(item.price * item.quantity).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
            </p>
            {item.quantity > 1 && (
              <p className="text-xs text-gray-400">
                ₹{item.price.toLocaleString('en-IN', { maximumFractionDigits: 0 })} each
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
