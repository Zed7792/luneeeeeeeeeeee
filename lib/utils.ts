export function cn(...inputs: (string | undefined | null | boolean | Record<string, boolean>)[]) {
  return inputs
    .flat()
    .filter((x): x is string => typeof x === "string")
    .join(" ")
    .trim()
}
