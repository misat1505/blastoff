export function removeDuplicates<T>(data: T[], key: keyof T): T[] {
  const seen = new Set<T[keyof T]>();

  const filtered = data.filter((data) => {
    if (seen.has(data[key])) return false;
    seen.add(data[key]);
    return true;
  });

  return filtered;
}
