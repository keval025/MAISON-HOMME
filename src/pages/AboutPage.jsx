const MILESTONES = [
  { year: '1998', title: 'The Beginning', desc: 'Founded in New Delhi with a singular vision — to craft premium menswear for the modern Indian gentleman.' },
  { year: '2005', title: 'National Expansion', desc: 'Opened 12 flagship stores across major Indian cities, establishing Maison as a household name.' },
  { year: '2012', title: 'Global Sourcing', desc: 'Partnered with premier fabric mills in Italy, Japan, and England to elevate our material standards.' },
  { year: '2018', title: 'Digital Evolution', desc: 'Launched our digital flagship, bringing the Maison experience to discerning customers nationwide.' },
  { year: '2025', title: 'New Chapter', desc: 'Celebrating 27 years with our most ambitious collection to date, crafted for the next generation.' },
];

const TEAM = [
  { name: 'Arjun Kapoor', role: 'Founder & Creative Director', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80' },
  { name: 'Priya Sharma', role: 'Head of Design', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80' },
  { name: 'Rohan Mehta', role: 'Chief Brand Officer', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80' },
];

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="relative h-72 md:h-96 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1603344797033-f0f4f587ab60?w=1600&q=80"
          alt="About Maison"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6">
          <p className="text-gold-400 text-xs tracking-widest uppercase mb-4 font-medium">Our Story</p>
          <h1 className="font-serif text-5xl md:text-7xl font-light" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            About Maison
          </h1>
        </div>
      </div>

      {/* Mission */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="section-subtitle mb-4">Our Philosophy</p>
          <h2 className="font-serif text-4xl md:text-5xl font-light mb-8 leading-tight" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            "Elegance Is Not About Being Noticed, It's About Being Remembered."
          </h2>
          <p className="text-gray-600 text-base leading-relaxed max-w-2xl mx-auto">
            At Maison Premier Homme, we believe that every garment tells a story. Since 1998, we have been dedicated to creating menswear that transcends fleeting trends — pieces built on timeless craftsmanship, premium materials, and an unwavering commitment to excellence.
          </p>
        </div>
      </section>

      {/* Split Image/Text */}
      <section className="py-12 bg-cream-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 items-stretch">
            <div className="aspect-[4/3] md:aspect-auto overflow-hidden img-zoom">
              <img
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80"
                alt="Atelier"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="bg-black text-white flex flex-col justify-center p-12 md:p-16">
              <p className="text-gold-400 text-xs tracking-widest uppercase mb-4 font-medium">The Craft</p>
              <h2 className="font-serif text-4xl font-light mb-6" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                Handcrafted With Heritage
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                Every Maison piece begins as a concept — a vision of how the modern man deserves to present himself to the world. Our master tailors, many with over two decades of experience, transform these concepts into garments of exceptional quality.
              </p>
              <p className="text-gray-400 text-sm leading-relaxed">
                We source our fabrics directly from the finest mills in Italy, the UK, and Japan — ensuring that each thread, each weave, meets our exacting standards before it ever touches a customer's skin.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 items-stretch">
            <div className="bg-cream-200 flex flex-col justify-center p-12 md:p-16 order-2 md:order-1">
              <p className="text-gold-600 text-xs tracking-widest uppercase mb-4 font-medium">Sustainability</p>
              <h2 className="font-serif text-4xl font-light mb-6" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                Responsible Luxury
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                True luxury carries responsibility. At Maison, we are committed to sustainable practices — from responsible sourcing and ethical manufacturing to eco-friendly packaging and reduced waste production.
              </p>
              <p className="text-gray-600 text-sm leading-relaxed">
                By 2027, we aim to achieve carbon neutrality across all our operations, proving that premium quality and environmental consciousness are not mutually exclusive.
              </p>
            </div>
            <div className="aspect-[4/3] md:aspect-auto overflow-hidden img-zoom order-1 md:order-2">
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=900&q=80"
                alt="Sustainability"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="section-subtitle mb-3">Our Journey</p>
            <h2 className="section-title">27 Years of Excellence</h2>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 -translate-x-px top-0 bottom-0 w-px bg-gray-200 hidden md:block" />
            <div className="space-y-12">
              {MILESTONES.map((m, i) => (
                <div key={m.year} className={`flex flex-col md:flex-row items-center gap-8 ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                  <div className={`md:w-1/2 ${i % 2 !== 0 ? 'md:text-left md:pl-12' : 'md:text-right md:pr-12'}`}>
                    <p className="text-gold-500 text-xs tracking-widest uppercase font-medium mb-2">{m.year}</p>
                    <h3 className="font-serif text-2xl font-light mb-3" style={{ fontFamily: 'Cormorant Garamond, serif' }}>{m.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{m.desc}</p>
                  </div>
                  <div className="hidden md:flex w-4 h-4 bg-gold-500 rounded-full border-4 border-white shadow-md shrink-0 z-10" />
                  <div className="md:w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-cream-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="section-subtitle mb-3">The People</p>
            <h2 className="section-title">Meet Our Team</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {TEAM.map(member => (
              <div key={member.name} className="text-center group">
                <div className="aspect-square overflow-hidden mb-6 img-zoom bg-cream-200">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                </div>
                <h3 className="font-serif text-xl font-light mb-1" style={{ fontFamily: 'Cormorant Garamond, serif' }}>{member.name}</h3>
                <p className="text-xs text-gold-500 tracking-widest uppercase font-medium">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { stat: '27+', label: 'Years of Excellence' },
              { stat: '50+', label: 'Flagship Stores' },
              { stat: '2M+', label: 'Happy Customers' },
              { stat: '500+', label: 'Annual Styles' },
            ].map(item => (
              <div key={item.label}>
                <p className="font-serif text-4xl md:text-5xl font-light text-gold-500 mb-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                  {item.stat}
                </p>
                <p className="text-xs tracking-widest uppercase text-gray-400 font-medium">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
