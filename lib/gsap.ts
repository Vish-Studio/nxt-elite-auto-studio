import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
// Mobile browsers resize the viewport as the address bar shows and hides; don't re-layout on that.
ScrollTrigger.config({ ignoreMobileResize: true });

export { gsap, ScrollTrigger };
