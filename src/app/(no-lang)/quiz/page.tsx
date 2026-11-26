import { LanguageRedirect, languageRedirectMetadata } from "@/components/LanguageRedirect";

export const metadata = languageRedirectMetadata("/quiz");

export default function Page() {
  return <LanguageRedirect path="/quiz" />;
}
