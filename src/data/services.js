import {
  LuActivity, LuBadgeCheck, LuBell, LuBot, LuBrain, LuBug, LuChartColumn, LuChartLine,
  LuCircleDollarSign, LuClipboardCheck, LuCloud, LuCodeXml, LuCpu, LuCreditCard, LuDatabase,
  LuEye, LuFactory, LuFlaskConical, LuGauge, LuGitBranch, LuHandshake,
  LuHeartHandshake, LuHistory, LuLayers, LuLink, LuLock, LuMonitorSmartphone, LuNetwork,
  LuPackage, LuPiggyBank, LuPuzzle, LuRefreshCw, LuRepeat, LuScale, LuShieldCheck,
  LuShoppingCart, LuSmartphone, LuStore, LuTabletSmartphone, LuTarget, LuTimer, LuTruck,
  LuUserCheck, LuUsers, LuWifiOff, LuWorkflow, LuWrench, LuZap,
} from 'react-icons/lu';
import b2bImg from '../assets/images/svc-b2b.jpg';
import crmImg from '../assets/images/svc-crm.jpg';
import mobileImg from '../assets/images/svc-mobile.jpg';
import biImg from '../assets/images/svc-bi.jpg';
import testingImg from '../assets/images/svc-testing.jpg';
import mobilityImg from '../assets/images/svc-mobility.jpg';
import bpmImg from '../assets/images/svc-bpm.jpg';
import ecommerceImg from '../assets/images/svc-ecommerce.jpg';
import appdevImg from '../assets/images/svc-appdev.jpg';
import geImg from '../assets/images/svc-ge.jpg';

