import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { LuCalendar, LuChevronRight, LuFileText, LuMail, LuMapPin, LuPhone } from 'react-icons/lu';
import PageHero from './PageHero';
import contact from '../data/contact';
import SocialLinks from './SocialLinks';

export default function LegalPage({ badge, title, highlight, docTitle, updated, intro, sections, related }) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = `${docTitle} — DSR Tech Solutions`;
    return () => { document.title = prevTitle; };
  }, [docTitle]);

  const [activeId, setActiveId] = useState(sections[0]?.id);
  // After a TOC click, keep that item highlighted while the smooth scroll runs —
  // sections near the page bottom can't reach the top, so the observer would pick another.
  const clickLockUntil = useRef(0);

  // Highlight the section currently being read.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (Date.now() < clickLockUntil.current) return;
        const visible = entries.filter((en) => en.isIntersecting);
        if (visible.length) setActiveId(visible[0].target.id);
      },
      { rootMargin: '-90px 0px -65% 0px' },
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [sections]);

  const jumpTo = (e, id) => {
    e.preventDefault();
    setActiveId(id);
    clickLockUntil.current = Date.now() + 1200;
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <PageHero badge={badge} title={title} highlight={highlight} breadcrumb={docTitle} />

      <section className="section">
        <div className="container legal">
          {/* Table of contents */}
          <aside className="legal__toc">
            <div className="legal__toc-box">
              <h5><LuFileText /> On This Page</h5>
              <ol>
                {sections.map((s, i) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      onClick={(e) => jumpTo(e, s.id)}
                      className={activeId === s.id ? 'active' : undefined}
                      aria-current={activeId === s.id ? 'location' : undefined}
                    >
                      <span className="legal__toc-num">{i + 1}</span>
                      {s.title}
                      <LuChevronRight className="legal__toc-chevron" />
                    </a>
                  </li>
                ))}
              </ol>
            </div>
            {related && (
              <Link to={related.to} className="legal__related">
                <LuFileText /> Read our {related.label}
              </Link>
            )}
          </aside>

          {/* Document */}
          <article className="legal__doc">
            <div className="legal__updated"><LuCalendar /> Last updated: {updated}</div>
            <div className="legal__intro">{intro}</div>

            {sections.map((s, i) => (
              <section key={s.id} id={s.id} className="legal__section">
                <h2><span>{String(i + 1).padStart(2, '0')}</span>{s.title}</h2>
                {s.body}
              </section>
            ))}

            <div className="legal__contact">
              <h3>Questions about this {docTitle.toLowerCase()}?</h3>
              <p>Contact DSR Tech Solutions using any of the details below.</p>
              <div className="legal__contact-grid">
                <a href={contact.mapsLink} target="_blank" rel="noreferrer"><LuMapPin /> {contact.address}</a>
                <a href={contact.phoneHref}><LuPhone /> {contact.phone}</a>
                <a href={contact.emailHref}><LuMail /> {contact.email}</a>
              </div>
              <SocialLinks className="legal__contact-socials" />
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
