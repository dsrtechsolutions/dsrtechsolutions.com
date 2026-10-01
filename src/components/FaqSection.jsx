import { useState } from 'react';
import { LuMinus, LuPlus } from 'react-icons/lu';
import faqImg from '../assets/images/faq.jpg';

const faqs = [
  {
    q: 'What is the process for starting a project?',
    a: 'We begin with a free consultation to understand your requirements, followed by a detailed proposal with scope, timeline, and pricing. Once approved, we assign a dedicated team and kick off with an agile sprint plan.',
  },
  {
    q: 'What IT services does DSR Tech Solutions provide?',
    a: 'We offer B2B Solutions, CRM Development, Mobile Applications, Business Intelligence, Application Testing, Enterprise Mobility, BPM & SOA, E-Commerce platforms, and custom Application Development on SAP, Oracle, IBM, and Microsoft stacks.',
  },
  {
    q: 'How does your IT staffing process work?',
    a: 'Our IT staffing team sources, vets, and places top-tier engineers across contract, contract-to-hire, and permanent roles. We match candidates based on technical skills, culture fit, and domain expertise — typically within 3–5 business days.',
  },
  {
    q: 'Do you work with clients outside India?',
    a: 'Yes. DSR Tech Solutions serves clients in India and internationally, including the United States. We maintain clear communication channels to ensure seamless project delivery across time zones.',
  },
  {
    q: 'What is your typical project delivery timeline?',
    a: 'After an initial discovery call, we provide a detailed project plan with milestones and estimated delivery dates. Most mid-scale projects are delivered within 8–16 weeks following agile methodology.',
  },
];

export default function FaqSection() {
  const [open, setOpen] = useState(0);

  return (
    <section className="section section--light">
      <div className="container">
        <div className="faq__layout">
          {/* Image side */}
          <div className="faq__img-wrap">
            <img src={faqImg} alt="Consultant working through a client project plan" loading="lazy" />
          </div>

          {/* Accordion side */}
          <div>
            <div className="section-header left" style={{ marginBottom: '32px' }}>
              <div className="section-tag">FAQ</div>
              <h2 className="section-title">
                Frequently Asked<br /><span className="hl">Questions</span>
              </h2>
              <div className="divider" style={{ marginLeft: 0 }} />
            </div>

            <div className="faq__list">
              {faqs.map((f, i) => (
                <div
                  key={i}
                  className={`faq-item${open === i ? ' open' : ''}`}
                >
                  <button
                    className="faq-item__question"
                    onClick={() => setOpen(open === i ? -1 : i)}
                    aria-expanded={open === i}
                  >
                    <span>{f.q}</span>
                    <span className="faq-item__icon">{open === i ? <LuMinus /> : <LuPlus />}</span>
                  </button>
                  <div className="faq-item__answer">
                    <p>{f.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
