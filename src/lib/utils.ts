// src/lib/utils.ts

import { clsx, ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Junta classes com suporte para Tailwind e condicionais.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(...inputs));
}
