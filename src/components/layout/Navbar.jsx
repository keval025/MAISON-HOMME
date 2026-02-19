import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FiShoppingBag, FiHeart, FiMenu, FiX, FiSearch } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Shop', path: '/shop' },
  { label: 'Categories', path: '/categories' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setSearchOpen(false);
    }
  };

  return (
    <>
      {/* Top announcement bar */}
      <div className="bg-black text-white text-center py-2 text-xs tracking-widest uppercase font-medium">
        Free Shipping on Orders Above ₹2999 &nbsp;|&nbsp; New Collection Available
      </div>

      <nav
        className={`sticky top-0 z-50 transition-all duration-500 ${
          isScrolled ? 'bg-white shadow-md' : 'bg-white'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 md:h-20">

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 text-black"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>

            {/* Logo */}
            <Link
              to="/"
              className="flex-1 md:flex-none text-center md:text-left"
              onClick={() => setMobileOpen(false)}
            >
              <span
                className="font-serif text-2xl md:text-3xl font-light tracking-ultra-wide text-black"
                style={{ fontFamily: 'Cormorant Garamond, serif', letterSpacing: '0.3em' }}
              >
                MAISON
              </span>
              <span className="block text-xs tracking-widest text-gold-500 font-medium -mt-1"
                style={{ letterSpacing: '0.25em' }}
              >
                PREMIER HOMME
              </span>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center space-x-8 flex-1 justify-center">
              {NAV_LINKS.map(link => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `nav-link ${isActive ? 'text-black border-b border-gold-500 pb-0.5' : ''}`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>

            {/* Action Icons */}
            <div className="flex items-center gap-3 md:gap-4">
              {/* Search */}
              <button
                className="p-2 text-gray-700 hover:text-black transition-colors"
                onClick={() => setSearchOpen(!searchOpen)}
                aria-label="Search"
              >
                <FiSearch size={18} />
              </button>

              {/* Wishlist */}
              <Link
                to="/wishlist"
                className="relative p-2 text-gray-700 hover:text-black transition-colors"
                aria-label="Wishlist"
              >
                <FiHeart size={18} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-gold-500 text-black text-xs w-4 h-4 rounded-full flex items-center justify-center font-medium leading-none">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link
                to="/cart"
                className="relative p-2 text-gray-700 hover:text-black transition-colors"
                aria-label="Cart"
              >
                <FiShoppingBag size={18} />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-black text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-medium leading-none">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Search Bar */}
          {searchOpen && (
            <div className="pb-4 border-t border-gray-100 pt-3 animate-fade-in">
              <form onSubmit={handleSearch} className="flex items-center max-w-md mx-auto gap-3">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  autoFocus
                  className="flex-1 border-b border-black bg-transparent text-sm py-2 px-0 outline-none placeholder:text-gray-400 tracking-wide"
                />
                <button type="submit" className="text-xs tracking-widest uppercase font-medium text-black hover:text-gold-500 transition-colors">
                  Search
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 overflow-hidden ${
            mobileOpen ? 'max-h-96 border-t border-gray-100' : 'max-h-0'
          }`}
        >
          <div className="px-6 py-4 bg-white flex flex-col gap-4">
            {NAV_LINKS.map(link => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `nav-link py-2 ${isActive ? 'text-black' : 'text-gray-600'}`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <div className="flex gap-6 pt-2 border-t border-gray-100">
              <Link to="/wishlist" onClick={() => setMobileOpen(false)} className="nav-link flex items-center gap-2">
                <FiHeart size={16} /> Wishlist {wishlistCount > 0 && `(${wishlistCount})`}
              </Link>
              <Link to="/cart" onClick={() => setMobileOpen(false)} className="nav-link flex items-center gap-2">
                <FiShoppingBag size={16} /> Cart {cartCount > 0 && `(${cartCount})`}
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
