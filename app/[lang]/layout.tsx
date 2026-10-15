import type { Metadata } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { buildAlternates, hasLocale, locales, ogLocales, siteUrl } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

const archivo = Archivo({
  subsets: ["latin", "latin-ext"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { meta } = await getDictionary(lang);

  return {
    metadataBase: new URL(siteUrl),
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: buildAlternates(lang, "/"),
    openGraph: {
      type: "website",
      title: meta.title,
      description: meta.ogDescription,
      locale: ogLocales[lang],
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <html lang={lang} className={`h-full ${archivo.variable} ${jetbrains.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "RoofingContractor",
              name: "Máté Tetőfedő & Bádogos",
              description: dict.meta.jsonLdDescription,
              telephone: "+36300951686",
              email: "mate.tetofedo@gmail.com",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Budapest",
                addressCountry: "HU",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 47.4979,
                longitude: 19.0402,
              },
              openingHours: ["Mo-Fr 07:00-18:00", "Sa 08:00-13:00"],
              priceRange: "$$",
              areaServed: [
                { "@type": "Country", name: "Hungary" },
                { "@type": "Country", name: "Austria" },
                { "@type": "Country", name: "Slovakia" },
                { "@type": "Country", name: "Germany" },
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col antialiased">
        <Navbar lang={lang} dict={dict.nav} callNowNumber={dict.common.callNowNumber} />
        <main className="flex-1">{children}</main>
        <Footer lang={lang} dict={dict.footer} navLinks={dict.nav.links} />
      </body>
    </html>
  );
}
