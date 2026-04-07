Design the first screen of a digital health platform called “Symptomap”, used for tracking neuroinflammatory diseases such as MOGAD, NMOSD, and Multiple Sclerosis.

Create a high-fidelity Step 1 screen for patient onboarding.

⸻

GENERAL DESIGN
	•	Clean modern medical interface
	•	Soft blue, orange, white, purple and neutral colors
	•	Rounded input fields
	•	Accessible typography
	•	Mobile-first layout
	•	Calm, trustworthy healthcare style
	•	Clear spacing and visual hierarchy

Header

Platform name: Symptomap

Subtitle:
Your personal health tracking companion

Progress indicator:
Step 1 of 4

⸻

SECTION: Personal Information

Title: Basic Information

Fields

First Name
Text input with active focus state

Last Name
Text input with active focus state

Date of Birth
Calendar date picker only

Gender
Dropdown selector

⸻

SECTION: Location

Country
Dropdown selector

City
Searchable input with suggestions

⸻

SECTION: Medical Information

Primary Diagnosis

Searchable dropdown with AI autocomplete

Controlled disease dataset:

MOGAD
NMOSD
Multiple Sclerosis
ADEM
CIDP
Lupus
Vasculitis
Sarcoidosis
Autoimmune Encephalitis

Directly under this field add:

Diagnosis Date
Calendar date picker

⸻

Additional Conditions (Optional)

Multi-select searchable dropdown

Selected items appear as removable tags

Example tags:

Asthma
Thyroid disorder
Migraine
Diabetes
Hypertension

⸻

SECTION: Attack Diagnosis Dates

Users can add multiple attack entries.

Input field placeholder:

“Type date or attack name (e.g. First attack – 02/02/2023)”

Each added attack appears as a tag card:

Example:

First attack diagnosis
Feb 2, 2023

Second attack
Oct 5, 2023

Third attack
Aug 16, 2024

Include an Add button to add new attacks.

⸻

SECTION: Doctor Appointment Dates

Input field:

“Type date for appointment (e.g. 15/03/2026)”

Users can add multiple appointment dates.

Added appointments appear as tags.

⸻

SECTION: Contact Information

Email (optional)

Small helper text:

“We will use this to send updates and reminders.”

⸻

SECTION: Consent

Required checkbox:

“I consent to the secure storage of my personal and health information for symptom tracking purposes.”

Include a Privacy Policy link.

⸻

Navigation

Primary button

Continue to Step 2

Secondary button

Save as Draft

⸻

UX REQUIREMENTS
	•	All date fields must use calendar pickers
	•	Diagnosis inputs must use autocomplete suggestions
	•	Selected items appear as tags
	•	Multiple attacks can be added
	•	Multiple appointments can be added
	•	Clear validation for required fields
	•	High-fidelity UI ready for developer handoff