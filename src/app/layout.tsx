import { MarketProvider } from "@/components/market-provider";
import SolanaProvider from "@/components/solana-provider";
import type { Metadata } from "next";
import { Geist, Spline_Sans } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

const splineSans = Spline_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-spline"
});

export const metadata: Metadata = {
  title: {
    default: "derp.trade beta | Leverage Any Asset On-Chain",
    template: "%s | derp.trade beta",
  },
  description:
    "Trade any asset with leverage using DERPs - the first perpetual trading protocol designed for assets without high volume or liquidity.",
  openGraph: {
    type: "website",
    title: "derp.trade beta | Leverage Any Asset On-Chain",
    siteName: "app.derp.trade",
    images: {
      url: "/images/og.png",
      width: 1200,
      height: 630,
    },
    locale: "en_US",
  },
  twitter: {
    title: "derp.trade beta | Leverage Any Asset On-Chain",
    description: "Trade any asset with leverage using DERPs - the first perpetual trading protocol designed for assets without high volume or liquidity.",
    site: "@derp_trade",
    card: "summary_large_image",
    images: "/images/og.png",
  },
  metadataBase: new URL("https://app.derp.trade/"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geist.variable} ${splineSans.variable} font-sans antialiased`}
      >
        <SolanaProvider>
          <MarketProvider>
            {children}
          </MarketProvider>
        </SolanaProvider>
      </body>
    </html>
  );
}
