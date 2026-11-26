import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


/** Name of a canton in the language of the page. */
export function cantonName(
  canton: { name: string; nameDE: string; nameFR: string; nameIT: string },
  locale: "en" | "it" | "de" | "fr"
): string {
  return locale === "it" ? canton.nameIT : locale === "de" ? canton.nameDE : locale === "fr" ? canton.nameFR : canton.name;
}
