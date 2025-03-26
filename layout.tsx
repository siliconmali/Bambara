import type { Metadata } from "next";
import "./globals.css";
import "antd/dist/reset.css";
import Providers from "@/components/core/Providers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import GlobalLayout from "@/components/RootLayout";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata: Metadata = {
  title: "N'KO DON - Préserver l'héritage malien",
  description: "Plateforme de collecte et traduction de données en Bambara | N'ko",
  keywords: [
    "N'ko Don", "Bambara", "N'ko", "Mali", "collecte", "traduction", "Nkodon",
    "traduction Bambara", "langue africaine", "préservation culturelle"
  ],
  authors: [{ name: "NkoDon Team", url: "https://nkodon.com" }],
  twitter: {
    site: "@nkodon",
    card: "summary_large_image",
    title: "N'KO DON - Plateforme de traduction Bambara & N'Ko",
    description: "Découvrez N'KO DON, la plateforme dédiée à la collecte et traduction des langues Bambara et N'Ko.",
    images: ["https://www.nkodon.com/logo.png"],
  },
  openGraph: {
    title: "N'KO DON - Préserver l'héritage malien",
    description: "Plateforme de collecte et traduction des langues Bambara et N'Ko.",
    url: "https://nkodon.com",
    siteName: "N'KO DON",
    images: [
      {
        url: "https://www.nkodon.com/logo.png", 
        width: 1200,
        height: 630,
        alt: "N'KO DON - Traduction Bambara et N'Ko",
      },
    ],
    type: "website",
  },
  other: {
    "application/ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "EducationalOrganization",
      "name": "N'KO DON",
      "url": "https://nkodon.com",
      "logo": "https://nkodon.com/logo.png",
      "description": "Plateforme de collecte et traduction des langues Bambara et N'Ko.",
      "sameAs": [
        "https://facebook.com/nkodon",
        "https://twitter.com/nkodon",
        "https://instagram.com/nkodon"
      ]
    }),
  },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="fr">
      <body>
        <Providers session={session}>
          <GlobalLayout session={session}>{children}</GlobalLayout>
          <Analytics />
          <SpeedInsights /> 
        </Providers>
      </body>
    </html>
  );
}