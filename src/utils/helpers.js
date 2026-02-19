/**
 * Format price to Indian Rupees
 */
export const formatPrice = (price) => {
  return `₹${price.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;
};

/**
 * Truncate text to a given length
 */
export const truncateText = (text, maxLength = 60) => {
  if (!text) return '';
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};

/**
 * Debounce a function call
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Generate star rating array
 */
export const getStarRating = (rating = 0, maxStars = 5) => {
  return Array.from({ length: maxStars }, (_, i) => ({
    filled: i < Math.floor(rating),
    half: i === Math.floor(rating) && rating % 1 >= 0.5,
    empty: i >= Math.ceil(rating),
  }));
};

/**
 * Scroll to top of page
 */
export const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
