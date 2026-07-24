type ClassValue = string | number | null | false | undefined;

/** Tiny className joiner (falsy values dropped). */
export function cn(...inputs: ClassValue[]): string {
  return inputs.filter(Boolean).join(" ");
}
