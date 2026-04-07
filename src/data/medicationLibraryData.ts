import type { MedicationEntry } from '../utils/medication-merge';

export const medicationLibraryData: MedicationEntry[] = [
  // B-cell targeting biologics
  {
    name: "Rituximab",
    aliases: ["Rituxan"],
    category: "Biologic therapy",
    search_terms: ["biologic", "infusion", "MS", "NMOSD", "MOGAD"]
  },
  {
    name: "Ocrelizumab",
    aliases: ["Ocrevus"],
    category: "Biologic therapy",
    search_terms: ["biologic", "infusion", "MS"]
  },
  {
    name: "Ofatumumab",
    aliases: ["Kesimpta"],
    category: "Biologic therapy",
    search_terms: ["biologic", "injection", "MS"]
  },
  {
    name: "Natalizumab",
    aliases: ["Tysabri"],
    category: "Biologic therapy",
    search_terms: ["biologic", "infusion", "MS"]
  },
  
  // Other biologics
  {
    name: "Tocilizumab",
    aliases: ["Actemra"],
    category: "Biologic therapy",
    search_terms: ["biologic", "infusion", "IL-6"]
  },
  {
    name: "Belimumab",
    aliases: ["Benlysta"],
    category: "Biologic therapy",
    search_terms: ["biologic", "infusion", "lupus"]
  },
  {
    name: "Eculizumab",
    aliases: ["Soliris"],
    category: "Biologic therapy",
    search_terms: ["biologic", "infusion", "NMOSD"]
  },
  {
    name: "Inebilizumab",
    aliases: ["Uplizna"],
    category: "Biologic therapy",
    search_terms: ["biologic", "infusion", "NMOSD"]
  },
  {
    name: "Satralizumab",
    aliases: ["Enspryng"],
    category: "Biologic therapy",
    search_terms: ["biologic", "injection", "NMOSD"]
  },
  {
    name: "Adalimumab",
    aliases: ["Humira"],
    category: "Biologic therapy",
    search_terms: ["biologic", "injection", "TNF"]
  },
  {
    name: "Etanercept",
    aliases: ["Enbrel"],
    category: "Biologic therapy",
    search_terms: ["biologic", "injection", "TNF"]
  },
  {
    name: "Infliximab",
    aliases: ["Remicade"],
    category: "Biologic therapy",
    search_terms: ["biologic", "infusion", "TNF"]
  },
  {
    name: "Ustekinumab",
    aliases: ["Stelara"],
    category: "Biologic therapy",
    search_terms: ["biologic", "injection", "IL-12", "IL-23"]
  },
  {
    name: "Secukinumab",
    aliases: ["Cosentyx"],
    category: "Biologic therapy",
    search_terms: ["biologic", "injection", "IL-17"]
  },
  
  // Corticosteroids
  {
    name: "Prednisone",
    aliases: ["Deltasone"],
    category: "Corticosteroid",
    search_terms: ["steroid", "pill", "oral"]
  },
  {
    name: "Prednisolone",
    aliases: ["Prelone"],
    category: "Corticosteroid",
    search_terms: ["steroid", "pill", "oral"]
  },
  {
    name: "Methylprednisolone",
    aliases: ["Medrol"],
    category: "Corticosteroid",
    search_terms: ["steroid", "infusion", "injection", "pill"]
  },
  {
    name: "Dexamethasone",
    aliases: ["Decadron"],
    category: "Corticosteroid",
    search_terms: ["steroid", "pill", "injection"]
  },
  {
    name: "Hydrocortisone",
    aliases: ["Cortef"],
    category: "Corticosteroid",
    search_terms: ["steroid", "pill"]
  },
  
  // Immunosuppressants - DMARDs
  {
    name: "Azathioprine",
    aliases: ["Imuran"],
    category: "Immunosuppressant",
    search_terms: ["immunosuppressant", "pill", "DMARD"]
  },
  {
    name: "Mycophenolate Mofetil",
    aliases: ["CellCept"],
    category: "Immunosuppressant",
    search_terms: ["immunosuppressant", "pill", "DMARD"]
  },
  {
    name: "Methotrexate",
    aliases: ["Trexall"],
    category: "Immunosuppressant",
    search_terms: ["immunosuppressant", "pill", "injection", "DMARD"]
  },
  {
    name: "Cyclophosphamide",
    aliases: ["Cytoxan"],
    category: "Immunosuppressant",
    search_terms: ["immunosuppressant", "infusion"]
  },
  {
    name: "Tacrolimus",
    aliases: ["Prograf"],
    category: "Immunosuppressant",
    search_terms: ["immunosuppressant", "pill"]
  },
  {
    name: "Cyclosporine",
    aliases: ["Neoral"],
    category: "Immunosuppressant",
    search_terms: ["immunosuppressant", "pill"]
  },
  {
    name: "Leflunomide",
    aliases: ["Arava"],
    category: "Immunosuppressant",
    search_terms: ["immunosuppressant", "pill", "DMARD"]
  },
  {
    name: "Sulfasalazine",
    aliases: ["Azulfidine"],
    category: "Immunosuppressant",
    search_terms: ["immunosuppressant", "pill", "DMARD"]
  },
  {
    name: "Hydroxychloroquine",
    aliases: ["Plaquenil"],
    category: "Immunosuppressant",
    search_terms: ["immunosuppressant", "pill", "lupus"]
  },
  
  // JAK Inhibitors
  {
    name: "Tofacitinib",
    aliases: ["Xeljanz"],
    category: "Immunosuppressant",
    search_terms: ["JAK inhibitor", "pill"]
  },
  {
    name: "Baricitinib",
    aliases: ["Olumiant"],
    category: "Immunosuppressant",
    search_terms: ["JAK inhibitor", "pill"]
  },
  {
    name: "Upadacitinib",
    aliases: ["Rinvoq"],
    category: "Immunosuppressant",
    search_terms: ["JAK inhibitor", "pill"]
  },
  
  // Immunoglobulins
  {
    name: "Intravenous Immunoglobulin",
    aliases: ["IVIG"],
    category: "Immunoglobulin therapy",
    search_terms: ["IVIG", "infusion", "immunoglobulin"]
  },
  {
    name: "Subcutaneous Immunoglobulin",
    aliases: ["SCIG"],
    category: "Immunoglobulin therapy",
    search_terms: ["SCIG", "injection", "immunoglobulin"]
  },
  
  // MS Disease-Modifying Therapies
  {
    name: "Fingolimod",
    aliases: ["Gilenya"],
    category: "Immunomodulator",
    search_terms: ["MS", "DMT", "pill"]
  },
  {
    name: "Siponimod",
    aliases: ["Mayzent"],
    category: "Immunomodulator",
    search_terms: ["MS", "DMT", "pill"]
  },
  {
    name: "Ozanimod",
    aliases: ["Zeposia"],
    category: "Immunomodulator",
    search_terms: ["MS", "DMT", "pill"]
  },
  {
    name: "Ponesimod",
    aliases: ["Ponvory"],
    category: "Immunomodulator",
    search_terms: ["MS", "DMT", "pill"]
  },
  {
    name: "Dimethyl Fumarate",
    aliases: ["Tecfidera"],
    category: "Immunomodulator",
    search_terms: ["MS", "DMT", "pill"]
  },
  {
    name: "Diroximel Fumarate",
    aliases: ["Vumerity"],
    category: "Immunomodulator",
    search_terms: ["MS", "DMT", "pill"]
  },
  {
    name: "Monomethyl Fumarate",
    aliases: ["Bafiertam"],
    category: "Immunomodulator",
    search_terms: ["MS", "DMT", "pill"]
  },
  {
    name: "Teriflunomide",
    aliases: ["Aubagio"],
    category: "Immunomodulator",
    search_terms: ["MS", "DMT", "pill"]
  },
  {
    name: "Glatiramer Acetate",
    aliases: ["Copaxone"],
    category: "Immunomodulator",
    search_terms: ["MS", "DMT", "injection"]
  },
  {
    name: "Interferon Beta-1a",
    aliases: ["Avonex", "Rebif"],
    category: "Immunomodulator",
    search_terms: ["MS", "DMT", "injection"]
  },
  {
    name: "Interferon Beta-1b",
    aliases: ["Betaseron"],
    category: "Immunomodulator",
    search_terms: ["MS", "DMT", "injection"]
  },
  {
    name: "Peginterferon Beta-1a",
    aliases: ["Plegridy"],
    category: "Immunomodulator",
    search_terms: ["MS", "DMT", "injection"]
  },
  {
    name: "Cladribine",
    aliases: ["Mavenclad"],
    category: "Immunomodulator",
    search_terms: ["MS", "DMT", "pill"]
  },
  {
    name: "Alemtuzumab",
    aliases: ["Lemtrada"],
    category: "Immunomodulator",
    search_terms: ["MS", "DMT", "infusion"]
  },
  
  // Neuropathic Pain - Tricyclics
  {
    name: "Amitriptyline",
    aliases: ["Elavil"],
    category: "Symptom management",
    search_terms: ["pain", "sleep", "neuropathy", "headache"]
  },
  {
    name: "Nortriptyline",
    aliases: ["Pamelor"],
    category: "Symptom management",
    search_terms: ["pain", "neuropathy", "headache"]
  },
  {
    name: "Desipramine",
    aliases: ["Norpramin"],
    category: "Symptom management",
    search_terms: ["pain", "neuropathy"]
  },
  {
    name: "Imipramine",
    aliases: ["Tofranil"],
    category: "Symptom management",
    search_terms: ["pain", "neuropathy"]
  },
  
  // Neuropathic Pain - GABA analogues
  {
    name: "Gabapentin",
    aliases: ["Neurontin"],
    category: "Symptom management",
    search_terms: ["pain", "neuropathy", "nerve"]
  },
  {
    name: "Pregabalin",
    aliases: ["Lyrica"],
    category: "Symptom management",
    search_terms: ["pain", "neuropathy", "nerve", "anxiety"]
  },
  
  // Neuropathic Pain - SNRIs
  {
    name: "Duloxetine",
    aliases: ["Cymbalta"],
    category: "Symptom management",
    search_terms: ["pain", "neuropathy", "depression", "anxiety"]
  },
  {
    name: "Venlafaxine",
    aliases: ["Effexor"],
    category: "Symptom management",
    search_terms: ["pain", "depression", "anxiety"]
  },
  {
    name: "Desvenlafaxine",
    aliases: ["Pristiq"],
    category: "Symptom management",
    search_terms: ["pain", "depression"]
  },
  {
    name: "Milnacipran",
    aliases: ["Savella"],
    category: "Symptom management",
    search_terms: ["pain", "fibromyalgia"]
  },
  
  // Muscle Relaxants / Spasticity
  {
    name: "Baclofen",
    aliases: ["Lioresal"],
    category: "Symptom management",
    search_terms: ["muscle", "spasm", "spasticity"]
  },
  {
    name: "Tizanidine",
    aliases: ["Zanaflex"],
    category: "Symptom management",
    search_terms: ["muscle", "spasm", "spasticity"]
  },
  {
    name: "Cyclobenzaprine",
    aliases: ["Flexeril"],
    category: "Symptom management",
    search_terms: ["muscle", "spasm"]
  },
  {
    name: "Methocarbamol",
    aliases: ["Robaxin"],
    category: "Symptom management",
    search_terms: ["muscle", "spasm"]
  },
  {
    name: "Dantrolene",
    aliases: ["Dantrium"],
    category: "Symptom management",
    search_terms: ["muscle", "spasticity"]
  },
  
  // Antidepressants - SSRIs
  {
    name: "Sertraline",
    aliases: ["Zoloft"],
    category: "Symptom management",
    search_terms: ["depression", "anxiety", "mood"]
  },
  {
    name: "Escitalopram",
    aliases: ["Lexapro"],
    category: "Symptom management",
    search_terms: ["depression", "anxiety", "mood"]
  },
  {
    name: "Fluoxetine",
    aliases: ["Prozac"],
    category: "Symptom management",
    search_terms: ["depression", "anxiety", "mood"]
  },
  {
    name: "Paroxetine",
    aliases: ["Paxil"],
    category: "Symptom management",
    search_terms: ["depression", "anxiety", "mood"]
  },
  {
    name: "Citalopram",
    aliases: ["Celexa"],
    category: "Symptom management",
    search_terms: ["depression", "anxiety", "mood"]
  },
  
  // Antidepressants - Other
  {
    name: "Bupropion",
    aliases: ["Wellbutrin"],
    category: "Symptom management",
    search_terms: ["depression", "fatigue", "smoking cessation"]
  },
  {
    name: "Mirtazapine",
    aliases: ["Remeron"],
    category: "Symptom management",
    search_terms: ["depression", "sleep", "appetite"]
  },
  {
    name: "Trazodone",
    aliases: ["Desyrel"],
    category: "Symptom management",
    search_terms: ["depression", "sleep"]
  },
  
  // Anxiolytics / Benzodiazepines
  {
    name: "Clonazepam",
    aliases: ["Klonopin"],
    category: "Symptom management",
    search_terms: ["anxiety", "sleep", "seizure"]
  },
  {
    name: "Lorazepam",
    aliases: ["Ativan"],
    category: "Symptom management",
    search_terms: ["anxiety", "sleep"]
  },
  {
    name: "Diazepam",
    aliases: ["Valium"],
    category: "Symptom management",
    search_terms: ["anxiety", "muscle", "spasm"]
  },
  {
    name: "Alprazolam",
    aliases: ["Xanax"],
    category: "Symptom management",
    search_terms: ["anxiety", "panic"]
  },
  
  // Seizure Medications
  {
    name: "Levetiracetam",
    aliases: ["Keppra"],
    category: "Symptom management",
    search_terms: ["seizure", "epilepsy"]
  },
  {
    name: "Lamotrigine",
    aliases: ["Lamictal"],
    category: "Symptom management",
    search_terms: ["seizure", "epilepsy", "mood"]
  },
  {
    name: "Carbamazepine",
    aliases: ["Tegretol"],
    category: "Symptom management",
    search_terms: ["seizure", "epilepsy", "pain"]
  },
  {
    name: "Oxcarbazepine",
    aliases: ["Trileptal"],
    category: "Symptom management",
    search_terms: ["seizure", "epilepsy", "pain"]
  },
  {
    name: "Valproic Acid",
    aliases: ["Depakote"],
    category: "Symptom management",
    search_terms: ["seizure", "epilepsy", "migraine", "mood"]
  },
  {
    name: "Topiramate",
    aliases: ["Topamax"],
    category: "Symptom management",
    search_terms: ["seizure", "epilepsy", "migraine"]
  },
  {
    name: "Zonisamide",
    aliases: ["Zonegran"],
    category: "Symptom management",
    search_terms: ["seizure", "epilepsy"]
  },
  {
    name: "Phenytoin",
    aliases: ["Dilantin"],
    category: "Symptom management",
    search_terms: ["seizure", "epilepsy"]
  },
  
  // Migraine Treatments
  {
    name: "Sumatriptan",
    aliases: ["Imitrex"],
    category: "Symptom management",
    search_terms: ["migraine", "headache"]
  },
  {
    name: "Rizatriptan",
    aliases: ["Maxalt"],
    category: "Symptom management",
    search_terms: ["migraine", "headache"]
  },
  {
    name: "Eletriptan",
    aliases: ["Relpax"],
    category: "Symptom management",
    search_terms: ["migraine", "headache"]
  },
  {
    name: "Erenumab",
    aliases: ["Aimovig"],
    category: "Symptom management",
    search_terms: ["migraine", "prevention"]
  },
  {
    name: "Fremanezumab",
    aliases: ["Ajovy"],
    category: "Symptom management",
    search_terms: ["migraine", "prevention"]
  },
  {
    name: "Galcanezumab",
    aliases: ["Emgality"],
    category: "Symptom management",
    search_terms: ["migraine", "prevention"]
  },
  {
    name: "Rimegepant",
    aliases: ["Nurtec"],
    category: "Symptom management",
    search_terms: ["migraine", "headache"]
  },
  {
    name: "Ubrogepant",
    aliases: ["Ubrelvy"],
    category: "Symptom management",
    search_terms: ["migraine", "headache"]
  },
  
  // Fatigue
  {
    name: "Modafinil",
    aliases: ["Provigil"],
    category: "Symptom management",
    search_terms: ["fatigue", "energy", "wakefulness"]
  },
  {
    name: "Armodafinil",
    aliases: ["Nuvigil"],
    category: "Symptom management",
    search_terms: ["fatigue", "energy", "wakefulness"]
  },
  {
    name: "Amantadine",
    aliases: ["Symmetrel"],
    category: "Symptom management",
    search_terms: ["fatigue", "energy"]
  },
  {
    name: "Methylphenidate",
    aliases: ["Ritalin"],
    category: "Symptom management",
    search_terms: ["fatigue", "focus", "ADHD"]
  },
  {
    name: "Amphetamine-Dextroamphetamine",
    aliases: ["Adderall"],
    category: "Symptom management",
    search_terms: ["fatigue", "focus", "ADHD"]
  },
  
  // Bladder
  {
    name: "Oxybutynin",
    aliases: ["Ditropan"],
    category: "Symptom management",
    search_terms: ["bladder", "urinary", "incontinence"]
  },
  {
    name: "Tolterodine",
    aliases: ["Detrol"],
    category: "Symptom management",
    search_terms: ["bladder", "urinary", "incontinence"]
  },
  {
    name: "Solifenacin",
    aliases: ["Vesicare"],
    category: "Symptom management",
    search_terms: ["bladder", "urinary", "incontinence"]
  },
  {
    name: "Mirabegron",
    aliases: ["Myrbetriq"],
    category: "Symptom management",
    search_terms: ["bladder", "urinary", "incontinence"]
  },
  
  // Sleep
  {
    name: "Zolpidem",
    aliases: ["Ambien"],
    category: "Symptom management",
    search_terms: ["sleep", "insomnia"]
  },
  {
    name: "Eszopiclone",
    aliases: ["Lunesta"],
    category: "Symptom management",
    search_terms: ["sleep", "insomnia"]
  },
  {
    name: "Melatonin",
    aliases: [],
    category: "Symptom management",
    search_terms: ["sleep", "insomnia"]
  },
  
  // Pain - Opioids
  {
    name: "Tramadol",
    aliases: ["Ultram"],
    category: "Symptom management",
    search_terms: ["pain"]
  },
  {
    name: "Hydrocodone-Acetaminophen",
    aliases: ["Norco", "Vicodin"],
    category: "Symptom management",
    search_terms: ["pain"]
  },
  {
    name: "Oxycodone",
    aliases: ["OxyContin"],
    category: "Symptom management",
    search_terms: ["pain"]
  },
  
  // Pain - NSAIDs
  {
    name: "Ibuprofen",
    aliases: ["Advil", "Motrin"],
    category: "Symptom management",
    search_terms: ["pain", "inflammation"]
  },
  {
    name: "Naproxen",
    aliases: ["Aleve", "Naprosyn"],
    category: "Symptom management",
    search_terms: ["pain", "inflammation"]
  },
  {
    name: "Celecoxib",
    aliases: ["Celebrex"],
    category: "Symptom management",
    search_terms: ["pain", "inflammation"]
  },
  {
    name: "Meloxicam",
    aliases: ["Mobic"],
    category: "Symptom management",
    search_terms: ["pain", "inflammation"]
  },
  {
    name: "Diclofenac",
    aliases: ["Voltaren"],
    category: "Symptom management",
    search_terms: ["pain", "inflammation"]
  },
  
  // Cognitive Support
  {
    name: "Donepezil",
    aliases: ["Aricept"],
    category: "Symptom management",
    search_terms: ["cognitive", "memory"]
  },
  {
    name: "Memantine",
    aliases: ["Namenda"],
    category: "Symptom management",
    search_terms: ["cognitive", "memory"]
  },
  {
    name: "Rivastigmine",
    aliases: ["Exelon"],
    category: "Symptom management",
    search_terms: ["cognitive", "memory"]
  },
  
  // Vertigo/Dizziness
  {
    name: "Meclizine",
    aliases: ["Antivert"],
    category: "Symptom management",
    search_terms: ["vertigo", "dizziness", "nausea"]
  },
  {
    name: "Scopolamine",
    aliases: ["Transderm Scop"],
    category: "Symptom management",
    search_terms: ["vertigo", "dizziness", "nausea"]
  },
  
  // Other symptom management
  {
    name: "Dalfampridine",
    aliases: ["Ampyra"],
    category: "Symptom management",
    search_terms: ["walking", "mobility", "MS"]
  },
  {
    name: "Fampridine",
    aliases: ["Fampyra"],
    category: "Symptom management",
    search_terms: ["walking", "mobility", "MS"]
  },
  {
    name: "Desmopressin",
    aliases: ["DDAVP"],
    category: "Symptom management",
    search_terms: ["bladder", "urinary", "nocturia"]
  },
  
  // Plasma Exchange
  {
    name: "Plasma Exchange",
    aliases: ["PLEX", "Plasmapheresis"],
    category: "Therapeutic procedure",
    search_terms: ["plasma", "exchange", "apheresis"]
  },
  
  // Cannabinoids
  {
    name: "Cannabidiol",
    aliases: ["CBD"],
    category: "Symptom management",
    search_terms: ["pain", "anxiety", "sleep", "cannabis"]
  },
  {
    name: "Dronabinol",
    aliases: ["Marinol"],
    category: "Symptom management",
    search_terms: ["pain", "nausea", "appetite", "cannabis"]
  },
  {
    name: "Nabilone",
    aliases: ["Cesamet"],
    category: "Symptom management",
    search_terms: ["pain", "nausea", "cannabis"]
  },
  
  // Vitamins/Supplements (commonly prescribed)
  {
    name: "Vitamin D",
    aliases: ["Cholecalciferol"],
    category: "Symptom management",
    search_terms: ["vitamin", "supplement", "bone health"]
  },
  {
    name: "Vitamin B12",
    aliases: ["Cobalamin", "Cyanocobalamin"],
    category: "Symptom management",
    search_terms: ["vitamin", "supplement", "nerve"]
  },
  {
    name: "Folic Acid",
    aliases: ["Folate"],
    category: "Symptom management",
    search_terms: ["vitamin", "supplement"]
  },
  {
    name: "Biotin",
    aliases: ["Vitamin B7"],
    category: "Symptom management",
    search_terms: ["vitamin", "supplement", "MS"]
  }
];
