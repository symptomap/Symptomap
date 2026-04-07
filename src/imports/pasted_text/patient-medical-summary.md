Replace the “Summary Overview” section with a structured, dynamic “Patient Story” and medical summary generated from user-entered data across all previous steps.

Goal:
Transform all collected data (diagnosis, symptoms, treatments, timelines) into a clear, structured, clinically meaningful narrative.

Requirements:

1. Patient Story (Top Section)
Generate a readable clinical narrative using user data:

Example structure:
“This patient was diagnosed with [Primary Diagnosis] on [Date]. The patient also has [Additional Conditions].

The patient is currently receiving [treatments] for the primary diagnosis, along with additional symptomatic treatments.”

This section should be automatically generated from:
- Diagnosis data
- Dates
- Treatments

---

2. Diagnoses Section
Display structured:

Primary Diagnosis:
- Name + diagnosis date

Additional Conditions:
- List all comorbidities

---

3. Attack History
Show:
- First attack date
- Any symptoms occurring before attack (if available)
- Timeline relationship (before / after attack)

---

4. Treatment Overview (Prioritise Primary Diagnosis)
List treatments in this order:
1. Treatments for primary diagnosis
2. Symptomatic treatments

Each treatment should include:
- Name
- Start date
- Frequency
- Patient-reported effectiveness
- Reported effect (if available)

---

5. Symptom–Treatment Mapping
For each symptom:
- Severity
- Pattern
- First noticed date
- Impact
- Triggers

Then map treatments:

Example:
Headache
→ Amitriptyline → effectiveness 9/10  
→ Baclofen → effectiveness 8/10

---

6. Data Integration
All sections must dynamically pull from:
- Symptom Mapping step
- Treatment step
- Diagnosis step

No hardcoded or placeholder text allowed.

If data is missing:
- Hide the section OR
- Display a soft fallback (not “Not specified”)

---

7. Tone & Style
- Clinical but human
- Clear, structured, readable
- Suitable for doctor review
- No casual or startup-style language

---

8. Output Purpose
This page should function as:
→ A real medical summary
→ A report-ready structure (for PDF export)

The user should feel:
“This is my medical report.”