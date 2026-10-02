import { Link } from 'react-router-dom';
import { LuChevronRight, LuGlobe, LuMail, LuMapPin, LuPhone } from 'react-icons/lu';
import SocialLinks from './SocialLinks';
import { featuredServices, servicePath } from '../data/services';
import contact from '../data/contact';

const quickLinks = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Our Services', to: '/services' },
  { label: 'Contact Us', to: '/contact' },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="container footer__grid">

          {/* Brand */}
          <div className="footer__brand">
            <Link to="/" className="footer__logo">
              <span className="logo-box">DSR</span>
              <span className="logo-name" style={{ color: '#fff' }}>
                Tech<span>Solutions</span>
              </span>
            </Link>
            <p>
              DSR Tech Solutions is a premier IT solutions &amp; staffing firm delivering
              world-class technology services to businesses across India and the United States.
            </p>
            <SocialLinks className="footer__socials" />
          </div>

          {/* Quick Links */}
          <div className="footer__col">
            <h5>Quick Links</h5>
            <ul>
              {quickLinks.map((l) => (
                <li key={l.to}>
                  <Link to={l.to}><LuChevronRight /> {l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="footer__col">
            <h5>Our Services</h5>
            <ul>
              {featuredServices.map((s) => (
                <li key={s.slug}>
                  <Link to={servicePath(s)}><LuChevronRight /> {s.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="footer__col">
            <h5>Contact Info</h5>
            <div className="footer__contact-items">
              {[
                { icon: LuMapPin, label: 'Address', val: contact.address, href: contact.mapsLink },
                { icon: LuPhone, label: 'Phone', val: contact.phone, href: contact.phoneHref },
                { icon: LuMail, label: 'Email', val: contact.email, href: contact.emailHref },
              ].map((r) => (
                <div key={r.label} className="footer__contact-item">
                  <span className="footer__contact-icon"><r.icon /></span>
                  <div>
                    <strong>{r.label}</strong>
                    {r.href
                      ? <a href={r.href} target={r.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">{r.val}</a>
                      : <span>{r.val}</span>
                    }
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p>© {new Date().getFullYear()} DSR Tech Solutions. All rights reserved.</p>
          <div className="footer__bottom-links">
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/terms-of-service">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
