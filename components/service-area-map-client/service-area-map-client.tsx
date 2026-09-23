"use client";

import { divIcon } from "leaflet";
import { Circle, MapContainer, Marker, TileLayer, Tooltip } from "react-leaflet";

const brussels: [number, number] = [50.8503, 4.3517];
const belgium: [number, number] = [50.78, 4.55];
type City = { direction: "top" | "right" | "bottom" | "left"; name: string; offset: [number, number]; position: [number, number] };
const cities: City[] = [
  { direction: "top", name: "Brussels", offset: [0, -12], position: brussels },
  { direction: "right", name: "Leuven", offset: [12, 0], position: [50.8798, 4.7005] },
  { direction: "bottom", name: "Waterloo", offset: [0, 12], position: [50.7147, 4.3991] },
  { direction: "right", name: "Wavre", offset: [12, 0], position: [50.7172, 4.6014] },
  { direction: "left", name: "Halle", offset: [-12, 0], position: [50.7339, 4.2345] },
];

const ServiceAreaMapClient = () => <MapContainer attributionControl center={belgium} className="coverage-map__leaflet" maxZoom={12} minZoom={7} scrollWheelZoom={false} zoom={8} zoomControl><TileLayer attribution="&copy; OpenStreetMap contributors" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" /><Circle center={brussels} pathOptions={{ color: "var(--color-gold)", fillColor: "var(--color-gold)", fillOpacity: .11, weight: 1 }} radius={65000} />{cities.map(({ direction, name, offset, position }, index) => <Marker icon={divIcon({ className: `service-city-marker service-city-marker--${index + 1}`, html: "<span></span>", iconAnchor: [10, 10], iconSize: [20, 20] })} key={name} position={position}><Tooltip className="leaflet-city-label" direction={direction} offset={offset} permanent>{name}</Tooltip></Marker>)}</MapContainer>;

export default ServiceAreaMapClient;
