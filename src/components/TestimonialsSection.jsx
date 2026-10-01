import { LuQuote, LuStar } from 'react-icons/lu';
import client1 from '../assets/images/client-1.jpg';
import client2 from '../assets/images/client-2.jpg';
import client3 from '../assets/images/client-3.jpg';

function Stars({ count = 5 }) {
  return (
    <span className="stars" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }, (_, i) => <LuStar key={i} />)}
    </span>
  );
}

const testimonials = [
  {
    photo: client1,
    name: 'James Mitchell',
    role: 'CTO, DataStream Corp',
    text: 'DSR Tech Solutions transformed our IT staffing process. They delivered highly qualified engineers within days, not weeks. Our project velocity improved by 40%.',
    stars: 5,
  },
  {
    photo: client2,
    name: 'Sarah Reynolds',
    role: 'VP Operations, NexGen Retail',
    text: 'The BI dashboard they built consolidated data from 12 sources into a single pane of glass. Leadership can now make decisions in hours instead of days.',
    stars: 5,
  },
  {
    photo: client3,
    name: 'David Kim',
    role: 'Product Manager, HealthBridge',
    text: 'Their mobile app development team delivered a flawless iOS and Android solution that our 50,000 users love. Communication was excellent throughout the entire project.',
    stars: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <section className="section">
      <div className="container">
        <div className="testimonials__layout">
          {/* Left: heading + big quote */}
          <div className="testimonials__left">
            <div className="section-tag">Testimonial</div>
            <h2 className="section-title">
              What Our Clients<br /><span className="hl">Say About Us</span>
            </h2>
            <div className="divider" style={{ marginLeft: 0 }} />
            <p className="section-desc" style={{ marginLeft: 0, marginBottom: '28px' }}>
              We have <strong>50+ Global Active Clients</strong> — hear directly from the
              businesses we've helped transform with our IT solutions and staffing expertise.
            </p>
            {/* Decorative quote */}
            <LuQuote className="testimonials__quote" aria-hidden="true" />
            {/* Featured testimonial large */}
            <div style={{
              background: 'var(--navy)',
              borderLeft: '4px solid var(--orange)',
              borderRadius: 'var(--radius)',
              padding: '28px',
            }}>
              <div style={{ color: 'var(--orange)', fontSize: '0.9rem', letterSpacing: '2px', marginBottom: '12px' }}>
                <Stars />
              </div>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem', lineHeight: 1.85, marginBottom: '18px' }}>
                "DSR Tech Solutions transformed our IT staffing process. They delivered highly
                qualified engineers within days. Our project velocity improved by 40%."
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <img src={client1} alt="James Mitchell" className="testi-avatar testi-avatar--lg" loading="lazy" />
                <div>
                  <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.9rem' }}>James Mitchell</div>
                  <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.75rem' }}>CTO, DataStream Corp</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: cards */}
          <div className="testimonials__right">
            {testimonials.map((t) => (
              <div key={t.name} className="testi-card">
                <div className="testi-stars"><Stars count={t.stars} /></div>
                <p className="testi-text">{t.text}</p>
                <div className="testi-author">
                  <img src={t.photo} alt={t.name} className="testi-avatar" loading="lazy" />
                  <div>
                    <div className="testi-name">{t.name}</div>
                    <div className="testi-role">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
