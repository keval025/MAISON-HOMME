import apiClient from './apiClient';

// Map API categories to our brand categories
const CATEGORY_MAP = {
  "men's clothing": 'all',
};

const MENS_CATEGORIES = [
  { id: 1, name: 'Shirts', slug: 'shirts', image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&q=80' },
  { id: 2, name: 'T-Shirts', slug: 't-shirts', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80' },
  { id: 3, name: 'Blazers', slug: 'blazers', image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=80' },
  { id: 4, name: 'Jeans', slug: 'jeans', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&q=80' },
  { id: 5, name: 'Trousers', slug: 'trousers', image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&q=80' },
];

// Premium product images for men's clothing
const PREMIUM_IMAGES = [
  'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&q=80',
  'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&q=80',
  'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80',
  'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=80',
  'https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&q=80',
  'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&q=80',
  'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=600&q=80',
  'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&q=80',
  'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&q=80',
  'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=600&q=80',
  'https://images.unsplash.com/photo-1516826957135-700dedea698c?w=600&q=80',
  'https://images.unsplash.com/photo-1583846783214-7229a91b20ed?w=600&q=80',
  'https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?w=600&q=80',
  'https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=600&q=80',
  'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80',
  'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=80',
  'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=600&q=80',
  'https://images.unsplash.com/photo-1603344797033-f0f4f587ab60?w=600&q=80',
  'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=600&q=80',
  'https://images.unsplash.com/photo-1614093302611-8efc4abd4d5b?w=600&q=80',
];

const CATEGORY_SLUGS = ['shirts', 't-shirts', 'blazers', 'jeans', 'trousers'];

const enrichProduct = (product, index) => ({
  ...product,
  image: PREMIUM_IMAGES[index % PREMIUM_IMAGES.length],
  hoverImage: PREMIUM_IMAGES[(index + 5) % PREMIUM_IMAGES.length],
  category: CATEGORY_SLUGS[index % CATEGORY_SLUGS.length],
  categoryName: MENS_CATEGORIES[index % MENS_CATEGORIES.length].name,
  badge: index % 5 === 0 ? 'New' : index % 7 === 0 ? 'Sale' : null,
  originalPrice: product.price,
  price: parseFloat((product.price * 3.5 + 29.99).toFixed(2)),
  sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  colors: ['Black', 'White', 'Navy', 'Beige'],
  material: ['100% Premium Cotton', 'Italian Wool Blend', 'Linen Mix', 'Silk Blend'][index % 4],
  fit: ['Regular Fit', 'Slim Fit', 'Classic Fit', 'Relaxed Fit'][index % 4],
  reviews: Math.floor(Math.random() * 150) + 20,
  inStock: index % 8 !== 0,
});

export const productService = {
  // GET /api/products
  async getProducts() {
    const response = await apiClient.get('/products/category/men%27s%20clothing');
    return response.data.map(enrichProduct);
  },

  // GET /api/products/:id
  async getProductById(id) {
    const response = await apiClient.get(`/products/${id}`);
    return enrichProduct(response.data, parseInt(id));
  },

  // GET /api/products?category=shirts
  async getProductsByCategory(category) {
    const response = await apiClient.get('/products/category/men%27s%20clothing');
    const all = response.data.map(enrichProduct);
    if (!category || category === 'all') return all;
    return all.filter(p => p.category === category);
  },

  // GET /api/categories
  async getCategories() {
    return MENS_CATEGORIES;
  },

  // Featured products for homepage
  async getFeaturedProducts() {
    const response = await apiClient.get('/products/category/men%27s%20clothing');
    return response.data.slice(0, 8).map(enrichProduct);
  },

  // New arrivals
  async getNewArrivals() {
    const response = await apiClient.get('/products/category/men%27s%20clothing');
    return response.data.slice(0, 4).map((p, i) => enrichProduct(p, i + 10));
  },
};
