import type { Metadata } from "next";
import { Alata } from "next/font/google";
import GoogleAnalytics from "@/components/analytics/google-analytics";
import CookieBanner from "@/components/cookie-consent/cookie-banner";
import { LanguageProvider } from "@/components/language-provider/language-provider";
import { publicAsset } from "@/lib/public-asset";
import "leaflet/dist/leaflet.css";
import "./globals.css";

const alata = Alata({ subsets: ["latin"], weight: "400", variable: "--font-alata", adjustFontFallback: false });
export const metadata: Metadata = { title: "Elite Auto Studio | Mobile Car Detailing Belgium", description: "Premium mobile car detailing at your home or workplace across Brussels and Brabant.", icons: { icon: publicAsset("/icon-square.jpeg"), shortcut: publicAsset("/icon-square.jpeg"), apple: publicAsset("/icon-square.jpeg") } };
const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => <html lang="en"><body className={alata.variable}><LanguageProvider>{children}<CookieBanner /><GoogleAnalytics /></LanguageProvider></body></html>;
export default RootLayout;
