import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="text-center max-w-lg">
        <p className="font-serif text-[120px] md:text-[180px] font-light text-cream-200 leading-none select-none"
           style={{ fontFamily: 'Cormorant Garamond, serif' }}>
          404
        </p>
        <div className="-mt-8 relative z-10">
          <p className="text-gold-500 text-xs tracking-widest uppercase font-medium mb-4">Page Not Found</p>
          <h1 className="font-serif text-4xl md:text-5xl font-light text-black mb-6" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            This Page Has<br />Left The Building
          </h1>
          <p className="text-gray-500 text-sm leading-relaxed mb-10 max-w-sm mx-auto">
            The page you're looking for seems to have moved or doesn't exist. Let us guide you back to our collection.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/"
              className="bg-black text-white px-10 py-4 text-xs tracking-widest uppercase font-medium hover:bg-gold-500 hover:text-black transition-all duration-300"
            >
              Back to Home
            </Link>
            <Link
              to="/shop"
              className="border border-black text-black px-10 py-4 text-xs tracking-widest uppercase font-medium hover:bg-black hover:text-white transition-all duration-300"
            >
              Shop Collection
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
