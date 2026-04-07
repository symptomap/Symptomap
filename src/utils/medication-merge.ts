/**
 * Non-Destructive Medication Library Merge Utility
 * 
 * This utility preserves all existing medications while:
 * - Adding new medications without duplication
 * - Enriching existing entries with missing data
 * - Identifying and merging similar medications with aliases
 * - Preserving user-added custom entries
 */

export interface MedicationEntry {
  name: string;
  aliases?: string[];
  category?: string;
  subcategory?: string;
  mechanism_label?: string;
  common_use_labels?: string[];
  search_terms?: string[];
  source?: "predefined" | "user_added" | "enriched";
}

/**
 * Normalize a medication name for comparison
 * Removes spaces, converts to lowercase, removes common suffixes
 */
function normalizeName(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "")
    .replace(/mofetil$/i, "")
    .replace(/acetate$/i, "")
    .replace(/hydrochloride$/i, "")
    .replace(/sulfate$/i, "");
}

/**
 * Check if two medication names are similar enough to be considered duplicates
 */
function areSimilar(name1: string, name2: string): boolean {
  const normalized1 = normalizeName(name1);
  const normalized2 = normalizeName(name2);

  // Exact match after normalization
  if (normalized1 === normalized2) return true;

  // One is contained in the other (for short names)
  if (normalized1.length >= 4 && normalized2.length >= 4) {
    if (normalized1.includes(normalized2) || normalized2.includes(normalized1)) {
      return true;
    }
  }

  // Levenshtein distance for typos
  const distance = levenshteinDistance(normalized1, normalized2);
  const maxLength = Math.max(normalized1.length, normalized2.length);
  
  // Allow 1-2 character difference for medications
  return distance <= 2 && distance / maxLength < 0.2;
}

/**
 * Calculate Levenshtein distance between two strings
 */
function levenshteinDistance(str1: string, str2: string): number {
  const matrix: number[][] = [];

  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1,     // insertion
          matrix[i - 1][j] + 1      // deletion
        );
      }
    }
  }

  return matrix[str2.length][str1.length];
}

/**
 * Check if a medication name matches any aliases
 */
function matchesAlias(name: string, medication: MedicationEntry): boolean {
  if (!medication.aliases) return false;
  
  const normalizedName = normalizeName(name);
  return medication.aliases.some(alias => 
    normalizeName(alias) === normalizedName
  );
}

/**
 * Find an existing medication by name or alias
 */
function findExistingMedication(
  name: string,
  existingMeds: MedicationEntry[]
): { medication: MedicationEntry; index: number } | null {
  for (let i = 0; i < existingMeds.length; i++) {
    const med = existingMeds[i];
    
    // Check exact name match
    if (normalizeName(med.name) === normalizeName(name)) {
      return { medication: med, index: i };
    }
    
    // Check alias match
    if (matchesAlias(name, med)) {
      return { medication: med, index: i };
    }
    
    // Check similarity
    if (areSimilar(med.name, name)) {
      return { medication: med, index: i };
    }
  }
  
  return null;
}

/**
 * Merge two medication entries, preserving all data
 */
function mergeMedicationEntries(
  existing: MedicationEntry,
  newEntry: MedicationEntry
): MedicationEntry {
  // Start with existing data
  const merged: MedicationEntry = { ...existing };

  // Add name as alias if different
  if (normalizeName(existing.name) !== normalizeName(newEntry.name)) {
    merged.aliases = merged.aliases || [];
    if (!merged.aliases.some(a => normalizeName(a) === normalizeName(newEntry.name))) {
      merged.aliases.push(newEntry.name);
    }
  }

  // Merge aliases
  if (newEntry.aliases && newEntry.aliases.length > 0) {
    merged.aliases = merged.aliases || [];
    newEntry.aliases.forEach(alias => {
      if (!merged.aliases!.some(a => normalizeName(a) === normalizeName(alias))) {
        merged.aliases!.push(alias);
      }
    });
  }

  // Enrich missing fields (don't overwrite existing)
  if (!merged.category && newEntry.category) {
    merged.category = newEntry.category;
  }
  
  if (!merged.subcategory && newEntry.subcategory) {
    merged.subcategory = newEntry.subcategory;
  }
  
  if (!merged.mechanism_label && newEntry.mechanism_label) {
    merged.mechanism_label = newEntry.mechanism_label;
  }

  // Merge common_use_labels
  if (newEntry.common_use_labels && newEntry.common_use_labels.length > 0) {
    merged.common_use_labels = merged.common_use_labels || [];
    newEntry.common_use_labels.forEach(label => {
      if (!merged.common_use_labels!.includes(label)) {
        merged.common_use_labels!.push(label);
      }
    });
  }

  // Merge search_terms
  if (newEntry.search_terms && newEntry.search_terms.length > 0) {
    merged.search_terms = merged.search_terms || [];
    newEntry.search_terms.forEach(term => {
      if (!merged.search_terms!.includes(term)) {
        merged.search_terms!.push(term);
      }
    });
  }

  // Update source to enriched if it was user_added
  if (merged.source === "user_added" && newEntry.source === "predefined") {
    merged.source = "enriched";
  }

  return merged;
}

