import type { Metadata } from "next";
import { pageMetadata } from "@/i18n/metadata";
import StatisticsPage from "./StatisticsPage";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  return pageMetadata((await params).lang, "/statistics");
}

export default function Page() {
  return <StatisticsPage />;
}
