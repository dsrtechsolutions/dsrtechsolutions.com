import { Link } from 'react-router-dom';
import LegalPage from '../components/LegalPage';
import contact from '../data/contact';

const sections = [
  {
    id: 'information-we-collect',
    title: 'Information We Collect',
    body: (
      <>
        <p>We collect only the information needed to respond to you and provide our services.</p>
        <h4>Information you give us</h4>
        <ul>
          <li><strong>Contact form:</strong> your name, email address, phone number (optional), the topic you select, and your message.</li>
          <li><strong>Direct communication:</strong> anything you share when you email or call us, such as project requirements or company details.</li>
          <li><strong>Staffing candidates:</strong> if you apply for a role or send us your résumé, we collect your work history, skills, education, and contact details.</li>
        </ul>
        <h4>Information collected automatically</h4>
        <ul>
          <li>Basic technical data your browser sends, such as IP address, browser type, device type, pages visited, and the date and time of your visit.</li>
          <li>Information collected by third-party services embedded on our site (see <a href="#third-party-services">Third-Party Services</a>).</li>
        </ul>
      </>
    ),
  },
  {
    id: 'how-we-use',
    title: 'How We Use Your Information',
    body: (
      <>
        <p>We use your information to:</p>
        <ul>
          <li>Respond to your enquiries and prepare proposals or quotes.</li>
          <li>Deliver, manage, and support the IT services and staffing engagements you request.</li>
          <li>Match candidates with suitable job opportunities, with their consent.</li>
          <li>Send service-related communications, such as project updates or invoices.</li>
          <li>Maintain the security of our website and prevent fraud or misuse.</li>
          <li>Understand how our website is used so we can improve it.</li>
          <li>Comply with legal, tax, and regulatory obligations.</li>
        </ul>
        <p>We do <strong>not</strong> sell your personal information, and we do not use it for automated decision-making that has legal effects on you.</p>
      </>
    ),
  },
  {
    id: 'sharing',
    title: 'How We Share Information',
    body: (
      <>
        <p>We share personal information only when necessary, and only with:</p>
        <ul>
          <li><strong>Service providers</strong> who help us run our business (for example email, hosting, and IT providers), under obligations to protect your data.</li>
          <li><strong>Clients</strong>, in the case of staffing candidates, and only with the candidate&apos;s permission.</li>
          <li><strong>Our team members</strong> in the United States and India who need the information to deliver your project.</li>
          <li><strong>Authorities or other parties</strong> when required by law, court order, or to protect our rights, property, or safety.</li>
          <li><strong>A successor business</strong> if DSR Tech Solutions is involved in a merger, acquisition, or sale of assets.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'cookies',
    title: 'Cookies & Similar Technologies',
    body: (
      <>
        <p>
          Our website itself does not set advertising or tracking cookies. However, embedded third-party
          services (such as Google Maps and Google Fonts) may set cookies or collect technical data when
          their content loads. You can block or delete cookies in your browser settings; the site will
          continue to work, although embedded maps may not display.
        </p>
      </>
    ),
  },
  {
    id: 'third-party-services',
    title: 'Third-Party Services & Links',
    body: (
      <>
        <p>Our website uses or links to services operated by other companies, including:</p>
        <ul>
          <li><strong>Google Maps</strong> — to show our office location on the Contact page.</li>
          <li><strong>Google Fonts</strong> — to load the typefaces used on this site.</li>
          <li><strong>LinkedIn, X (Twitter), and Facebook</strong> — through links to our social profiles.</li>
        </ul>
        <p>
          These services have their own privacy policies, and we are not responsible for their practices.
          We encourage you to review their policies before interacting with them.
        </p>
      </>
    ),
  },
  {
    id: 'data-security',
    title: 'Data Security',
    body: (
      <p>
        We use reasonable administrative, technical, and physical safeguards to protect your information,
        including encrypted connections (HTTPS), access controls, and limiting access to people who need it.
        No method of transmission or storage is completely secure, so we cannot guarantee absolute security.
      </p>
    ),
  },
  {
    id: 'data-retention',
    title: 'Data Retention',
    body: (
      <p>
        We keep personal information only as long as needed for the purposes described in this policy — for
        example, for the length of a business relationship, or as required for legal, tax, and accounting
        purposes. Candidate information is kept while it remains useful for matching you with opportunities,
        unless you ask us to delete it sooner.
      </p>
    ),
  },
  {
    id: 'international-transfers',
    title: 'International Data Transfers',
    body: (
      <p>
        DSR Tech Solutions operates in the United States and India. Your information may be processed in
        either country, where data-protection laws may differ from those where you live. When we transfer
        information, we take steps to make sure it remains protected in line with this policy.
      </p>
    ),
  },
  {
    id: 'your-rights',
    title: 'Your Privacy Rights',
    body: (
      <>
        <p>Depending on where you live, you may have the right to:</p>
        <ul>
          <li>Ask what personal information we hold about you and request a copy.</li>
          <li>Ask us to correct information that is inaccurate or incomplete.</li>
          <li>Ask us to delete your personal information.</li>
          <li>Opt out of marketing communications at any time.</li>
          <li>Withdraw consent where we rely on your consent.</li>
        </ul>
        <p>
          To make a request, email us at <a href={contact.emailHref}>{contact.email}</a>. We may need to
          verify your identity before responding, and we will not discriminate against you for exercising
          your rights.
        </p>
      </>
    ),
  },
  {
    id: 'children',
    title: "Children's Privacy",
    body: (
      <p>
        Our website and services are intended for businesses and adults. We do not knowingly collect
        personal information from children under 13. If you believe a child has given us personal
        information, please contact us and we will delete it.
      </p>
    ),
  },
  {
    id: 'changes',
    title: 'Changes to This Policy',
    body: (
      <p>
        We may update this Privacy Policy from time to time. When we do, we will change the &ldquo;Last
        updated&rdquo; date at the top of this page. Significant changes will be highlighted on our website.
        Please also review our <Link to="/terms-of-service">Terms of Service</Link>.
      </p>
    ),
  },
];

export default function PrivacyPolicy() {
  return (
    <LegalPage
      badge="Legal"
      title="Privacy"
      highlight="Policy"
      docTitle="Privacy Policy"
      updated="October 1, 2026"
      intro={(
        <p>
          DSR Tech Solutions (&ldquo;DSR Tech Solutions&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or
          &ldquo;our&rdquo;), located at {contact.address}, respects your privacy. This Privacy Policy explains
          what information we collect when you visit <strong>{contact.website}</strong> or contact us, how we use
          it, and the choices you have.
        </p>
      )}
      sections={sections}
      related={{ label: 'Terms of Service', to: '/terms-of-service' }}
    />
  );
}
