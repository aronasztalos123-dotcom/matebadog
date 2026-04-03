import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Máté Tetőfedő & Bádogos   Tetőfedés, Bádogos munkák | Gödöllő",
  description:
    "Professzionális tetőfedési, bádogos és ácsszerkezeti munkák Gödöllő és környékén. 15+ év tapasztalat, ingyenes felmérés, 5 év garancia. Hívjon most: +36 30 095 1686",
  keywords: ["tetőfedő", "bádogos", "Gödöllő", "tetőfelújítás", "ereszcsatorna", "ácsszerkezet"],
  openGraph: {
    type: "website",
    title: "Máté Tetőfedő & Bádogos   Tetőfedés, Bádogos munkák | Gödöllő",
    description:
      "Professzionális tetőfedési, bádogos és ácsszerkezeti munkák Gödöllő és környékén. 15+ év tapasztalat, ingyenes felmérés, 5 év garancia.",
    locale: "hu_HU",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hu" className="h-full">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "RoofingContractor",
              name: "Máté Tetőfedő & Bádogos",
              description: "Tetőfedési, bádogos és ácsszerkezeti munkák Gödöllőn",
              telephone: "+36300951686",
              email: "mate.tetofedo@gmail.com",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Gödöllő",
                addressRegion: "Pest",
                addressCountry: "HU",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 47.6394674,
                longitude: 19.9667394,
              },
              openingHours: ["Mo-Fr 07:00-18:00", "Sa 08:00-13:00"],
              priceRange: "$$",
              areaServed: [
                "Gödöllő",
                "Aszód",
                "Pécel",
                "Isaszeg",
                "Kistarcsa",
                "Mogyoród",
                "Bag",
                "Vácszentlászló",
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
