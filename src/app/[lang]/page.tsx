import type { Metadata } from "next";
import { pageMetadata } from "@/i18n/metadata";
import HomePage from "./HomePage";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  return pageMetadata((await params).lang, "");
}

export default function Page() {
  return <HomePage />;
}
