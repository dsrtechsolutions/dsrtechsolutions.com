import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LuArrowRight, LuCheck } from 'react-icons/lu';

const plans = {
  monthly: [
    {
      name: 'Basic Plan',
      price: '$36.99',
      period: '/month',
      features: [
        'IT Consulting (5 hrs)',
        'Email Support',
        '1 Project',
        'Basic Reporting',
        'Standard SLA',
      ],
      featured: false,
    },
    {
      name: 'Standard Plan',
      price: '$40.99',
      period: '/month',
      features: [
        'IT Consulting (15 hrs)',
        'Priority Support',
        '3 Projects',
        'Advanced Analytics',
        'Enhanced SLA',
        'Dedicated Manager',
      ],
      featured: true,
      badge: 'Most Popular',
    },
    {
      name: 'Premium Plan',
      price: '$50.99',
      period: '/month',
      features: [
        'IT Consulting (Unlimited)',
        '24/7 Support',
        'Unlimited Projects',
        'Custom Reporting',
        'Premium SLA',
        'Dedicated Team',
        'Onsite Support',
      ],
      featured: false,
    },
  ],
  yearly: [
    {
      name: 'Basic Plan',
      price: '$359',
      period: '/year',
      features: [
        'IT Consulting (5 hrs)',
        'Email Support',
        '1 Project',
        'Basic Reporting',
        'Standard SLA',
      ],
      featured: false,
    },
    {
      name: 'Standard Plan',
      price: '$399',
      period: '/year',
      features: [
        'IT Consulting (15 hrs)',
        'Priority Support',
        '3 Projects',
        'Advanced Analytics',
        'Enhanced SLA',
        'Dedicated Manager',
      ],
      featured: true,
      badge: 'Most Popular',
    },
    {
      name: 'Premium Plan',
      price: '$499',
      period: '/year',
      features: [
        'IT Consulting (Unlimited)',
        '24/7 Support',
        'Unlimited Projects',
        'Custom Reporting',
        'Premium SLA',
        'Dedicated Team',
        'Onsite Support',
      ],
      featured: false,
    },
  ],
};

export default function PricingSection() {
  const [billing, setBilling] = useState('monthly');
  const current = plans[billing];

  return (
    <section className="pricing">
      <div className="container">
        <div className="section-header">
          <div className="section-tag" style={{ color: 'rgba(255,255,255,0.6)' }}>Pricing Plan</div>
          <h2 className="section-title section-title--white">
            Pricing &amp; <span className="hl">Packaging</span>
          </h2>
          <div className="divider" style={{ margin: '14px auto 24px' }} />
        </div>

        {/* Toggle */}
        <div className="pricing__toggle">
          <button
            className={billing === 'monthly' ? 'active' : ''}
            onClick={() => setBilling('monthly')}
          >
            Monthly
          </button>
          <button
            className={billing === 'yearly' ? 'active' : ''}
            onClick={() => setBilling('yearly')}
          >
            Yearly
          </button>
        </div>

        <div className="pricing__grid">
          {current.map((plan) => (
            <div
              key={plan.name}
              className={`pricing-card${plan.featured ? ' pricing-card--featured' : ''}`}
            >
              {plan.badge && (
                <div className="pricing-card__badge">{plan.badge}</div>
              )}
              <div className="pricing-card__name">{plan.name}</div>
              <div className="pricing-card__price">{plan.price}</div>
              <div className="pricing-card__period">{plan.period}</div>
              <div className="pricing-card__divider" />
              <div className="pricing-card__features">
                {plan.features.map((f) => (
                  <div key={f} className="pricing-card__feature">
                    <div className="pricing-card__feature-icon"><LuCheck /></div>
                    {f}
                  </div>
                ))}
              </div>
              <Link to="/contact" className="btn-pricing">Get Started <LuArrowRight /></Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
