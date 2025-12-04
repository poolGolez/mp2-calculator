export function formatNumber(value: number) {
  return value.toLocaleString("en-us", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
