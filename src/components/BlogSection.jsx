import { LuArrowRight, LuCalendar, LuUser } from 'react-icons/lu';
import aiImg from '../assets/images/blog-ai.jpg';
import mobileImg from '../assets/images/blog-mobile.jpg';
import biImg from '../assets/images/blog-bi.jpg';

const posts = [
  {
    img: aiImg,
    cat: 'Technology',
    date: 'Oct 1, 2026',
    author: 'Dinesh Sharma',
    title: '5 Ways AI is Transforming IT Staffing in 2026',
    desc: 'Artificial intelligence is reshaping how companies source, vet, and onboard IT talent — here\'s what you need to know.',
  },
  {
    img: mobileImg,
    cat: 'Mobile',
    date: 'Sep 15, 2026',
    author: 'Ravi Kumar',
    title: 'React Native vs Flutter: Which Should You Choose in 2026?',
    desc: 'A comprehensive comparison of the two leading cross-platform mobile frameworks to help you make the right decision.',
  },
  {
    img: biImg,
    cat: 'Analytics',
    date: 'Sep 5, 2026',
    author: 'Priya Gupta',
    title: 'Building Real-Time BI Dashboards with Power BI and Azure',
    desc: 'Step-by-step guide to connecting live data sources and building executive-grade dashboards your team will actually use.',
  },
];

export default function BlogSection() {
  return (
    <section className="section section--light">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">Blog &amp; News</div>
          <h2 className="section-title">
            Latest Blog &amp; <span className="hl">News</span>
          </h2>
          <div className="divider" />
          <p className="section-desc">
            Stay up to date with the latest insights, trends, and news from the world of
            IT solutions, staffing, and digital transformation.
          </p>
        </div>

        <div className="blog__grid">
          {posts.map((p) => (
            <div key={p.title} className="blog-card">
              <div className="blog-card__img">
                <img src={p.img} alt={p.title} loading="lazy" />
                <span className="blog-card__cat">{p.cat}</span>
              </div>
              <div className="blog-card__body">
                <div className="blog-card__meta">
                  <span><LuCalendar /> {p.date}</span>
                  <span><LuUser /> {p.author}</span>
                </div>
                <h5 className="blog-card__title">{p.title}</h5>
                <p className="blog-card__desc">{p.desc}</p>
                <span className="blog-card__link">Read More <LuArrowRight /></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
