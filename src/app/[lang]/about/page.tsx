import type { Metadata } from "next";
import { pageMetadata } from "@/i18n/metadata";
import AboutPage from "./AboutPage";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  return pageMetadata((await params).lang, "/about");
}

export default function Page() {
  return <AboutPage />;
}
