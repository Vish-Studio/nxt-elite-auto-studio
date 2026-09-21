import HeroBackgroundCarousel from "@/components/hero-background-carousel/hero-background-carousel";
import Parallax from "@/components/parallax/parallax";
import PrimaryLink from "@/components/primary-link/primary-link";
import Reveal from "@/components/reveal/reveal";
import ServiceAreaMap from "@/components/service-area-map/service-area-map";

const Hero = () => <section className="hero" id="home">
  <div className="hero__inner shell">
    <Reveal className="hero__masthead">
      <div className="hero__kicker"><p>Mobile car detailing · Belgium</p><p>Home and workplace appointments</p></div>
      <h1 aria-label="Detailing at home"><span className="hero__headline-primary">Detailing</span><span className="hero__headline-secondary"><span>At</span><small>Our mobile detailing team is dispatched to your address—fully equipped and ready to care for your vehicle at home or at work.</small><span>home.</span></span></h1>
      <div className="hero__booking-row"><p><strong>Stay home. We come to you.</strong><span>Studio-quality detailing without the drive, waiting room or disruption.</span></p><div className="hero__actions"><PrimaryLink href="#contact">Dispatch a team</PrimaryLink><a href="#services">Explore services <span>↓</span></a></div></div>
    </Reveal>

    <Reveal className="hero__stage" delay={140}>
      <div className="hero__media"><HeroBackgroundCarousel /><div className="hero__proof"><p><strong>To your door</strong><span>Mobile team dispatched</span></p><p><strong>65 km</strong><span>Brussels service radius</span></p><p><strong>Home + work</strong><span>You choose the location</span></p></div></div>
      <Parallax className="hero__map-motion" speed={0.035}><ServiceAreaMap /></Parallax>
    </Reveal>
  </div>
</section>;

export default Hero;
