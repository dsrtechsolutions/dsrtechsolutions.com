import { LuArrowRight, LuCodeXml, LuPencilRuler, LuRocket, LuSearch } from 'react-icons/lu';

const steps = [
  {
    num: '01',
    icon: LuSearch,
    title: 'Planning & Design',
    desc: 'In-depth analysis of your business goals, pain points, and technology landscape to build the right strategy.',
  },
  {
    num: '02',
    icon: LuPencilRuler,
    title: 'Foundation Work',
    desc: 'Architects and UX designers craft detailed solution blueprints, wireframes, and technical architecture.',
  },
  {
    num: '03',
    icon: LuCodeXml,
    title: 'Interior & Exterior',
    desc: 'Agile sprints, continuous integration, and code reviews ensure high-quality, secure deliverables at every milestone.',
  },
  {
    num: '04',
    icon: LuRocket,
    title: 'Final Touches',
    desc: 'Post-launch monitoring, maintenance, and support so your solution keeps performing at its best every day.',
  },
];

export default function ProcessSection() {
  return (
    <section className="section section--dark">
      <div className="container">
        <div className="section-header">
          <div className="section-tag" style={{ color: 'rgba(255,255,255,0.5)' }}>Who to Work</div>
          <h2 className="section-title section-title--white">
            Standard Working <span className="hl">Process</span>
          </h2>
          <div className="divider" style={{ margin: '14px auto 0' }} />
        </div>

        <div className="process__grid">
          {steps.map((s, i) => (
            <div key={s.num} className="process-step">
              <div className="process-step__num">{s.num}</div>
              <span className="process-step__icon"><s.icon /></span>
              <h5>{s.title}</h5>
              <p>{s.desc}</p>
              {i < steps.length - 1 && (
                <div className="process-step__connector"><LuArrowRight /></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
