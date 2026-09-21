import BrandMark from "@/components/brand-mark/brand-mark";

const SiteHeader = () => <header className="site-header"><div className="site-header__inner shell"><a className="brand-lockup" href="#home"><span className="brand-lockup__logo"><BrandMark priority /></span><span>Elite Auto Studio</span></a><nav aria-label="Primary navigation"><a href="#services">Services</a><a href="#packages">Packages</a><a href="#process">Process</a><a href="#faq">FAQ</a></nav><a className="header-booking" href="#contact">Book now <span>↗</span></a></div></header>;

export default SiteHeader;
