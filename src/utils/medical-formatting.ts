import { medicalConditions } from "../app/data/medical-conditions";

// Diagnosis data from Step1
const diagnoses = [
  // Neurological Autoimmune
  { value: "multiple-sclerosis", label: "Multiple Sclerosis (MS)" },
  { value: "mogad", label: "Myelin Oligodendrocyte Glycoprotein Antibody-Associated Disease (MOGAD)" },
  { value: "nmosd", label: "Neuromyelitis Optica Spectrum Disorder (NMOSD)" },
  { value: "autoimmune-encephalitis", label: "Autoimmune Encephalitis" },
  { value: "autoimmune-epilepsy", label: "Autoimmune Epilepsy" },
  { value: "guillain-barre-syndrome", label: "Guillain-Barré Syndrome" },
  { value: "cidp", label: "Chronic Inflammatory Demyelinating Polyneuropathy (CIDP)" },
  { value: "myasthenia-gravis", label: "Myasthenia Gravis" },
  { value: "stiff-person-syndrome", label: "Stiff Person Syndrome" },
  { value: "autoimmune-cerebellitis", label: "Autoimmune Cerebellitis" },
  { value: "transverse-myelitis", label: "Transverse Myelitis" },
  { value: "autoimmune-autonomic-ganglionopathy", label: "Autoimmune Autonomic Ganglionopathy" },
  { value: "rasmussen-encephalitis", label: "Rasmussen Encephalitis" },

  // Systemic / Connective Tissue
  { value: "systemic-lupus-erythematosus", label: "Systemic Lupus Erythematosus (SLE)" },
  { value: "rheumatoid-arthritis", label: "Rheumatoid Arthritis (RA)" },
  { value: "sjogrens-syndrome", label: "Sjögren's Syndrome" },
  { value: "systemic-sclerosis", label: "Systemic Sclerosis (Scleroderma)" },
  { value: "mixed-connective-tissue-disease", label: "Mixed Connective Tissue Disease (MCTD)" },
  { value: "undifferentiated-connective-tissue-disease", label: "Undifferentiated Connective Tissue Disease (UCTD)" },
  { value: "antiphospholipid-syndrome", label: "Antiphospholipid Syndrome" },
  { value: "polymyositis", label: "Polymyositis" },
  { value: "dermatomyositis", label: "Dermatomyositis" },
  { value: "necrotizing-autoimmune-myopathy", label: "Necrotizing Autoimmune Myopathy" },
  { value: "eosinophilic-fasciitis", label: "Eosinophilic Fasciitis" },

  // Rheumatologic
  { value: "ankylosing-spondylitis", label: "Ankylosing Spondylitis" },
  { value: "psoriatic-arthritis", label: "Psoriatic Arthritis" },
  { value: "reactive-arthritis", label: "Reactive Arthritis" },
  { value: "juvenile-idiopathic-arthritis", label: "Juvenile Idiopathic Arthritis" },
  { value: "adult-onset-stills-disease", label: "Adult-onset Still's Disease" },
  { value: "palindromic-rheumatism", label: "Palindromic Rheumatism" },

  // Gastrointestinal Autoimmune
  { value: "crohns-disease", label: "Crohn's Disease" },
  { value: "ulcerative-colitis", label: "Ulcerative Colitis" },
  { value: "celiac-disease", label: "Celiac Disease" },
  { value: "autoimmune-hepatitis", label: "Autoimmune Hepatitis" },
  { value: "primary-biliary-cholangitis", label: "Primary Biliary Cholangitis (PBC)" },
  { value: "primary-sclerosing-cholangitis", label: "Primary Sclerosing Cholangitis (PSC)" },
  { value: "autoimmune-pancreatitis", label: "Autoimmune Pancreatitis" },
  { value: "pernicious-anemia", label: "Pernicious Anemia" },

  // Endocrine Autoimmune
  { value: "hashimotos-thyroiditis", label: "Hashimoto's Thyroiditis" },
  { value: "graves-disease", label: "Graves' Disease" },
  { value: "type-1-diabetes", label: "Type 1 Diabetes Mellitus" },
  { value: "addisons-disease", label: "Addison's Disease" },
  { value: "autoimmune-hypophysitis", label: "Autoimmune Hypophysitis" },
  { value: "autoimmune-polyglandular-syndrome", label: "Autoimmune Polyglandular Syndrome" },
  { value: "autoimmune-oophoritis", label: "Autoimmune Oophoritis" },
  { value: "autoimmune-orchitis", label: "Autoimmune Orchitis" },

  // Dermatological Autoimmune
  { value: "psoriasis", label: "Psoriasis" },
  { value: "vitiligo", label: "Vitiligo" },
  { value: "alopecia-areata", label: "Alopecia Areata" },
  { value: "bullous-pemphigoid", label: "Bullous Pemphigoid" },
  { value: "pemphigus-vulgaris", label: "Pemphigus Vulgaris" },
  { value: "dermatitis-herpetiformis", label: "Dermatitis Herpetiformis" },
  { value: "lichen-planus", label: "Lichen Planus" },
  { value: "morphea", label: "Morphea" },
  { value: "cutaneous-lupus", label: "Cutaneous Lupus" },

  // Vascular / Pulmonary Autoimmune
  { value: "granulomatosis-with-polyangiitis", label: "Granulomatosis with Polyangiitis (GPA)" },
  { value: "microscopic-polyangiitis", label: "Microscopic Polyangiitis" },
  { value: "eosinophilic-granulomatosis", label: "Eosinophilic Granulomatosis (EGPA)" },
  { value: "takayasu-arteritis", label: "Takayasu Arteritis" },
  { value: "giant-cell-arteritis", label: "Giant Cell Arteritis" },
  { value: "behcets-disease", label: "Behçet's Disease" },
  { value: "autoimmune-interstitial-lung-disease", label: "Autoimmune Interstitial Lung Disease" },

  // Neuropsychiatric / Systemic Autoimmune
  { value: "autoimmune-neuropsychiatric-syndromes", label: "Autoimmune Neuropsychiatric Syndromes" },
  { value: "pans-pandas", label: "PANS / PANDAS" },
  { value: "cirs", label: "Chronic Inflammatory Response Syndrome (CIRS)" },
  { value: "autoimmune-fatigue-syndromes", label: "Autoimmune Fatigue Syndromes" },
];

