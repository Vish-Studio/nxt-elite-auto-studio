import Hero from "@/components/hero/hero";
import ServiceAreaMap from "@/components/service-area-map/service-area-map";
import AboutSection from "@/components/sections/about-section";
import ContactSection from "@/components/sections/contact-section";
import FaqSection from "@/components/sections/faq-section";
import PricingSection from "@/components/sections/pricing-section";
import ProcessSection from "@/components/sections/process-section";
import ServicesSection from "@/components/sections/services-section";
import TestimonialsSection from "@/components/sections/testimonials-section";
import WorksSection from "@/components/sections/works-section";
import SiteFooter from "@/components/site-footer/site-footer";
import SiteHeader from "@/components/site-header/site-header";

const Page = () => (
  <main>
    <SiteHeader />
    <Hero />
    <AboutSection />
    <WorksSection />
    <ServiceAreaMap />
    <ServicesSection />
    <PricingSection />
    <ProcessSection />
    <FaqSection />
    <TestimonialsSection />
    <ContactSection />
    <SiteFooter />
  </main>
);

export default Page;
