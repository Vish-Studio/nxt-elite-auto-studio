import type { Metadata } from "next";
import { DM_Sans, Poppins } from "next/font/google";
import GoogleAnalytics from "@/components/analytics/google-analytics";
import CookieBanner from "@/components/cookie-consent/cookie-banner";
import { LanguageProvider } from "@/components/language-provider/language-provider";
import { publicAsset } from "@/lib/public-asset";
import "leaflet/dist/leaflet.css";
import "./globals.css";

const poppins = Poppins({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"], variable: "--font-poppins", display: "swap" });
const dmSans = DM_Sans({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"], variable: "--font-dm-sans", display: "swap" });
export const metadata: Metadata = { title: "Elite Auto Studio | Mobile Car Detailing Belgium", description: "Premium mobile car detailing at your home or workplace across Brussels and Brabant.", icons: { icon: publicAsset("/icon-square.jpeg"), shortcut: publicAsset("/icon-square.jpeg"), apple: publicAsset("/icon-square.jpeg") } };
const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => <html className={`${poppins.variable} ${dmSans.variable}`} lang="en"><body><LanguageProvider>{children}<CookieBanner /><GoogleAnalytics /></LanguageProvider></body></html>;
export default RootLayout;
