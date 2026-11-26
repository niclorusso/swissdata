import { LanguageRedirect, languageRedirectMetadata } from "@/components/LanguageRedirect";

export const metadata = languageRedirectMetadata("/about");

export default function Page() {
  return <LanguageRedirect path="/about" />;
}
