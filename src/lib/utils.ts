import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** The SwissData site on public spending (federal budget, cantons, municipalities, contracts). Italian at the root, English under /en/. */
export const SPENDING_URL = "https://spending.swissdata-platform.ch";
