export function normalize(input: string): string {
  return input
    .replace(/\s+/g, '')
    .replace(/[^\u0E00-\u0E7F\w]/g, '')
    .toLowerCase();
}

export function matchName(obj: { name: string; name_en?: string }, input: string): boolean {
  const norm = normalize(input);
  return normalize(obj.name) === norm || normalize(obj.name_en || '') === norm;
}