/*
  Single source of truth for every service.
  - `featured` services appear on the Home page and in the footer.
  - `anchor` keeps old /services#anchor links working (redirected to the detail page).
*/
const services = [
  {
    slug: 'b2b-solutions',
    anchor: 'b2b',
    featured: true,
    icon: LuHandshake,
    img: b2bImg,
    name: 'B2B Solutions',
    title: 'Business-to-Business (B2B) Solutions',
    summary: 'Integrated B2B platforms, EDI solutions, and supply chain automation that streamline your partner ecosystems.',
    intro: 'Our B2B solutions integrate your business with partners, suppliers, and customers through robust electronic data interchange (EDI), API-driven platforms, and custom integration middleware.',
    detail: 'Whether you are onboarding hundreds of trading partners or automating a single high-volume order flow, we design integrations that are secure, monitored, and easy to extend — so your partner network becomes a competitive advantage instead of an operational burden.',
    offerings: [
      'EDI Implementation & Integration',
      'Supplier & Vendor Portals',
      'API-driven B2B Platforms',
      'Order Management Systems',
      'Procurement Automation',
      'Supply Chain Integration',
    ],
    benefits: [
      { icon: LuTimer, title: 'Faster Processing', text: 'Cut order and invoice processing time by up to 60% with automated document exchange.' },
      { icon: LuPiggyBank, title: 'Lower Costs', text: 'Eliminate manual data entry, paper handling, and costly reconciliation errors.' },
      { icon: LuEye, title: 'Real-time Visibility', text: 'Track every order, shipment, and payment across your partner network as it happens.' },
      { icon: LuLink, title: 'Easy Partner Onboarding', text: 'Reusable connectors and mappings get new trading partners live in days, not months.' },
    ],
    tech: ['EDI X12 / EDIFACT', 'AS2 / SFTP', 'REST & GraphQL APIs', 'MuleSoft', 'Boomi', 'SAP PI/PO'],
  },
  {
    slug: 'crm-development',
    anchor: 'crm',
    featured: true,
    icon: LuUsers,
    img: crmImg,
    name: 'CRM Development',
    title: 'CRM — Customer Relationship Management',
    summary: 'Custom CRM and Salesforce implementations that manage relationships, automate sales, and improve retention.',
    intro: 'We design, implement, and customize CRM platforms that help you manage every stage of the customer lifecycle — from lead acquisition and nurturing to post-sale support and loyalty programs.',
    detail: 'Our consultants start with your sales and service processes, not the software. The result is a CRM your teams actually adopt: clean data, automated follow-ups, and dashboards that show exactly where revenue is won and lost.',
    offerings: [
      'Salesforce Implementation & Customization',
      'Microsoft Dynamics CRM',
      'Custom CRM Development',
      'Sales Pipeline Automation',
      'Customer 360 Integration',
      'Marketing Automation Connectors',
    ],
    benefits: [
      { icon: LuTarget, title: 'Higher Conversion', text: 'Lead scoring and automated nurturing help your team focus on deals most likely to close.' },
      { icon: LuHeartHandshake, title: 'Better Retention', text: 'A single customer view lets service teams resolve issues faster and spot churn risks early.' },
      { icon: LuRepeat, title: 'Automated Workflows', text: 'Remove repetitive admin work with approval flows, reminders, and auto-assignment.' },
      { icon: LuChartLine, title: 'Accurate Forecasting', text: 'Pipeline dashboards give leadership reliable, real-time revenue forecasts.' },
    ],
    tech: ['Salesforce', 'Dynamics 365', 'HubSpot', 'Zoho CRM', 'Apex & LWC', 'Power Automate'],
  },
  {
    slug: 'mobile-applications',
    anchor: 'mobile',
    featured: true,
    icon: LuSmartphone,
    img: mobileImg,
    name: 'Mobile Applications',
    title: 'Mobile Application Development',
    summary: 'Native iOS, Android, and cross-platform mobile apps designed for performance and seamless user experience.',
    intro: 'We develop high-performance native iOS and Android applications, as well as cross-platform solutions using React Native and Flutter. Our mobile teams are experts in UX-first design and offline-first architecture.',
    detail: 'From the first wireframe to App Store approval and beyond, we handle the complete lifecycle — design, development, backend APIs, analytics, and ongoing releases — so you get an app users love and keep coming back to.',
    offerings: [
      'Native iOS Development (Swift)',
      'Native Android Development (Kotlin)',
      'React Native / Flutter',
      'Mobile UI/UX Design',
      'App Store Submission & Support',
      'Backend API Integration',
    ],
    benefits: [
      { icon: LuGauge, title: 'Native Performance', text: 'Smooth, fast apps that feel at home on every device and OS version.' },
      { icon: LuWifiOff, title: 'Offline-first', text: 'Apps keep working without a connection and sync automatically when back online.' },
      { icon: LuBell, title: 'User Engagement', text: 'Push notifications, deep links, and in-app analytics that drive retention.' },
      { icon: LuMonitorSmartphone, title: 'One Codebase Option', text: 'Cross-platform builds reach iOS and Android faster at lower cost.' },
    ],
    tech: ['Swift', 'Kotlin', 'React Native', 'Flutter', 'Firebase', 'Node.js APIs'],
  },
  {
    slug: 'business-intelligence',
    anchor: 'bi',
    featured: true,
    icon: LuChartColumn,
    img: biImg,
    name: 'Business Intelligence',
    title: 'Business Intelligence & Analytics',
    summary: 'Advanced BI dashboards, data warehousing, OLAP cubes, and predictive analytics powered by leading platforms.',
    intro: 'Our BI practice helps organizations unlock the value of their data through interactive dashboards, data warehouses, OLAP cubes, and predictive analytics. We work with Tableau, Power BI, MicroStrategy, and custom data platforms.',
    detail: 'We consolidate scattered data sources into a single trusted model, then build dashboards around the decisions your leaders make every day — turning reports that take days to assemble into answers available in seconds.',
    offerings: [
      'Tableau & Power BI Dashboards',
      'Data Warehouse Design & Build',
      'OLAP Cube Development',
      'ETL Pipeline Engineering',
      'Predictive Analytics & ML Models',
      'Self-service BI Enablement',
    ],
    benefits: [
      { icon: LuZap, title: 'Faster Decisions', text: 'Executives get answers in hours instead of days with live, drill-down dashboards.' },
      { icon: LuDatabase, title: 'Single Source of Truth', text: 'One governed data model ends conflicting numbers between departments.' },
      { icon: LuBrain, title: 'Predictive Insights', text: 'Machine-learning models forecast demand, churn, and risk before they happen.' },
      { icon: LuUserCheck, title: 'Self-service Analytics', text: 'Business users explore data on their own without waiting on IT.' },
    ],
    tech: ['Power BI', 'Tableau', 'MicroStrategy', 'Azure Synapse', 'Snowflake', 'Python'],
  },
  {
    slug: 'application-testing',
    anchor: 'testing',
    featured: true,
    icon: LuFlaskConical,
    img: testingImg,
    name: 'Application Testing',
    title: 'Application Testing & QA',
    summary: 'Comprehensive QA services including UAT, SIT, performance, and automated regression testing for enterprise apps.',
    intro: 'Our comprehensive QA and testing services cover the full software development lifecycle. From manual test case design to fully automated regression suites, our QA engineers ensure every release is production-ready.',
    detail: 'We plug into your delivery pipeline with risk-based test strategies, reusable automation frameworks, and clear quality metrics — so releases ship faster with fewer surprises in production.',
    offerings: [
      'User Acceptance Testing (UAT)',
      'System Integration Testing (SIT)',
      'Functional Verification Testing (FVT)',
      'Performance & Load Testing',
      'Test Automation (Selenium, Cypress)',
      'Security & Penetration Testing',
    ],
    benefits: [
      { icon: LuBug, title: 'Fewer Production Defects', text: 'Catch issues early when they are cheapest and fastest to fix.' },
      { icon: LuRefreshCw, title: 'Faster Release Cycles', text: 'Automated regression suites run on every build inside your CI/CD pipeline.' },
      { icon: LuGauge, title: 'Proven Scalability', text: 'Load tests confirm your app holds up under real-world peak traffic.' },
      { icon: LuLock, title: 'Security Assurance', text: 'Vulnerability scans and penetration tests protect your users and data.' },
    ],
    tech: ['Selenium', 'Cypress', 'Playwright', 'JMeter', 'Postman', 'OWASP ZAP'],
  },
  {
    slug: 'enterprise-mobility',
    anchor: 'mobility',
    icon: LuTabletSmartphone,
    img: mobilityImg,
    name: 'Enterprise Mobility',
    title: 'Enterprise Mobility (MEAP Solutions)',
    summary: 'Secure mobile platforms that extend SAP, Oracle, and Salesforce business processes to your field workforce.',
    intro: 'Our enterprise mobility practice delivers Mobile Enterprise Application Platforms (MEAP) that securely extend business processes to mobile devices, integrating with SAP, Oracle, Salesforce, and other enterprise backends.',
    detail: 'We help you give employees secure access to the systems they need wherever they work — with device management, data protection, and offline capability built in from day one.',
    offerings: [
      'MEAP Platform Architecture',
      'Mobile Device Management (MDM)',
      'Enterprise App Distribution',
      'SAP/Oracle Mobile Extensions',
      'Secure Container Solutions',
      'Field Force Automation',
    ],
    benefits: [
      { icon: LuShieldCheck, title: 'Enterprise-grade Security', text: 'Encrypted containers, SSO, and remote wipe keep corporate data protected.' },
      { icon: LuTruck, title: 'Productive Field Teams', text: 'Technicians and sales reps complete work on-site without paperwork.' },
      { icon: LuNetwork, title: 'Backend Integration', text: 'Real-time sync with SAP, Oracle, and Salesforce keeps data consistent.' },
      { icon: LuLayers, title: 'Centralized Management', text: 'Deploy, update, and monitor apps and devices from one console.' },
    ],
    tech: ['SAP Mobile Platform', 'Microsoft Intune', 'VMware Workspace ONE', 'Oracle Mobile Hub', 'React Native', 'OAuth 2.0 / SSO'],
  },
  {
    slug: 'bpm-soa',
    anchor: 'bpm',
    icon: LuWorkflow,
    img: bpmImg,
    name: 'BPM & SOA',
    title: 'BPM & SOA — Business Process Management',
    summary: 'Model, automate, and optimize business processes using leading BPM platforms and service-oriented architecture.',
    intro: 'We help enterprises model, automate, and optimize business processes using BPM platforms and Service-Oriented Architecture frameworks using IBM BPM, Pega, Appian, and MuleSoft.',
    detail: 'By mapping how work really flows today and redesigning it around reusable services, we remove bottlenecks, reduce manual hand-offs, and give you full visibility into every process step.',
    offerings: [
      'Business Process Modeling (BPMN)',
      'IBM BPM / Pega / Appian',
      'SOA Architecture Design',
      'MuleSoft Integration',
      'Workflow Automation',
      'Process Mining & Optimization',
    ],
    benefits: [
      { icon: LuTimer, title: 'Shorter Cycle Times', text: 'Automated routing and approvals remove days of waiting from core processes.' },
      { icon: LuPuzzle, title: 'Reusable Services', text: 'SOA components are built once and reused across many applications.' },
      { icon: LuClipboardCheck, title: 'Compliance & Audit', text: 'Every process step is logged, making audits straightforward.' },
      { icon: LuActivity, title: 'Continuous Improvement', text: 'Process mining reveals where work slows down so you can fix it.' },
    ],
    tech: ['IBM BPM', 'Pega', 'Appian', 'MuleSoft', 'Camunda', 'Apache Kafka'],
  },
  {
    slug: 'e-commerce',
    anchor: 'ecommerce',
    featured: true,
    icon: LuShoppingCart,
    img: ecommerceImg,
    name: 'E-Commerce',
    title: 'E-Commerce Solutions',
    summary: 'Scalable B2B and B2C e-commerce platforms with PCI compliance, payment integration, and omni-channel support.',
    intro: 'We build comprehensive B2C and B2B e-commerce platforms that are scalable, PCI-compliant, and conversion-optimized — from Shopify Plus and Magento to fully custom storefronts.',
    detail: 'Our teams combine conversion-focused design with robust integrations to your ERP, inventory, and fulfilment systems, so your store grows smoothly from first sale to peak-season traffic.',
    offerings: [
      'B2C & B2B E-Commerce Platforms',
      'PCI DSS Compliance',
      'Shopify Plus / Magento / Custom',
      'Payment Gateway Integration',
      'Omni-channel Commerce',
      'Inventory & Order Management',
    ],
    benefits: [
      { icon: LuCircleDollarSign, title: 'Higher Conversions', text: 'Fast pages and frictionless checkout turn more visitors into customers.' },
      { icon: LuCreditCard, title: 'Secure Payments', text: 'PCI-compliant integrations with leading gateways, UPI, and wallets.' },
      { icon: LuStore, title: 'Omni-channel Selling', text: 'Sell consistently across web, mobile, marketplaces, and physical stores.' },
      { icon: LuPackage, title: 'Streamlined Fulfilment', text: 'Inventory and orders sync automatically with your ERP and warehouses.' },
    ],
    tech: ['Shopify Plus', 'Magento / Adobe Commerce', 'WooCommerce', 'Stripe', 'Razorpay', 'Next.js'],
  },
  {
    slug: 'application-development',
    anchor: 'appdev',
    icon: LuCodeXml,
    img: appdevImg,
    name: 'App Development',
    title: 'Application Development (ERP, CRM, SAP, Oracle, IBM)',
    summary: 'Enterprise-grade applications on SAP, Oracle, IBM, Microsoft, and open-source stacks, including legacy modernization.',
    intro: 'Our application development team builds enterprise-grade solutions on SAP, Oracle, IBM, Microsoft, and open-source stacks, specializing in ERP implementations, custom module development, and legacy modernization.',
    detail: 'Whether you need a new system built from scratch or an ageing platform moved to the cloud, we deliver in agile sprints with transparent progress, rigorous code reviews, and long-term support.',
    offerings: [
      'SAP S/4HANA Implementation',
      'Oracle ERP Cloud',
      'IBM WebSphere Applications',
      'Microsoft .NET / Azure',
      'Legacy Application Modernization',
      'Cloud-native Development',
    ],
    benefits: [
      { icon: LuCloud, title: 'Cloud-ready Architecture', text: 'Scalable, containerized applications that grow with your business.' },
      { icon: LuHistory, title: 'Legacy Modernization', text: 'Move old systems to modern stacks without disrupting daily operations.' },
      { icon: LuGitBranch, title: 'Agile Delivery', text: 'Working software every sprint with full visibility into progress.' },
      { icon: LuBadgeCheck, title: 'Enterprise Quality', text: 'Code reviews, automated tests, and documentation built into every release.' },
    ],
    tech: ['SAP S/4HANA', 'Oracle ERP Cloud', 'IBM WebSphere', '.NET', 'Java / Spring', 'Kubernetes'],
  },
  {
    slug: 'ge-application-development',
    anchor: 'ge',
    icon: LuFactory,
    img: geImg,
    name: 'GE Application Dev',
    title: 'GE-Application Development',
    summary: 'Industrial applications on GE software platforms that bring OT and IT together for smarter operations.',
    intro: 'Our GE application development practice focuses on building enterprise-grade applications leveraging GE\'s industrial software platforms, helping companies modernize their OT/IT convergence.',
    detail: 'We connect machines, sensors, and plant systems to enterprise analytics so operations teams can monitor asset health, predict failures, and optimize performance across every site.',
    offerings: [
      'Predix Platform Development',
      'Industrial IoT Integration',
      'OT/IT Convergence Solutions',
      'Asset Performance Management',
      'Digital Twin Development',
      'Edge Computing Solutions',
    ],
    benefits: [
      { icon: LuWrench, title: 'Predictive Maintenance', text: 'Spot equipment issues before they cause costly unplanned downtime.' },
      { icon: LuCpu, title: 'Connected Assets', text: 'Securely stream machine and sensor data into enterprise systems.' },
      { icon: LuBot, title: 'Operational Efficiency', text: 'Data-driven insights optimize throughput, energy use, and yield.' },
      { icon: LuScale, title: 'Scalable Across Sites', text: 'Roll out proven solutions from one plant to your entire fleet.' },
    ],
    tech: ['GE Predix', 'GE Digital APM', 'Industrial IoT', 'OPC UA / MQTT', 'Azure IoT', 'Python'],
  },
];

export const featuredServices = services.filter((s) => s.featured);

export function getService(slug) {
  return services.find((s) => s.slug === slug);
}

export function getServiceByAnchor(anchor) {
  return services.find((s) => s.anchor === anchor);
}

export const servicePath = (s) => `/services/${s.slug}`;

export const approachSteps = [
  { title: 'Discover', text: 'We learn your goals, users, and constraints in a free consultation.' },
  { title: 'Design', text: 'Architects define the solution, scope, timeline, and success metrics.' },
  { title: 'Deliver', text: 'Agile sprints with regular demos keep you in control of progress.' },
  { title: 'Support', text: 'Post-launch monitoring, maintenance, and continuous improvement.' },
];

export default services;
