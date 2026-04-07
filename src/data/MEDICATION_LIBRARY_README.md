# Medication Library System

## Overview

The SymptomMap medication library is a **non-destructive, continuously growing dataset** that combines:

- **Predefined medications** from `/src/data/medication-library.json`
- **User-added medications** entered during treatment tracking
- **Enriched entries** where user additions are enhanced with clinical data

## Core Principles

### 1. **Non-Destructive Merging**
- **NEVER** deletes or overwrites existing medications
- **ALWAYS** preserves user-added entries
- **AUTOMATICALLY** enriches incomplete entries with new data

### 2. **Intelligent Duplicate Detection**
- Identifies duplicates by exact name, aliases, and similarity
- Merges similar entries (e.g., "Amitriptyline" and "Amitriptylin")
- Preserves all aliases when merging

### 3. **User-Centric Design**
- Respects user input as authoritative
- Marks entries by source: `predefined`, `user_added`, or `enriched`
- Never removes user-customized medications

---

## Data Structure

### MedicationEntry Interface

```typescript
interface MedicationEntry {
  name: string;                    // Canonical medication name
  aliases?: string[];              // Brand names, alternate spellings, typos
  category?: string;               // High-level grouping (e.g., "Biologic therapy")
  subcategory?: string;            // Specific use context
  mechanism_label?: string;        // How it works
  common_use_labels?: string[];   // Patient-friendly tags
  search_terms?: string[];        // Keywords for autocomplete
  source?: "predefined" | "user_added" | "enriched";
}
```

### Example Entry

```json
{
  "name": "Rituximab",
  "aliases": ["Rituxan", "MabThera"],
  "category": "Biologic therapy",
  "subcategory": "B-cell targeting therapy",
  "mechanism_label": "CD20 monoclonal antibody",
  "common_use_labels": [
    "immune suppression",
    "relapse prevention",
    "B-cell depletion"
  ],
  "search_terms": [
    "biologic",
    "infusion",
    "immune",
    "MS",
    "NMOSD",
    "MOGAD"
  ]
}
```

---

## Usage

### In React Components

```typescript
import { useMedicationLibrary } from '../hooks/useMedicationLibrary';

function MyComponent() {
  const { library, search, addMedication, isLoaded } = useMedicationLibrary();

  // Search medications
  const results = search('rituximab', 10);

  // Add user medication
  const handleAdd = (name: string) => {
    addMedication(name);
  };

  return (
    <div>
      {/* Use search results */}
    </div>
  );
}
```

### Direct API

```typescript
import { mergeMedicationLibraries, searchMedications } from '../utils/medication-merge';

// Merge new medications
const merged = mergeMedicationLibraries(existingLibrary, newMedications);

// Search
const results = searchMedications(library, 'gabapentin', 10);
```

---

## Merge Behavior Examples

### Scenario 1: Adding New Medication

**Before:**
```json
[
  { "name": "Rituximab", "category": "Biologic therapy" }
]
```

**New Medications:**
```json
[
  { "name": "Ocrelizumab", "category": "Biologic therapy" }
]
```

**After Merge:**
```json
[
  { "name": "Rituximab", "category": "Biologic therapy" },
  { "name": "Ocrelizumab", "category": "Biologic therapy" }
]
```

✅ **Result:** New medication added, existing preserved

---

### Scenario 2: Enriching Existing Medication

**Before:**
```json
[
  { "name": "Rituximab", "category": "Biologic therapy" }
]
```

**New Medications:**
```json
[
  {
    "name": "Rituximab",
    "subcategory": "B-cell targeting therapy",
    "mechanism_label": "CD20 monoclonal antibody"
  }
]
```

**After Merge:**
```json
[
  {
    "name": "Rituximab",
    "category": "Biologic therapy",
    "subcategory": "B-cell targeting therapy",
    "mechanism_label": "CD20 monoclonal antibody"
  }
]
```

✅ **Result:** Existing entry enriched with new fields

---

### Scenario 3: Alias Detection and Merging

**Before:**
```json
[
  {
    "name": "Rituximab",
    "aliases": ["Rituxan"],
    "category": "Biologic therapy"
  }
]
```

**New Medications:**
```json
[
  {
    "name": "MabThera",
    "subcategory": "B-cell targeting therapy"
  }
]
```

