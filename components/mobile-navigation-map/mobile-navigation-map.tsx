"use client";

import { Circle, MapContainer, TileLayer } from "react-leaflet";
import { coverageCircle, serviceCountries } from "@/lib/service-areas";

const circles = serviceCountries.map((country) => ({
  code: country.code,
  ...coverageCircle(country),
}));

const MobileNavigationMap = () => (
  <MapContainer
    attributionControl
    center={[49.69, 5.8]}
    className="relative isolate h-26 w-full bg-map [&_.leaflet-control-attribution]:bg-void/80 [&_.leaflet-control-attribution]:text-[0.48rem] [&_.leaflet-control-attribution]:text-fog [&_.leaflet-control-attribution_a]:text-ivory [&_.leaflet-tile-pane]:opacity-78 [&_.leaflet-tile-pane]:[filter:grayscale(1)_invert(1)_brightness(0.7)_contrast(0.8)]"
    dragging={false}
    keyboard={false}
    scrollWheelZoom={false}
    touchZoom={false}
    zoom={8}
    zoomControl={false}
  >
    <TileLayer
      attribution="&copy; OpenStreetMap contributors"
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {circles.map(({ center, code, radius }) => (
      <Circle
        center={center}
        key={code}
        pathOptions={{
          color: "var(--color-gold)",
          fillColor: "var(--color-gold)",
          fillOpacity: 0.14,
          weight: 1,
        }}
        radius={radius}
      />
    ))}
  </MapContainer>
);

export default MobileNavigationMap;
