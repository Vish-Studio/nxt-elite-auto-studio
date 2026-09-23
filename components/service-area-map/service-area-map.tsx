"use client";

import dynamic from "next/dynamic";
import PrimaryLink from "@/components/primary-link/primary-link";

const ServiceAreaMapClient = dynamic(() => import("@/components/service-area-map-client/service-area-map-client"), { ssr: false, loading: () => <div className="coverage-map__loading">Loading service map…</div> });

const ServiceAreaMap = () => <section aria-labelledby="coverage-title" className="coverage-section" id="service-area"><div aria-label="Interactive service coverage map of Belgium" className="coverage-map"><ServiceAreaMapClient /><div className="coverage-map__overlay"><div className="coverage-map__radius-note"><i /><span>Active radius</span><strong>65 km</strong></div><aside className="coverage-map__panel"><p>Service area</p><h2 id="coverage-title">Here when<br /><span>you need us.</span></h2><span>We bring premium detailing to your address throughout Brussels and the surrounding Brabant regions.</span><dl><div><dt>At home</dt><dd>Interior + exterior</dd></div><div><dt>At work</dt><dd>Interior only</dd></div></dl><PrimaryLink href="#contact">Book in your area</PrimaryLink></aside></div><div className="coverage-map__legend"><span><i />Live service radius</span><strong>Brussels · Flemish Brabant · Walloon Brabant</strong></div></div></section>;

export default ServiceAreaMap;