**After Merge:**
```json
[
  {
    "name": "Rituximab",
    "aliases": ["Rituxan", "MabThera"],
    "category": "Biologic therapy",
    "subcategory": "B-cell targeting therapy"
  }
]
```

✅ **Result:** Detected as same medication, merged with alias added

---

### Scenario 4: Typo Detection and Correction

**Before:**
```json
[
  {
    "name": "Amitriptyline",
    "category": "Symptom management"
  }
]
```

**New Medications:**
```json
[
  {
    "name": "Amitriptylin",
    "source": "user_added"
  }
]
```

**After Merge:**
```json
[
  {
    "name": "Amitriptyline",
    "aliases": ["Amitriptylin"],
    "category": "Symptom management"
  }
]
```

✅ **Result:** Typo detected, added as alias, correct spelling preserved

---

### Scenario 5: User-Added Medication Gets Enriched

**Before:**
```json
[
  {
    "name": "Rituximab",
    "source": "user_added"
  }
]
```

**New Medications:**
```json
[
  {
    "name": "Rituximab",
    "aliases": ["Rituxan"],
    "category": "Biologic therapy",
    "subcategory": "B-cell targeting therapy",
    "source": "predefined"
  }
]
```

**After Merge:**
```json
[
  {
    "name": "Rituximab",
    "aliases": ["Rituxan"],
    "category": "Biologic therapy",
    "subcategory": "B-cell targeting therapy",
    "source": "enriched"
  }
]
```

✅ **Result:** User entry enriched, source updated to "enriched"

---

## Search Functionality

The search algorithm scores medications based on:

1. **Exact name match** (score: 1000)
2. **Name starts with query** (score: 100)
3. **Name contains query** (score: 50)
4. **Exact alias match** (score: 900)
5. **Alias starts with query** (score: 90)
6. **Alias contains query** (score: 45)
7. **Search term match** (score: 20)
8. **Category/subcategory match** (score: 15)
9. **Common use label match** (score: 10)

Results are sorted by score (highest first).

### Search Examples

```typescript
// Exact match
search('Rituximab') → [Rituximab, ...]

// Alias match
search('Rituxan') → [Rituximab, ...]

// Partial match
search('ritux') → [Rituximab, ...]

// Search term
search('MS') → [Ocrelizumab, Rituximab, Fingolimod, ...]

// Category
search('biologic') → [Rituximab, Ocrelizumab, ...]
```

---

## Extending the Library

### Method 1: Update Predefined Library

1. Edit `/src/data/medication-library.json`
2. Add new medications in the standard format
3. On next app load, new medications will be merged automatically

### Method 2: Programmatic Merge

```typescript
import { useMedicationLibrary } from '../hooks/useMedicationLibrary';

function AdminPanel() {
  const { mergeNewMedications } = useMedicationLibrary();

  const handleImport = (newMeds: MedicationEntry[]) => {
    mergeNewMedications(newMeds);
  };
}
```

---

## Testing

Run the test suite to verify merge logic:

```typescript
import { runAllTests } from '../utils/medication-merge.test';

runAllTests();
```

Tests cover:
- ✅ Basic merging without duplicates
- ✅ Exact duplicate detection
- ✅ Alias detection and merging
- ✅ Typo/similarity detection
- ✅ User-added medication preservation
- ✅ User-added medication enrichment
- ✅ Complex merge scenarios
- ✅ Search functionality
- ✅ Adding user medications

---

## Storage

- **Location:** `localStorage` key: `symptomap_medication_library`
- **Format:** JSON array of `MedicationEntry` objects
- **Persistence:** Automatically saved on any change
- **Initialization:** Loads from localStorage or falls back to predefined library

---

## Safety Features

### Duplicate Prevention
The merge algorithm prevents:
- ❌ Adding the same medication twice
- ❌ Losing user-added entries
- ❌ Overwriting user data

### Data Preservation
The system guarantees:
- ✅ All existing medications are preserved
- ✅ User-added entries are never deleted
- ✅ Custom entries can be enriched but not removed

### Conflict Resolution
When conflicts occur:
- **Existing data takes priority** for populated fields
- **New data fills in missing fields**
- **Names are normalized** for comparison
- **Similar names are merged** with aliases

---

## Categories in Predefined Library

