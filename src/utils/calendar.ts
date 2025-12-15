export function mapMonth(index: number) {
  return new Date(2000, index, 1)
    .toLocaleString("en-US", { month: "short" })
    .toUpperCase();
}
