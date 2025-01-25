export function removeHtmlTags(description: string | undefined | null): string {
  console.log('removeHtmlTags input:', description);
  if (!description || typeof description !== 'string') {
    console.error('Invalid description:', description);
    return '';
  }

  const sanitized = description.replace(/<[^>]*>/g, '');
  return sanitized;
}