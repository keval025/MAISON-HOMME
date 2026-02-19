import { useState } from 'react';
import { FiMapPin, FiPhone, FiMail, FiClock, FiSend } from 'react-icons/fi';

const STORES = [
  { city: 'New Delhi', address: '14, Fashion Street, Connaught Place, New Delhi – 110001', phone: '+91 11 4567 8900', hours: 'Mon–Sat: 10AM–9PM, Sun: 11AM–7PM' },
  { city: 'Mumbai', address: 'Level 2, Palladium Mall, Lower Parel, Mumbai – 400013', phone: '+91 22 3456 7890', hours: 'Mon–Sat: 10AM–9PM, Sun: 11AM–8PM' },
  { city: 'Bangalore', address: '3rd Floor, UB City Mall, Vittal Mallya Road, Bangalore – 560001', phone: '+91 80 2345 6789', hours: 'Mon–Sat: 10AM–9PM, Sun: 11AM–7PM' },
];

const ContactPage = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Valid email required';
    if (!form.message.trim()) e.message = 'Message is required';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setSubmitted(true);
  };

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) setErrors(prev => ({ ...prev, [e.target.name]: '' }));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-cream-100 py-16 text-center">
        <p className="section-subtitle mb-3">Get In Touch</p>
        <h1 className="section-title">Contact Us</h1>
        <p className="text-gray-500 text-sm mt-4">We'd love to hear from you. Our team is always ready to assist.</p>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">

          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <p className="section-subtitle mb-4">Get In Touch</p>
              <h2 className="font-serif text-3xl font-light mb-6" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                We're Here<br />To Help
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed">
                Whether you need styling advice, want to place a corporate order, or have a query about your purchase — our dedicated team is at your service.
              </p>
            </div>

            <div className="space-y-6">
              {[
                { icon: FiMail, label: 'Email', value: 'care@maisonhomme.com' },
                { icon: FiPhone, label: 'Phone', value: '+91 98765 43210' },
                { icon: FiClock, label: 'Hours', value: 'Mon–Sat, 9AM to 7PM IST' },
                { icon: FiMapPin, label: 'HQ', value: 'New Delhi, India' },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="w-10 h-10 border border-gold-500 flex items-center justify-center shrink-0">
                    <Icon size={16} className="text-gold-500" />
                  </div>
                  <div>
                    <p className="text-xs tracking-widest uppercase font-medium text-gray-400 mb-0.5">{label}</p>
                    <p className="text-sm font-medium text-black">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social */}
            <div className="border-t border-gray-100 pt-8">
              <p className="text-xs tracking-widest uppercase font-medium mb-4 text-gray-400">Follow Us</p>
              <div className="flex gap-4">
                {['Instagram', 'Facebook', 'Twitter', 'YouTube'].map(s => (
                  <a key={s} href="#" className="text-xs tracking-widest uppercase text-gray-400 hover:text-gold-500 transition-colors font-medium">{s}</a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            {submitted ? (
              <div className="h-full flex items-center justify-center text-center py-20">
                <div>
                  <div className="w-16 h-16 bg-gold-500 flex items-center justify-center mx-auto mb-6">
                    <FiSend size={24} className="text-black" />
                  </div>
                  <h3 className="font-serif text-3xl font-light mb-4" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Message Received</h3>
                  <p className="text-gray-500 text-sm max-w-sm">
                    Thank you for reaching out. Our team will get back to you within 24 hours.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <p className="section-subtitle mb-6">Send a Message</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs tracking-widest uppercase font-medium mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      className={`w-full border-b bg-transparent py-3 text-sm outline-none focus:border-black transition-colors placeholder:text-gray-300 ${errors.name ? 'border-red-400' : 'border-gray-300'}`}
                      placeholder="Arjun Sharma"
                    />
                    {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-xs tracking-widest uppercase font-medium mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className={`w-full border-b bg-transparent py-3 text-sm outline-none focus:border-black transition-colors placeholder:text-gray-300 ${errors.email ? 'border-red-400' : 'border-gray-300'}`}
                      placeholder="arjun@example.com"
                    />
                    {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs tracking-widest uppercase font-medium mb-2">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      className="w-full border-b border-gray-300 bg-transparent py-3 text-sm outline-none focus:border-black transition-colors placeholder:text-gray-300"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <div>
                    <label className="block text-xs tracking-widest uppercase font-medium mb-2">Subject</label>
                    <select
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      className="w-full border-b border-gray-300 bg-transparent py-3 text-sm outline-none focus:border-black transition-colors text-gray-700 cursor-pointer"
                    >
                      <option value="">Select a topic</option>
                      <option>Order Enquiry</option>
                      <option>Product Information</option>
                      <option>Returns & Exchange</option>
                      <option>Corporate Orders</option>
                      <option>Styling Assistance</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs tracking-widest uppercase font-medium mb-2">Message *</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    className={`w-full border-b bg-transparent py-3 text-sm outline-none focus:border-black transition-colors resize-none placeholder:text-gray-300 ${errors.message ? 'border-red-400' : 'border-gray-300'}`}
                    placeholder="How can we assist you?"
                  />
                  {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  className="bg-black text-white px-12 py-4 text-xs tracking-widest uppercase font-medium hover:bg-gold-500 hover:text-black transition-all duration-300 flex items-center gap-3"
                >
                  Send Message
                  <FiSend size={13} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Store Locations */}
      <section className="bg-cream-100 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="section-subtitle mb-3">Visit Us</p>
            <h2 className="section-title">Our Flagship Stores</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {STORES.map(store => (
              <div key={store.city} className="bg-white p-8 hover:shadow-lg transition-shadow duration-300">
                <h3 className="font-serif text-2xl font-light mb-5" style={{ fontFamily: 'Cormorant Garamond, serif' }}>{store.city}</h3>
                <div className="space-y-4 text-sm text-gray-600">
                  <div className="flex items-start gap-3">
                    <FiMapPin size={15} className="text-gold-500 shrink-0 mt-0.5" />
                    <span>{store.address}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FiPhone size={15} className="text-gold-500 shrink-0" />
                    <span>{store.phone}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <FiClock size={15} className="text-gold-500 shrink-0 mt-0.5" />
                    <span>{store.hours}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
