import { Link } from 'react-router-dom';
import { FiHeart } from 'react-icons/fi';
import WishlistItem from '../components/wishlist/WishlistItem';
import { useWishlist } from '../context/WishlistContext';

const WishlistPage = () => {
  const { wishlist, clearWishlist } = useWishlist();

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-20">
        <div className="text-center max-w-md">
          <FiHeart size={48} className="text-gray-200 mx-auto mb-6" />
          <h2 className="font-serif text-4xl font-light mb-4" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Your Wishlist Is Empty
          </h2>
          <p className="text-gray-500 text-sm mb-8">
            Save your favourite pieces and come back to them anytime.
          </p>
          <Link
            to="/shop"
            className="bg-black text-white px-10 py-4 text-xs tracking-widest uppercase font-medium hover:bg-gold-500 hover:text-black transition-all duration-300 inline-block"
          >
            Explore Collection
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-cream-100 py-12 text-center">
        <p className="section-subtitle mb-3">Saved Items</p>
        <h1 className="section-title">My Wishlist</h1>
        <p className="text-gray-500 text-sm mt-2">{wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} saved</p>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="flex justify-end mb-6">
          <button
            onClick={clearWishlist}
            className="text-xs text-gray-400 hover:text-red-600 transition-colors uppercase tracking-wider font-medium"
          >
            Clear All
          </button>
        </div>
        <div>
          {wishlist.map(item => (
            <WishlistItem key={item.id} item={item} />
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            to="/shop"
            className="border border-black text-black px-10 py-3 text-xs tracking-widest uppercase font-medium hover:bg-black hover:text-white transition-all duration-300 inline-block"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;
