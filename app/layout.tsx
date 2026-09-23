import type { Metadata } from "next";
import { Sansation } from "next/font/google";
import "leaflet/dist/leaflet.css";
import "./globals.css";

const sansation = Sansation({ subsets: ["latin"], weight: ["300", "400", "700"], variable: "--font-sansation", adjustFontFallback: false });
export const metadata: Metadata = { title: "Elite Auto Studio | Mobile Car Detailing Belgium", description: "Premium mobile car detailing at your home or workplace across Brussels and Brabant.", icons: { icon: "/icon-square.jpeg", shortcut: "/icon-square.jpeg", apple: "/icon-square.jpeg" } };
const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => <html lang="en"><body className={sansation.variable}>{children}</body></html>;
export default RootLayout;