/**
 * Non-destructive merge of new medications into existing dataset
 * 
 * @param existing - Current medication library
 * @param newMedications - New medications to add/merge
 * @returns Complete merged medication library
 */
export function mergeMedicationLibraries(
  existing: MedicationEntry[],
  newMedications: MedicationEntry[]
): MedicationEntry[] {
  // Start with a copy of existing medications
  const merged: MedicationEntry[] = JSON.parse(JSON.stringify(existing));

  // Process each new medication
  for (const newMed of newMedications) {
    const found = findExistingMedication(newMed.name, merged);

    if (found) {
      // Medication exists - merge/enrich it
      merged[found.index] = mergeMedicationEntries(found.medication, newMed);
    } else {
      // New medication - add it
      merged.push({
        ...newMed,
        source: newMed.source || "predefined"
      });
    }
  }

  return merged;
}

/**
 * Add a user-entered medication to the library
 * Checks for duplicates and enriches if possible
 */
export function addUserMedication(
  existing: MedicationEntry[],
  medicationName: string
): MedicationEntry[] {
  const found = findExistingMedication(medicationName, existing);

  if (found) {
    // Already exists, return unchanged
    return existing;
  }

  // Create new user-added entry
  const newMedication: MedicationEntry = {
    name: medicationName,
    source: "user_added"
  };

  return [...existing, newMedication];
}

/**
 * Search medications with fuzzy matching
 */
export function searchMedications(
  library: MedicationEntry[],
  query: string,
  limit: number = 10
): MedicationEntry[] {
  if (!query || query.trim().length === 0) {
    return library.slice(0, limit);
  }

  const normalizedQuery = query.toLowerCase().trim();
  const results: { medication: MedicationEntry; score: number }[] = [];

  for (const med of library) {
    let score = 0;

    // Exact name match (highest priority)
    if (med.name.toLowerCase() === normalizedQuery) {
      score = 1000;
    }
    // Name starts with query
    else if (med.name.toLowerCase().startsWith(normalizedQuery)) {
      score = 100;
    }
    // Name contains query
    else if (med.name.toLowerCase().includes(normalizedQuery)) {
      score = 50;
    }

    // Check aliases
    if (med.aliases) {
      for (const alias of med.aliases) {
        if (alias.toLowerCase() === normalizedQuery) {
          score = Math.max(score, 900);
        } else if (alias.toLowerCase().startsWith(normalizedQuery)) {
          score = Math.max(score, 90);
        } else if (alias.toLowerCase().includes(normalizedQuery)) {
          score = Math.max(score, 45);
        }
      }
    }

    // Check search terms
    if (med.search_terms) {
      for (const term of med.search_terms) {
        if (term.toLowerCase().includes(normalizedQuery)) {
          score = Math.max(score, 20);
        }
      }
    }

    // Check category and subcategory
    if (med.category && med.category.toLowerCase().includes(normalizedQuery)) {
      score = Math.max(score, 15);
    }
    if (med.subcategory && med.subcategory.toLowerCase().includes(normalizedQuery)) {
      score = Math.max(score, 15);
    }

    // Check common use labels
    if (med.common_use_labels) {
      for (const label of med.common_use_labels) {
        if (label.toLowerCase().includes(normalizedQuery)) {
          score = Math.max(score, 10);
        }
      }
    }

    if (score > 0) {
      results.push({ medication: med, score });
    }
  }

  // Sort by score descending
  results.sort((a, b) => b.score - a.score);

  return results.slice(0, limit).map(r => r.medication);
}

/**
 * Get all unique categories from the medication library
 */
export function getMedicationCategories(library: MedicationEntry[]): string[] {
  const categories = new Set<string>();
  
  for (const med of library) {
    if (med.category) {
      categories.add(med.category);
    }
  }

  return Array.from(categories).sort();
}

/**
 * Filter medications by category
 */
export function filterByCategory(
  library: MedicationEntry[],
  category: string
): MedicationEntry[] {
  return library.filter(med => 
    med.category && med.category.toLowerCase() === category.toLowerCase()
  );
}
