import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClientLayout } from "@/components/ClientLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SwissData - Data-Driven Insights for Informed Decisions",
  description:
    "Explore real statistics about Switzerland's economy, demographics, and society. Make informed decisions with reliable data.",
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
    title: "SwissData - Data-Driven Insights for Informed Decisions",
    description:
      "Explore real statistics about Switzerland. Make informed decisions.",
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
    <html lang="en">
      <body className={inter.className}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
