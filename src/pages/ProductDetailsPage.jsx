import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiHeart, FiShoppingBag, FiChevronRight, FiShare2, FiTruck, FiRefreshCw, FiShield } from 'react-icons/fi';
import { productService } from '../services/productService';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import Loader from '../components/common/Loader';
import ProductGrid from '../components/shop/ProductGrid';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('Black');
  const [activeTab, setActiveTab] = useState('description');
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        window.scrollTo(0, 0);
        const [prod, all] = await Promise.all([
          productService.getProductById(id),
          productService.getProducts(),
        ]);
        setProduct(prod);
        setRelatedProducts(all.filter(p => p.id !== prod.id && p.category === prod.category).slice(0, 4));
      } catch (err) {
        setError('Product not found');
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [id]);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) addToCart(product, selectedSize, selectedColor);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2500);
  };

  if (loading) return <Loader fullScreen text="Loading product..." />;
  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 text-sm mb-4">{error || 'Product not found'}</p>
          <Link to="/shop" className="btn-primary inline-block">Back to Shop</Link>
        </div>
      </div>
    );
  }

  const inWishlist = isInWishlist(product.id);

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-cream-100 py-4">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex items-center gap-2 text-xs text-gray-500">
            <Link to="/" className="hover:text-black transition-colors">Home</Link>
            <FiChevronRight size={12} />
            <Link to="/shop" className="hover:text-black transition-colors">Shop</Link>
            <FiChevronRight size={12} />
            <Link to={`/categories/${product.category}`} className="hover:text-black transition-colors capitalize">
              {product.categoryName}
            </Link>
            <FiChevronRight size={12} />
            <span className="text-black line-clamp-1">{product.title}</span>
          </nav>
        </div>
      </div>

      {/* Product Detail */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">

          {/* Image */}
          <div className="space-y-4">
            <div className="aspect-[3/4] bg-cream-100 overflow-hidden img-zoom">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-3">
              {[product.image, product.hoverImage, product.image, product.hoverImage].map((img, i) => (
                <div key={i} className="aspect-square bg-cream-100 overflow-hidden cursor-pointer border-2 border-transparent hover:border-gold-500 transition-colors">
                  <img src={img} alt={`View ${i + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="lg:py-4">
            {/* Category & Badges */}
            <div className="flex items-center gap-3 mb-3">
              <Link to={`/categories/${product.category}`} className="text-xs text-gold-500 tracking-widest uppercase font-medium hover:text-gold-600 transition-colors">
                {product.categoryName}
              </Link>
              {product.badge && (
                <span className={`text-xs tracking-widest uppercase font-medium px-2 py-0.5 ${product.badge === 'Sale' ? 'bg-red-600 text-white' : 'bg-black text-white'}`}>
                  {product.badge}
                </span>
              )}
              {!product.inStock && (
                <span className="text-xs tracking-widest uppercase font-medium px-2 py-0.5 bg-gray-400 text-white">
                  Out of Stock
                </span>
              )}
            </div>

            <h1 className="font-serif text-3xl md:text-4xl font-light text-black mb-4 leading-tight" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              {product.title}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`text-sm ${i < Math.floor(product.rating?.rate || 4) ? 'text-gold-500' : 'text-gray-300'}`}>★</span>
                ))}
              </div>
              <span className="text-xs text-gray-500">({product.reviews} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-8 pb-8 border-b border-gray-100">
              <span className="font-serif text-3xl font-light text-black" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                ₹{product.price.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
              </span>
              {product.badge === 'Sale' && (
                <span className="text-gray-400 line-through text-lg">
                  ₹{(product.price * 1.3).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                </span>
              )}
              <span className="text-xs text-gray-400">Incl. all taxes</span>
            </div>

            {/* Color */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs tracking-widest uppercase font-medium">Color</span>
                <span className="text-xs text-gray-500">{selectedColor}</span>
              </div>
              <div className="flex gap-3">
                {(product.colors || ['Black', 'White', 'Navy', 'Beige']).map(color => {
                  const colorMap = { Black: '#1a1a1a', White: '#f5f0e8', Navy: '#1e3a5f', Beige: '#c8b8a2' };
                  return (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ${selectedColor === color ? 'border-gold-500 scale-110' : 'border-transparent hover:border-gray-400'}`}
                      style={{ backgroundColor: colorMap[color] || '#888' }}
                      title={color}
                    />
                  );
                })}
              </div>
            </div>

            {/* Size */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs tracking-widest uppercase font-medium">Size</span>
                <button className="text-xs text-gold-500 underline">Size Guide</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {(product.sizes || ['XS', 'S', 'M', 'L', 'XL', 'XXL']).map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-10 text-xs font-medium transition-all duration-200 border ${
                      selectedSize === size
                        ? 'bg-black text-white border-black'
                        : 'bg-white text-black border-gray-300 hover:border-black'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <span className="text-xs tracking-widest uppercase font-medium block mb-3">Quantity</span>
              <div className="flex items-center border border-gray-300 w-fit">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-black">−</button>
                <span className="w-12 text-center text-sm font-medium">{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)} className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-black">+</button>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex gap-4 mb-8">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock || addedToCart}
                className={`flex-1 py-4 text-xs tracking-widest uppercase font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                  addedToCart ? 'bg-gold-500 text-black' : 'bg-black text-white hover:bg-gold-500 hover:text-black'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <FiShoppingBag size={15} />
                {!product.inStock ? 'Out of Stock' : addedToCart ? '✓ Added to Bag' : 'Add to Bag'}
              </button>
              <button
                onClick={() => toggleWishlist(product)}
                className={`w-14 h-14 border flex items-center justify-center transition-all duration-300 ${
                  inWishlist ? 'bg-gold-500 border-gold-500 text-black' : 'border-gray-300 text-gray-600 hover:border-black hover:text-black'
                }`}
              >
                <FiHeart size={18} fill={inWishlist ? 'currentColor' : 'none'} />
              </button>
              <button className="w-14 h-14 border border-gray-300 flex items-center justify-center text-gray-600 hover:border-black hover:text-black transition-all duration-300">
                <FiShare2 size={16} />
              </button>
            </div>

            {/* Delivery Info */}
            <div className="space-y-3 border border-gray-100 p-5 bg-cream-50">
              {[
                { icon: FiTruck, text: 'Free delivery on orders above ₹2,999' },
                { icon: FiRefreshCw, text: 'Easy 30-day returns & exchanges' },
                { icon: FiShield, text: '100% authentic & quality guaranteed' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3 text-sm text-gray-600">
                  <Icon size={15} className="text-gold-500 shrink-0" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Product Tabs */}
        <div className="mt-16 border-t border-gray-100">
          <div className="flex gap-8 pt-8 mb-8 border-b border-gray-100">
            {['description', 'details', 'reviews'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 text-xs tracking-widest uppercase font-medium transition-all duration-200 border-b-2 ${
                  activeTab === tab ? 'border-black text-black' : 'border-transparent text-gray-400 hover:text-black'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="max-w-3xl">
            {activeTab === 'description' && (
              <div className="text-gray-600 leading-relaxed space-y-4">
                <p>{product.description}</p>
                <p>Experience the pinnacle of menswear craftsmanship with this exceptional piece from our premium collection. Designed for the discerning gentleman who appreciates quality and style in equal measure.</p>
              </div>
            )}
            {activeTab === 'details' && (
              <div className="grid grid-cols-2 gap-4">
                {[
                  ['Material', product.material],
                  ['Fit', product.fit],
                  ['Care', 'Dry Clean Recommended'],
                  ['Origin', 'Made in India'],
                  ['SKU', `MSN-${product.id}-${product.category.toUpperCase()}`],
                  ['Category', product.categoryName],
                ].map(([label, value]) => (
                  <div key={label} className="border-b border-gray-100 pb-3">
                    <span className="text-xs text-gray-400 uppercase tracking-widest">{label}</span>
                    <p className="text-sm font-medium text-black mt-0.5">{value}</p>
                  </div>
                ))}
              </div>
            )}
            {activeTab === 'reviews' && (
              <div className="space-y-6">
                {[
                  { name: 'Aakash R.', rating: 5, text: 'Exceptional quality! The fabric is incredibly soft and the fit is perfect.' },
                  { name: 'Rohan M.', rating: 4, text: 'Great product, well crafted. Delivery was prompt. Highly recommend.' },
                  { name: 'Priya S.', rating: 5, text: 'Bought for my husband, he absolutely loves it. Will definitely order again!' },
                ].map(r => (
                  <div key={r.name} className="border-b border-gray-100 pb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sm">{r.name}</span>
                      <div className="flex">{[...Array(5)].map((_, i) => <span key={i} className={`text-xs ${i < r.rating ? 'text-gold-500' : 'text-gray-300'}`}>★</span>)}</div>
                    </div>
                    <p className="text-sm text-gray-600">{r.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <div className="text-center mb-10">
              <p className="section-subtitle mb-3">You May Also Like</p>
              <h2 className="section-title">Related Products</h2>
            </div>
            <ProductGrid products={relatedProducts} loading={false} columns={4} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailsPage;