/**
 * Extract abbreviation from a medical term label if it exists
 * @param label - The full label (e.g., "Multiple Sclerosis (MS)")
 * @returns Object with fullName and abbreviation (if exists)
 */
export function extractMedicalTermParts(label: string): { fullName: string; abbreviation: string | null } {
  // Match pattern: "Full Name (ABBR)" or "Full Name (Alternative Name)"
  const match = label.match(/^(.+?)\s*\(([^)]+)\)$/);
  
  if (match) {
    const fullName = match[1].trim();
    const possibleAbbr = match[2].trim();
    
    // Check if it's a true abbreviation (all caps or known abbreviations)
    // Also handle mixed case like "Scleroderma" which is an alternative name, not abbreviation
    const isAbbreviation = /^[A-Z][A-Z0-9\/\s-]*$/.test(possibleAbbr) || possibleAbbr.length <= 6;
    
    if (isAbbreviation) {
      return { fullName, abbreviation: possibleAbbr };
    }
  }
  
  // No abbreviation found
  return { fullName: label, abbreviation: null };
}

/**
 * Formats a medical condition value (kebab-case) into a properly formatted medical term
 * @param value - The value string (e.g., "mogad", "autoimmune-encephalitis")
 * @returns Formatted medical term (e.g., "Myelin Oligodendrocyte Glycoprotein Antibody-Associated Disease (MOGAD)")
 */
export function formatMedicalCondition(value: string): string {
  if (!value) return "";
  
  // First check diagnoses
  const diagnosis = diagnoses.find(d => d.value === value);
  if (diagnosis) {
    return diagnosis.label;
  }
  
  // Then check medical conditions
  const condition = medicalConditions.find(c => c.value === value);
  if (condition) {
    return condition.label;
  }
  
  // Fallback: convert kebab-case to Title Case
  return value
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

/**
 * Get the abbreviation-only version of a medical term
 * @param value - The value string
 * @returns Just the abbreviation if exists, otherwise full name
 */
export function getMedicalAbbreviation(value: string): string {
  const fullLabel = formatMedicalCondition(value);
  const { fullName, abbreviation } = extractMedicalTermParts(fullLabel);
  return abbreviation || fullName;
}

/**
 * Format a medical condition with first mention / subsequent mention logic
 * @param value - The value string
 * @param isFirstMention - Whether this is the first mention in the text block
 * @returns Formatted string (full name + abbr for first, just abbr for subsequent)
 */
export function formatMedicalConditionWithContext(value: string, isFirstMention: boolean): string {
  const fullLabel = formatMedicalCondition(value);
  const { fullName, abbreviation } = extractMedicalTermParts(fullLabel);
  
  if (isFirstMention) {
    // First mention: always show full label (which includes abbreviation if it exists)
    return fullLabel;
  } else {
    // Subsequent mention: use abbreviation if exists, otherwise full name
    return abbreviation || fullName;
  }
}

/**
 * Format a list of medical conditions with proper first mention handling
 * Each condition in the list is treated as its first mention
 * @param values - Array of condition value strings
 * @returns Formatted string with proper grammar
 */
export function formatMedicalConditionList(values: string[]): string {
  if (!values || values.length === 0) return "";
  
  const formatted = values.map(v => formatMedicalCondition(v));
  
  if (formatted.length === 1) {
    return formatted[0];
  } else if (formatted.length === 2) {
    return `${formatted[0]} and ${formatted[1]}`;
  } else {
    const last = formatted[formatted.length - 1];
    const rest = formatted.slice(0, -1);
    return `${rest.join(", ")}, and ${last}`;
  }
}

/**
 * Formats an array of medical condition values
 * @param values - Array of value strings
 * @returns Array of formatted medical terms
 */
export function formatMedicalConditions(values: string[]): string[] {
  if (!values || values.length === 0) return [];
  return values.map(formatMedicalCondition);
}

/**
 * Gets the label for a diagnosis value
 * @param value - The diagnosis value
 * @returns The diagnosis label
 */
export function getDiagnosisLabel(value: string): string {
  const diagnosis = diagnoses.find(d => d.value === value);
  return diagnosis?.label || formatMedicalCondition(value);
}

/**
 * Helper class to track first mentions within a text generation context
 */
export class MedicalTermTracker {
  private mentionedTerms: Set<string> = new Set();
  
  /**
   * Format a medical term, tracking if it's been mentioned before
   * @param value - The condition value
   * @returns Formatted term (full + abbr for first, abbr only for subsequent)
   */
  format(value: string): string {
    const isFirstMention = !this.mentionedTerms.has(value);
    this.mentionedTerms.add(value);
    return formatMedicalConditionWithContext(value, isFirstMention);
  }
  
  /**
   * Reset the tracker (use when starting a new text block)
   */
  reset(): void {
    this.mentionedTerms.clear();
  }
  
  /**
   * Check if a term has been mentioned
   */
  hasMentioned(value: string): boolean {
    return this.mentionedTerms.has(value);
  }
}
