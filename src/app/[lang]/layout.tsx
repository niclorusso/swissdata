import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Inter } from "next/font/google";
import "../globals.css";
import { ClientLayout } from "@/components/ClientLayout";
import { LOCALES, isLocale } from "@/i18n/locale";
import { siteMetadata } from "@/i18n/metadata";

const inter = Inter({ subsets: ["latin"] });

// Every page exists once per language, at /it, /de, /fr and /en, and is prerendered as static HTML at
// build time: <html lang>, title, description and texts are already in the language of the address.
export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

// Any other first segment is a 404, not a page rendered on demand.
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return isLocale(lang) ? siteMetadata(lang) : {};
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return (
    <html lang={lang}>
      <body className={inter.className}>
        {/* without JavaScript the "?" panels cannot be opened: show them open */}
        <noscript>
          <style>{"[data-more-panel]{display:block!important}"}</style>
        </noscript>
        <ClientLayout locale={lang}>{children}</ClientLayout>
      </body>
    </html>
  );
}
