You are responsible for powering the medication autocomplete system for a health platform used by patients with autoimmune, neuroimmune, neurological, psychiatric, and chronic symptom conditions.

Your task is to ensure that the autocomplete ALWAYS searches against a full structured medication library first.

The system must NOT behave like a generic AI text suggestion tool.
It must behave like a real medication search and autocomplete engine.

--------------------------------------------------
PRIMARY OBJECTIVE
--------------------------------------------------

Build and use a COMPLETE medication autocomplete dataset so that users can find all relevant medications they may already be taking.

This includes:
- autoimmune medications
- immunosuppressants
- corticosteroids
- biologics
- immunomodulators
- immunoglobulins
- neuropsychiatric medications
- neuropathic pain medications
- GABA-related medications
- muscle relaxants
- symptom-management medications
- newer immune therapies
- user-added custom medications

--------------------------------------------------
CRITICAL AUTOCOMPLETE RULES
--------------------------------------------------

1. ALWAYS search the medication library first
2. NEVER rely only on freeform AI generation
3. NEVER return unrelated medications when there is a clear prefix match
4. If the user types "ami", prioritize:
   - Amitriptyline
   - Amisulpride
   - other valid "ami..." matches
5. Do NOT suggest irrelevant drugs if better prefix matches exist
6. Exact match > prefix match > alias match > typo/fuzzy match > semantic fallback

--------------------------------------------------
NON-DESTRUCTIVE DATA RULE
--------------------------------------------------

The medication library may already contain:
- previous medications
- manually added medications
- user-added custom entries
- existing autocomplete entries

You must EXTEND the library, not replace it.

Rules:
- NEVER delete existing medications
- NEVER remove user-added entries
- NEVER overwrite valid existing entries
- MERGE new medications into the existing dataset
- REMOVE duplicates only by merging them into a canonical record
- PRESERVE aliases and misspellings

--------------------------------------------------
MEDICATION COVERAGE REQUIREMENTS
--------------------------------------------------

The library must include a broad and clinically realistic set of medications commonly used in autoimmune and neuroimmune care.

Include at minimum these categories:

1. Immunosuppressants / DMARDs
- Azathioprine
- Mycophenolate mofetil
- Methotrexate
- Cyclophosphamide
- Tacrolimus
- Cyclosporine
- Leflunomide
- Sulfasalazine
- Hydroxychloroquine

2. Corticosteroids
- Prednisone
- Prednisolone
- Methylprednisolone
- Dexamethasone

3. Biologics / targeted therapies
- Rituximab
- Ocrelizumab
- Ofatumumab
- Tocilizumab
- Belimumab
- Eculizumab
- Inebilizumab
- Satralizumab

4. Immunomodulators / immunoglobulins
- Intravenous Immunoglobulin
- IVIG
- Subcutaneous Immunoglobulin
- SCIG

5. Neuropsychiatric / neuropathic pain medications
- Amitriptyline
- Nortriptyline
- Duloxetine
- Venlafaxine
- Gabapentin
- Pregabalin

6. GABA-related / CNS-active medications
- Baclofen
- Gabapentin
- Pregabalin
- Clonazepam
- Diazepam

7. Muscle relaxants / symptom-management
- Baclofen
- Tizanidine

8. Supportive / symptom-related medications
- sleep-support medications
- pain-management medications
- fatigue-support medications
- nerve-pain medications

9. Newer / emerging immune therapies
- monoclonal antibodies
- B-cell targeting therapies
- complement inhibitors
- plasma exchange as a treatment option entry if supported by the UI

--------------------------------------------------
DATA STRUCTURE
--------------------------------------------------

Each medication entry must be stored in a structured format such as:

{
  "name": "",
  "aliases": [],
  "misspellings": [],
  "brand_names": [],
  "category": "",
  "subcategory": "",
  "common_use_labels": [],
  "search_terms": [],
  "source": "system | user_added | merged"
}

Example:

{
  "name": "Amitriptyline",
  "aliases": [],
  "misspellings": ["amitraptyline", "amitriptylin", "amitryptiline"],
  "brand_names": [],
  "category": "Symptom management",
  "subcategory": "Neuropathic pain / sleep support",
  "common_use_labels": ["sleep support", "nerve pain", "headache support"],
  "search_terms": ["sleep", "pain", "neuropathy", "headache", "tricyclic"],
  "source": "system"
}

--------------------------------------------------
SEARCH BEHAVIOR
--------------------------------------------------

When the user types into autocomplete:

1. first search by exact name
2. then by prefix match
3. then by alias match
4. then by misspelling match
5. then by fuzzy match
6. only then use semantic fallback

Examples:
- "ami" should return Amitriptyline before unrelated results
- "bac" should return Baclofen
- "gaba" should return Gabapentin before weak semantic matches
- "ivig" should return IVIG / Intravenous Immunoglobulin
- "ritu" should return Rituximab

If a medication is in the library, it must be discoverable.

--------------------------------------------------
UI OUTPUT REQUIREMENTS
--------------------------------------------------

Autocomplete suggestions should display:

- medication name
- category
- optional short labels

Example:
Amitriptyline
Symptom management • Sleep support • Nerve pain

Azathioprine
Immunosuppressant • Immune suppression

IVIG
Immunoglobulin therapy • Immune support

--------------------------------------------------
NO DELETION / NO REGRESSION
--------------------------------------------------

If a new medication list is added:
- keep old items
- merge new ones
- enrich existing records
- never reduce the total usable library
- never remove custom user entries

--------------------------------------------------
FAILURE PREVENTION
--------------------------------------------------

Do NOT return:
- empty autocomplete when the library contains matches
- irrelevant suggestions when there are direct prefix matches
- only one suggestion if multiple valid matches exist
- AI-generated guesses instead of real medication entries

--------------------------------------------------
FINAL GOAL
--------------------------------------------------

Create and maintain a complete, non-destructive, searchable medication autocomplete system that:

- includes all relevant autoimmune, neuroimmune, neuropsychiatric, and immunotherapy medications
- preserves previous entries
- supports aliases, misspellings, and fuzzy matching
- returns correct results for real user typing
- prioritizes real medication-library matches over generic AI suggestions