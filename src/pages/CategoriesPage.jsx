import { Link } from 'react-router-dom';

const CATEGORIES = [
  { name: 'Shirts', slug: 'shirts', image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80', count: '24', description: 'From formal to casual — the perfect shirt for every occasion.' },
  { name: 'T-Shirts', slug: 't-shirts', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80', count: '18', description: 'Premium basics and graphic tees crafted for comfort and style.' },
  { name: 'Blazers', slug: 'blazers', image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80', count: '12', description: 'Tailored blazers that make a lasting impression.' },
  { name: 'Jeans', slug: 'jeans', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80', count: '20', description: 'Premium denim in every cut, fit, and wash.' },
  { name: 'Trousers', slug: 'trousers', image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=80', count: '16', description: 'Classic and contemporary trousers for every wardrobe.' },
];

const CategoriesPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-cream-100 py-16 text-center">
        <p className="section-subtitle mb-3">Explore</p>
        <h1 className="section-title">Our Collections</h1>
        <p className="text-gray-500 text-sm mt-4 max-w-md mx-auto">
          Curated categories of premium menswear for every occasion and lifestyle.
        </p>
      </div>

      {/* Featured Category Banner */}
      <div className="relative h-72 md:h-96 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=1600&q=80"
          alt="Featured"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
        <div className="absolute inset-0 flex items-center px-12 md:px-20">
          <div className="text-white max-w-md">
            <p className="text-gold-400 text-xs tracking-widest uppercase mb-3">New Season</p>
            <h2 className="font-serif text-4xl md:text-5xl font-light mb-4" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              Autumn / Winter<br />2025 Collection
            </h2>
            <Link
              to="/shop"
              className="bg-white text-black px-8 py-3 text-xs tracking-widest uppercase font-medium hover:bg-gold-500 transition-all duration-300 inline-block"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>

      {/* Category Grid */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat, i) => (
            <Link
              key={cat.slug}
              to={`/categories/${cat.slug}`}
              className={`group relative overflow-hidden ${i === 0 ? 'md:col-span-2 aspect-[16/7]' : 'aspect-[4/5]'}`}
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <p className="text-gold-400 text-xs tracking-widest uppercase mb-2">{cat.count} Styles</p>
                <h3 className="font-serif text-3xl md:text-4xl font-light text-white mb-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                  {cat.name}
                </h3>
                <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 max-w-xs">
                  {cat.description}
                </p>
                <span className="inline-block mt-4 text-white text-xs tracking-widest uppercase font-medium border-b border-gold-400 pb-0.5 group-hover:border-white transition-colors">
                  Explore →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;
