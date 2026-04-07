import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Button } from "./ui/button";
import { DatePicker } from "./ui/date-picker";
import { Sparkles, X, Search, Pill, Heart, Leaf, Dumbbell, Activity, CheckCircle2, AlertCircle } from "lucide-react";
import { Logo } from "./Logo";
import { useMedicationLibrary } from "../../hooks/useMedicationLibrary";
import type { MedicationEntry } from "../../utils/medication-merge";

// Import diagnoses list for label lookup
const diagnoses = [
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
  { value: "ankylosing-spondylitis", label: "Ankylosing Spondylitis" },
  { value: "psoriatic-arthritis", label: "Psoriatic Arthritis" },
  { value: "reactive-arthritis", label: "Reactive Arthritis" },
  { value: "juvenile-idiopathic-arthritis", label: "Juvenile Idiopathic Arthritis" },
  { value: "adult-onset-stills-disease", label: "Adult-onset Still's Disease" },
  { value: "palindromic-rheumatism", label: "Palindromic Rheumatism" },
  { value: "crohns-disease", label: "Crohn's Disease" },
  { value: "ulcerative-colitis", label: "Ulcerative Colitis" },
  { value: "celiac-disease", label: "Celiac Disease" },
  { value: "autoimmune-hepatitis", label: "Autoimmune Hepatitis" },
  { value: "primary-biliary-cholangitis", label: "Primary Biliary Cholangitis (PBC)" },
  { value: "primary-sclerosing-cholangitis", label: "Primary Sclerosing Cholangitis (PSC)" },
  { value: "autoimmune-pancreatitis", label: "Autoimmune Pancreatitis" },
  { value: "pernicious-anemia", label: "Pernicious Anemia" },
  { value: "hashimotos-thyroiditis", label: "Hashimoto's Thyroiditis" },
  { value: "graves-disease", label: "Graves' Disease" },
  { value: "type-1-diabetes", label: "Type 1 Diabetes Mellitus" },
  { value: "addisons-disease", label: "Addison's Disease" },
  { value: "autoimmune-hypophysitis", label: "Autoimmune Hypophysitis" },
  { value: "autoimmune-polyglandular-syndrome", label: "Autoimmune Polyglandular Syndrome" },
  { value: "autoimmune-oophoritis", label: "Autoimmune Oophoritis" },
  { value: "autoimmune-orchitis", label: "Autoimmune Orchitis" },
  { value: "psoriasis", label: "Psoriasis" },
  { value: "vitiligo", label: "Vitiligo" },
  { value: "alopecia-areata", label: "Alopecia Areata" },
  { value: "bullous-pemphigoid", label: "Bullous Pemphigoid" },
  { value: "pemphigus-vulgaris", label: "Pemphigus Vulgaris" },
  { value: "dermatitis-herpetiformis", label: "Dermatitis Herpetiformis" },
  { value: "lichen-planus", label: "Lichen Planus" },
  { value: "morphea", label: "Morphea" },
];

// Treatment suggestions data - Comprehensive autoimmune-focused lists
const treatmentSuggestions = {
  medications: [
    // Biologics
    "Rituximab",
    "Ocrelizumab",
    "Adalimumab",
    "Infliximab",
    "Etanercept",
    "Natalizumab",
    "Tocilizumab",
    "Satralizumab",
    // Immunosuppressants
    "Azathioprine",
    "Mycophenolate",
    "Mycophenolate Mofetil",
    "Methotrexate",
    "Cyclophosphamide",
    "Cyclosporine",
    "Tacrolimus",
    // Corticosteroids
    "Prednisone",
    "Prednisolone",
    "Methylprednisolone",
    "Dexamethasone",
    "Hydrocortisone",
    // MS/Neuro-specific treatments
    "IVIG",
    "Intravenous Immunoglobulin",
    "Plasma Exchange",
    "Plasmapheresis",
    "Dimethyl Fumarate",
    "Fingolimod",
    "Teriflunomide",
    "Glatiramer Acetate",
    // Symptom management
    "Gabapentin",
    "Pregabalin",
    "Baclofen",
    "Tizanidine",
    "Amantadine",
    "Modafinil",
  ],
  therapies: [
    "Physical Therapy",
    "Occupational Therapy",
    "Speech Therapy",
    "Cognitive Behavioral Therapy",
    "Mindfulness Meditation",
    "Acupuncture",
    "Massage Therapy",
    "Hydrotherapy",
    "Vestibular Therapy",
    "Aquatic Therapy",
  ],
  supplements: [
    "Vitamin D",
    "Vitamin D3",
    "Vitamin B12",
    "Vitamin B Complex",
    "Vitamin B6",
    "Vitamin C",
    "Vitamin E",
    "Magnesium",
    "Omega-3",
    "Fish Oil",
    "Zinc",
    "Iron",
    "CoQ10",
    "Coenzyme Q10",
    "Alpha Lipoic Acid",
    "Biotin",
    "Selenium",
    "Turmeric/Curcumin",
    "Probiotics",
    "Calcium",
  ],
  lifestyle: [
    "Low-impact Exercise",
    "Yoga",
    "Swimming",
    "Walking Program",
    "Stress Management",
    "Sleep Hygiene",
    "Anti-inflammatory Diet",
    "Meditation Practice",
  ],
};

const treatmentCategories = [
  { id: "medications", label: "Medications", icon: Pill, color: "blue" },
  { id: "therapies", label: "Therapies", icon: Heart, color: "purple" },
  { id: "supplements", label: "Supplements", icon: Leaf, color: "green" },
  { id: "lifestyle", label: "Lifestyle", icon: Dumbbell, color: "orange" },
];

const frequencyOptions = [
  { id: "daily", label: "Daily" },
  { id: "twice-daily", label: "Twice Daily" },
  { id: "weekly", label: "Weekly" },
  { id: "bi-weekly", label: "Bi-weekly" },
  { id: "monthly", label: "Monthly" },
  { id: "as-needed", label: "As Needed" },
];

// Category-specific frequency options
const getFrequencyOptionsForCategory = (category: string) => {
  // For therapies and lifestyle: exclude "Twice Daily" and add "Every 3 Months"
  if (category === "therapies" || category === "lifestyle") {
    return [
      { id: "daily", label: "Daily" },
      { id: "weekly", label: "Weekly" },
      { id: "bi-weekly", label: "Bi-weekly" },
      { id: "monthly", label: "Monthly" },
      { id: "every-3-months", label: "Every 3 Months" },
      { id: "as-needed", label: "As Needed" },
    ];
  }
  
  // For medications and supplements: keep original options including "Twice Daily"
  return frequencyOptions;
};

interface TreatmentDetail {
  name: string;
  category: string;
  treatmentPurpose: "diagnosis" | "symptom" | "both";
  selectedSymptoms: string[];
  linkedDiagnoses?: string[]; // For medications only - stores diagnosis values
  linkedSymptoms?: string[]; // For medications only - stores symptom names
  dosage?: string;
  frequency: string;
  startDate: string;
  effectiveness: number;
  notes?: string;
}

