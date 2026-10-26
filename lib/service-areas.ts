export type LatLng = [number, number];
export type CountryCode = "lu" | "be" | "fr";
export type Locality = { name: string; position: LatLng };
export type ServiceCountry = { code: CountryCode; name: { en: string; fr: string }; labelSide: "north" | "south"; localities: Locality[] };

export const serviceCountries: ServiceCountry[] = [
  {
    code: "lu",
    name: { en: "Luxembourg", fr: "Luxembourg" },
    labelSide: "north",
    localities: [
      { name: "Luxembourg-Ville", position: [49.6116, 6.1319] },
      { name: "Bonnevoie", position: [49.5986, 6.1406] },
      { name: "Strassen", position: [49.6206, 6.0733] },
      { name: "Bertrange", position: [49.6111, 6.05] },
      { name: "Mamer", position: [49.6275, 6.0233] },
      { name: "Capellen", position: [49.6453, 5.9906] },
      { name: "Olm", position: [49.655, 6.0003] },
      { name: "Kehlen", position: [49.6683, 6.0358] },
      { name: "Garnich", position: [49.6156, 5.9536] },
      { name: "Steinfort", position: [49.6614, 5.9161] },
      { name: "Walferdange", position: [49.6631, 6.1317] },
      { name: "Mersch", position: [49.7489, 6.1061] },
      { name: "Ettelbruck", position: [49.8475, 6.1042] },
      { name: "Redange-sur-Attert", position: [49.7647, 5.8894] },
      { name: "Rambrouch", position: [49.8314, 5.845] },
    ],
  },
  {
    code: "be",
    name: { en: "Belgium", fr: "Belgique" },
    labelSide: "north",
    localities: [
      { name: "Arlon", position: [49.6833, 5.8167] },
      { name: "Sterpenich", position: [49.65, 5.8833] },
      { name: "Bonnert", position: [49.7036, 5.8197] },
      { name: "Tontelange", position: [49.7228, 5.8156] },
      { name: "Parette", position: [49.738, 5.828] },
      { name: "Attert", position: [49.75, 5.7833] },
      { name: "Fouches", position: [49.6917, 5.7464] },
      { name: "Martelange", position: [49.8333, 5.7333] },
      { name: "Fauvillers", position: [49.85, 5.6667] },
      { name: "Habay", position: [49.7272, 5.6464] },
      { name: "Étalle", position: [49.6731, 5.6] },
      { name: "Saint-Léger", position: [49.61, 5.6567] },
      { name: "Tintigny", position: [49.6833, 5.5167] },
      { name: "Léglise", position: [49.8, 5.5333] },
      { name: "Neufchâteau", position: [49.8417, 5.4353] },
    ],
  },
  {
    code: "fr",
    name: { en: "France", fr: "France" },
    labelSide: "south",
    localities: [
      { name: "Longwy", position: [49.5197, 5.7661] },
      { name: "Mont-Saint-Martin", position: [49.5417, 5.78] },
      { name: "Longlaville", position: [49.5333, 5.8] },
      { name: "Herserange", position: [49.5194, 5.7889] },
      { name: "Lexy", position: [49.5, 5.7333] },
    ],
  },
];

const earthRadius = 6371000;
const toRadians = (degrees: number) => (degrees * Math.PI) / 180;

const distance = ([lat1, lng1]: LatLng, [lat2, lng2]: LatLng) => {
  const a = Math.sin(toRadians(lat2 - lat1) / 2) ** 2 + Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(toRadians(lng2 - lng1) / 2) ** 2;
  return 2 * earthRadius * Math.asin(Math.sqrt(a));
};

// Circle that wraps every locality of a country, with a little breathing room.
export const coverageCircle = (country: ServiceCountry, padding = 4000) => {
  const points = country.localities.map(({ position }) => position);
  const center: LatLng = [points.reduce((sum, [lat]) => sum + lat, 0) / points.length, points.reduce((sum, [, lng]) => sum + lng, 0) / points.length];
  const radius = Math.max(...points.map((point) => distance(center, point))) + padding;
  const labelOffset = (radius / earthRadius) * (180 / Math.PI);
  const label: LatLng = [center[0] + (country.labelSide === "north" ? labelOffset : -labelOffset), center[1]];
  return { center, label, radius };
};

export const totalLocalities = serviceCountries.reduce((sum, country) => sum + country.localities.length, 0);
