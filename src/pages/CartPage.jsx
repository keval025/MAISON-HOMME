import { Link } from 'react-router-dom';
import { FiShoppingBag, FiArrowLeft, FiTag } from 'react-icons/fi';
import CartItem from '../components/cart/CartItem';
import { useCart } from '../context/CartContext';
import { useState } from 'react';

const CartPage = () => {
  const { cart, cartTotal, cartCount, clearCart } = useCart();
  const [coupon, setCoupon] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);

  const shipping = cartTotal > 2999 ? 0 : 299;
  const discount = couponApplied ? Math.round(cartTotal * 0.1) : 0;
  const finalTotal = cartTotal + shipping - discount;

  const handleCoupon = () => {
    if (coupon.toLowerCase() === 'maison10') {
      setCouponApplied(true);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-20">
        <div className="text-center max-w-md">
          <FiShoppingBag size={48} className="text-gray-200 mx-auto mb-6" />
          <h2 className="font-serif text-4xl font-light mb-4" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Your Bag Is Empty
          </h2>
          <p className="text-gray-500 text-sm mb-8">
            Discover our curated collection and add your favourite pieces to begin.
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
        <p className="section-subtitle mb-3">Your Selection</p>
        <h1 className="section-title">Shopping Bag</h1>
        <p className="text-gray-500 text-sm mt-2">{cartCount} {cartCount === 1 ? 'item' : 'items'}</p>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
              <Link to="/shop" className="flex items-center gap-2 text-xs text-gray-500 hover:text-black transition-colors uppercase tracking-widest font-medium">
                <FiArrowLeft size={14} />
                Continue Shopping
              </Link>
              <button
                onClick={clearCart}
                className="text-xs text-gray-400 hover:text-red-600 transition-colors uppercase tracking-wider font-medium"
              >
                Clear All
              </button>
            </div>
            <div>
              {cart.map(item => (
                <CartItem key={item.cartId} item={item} />
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-cream-100 p-8 sticky top-28">
              <h2 className="font-serif text-2xl font-light mb-8" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal ({cartCount} items)</span>
                  <span className="font-medium">₹{cartTotal.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className={shipping === 0 ? 'text-green-600 font-medium' : 'font-medium'}>
                    {shipping === 0 ? 'FREE' : `₹${shipping}`}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Discount (MAISON10)</span>
                    <span className="text-green-600 font-medium">− ₹{discount}</span>
                  </div>
                )}
              </div>

              {/* Coupon */}
              <div className="mb-6 pb-6 border-b border-gray-200">
                {!couponApplied ? (
                  <div className="flex gap-2">
                    <div className="flex-1 flex items-center border border-gray-300 px-3">
                      <FiTag size={14} className="text-gray-400 shrink-0 mr-2" />
                      <input
                        type="text"
                        value={coupon}
                        onChange={e => setCoupon(e.target.value.toUpperCase())}
                        placeholder="Coupon code"
                        className="flex-1 py-2 bg-transparent text-xs outline-none placeholder:text-gray-400 uppercase tracking-widest"
                      />
                    </div>
                    <button
                      onClick={handleCoupon}
                      className="bg-black text-white px-4 py-2 text-xs tracking-widest uppercase font-medium hover:bg-gold-500 hover:text-black transition-all duration-300"
                    >
                      Apply
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between bg-green-50 border border-green-200 px-4 py-3">
                    <div className="flex items-center gap-2">
                      <FiTag size={14} className="text-green-600" />
                      <span className="text-xs font-medium text-green-600 uppercase tracking-widest">MAISON10 Applied!</span>
                    </div>
                    <button onClick={() => { setCouponApplied(false); setCoupon(''); }} className="text-xs text-gray-400 hover:text-black">Remove</button>
                  </div>
                )}
                <p className="text-xs text-gray-400 mt-2">Try: MAISON10 for 10% off</p>
              </div>

              {/* Total */}
              <div className="flex justify-between items-baseline mb-8">
                <span className="font-medium tracking-wider uppercase text-xs">Total</span>
                <div className="text-right">
                  <span className="font-serif text-2xl font-light" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                    ₹{finalTotal.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                  </span>
                  <p className="text-xs text-gray-400">Incl. all taxes</p>
                </div>
              </div>

              <button className="w-full bg-black text-white py-4 text-xs tracking-widest uppercase font-medium hover:bg-gold-500 hover:text-black transition-all duration-300 mb-3">
                Proceed to Checkout
              </button>
              <p className="text-xs text-center text-gray-400">
                Secure checkout · SSL Encrypted
              </p>

              {/* Payment Icons */}
              <div className="flex items-center justify-center gap-3 mt-4">
                {['VISA', 'MC', 'UPI', 'EMI'].map(p => (
                  <span key={p} className="border border-gray-200 px-2 py-1 text-xs text-gray-400 font-medium">{p}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
