import { LuAward, LuUsers, LuRocket, LuSmile } from 'react-icons/lu';
import CountUp from './CountUp';

const stats = [
  { icon: LuAward, end: 10, suffix: '+', label: 'Years of Experience' },
  { icon: LuUsers, end: 50, suffix: '+', label: 'Satisfied Clients' },
  { icon: LuRocket, end: 100, suffix: '+', label: 'Projects Delivered' },
  { icon: LuSmile, end: 99, suffix: '%', label: 'Client Satisfaction' },
];

export default function StatsBar() {
  return (
    <div className="stats-bar">
      <div className="container">
        <div className="stats-bar__grid">
          {stats.map((s) => (
            <div key={s.label} className="stat-box">
              <div className="stat-icon"><s.icon /></div>
              <div className="stat-num">
                <CountUp end={s.end} suffix={s.suffix} />
              </div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
