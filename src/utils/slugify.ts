export function slugify(text: string): string {
  // Replace German special characters
  const replacements: { [key: string]: string } = {
    'ä': 'ae',
    'ö': 'oe',
    'ü': 'ue',
    'ß': 'ss',
    'Ä': 'ae',
    'Ö': 'oe',
    'Ü': 'ue'
  };
  
  let result = text.toLowerCase().trim();
  
  // Replace German umlauts
  Object.keys(replacements).forEach(key => {
    result = result.replace(new RegExp(key, 'g'), replacements[key]);
  });
  
  // Remove all non-alphanumeric characters except spaces and hyphens
  result = result
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
  
  return result;
}