import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LuMail, LuPhoneCall, LuSend } from 'react-icons/lu';
import TopBar from './TopBar';
import SocialLinks from './SocialLinks';
import contact from '../data/contact';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Contact', to: '/contact' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  // While the mobile menu is open: freeze the page behind it and close on Escape.
  useEffect(() => {
    if (!menuOpen) return undefined;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
        <TopBar />
        <div className="container navbar__inner">
          {/* Logo */}
          <Link to="/" className="navbar__logo">
            <span className="logo-box">DSR</span>
            <span className="logo-name">Tech<span>Solutions</span></span>
          </Link>

          {/* Desktop nav */}
          <nav className="navbar__links">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`navbar__link${pathname === l.to ? ' active' : ''}`}
              >
                {l.label}
              </Link>
            ))}
            <Link to="/contact" className="btn-nav"><LuSend /> Get a Quote</Link>
          </nav>

          {/* Hamburger */}
          <button
            className={`navbar__burger${menuOpen ? ' open' : ''}`}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span /><span /><span />
          </button>
        </div>

        {/* Mobile menu */}
        <nav id="mobile-menu" className={`navbar__mobile${menuOpen ? ' open' : ''}`} aria-label="Mobile">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={closeMenu}
              className={`navbar__mobile-link${pathname === l.to ? ' active' : ''}`}
            >
              {l.label}
            </Link>
          ))}
          <Link to="/contact" onClick={closeMenu} className="btn-primary navbar__mobile-cta">
            <LuSend /> Get a Quote
          </Link>
          <div className="navbar__mobile-contact">
            <a href={contact.phoneHref}><LuPhoneCall /> {contact.phone}</a>
            <a href={contact.emailHref}><LuMail /> {contact.email}</a>
          </div>
          <SocialLinks className="navbar__mobile-socials" />
        </nav>
      </header>
      {menuOpen && <div className="navbar__overlay" onClick={closeMenu} aria-hidden="true" />}
    </>
  );
}
