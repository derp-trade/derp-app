import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
