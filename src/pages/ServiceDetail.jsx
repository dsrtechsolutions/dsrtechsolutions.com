import { useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import {
  LuArrowLeft, LuArrowRight, LuCheck, LuChevronRight, LuMail, LuPhoneCall,
} from 'react-icons/lu';
import PageHero from '../components/PageHero';
import contact from '../data/contact';
import SocialLinks from '../components/SocialLinks';
import ServiceCard from '../components/ServiceCard';
import CtaBanner from '../components/CtaBanner';
import services, { approachSteps, getService, servicePath } from '../data/services';

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = getService(slug);

  useEffect(() => {
    if (!service) return undefined;
    const prevTitle = document.title;
    document.title = `${service.name} — DSR Tech Solutions`;
    return () => { document.title = prevTitle; };
  }, [service]);

  if (!service) return <Navigate to="/services" replace />;

  const idx = services.indexOf(service);
  const related = [1, 2, 3].map((n) => services[(idx + n) % services.length]);
  const prev = services[(idx - 1 + services.length) % services.length];
  const next = services[(idx + 1) % services.length];

  return (
    <>
      <PageHero
        badge="Our Services"
        title={service.name}
        desc={service.summary}
        breadcrumb={service.name}
        parent={{ label: 'Services', to: '/services' }}
        image={service.img}
      />

      <section className="section">
        <div className="container svc-detail">
          {/* Main content */}
          <article className="svc-detail__main">
            <div className="svc-detail__img">
              <img src={service.img} alt={service.title} />
              <span className="svc-detail__img-icon"><service.icon /></span>
            </div>

            <div className="section-tag">Service Overview</div>
            <h2 className="section-title">{service.title}</h2>
            <div className="divider" style={{ marginLeft: 0 }} />
            <p className="svc-detail__lead">{service.intro}</p>
            <p className="svc-detail__text">{service.detail}</p>

            <h3 className="svc-detail__heading">What We Offer</h3>
            <div className="svc-detail__offerings">
              {service.offerings.map((o) => (
                <div key={o} className="svc-detail__offering">
                  <span className="check-icon"><LuCheck /></span>
                  {o}
                </div>
              ))}
            </div>

            <h3 className="svc-detail__heading">Key Benefits</h3>
            <div className="svc-detail__benefits">
              {service.benefits.map((b) => (
                <div key={b.title} className="svc-benefit">
                  <div className="svc-benefit__icon"><b.icon /></div>
                  <div>
                    <h5>{b.title}</h5>
                    <p>{b.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <h3 className="svc-detail__heading">Our Approach</h3>
            <div className="svc-detail__steps">
              {approachSteps.map((st, i) => (
                <div key={st.title} className="svc-step">
                  <div className="svc-step__num">{String(i + 1).padStart(2, '0')}</div>
                  <h5>{st.title}</h5>
                  <p>{st.text}</p>
                </div>
              ))}
            </div>

            <h3 className="svc-detail__heading">Technologies &amp; Platforms</h3>
            <div className="svc-detail__tech">
              {service.tech.map((t) => <span key={t} className="tech-chip">{t}</span>)}
            </div>

            <nav className="svc-detail__pager" aria-label="More services">
              <Link to={servicePath(prev)} className="svc-pager-link">
                <LuArrowLeft />
                <span><small>Previous</small>{prev.name}</span>
              </Link>
              <Link to={servicePath(next)} className="svc-pager-link svc-pager-link--next">
                <span><small>Next</small>{next.name}</span>
                <LuArrowRight />
              </Link>
            </nav>
          </article>

          {/* Sidebar */}
          <aside className="svc-detail__sidebar">
            <div className="svc-sidebar-box">
              <h5 className="svc-sidebar-box__title">All Services</h5>
              <ul className="svc-sidebar-list">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link
                      to={servicePath(s)}
                      className={s.slug === service.slug ? 'active' : undefined}
                      aria-current={s.slug === service.slug ? 'page' : undefined}
                    >
                      <span className="svc-sidebar-list__icon"><s.icon /></span>
                      {s.name}
                      <LuChevronRight className="svc-sidebar-list__chevron" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="svc-help-box">
              <div className="svc-help-box__icon"><LuPhoneCall /></div>
              <h5>Need help with {service.name}?</h5>
              <p>Talk to our specialists for a free consultation and a tailored proposal.</p>
              <a href={contact.phoneHref} className="svc-help-box__line"><LuPhoneCall /> {contact.phone}</a>
              <a href={contact.emailHref} className="svc-help-box__line"><LuMail /> {contact.email}</a>
              <Link to="/contact" className="btn-primary btn-full">Get a Free Quote <LuArrowRight /></Link>
              <div className="svc-help-box__follow">
                <span>Follow us</span>
                <SocialLinks className="svc-help-box__socials" />
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Related */}
      <section className="section section--light">
        <div className="container">
          <div className="section-header">
            <div className="section-tag">Explore More</div>
            <h2 className="section-title">Related <span className="hl">Services</span></h2>
            <div className="divider" />
          </div>
          <div className="services__grid">
            {related.map((s) => <ServiceCard key={s.slug} service={s} />)}
          </div>
        </div>
      </section>

      <CtaBanner
        title="Ready to Get Started With"
        highlight={`${service.name}?`}
        desc="Share your requirements and our experts will get back to you within one business day with a tailored plan."
        btnLabel="Request a Free Consultation"
        btnTo="/contact"
      />
    </>
  );
}
