// Utility function to extract the English flavor text from a list of entries
// Each entry should have a 'language' property and a 'flavor_text' property
export function getEnglishFlavorText(
  entries: { language: { name: string }; flavor_text: string }[]
): string {
  // Find the first entry where the language is English
  const englishEntry = entries.find((entry) => entry.language.name === 'en');
  // If found, clean up whitespace and return the flavor text
  if (englishEntry) {
    return englishEntry.flavor_text.replace(/\s+/g, ' ');
  }
  // Fallback if no English entry is found
  return 'No English flavor text available.';
}
