import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NotFoundPage } from "@/components/NotFoundPage";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Page not found – SwissData",
  robots: { index: false },
};

// Every address that is not a page of the site (the root layout is under [lang], so this page has its own <html>).
export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NotFoundPage />
      </body>
    </html>
  );
}
