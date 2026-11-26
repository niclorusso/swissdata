import { LanguageRedirect, languageRedirectMetadata } from "@/components/LanguageRedirect";

export const metadata = languageRedirectMetadata("/cantons");

export default function Page() {
  return <LanguageRedirect path="/cantons" />;
}
