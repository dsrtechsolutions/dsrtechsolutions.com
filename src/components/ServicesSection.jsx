import { Link } from 'react-router-dom';
import { LuArrowRight } from 'react-icons/lu';
import ServiceCard from './ServiceCard';
import { featuredServices } from '../data/services';

export default function ServicesSection() {
  return (
    <section className="section section--light">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">The Best Service For You</div>
          <h2 className="section-title">
            Comprehensive <span className="hl">IT Services</span>
          </h2>
          <div className="divider" />
          <p className="section-desc">
            From B2B solutions and CRM to mobile apps and business intelligence — we cover
            every dimension of your technology needs with precision and expertise.
          </p>
        </div>

        <div className="services__grid">
          {featuredServices.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </div>

        <div className="text-center mt-5">
          <Link to="/services" className="btn-primary">View All Services <LuArrowRight /></Link>
        </div>
      </div>
    </section>
  );
}
