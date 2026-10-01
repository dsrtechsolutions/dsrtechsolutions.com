import PageHero from '../components/PageHero';
import StatsBar from '../components/StatsBar';
import CtaBanner from '../components/CtaBanner';
import { Link } from 'react-router-dom';
import {
  LuAward, LuCheck, LuEye, LuGem, LuHandshake, LuLayoutGrid, LuMail,
  LuMapPin, LuRocket, LuShieldCheck, LuTarget, LuTrendingUp, LuUsers,
} from 'react-icons/lu';
import { SiAndroid, SiApple, SiNodedotjs, SiReact, SiSap } from 'react-icons/si';
import { FaAws, FaMicrosoft } from 'react-icons/fa6';
import { GrOracle } from 'react-icons/gr';
import { VscAzure } from 'react-icons/vsc';
import heroAbout from '../assets/images/hero-about.jpg';
import officeImg from '../assets/images/about-office.jpg';

const values = [
  { icon: LuTarget, color: '#2563eb', title: 'Our Mission', desc: 'To empower businesses through exceptional IT talent, innovative technology solutions, and a partnership approach that creates lasting competitive advantage.' },
  { icon: LuEye, color: '#f59e0b', title: 'Our Vision', desc: 'To be the most trusted IT solutions partner, recognized for delivering transformative technology and unmatched talent that drives business growth.' },
  { icon: LuGem, color: '#10b981', title: 'Our Values', desc: 'Integrity. Excellence. Innovation. Collaboration. We hold these values at the core of everything we do — from how we hire talent to how we serve clients.' },
  { icon: LuUsers, color: '#8b5cf6', title: 'People-First Culture', desc: 'We believe the best technology is built by the best people. Our rigorous hiring process ensures only top-tier professionals join our network.' },
  { icon: LuShieldCheck, color: '#06b6d4', title: 'Quality & Compliance', desc: 'From PCI-compliant e-commerce to HIPAA-aware healthcare solutions, we maintain the highest standards of quality, security, and compliance.' },
  { icon: LuTrendingUp, color: '#ef4444', title: 'Continuous Innovation', desc: 'We invest in emerging technologies and training programs to ensure our teams stay ahead of the curve and deliver cutting-edge solutions.' },
];

const capabilities = [
  'B2B & Workforce Solutions',
  'Custom Application Development',
  'Mobile App Development (iOS/Android)',
  'Business Intelligence & Analytics',
  'Enterprise Mobility (MEAP)',
  'Application Testing & QA',
  'E-Commerce Platforms',
  'BPM & SOA Integration',
];

const techItems = [
  { icon: SiSap, name: 'SAP', color: '#0faaff' },
  { icon: GrOracle, name: 'Oracle', color: '#f80000' },
  { icon: FaMicrosoft, name: 'Microsoft', color: '#00a4ef' },
  { icon: FaAws, name: 'AWS', color: '#ff9900' },
  { icon: SiApple, name: 'iOS', color: '#000000' },
  { icon: SiAndroid, name: 'Android', color: '#3ddc84' },
  { icon: SiReact, name: 'React', color: '#61dafb' },
  { icon: SiNodedotjs, name: 'Node.js', color: '#5fa04e' },
  { icon: VscAzure, name: 'Azure', color: '#0078d4' },
];

