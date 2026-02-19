import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const SLIDES = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=1600&q=85',
    subtitle: 'New Collection 2025',
    title: 'Elegance\nRedefined',
    description: 'Discover our curated collection of premium menswear, crafted for the modern gentleman.',
    cta: 'Explore Collection',
    link: '/shop',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1600&q=85',
    subtitle: 'Signature Blazers',
    title: 'Dressed\nTo Impress',
    description: 'Tailored to perfection. Our exclusive blazer collection defines contemporary luxury.',
    cta: 'Shop Blazers',
    link: '/categories/blazers',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=1600&q=85',
    subtitle: 'Premium Essentials',
    title: 'The Art\nOf Style',
    description: 'Timeless pieces for every occasion, from the boardroom to the weekend.',
    cta: 'View All',
    link: '/shop',
  },
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTransitioning(true);
      setTimeout(() => {
        setCurrent(prev => (prev + 1) % SLIDES.length);
        setTransitioning(false);
      }, 500);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = SLIDES[current];

  return (
    <section className="relative h-[90vh] min-h-[600px] overflow-hidden">
      {/* Background */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 ${transitioning ? 'opacity-0' : 'opacity-100'}`}
      >
        <img
          src={slide.image}
          alt="Hero"
          className="w-full h-full object-cover"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div
        className={`relative z-10 h-full flex items-center max-w-7xl mx-auto px-6 transition-all duration-700 ${
          transitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
        }`}
      >
        <div className="max-w-xl">
          <p className="text-gold-400 text-xs tracking-widest uppercase font-medium mb-4">
            {slide.subtitle}
          </p>
          <h1
            className="text-white font-light mb-6 leading-none"
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(3rem, 8vw, 6rem)',
              whiteSpace: 'pre-line',
            }}
          >
            {slide.title}
          </h1>
          <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-10 max-w-md">
            {slide.description}
          </p>
          <div className="flex items-center gap-5">
            <Link
              to={slide.link}
              className="bg-white text-black px-10 py-4 text-xs tracking-widest uppercase font-medium hover:bg-gold-500 transition-all duration-300"
            >
              {slide.cta}
            </Link>
            <Link
              to="/about"
              className="border border-white text-white px-10 py-4 text-xs tracking-widest uppercase font-medium hover:bg-white hover:text-black transition-all duration-300"
            >
              Our Story
            </Link>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => { setTransitioning(true); setTimeout(() => { setCurrent(i); setTransitioning(false); }, 400); }}
            className={`transition-all duration-300 ${
              i === current ? 'w-8 h-0.5 bg-gold-400' : 'w-4 h-0.5 bg-white/50'
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 right-8 z-10 hidden md:flex flex-col items-center gap-2">
        <span className="text-white/60 text-xs tracking-widest uppercase" style={{ writingMode: 'vertical-rl' }}>
          Scroll
        </span>
        <div className="w-px h-12 bg-white/30 relative overflow-hidden">
          <div className="absolute top-0 w-full bg-gold-400 animate-pulse" style={{ height: '40%' }} />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
