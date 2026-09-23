import { ArrowDownIcon } from "@phosphor-icons/react/ssr";
import HeroBackgroundCarousel from "@/components/hero-background-carousel/hero-background-carousel";
import PrimaryLink from "@/components/primary-link/primary-link";
import Reveal from "@/components/reveal/reveal";

const Hero = () => <section className="hero" id="home">
  <div className="hero__canvas">
    <HeroBackgroundCarousel />
    <div className="hero__inner shell">
      <Reveal className="hero__masthead">
        <h1 aria-label="Detailing delivered to your door"><span className="hero__headline-primary">Detailing</span><span className="hero__headline-secondary">To your <span>door.</span></span></h1>
        <p className="hero__lede">At home, enjoy complete interior and exterior detailing. At your office, we provide interior-only care—so your day can continue uninterrupted.</p>
        <div className="hero__actions"><PrimaryLink href="#contact">Dispatch a team</PrimaryLink><a href="#services">Explore services <ArrowDownIcon aria-hidden="true" size={13} weight="bold" /></a></div>
      </Reveal>
      <div className="hero__booking-row"><p><strong>Care, wherever you are.</strong><span>Choose a home or office appointment that suits your day.</span></p><div className="hero__proof"><p><strong>At home</strong><span>Interior + exterior detailing</span></p><p><strong>At the office</strong><span>Interior detailing only</span></p><p><strong>65 km</strong><span>Brussels service radius</span></p></div></div>
    </div>
  </div>
</section>;

export default Hero;
