import ProductCard from './ProductCard';
import Loader from '../common/Loader';

const ProductGrid = ({ products, loading, error, columns = 4 }) => {
  if (loading) return <Loader text="Curating collection..." />;

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-400 text-sm mb-4">Unable to load products at this time.</p>
        <p className="text-xs text-gray-300">{error}</p>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="font-serif text-2xl text-gray-300 mb-3" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
          No products found
        </p>
        <p className="text-sm text-gray-400">Try a different category or search term.</p>
      </div>
    );
  }

  const gridCols = {
    2: 'grid-cols-2 lg:grid-cols-2',
    3: 'grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div className={`grid ${gridCols[columns] || 'grid-cols-2 lg:grid-cols-4'} gap-6 md:gap-8`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
