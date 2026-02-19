import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '../components/home/HeroSection';
import ProductGrid from '../components/shop/ProductGrid';
import { productService } from '../services/productService';

const CATEGORIES = [
  { name: 'Shirts', slug: 'shirts', image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&q=80', count: '24 Styles' },
  { name: 'T-Shirts', slug: 't-shirts', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80', count: '18 Styles' },
  { name: 'Blazers', slug: 'blazers', image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=80', count: '12 Styles' },
  { name: 'Jeans', slug: 'jeans', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&q=80', count: '20 Styles' },
];

const PROMISES = [
  { icon: '✦', title: 'Premium Fabrics', desc: 'Only the finest materials sourced globally' },
  { icon: '✦', title: 'Master Craftsmanship', desc: 'Handcrafted with decades of expertise' },
  { icon: '✦', title: 'Perfect Fit', desc: 'Tailored to complement the modern silhouette' },
  { icon: '✦', title: 'Timeless Design', desc: 'Classics that transcend seasonal trends' },
];

const HomePage = () => {
  const [featured, setFeatured] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const [feat, arrivals] = await Promise.all([
          productService.getFeaturedProducts(),
          productService.getNewArrivals(),
        ]);
        setFeatured(feat);
        setNewArrivals(arrivals);
      } catch (err) {
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <HeroSection />

      {/* Brand Promise Bar */}
      <section className="bg-black text-white py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x md:divide-gray-800">
            {PROMISES.map((item) => (
              <div key={item.title} className="text-center px-6">
                <span className="text-gold-500 text-lg mb-2 block">{item.icon}</span>
                <h4 className="text-xs tracking-widest uppercase font-medium mb-1">{item.title}</h4>
                <p className="text-gray-500 text-xs">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-cream-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="section-subtitle mb-3">Explore</p>
            <h2 className="section-title">Shop by Category</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                to={`/categories/${cat.slug}`}
                className="group relative overflow-hidden aspect-[3/4] bg-gray-100"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <p className="text-xs text-gold-400 tracking-widest mb-1">{cat.count}</p>
                  <h3 className="font-serif text-xl font-light" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                    {cat.name}
                  </h3>
                </div>
                <div className="absolute inset-0 border border-white/0 group-hover:border-white/30 transition-all duration-500" />
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              to="/categories"
              className="border border-black text-black px-10 py-3 text-xs tracking-widest uppercase font-medium hover:bg-black hover:text-white transition-all duration-300 inline-block"
            >
              View All Categories
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="section-subtitle mb-3">Curated For You</p>
              <h2 className="section-title">Featured Collection</h2>
            </div>
            <Link
              to="/shop"
              className="hidden md:block text-xs tracking-widest uppercase font-medium text-black hover:text-gold-500 transition-colors border-b border-black hover:border-gold-500 pb-0.5"
            >
              View All
            </Link>
          </div>
          <ProductGrid products={featured} loading={loading} error={error} columns={4} />
          <div className="text-center mt-10 md:hidden">
            <Link to="/shop" className="btn-outline inline-block">View All Products</Link>
          </div>
        </div>
      </section>

      {/* Brand Story Banner */}
      <section className="relative h-96 md:h-[500px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=1600&q=80"
          alt="Brand Story"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 flex items-center justify-center text-center text-white px-6">
          <div className="max-w-2xl">
            <p className="text-gold-400 text-xs tracking-widest uppercase mb-4">Since 1998</p>
            <h2
              className="font-light text-4xl md:text-6xl mb-6"
              style={{ fontFamily: 'Cormorant Garamond, serif' }}
            >
              Crafted With Purpose, Worn With Pride
            </h2>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-8">
              Over two decades of excellence in men's fashion. Our atelier blends heritage craftsmanship with contemporary design.
            </p>
            <Link
              to="/about"
              className="bg-gold-500 text-black px-10 py-4 text-xs tracking-widest uppercase font-medium hover:bg-gold-400 transition-all duration-300 inline-block"
            >
              Our Heritage
            </Link>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-20 bg-cream-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="section-subtitle mb-3">Just In</p>
            <h2 className="section-title">New Arrivals</h2>
          </div>
          <ProductGrid products={newArrivals} loading={loading} error={error} columns={4} />
          <div className="text-center mt-10">
            <Link to="/shop" className="btn-primary inline-block">Shop All New Arrivals</Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-gold-500 text-xs tracking-widest uppercase mb-3">Testimonials</p>
            <h2 className="font-serif text-4xl font-light" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              What Our Clients Say
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Arjun Mehta', role: 'CEO, TechVentures', text: 'Maison has completely transformed my wardrobe. The quality is unmatched and every piece feels truly premium.' },
              { name: 'Vikram Singh', role: 'Senior Partner, Law Firm', text: "The blazers from Maison are exceptional. They've become my go-to for all important meetings and events." },
              { name: 'Rajiv Kumar', role: 'Creative Director', text: 'Finally, a brand that understands the modern Indian gentleman. Impeccable style, superior fabric, worth every rupee.' },
            ].map((t) => (
              <div key={t.name} className="border border-gray-800 p-8 hover:border-gold-500 transition-colors duration-300">
                <div className="text-gold-500 text-2xl mb-4">"</div>
                <p className="text-gray-300 text-sm leading-relaxed mb-6 italic">{t.text}</p>
                <div>
                  <p className="font-medium text-white text-sm">{t.name}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
