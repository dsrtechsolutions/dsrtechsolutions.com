import Hero from '../components/Hero';
import StatsBar from '../components/StatsBar';
import AboutSection from '../components/AboutSection';
import ServicesSection from '../components/ServicesSection';
import PricingSection from '../components/PricingSection';
import TestimonialsSection from '../components/TestimonialsSection';
import CtaBanner from '../components/CtaBanner';
import ProcessSection from '../components/ProcessSection';
import FaqSection from '../components/FaqSection';
import BlogSection from '../components/BlogSection';

export default function Home() {
  return (
    <>
      {/* 1. Hero — full-height, dark navy + orange diagonal */}
      <Hero />

      {/* 2. Stats bar <StatsBar /> */}
      

      {/* 3. About — Building Dreams One Brick at a Time */}
      <AboutSection />

      {/* 4. Services — The Best Service For You */}
      <ServicesSection />

      {/* 5. Pricing — dark section */}
      <PricingSection />

      {/* 6. Testimonials — What Our Clients Say */}
      <TestimonialsSection />

      {/* 7. CTA banner — orange */}
      <CtaBanner
        title="Request A Quote,"
        highlight="24/7 Support"
        desc="Whether you need top IT talent, a custom application, or a complete digital transformation — DSR Tech Solutions is your partner for success."
        btnLabel="Contact Us Today"
        btnTo="/contact"
      />

      {/* 8. Process — Standard Working Process */}
      <ProcessSection />

      {/* 9. FAQ */}
      <FaqSection />

      {/* 10. Blog & News */}
      <BlogSection />
    </>
  );
}
