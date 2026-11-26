import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClientLayout } from "@/components/ClientLayout";
import { translations } from "@/i18n/translations";
import { getRequestLocale } from "@/i18n/server";

const inter = Inter({ subsets: ["latin"] });

const OG_LOCALE = { en: "en_CH", it: "it_CH", de: "de_CH", fr: "fr_CH" } as const;

// Title and description in the language of the request (cookie, then Accept-Language, then English).
export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const t = translations[locale];
  const title = `SwissData – ${t.home.title} ${t.home.titleHighlight}`;
  return {
    title,
    description: t.home.subtitle,
    keywords: ["Switzerland", "statistics", "data", "economy", "demographics", "BFS", "SECO"],
    authors: [{ name: "SwissData" }],
    openGraph: { title, description: t.home.subtitle, type: "website", locale: OG_LOCALE[locale] },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Reading the cookie and the header makes every page render on the server per request:
  // the HTML arrives with the right <html lang>, title and texts, with or without JavaScript.
  const locale = await getRequestLocale();
  return (
    <html lang={locale}>
      <body className={inter.className}>
        <ClientLayout initialLocale={locale}>{children}</ClientLayout>
      </body>
    </html>
  );
}
