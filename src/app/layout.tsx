import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClientLayout } from "@/components/ClientLayout";
import { LANGUAGE_INIT_SCRIPT } from "@/i18n/LanguageContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SwissData – Switzerland in Numbers",
  description:
    "Statistics on Switzerland's economy, population and society, each with its source. A quiz and a comparison of the 26 cantons.",
  keywords: [
    "Switzerland",
    "statistics",
    "data",
    "economy",
    "demographics",
    "BFS",
    "SECO",
  ],
  authors: [{ name: "SwissData" }],
  openGraph: {
    title: "SwissData – Switzerland in Numbers",
    description:
      "Statistics on Switzerland's economy, population and society, each with its source.",
    type: "website",
    locale: "en_CH",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // lang and class are set by the script below before React starts: no hydration warning for them
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: LANGUAGE_INIT_SCRIPT }} />
      </head>
      <body className={inter.className}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
