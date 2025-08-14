export function limitText(text: string, limit: number = 11): string {
  if (!text) return '';
  return text.length > limit ? text.slice(0, limit).trim() + '...' : text;
}
