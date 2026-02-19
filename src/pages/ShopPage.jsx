import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductGrid from '../components/shop/ProductGrid';
import CategoryFilter from '../components/common/CategoryFilter';
import { productService } from '../services/productService';
import { FiSliders } from 'react-icons/fi';

const SORT_OPTIONS = [
  { value: 'default', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'newest', label: 'Newest' },
];

const ShopPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('default');

  const categoryParam = searchParams.get('category') || 'all';
  const searchQuery = searchParams.get('search') || '';

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await productService.getProducts();
        setProducts(data);
      } catch (err) {
        setError('Failed to load products. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  useEffect(() => {
    let result = [...products];

    // Category filter
    if (categoryParam && categoryParam !== 'all') {
      result = result.filter(p => p.category === categoryParam);
    }

    // Search filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.categoryName.toLowerCase().includes(q)
      );
    }

    // Sort
    switch (sortBy) {
      case 'price-asc': result.sort((a, b) => a.price - b.price); break;
      case 'price-desc': result.sort((a, b) => b.price - a.price); break;
      case 'rating': result.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0)); break;
      case 'newest': result.reverse(); break;
    }

    setFilteredProducts(result);
  }, [products, categoryParam, searchQuery, sortBy]);

  const handleCategoryChange = (cat) => {
    const params = new URLSearchParams(searchParams);
    if (cat === 'all') params.delete('category');
    else params.set('category', cat);
    setSearchParams(params);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <div className="bg-cream-100 py-16 text-center">
        <p className="section-subtitle mb-3">Our Collection</p>
        <h1 className="section-title mb-4">
          {searchQuery ? `Search: "${searchQuery}"` : 'Shop All'}
        </h1>
        <p className="text-gray-500 text-sm">
          {filteredProducts.length} {filteredProducts.length === 1 ? 'piece' : 'pieces'} curated for you
        </p>
      </div>

      {/* Shop Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Filters Bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-10">
          <CategoryFilter activeCategory={categoryParam} onCategoryChange={handleCategoryChange} />

          {/* Sort */}
          <div className="flex items-center gap-3 shrink-0">
            <FiSliders size={15} className="text-gray-400" />
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="text-xs tracking-wider uppercase text-black border-b border-gray-300 bg-transparent py-1 pr-6 focus:outline-none focus:border-black cursor-pointer"
            >
              {SORT_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Search indicator */}
        {searchQuery && !loading && (
          <div className="mb-8 p-4 bg-cream-100 border border-cream-300 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing results for <span className="font-medium">"{searchQuery}"</span>
            </p>
            <button
              onClick={() => { const p = new URLSearchParams(searchParams); p.delete('search'); setSearchParams(p); }}
              className="text-xs tracking-widest uppercase font-medium text-black hover:text-gold-500 transition-colors"
            >
              Clear
            </button>
          </div>
        )}

        <ProductGrid products={filteredProducts} loading={loading} error={error} columns={4} />
      </div>
    </div>
  );
};

export default ShopPage;
