import { LanguageRedirect, languageRedirectMetadata } from "@/components/LanguageRedirect";

export const metadata = languageRedirectMetadata("/statistics");

export default function Page() {
  return <LanguageRedirect path="/statistics" />;
}
