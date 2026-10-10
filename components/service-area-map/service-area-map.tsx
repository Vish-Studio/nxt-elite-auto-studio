"use client";

import dynamic from "next/dynamic";
import PrimaryLink from "@/components/primary-link/primary-link";

const ServiceAreaMapClient = dynamic(() => import("@/components/service-area-map-client/service-area-map-client"), { ssr: false, loading: () => <div className="coverage-map__loading">Loading service map…</div> });

const ServiceAreaMap = () => <section aria-labelledby="coverage-title" className="coverage-section pt-0" id="service-area"><div className="coverage-map"><div aria-label="Interactive service coverage map of Belgium" className="coverage-map__canvas"><ServiceAreaMapClient /><div className="coverage-map__legend"><span><i />65 km live service radius</span><strong>Use + / − to explore</strong></div></div><aside className="coverage-map__brief"><p>Where we travel</p><h2 id="coverage-title">Belgium is<br /><span>our base.</span></h2><span>Use the map to see our usual coverage around Brussels and the surrounding Brabant regions.</span><dl><div><dt>Core area</dt><dd>Brussels &amp; Brabant</dd></div><div><dt>Reach</dt><dd>65 km from Brussels</dd></div></dl><p className="coverage-map__areas">Not sure about your address? Send it with your booking request and we&apos;ll confirm availability.</p><PrimaryLink href="#contact" track={{ event: "booking_click", params: { location: "service_area" } }}>Check your address</PrimaryLink></aside></div></section>;

export default ServiceAreaMap;
