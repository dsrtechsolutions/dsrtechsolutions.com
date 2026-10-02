import { LuClock, LuGlobe, LuMapPin, LuPhoneCall } from 'react-icons/lu';
import contact from '../data/contact';
import SocialLinks from './SocialLinks';

export default function TopBar() {
  return (
    <div className="topbar">
      <ul className="topbar__info">
        <li>
          <LuClock className="topbar__icon" />
          <span>{contact.hours} · {contact.days}</span>
        </li>
        <li>
          <LuPhoneCall className="topbar__icon" />
          <a href={contact.phoneHref}>{contact.phone}</a>
        </li>
        <li className="topbar__address">
          <LuMapPin className="topbar__icon" />
          <a href={contact.mapsLink} target="_blank" rel="noreferrer">{contact.address}</a>
        </li>
      </ul>

      <div className="topbar__side">
        <label className="topbar__lang">
          <LuGlobe />
          <span className="sr-only">Language</span>
          <select defaultValue="en">
            <option value="en">English</option>
          </select>
        </label>
        <span className="topbar__divider" aria-hidden="true" />
        <SocialLinks className="topbar__socials" />
      </div>
    </div>
  );
}
