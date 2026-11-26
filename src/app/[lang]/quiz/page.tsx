import type { Metadata } from "next";
import { pageMetadata } from "@/i18n/metadata";
import QuizPage from "./QuizPage";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  return pageMetadata((await params).lang, "/quiz");
}

export default function Page() {
  return <QuizPage />;
}
