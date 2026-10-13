import type { Metadata } from "next";
import { Suspense } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { ReferralWelcome } from "./components/ReferralWelcome";
import { StructuredData } from "./components/StructuredData";
import { GoogleAnalytics } from "./components/GoogleAnalytics";
import "./globals.css";

const siteUrl = "https://noobjectioncertificate.com";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "NOC Services Delhi | L&DO, DDA Approvals — NOC Banwao",
    template: "%s | NoObjectionCertificate.com",
  },
  description:
    "NOC Banwao, Deal Aage Badhao — L&DO, DDA, MCD NOCs, freehold conversion, mutation & Delhi government approvals. 3rd-generation liaison experts.",
  keywords: [
    "NOC Delhi",
    "L&DO NOC",
    "DDA approval Delhi",
    "freehold conversion Delhi",
    "property mutation Delhi",
    "MCD mutation",
    "NoObjectionCertificate.com",
    "how to get NOC from L&DO",
    "leasehold to freehold conversion Delhi",
    "substitution mutation L&DO Nirman Bhawan",
    "DDA conveyance deed process",
    "sale permission L&DO property",
    "e-dharti portal mutation",
    "MCD building plan sanction Delhi",
    "property liaison consultant Delhi",
  ],
  alternates: {
    canonical: "/",
    languages: { "en-IN": "/" },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "NoObjectionCertificate.com",
    title: "NOC Services Delhi | L&DO, DDA Approvals — NOC Banwao",
    description:
      "NOC Banwao, Deal Aage Badhao — L&DO, DDA, MCD NOCs, freehold conversion, mutation & Delhi government approvals. 3rd-generation liaison experts.",
    images: [
      {
        url: "/noc.png",
        width: 1200,
        height: 630,
        alt: "NoObjectionCertificate.com NOC services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NOC Services Delhi | L&DO, DDA Approvals — NOC Banwao",
    description:
      "L&DO, DDA, MCD NOCs, freehold conversion, mutation & Delhi government approvals. 3rd-generation liaison experts.",
    images: ["/noc.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <StructuredData />
        <Suspense fallback={null}>
          <ReferralWelcome />
        </Suspense>
        {children}
        <GoogleAnalytics />
      </body>
    </html>
  );
}
