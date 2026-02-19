import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ProductGrid from '../components/shop/ProductGrid';
import { productService } from '../services/productService';
import { FiChevronRight } from 'react-icons/fi';

const CATEGORY_META = {
  shirts: {
    title: 'Shirts',
    subtitle: 'Refined Elegance',
    description: 'Discover our collection of premium shirts crafted from the finest fabrics for every occasion.',
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=1600&q=80',
  },
  't-shirts': {
    title: 'T-Shirts',
    subtitle: 'Casual Luxury',
    description: 'Premium casual wear that redefines comfort and style for the modern gentleman.',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1600&q=80',
  },
  blazers: {
    title: 'Blazers',
    subtitle: 'Sharp Tailoring',
    description: 'Impeccably tailored blazers that command respect in every room you enter.',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1600&q=80',
  },
  jeans: {
    title: 'Jeans',
    subtitle: 'Premium Denim',
    description: 'High-quality denim crafted for the perfect fit, from casual to smart casual.',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=1600&q=80',
  },
  trousers: {
    title: 'Trousers',
    subtitle: 'Sophisticated Style',
    description: 'Classic and contemporary trousers for every occasion and every style preference.',
    image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=1600&q=80',
  },
};

const ALL_CATEGORIES = [
  { slug: 'shirts', name: 'Shirts' },
  { slug: 't-shirts', name: 'T-Shirts' },
  { slug: 'blazers', name: 'Blazers' },
  { slug: 'jeans', name: 'Jeans' },
  { slug: 'trousers', name: 'Trousers' },
];

const CategoryPage = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const meta = CATEGORY_META[category] || {
    title: 'All Products',
    subtitle: 'Premium Collection',
    description: 'Explore our complete collection of premium menswear.',
    image: 'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=1600&q=80',
  };

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        window.scrollTo(0, 0);
        const data = await productService.getProductsByCategory(category);
        setProducts(data);
      } catch (err) {
        setError('Failed to load products.');
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, [category]);

  return (
    <div className="min-h-screen bg-white">
      {/* Category Hero */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img src={meta.image} alt={meta.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6">
          <p className="text-gold-400 text-xs tracking-widest uppercase mb-3 font-medium">{meta.subtitle}</p>
          <h1 className="font-serif text-5xl md:text-6xl font-light mb-4" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            {meta.title}
          </h1>
          <p className="text-gray-300 text-sm max-w-md">{meta.description}</p>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-cream-100 py-4">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex items-center gap-2 text-xs text-gray-500">
            <Link to="/" className="hover:text-black transition-colors">Home</Link>
            <FiChevronRight size={12} />
            <Link to="/categories" className="hover:text-black transition-colors">Categories</Link>
            <FiChevronRight size={12} />
            <span className="text-black">{meta.title}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Sub category navigation */}
        <div className="flex flex-wrap gap-3 mb-10 pb-10 border-b border-gray-100">
          {ALL_CATEGORIES.map(cat => (
            <Link
              key={cat.slug}
              to={`/categories/${cat.slug}`}
              className={`px-6 py-2 text-xs tracking-widest uppercase font-medium transition-all duration-300 ${
                category === cat.slug ? 'bg-black text-white' : 'border border-gray-300 text-gray-600 hover:border-black hover:text-black'
              }`}
            >
              {cat.name}
            </Link>
          ))}
        </div>

        {/* Product Count */}
        {!loading && (
          <p className="text-sm text-gray-500 mb-8">
            {products.length} {products.length === 1 ? 'piece' : 'pieces'} available
          </p>
        )}

        <ProductGrid products={products} loading={loading} error={error} columns={4} />
      </div>
    </div>
  );
};

export default CategoryPage;
