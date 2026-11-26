import type { Metadata } from "next";
import { pageMetadata } from "@/i18n/metadata";
import ChangesPage from "./ChangesPage";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  return pageMetadata((await params).lang, "/changes");
}

export default function Page() {
  return <ChangesPage />;
}