export default function About() {
  return (
    <>
      <PageHero
        badge="About DSR Tech Solutions"
        title="Building Smarter &"
        highlight="Highly Usable Solutions"
        desc="We combine integrity, wisdom, and deep technology expertise to drive exceptional outcomes for our clients."
        breadcrumb="About"
        image={heroAbout}
      />

      {/* Who We Are */}
      <section className="section">
        <div className="container">
          <div className="about__grid">
            <div className="about__card fade-in-left" style={{ backgroundImage: `url(${officeImg})` }}>
              <div className="about__card-inner">
                <div className="about__card-icon"><LuHandshake /></div>
                <h4>Who We Are</h4>
                <div className="about__highlights">
                  {[
                    { icon: LuShieldCheck, label: 'Integrity & Trust First' },
                    { icon: LuMapPin, label: 'India & US Presence' },
                    { icon: LuUsers, label: '50+ Satisfied Clients' },
                    { icon: LuRocket, label: '100+ Projects Delivered' },
                    { icon: LuAward, label: '10+ Years of Excellence' },
                  ].map((h) => (
                    <div key={h.label} className="highlight-item">
                      <div className="highlight-ico"><h.icon /></div>
                      <div className="highlight-label">{h.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="about__badge">
                <div className="about__badge-num">10+</div>
                <div className="about__badge-lbl">Years of Trust</div>
              </div>
            </div>

            <div className="about__copy fade-in-right">
              <div className="section-tag">Who We Are</div>
              <h2 className="section-title">A Trusted Partner for<br />IT Excellence</h2>
              <div className="divider" />
              <p className="section-desc">
                DSR Tech Solutions is a premier IT solutions and staffing firm serving clients
                ranging from mid-size businesses to Fortune 500 companies. Founded with a vision
                to deliver world-class technology services, we operate at the intersection of
                people, process, and technology.
              </p>
              <p className="section-desc">
                Our mission is simple: connect the right talent with the right opportunity and
                deliver technology solutions that create real, measurable business value — always
                guided by integrity and a relentless focus on quality.
              </p>
              <div className="check-list">
                {[
                  { bold: 'Integrity First', text: 'in every engagement' },
                  { bold: 'India & US Presence', text: 'for nationwide coverage' },
                  { bold: 'Top-tier talent', text: 'vetted and ready' },
                  { bold: 'Agile delivery', text: 'for every project' },
                ].map((c) => (
                  <div key={c.bold} className="check-item">
                    <div className="check-icon"><LuCheck /></div>
                    <div className="check-text"><strong>{c.bold}</strong> {c.text}</div>
                  </div>
                ))}
              </div>
              <div className="about__actions">
                <Link to="/contact" className="btn-primary"><LuMail /> Get in Touch</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission / Vision / Values */}
      <section className="section section--light">
        <div className="container">
          <div className="section-header">
            <div className="section-tag">Our Foundation</div>
            <h2 className="section-title">Mission, Vision &amp; <span className="text-grad">Values</span></h2>
            <div className="divider" />
          </div>
          <div className="values__grid">
            {values.map((v) => (
              <div key={v.title} className="value-card">
                <div className="value-card__icon" style={{ background: `${v.color}18`, color: v.color }}>
                  <v.icon />
                </div>
                <h5>{v.title}</h5>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="section">
        <div className="container">
          <div className="about__grid">
            <div className="about__copy fade-in-left">
              <div className="section-tag">What We Do</div>
              <h2 className="section-title">Comprehensive IT Services<br />Across Every Industry</h2>
              <div className="divider" />
              <p className="section-desc">
                We serve clients across banking, healthcare, retail, manufacturing, government, and
                technology sectors — delivering tailored solutions for each industry's unique challenges.
              </p>
              <div className="check-list">
                {capabilities.map((cap) => (
                  <div key={cap} className="check-item">
                    <div className="check-icon"><LuCheck /></div>
                    <div className="check-text">{cap}</div>
                  </div>
                ))}
              </div>
              <div className="about__actions">
                <Link to="/services" className="btn-primary"><LuLayoutGrid /> See All Services</Link>
              </div>
            </div>

            <div className="tech-grid-card fade-in-right">
              <div className="tech-grid-card__label">Technology &amp; Platform Expertise</div>
              <div className="tech-grid">
                {techItems.map((t) => (
                  <div key={t.name} className="tech-item">
                    <span className="tech-item__icon" style={{ color: t.color }}><t.icon /></span>
                    <span className="tech-item__name">{t.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <StatsBar />
      <CtaBanner
        title="Ready to Work With"
        highlight="DSR Tech?"
        desc="Let's discuss how we can accelerate your technology roadmap and deliver real business results."
        btnLabel="Start the Conversation"
        btnTo="/contact"
      />
    </>
  );
}
