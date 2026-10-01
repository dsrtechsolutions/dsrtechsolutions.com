import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LuSend } from 'react-icons/lu';

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

  return (
    <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
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
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`navbar__mobile${menuOpen ? ' open' : ''}`}>
        {navLinks.map((l) => (
          <Link
            key={l.to}
            to={l.to}
            className={`navbar__mobile-link${pathname === l.to ? ' active' : ''}`}
          >
            {l.label}
          </Link>
        ))}
        <Link to="/contact" className="btn-primary" style={{ marginTop: '12px', clipPath: 'none', justifyContent: 'center' }}>
          <LuSend /> Get a Quote
        </Link>
      </div>
    </header>
  );
}
