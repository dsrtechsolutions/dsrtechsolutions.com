import { Link } from 'react-router-dom';
import { LuArrowRight } from 'react-icons/lu';
import ctaBg from '../assets/images/cta-bg.jpg';

export default function CtaBanner({ title, highlight, desc, btnLabel, btnTo }) {
  return (
    <section className="cta-section" style={{ '--cta-bg': `url(${ctaBg})` }}>
      <div className="container cta-section__inner">
        <h2>{title} <span>{highlight}</span></h2>
        <p>{desc}</p>
        <Link to={btnTo || '/contact'} className="btn-cta-white">
          {btnLabel || 'Contact Us Today'} <LuArrowRight />
        </Link>
      </div>
    </section>
  );
}
