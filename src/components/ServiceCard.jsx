import { Link } from 'react-router-dom';
import { LuArrowRight } from 'react-icons/lu';
import { servicePath } from '../data/services';

export default function ServiceCard({ service: s }) {
  return (
    <Link to={servicePath(s)} className="service-card">
      <div className="service-card__img">
        <img src={s.img} alt={s.name} loading="lazy" />
        <span className="service-card__icon"><s.icon /></span>
      </div>
      <div className="service-card__body">
        <h4>{s.name}</h4>
        <p>{s.summary}</p>
        <span className="svc-link">
          Learn More <LuArrowRight />
        </span>
      </div>
    </Link>
  );
}
