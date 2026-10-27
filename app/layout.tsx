import type { Metadata } from "next";
import { DM_Sans, Poppins } from "next/font/google";
import type { ReactNode } from "react";
import GoogleAnalytics from "@/components/analytics/google-analytics";
import CookieBanner from "@/components/cookie-consent/cookie-banner";
import { LanguageProvider } from "@/components/language-provider/language-provider";
import PageMotion from "@/components/page-motion/page-motion";
import { publicAsset } from "@/lib/public-asset";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

const icon = publicAsset("/icon-square.jpeg");

export const metadata: Metadata = {
  title: "Elite Auto Studio | Mobile Car Detailing Belgium",
  description:
    "Premium mobile car detailing at your home or workplace across Brussels and Brabant.",
  icons: { icon, shortcut: icon, apple: icon },
};

const RootLayout = ({ children }: Readonly<{ children: ReactNode }>) => (
  // suppressHydrationWarning: the language provider updates `lang` after hydration, and browser
  // extensions often inject attributes on <html>/<body>. Only these two elements are exempt.
  <html className={`${poppins.variable} ${dmSans.variable}`} lang="en" suppressHydrationWarning>
    <body suppressHydrationWarning>
      <LanguageProvider>
        {children}
        <PageMotion />
        <CookieBanner />
        <GoogleAnalytics />
      </LanguageProvider>
    </body>
  </html>
);

export default RootLayout;
