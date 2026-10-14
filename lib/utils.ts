import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatHuf(amount: number, locale = "hu-HU"): string {
  return new Intl.NumberFormat(locale, {
    style: "decimal",
    maximumFractionDigits: 0,
  }).format(Math.round(amount)) + " Ft";
}
