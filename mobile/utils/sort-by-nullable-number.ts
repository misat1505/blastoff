export function sortByNullableNumber<T>(
  data: T[],
  key: keyof T,
  direction: "asc" | "desc" = "desc"
): T[] {
  return [...data].sort((a, b) => {
    const aValue = (a[key] as number | null | undefined) ?? 0;
    const bValue = (b[key] as number | null | undefined) ?? 0;

    return direction === "asc" ? aValue - bValue : bValue - aValue;
  });
}
