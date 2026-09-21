import BenefitCard from "@/components/benefit-card/benefit-card";
import FaqItem from "@/components/faq-item/faq-item";
import Hero from "@/components/hero/hero";
import PackageCard from "@/components/package-card/package-card";
import PrimaryLink from "@/components/primary-link/primary-link";
import ProcessStep from "@/components/process-step/process-step";
import Reveal from "@/components/reveal/reveal";
import ServiceCard from "@/components/service-card/service-card";
import SiteFooter from "@/components/site-footer/site-footer";
import SiteHeader from "@/components/site-header/site-header";

const services = [
  ["01", "Interior Detail", "Deep cleaning for seats, carpets, trim and every hard-to-reach surface."],
  ["02", "Exterior Detail", "A careful multi-stage wash, decontamination and hand-finished protection."],
  ["03", "Full Detail", "Our complete inside-and-out treatment for a genuinely transformed vehicle."],
  ["04", "Sale Preparation", "A presentation-focused detail designed to make the strongest first impression."],
];

const benefits = [
  ["01", "We come to you", "Premium detailing at your home or workplace, without disrupting your day."],
  ["02", "Professional products", "Safe, specialist products selected for your vehicle and its finishes."],
  ["03", "Detail-led service", "One vehicle at a time, with the patience required for a consistent result."],
];

const packages = [
  { label: "Essential care", title: "Refresh", description: "A focused reset for vehicles that need regular, professional upkeep.", features: ["Exterior hand wash", "Wheels and tyres", "Interior vacuum", "Dashboard and trim"] },
  { label: "Most complete", title: "Signature", description: "A thorough inside-and-out detail for a visibly renewed vehicle.", features: ["Deep interior clean", "Exterior decontamination", "Hand-applied protection", "Detailed final inspection"] },
  { label: "Presentation ready", title: "Sale Prep", description: "Targeted preparation that helps your vehicle make the right impression.", features: ["Interior presentation detail", "Paintwork enhancement", "Glass and finishing touches", "Photo-ready handover"] },
];

const audiences = [
  ["01", "Private owners", "Convenient maintenance and restorative detailing for the car you use and care about every day."],
  ["02", "Performance cars", "Careful methods and product choices for sensitive finishes, premium materials and specialist vehicles."],
  ["03", "Business fleets", "Consistent on-location care for company vehicles, executive cars and small professional fleets."],
];

const steps = [
  ["01", "Tell us about your car", "Share the vehicle, location and result you are looking for."],
  ["02", "Choose a time and place", "We confirm the right service and arrange a convenient appointment."],
  ["03", "We detail on location", "Our mobile setup arrives ready with the products and equipment needed."],
  ["04", "Enjoy the finish", "We complete a final inspection before handing your refreshed vehicle back."],
];

const faqs = [
  ["Do I need to provide water or electricity?", "Tell us what is available when booking. We will confirm the setup required for your selected service."],
  ["How long does a detail take?", "Timing depends on vehicle size and condition. Most appointments take between two and five hours."],
  ["Where in Belgium do you operate?", "We primarily serve Brussels, Flemish Brabant and Walloon Brabant. Contact us for locations outside these areas."],
  ["Can you detail my car at work?", "Yes. As long as we have permission and enough safe working space, we can detail at your workplace."],
];

const Page = () => <main>
  <SiteHeader />

  <Hero />

  <section className="services light-section" id="services"><div className="shell"><Reveal className="section-top"><div><p className="section-label">Our services</p><h2>Everything your car <span>needs.</span></h2></div><p>From regular upkeep to complete transformation, every service is adapted to the condition of your vehicle.</p></Reveal><Reveal className="service-grid" delay={120}>{services.map(([number, title, description]) => <ServiceCard description={description} key={number} number={number} title={title} />)}</Reveal></div></section>

  <section className="packages shell" id="packages"><Reveal className="section-top section-top--dark"><div><p className="section-label">Detailing packages</p><h2>Choose your level<br />of <span>care.</span></h2></div><p>Every booking is confirmed after we understand your vehicle, its condition and the result you want.</p></Reveal><Reveal className="package-grid" delay={120}>{packages.map((item) => <PackageCard description={item.description} features={item.features} key={item.title} label={item.label} title={item.title} />)}</Reveal></section>

  <section className="benefits shell" id="about"><Reveal className="section-top section-top--dark"><div><p className="section-label">Why Elite</p><h2>Convenience without<br /><span>compromise.</span></h2></div><p>Your time matters. So does the standard of work carried out on your vehicle.</p></Reveal><Reveal className="benefit-grid" delay={120}>{benefits.map(([number, title, description]) => <BenefitCard description={description} key={number} number={number} title={title} />)}</Reveal></section>

  <section className="process light-section" id="process"><div className="shell process__layout"><Reveal className="process__intro" direction="left"><p className="section-label">How it works</p><h2>Four simple<br /><span>steps.</span></h2><p>Clear communication, careful work and no unnecessary waiting rooms.</p></Reveal><Reveal className="process__steps" delay={120} direction="right">{steps.map(([number, title, description]) => <ProcessStep description={description} key={number} number={number} title={title} />)}</Reveal></div></section>

  <section className="service-area shell"><Reveal direction="left"><p className="section-label">Service area</p><h2>Mobile across<br /><span>central Belgium.</span></h2></Reveal><Reveal className="area-list" delay={120} direction="right"><p>Brussels Capital Region</p><p>Flemish Brabant</p><p>Walloon Brabant</p><small>Outside these areas? Contact us and we&apos;ll confirm availability.</small></Reveal></section>

  <section className="audiences light-section"><div className="shell"><Reveal className="section-top"><div><p className="section-label">Who we work with</p><h2>Care built around<br /><span>your vehicle.</span></h2></div><p>Flexible mobile detailing for individual owners, specialist cars and professional fleets.</p></Reveal><Reveal className="benefit-grid audience-grid" delay={120}>{audiences.map(([number, title, description]) => <BenefitCard description={description} key={number} number={number} title={title} />)}</Reveal></div></section>

  <section className="faq shell" id="faq"><Reveal className="faq__intro" direction="left"><p className="section-label">Questions, answered</p><h2>Before we<br /><span>get started.</span></h2></Reveal><Reveal className="faq__list" delay={120} direction="right">{faqs.map(([question, answer]) => <FaqItem answer={answer} key={question} question={question} />)}</Reveal></section>

  <section className="contact-band" id="contact"><Reveal className="shell contact-band__inner"><div><p>Elite Auto Studio</p><h2>Ready for a<br /><span>better finish?</span></h2></div><div><p>Tell us about your vehicle and we&apos;ll recommend the right service for its condition and your goals.</p><PrimaryLink href="mailto:hello@eliteautostudio.be">Request a booking</PrimaryLink></div></Reveal></section>

  <SiteFooter />
</main>;

export default Page;
