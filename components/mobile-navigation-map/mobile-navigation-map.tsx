"use client";

import { Circle, MapContainer, TileLayer } from "react-leaflet";
import { coverageCircle, serviceCountries } from "@/lib/service-areas";

const circles = serviceCountries.map((country) => ({ code: country.code, ...coverageCircle(country) }));

const MobileNavigationMap = () => <MapContainer attributionControl center={[49.69, 5.8]} className="mobile-navigation-map" dragging={false} keyboard={false} scrollWheelZoom={false} touchZoom={false} zoom={8} zoomControl={false}><TileLayer attribution="&copy; OpenStreetMap contributors" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />{circles.map(({ center, code, radius }) => <Circle center={center} key={code} pathOptions={{ color: "var(--color-gold)", fillColor: "var(--color-gold)", fillOpacity: .14, weight: 1 }} radius={radius} />)}</MapContainer>;

export default MobileNavigationMap;
