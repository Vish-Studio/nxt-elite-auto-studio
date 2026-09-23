"use client";

import dynamic from "next/dynamic";
import PrimaryLink from "@/components/primary-link/primary-link";

const ServiceAreaMapClient = dynamic(() => import("@/components/service-area-map-client/service-area-map-client"), { ssr: false, loading: () => <div className="coverage-map__loading">Loading service map…</div> });

const ServiceAreaMap = () => <section aria-labelledby="coverage-title" className="coverage-section" id="service-area"><div className="coverage-map"><div aria-label="Interactive service coverage map of Belgium" className="coverage-map__canvas"><ServiceAreaMapClient /><div className="coverage-map__legend"><span><i />65 km live service radius</span><strong>Use + / − to explore</strong></div></div><aside className="coverage-map__brief"><p>Where we travel</p><h2 id="coverage-title">Your car.<br /><span>Our route.</span></h2><span>Premium mobile detailing, designed around your address and your day.</span><dl><div><dt>At home</dt><dd>Interior + exterior care</dd></div><div><dt>At work</dt><dd>Interior-only care</dd></div></dl><p className="coverage-map__areas">Serving Brussels, Flemish Brabant and Walloon Brabant.</p><PrimaryLink href="#contact">Check your address</PrimaryLink></aside></div></section>;

export default ServiceAreaMap;
