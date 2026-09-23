import BenefitCard from "@/components/benefit-card/benefit-card";
import BeforeAfterGallery from "@/components/before-after-gallery/before-after-gallery";
import FaqItem from "@/components/faq-item/faq-item";
import Hero from "@/components/hero/hero";
import MediaCard from "@/components/media-card/media-card";
import PrimaryLink from "@/components/primary-link/primary-link";
import ProcessStep from "@/components/process-step/process-step";
import ProcessStepGallery from "@/components/process-step-gallery/process-step-gallery";
import Reveal from "@/components/reveal/reveal";
import ServiceCard from "@/components/service-card/service-card";
import SiteFooter from "@/components/site-footer/site-footer";
import SiteHeader from "@/components/site-header/site-header";
import TestimonialCarousel from "@/components/testimonial-carousel/testimonial-carousel";

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

const works = [
  { label: "Exterior detail", title: "Deep exterior care", variant: "large" as const, position: "center", src: "https://images.unsplash.com/photo-1746593934498-b335e4e04845?auto=format&fit=crop&q=85&w=1800", credit: "Srinivasa Yadav", creditHref: "https://unsplash.com/photos/black-car-in-a-modern-car-wash-p8wO38qEIhk" },
  { label: "Wash process", title: "Safe foam treatment", variant: "small" as const, position: "center", src: "https://images.unsplash.com/photo-1769641156607-16833781bc16?auto=format&fit=crop&q=85&w=1400", credit: "Avenir Visuals", creditHref: "https://unsplash.com/photos/person-washing-a-car-covered-in-foam-52VoFM9fPV8" },
  { label: "Paintwork care", title: "A finish worth protecting", variant: "small" as const, position: "center", src: "https://images.unsplash.com/photo-1761312834150-4beefff097a7?auto=format&fit=crop&q=85&w=1400", credit: "Willian Cittadin", creditHref: "https://unsplash.com/photos/black-car-covered-in-soap-suds-during-wash-bCQSrcYghJI" },
];

const workComparison = {
  before: { alt: "Vehicle covered in foam during the wash stage", credit: "mintosko", creditHref: "https://unsplash.com/photos/V4b2j7f1dfc", src: "https://images.unsplash.com/photo-1633014041037-f5446fb4ce99?auto=format&fit=crop&q=85&w=2200" },
  after: { alt: "Finished black luxury vehicle in a modern car wash", credit: "Srinivasa Yadav", creditHref: "https://unsplash.com/photos/black-car-in-a-modern-car-wash-p8wO38qEIhk", src: "https://images.unsplash.com/photo-1746593934498-b335e4e04845?auto=format&fit=crop&q=85&w=2200" },
};

const serviceVisuals = [
  { label: "Interior care", title: "A cabin reset with every surface considered", variant: "large" as const, position: "center", src: "https://images.unsplash.com/photo-1605437241278-c1806d14a4d9?fit=crop&fm=webp&q=80&w=1200", credit: "Ján Vlačuha", creditHref: "https://unsplash.com/photos/U4IaoKF5aj4", unoptimized: true },
  { label: "Wheel detail", title: "Care carried through to the smallest details", variant: "small" as const, position: "center", src: "https://images.unsplash.com/photo-1708805282683-50a060eba80f?fit=crop&fm=webp&q=80&w=1200", credit: "Zac Nielson", creditHref: "https://unsplash.com/photos/person-cleaning-car-tire-with-brush-8k_T1EwTySs" },
];

const testimonials = [
  { quote: "The car felt completely refreshed, and I did not have to leave home for the appointment.", source: "Private client", location: "Brussels" },
  { quote: "Clear communication, careful work and a finish that exceeded expectations.", source: "Private client", location: "Flemish Brabant" },
  { quote: "A convenient service for our company vehicles with consistent attention to detail.", source: "Business client", location: "Walloon Brabant" },
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

  <section className="benefits shell" id="about"><Reveal className="section-top section-top--dark"><div><p className="section-label">About Elite</p><h2>Detailing built<br />around <span>your day.</span></h2></div><p>Premium mobile care for the vehicles you value, with an approach that respects your time and your finish.</p></Reveal><Reveal className="benefit-grid" delay={120}>{benefits.map(([number, title, description]) => <BenefitCard description={description} key={number} number={number} title={title} />)}</Reveal></section>

  <section className="services light-section" id="services"><div className="shell"><Reveal className="section-top"><div><p className="section-label">Our services</p><h2>Everything your car <span>needs.</span></h2></div><p>From regular upkeep to complete transformation, every service is adapted to the condition of your vehicle.</p></Reveal><Reveal className="service-grid" delay={120}>{services.map(([number, title, description]) => <ServiceCard description={description} key={number} number={number} title={title} />)}</Reveal><Reveal className="service-media-grid" delay={180}>{serviceVisuals.map((item) => <MediaCard {...item} key={item.title} />)}</Reveal></div></section>

  <section className="works shell" id="works"><Reveal className="section-top section-top--dark"><div><p className="section-label">Our works</p><h2>Care you can<br /><span>see.</span></h2></div><p>A closer look at the methods, finishes and attention that shape every detailing appointment.</p></Reveal><Reveal className="work-grid" delay={120}>{works.map((item) => <MediaCard {...item} key={item.title} />)}</Reveal><Reveal delay={180}><BeforeAfterGallery {...workComparison} /></Reveal></section>

  <section className="process light-section" id="process"><div className="shell process__layout"><div className="process__intro"><Reveal direction="left"><p className="section-label">How it works</p><h2>Four simple<br /><span>steps.</span></h2><p>Clear communication, careful work and no unnecessary waiting rooms.</p></Reveal></div><Reveal className="process__steps" delay={120} direction="right">{steps.map(([number, title, description]) => <ProcessStep description={description} key={number} number={number} title={title} />)}</Reveal></div><Reveal className="process__media shell" delay={180}><ProcessStepGallery /></Reveal></section>

  <section className="faq shell" id="faq"><Reveal className="faq__intro" direction="left"><p className="section-label">Questions, answered</p><h2>Before we<br /><span>get started.</span></h2></Reveal><Reveal className="faq__list" delay={120} direction="right">{faqs.map(([question, answer]) => <FaqItem answer={answer} key={question} question={question} />)}</Reveal></section>

  <section className="testimonials light-section" id="testimonials"><div className="shell"><Reveal className="section-top"><div><p className="section-label">Testimonials</p><h2>Trusted for the<br /><span>details.</span></h2></div><p>Feedback from owners and businesses who choose mobile care at their home or workplace.</p></Reveal><Reveal delay={120}><TestimonialCarousel testimonials={testimonials} /></Reveal></div></section>

  <section className="contact-band" id="contact"><Reveal className="shell contact-band__inner"><div><p>Elite Auto Studio</p><h2>Ready for a<br /><span>better finish?</span></h2></div><div><p>Tell us about your vehicle and we&apos;ll recommend the right service for its condition and your goals.</p><PrimaryLink href="mailto:hello@eliteautostudio.be">Request a booking</PrimaryLink></div></Reveal></section>

  <SiteFooter />
</main>;

export default Page;
