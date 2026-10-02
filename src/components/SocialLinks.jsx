import { FaFacebookF, FaInstagram, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6';
import contact from '../data/contact';

// Same networks, order and URLs everywhere (top bar, footer, contact page).
// URLs live in src/data/contact.js → socials.
const NETWORKS = [
  { key: 'facebook', label: 'Facebook', icon: FaFacebookF },
  { key: 'x', label: 'X (Twitter)', icon: FaXTwitter },
  { key: 'linkedin', label: 'LinkedIn', icon: FaLinkedinIn },
  { key: 'instagram', label: 'Instagram', icon: FaInstagram },
];

export default function SocialLinks({ className }) {
  return (
    <div className={className}>
      {NETWORKS.filter((n) => contact.socials[n.key]).map(({ key, label, icon: Icon }) => (
        <a key={key} href={contact.socials[key]} target="_blank" rel="noreferrer" aria-label={label}>
          <Icon />
        </a>
      ))}
    </div>
  );
}
