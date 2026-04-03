import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatHuf(amount: number): string {
  return new Intl.NumberFormat("hu-HU", {
    style: "decimal",
    maximumFractionDigits: 0,
  }).format(Math.round(amount)) + " Ft";
}
