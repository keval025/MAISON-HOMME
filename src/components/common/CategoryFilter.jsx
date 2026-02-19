const CATEGORIES = [
  { slug: 'all', name: 'All Items' },
  { slug: 'shirts', name: 'Shirts' },
  { slug: 't-shirts', name: 'T-Shirts' },
  { slug: 'blazers', name: 'Blazers' },
  { slug: 'jeans', name: 'Jeans' },
  { slug: 'trousers', name: 'Trousers' },
];

const CategoryFilter = ({ activeCategory, onCategoryChange }) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-1 mb-12">
      {CATEGORIES.map((cat) => (
        <button
          key={cat.slug}
          onClick={() => onCategoryChange(cat.slug)}
          className={`px-6 py-2 text-xs tracking-widest uppercase font-medium transition-all duration-300 ${
            activeCategory === cat.slug
              ? 'bg-black text-white'
              : 'bg-transparent text-gray-500 hover:text-black border border-transparent hover:border-gray-300'
          }`}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
