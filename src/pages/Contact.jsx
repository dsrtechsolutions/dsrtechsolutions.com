import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  LuCircleAlert, LuCircleCheck, LuClock, LuGlobe, LuInfo, LuMail, LuMapPin, LuPhone, LuSend,
} from 'react-icons/lu';
import { FaFacebookF, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6';
import PageHero from '../components/PageHero';
import heroContact from '../assets/images/hero-contact.jpg';
import contact from '../data/contact';

const infoCards = [
  { icon: LuMapPin, title: 'Our Office', lines: [contact.addressLine1, contact.addressLine2], href: contact.mapsLink },
  { icon: LuPhone, title: 'Call Us', lines: [contact.phone, `Mon–Fri, ${contact.hours}`], href: contact.phoneHref },
  { icon: LuMail, title: 'Email Us', lines: [contact.email, 'We reply within 24 hours'], href: contact.emailHref },
  { icon: LuClock, title: 'Business Hours', lines: ['Monday – Friday', contact.hours] },
];

const subjects = [
  'IT Staffing & Workforce',
  'Software Development',
  'Mobile Applications',
  'Business Intelligence',
  'E-Commerce Solutions',
  'BPM & SOA',
  'General Inquiry',
  'Partnership / Alliance',
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | success | error

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setStatus('error');
      return;
    }
    // Simulate successful submission
    setStatus('success');
    setForm({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  return (
    <>
      <PageHero
        badge="We're Here to Help"
        title="Get In"
        highlight="Touch"
        desc="Reach out to our team for any inquiries about IT staffing, software development, or any of our services."
        breadcrumb="Contact"
        image={heroContact}
      />

      {/* Info Cards */}
      <div className="contact-cards">
        <div className="container">
          <div className="contact-cards__grid">
            {infoCards.map((c) => (
              <div key={c.title} className="contact-card">
                <div className="contact-card__icon"><c.icon /></div>
                <h5>{c.title}</h5>
                {c.lines.map((l, i) => (
                  <p key={l}>
                    {i === 0 && c.href
                      ? (
                        <a href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
                          {/* let long emails wrap before the "@" rather than mid-word */}
                          {l.includes('@') ? <>{l.split('@')[0]}<wbr />@{l.split('@')[1]}</> : l}
                        </a>
                      )
                      : l}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form + Map */}
      <section className="section section--light">
        <div className="container">
          <div className="contact__grid">
            {/* Form */}
            <div className="contact-form-box">
              <div className="section-tag">Send a Message</div>
              <h2 className="section-title">Let's Start a <span className="text-grad">Conversation</span></h2>
              <div className="divider" />
              <p className="section-desc">
                Fill out the form below and one of our specialists will contact you within one business day.
              </p>

              {status === 'success' && (
                <div className="form-msg form-msg--success">
                  <LuCircleCheck /> Your message has been sent! We'll be in touch within 24 hours.
                </div>
              )}
              {status === 'error' && (
                <div className="form-msg form-msg--error">
                  <LuCircleAlert /> Please fill in all required fields.
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Full Name <span>*</span></label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="John Smith"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email Address <span>*</span></label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="john@company.com"
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+1 919-555-0123"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="subject">Subject</label>
                    <select
                      id="subject"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                    >
                      <option value="">Select a topic…</option>
                      {subjects.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message <span>*</span></label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Tell us about your project, requirements, or how we can help…"
                    required
                  />
                </div>
                <button type="submit" className="btn-primary btn-full">
                  <LuSend /> Send Message
                </button>
                <p className="form-note">
                  By submitting this form you agree to our <Link to="/privacy-policy">Privacy Policy</Link>.
                </p>
              </form>
            </div>

            {/* Sidebar */}
            <div className="contact-sidebar">
              <div className="map-wrap">
                <iframe
                  src={contact.mapsEmbed}
                  title={`DSR Tech Solutions office — ${contact.address}`}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <div className="contact-direct">
                <h5><LuInfo /> Reach Us Directly</h5>
                {[
                  { icon: LuMapPin, label: 'Headquarters', val: contact.address, href: contact.mapsLink },
                  { icon: LuPhone, label: 'Phone', val: contact.phone, href: contact.phoneHref },
                  { icon: LuMail, label: 'Email', val: contact.email, href: contact.emailHref },
                  { icon: LuGlobe, label: 'Website', val: contact.website, href: contact.websiteHref },
                ].map((r) => (
                  <div key={r.label} className="contact-direct__row">
                    <span className="contact-direct__icon"><r.icon /></span>
                    <div>
                      <strong>{r.label}</strong>
                      <a href={r.href} target={r.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">{r.val}</a>
                    </div>
                  </div>
                ))}

                <hr />
                <p className="contact-direct__social-label">Follow us on social media</p>
                <div className="contact-direct__socials">
                  <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedinIn /></a>
                  <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="X (Twitter)"><FaXTwitter /></a>
                  <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook"><FaFacebookF /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
