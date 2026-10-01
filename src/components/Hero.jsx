import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { LuArrowRight, LuHeadphones, LuLayoutGrid } from 'react-icons/lu';
import CountUp from './CountUp';
import heroImg from '../assets/images/hero.jpg';

const words = ['IT Innovation', 'Expert Staffing', 'Digital Growth', 'Smart Solutions'];

export default function Hero() {
  const typedRef = useRef(null);

  useEffect(() => {
    let wordIdx = 0, charIdx = 0, deleting = false, timer;
    function type() {
      const current = words[wordIdx];
      charIdx = deleting ? charIdx - 1 : charIdx + 1;
      if (typedRef.current) typedRef.current.textContent = current.slice(0, charIdx);
      let speed = deleting ? 55 : 100;
      if (!deleting && charIdx === current.length) { speed = 1800; deleting = true; }
      else if (deleting && charIdx === 0) { deleting = false; wordIdx = (wordIdx + 1) % words.length; speed = 400; }
      timer = setTimeout(type, speed);
    }
    timer = setTimeout(type, 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="hero">
      <div className="hero__grid" />

      <div className="hero__inner">
        {/* Left copy */}
        <div className="hero__copy">
          <div className="hero__badge">
            <span className="dot" />
            Trusted by 50+ Companies
          </div>

          <h1 className="hero__title">
            Strong <span className="hl">Foundations</span><br />
            Stronger <span className="hl">Futures</span>
          </h1>

          <p className="hero__subtitle">
            DSR Tech Solutions powers smarter business through{' '}
            <span ref={typedRef} style={{ color: 'var(--orange)', fontWeight: 700 }} />
            <span style={{ color: 'var(--orange)', animation: 'pulse 1s step-end infinite' }}>|</span>
            {' '}— delivering world-class IT services from custom software to enterprise mobility.
          </p>

          <div className="hero__buttons">
            <Link to="/contact" className="btn-primary">Get Free Consultation <LuArrowRight /></Link>
            <Link to="/services" className="btn-outline"><LuLayoutGrid /> Explore Services</Link>
          </div>

          {/* Stat strip */}
          <div className="hero__stats">
            {[
              { end: 10, suffix: '+', label: 'Years Experience' },
              { end: 50, suffix: '+', label: 'Happy Clients' },
              { end: 100, suffix: '+', label: 'Projects Done' },
              { end: 99, suffix: '%', label: 'Satisfaction' },
            ].map((s) => (
              <div key={s.label} className="hero__stat">
                <h3><CountUp end={s.end} suffix={s.suffix} /></h3>
                <p>{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right visual */}
        <div className="hero__visual">
          <div className="hero__img-frame">
            <img
              src={heroImg}
              alt="DSR Tech Solutions engineers collaborating on a project"
              className="hero__img"
              width="1100"
              height="825"
              fetchPriority="high"
            />
            <div className="hero__badge-float">
              <div className="hero__badge-float-icon"><LuHeadphones /></div>
              <div className="hero__badge-float-text">
                <strong>24/7 Support</strong>
                <span>Always available for you</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
