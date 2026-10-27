"use client";

import { divIcon, type FitBoundsOptions, latLng, latLngBounds } from "leaflet";
import { useEffect, useRef } from "react";
import {
  Circle,
  MapContainer,
  Marker,
  TileLayer,
  Tooltip,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useLanguage } from "@/components/language-provider/language-provider";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/cn";
import { type CountryCode, coverageCircle, serviceCountries } from "@/lib/service-areas";

type ServiceAreaMapClientProps = {
  active: CountryCode | null;
  onSelect: (code: CountryCode) => void;
};

const circles = serviceCountries.map((country) => ({ country, ...coverageCircle(country) }));

const boundsFor = (active: CountryCode | null) =>
  circles
    .filter(({ country }) => !active || country.code === active)
    .reduce(
      (bounds, { center, radius }) => bounds.extend(latLng(center).toBounds(radius * 2)),
      latLngBounds([]),
    );

// Leaflet renders marker icons as raw HTML, so their classes are plain strings.
const localityIcon = (isDimmed: boolean) =>
  divIcon({
    className: "group flex items-center justify-center",
    html: `<span class="${cn(
      "block size-2 bg-gold shadow-[0_0_0_3px_rgba(5,5,5,0.55)] transition duration-200 group-hover:scale-150",
      isDimmed && "opacity-30",
    )}"></span>`,
    iconAnchor: [8, 8],
    iconSize: [16, 16],
  });

const labelIcon = (name: string, side: "north" | "south", isActive: boolean) =>
  divIcon({
    className: "cursor-pointer",
    html: `<span class="${cn(
      "absolute top-0 left-0 border border-gold/45 bg-void px-[0.6rem] py-[0.35rem] text-[0.58rem] font-semibold tracking-[0.12em] whitespace-nowrap text-gold uppercase transition-opacity duration-300",
      side === "north"
        ? "-translate-x-1/2 translate-y-[calc(-100%-6px)]"
        : "-translate-x-1/2 translate-y-1.5",
      !isActive && "opacity-45",
    )}">${name}</span>`,
    iconAnchor: [0, 0],
    iconSize: [0, 0],
  });

const ViewController = ({ active }: { active: CountryCode | null }) => {
  const map = useMap();
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Extra bottom padding keeps the circles clear of the legend overlay.
    const isNarrow = map.getSize().x < 600;
    const options: FitBoundsOptions = {
      paddingBottomRight: [isNarrow ? 16 : 56, 96],
      paddingTopLeft: [isNarrow ? 16 : 56, 48],
    };

    if (isFirstRender.current) {
      isFirstRender.current = false;
      map.fitBounds(boundsFor(active), options);
      return;
    }
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

  return (
    <MapContainer
      attributionControl
      center={[49.68, 5.85]}
      className="absolute inset-0 size-full min-h-180 bg-map font-sans max-md:min-h-120 [&_.leaflet-control-attribution]:bg-void/78 [&_.leaflet-control-attribution]:text-[0.54rem] [&_.leaflet-control-attribution]:text-fog [&_.leaflet-control-attribution_a]:text-ivory [&_.leaflet-tile-pane]:opacity-78 [&_.leaflet-tile-pane]:[filter:grayscale(1)_invert(1)_brightness(0.72)_contrast(0.78)]"
      maxZoom={13}
      minZoom={7}
      scrollWheelZoom={false}
      zoom={9}
      zoomControl
      zoomSnap={0.25}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ViewController active={active} />
      <MapInteractionTracker />

      {circles.map(({ center, country, radius }) => {
        const isFocused = active === country.code;
        const isActive = !active || isFocused;
        return (
          <Circle
            center={center}
            eventHandlers={{ click: () => onSelect(country.code) }}
            key={country.code}
            pathOptions={{
              color: "var(--color-gold)",
              dashArray: isFocused ? undefined : "4 6",
              fillColor: "var(--color-gold)",
              fillOpacity: isFocused ? 0.14 : isActive ? 0.08 : 0.03,
              opacity: isActive ? 0.9 : 0.35,
              weight: isFocused ? 1.5 : 1,
            }}
            radius={radius}
          />
        );
      })}

      {circles.map(({ country, label }) => (
        <Marker
          eventHandlers={{ click: () => onSelect(country.code) }}
          icon={labelIcon(
            country.name[language],
            country.labelSide,
            !active || active === country.code,
          )}
          key={`${country.code}-label`}
          position={label}
        />
      ))}

      {serviceCountries.flatMap(({ code, localities }) =>
        localities.map(({ name, position }) => (
          <Marker
            icon={localityIcon(Boolean(active) && active !== code)}
            key={`${code}-${name}`}
            position={position}
          >
            <Tooltip
              className="border-0 bg-void px-[0.4rem] py-1 text-[0.62rem] text-ivory shadow-none before:hidden"
              direction="top"
              offset={[0, -8]}
            >
              {name}
            </Tooltip>
          </Marker>
        )),
      )}
    </MapContainer>
  );
};

export default ServiceAreaMapClient;
