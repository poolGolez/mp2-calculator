export function mapMonth(index: number) {
  return new Date(2000, index, 1)
    .toLocaleString("en-US", { month: "short" })
    .toUpperCase();
}

export function inverseMapMonth(month: string): number {
  const normalized = month.trim().toUpperCase();

  const months = Array.from({ length: 12 }, (_, i) =>
    new Date(2000, i, 1)
      .toLocaleString('en-US', { month: 'short' })
      .toUpperCase()
  );

  const index = months.indexOf(normalized);

  if (index === -1) {
    throw new Error(`Invalid month: ${month}`);
  }

  return index;
}