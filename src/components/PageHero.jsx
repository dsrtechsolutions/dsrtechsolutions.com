import { Link } from 'react-router-dom';
import { LuChevronRight, LuHouse } from 'react-icons/lu';

export default function PageHero({ badge, title, highlight, desc, breadcrumb, parent, image }) {
  return (
    <section
      className={`page-hero${image ? ' page-hero--image' : ''}`}
      style={image ? { backgroundImage: `url(${image})` } : undefined}
    >
      <div className="container page-hero__inner">
        <div className="hero__badge" style={{ marginBottom: '16px' }}>
          <span className="dot" /> {badge}
        </div>
        <h1>
          {title}{highlight && <> <span style={{ color: 'var(--orange)' }}>{highlight}</span></>}
        </h1>
        {desc && <p>{desc}</p>}
        <div className="breadcrumb">
          <Link to="/"><LuHouse /> Home</Link>
          <span className="breadcrumb__sep"><LuChevronRight /></span>
          {parent && (
            <>
              <Link to={parent.to}>{parent.label}</Link>
              <span className="breadcrumb__sep"><LuChevronRight /></span>
            </>
          )}
          <span>{breadcrumb}</span>
        </div>
      </div>
    </section>
  );
}
