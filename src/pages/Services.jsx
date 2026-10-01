import { Navigate, useLocation } from 'react-router-dom';
import {
  SiAndroid, SiApple, SiGooglecloud, SiNodedotjs, SiPython, SiReact, SiSap,
} from 'react-icons/si';
import { FaAws, FaJava, FaMicrosoft } from 'react-icons/fa6';
import { GrOracle } from 'react-icons/gr';
import { VscAzure } from 'react-icons/vsc';
import PageHero from '../components/PageHero';
import ServiceCard from '../components/ServiceCard';
import CtaBanner from '../components/CtaBanner';
import services, { getServiceByAnchor, servicePath } from '../data/services';
import heroServices from '../assets/images/hero-services.jpg';

const techs = [
  { icon: SiSap, name: 'SAP', color: '#0faaff' },
  { icon: GrOracle, name: 'Oracle', color: '#f80000' },
  { icon: FaMicrosoft, name: 'Microsoft', color: '#00a4ef' },
  { icon: FaAws, name: 'AWS', color: '#ff9900' },
  { icon: SiGooglecloud, name: 'Google Cloud', color: '#4285f4' },
  { icon: SiApple, name: 'iOS', color: '#000000' },
  { icon: SiAndroid, name: 'Android', color: '#3ddc84' },
  { icon: SiReact, name: 'React', color: '#61dafb' },
  { icon: SiNodedotjs, name: 'Node.js', color: '#5fa04e' },
  { icon: SiPython, name: 'Python', color: '#3776ab' },
  { icon: FaJava, name: 'Java', color: '#e76f00' },
  { icon: VscAzure, name: 'Azure', color: '#0078d4' },
];

export default function Services() {
  const { hash } = useLocation();

  // Old links like /services#b2b now live on their own page.
  const legacy = hash && getServiceByAnchor(hash.slice(1));
  if (legacy) return <Navigate to={servicePath(legacy)} replace />;

  return (
    <>
      <PageHero
        badge="10+ Specialized Services"
        title="Our"
        highlight="IT Services"
        desc="End-to-end technology solutions from ideation through deployment and beyond — tailored to your business goals."
        breadcrumb="Services"
        image={heroServices}
      />

      {/* All services */}
      <section className="section section--light">
        <div className="container">
          <div className="section-header">
            <div className="section-tag">What We Offer</div>
            <h2 className="section-title">Complete <span className="text-grad">Technology</span> Solutions</h2>
            <div className="divider" />
            <p className="section-desc">
              From strategy to execution, we deliver technology services that drive efficiency, growth,
              and competitive advantage. Select a service to explore it in depth.
            </p>
          </div>
          <div className="services__grid services__grid--centered">
            {services.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="section-tag">Technology Expertise</div>
            <h2 className="section-title">Platforms &amp; <span className="text-grad">Technologies</span> We Master</h2>
            <div className="divider" />
          </div>
          <div className="tech-stack__grid">
            {techs.map((t) => (
              <div key={t.name} className="tech-stack__item">
                <span className="tech-stack__icon" style={{ color: t.color }}><t.icon /></span>
                <span className="tech-stack__name">{t.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        title="Need a Custom"
        highlight="Solution?"
        desc="Our experts are ready to analyze your requirements and craft the perfect technology solution for your business."
        btnLabel="Request a Free Consultation"
        btnTo="/contact"
      />
    </>
  );
}
