export function nameNormalizer(name: string | undefined | null): string {
  console.log('nameNormalizer input:', name);
  if (!name || typeof name !== 'string') {
    console.error('Invalid name:', name);
    return '';
  }

  name = name.replace(/\s*\([^)]*\)/g, '');
  name = name.trim();
  name = name
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());

  console.log('nameNormalizer output:', name);
  return name;
}