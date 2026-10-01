import { Link } from 'react-router-dom';
import { LuArrowRight, LuCheck, LuMessagesSquare } from 'react-icons/lu';
import aboutImg from '../assets/images/about-team.jpg';

const checkItems = [
  { bold: 'India & US offices', text: 'delivering nationwide coverage and local expertise.' },
  { bold: 'End-to-end IT staffing', text: '— contract, contract-to-hire, and permanent placement.' },
  { bold: 'Deep technology expertise', text: 'across SAP, Oracle, IBM, Microsoft, and open-source.' },
  { bold: 'Agile delivery model', text: 'ensuring transparency, speed, and measurable results.' },
];

export default function AboutSection() {
  return (
    <section className="section">
      <div className="container">
        <div className="about__grid">

          {/* Image side */}
          <div className="about__img-wrap">
            <div className="about__img-main">
              <img src={aboutImg} alt="DSR Tech Solutions team celebrating a successful delivery" loading="lazy" />
            </div>
            <div className="about__img-badge">
              <div className="badge-num">10+</div>
              <div className="badge-lbl">Years of Excellence</div>
            </div>
          </div>

          {/* Copy side */}
          <div className="about__copy">
            <div className="section-tag">About Us</div>
            <h2 className="section-title">
              Building Dreams One<br /><span className="hl">Brick at a Time</span>
            </h2>
            <div className="divider" />
            <p style={{ color: 'var(--text-light)', lineHeight: 1.85, marginBottom: '20px', fontSize: '0.95rem' }}>
              DSR Tech Solutions is a premier IT solutions and staffing firm serving clients
              from mid-size businesses to Fortune 500 companies. We combine integrity, wisdom,
              and deep technology expertise to drive exceptional outcomes.
            </p>
            <p style={{ color: 'var(--text-light)', lineHeight: 1.85, marginBottom: '24px', fontSize: '0.95rem' }}>
              Our mission: connect the right talent with the right opportunity and deliver
              technology solutions that create real, measurable business value — guided by
              integrity and a relentless focus on quality.
            </p>

            <div className="check-list">
              {checkItems.map((c) => (
                <div key={c.bold} className="check-item">
                  <div className="check-icon"><LuCheck /></div>
                  <div className="check-text">
                    <strong>{c.bold}</strong> {c.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="about__actions">
              <Link to="/about" className="btn-primary">Learn More About Us <LuArrowRight /></Link>
              <Link to="/contact" className="btn-outline-dark"><LuMessagesSquare /> Talk to an Expert</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