The current library includes:

1. **Biologic therapy**
   - CD20 monoclonal antibodies (Rituximab, Ocrelizumab, Ofatumumab, Inebilizumab)
   - IL-6 receptor antagonists (Tocilizumab, Satralizumab)
   - Complement inhibitors (Eculizumab, Ravulizumab)
   - TNF inhibitors (Adalimumab, Infliximab, Etanercept)
   - Others (Belimumab, Natalizumab, Alemtuzumab)

2. **Immunosuppressant**
   - DMARDs (Azathioprine, Mycophenolate, Methotrexate, etc.)
   - Calcineurin inhibitors (Tacrolimus, Cyclosporine)
   - Alkylating agents (Cyclophosphamide, Mitoxantrone)
   - MS-specific (Cladribine)

3. **Corticosteroid**
   - Oral steroids (Prednisone, Prednisolone)
   - Injectable steroids (Methylprednisolone, Dexamethasone, Hydrocortisone)

4. **Immunoglobulin therapy**
   - IVIG (Intravenous Immunoglobulin)
   - SCIG (Subcutaneous Immunoglobulin)

5. **Immunomodulator**
   - MS disease-modifying therapies
   - S1P receptor modulators (Fingolimod, Siponimod, Ozanimod, Ponesimod)
   - Fumarates (Dimethyl Fumarate)
   - Interferons (Beta-1a, Beta-1b, Peginterferon Beta-1a)
   - Others (Teriflunomide, Glatiramer Acetate)

6. **Symptom management**
   - Neuropathic pain (Gabapentin, Pregabalin, Amitriptyline, Nortriptyline, Duloxetine, Venlafaxine)
   - Muscle relaxants (Baclofen, Tizanidine, Diazepam)
   - Fatigue support (Amantadine, Modafinil)
   - Bladder control (Oxybutynin, Tolterodine)
   - Walking/mobility (Fampridine)
   - Seizure/neuralgia (Carbamazepine, Oxcarbazepine)
   - Anxiety/sleep (Clonazepam)

7. **Therapeutic procedure**
   - Plasma Exchange (Plasmapheresis)

---

## Future Enhancements

Potential improvements:

- [ ] Drug interaction warnings
- [ ] Dosage recommendations by condition
- [ ] Side effect information
- [ ] Cost/insurance coverage data
- [ ] Generic/brand equivalency mapping
- [ ] FDA approval status
- [ ] Clinical trial information
- [ ] Multi-language support
- [ ] Export to PDF for doctor visits

---

## Maintenance Guidelines

### When Adding New Medications:

1. **Use consistent naming**
   - Prefer generic names as canonical
   - Add brand names as aliases

2. **Include comprehensive aliases**
   - Brand names
   - Common misspellings
   - International names

3. **Provide detailed metadata**
   - Category and subcategory
   - Mechanism of action
   - Common use labels
   - Search terms

4. **Test thoroughly**
   - Run merge tests
   - Verify search results
   - Check for unintended duplicates

### Quality Checklist:

- [ ] Name is spelled correctly
- [ ] All known aliases included
- [ ] Category accurately reflects drug class
- [ ] Common use labels are patient-friendly
- [ ] Search terms cover likely user queries
- [ ] No duplicates in predefined library
- [ ] JSON syntax is valid

---

## Troubleshooting

### Problem: Medication appears twice

**Solution:** Check if names are slightly different (capitalization, spacing, extra characters). The merge algorithm should catch these, but if not:
1. Export library
2. Manually merge duplicates in JSON
3. Re-import

### Problem: User medication not showing up

**Solution:** Check localStorage:
```javascript
const library = JSON.parse(localStorage.getItem('symptomap_medication_library'));
console.log(library);
```

### Problem: Search not finding medication

**Solution:** Verify search terms and aliases are comprehensive. Consider adding common misspellings or alternate names.

### Problem: Library reset after update

**Solution:** The merge algorithm should preserve existing data. If reset occurs:
1. Check browser console for errors
2. Verify localStorage permissions
3. Ensure JSON syntax is valid

---

## Contact & Support

For questions, improvements, or bug reports related to the medication library system, please contact the development team or file an issue in the project repository.

---

**Last Updated:** March 2026
**Version:** 1.0
**Maintainer:** SymptomMap Development Team
