"use client";

import { useEffect, useState } from "react";
import BrandMark from "@/components/brand-mark/brand-mark";
import PrimaryLink from "@/components/primary-link/primary-link";

const SiteHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const updateHeader = () => setIsScrolled(window.scrollY > 24);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  return <header className={`site-header${isScrolled ? " is-scrolled" : ""}`}><div className="site-header__inner shell"><a className="brand-lockup" href="#home"><span className="brand-lockup__logo"><BrandMark priority variant="icon" /></span><span>Elite Auto Studio</span></a><nav aria-label="Primary navigation"><a href="#services">Services</a><a href="#works">Our Works</a><a href="#packages">Price Packages</a><a href="#process">Process</a><a href="#faq">FAQs</a><a href="#testimonials">Testimonials</a></nav><PrimaryLink href="#contact">Book now</PrimaryLink></div></header>;
};

export default SiteHeader;
