# MAISON Premier Homme — Premium Men's Fashion Website

A complete, production-ready frontend for a luxury men's clothing brand, built with React.js, Vite, Tailwind CSS, and Axios.

---

## 🚀 Quick Start

### Prerequisites
- Node.js >= 16.x
- npm >= 8.x

### Installation & Run

```bash
# Clone / extract the project
cd menswear

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

App runs at → `http://localhost:5173`

---

## 📁 Project Structure

```
menswear/
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── src/
    ├── main.jsx                     # Entry point
    ├── App.jsx                      # Root component with routing
    ├── index.css                    # Global styles + Tailwind directives
    │
    ├── components/
    │   ├── common/
    │   │   ├── Button.jsx           # Reusable button (5 variants)
    │   │   ├── Loader.jsx           # Loading spinner
    │   │   └── CategoryFilter.jsx   # Filter tabs component
    │   │
    │   ├── layout/
    │   │   ├── Navbar.jsx           # Sticky navbar with mobile menu
    │   │   └── Footer.jsx           # Full footer with newsletter
    │   │
    │   ├── home/
    │   │   └── HeroSection.jsx      # Auto-sliding hero carousel
    │   │
    │   ├── shop/
    │   │   ├── ProductCard.jsx      # Product card with hover effects
    │   │   └── ProductGrid.jsx      # Responsive product grid
    │   │
    │   ├── cart/
    │   │   └── CartItem.jsx         # Cart item with qty controls
    │   │
    │   └── wishlist/
    │       └── WishlistItem.jsx     # Wishlist item component
    │
    ├── pages/
    │   ├── HomePage.jsx             # Landing page with all sections
    │   ├── ShopPage.jsx             # All products with filtering/sorting
    │   ├── ProductDetailsPage.jsx   # Full product detail view
    │   ├── CategoriesPage.jsx       # Category gallery page
    │   ├── CategoryPage.jsx         # Products filtered by category
    │   ├── CartPage.jsx             # Shopping cart with summary
    │   ├── WishlistPage.jsx         # Saved items
    │   ├── AboutPage.jsx            # Brand story, team, timeline
    │   ├── ContactPage.jsx          # Contact form + store locations
    │   └── NotFoundPage.jsx         # 404 error page
    │
    ├── context/
    │   ├── CartContext.jsx          # Cart state management (Context + useReducer)
    │   └── WishlistContext.jsx      # Wishlist state (Context + useReducer)
    │
    ├── services/
    │   ├── apiClient.js             # Axios instance with interceptors
    │   └── productService.js        # All API calls (GET /products, etc.)
    │
    ├── hooks/
    │   ├── useProducts.js           # Fetch all/category products
    │   └── useProduct.js            # Fetch single product by ID
    │
    └── utils/
        └── helpers.js               # Utility functions
```

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **React 18** | UI library |
| **Vite** | Build tool & dev server |
| **Tailwind CSS** | Utility-first styling |
| **React Router DOM v6** | Client-side routing |
| **Axios** | HTTP client for API calls |
| **Context API + useReducer** | Global state management |
| **React Icons** | Icon library (Feather Icons) |

---

## 🔌 API Integration

Uses **FakeStore API** (`https://fakestoreapi.com`) as the data source.

### Endpoints

```
GET /products/category/men's%20clothing  → All products
GET /products/:id                        → Single product
```

### Service Layer (`src/services/productService.js`)

```js
productService.getProducts()              // GET /api/products
productService.getProductById(id)         // GET /api/products/:id
productService.getProductsByCategory(cat) // GET /api/products?category=...
productService.getCategories()            // GET /api/categories
productService.getFeaturedProducts()      // Curated 8 products for homepage
productService.getNewArrivals()           // Latest 4 products
```

Products are enriched with:
- Premium Unsplash fashion images
- Indian Rupee pricing (converted & scaled)
- Size arrays, color options
- Material & fit information
- Badge labels (New / Sale)
- Review counts

---

## 🎨 Design System

### Color Palette
```
Black     → #000000   (primary text, buttons)
White     → #FFFFFF   (backgrounds)
Cream     → #F5F0E8   (section backgrounds)
Gold      → #D4AF37   (accents, highlights)
Charcoal  → #1a1a1a   (dark text)
```

### Typography
- **Display/Headers:** Cormorant Garamond (Google Fonts) — elegant serif
- **Body/UI:** Inter — clean sans-serif

### Brand Inspiration
Zara · Louis Philippe · Raymond · H&M

---

## 📄 Pages

| Route | Page | Description |
|---|---|---|
| `/` | Home | Hero, categories, featured, new arrivals, testimonials |
| `/shop` | Shop | All products, search, category filter, sort |
| `/product/:id` | Product Detail | Images, size/color selector, add to cart, reviews |
| `/categories` | Categories | Visual category gallery |
| `/categories/:slug` | Category | Products filtered by category |
| `/cart` | Cart | Item list, quantities, coupon code, order summary |
| `/wishlist` | Wishlist | Saved products |
| `/about` | About | Brand story, timeline, team, stats |
| `/contact` | Contact | Form, store locations |
| `*` | 404 | Not found page |

---

## ✨ Features

- **Add to Cart** with size & color selection, persistent via localStorage
- **Add to Wishlist** with toggle, persistent via localStorage
- **Move to Cart** from wishlist
- **Quantity control** in cart (+ / −)
- **Remove from cart/wishlist**
- **Clear cart/wishlist**
- **Coupon code** (try: `MAISON10`)
- **Category filtering** (Shirts, T-Shirts, Blazers, Jeans, Trousers)
- **Search** with URL params
- **Sort** by price, rating, newest
- **Hero carousel** with auto-slide
- **Sticky navbar** with scroll detection
- **Responsive mobile menu**
- **Loading states** per page/section
- **Error states** with fallbacks
- **404 page**
- **Product tabs** (Description, Details, Reviews)
- **Related products**
- **Breadcrumb navigation**
- **Cart badge** with count
- **Wishlist badge** with count

---

## 🗝️ Key Implementation Notes

### Cart & Wishlist Persistence
Data is stored in `localStorage` so it persists across page refreshes.

### Cart Item ID
Cart uses a composite key `productId-size-color` to allow the same product in different sizes/colors as separate entries.

### Image Strategy
FakeStore API product images are replaced with high-quality Unsplash fashion photos. Each product gets a primary and hover image for the card flip effect.

### Currency
All prices are displayed in Indian Rupees (₹) and converted from USD at ~3.5x multiplier + base offset.

---

## 📦 Available Scripts

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run preview  # Preview prod build
```

---

## 📝 Customization

1. **Brand name**: Search & replace `MAISON` / `Maison` throughout
2. **Colors**: Edit `tailwind.config.js` → `theme.extend.colors`
3. **API**: Replace `apiClient.js` baseURL with your own backend
4. **Images**: Update `PREMIUM_IMAGES` array in `productService.js`
5. **Fonts**: Change Google Fonts link in `index.html`

---

*Built with craftsmanship for the modern developer.*
