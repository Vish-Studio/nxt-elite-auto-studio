"use client";

import { divIcon, type FitBoundsOptions, latLng, latLngBounds } from "leaflet";
import { useEffect, useRef } from "react";
import { Circle, MapContainer, Marker, TileLayer, Tooltip, useMap, useMapEvents } from "react-leaflet";
import { useLanguage } from "@/components/language-provider/language-provider";
import { trackEvent } from "@/lib/analytics";
import { type CountryCode, coverageCircle, serviceCountries } from "@/lib/service-areas";

type ServiceAreaMapClientProps = { active: CountryCode | null; onSelect: (code: CountryCode) => void };

const circles = serviceCountries.map((country) => ({ country, ...coverageCircle(country) }));
const boundsFor = (active: CountryCode | null) => circles.filter(({ country }) => !active || country.code === active).reduce((bounds, { center, radius }) => bounds.extend(latLng(center).toBounds(radius * 2)), latLngBounds([]));
const localityIcon = (isDimmed: boolean) => divIcon({ className: `service-locality-marker${isDimmed ? " is-dimmed" : ""}`, html: "<span></span>", iconAnchor: [8, 8], iconSize: [16, 16] });
const labelIcon = (name: string, side: "north" | "south", isActive: boolean) => divIcon({ className: `service-country-label service-country-label--${side}${isActive ? " is-active" : ""}`, html: `<span>${name}</span>`, iconAnchor: [0, 0], iconSize: [0, 0] });

const ViewController = ({ active }: { active: CountryCode | null }) => {
  const map = useMap();
  const isFirstRender = useRef(true);
  useEffect(() => {
    // Extra bottom padding keeps the circles clear of the legend overlay.
    const isNarrow = map.getSize().x < 600;
    const options: FitBoundsOptions = { paddingBottomRight: [isNarrow ? 16 : 56, 96], paddingTopLeft: [isNarrow ? 16 : 56, 48] };
    if (isFirstRender.current) { isFirstRender.current = false; map.fitBounds(boundsFor(active), options); return; }
    map.flyToBounds(boundsFor(active), { ...options, duration: 0.8 });
  }, [active, map]);
  return null;
};

const MapInteractionTracker = () => {
  const hasInteracted = useRef(false);
  const track = () => {
    if (hasInteracted.current) return;
    hasInteracted.current = true;
    trackEvent("service_area_interact");
  };
  useMapEvents({ dragstart: track, zoomstart: track });
  return null;
};

const ServiceAreaMapClient = ({ active, onSelect }: ServiceAreaMapClientProps) => {
  const { language } = useLanguage();
  return <MapContainer attributionControl center={[49.68, 5.85]} className="coverage-map__leaflet" maxZoom={13} minZoom={7} scrollWheelZoom={false} zoom={9} zoomControl zoomSnap={0.25}><TileLayer attribution="&copy; OpenStreetMap contributors" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" /><ViewController active={active} /><MapInteractionTracker />
    {circles.map(({ center, country, radius }) => { const isActive = !active || active === country.code; return <Circle center={center} eventHandlers={{ click: () => onSelect(country.code) }} key={country.code} pathOptions={{ color: "var(--color-gold)", dashArray: active === country.code ? undefined : "4 6", fillColor: "var(--color-gold)", fillOpacity: active === country.code ? 0.14 : isActive ? 0.08 : 0.03, opacity: isActive ? 0.9 : 0.35, weight: active === country.code ? 1.5 : 1 }} radius={radius} />; })}
    {circles.map(({ country, label }) => <Marker eventHandlers={{ click: () => onSelect(country.code) }} icon={labelIcon(country.name[language], country.labelSide, !active || active === country.code)} key={`${country.code}-label`} position={label} />)}
    {serviceCountries.flatMap(({ code, localities }) => localities.map(({ name, position }) => <Marker icon={localityIcon(Boolean(active) && active !== code)} key={`${code}-${name}`} position={position}><Tooltip className="leaflet-city-label" direction="top" offset={[0, -8]}>{name}</Tooltip></Marker>))}
  </MapContainer>;
};

export default ServiceAreaMapClient;
