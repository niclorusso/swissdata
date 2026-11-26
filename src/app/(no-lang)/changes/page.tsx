import { LanguageRedirect, languageRedirectMetadata } from "@/components/LanguageRedirect";

export const metadata = languageRedirectMetadata("/changes");

export default function Page() {
  return <LanguageRedirect path="/changes" />;
}
