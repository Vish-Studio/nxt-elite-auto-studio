"use client";

import { Circle, CircleMarker, MapContainer, TileLayer, Tooltip } from "react-leaflet";

const brussels: [number, number] = [50.8503, 4.3517];
const cities: Array<[string, [number, number]]> = [["Brussels", brussels], ["Antwerp", [51.2194, 4.4025]], ["Ghent", [51.0543, 3.7174]], ["Leuven", [50.8798, 4.7005]], ["Namur", [50.4674, 4.872]]];

const ServiceAreaMapClient = () => <MapContainer attributionControl center={brussels} className="coverage-map__leaflet" maxZoom={13} minZoom={7} scrollWheelZoom={false} zoom={8}><TileLayer attribution="&copy; OpenStreetMap contributors &copy; CARTO" url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" /><Circle center={brussels} pathOptions={{ className: "leaflet-coverage-circle", dashArray: "8 8", fillOpacity: .1 }} radius={65000} />{cities.map(([name, position]) => <CircleMarker center={position} key={name} pathOptions={{ className: name === "Brussels" ? "leaflet-city leaflet-city--primary" : "leaflet-city" }} radius={name === "Brussels" ? 6 : 4}><Tooltip className="leaflet-city-label" direction="right" offset={[8, 0]} permanent>{name}</Tooltip></CircleMarker>)}</MapContainer>;

export default ServiceAreaMapClient;
