"use client";

import dynamic from "next/dynamic";

const ServiceAreaMapClient = dynamic(() => import("@/components/service-area-map-client/service-area-map-client"), { ssr: false, loading: () => <div className="coverage-map__loading">Loading service map…</div> });

const ServiceAreaMap = () => <section aria-labelledby="coverage-title" className="coverage-section"><div className="coverage-section__intro shell"><div><p className="section-label">Where we operate</p><h2 id="coverage-title">Mobile detailing across <span>central Belgium.</span></h2></div><p>We come to homes and workplaces throughout Brussels and the surrounding Brabant regions. The highlighted locations show our primary service area.</p></div><div className="coverage-map" aria-label="Interactive service coverage map of Belgium"><div className="coverage-map__header"><span>Mobile detailing coverage</span><strong>Belgium</strong></div><ServiceAreaMapClient /><div className="coverage-map__legend"><span><i />Areas we serve</span><strong>Brussels · Flemish Brabant · Walloon Brabant</strong></div></div></section>;

export default ServiceAreaMap;
