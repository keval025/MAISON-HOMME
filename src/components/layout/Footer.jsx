import { Link } from 'react-router-dom';
import { FiInstagram, FiTwitter, FiFacebook, FiYoutube, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      {/* Newsletter */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <p className="text-xs tracking-widest uppercase text-gold-500 mb-3 font-medium">Exclusive Access</p>
          <h3 className="font-serif text-3xl md:text-4xl font-light mb-4" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Join the Maison Circle
          </h3>
          <p className="text-gray-400 text-sm mb-8 max-w-md mx-auto">
            Subscribe to receive exclusive offers, early access to new collections, and style inspiration.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 bg-transparent border border-gray-700 text-white placeholder:text-gray-500 px-5 py-3 text-sm focus:outline-none focus:border-gold-500 transition-colors"
            />
            <button
              type="submit"
              className="bg-gold-500 text-black px-8 py-3 text-xs tracking-widest uppercase font-medium hover:bg-gold-600 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <span className="font-serif text-3xl font-light tracking-widest" style={{ fontFamily: 'Cormorant Garamond, serif', letterSpacing: '0.3em' }}>
                MAISON
              </span>
              <span className="block text-xs tracking-widest text-gold-500 mt-1" style={{ letterSpacing: '0.25em' }}>
                PREMIER HOMME
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Crafted for the discerning gentleman. Premium men's fashion that blends timeless elegance with modern sophistication.
            </p>
            <div className="flex items-center gap-4">
              {[
                { icon: FiInstagram, href: '#' },
                { icon: FiTwitter, href: '#' },
                { icon: FiFacebook, href: '#' },
                { icon: FiYoutube, href: '#' },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="text-gray-500 hover:text-gold-500 transition-colors"
                  aria-label="Social media"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="text-xs tracking-widest uppercase font-medium mb-6 text-gray-300">Shop</h4>
            <ul className="space-y-3">
              {[
                { label: 'New Arrivals', path: '/shop?category=new' },
                { label: 'Shirts', path: '/categories/shirts' },
                { label: 'T-Shirts', path: '/categories/t-shirts' },
                { label: 'Blazers', path: '/categories/blazers' },
                { label: 'Jeans', path: '/categories/jeans' },
                { label: 'Trousers', path: '/categories/trousers' },
              ].map(link => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-gray-400 hover:text-gold-500 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-xs tracking-widest uppercase font-medium mb-6 text-gray-300">Company</h4>
            <ul className="space-y-3">
              {[
                { label: 'About Us', path: '/about' },
                { label: 'Contact', path: '/contact' },
                { label: 'Careers', path: '#' },
                { label: 'Press', path: '#' },
                { label: 'Store Locator', path: '#' },
                { label: 'Sustainability', path: '#' },
              ].map(link => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-sm text-gray-400 hover:text-gold-500 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xs tracking-widest uppercase font-medium mb-6 text-gray-300">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <FiMapPin size={16} className="text-gold-500 mt-0.5 shrink-0" />
                <span>14, Fashion Street, Connaught Place, New Delhi – 110001</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <FiPhone size={16} className="text-gold-500 shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <FiMail size={16} className="text-gold-500 shrink-0" />
                <span>care@maisonhomme.com</span>
              </li>
            </ul>
            <div className="mt-6 border border-gray-800 p-4">
              <p className="text-xs text-gray-500 uppercase tracking-widest font-medium mb-2">Store Hours</p>
              <p className="text-sm text-gray-400">Mon – Sat: 10am – 9pm</p>
              <p className="text-sm text-gray-400">Sunday: 11am – 7pm</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} Maison Premier Homme. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {['Privacy Policy', 'Terms of Service', 'Returns & Exchanges'].map(item => (
              <a key={item} href="#" className="text-xs text-gray-600 hover:text-gold-500 transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
