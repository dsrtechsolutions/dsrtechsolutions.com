import { Link } from 'react-router-dom';
import LegalPage from '../components/LegalPage';
import contact from '../data/contact';

const sections = [
  {
    id: 'acceptance',
    title: 'Acceptance of Terms',
    body: (
      <p>
        By accessing or using <strong>{contact.website}</strong> (the &ldquo;Website&rdquo;), you agree to be
        bound by these Terms of Service and our <Link to="/privacy-policy">Privacy Policy</Link>. If you do
        not agree, please do not use the Website.
      </p>
    ),
  },
  {
    id: 'our-services',
    title: 'Our Services',
    body: (
      <>
        <p>
          DSR Tech Solutions provides IT consulting, software and application development, business
          intelligence, testing, e-commerce, and IT staffing services. The Website describes these services
          for general information only.
        </p>
        <p>
          Any engagement with us is governed by a separate written agreement — such as a Master Services
          Agreement, Statement of Work, or staffing agreement. If that agreement conflicts with these Terms,
          the written agreement takes precedence.
        </p>
      </>
    ),
  },
  {
    id: 'pricing',
    title: 'Pricing & Quotes',
    body: (
      <p>
        Prices and plans shown on the Website are indicative and may change without notice. They do not
        constitute an offer. Final pricing, scope, and payment terms are confirmed in a written proposal or
        agreement signed by both parties.
      </p>
    ),
  },
  {
    id: 'staffing',
    title: 'IT Staffing',
    body: (
      <ul>
        <li>We make reasonable efforts to match candidates with suitable roles, but we do not guarantee placement, employment, or any specific result.</li>
        <li>Clients are responsible for their own hiring decisions and for complying with applicable employment laws.</li>
        <li>Candidates must provide accurate and truthful information about their qualifications and work history.</li>
      </ul>
    ),
  },
  {
    id: 'acceptable-use',
    title: 'Acceptable Use',
    body: (
      <>
        <p>When using the Website, you agree not to:</p>
        <ul>
          <li>Break any applicable law or regulation.</li>
          <li>Submit false, misleading, or someone else&apos;s information through our forms.</li>
          <li>Attempt to gain unauthorized access to the Website, its servers, or related systems.</li>
          <li>Upload or send viruses, malware, or other harmful code.</li>
          <li>Scrape, copy, or harvest content or data from the Website using automated tools without our permission.</li>
          <li>Interfere with or disrupt the Website or other users&apos; use of it.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'intellectual-property',
    title: 'Intellectual Property',
    body: (
      <>
        <p>
          The Website and its content — including text, graphics, logos, and design — are owned by DSR Tech
          Solutions or its licensors and are protected by copyright and trademark laws. You may view and print
          pages for your own non-commercial use, but you may not copy, modify, distribute, or republish them
          without our written permission.
        </p>
        <p>
          Third-party names and logos shown on the Website (such as SAP, Oracle, Microsoft, AWS, and Google)
          are trademarks of their respective owners and are used only to describe the technologies we work
          with. Their use does not imply endorsement.
        </p>
        <p>
          Ownership of work created for clients is defined in the applicable client agreement.
        </p>
      </>
    ),
  },
  {
    id: 'third-party-links',
    title: 'Third-Party Links',
    body: (
      <p>
        The Website may contain links to third-party websites or services, such as Google Maps and social
        media platforms. We do not control and are not responsible for their content, policies, or practices.
        Accessing them is at your own risk.
      </p>
    ),
  },
  {
    id: 'disclaimer',
    title: 'Disclaimer of Warranties',
    body: (
      <p>
        The Website and its content are provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo;. To the
        fullest extent permitted by law, DSR Tech Solutions makes no warranties, express or implied, including
        warranties of merchantability, fitness for a particular purpose, accuracy, or non-infringement. We do
        not guarantee that the Website will be uninterrupted, error-free, or free of harmful components.
      </p>
    ),
  },
  {
    id: 'limitation-of-liability',
    title: 'Limitation of Liability',
    body: (
      <p>
        To the fullest extent permitted by law, DSR Tech Solutions and its officers, employees, and partners
        will not be liable for any indirect, incidental, special, consequential, or punitive damages, or for
        any loss of profits, data, or business, arising from your use of — or inability to use — the Website.
        Liability relating to client engagements is governed by the applicable written agreement.
      </p>
    ),
  },
  {
    id: 'indemnification',
    title: 'Indemnification',
    body: (
      <p>
        You agree to indemnify and hold harmless DSR Tech Solutions from any claims, damages, losses, or
        expenses (including reasonable legal fees) arising from your misuse of the Website or your breach of
        these Terms.
      </p>
    ),
  },
  {
    id: 'governing-law',
    title: 'Governing Law',
    body: (
      <p>
        These Terms are governed by the laws of the State of North Carolina, United States, without regard to
        its conflict-of-law rules. Any dispute arising from these Terms or the Website will be brought
        exclusively in the state or federal courts located in Wake County, North Carolina.
      </p>
    ),
  },
  {
    id: 'changes',
    title: 'Changes to These Terms',
    body: (
      <p>
        We may update these Terms from time to time. Changes take effect when posted on this page, and the
        &ldquo;Last updated&rdquo; date will be revised. Continuing to use the Website after changes are posted
        means you accept the updated Terms.
      </p>
    ),
  },
];

export default function TermsOfService() {
  return (
    <LegalPage
      badge="Legal"
      title="Terms of"
      highlight="Service"
      docTitle="Terms of Service"
      updated="October 1, 2026"
      intro={(
        <p>
          These Terms of Service govern your use of the website operated by DSR Tech Solutions
          (&ldquo;DSR Tech Solutions&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;),
          located at {contact.address}. Please read them carefully.
        </p>
      )}
      sections={sections}
      related={{ label: 'Privacy Policy', to: '/privacy-policy' }}
    />
  );
}
