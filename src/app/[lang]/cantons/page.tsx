import type { Metadata } from "next";
import { pageMetadata } from "@/i18n/metadata";
import CantonsPage from "./CantonsPage";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  return pageMetadata((await params).lang, "/cantons");
}

export default function Page() {
  return <CantonsPage />;
}
