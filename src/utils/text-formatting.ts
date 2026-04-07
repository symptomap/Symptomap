/**
 * Text formatting utilities for proper capitalization and sentence structure
 */

/**
 * Capitalizes the first letter of a string
 * @param str - The string to capitalize
 * @returns String with first letter capitalized
 */
export function capitalizeFirst(str: string): string {
  if (!str || str.length === 0) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Converts a name to proper Title Case (each word capitalized)
 * Handles special cases like hyphenated names and apostrophes
 * @param name - The name to format
 * @returns Properly capitalized name
 */
export function capitalizeName(name: string): string {
  if (!name || name.length === 0) return name;
  
  // Split by spaces and hyphens, but keep the separators
  const parts = name.split(/(\s+|-)/);
  
  return parts.map(part => {
    // Skip whitespace and separators
    if (!part || part.match(/^\s+$/) || part === '-') {
      return part;
    }
    
    // Handle apostrophes (e.g., O'Brien)
    if (part.includes("'")) {
      return part.split("'").map((subPart, index) => {
        if (index === 0) {
          return capitalizeFirst(subPart.toLowerCase());
        }
        return capitalizeFirst(subPart.toLowerCase());
      }).join("'");
    }
    
    // Regular word capitalization
    return capitalizeFirst(part.toLowerCase());
  }).join('');
}

/**
 * Capitalizes the first word of a sentence, preserving leading whitespace
 * @param sentence - The sentence to format
 * @returns Sentence with capitalized first word
 */
export function capitalizeFirstWord(sentence: string): string {
  if (!sentence || sentence.length === 0) return sentence;
  
  // Find the first non-whitespace character
  const match = sentence.match(/^(\s*)(.)/);
  if (!match) return sentence;
  
  const [, leadingSpace, firstChar] = match;
  return leadingSpace + firstChar.toUpperCase() + sentence.slice(leadingSpace.length + 1);
}

/**
 * Ensures a sentence starts with a capital letter
 * @param sentence - The sentence to format
 * @returns Sentence with capitalized first letter
 */
export function capitalizeSentence(sentence: string): string {
  if (!sentence || sentence.length === 0) return sentence;
  return capitalizeFirst(sentence.trim());
}

/**
 * Capitalizes the first letter of each sentence in a paragraph
 * Handles multiple sentences separated by periods, question marks, or exclamation marks
 * @param text - The text to format
 * @returns Text with each sentence properly capitalized
 */
export function capitalizeAllSentences(text: string): string {
  if (!text) return text;
  
  // Split by sentence-ending punctuation, but keep the punctuation
  const sentences = text.split(/([.!?]\s+)/);
  
  let result = "";
  for (let i = 0; i < sentences.length; i++) {
    const part = sentences[i];
    
    // If it's a sentence-ending punctuation with space, keep it as is
    if (/^[.!?]\s+$/.test(part)) {
      result += part;
    } 
    // If it's the first part or follows a punctuation, capitalize it
    else if (i === 0 || /^[.!?]\s+$/.test(sentences[i - 1])) {
      result += capitalizeFirst(part);
    }
    // Otherwise, keep as is
    else {
      result += part;
    }
  }
  
  return result;
}

/**
 * Formats a full name (first + last) with proper capitalization
 * @param firstName - First name
 * @param lastName - Last name
 * @returns Formatted full name
 */
export function formatFullName(firstName: string, lastName: string): string {
  const formattedFirst = capitalizeName(firstName);
  const formattedLast = capitalizeName(lastName);
  return `${formattedFirst} ${formattedLast}`.trim();
}

/**
 * Capitalizes text while preserving medical abbreviations and special formatting
 * This is useful for symptom names, condition names, etc.
 * @param text - The text to format
 * @returns Formatted text with proper capitalization
 */
export function capitalizeWithAbbreviations(text: string): string {
  if (!text) return text;
  
  // Known medical abbreviations that should stay uppercase
  const abbreviations = ['MS', 'MOGAD', 'NMOSD', 'MRI', 'CT', 'IV', 'IM', 'SC', 'PO', 'PR'];
  
  // Split into words
  const words = text.split(/\s+/);
  
  return words.map((word, index) => {
    // Check if the word (without punctuation) is a known abbreviation
    const cleanWord = word.replace(/[^\w]/g, '');
    if (abbreviations.includes(cleanWord.toUpperCase())) {
      return word.toUpperCase();
    }
    
    // Capitalize first word of sentence
    if (index === 0) {
      return capitalizeFirst(word);
    }
    
    // Keep other words as is (unless they're all lowercase, then capitalize)
    if (word === word.toLowerCase()) {
      return capitalizeFirst(word);
    }
    
    return word;
  }).join(' ');
}
