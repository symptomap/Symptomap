export const medicalConditions = [
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

  // === ADDITIONAL MEDICAL CONDITIONS (Non-autoimmune & General) ===

  // Cardiovascular
  { value: "hypertension", label: "Hypertension" },
  { value: "coronary-artery-disease", label: "Coronary artery disease" },
  { value: "heart-failure", label: "Heart failure" },
  { value: "arrhythmia", label: "Arrhythmia" },
  { value: "pots", label: "POTS (Postural Orthostatic Tachycardia Syndrome)" },

  // Respiratory
  { value: "asthma", label: "Asthma" },
  { value: "copd", label: "COPD" },
  { value: "chronic-bronchitis", label: "Chronic bronchitis" },
  { value: "sleep-apnea", label: "Sleep apnea" },

  // Gastrointestinal (non-autoimmune)
  { value: "irritable-bowel-syndrome", label: "Irritable Bowel Syndrome (IBS)" },
  { value: "gastritis", label: "Gastritis" },
  { value: "peptic-ulcer-disease", label: "Peptic ulcer disease" },
  { value: "gerd", label: "Acid reflux (GERD)" },

  // Metabolic
  { value: "type-2-diabetes", label: "Type 2 Diabetes" },
  { value: "obesity", label: "Obesity" },
  { value: "metabolic-syndrome", label: "Metabolic syndrome" },

  // Neurological (non-autoimmune)
  { value: "migraine", label: "Migraine" },
  { value: "epilepsy-non-autoimmune", label: "Epilepsy (non-autoimmune)" },
  { value: "peripheral-neuropathy", label: "Peripheral neuropathy" },

  // Psychiatric
  { value: "anxiety-disorder", label: "Anxiety disorder" },
  { value: "depression", label: "Depression" },
  { value: "bipolar-disorder", label: "Bipolar disorder" },
  { value: "adhd", label: "ADHD" },

  // Endocrine (non-autoimmune)
  { value: "thyroid-nodules", label: "Thyroid nodules" },
  { value: "pcos", label: "Polycystic Ovary Syndrome (PCOS)" },

  // Hematologic
  { value: "iron-deficiency-anemia", label: "Iron deficiency anemia" },
  { value: "clotting-disorders", label: "Clotting disorders" },

  // Dermatologic (non-autoimmune)
  { value: "eczema", label: "Eczema" },
  { value: "acne", label: "Acne" },

  // Other
  { value: "chronic-fatigue-syndrome", label: "Chronic fatigue syndrome" },
  { value: "fibromyalgia", label: "Fibromyalgia" },
  { value: "long-covid", label: "Long COVID" },
];