export default function Step3() {
  const navigate = useNavigate();
  const { library, isLoaded, search, addMedication } = useMedicationLibrary();
  const [selectedCategory, setSelectedCategory] = useState<string>("medications");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedTreatments, setSelectedTreatments] = useState<TreatmentDetail[]>([]);
  const [editingTreatment, setEditingTreatment] = useState<string | null>(null);
  const [editingInSummary, setEditingInSummary] = useState<string | null>(null);
  const [tempEditData, setTempEditData] = useState<Partial<TreatmentDetail>>({});
  const [currentDetails, setCurrentDetails] = useState<Partial<TreatmentDetail>>({
    category: "medications",
    treatmentPurpose: "diagnosis",
    selectedSymptoms: [],
    linkedDiagnoses: [],
    linkedSymptoms: [],
    dosage: "",
    frequency: "",
    startDate: "",
    effectiveness: 5,
    notes: "",
  });
  const [showDosageSuggestions, setShowDosageSuggestions] = useState(false);
  const [dosageInput, setDosageInput] = useState("");
  const [showNotesSuggestions, setShowNotesSuggestions] = useState(false);
  const [showInlineNotesSuggestions, setShowInlineNotesSuggestions] = useState(false);

  // Load Step1 and Step2 data
  const [step1Data, setStep1Data] = useState<any>(null);
  const [step2Data, setStep2Data] = useState<any[]>([]);
  const [diagnosisLabel, setDiagnosisLabel] = useState<string>("");

  // Get filtered suggestions based on category and search query
  const getFilteredSuggestions = (): (MedicationEntry | { name: string; category?: string })[] => {
    if (selectedCategory === "medications") {
      // Use medication library for medications
      if (!searchQuery.trim()) {
        // Show popular medications when no search query
        return library.slice(0, 10).filter(
          (med) => !selectedTreatments.some((t) => t.name === med.name) && editingTreatment !== med.name
        );
      }
      
      // Search medication library
      const results = search(searchQuery, 20);
      return results.filter(
        (med) => !selectedTreatments.some((t) => t.name === med.name) && editingTreatment !== med.name
      );
    } else {
      // Use hardcoded lists for other categories
      const suggestions = treatmentSuggestions[selectedCategory as keyof typeof treatmentSuggestions] || [];
      return suggestions
        .filter((treatment) =>
          treatment.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !selectedTreatments.some((t) => t.name === treatment) &&
          editingTreatment !== treatment
        )
        .map(name => ({ name }));
    }
  };

  const filteredSuggestions = getFilteredSuggestions();

  // Scroll to top when component mounts and load Step1/Step2 data
  useEffect(() => {
    window.scrollTo(0, 0);

    // Load Step 1 data
    const savedStep1 = localStorage.getItem("symptomapStep1");
    if (savedStep1) {
      const parsedStep1 = JSON.parse(savedStep1);
      setStep1Data(parsedStep1);
      
      // Find diagnosis label from the diagnoses list
      const diagnosis = diagnoses.find(d => d.value === parsedStep1.primaryDiagnosis);
      setDiagnosisLabel(diagnosis?.label || parsedStep1.primaryDiagnosis || "");
    }

    // Load Step 2 data
    const savedStep2 = localStorage.getItem("symptomapStep2");
    if (savedStep2) {
      const parsedStep2 = JSON.parse(savedStep2);
      setStep2Data(parsedStep2);
    }
  }, []);

  const addTreatment = (treatmentName: string) => {
    // Prevent duplicate treatment selection
    if (selectedTreatments.some((t) => t.name === treatmentName)) {
      return;
    }
    
    // If it's a medication and not in library, add it
    if (selectedCategory === "medications") {
      addMedication(treatmentName);
    }
    
    setEditingTreatment(treatmentName);
    setSearchQuery("");
    setShowSuggestions(false);
    setCurrentDetails({
      category: selectedCategory,
      treatmentPurpose: "diagnosis",
      selectedSymptoms: [],
      linkedDiagnoses: [],
      linkedSymptoms: [],
      dosage: "",
      frequency: "",
      startDate: "",
      effectiveness: 5,
      notes: "",
    });
  };

  const saveTreatmentDetails = () => {
    // Validate required fields
    let isPurposeValid = false;
    let areSymptomsValid = false;
    
    if (currentDetails.category === "medications") {
      // For medications: check linkedDiagnoses and linkedSymptoms
      isPurposeValid = true;
      areSymptomsValid = 
        ((currentDetails.linkedDiagnoses && currentDetails.linkedDiagnoses.length > 0) ||
         (currentDetails.linkedSymptoms && currentDetails.linkedSymptoms.length > 0));
    } else {
      // For non-medications: no purpose validation needed
      isPurposeValid = true;
      areSymptomsValid = true;
    }
    
    if (
      editingTreatment &&
      isPurposeValid &&
      areSymptomsValid &&
      currentDetails.frequency &&
      currentDetails.startDate
    ) {
      setSelectedTreatments([
        ...selectedTreatments,
        {
          name: editingTreatment,
          category: currentDetails.category || selectedCategory,
          treatmentPurpose: currentDetails.treatmentPurpose || "diagnosis",
          selectedSymptoms: currentDetails.selectedSymptoms || [],
          linkedDiagnoses: currentDetails.linkedDiagnoses || [],
          linkedSymptoms: currentDetails.linkedSymptoms || [],
          dosage: currentDetails.dosage,
          frequency: currentDetails.frequency,
          startDate: currentDetails.startDate,
          effectiveness: currentDetails.effectiveness || 5,
          notes: currentDetails.notes,
        },
      ]);
      setEditingTreatment(null);
      setCurrentDetails({
        category: selectedCategory,
        treatmentPurpose: "diagnosis",
        selectedSymptoms: [],
        linkedDiagnoses: [],
        linkedSymptoms: [],
        dosage: "",
        frequency: "",
        startDate: "",
        effectiveness: 5,
        notes: "",
      });
    }
  };

  const removeTreatment = (treatmentName: string) => {
    setSelectedTreatments(selectedTreatments.filter((t) => t.name !== treatmentName));
    if (editingTreatment === treatmentName) {
      setEditingTreatment(null);
    }
    if (editingInSummary === treatmentName) {
      setEditingInSummary(null);
    }
  };

  // Inline editing handlers
  const startInlineEdit = (treatment: TreatmentDetail) => {
    setEditingInSummary(treatment.name);
    setTempEditData({ ...treatment });
  };

  const saveInlineEdit = () => {
    // Validate required fields in inline edit
    let isPurposeValid = false;
    let areSymptomsValid = false;
    
    if (tempEditData.category === "medications") {
      // For medications: check linkedDiagnoses and linkedSymptoms
      isPurposeValid = true;
      areSymptomsValid = 
        ((tempEditData.linkedDiagnoses && tempEditData.linkedDiagnoses.length > 0) ||
         (tempEditData.linkedSymptoms && tempEditData.linkedSymptoms.length > 0));
    } else {
      // For non-medications: no purpose validation needed
      isPurposeValid = true;
      areSymptomsValid = true;
    }
    
    if (editingInSummary && tempEditData && isPurposeValid && areSymptomsValid) {
      setSelectedTreatments(
        selectedTreatments.map((t) =>
          t.name === editingInSummary
            ? { ...t, ...tempEditData }
            : t
        )
      );
      setEditingInSummary(null);
      setTempEditData({});
    }
  };

  const cancelInlineEdit = () => {
    setEditingInSummary(null);
    setTempEditData({});
  };

  const getEffectivenessLabel = (effectiveness: number) => {
    if (effectiveness <= 3) return "Not Helpful";
    if (effectiveness <= 6) return "Somewhat Helpful";
    if (effectiveness <= 8) return "Helpful";
    return "Very Helpful";
  };

  // Helper function to get gradient color at specific position
  const getGradientColorAtPosition = (value: number, min: number = 1, max: number = 10) => {
    // Normalize value to 0-1 range
    const normalized = (value - min) / (max - min);
    
    // Blue → Cyan → Purple gradient
    // Blue: #3B82F6 (rgb 59, 130, 246)
    // Cyan: #06B6D4 (rgb 6, 182, 212)
    // Purple: #A855F7 (rgb 168, 85, 247)
    
    if (normalized <= 0.5) {
      // Interpolate between blue and cyan
      const t = normalized * 2; // 0 to 1 in first half
      const r = Math.round(59 + (6 - 59) * t);
      const g = Math.round(130 + (182 - 130) * t);
      const b = Math.round(246 + (212 - 246) * t);
      return `rgb(${r}, ${g}, ${b})`;
    } else {
      // Interpolate between cyan and purple
      const t = (normalized - 0.5) * 2; // 0 to 1 in second half
      const r = Math.round(6 + (168 - 6) * t);
      const g = Math.round(182 + (85 - 182) * t);
      const b = Math.round(212 + (247 - 212) * t);
      return `rgb(${r}, ${g}, ${b})`;
    }
  };

  const getEffectivenessColor = (effectiveness: number) => {
    const color = getGradientColorAtPosition(effectiveness);
    return { color, backgroundColor: `${color}15` }; // 15 is ~8% opacity in hex
  };

  // Get category-specific detail title
  const getCategoryDetailTitle = (category: string) => {
    const titleMap: Record<string, string> = {
      medications: "Medication Details",
      therapies: "Therapy Details",
      supplements: "Supplement Details",
      lifestyle: "Lifestyle Details",
    };
    return titleMap[category] || "Treatment Details";
  };

  // Get category-specific "Add Your..." title
  const getCategoryAddTitle = (category: string) => {
    const titleMap: Record<string, string> = {
      medications: "Add Your Medications",
      therapies: "Add Your Therapies",
      supplements: "Add Your Supplements",
      lifestyle: "Add Your Lifestyle",
    };
    return titleMap[category] || "Add Your Treatments";
  };

  // Category-based progress calculation
  const getCategoryCompletion = () => {
    const categories = ['medications', 'therapies', 'supplements', 'lifestyle'];
    const completedCategories: string[] = [];
    
    categories.forEach(category => {
      // Check if this category has at least one complete entry
      const hasCompleteEntry = selectedTreatments.some(
        t => t.category === category && t.frequency && t.startDate
      );
      if (hasCompleteEntry) {
        completedCategories.push(category);
      }
    });
    
    return {
      completedCategories,
      count: completedCategories.length,
      percentage: completedCategories.length * 25, // Each category = 25%
    };
  };

  const categoryCompletion = getCategoryCompletion();
  const progressPercentage = categoryCompletion.percentage;

  // Check if user has at least one complete treatment in any category
  const hasAnyCompleteTreatment = selectedTreatments.some(
    t => t.frequency && t.startDate
  );

  const completeTreatments = selectedTreatments.filter(
    (t) => t.frequency && t.startDate
  ).length;

  const totalTreatmentsIncludingEditing = selectedTreatments.length + (editingTreatment ? 1 : 0);

  const TARGET_TREATMENT_COUNT = 3;
  const isCurrentTreatmentComplete =
    editingTreatment &&
    currentDetails.frequency &&
    currentDetails.startDate &&
    (currentDetails.category === "medications" 
      ? ((currentDetails.linkedDiagnoses && currentDetails.linkedDiagnoses.length > 0) ||
         (currentDetails.linkedSymptoms && currentDetails.linkedSymptoms.length > 0))
      : true);

  const isFormValid = selectedTreatments.length > 0 && completeTreatments === selectedTreatments.length && !editingTreatment;

  const handleContinue = () => {
    if (isFormValid) {
      localStorage.setItem("symptomapStep3", JSON.stringify(selectedTreatments));
      navigate("/medical-records");
    }
  };

  // Helper function to get category color
  const getCategoryColor = (category: string) => {
    const colorMap: Record<string, { bg: string; border: string; text: string; badge: string; accentBorder: string; accentColor: string }> = {
      medications: {
        bg: "bg-blue-50",
        border: "border-blue-300",
        text: "text-blue-700",
        badge: "bg-blue-100 text-blue-700 border-blue-200",
        accentBorder: "border-l-blue-500",
        accentColor: "#3b82f6", // blue-500
      },
      therapies: {
        bg: "bg-purple-50",
        border: "border-purple-300",
        text: "text-purple-700",
        badge: "bg-purple-100 text-purple-700 border-purple-200",
        accentBorder: "border-l-purple-500",
        accentColor: "#a855f7", // purple-500
      },
      supplements: {
        bg: "bg-green-50",
        border: "border-green-300",
        text: "text-green-700",
        badge: "bg-green-100 text-green-700 border-green-200",
        accentBorder: "border-l-green-500",
        accentColor: "#22c55e", // green-500
      },
      lifestyle: {
        bg: "bg-orange-50",
        border: "border-orange-300",
        text: "text-orange-700",
        badge: "bg-orange-100 text-orange-700 border-orange-200",
        accentBorder: "border-l-orange-500",
        accentColor: "#f97316", // orange-500
      },
    };
    return colorMap[category] || colorMap.medications;
  };

  // Helper function to format date
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleDateString("en-US", { month: "short" });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  // Helper to get category icon
  const getCategoryIcon = (category: string) => {
    const categoryData = treatmentCategories.find(c => c.id === category);
    return categoryData?.icon || Pill;
  };

  // AI-powered treatment note suggestions
  const treatmentNoteSuggestions = [
    {
      category: "Treatment Response",
      notes: [
        "Felt improvement after 2 weeks",
        "Noticed gradual improvement over first month",
        "Significant improvement within first week",
        "No noticeable change after 4 weeks",
        "Symptoms worsened initially, then improved",
        "Effectiveness decreased over time",
      ]
    },
    {
      category: "Side Effects",
      notes: [
        "Mild fatigue after administration",
        "Headache for first few days",
        "Nausea within first hour",
        "Mild injection site reaction",
        "Increased appetite",
        "Sleep disturbances",
        "No significant side effects",
      ]
    },
    {
      category: "Administration & Tolerance",
      notes: [
        "Infusion well tolerated",
        "Injection process straightforward",
        "Required antihistamine pre-medication",
        "Better tolerance with food",
        "Difficult to maintain consistency",
        "Easy to incorporate into routine",
      ]
    },
    {
      category: "Impact on Daily Life",
      notes: [
        "Able to return to work after treatment",
        "Improved mobility and independence",
        "Required rest day after administration",
        "Minimal disruption to daily activities",
        "Needed to adjust work schedule",
        "Family support helpful during treatment",
      ]
    },
    {
      category: "Symptom-Specific Changes",
      notes: [
        "Vision clarity improved",
        "Walking ability increased",
        "Pain levels reduced significantly",
        "Numbness decreased over time",
        "Spasticity improved",
        "Fatigue management better",
        "Balance more stable",
      ]
    },
    {
      category: "Treatment Combination",
      notes: [
        "Works well with physical therapy",
        "Combined with other medications",
        "Supplements support overall response",
        "Lifestyle changes enhanced effectiveness",
        "Diet modifications helped tolerance",
      ]
    },
  ];

  // Context-aware dosage suggestions based on treatment name - Clinically intelligent
  const getDosageSuggestions = (treatmentName: string): string[] => {
    const name = treatmentName.toLowerCase();
    
    // ========== BIOLOGICS ==========
    
    // IVIG
    if (name.includes('ivig') || name.includes('immunoglobulin')) {
      return ['2g/kg', '1g/kg', '0.4g/kg', '400mg/kg', 'infusion', 'course'];
    }
    
    // Rituximab
    if (name.includes('rituximab')) {
      return ['1000mg', '500mg', '375mg/m²', 'infusion', 'cycle'];
    }
    
    // Ocrelizumab
    if (name.includes('ocrelizumab')) {
      return ['300mg', '600mg', 'infusion', 'dose'];
    }
    
    // Natalizumab
    if (name.includes('natalizumab')) {
      return ['300mg', 'infusion', 'dose'];
    }
    
    // Adalimumab
    if (name.includes('adalimumab')) {
      return ['40mg', '80mg', 'injection', 'pen'];
    }
    
    // Infliximab
    if (name.includes('infliximab')) {
      return ['3mg/kg', '5mg/kg', '10mg/kg', 'infusion'];
    }
    
    // Tocilizumab
    if (name.includes('tocilizumab')) {
      return ['162mg', '8mg/kg', 'injection', 'infusion'];
    }
    
    // ========== CORTICOSTEROIDS ==========
    
    // Prednisone / Prednisolone
    if (name.includes('prednisone') || name.includes('prednisolone')) {
      return ['5mg', '10mg', '20mg', '40mg', '60mg', 'mg/day', 'taper'];
    }
    
    // Methylprednisolone
    if (name.includes('methylprednisolone')) {
      return ['1000mg', '500mg', '125mg', '40mg', '16mg', '4mg', 'pulse therapy', 'infusion'];
    }
    
    // Dexamethasone
    if (name.includes('dexamethasone')) {
      return ['4mg', '8mg', '0.5mg', '0.75mg', '1mg', '1.5mg', 'mg/day'];
    }
    
    // Hydrocortisone
    if (name.includes('hydrocortisone')) {
      return ['10mg', '20mg', 'mg/day', 'tablet'];
    }
    
    // ========== IMMUNOSUPPRESSANTS ==========
    
    // Azathioprine
    if (name.includes('azathioprine')) {
      return ['50mg', '100mg', '150mg', '200mg', 'mg/kg', 'mg/day'];
    }
    
    // Mycophenolate
    if (name.includes('mycophenolate')) {
      return ['500mg', '1000mg', '1500mg', '2000mg', 'mg/day'];
    }
    
    // Methotrexate
    if (name.includes('methotrexate')) {
      return ['7.5mg', '10mg', '15mg', '20mg', '25mg', 'mg/week', 'injection', 'tablet'];
    }
    
    // Cyclophosphamide
    if (name.includes('cyclophosphamide')) {
      return ['500mg', '750mg', '1000mg', 'mg/m²', 'infusion', 'pulse'];
    }
    
    // Cyclosporine / Tacrolimus
    if (name.includes('cyclosporine') || name.includes('tacrolimus')) {
      return ['25mg', '50mg', '100mg', 'mg/day', 'capsule'];
    }
    
    // ========== SYMPTOM MANAGEMENT ==========
    
    // Gabapentin
    if (name.includes('gabapentin')) {
      return ['300mg', '600mg', '900mg', '1200mg', '1800mg', 'mg/day'];
    }
    
    // Pregabalin
    if (name.includes('pregabalin')) {
      return ['25mg', '50mg', '75mg', '150mg', '300mg', 'mg/day'];
    }
    
    // Baclofen
    if (name.includes('baclofen')) {
      return ['5mg', '10mg', '20mg', '30mg', 'mg/day'];
    }
    
    // Tizanidine
    if (name.includes('tizanidine')) {
      return ['2mg', '4mg', '6mg', '8mg', 'mg/day'];
    }
    
    // Amantadine
    if (name.includes('amantadine')) {
      return ['100mg', '200mg', '300mg', 'mg/day'];
    }
    
    // Modafinil
    if (name.includes('modafinil')) {
      return ['100mg', '200mg', '400mg', 'mg/day'];
    }
    
    // ========== MS-SPECIFIC DMTS ==========
    
    // Dimethyl Fumarate
    if (name.includes('dimethyl') || name.includes('tecfidera')) {
      return ['120mg', '240mg', 'capsule', 'twice daily'];
    }
    
    // Fingolimod
    if (name.includes('fingolimod') || name.includes('gilenya')) {
      return ['0.5mg', 'capsule', 'daily'];
    }
    
    // Teriflunomide
    if (name.includes('teriflunomide') || name.includes('aubagio')) {
      return ['7mg', '14mg', 'tablet', 'daily'];
    }
    
    // Glatiramer Acetate
    if (name.includes('glatiramer') || name.includes('copaxone')) {
      return ['20mg', '40mg', 'injection', 'daily', '3x/week'];
    }
    
    // ========== SUPPLEMENTS ==========
    
    // Vitamin D
    if (name.includes('vitamin d')) {
      return ['1000 IU', '2000 IU', '4000 IU', '5000 IU', '10000 IU', 'drops', 'softgel'];
    }
    
    // Vitamin B12
    if (name.includes('b12') || name.includes('b-12') || name.includes('cobalamin')) {
      return ['500mcg', '1000mcg', '2000mcg', '5000mcg', 'sublingual', 'injection'];
    }
    
    // Vitamin B Complex
    if (name.includes('b complex') || name.includes('b-complex')) {
      return ['1 tablet', '1 capsule', 'daily'];
    }
    
    // Vitamin B6
    if (name.includes('b6') || name.includes('b-6') || name.includes('pyridoxine')) {
      return ['25mg', '50mg', '100mg', 'capsule'];
    }
    
    // Vitamin C
    if (name.includes('vitamin c') || name.includes('ascorbic')) {
      return ['500mg', '1000mg', '2000mg', 'tablet'];
    }
    
    // Vitamin E
    if (name.includes('vitamin e')) {
      return ['200 IU', '400 IU', '800 IU', 'softgel'];
    }
    
    // Magnesium
    if (name.includes('magnesium')) {
      return ['200mg', '250mg', '400mg', '500mg', 'capsule', 'tablet'];
    }
    
    // Omega-3 / Fish Oil
    if (name.includes('omega') || name.includes('fish oil')) {
      return ['1000mg', '1200mg', '1400mg', '2000mg', 'softgel'];
    }
    
    // Zinc
    if (name.includes('zinc')) {
      return ['15mg', '25mg', '50mg', 'tablet'];
    }
    
    // Iron
    if (name.includes('iron') && !name.includes('ferr')) {
      return ['18mg', '25mg', '65mg', 'tablet', 'elemental'];
    }
    
    // CoQ10
    if (name.includes('coq10') || name.includes('coenzyme q10')) {
      return ['100mg', '200mg', '300mg', 'softgel'];
    }
    
    // Alpha Lipoic Acid
    if (name.includes('alpha lipoic') || name.includes('ala')) {
      return ['300mg', '600mg', 'capsule'];
    }
    
    // Biotin
    if (name.includes('biotin')) {
      return ['5000mcg', '10000mcg', '300mg', 'capsule'];
    }
    
    // Calcium
    if (name.includes('calcium')) {
      return ['500mg', '600mg', '1000mg', 'tablet', '+ Vitamin D'];
    }
    
    // Turmeric/Curcumin
    if (name.includes('turmeric') || name.includes('curcumin')) {
      return ['500mg', '1000mg', '1500mg', 'capsule'];
    }
    
    // Probiotics
    if (name.includes('probiotic')) {
      return ['1 capsule', '10 billion CFU', '25 billion CFU', '50 billion CFU'];
    }
    
    // Selenium
    if (name.includes('selenium')) {
      return ['50mcg', '100mcg', '200mcg', 'tablet'];
    }
    
    // ========== PLASMA EXCHANGE ==========
    
    if (name.includes('plasma') || name.includes('plasmapheresis')) {
      return ['session', 'cycle', '5 sessions', '7 sessions'];
    }
    
    // ========== DEFAULT ==========
    
    // Default for other medications/supplements
    return ['mg', 'mcg', 'IU', '1 tablet', '2 tablets', '500mg', '1000mg'];
  };

  // Get filtered dosage suggestions based on current input
  const getFilteredDosageSuggestions = () => {
    if (!editingTreatment) return [];
    
    const baseSuggestions = getDosageSuggestions(editingTreatment);
    const input = (currentDetails.dosage || '').trim();
    
    // If no input, return base suggestions
    if (!input) return baseSuggestions.slice(0, 8); // Limit to 8 to keep dropdown manageable
    
    const inputLower = input.toLowerCase();
    
    // Extract number from input if present
    const numberMatch = input.match(/^(\d+\.?\d*)/);
    const hasNumber = numberMatch !== null;
    const numberValue = numberMatch ? numberMatch[1] : '';
    
    // AI-powered intelligent suggestions
    let smartSuggestions: string[] = [];
    
    if (hasNumber) {
      // User typed a number - generate smart completions
      const name = editingTreatment.toLowerCase();
      
      // Generate number + unit completions based on medication type
      if (name.includes('ivig') || name.includes('immunoglobulin')) {
        smartSuggestions = [
          `${numberValue}g/kg`,
          `${numberValue}g`,
          `${numberValue} infusion`,
          `${numberValue} course`,
        ];
      } else if (name.includes('rituximab') || name.includes('ocrelizumab') || name.includes('natalizumab')) {
        smartSuggestions = [
          `${numberValue}mg`,
          `${numberValue}mg/m²`,
          `${numberValue} infusion`,
          `${numberValue} cycle`,
        ];
      } else if (name.includes('pred') || name.includes('sone') || name.includes('methylprednisolone')) {
        smartSuggestions = [
          `${numberValue}mg`,
          `${numberValue}mg/day`,
          `${numberValue}mg taper`,
          `${numberValue}mg pulse therapy`,
        ];
      } else if (name.includes('vitamin d')) {
        smartSuggestions = [
          `${numberValue} IU`,
          `${numberValue}IU`,
          `${numberValue}mcg`,
          `${numberValue} drops`,
        ];
      } else if (name.includes('b12') || name.includes('cobalamin')) {
        smartSuggestions = [
          `${numberValue}mcg`,
          `${numberValue}mg`,
          `${numberValue}mcg injection`,
          `${numberValue}mcg sublingual`,
        ];
      } else {
        // Generic medication number completions
        smartSuggestions = [
          `${numberValue}mg`,
          `${numberValue}mg/day`,
          `${numberValue} tablet`,
          `${numberValue} tablets`,
          `${numberValue} capsule`,
          `${numberValue} capsules`,
          `${numberValue}ml`,
        ];
      }
      
      // Add fuzzy match from base suggestions that contain the number
      const fuzzyMatches = baseSuggestions.filter(s => 
        s.includes(numberValue) && !smartSuggestions.includes(s)
      );
      
      smartSuggestions = [...smartSuggestions, ...fuzzyMatches];
    } else {
      // User is typing text - filter base suggestions
      smartSuggestions = baseSuggestions.filter(s => 
        s.toLowerCase().includes(inputLower) ||
        s.toLowerCase().startsWith(inputLower)
      );
      
      // Prioritize exact starts
      const exactStarts = smartSuggestions.filter(s => s.toLowerCase().startsWith(inputLower));
      const contains = smartSuggestions.filter(s => !s.toLowerCase().startsWith(inputLower));
      smartSuggestions = [...exactStarts, ...contains];
    }
    
    // Remove duplicates and limit results
    const uniqueSuggestions = Array.from(new Set(smartSuggestions));
    return uniqueSuggestions.slice(0, 10); // Limit to 10 suggestions
  };

  const filteredDosageSuggestions = getFilteredDosageSuggestions();

  return (
    <div className="min-h-screen bg-[#F8F8FA]">
      {/* White Banner / Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto py-6 px-4">
          <div className="flex justify-center">
            <Logo />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-4xl mx-auto py-8 px-4">
        {/* Progress Stepper */}
        <div className="mb-8 overflow-x-auto scrollbar-hide">
          <div className="flex items-center justify-center gap-4 min-w-max px-4 md:px-0">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center text-sm font-medium">
                ✓
              </div>
              <span className="text-sm font-medium text-gray-500">Personal Info</span>
            </div>
            <div className="w-12 h-0.5 bg-gray-300"></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center text-sm font-medium">
                ✓
              </div>
              <span className="text-sm font-medium text-gray-500">Symptom Mapping</span>
            </div>
            <div className="w-12 h-0.5 bg-gray-300"></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-medium">
                3
              </div>
              <span className="text-sm font-medium text-gray-900">Treatment & Therapy</span>
            </div>
            <div className="w-12 h-0.5 bg-gray-300"></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center text-sm font-medium">
                4
              </div>
              <span className="text-sm font-medium text-gray-500">Medical Summary</span>
            </div>
          </div>
        </div>

        {/* Page Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">Treatment & Therapy</h1>
          <p className="text-gray-600">Help us understand how you're currently managing your symptoms</p>
        </div>

        {/* Add Treatment Section */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">{getCategoryAddTitle(selectedCategory)}</h2>

          {/* Category Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-900 mb-3">Category</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {treatmentCategories.map((category) => {
                const IconComponent = category.icon;
                const isSelected = selectedCategory === category.id;
                const colors = getCategoryColor(category.id);
                
                // Get hover color based on category
                const hoverColor = category.id === "medications" ? "hover:bg-blue-50/50 hover:border-blue-300 hover:shadow-sm"
                  : category.id === "therapies" ? "hover:bg-purple-50/50 hover:border-purple-300 hover:shadow-sm"
                  : category.id === "supplements" ? "hover:bg-green-50/50 hover:border-green-300 hover:shadow-sm"
                  : "hover:bg-orange-50/50 hover:border-orange-300 hover:shadow-sm";
                
                return (
                  <button
                    key={category.id}
                    onClick={() => {
                      setSelectedCategory(category.id);
                      setSearchQuery("");
                    }}
                    className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                      isSelected
                        ? `${colors.bg} ${colors.border} shadow-md`
                        : `bg-white border-gray-200 ${hoverColor}`
                    }`}
                  >
                    <IconComponent className={`h-6 w-6 transition-colors ${isSelected ? colors.text : "text-gray-400"}`} />
                    <span className={`text-sm font-medium transition-colors ${isSelected ? colors.text : "text-gray-700"}`}>
                      {category.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative mb-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder={selectedCategory === "medications" ? "Search medication library..." : `Search ${selectedCategory}...`}
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && searchQuery.trim()) {
                    e.preventDefault();
                    addTreatment(searchQuery.trim());
                  }
                }}
                className="w-full pl-12 pr-12 py-4 border-2 border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-900 placeholder-gray-400"
              />
              <Sparkles className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-purple-500" />
            </div>

            {/* Medication Library Suggestions Dropdown */}
            {showSuggestions && filteredSuggestions.length > 0 && (
              <div className="absolute z-10 w-full mt-2 bg-white border-2 border-purple-300 rounded-xl shadow-lg max-h-80 overflow-y-auto">
                {filteredSuggestions.map((item, index) => {
                  const treatmentName = 'name' in item ? item.name : item;
                  const medEntry = 'category' in item ? item as MedicationEntry : null;
                  
                  // Format display name with primary alias if available
                  let displayName = treatmentName;
                  if (medEntry && medEntry.aliases && medEntry.aliases.length > 0) {
                    // Show first alias in brackets for commonly used names
                    displayName = `${treatmentName} (${medEntry.aliases[0]})`;
                  }
                  
                  return (
                    <button
                      key={`${treatmentName}-${index}`}
                      onClick={() => addTreatment(treatmentName)}
                      className="w-full px-4 py-2.5 text-left hover:bg-purple-50 border-b border-gray-100 last:border-0 transition-colors"
                    >
                      <span className="text-gray-900">{displayName}</span>
                    </button>
                  );
                })}
              </div>
            )}
            {/* Custom medication option - only show when NO matches found */}
            {showSuggestions && selectedCategory === "medications" && searchQuery.trim() && filteredSuggestions.length === 0 && (
              <div className="absolute z-10 w-full mt-2 bg-white border-2 border-purple-300 rounded-xl shadow-lg">
                <button
                  onClick={() => addTreatment(searchQuery.trim())}
                  className="w-full px-4 py-2.5 text-left hover:bg-purple-50 transition-colors"
                >
                  <span className="text-gray-900">Add "{searchQuery.trim()}"</span>
                </button>
              </div>
            )}
          </div>

          {/* Helper Text */}
          <div className="flex items-start gap-2 text-sm text-gray-600">
            <Sparkles className="h-4 w-4 text-purple-500 mt-0.5 flex-shrink-0" />
            <p>
              {selectedCategory === "medications" 
                ? "Type to search 150+ medications. Start with just a few letters."
                : "Start typing to see suggestions. Don't see what you're looking for? Just type it in!"}
            </p>
          </div>

          {/* Selected Treatment Chips */}
          {(selectedTreatments.length > 0 || editingTreatment) && (
            <div className="flex flex-wrap gap-2 mt-4">
              {selectedTreatments.map((treatment) => (
                <div
                  key={treatment.name}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 text-blue-600 rounded-full border border-blue-200 text-sm"
                >
                  <span className="font-medium">{treatment.name}</span>
                  <button
                    onClick={() => removeTreatment(treatment.name)}
                    className="hover:bg-blue-100 rounded-full p-0.5"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
              {editingTreatment && (
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 text-blue-600 rounded-full border border-blue-200 text-sm">
                  <span className="font-medium">{editingTreatment}</span>
                  <button
                    onClick={() => setEditingTreatment(null)}
                    className="hover:bg-blue-100 rounded-full p-0.5"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Empty State Card */}
        {!editingTreatment && selectedTreatments.length === 0 && (
          <div className="bg-white rounded-2xl shadow-sm p-12 mb-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-purple-100 flex items-center justify-center mb-6">
                <Heart className="h-12 w-12 text-purple-400" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">No Treatments Added Yet</h3>
              <p className="text-gray-600 mb-2 max-w-md">
                Use the search bar above to start adding your medications, therapies, supplements, or lifestyle interventions
              </p>
              <p className="text-sm text-gray-500 max-w-md">
                We understand everyone's treatment journey is unique. Add what works for you.
              </p>
            </div>
          </div>
        )}

        {/* Treatment Details Section */}
        {editingTreatment && (
          <div className="bg-white rounded-2xl shadow-sm p-8 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">{getCategoryDetailTitle(currentDetails.category || "medications")}</h2>

            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-semibold text-gray-900">{editingTreatment}</h3>
                <button
                  onClick={() => setEditingTreatment(null)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>

            <div className="space-y-6">
              {/* What is this medication for? - MEDICATIONS ONLY MULTI-SELECT */}
              {currentDetails.category === "medications" && (
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-3">
                    What is this medication for? <span className="text-red-500">*</span>
                  </label>
                  <p className="text-xs text-gray-600 mb-3">Select all that apply (condition and/or symptoms)</p>
                  
                  {/* Build combined list of diagnoses and symptoms */}
                  {(() => {
                    const diagnosisList: Array<{type: 'diagnosis', value: string, label: string}> = [];
                    const symptomsList: Array<{type: 'symptom', value: string, label: string}> = [];
                    
                    // Add primary diagnosis
                    if (step1Data?.primaryDiagnosis) {
                      const diagnosis = diagnoses.find(d => d.value === step1Data.primaryDiagnosis);
                      if (diagnosis) {
                        diagnosisList.push({type: 'diagnosis', value: diagnosis.value, label: diagnosis.label});
                      }
                    }
                    
                    // Add additional diagnoses (skip if already added)
                    if (step1Data?.additionalConditions && step1Data.additionalConditions.length > 0) {
                      step1Data.additionalConditions.forEach((conditionValue: string) => {
                        // Skip if this diagnosis is already in the list
                        if (!diagnosisList.find(d => d.value === conditionValue)) {
                          const diagnosis = diagnoses.find(d => d.value === conditionValue);
                          if (diagnosis) {
                            diagnosisList.push({type: 'diagnosis', value: diagnosis.value, label: diagnosis.label});
                          }
                        }
                      });
                    }
                    
                    // Add symptoms from Step 2
                    if (step2Data && step2Data.length > 0) {
                      step2Data.forEach((symptom: any) => {
                        symptomsList.push({type: 'symptom', value: symptom.name, label: symptom.name});
                      });
                    }
                    
                    const hasAnyOptions = diagnosisList.length > 0 || symptomsList.length > 0;
                    
                    return hasAnyOptions ? (
                      <div className="space-y-3 max-h-80 overflow-y-auto">
                        {/* Diagnoses Section */}
                        {diagnosisList.length > 0 && (
                          <>
                            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide pt-2 pb-1">
                              Diagnoses
                            </div>
                            {diagnosisList.map((item) => (
                              <label
                                key={`diagnosis-${item.value}`}
                                className="flex items-center px-4 py-3.5 rounded-xl border-2 border-gray-200 hover:bg-blue-50/30 cursor-pointer transition-all"
                              >
                                <input
                                  type="checkbox"
                                  checked={currentDetails.linkedDiagnoses?.includes(item.value) || false}
                                  onChange={(e) => {
                                    const newDiagnoses = e.target.checked
                                      ? [...(currentDetails.linkedDiagnoses || []), item.value]
                                      : currentDetails.linkedDiagnoses?.filter((d) => d !== item.value) || [];
                                    setCurrentDetails({ ...currentDetails, linkedDiagnoses: newDiagnoses });
                                  }}
                                  className="mr-3 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <span className="text-sm text-gray-900">{item.label}</span>
                              </label>
                            ))}
                          </>
                        )}
                        
                        {/* Symptoms Section */}
                        {symptomsList.length > 0 && (
                          <>
                            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide pt-2 pb-1">
                              Symptoms
                            </div>
                            {symptomsList.map((item) => (
                              <label
                                key={`symptom-${item.value}`}
                                className="flex items-center px-4 py-3.5 rounded-xl border-2 border-gray-200 hover:bg-blue-50/30 cursor-pointer transition-all"
                              >
                                <input
                                  type="checkbox"
                                  checked={currentDetails.linkedSymptoms?.includes(item.value) || false}
                                  onChange={(e) => {
                                    const newSymptoms = e.target.checked
                                      ? [...(currentDetails.linkedSymptoms || []), item.value]
                                      : currentDetails.linkedSymptoms?.filter((s) => s !== item.value) || [];
                                    setCurrentDetails({ ...currentDetails, linkedSymptoms: newSymptoms });
                                  }}
                                  className="mr-3 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <span className="text-sm text-gray-900">{item.label}</span>
                              </label>
                            ))}
                          </>
                        )}
                      </div>
                    ) : (
                      <div className="px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl text-sm text-gray-600">
                        No diagnoses or symptoms available. Please complete Steps 1 and 2 first.
                      </div>
                    );
                  })()}
                  
                  {/* Validation message */}
                  {((currentDetails.linkedDiagnoses?.length || 0) === 0 && (currentDetails.linkedSymptoms?.length || 0) === 0) && (
                    <p className="text-xs text-red-500 mt-2">Please select at least one diagnosis or symptom</p>
                  )}
                </div>
              )}

              {/* Start Date */}
              <div>
                <DatePicker
                  label="When did you start this treatment?"
                  required
                  value={currentDetails.startDate || ""}
                  onChange={(e) => setCurrentDetails({ ...currentDetails, startDate: e.target.value })}
                />
              </div>

              {/* Dosage (optional for medications/supplements) - Context-aware */}
              {(currentDetails.category === "medications" || currentDetails.category === "supplements") && (
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-3">
                    Dosage <span className="text-gray-500 text-sm font-normal">(Optional)</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder={`e.g., ${getDosageSuggestions(editingTreatment || '').slice(0, 3).join(', ')}`}
                      value={currentDetails.dosage || ""}
                      onChange={(e) => {
                        setCurrentDetails({ ...currentDetails, dosage: e.target.value });
                        setShowDosageSuggestions(true);
                      }}
                      onFocus={() => setShowDosageSuggestions(true)}
                      onBlur={() => setTimeout(() => setShowDosageSuggestions(false), 200)}
                      className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <Pill className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-blue-400" />
                  </div>
                  
                  {/* Context-aware dosage suggestions dropdown */}
                  {showDosageSuggestions && filteredDosageSuggestions.length > 0 && (
                    <div className="absolute z-10 w-full mt-2 bg-white border-2 border-blue-300 rounded-xl shadow-lg max-h-48 overflow-y-auto">
                      <div className="p-3 bg-blue-50 border-b border-blue-100 flex items-center gap-2">
                        <Pill className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-medium text-blue-900">
                          Suggested for {editingTreatment}
                        </span>
                      </div>
                      {filteredDosageSuggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setCurrentDetails({ ...currentDetails, dosage: suggestion });
                            setShowDosageSuggestions(false);
                          }}
                          className="w-full px-4 py-3 text-left hover:bg-blue-50 text-gray-900 border-b border-gray-100 last:border-0 transition-colors"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}
                  
                  <p className="text-xs text-gray-500 mt-1.5">
                    💡 Suggestions are tailored to {editingTreatment}
                  </p>
                </div>
              )}

              {/* Frequency */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-3">
                  Frequency <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {getFrequencyOptionsForCategory(currentDetails.category || selectedCategory).map((freq) => (
                    <button
                      key={freq.id}
                      onClick={() => setCurrentDetails({ ...currentDetails, frequency: freq.id })}
                      className={`px-4 py-3.5 rounded-xl border-2 transition-all text-sm ${
                        currentDetails.frequency === freq.id
                          ? "bg-blue-50 border-blue-500 text-blue-900 shadow-md"
                          : "bg-white border-gray-200 text-gray-700 hover:bg-blue-50/50 hover:border-blue-300 hover:shadow-sm"
                      }`}
                    >
                      {freq.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Effectiveness Rating */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-base font-medium text-gray-900">How effective has this been?</h4>
                  <div 
                    className="px-4 py-2 rounded-lg font-semibold"
                    style={getEffectivenessColor(currentDetails.effectiveness || 5)}
                  >
                    {currentDetails.effectiveness} / 10
                  </div>
                </div>

                <div className="relative">
                  {/* Gray background track */}
                  <div className="h-2 bg-gray-200 rounded-full"></div>
                  {/* Gradient filled portion up to selected value */}
                  <div 
                    className="absolute top-0 left-0 h-2 rounded-full bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500"
                    style={{ width: `${((currentDetails.effectiveness || 5) - 1) / 9 * 100}%` }}
                  ></div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={currentDetails.effectiveness || 5}
                    onChange={(e) => setCurrentDetails({ ...currentDetails, effectiveness: parseInt(e.target.value) })}
                    className="absolute top-0 w-full h-2 opacity-0 cursor-pointer"
                  />
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full shadow-md pointer-events-none"
                    style={{ 
                      left: `calc(${((currentDetails.effectiveness || 5) - 1) * 11.11}% - 12px)`,
                      borderWidth: '4px',
                      borderColor: getGradientColorAtPosition(currentDetails.effectiveness || 5)
                    }}
                  ></div>
                </div>

                <div className="flex justify-between text-sm text-gray-500 mt-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <span
                      key={num}
                      className={`${num === currentDetails.effectiveness ? "font-bold text-gray-900" : ""}`}
                    >
                      {num}
                    </span>
                  ))}
                </div>

                <div className="flex justify-center mt-4">
                  <div 
                    className="px-6 py-2 rounded-full font-medium"
                    style={getEffectivenessColor(currentDetails.effectiveness || 5)}
                  >
                    {getEffectivenessLabel(currentDetails.effectiveness || 5)}
                  </div>
                </div>
              </div>

              {/* Notes - AI-Powered */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <h4 className="text-sm font-medium text-gray-900">
                    Notes <span className="text-gray-500 font-normal">(Optional)</span>
                  </h4>
                  <div className="flex items-center gap-1 px-2 py-0.5 bg-purple-50 rounded-full">
                    <Sparkles className="h-3 w-3 text-purple-600" />
                    <span className="text-xs font-medium text-purple-700">AI</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  AI can help you describe treatment response, side effects, and overall experience
                </p>
                
                <div className="relative">
                  <textarea
                    value={currentDetails.notes || ""}
                    onChange={(e) => setCurrentDetails({ ...currentDetails, notes: e.target.value })}
                    onFocus={() => setShowNotesSuggestions(true)}
                    placeholder="E.g., 'Felt improvement after 2 weeks' or 'Mild fatigue after use'..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none text-sm"
                    rows={3}
                  />
                  
                  {showNotesSuggestions && (
                    <div className="absolute z-10 w-full mt-2 bg-white rounded-xl shadow-lg border-2 border-purple-200 max-h-96 overflow-y-auto">
                      <div className="sticky top-0 bg-gradient-to-r from-purple-50 to-purple-100 px-4 py-3 border-b border-purple-200 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Sparkles className="h-4 w-4 text-purple-600" />
                          <span className="font-semibold text-purple-900 text-sm">AI Treatment Notes</span>
                        </div>
                        <button
                          onClick={() => setShowNotesSuggestions(false)}
                          className="text-purple-600 hover:text-purple-800 transition-colors"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                      
                      <div className="p-3 space-y-3">
                        {treatmentNoteSuggestions.map((category, idx) => (
                          <div key={idx}>
                            <div className="text-xs font-semibold text-purple-800 mb-2 px-2">
                              {category.category}
                            </div>
                            <div className="space-y-1">
                              {category.notes.map((note, noteIdx) => {
                                const currentNotes = currentDetails.notes || "";
                                const isAlreadySelected = currentNotes.includes(note);
                                
                                return (
                                  <button
                                    key={noteIdx}
                                    onClick={() => {
                                      // Toggle behavior: add if not present, remove if already selected
                                      if (isAlreadySelected) {
                                        // Remove note from notes
                                        let updatedNotes = currentNotes;
                                        
                                        // Remove with period and space variations
                                        updatedNotes = updatedNotes.replace(`. ${note}`, "");
                                        updatedNotes = updatedNotes.replace(`${note}. `, "");
                                        updatedNotes = updatedNotes.replace(note, "");
                                        
                                        // Clean up extra periods and spaces
                                        updatedNotes = updatedNotes.replace(/\.\.+/g, ".");
                                        updatedNotes = updatedNotes.replace(/\s+/g, " ");
                                        updatedNotes = updatedNotes.replace(/^\s*\.\s*/, "");
                                        updatedNotes = updatedNotes.trim();
                                        
                                        setCurrentDetails({ ...currentDetails, notes: updatedNotes });
                                      } else {
                                        // Add note to notes
                                        const newNotes = currentNotes 
                                          ? `${currentNotes}. ${note}`
                                          : note;
                                        setCurrentDetails({ ...currentDetails, notes: newNotes });
                                      }
                                    }}
                                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all flex items-start gap-2 group ${
                                      isAlreadySelected 
                                        ? "bg-gray-100 text-gray-400 cursor-pointer opacity-60" 
                                        : "text-gray-700 hover:bg-purple-50 hover:text-purple-900"
                                    }`}
                                  >
                                    <Sparkles className={`h-3.5 w-3.5 mt-0.5 flex-shrink-0 ${
                                      isAlreadySelected 
                                        ? "text-gray-300" 
                                        : "text-purple-400 group-hover:text-purple-600"
                                    }`} />
                                    <span>{note}</span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Save Button */}
              <Button
                type="button"
                onClick={saveTreatmentDetails}
                disabled={!isCurrentTreatmentComplete}
                className="w-full"
              >
                Save {getCategoryDetailTitle(currentDetails.category || "medications")}
              </Button>
            </div>
          </div>
        )}

        {/* Treatment & Therapy Summary Section */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-6">
          <div className="flex items-center gap-2 mb-6">
            <Activity className="h-5 w-5 text-blue-500" />
            <h2 className="text-xl font-semibold text-gray-900">Treatment & Therapy Summary</h2>
          </div>

          <div className="space-y-6">
            {/* Progress Bar */}
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Progress</span>
                <span className="text-gray-500">
                  {categoryCompletion.count} of 4 categories complete
                </span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <div className="text-sm text-gray-500 mt-2">
                {Math.round(progressPercentage)}% complete
                {categoryCompletion.count === 4 && (
                  <span className="ml-2 text-green-600 font-medium">✓ All categories covered!</span>
                )}
              </div>
            </div>

            {/* Empty State */}
            {totalTreatmentsIncludingEditing === 0 && (
              <div className="flex flex-col items-center text-center py-12">
                <Activity className="h-16 w-16 text-gray-300 mb-4" />
                <p className="text-gray-600 mb-1">No treatments added yet</p>
                <p className="text-sm text-gray-500">Use the search bar above to add treatments</p>
              </div>
            )}

            {/* Selected Treatments List */}
            {totalTreatmentsIncludingEditing > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">Your Treatments</h3>
                <div className="space-y-3">
                  {selectedTreatments
                    .slice()
                    .sort((a, b) => {
                      const dateA = new Date(a.startDate).getTime();
                      const dateB = new Date(b.startDate).getTime();
                      return dateB - dateA; // Most recent first
                    })
                    .map((treatment) => {
                      const colors = getCategoryColor(treatment.category);
                      const isEditing = editingInSummary === treatment.name;
                      const editData = isEditing ? tempEditData : treatment;
                      const IconComponent = getCategoryIcon(treatment.category);

                      return (
                        <div
                          key={treatment.name}
                          className={`rounded-xl border border-gray-200 transition-all ${
                            isEditing
                              ? "border-2 shadow-lg"
                              : "border-l-4 border-l-gray-200 hover:shadow-sm cursor-pointer"
                          }`}
                          onClick={() => !isEditing && startInlineEdit(treatment)}
                        >
                          {/* Summary View */}
                          {!isEditing && (
                            <div className="p-4 bg-white rounded-xl">
                              {/* Top Row: Icon + Title on left, X button on right */}
                              <div className="flex items-center justify-between gap-3 mb-2">
                                <div className="flex items-center gap-2">
                                  <IconComponent className={`h-5 w-5 ${colors.text} flex-shrink-0`} />
                                  <h4 className="font-semibold text-gray-900 text-base">{treatment.name}</h4>
                                </div>
                                <button
                                  onClick={(e) => { e.stopPropagation(); removeTreatment(treatment.name); }}
                                  className="text-gray-400 hover:text-red-500 transition-colors p-1 hover:bg-red-50 rounded-md flex-shrink-0"
                                >
                                  <X className="h-4 w-4" />
                                </button>
                              </div>

                              {/* Second Row: Chips on left, Note on right */}
                              <div className="flex items-center gap-4 mb-2">
                                <div className="flex flex-wrap items-center gap-1.5">
                                  <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium border capitalize ${colors.badge}`}>
                                    {treatment.category}
                                  </span>
                                  {/* Treatment Purpose - Different display for medications vs others */}
                                  {treatment.category === "medications" ? (
                                    <>
                                      {/* For medications: show linked diagnoses and symptoms */}
                                      {treatment.linkedDiagnoses && treatment.linkedDiagnoses.length > 0 && (
                                        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] bg-green-50 text-green-700 font-medium border border-green-200">
                                          🎯 {treatment.linkedDiagnoses.length} diagnosis{treatment.linkedDiagnoses.length > 1 ? 'es' : ''}
                                        </span>
                                      )}
                                      {treatment.linkedSymptoms && treatment.linkedSymptoms.length > 0 && (
                                        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] bg-amber-50 text-amber-700 font-medium border border-amber-200">
                                          🎯 {treatment.linkedSymptoms.length} symptom{treatment.linkedSymptoms.length > 1 ? 's' : ''}
                                        </span>
                                      )}
                                    </>
                                  ) : (
                                    <>
                                      {/* For non-medications: show old logic */}
                                      {treatment.treatmentPurpose === "diagnosis" && (
                                        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] bg-green-50 text-green-700 font-medium border border-green-200">
                                          🎯 For Diagnosis
                                        </span>
                                      )}
                                      {treatment.treatmentPurpose === "symptom" && treatment.selectedSymptoms.length > 0 && (
                                        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] bg-amber-50 text-amber-700 font-medium border border-amber-200">
                                          🎯 For {treatment.selectedSymptoms.length} symptom{treatment.selectedSymptoms.length > 1 ? 's' : ''}
                                        </span>
                                      )}
                                      {treatment.treatmentPurpose === "both" && (
                                        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] bg-indigo-50 text-indigo-700 font-medium border border-indigo-200">
                                          🎯 For Diagnosis + {treatment.selectedSymptoms.length} symptom{treatment.selectedSymptoms.length > 1 ? 's' : ''}
                                        </span>
                                      )}
                                    </>
                                  )}
                                  <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] bg-gray-100 text-gray-700 font-medium border border-gray-200">
                                    📅 {formatDate(treatment.startDate)}
                                  </span>
                                  <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] bg-blue-50 text-blue-700 font-medium border border-blue-200 capitalize">
                                    {treatment.frequency.replace('-', ' ')}
                                  </span>
                                  {treatment.dosage && (
                                    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] bg-purple-50 text-purple-700 font-medium border border-purple-200">
                                      💊 {treatment.dosage}
                                    </span>
                                  )}
                                </div>
                              </div>

                              {/* Effectiveness Section - Similar to Severity in Symptom Summary */}
                              <div className="flex items-center gap-3 mt-2">
                                <span className="text-xs text-gray-600 font-medium whitespace-nowrap">Effectiveness</span>
                                <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden border border-gray-200">
                                  <div
                                    className="h-full bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 transition-all"
                                    style={{ width: `${treatment.effectiveness * 10}%` }}
                                  ></div>
                                </div>
                                <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-bold border whitespace-nowrap bg-gray-50 text-gray-700 border-gray-200">
                                  {treatment.effectiveness}/10
                                </span>
                              </div>

                              {/* Notes Display - Identical to Symptom Summary */}
                              {treatment.notes && treatment.notes.trim() !== "" && (
                                <div className="mt-3 p-3 bg-purple-50/50 rounded-lg border border-purple-200">
                                  <div className="flex items-start gap-2">
                                    <Sparkles className="h-3.5 w-3.5 text-purple-600 mt-0.5 flex-shrink-0" />
                                    <div>
                                      <div className="text-xs font-semibold text-purple-800 mb-1">Notes</div>
                                      <p className="text-xs text-gray-700 leading-relaxed">{treatment.notes}</p>
                                    </div>
                                  </div>
                                </div>
                              )}

                              {/* Bottom Row: Click to edit */}
                              <div className="text-xs text-gray-500 mt-3 text-center">Click to edit</div>
                            </div>
                          )}

                          {/* Inline Edit View */}
                          {isEditing && (
                            <div className="p-6 space-y-6 bg-gradient-to-br from-blue-50/50 to-purple-50/30" onClick={(e) => e.stopPropagation()}>
                              <div className="flex items-center justify-between">
                                <h4 className="text-xl font-semibold text-gray-900">{treatment.name}</h4>
                                <div className="flex gap-2">
                                  <button
                                    onClick={cancelInlineEdit}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    onClick={saveInlineEdit}
                                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                                  >
                                    Save
                                  </button>
                                </div>
                              </div>

                              {/* Treatment Purpose - MEDICATIONS ONLY MULTI-SELECT */}
                              {editData.category === "medications" && (
                                <div>
                                  <label className="block text-sm font-medium text-gray-900 mb-3">
                                    What is this medication for? <span className="text-red-500">*</span>
                                  </label>
                                  <p className="text-xs text-gray-600 mb-3">Select all that apply (condition and/or symptoms)</p>
                                  
                                  {(() => {
                                    const diagnosisList: Array<{type: 'diagnosis', value: string, label: string}> = [];
                                    const symptomsList: Array<{type: 'symptom', value: string, label: string}> = [];
                                    
                                    // Add primary diagnosis
                                    if (step1Data?.primaryDiagnosis) {
                                      const diagnosis = diagnoses.find(d => d.value === step1Data.primaryDiagnosis);
                                      if (diagnosis) {
                                        diagnosisList.push({type: 'diagnosis', value: diagnosis.value, label: diagnosis.label});
                                      }
                                    }
                                    
                                    // Add additional diagnoses (skip if already added)
                                    if (step1Data?.additionalConditions && step1Data.additionalConditions.length > 0) {
                                      step1Data.additionalConditions.forEach((conditionValue: string) => {
                                        // Skip if this diagnosis is already in the list
                                        if (!diagnosisList.find(d => d.value === conditionValue)) {
                                          const diagnosis = diagnoses.find(d => d.value === conditionValue);
                                          if (diagnosis) {
                                            diagnosisList.push({type: 'diagnosis', value: diagnosis.value, label: diagnosis.label});
                                          }
                                        }
                                      });
                                    }
                                    
                                    // Add symptoms from Step 2
                                    if (step2Data && step2Data.length > 0) {
                                      step2Data.forEach((symptom: any) => {
                                        symptomsList.push({type: 'symptom', value: symptom.name, label: symptom.name});
                                      });
                                    }
                                    
                                    const hasAnyOptions = diagnosisList.length > 0 || symptomsList.length > 0;
                                    
                                    return hasAnyOptions ? (
                                      <div className="space-y-3 max-h-64 overflow-y-auto">
                                        {/* Diagnoses Section */}
                                        {diagnosisList.length > 0 && (
                                          <>
                                            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide pt-2 pb-1">
                                              Diagnoses
                                            </div>
                                            {diagnosisList.map((item) => (
                                              <label
                                                key={`diagnosis-${item.value}`}
                                                className="flex items-center px-4 py-3.5 rounded-xl border-2 border-gray-200 hover:bg-blue-50/30 cursor-pointer transition-all"
                                              >
                                                <input
                                                  type="checkbox"
                                                  checked={editData.linkedDiagnoses?.includes(item.value) || false}
                                                  onChange={(e) => {
                                                    const newDiagnoses = e.target.checked
                                                      ? [...(editData.linkedDiagnoses || []), item.value]
                                                      : editData.linkedDiagnoses?.filter((d) => d !== item.value) || [];
                                                    setTempEditData({ ...tempEditData, linkedDiagnoses: newDiagnoses });
                                                  }}
                                                  className="mr-3 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                                />
                                                <span className="text-sm text-gray-900">{item.label}</span>
                                              </label>
                                            ))}
                                          </>
                                        )}
                                        
                                        {/* Symptoms Section */}
                                        {symptomsList.length > 0 && (
                                          <>
                                            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide pt-2 pb-1">
                                              Symptoms
                                            </div>
                                            {symptomsList.map((item) => (
                                              <label
                                                key={`symptom-${item.value}`}
                                                className="flex items-center px-4 py-3.5 rounded-xl border-2 border-gray-200 hover:bg-blue-50/30 cursor-pointer transition-all"
                                              >
                                                <input
                                                  type="checkbox"
                                                  checked={editData.linkedSymptoms?.includes(item.value) || false}
                                                  onChange={(e) => {
                                                    const newSymptoms = e.target.checked
                                                      ? [...(editData.linkedSymptoms || []), item.value]
                                                      : editData.linkedSymptoms?.filter((s) => s !== item.value) || [];
                                                    setTempEditData({ ...tempEditData, linkedSymptoms: newSymptoms });
                                                  }}
                                                  className="mr-3 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                                />
                                                <span className="text-sm text-gray-900">{item.label}</span>
                                              </label>
                                            ))}
                                          </>
                                        )}
                                      </div>
                                    ) : (
                                      <div className="px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl text-sm text-gray-600">
                                        No diagnoses or symptoms available.
                                      </div>
                                    );
                                  })()}
                                </div>
                              )}

                              {/* Start Date */}
                              <div>
                                <DatePicker
                                  label="Start Date"
                                  required
                                  value={editData.startDate || ""}
                                  onChange={(e) => setTempEditData({ ...tempEditData, startDate: e.target.value })}
                                />
                              </div>

                              {/* Dosage */}
                              {(editData.category === "medications" || editData.category === "supplements") && (
                                <div>
                                  <label className="block text-sm font-medium text-gray-900 mb-3">Dosage</label>
                                  <input
                                    type="text"
                                    placeholder="e.g., 500mg, 1 tablet"
                                    value={editData.dosage || ""}
                                    onChange={(e) => setTempEditData({ ...tempEditData, dosage: e.target.value })}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  />
                                </div>
                              )}

                              {/* Frequency */}
                              <div>
                                <label className="block text-sm font-medium text-gray-900 mb-3">Frequency</label>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                  {getFrequencyOptionsForCategory(editData.category || selectedCategory).map((freq) => (
                                    <button
                                      key={freq.id}
                                      onClick={() => setTempEditData({ ...tempEditData, frequency: freq.id })}
                                      className={`px-4 py-3.5 rounded-xl border-2 transition-all text-sm ${
                                        editData.frequency === freq.id
                                          ? "bg-blue-50 border-blue-500 text-blue-900 shadow-md"
                                          : "bg-white border-gray-200 text-gray-700 hover:bg-blue-50/50 hover:border-blue-300 hover:shadow-sm"
                                      }`}
                                    >
                                      {freq.label}
                                    </button>
                                  ))}
                                </div>
                              </div>

                              {/* Effectiveness */}
                              <div>
                                <div className="flex items-center justify-between mb-3">
                                  <span className="text-sm font-medium text-gray-900">Effectiveness</span>
                                  <span 
                                    className="px-3 py-1 rounded-lg font-semibold text-sm"
                                    style={getEffectivenessColor(editData.effectiveness || 5)}
                                  >
                                    {editData.effectiveness}/10
                                  </span>
                                </div>
                                <div className="relative">
                                  {/* Gray background track */}
                                  <div className="h-2 bg-gray-200 rounded-full"></div>
                                  {/* Gradient filled portion up to selected value */}
                                  <div 
                                    className="absolute top-0 left-0 h-2 rounded-full bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500"
                                    style={{ width: `${((editData.effectiveness || 5) - 1) / 9 * 100}%` }}
                                  ></div>
                                  <input
                                    type="range"
                                    min="1"
                                    max="10"
                                    value={editData.effectiveness || 5}
                                    onChange={(e) => setTempEditData({ ...tempEditData, effectiveness: parseInt(e.target.value) })}
                                    className="absolute top-0 w-full h-2 opacity-0 cursor-pointer"
                                  />
                                  <div
                                    className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-white rounded-full shadow-md pointer-events-none"
                                    style={{ 
                                      left: `calc(${((editData.effectiveness || 5) - 1) * 11.11}% - 10px)`,
                                      borderWidth: '4px',
                                      borderColor: getGradientColorAtPosition(editData.effectiveness || 5)
                                    }}
                                  ></div>
                                </div>
                              </div>

                              {/* Notes - AI-Powered */}
                              <div>
                                <div className="flex items-center gap-2 mb-3">
                                  <h4 className="text-sm font-medium text-gray-900">
                                    Notes <span className="text-gray-500 font-normal">(Optional)</span>
                                  </h4>
                                  <div className="flex items-center gap-1 px-2 py-0.5 bg-purple-50 rounded-full">
                                    <Sparkles className="h-3 w-3 text-purple-600" />
                                    <span className="text-xs font-medium text-purple-700">AI</span>
                                  </div>
                                </div>
                                
                                <div className="relative">
                                  <textarea
                                    value={editData.notes || ""}
                                    onChange={(e) => setTempEditData({ ...tempEditData, notes: e.target.value })}
                                    onFocus={() => setShowInlineNotesSuggestions(true)}
                                    placeholder="E.g., 'Felt improvement after 2 weeks' or 'Mild fatigue after use'..."
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none text-sm"
                                    rows={3}
                                  />
                                  
                                  {showInlineNotesSuggestions && (
                                    <div className="absolute z-10 w-full mt-2 bg-white rounded-xl shadow-lg border-2 border-purple-200 max-h-96 overflow-y-auto">
                                      <div className="sticky top-0 bg-gradient-to-r from-purple-50 to-purple-100 px-4 py-3 border-b border-purple-200 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                          <Sparkles className="h-4 w-4 text-purple-600" />
                                          <span className="font-semibold text-purple-900 text-sm">AI Treatment Notes</span>
                                        </div>
                                        <button
                                          onClick={() => setShowInlineNotesSuggestions(false)}
                                          className="text-purple-600 hover:text-purple-800 transition-colors"
                                        >
                                          <X className="h-4 w-4" />
                                        </button>
                                      </div>
                                      
                                      <div className="p-3 space-y-3">
                                        {treatmentNoteSuggestions.map((category, idx) => (
                                          <div key={idx}>
                                            <div className="text-xs font-semibold text-purple-800 mb-2 px-2">
                                              {category.category}
                                            </div>
                                            <div className="space-y-1">
                                              {category.notes.map((note, noteIdx) => {
                                                const currentNotes = tempEditData.notes || "";
                                                const isAlreadySelected = currentNotes.includes(note);
                                                
                                                return (
                                                  <button
                                                    key={noteIdx}
                                                    onClick={() => {
                                                      // Prevent duplicate note selection
                                                      if (isAlreadySelected) return;
                                                      
                                                      const newNotes = currentNotes 
                                                        ? `${currentNotes}. ${note}`
                                                        : note;
                                                      setTempEditData({ ...tempEditData, notes: newNotes });
                                                    }}
                                                    disabled={isAlreadySelected}
                                                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all flex items-start gap-2 group ${
                                                      isAlreadySelected 
                                                        ? "bg-gray-100 text-gray-400 cursor-pointer opacity-60" 
                                                        : "text-gray-700 hover:bg-purple-50 hover:text-purple-900"
                                                    }`}
                                                  >
                                                    <Sparkles className={`h-3.5 w-3.5 mt-0.5 flex-shrink-0 ${
                                                      isAlreadySelected 
                                                        ? "text-gray-300" 
                                                        : "text-purple-400 group-hover:text-purple-600"
                                                    }`} />
                                                    <span>{note}</span>
                                                  </button>
                                                );
                                              })}
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  {editingTreatment && (
                    <div className="p-5 bg-orange-50/50 rounded-xl border-2 border-orange-300 border-l-4 border-l-orange-500">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="font-semibold text-gray-900 text-lg">{editingTreatment}</span>
                          <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs text-orange-700 bg-orange-100 font-medium border border-orange-200">
                            ⏳ Incomplete
                          </span>
                        </div>
                        <button
                          onClick={() => setEditingTreatment(null)}
                          className="text-gray-400 hover:text-red-500 transition-colors p-1 hover:bg-red-50 rounded-md"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Validation Message */}
        {selectedTreatments.length > 0 && (editingTreatment || selectedTreatments.some((t) => !t.frequency || !t.startDate)) && (
          <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-4 mb-6 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
            <div>
              <div className="font-medium text-orange-900">Please complete all treatment details</div>
              <div className="text-sm text-orange-700">
                Make sure each treatment has frequency and start date
              </div>
            </div>
          </div>
        )}

        {/* Navigation Footer */}
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate("/symptom-mapping")}
              className="w-full sm:w-40"
            >
              Back
            </Button>
            <div className="text-center flex-shrink-0">
              <div className="text-sm font-medium text-gray-900">Step 3 of 4</div>
              <div className="text-sm text-gray-600">
                {completeTreatments} of {totalTreatmentsIncludingEditing} treatments complete
              </div>
            </div>
            <Button
              type="button"
              variant="primary"
              onClick={handleContinue}
              disabled={!isFormValid}
              className="w-full sm:w-40"
            >
              Continue to Step 4
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}