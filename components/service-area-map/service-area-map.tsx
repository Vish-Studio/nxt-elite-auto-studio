"use client";

import dynamic from "next/dynamic";
import PrimaryLink from "@/components/primary-link/primary-link";

const ServiceAreaMapClient = dynamic(() => import("@/components/service-area-map-client/service-area-map-client"), { ssr: false, loading: () => <div className="coverage-map__loading">Loading service map…</div> });

const ServiceAreaMap = () => <section aria-labelledby="coverage-title" className="coverage-section" id="service-area"><div aria-label="Interactive service coverage map of Belgium" className="coverage-map"><ServiceAreaMapClient /><div className="coverage-map__overlay"><div className="coverage-map__panel"><p>Mobile detailing coverage</p><h2 id="coverage-title">Your address,<br /><span>our service area.</span></h2><span>Premium care, brought to your home or workplace.</span><PrimaryLink href="#contact">Book in your area</PrimaryLink></div><div className="coverage-map__availability"><strong>65 km</strong><span>from Brussels</span></div></div><div className="coverage-map__legend"><span><i />Live service radius</span><strong>Home: interior + exterior · Office: interior only</strong></div></div></section>;

export default ServiceAreaMap;
