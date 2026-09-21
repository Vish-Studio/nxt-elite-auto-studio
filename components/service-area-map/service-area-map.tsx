"use client";

import dynamic from "next/dynamic";

const ServiceAreaMapClient = dynamic(() => import("@/components/service-area-map-client/service-area-map-client"), { ssr: false, loading: () => <div className="coverage-map__loading">Loading service map…</div> });

const ServiceAreaMap = () => <div className="coverage-map" aria-label="Interactive service coverage map centred on Brussels"><div className="coverage-map__header"><span>Service coverage</span><span>Belgium</span></div><ServiceAreaMapClient /><div className="coverage-map__legend"><span><i />65 km primary radius</span><strong>Brussels · Brabant</strong></div></div>;

export default ServiceAreaMap;
