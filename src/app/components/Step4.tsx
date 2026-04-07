import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { Button } from "./ui/button";
import { Calendar, Activity, Pill, FileText, TrendingUp, AlertCircle, Pencil, Check, X, Search, Sparkles } from "lucide-react";
import { Logo } from "./Logo";
import { DragScrollContainer } from "./DragScrollContainer";
import { Input } from "./ui/input";
import { DatePicker } from "./ui/date-picker";
import { Combobox } from "./ui/combobox";
import { StyledSlider } from "./ui/styled-slider";
import { formatMedicalCondition, MedicalTermTracker, formatMedicalConditionList } from "../../utils/medical-formatting";
import { capitalizeName, capitalizeFirst, capitalizeAllSentences } from "../../utils/text-formatting";

// Symptom suggestions from Step2
const symptomSuggestions = [
  "Abdominal pain", "Lower abdominal pain", "Upper abdominal pain", "Acute pain", "Aching", "General body ache",
  "Anxiety", "Agitation", "Apathy", "Ataxia", "Aphasia", "Amnesia", "Arrhythmia",
  "Arm numbness", "Left arm numbness", "Right arm numbness", "Arm tingling", "Arm pain", "Arm weakness",
  "Back pain", "Lower back pain", "Upper back pain", "Balance problems", "Blurred vision",
  "Burning sensation", "Burning pain", "Brain fog", "Bloating", "Breathlessness",
  "Chest pain", "Chest tightness", "Chronic pain", "Confusion", "Cramps", "Constipation", "Cough",
  "Dizziness", "Double vision", "Dry eyes", "Dry mouth", "Difficulty speaking", "Difficulty swallowing", "Depression",
  "Exhaustion", "Extreme fatigue", "Electric shock sensation", "Eye pain", "Edema", "Elevated heart rate",
  "Fatigue", "Fever", "Facial numbness", "Facial weakness", "Fainting", "Foot numbness",
  "General weakness", "Gait disturbance", "Gastrointestinal pain",
  "Headache", "Migraine", "Heart palpitations", "Heart racing", "Hearing loss",
  "Hand numbness", "Hand tingling", "Hand weakness",
  "Irregular heartbeat", "Insomnia", "Inflammation", "Imbalance",
  "Joint pain", "Jaw pain",
  "Knee pain", "Knee weakness",
  "Leg numbness", "Left leg numbness", "Right leg numbness", "Lower leg numbness",
  "Leg tingling", "Leg pain", "Leg weakness", "Left foot numbness", "Right foot numbness",
  "Loss of balance", "Loss of coordination", "Loss of sensation", "Low energy", "Lethargy",
  "Muscle pain", "Muscle weakness", "Muscle spasm", "Memory loss", "Mood changes",
  "Numbness", "Nausea", "Neck pain", "Nerve pain", "Night sweats",
  "Overheating", "Ocular pain", "Orthostatic dizziness",
  "Pain", "Pins and needles", "Palpitations", "Pressure in chest", "Poor concentration",
  "Quick heartbeat", "Queasiness",
  "Ringing in ears", "Restlessness", "Respiratory issues",
  "Stiffness", "Spasticity", "Sensitivity to light", "Sensitivity to sound", "Seizures",
  "Sleep disturbance", "Shortness of breath", "Skin sensitivity", "Swelling",
  "Tingling", "Tremor", "Tinnitus", "Tightness", "Throat pain",
  "Unsteadiness", "Urinary urgency", "Urinary frequency",
  "Vision loss", "Visual disturbances", "Vertigo", "Vomiting",
  "Weakness", "Walking difficulty", "Weight loss", "Weight gain"
];

// Treatment suggestions from Step3
const treatmentSuggestions = {
  medications: [
    "Rituximab", "Ocrelizumab", "Adalimumab", "Infliximab", "Etanercept", "Natalizumab",
    "Tocilizumab", "Satralizumab", "Azathioprine", "Mycophenolate", "Methotrexate",
    "Cyclophosphamide", "Prednisone", "Methylprednisolone", "Dexamethasone",
    "IVIG (Intravenous Immunoglobulin)", "Plasmapheresis", "Interferon Beta-1a",
    "Interferon Beta-1b", "Glatiramer Acetate", "Fingolimod", "Teriflunomide",
    "Dimethyl Fumarate", "Alemtuzumab", "Mitoxantrone", "Baclofen", "Tizanidine",
    "Gabapentin", "Pregabalin", "Amantadine", "Modafinil"
  ],
  therapies: [
    "Physical Therapy", "Occupational Therapy", "Speech Therapy", "Cognitive Behavioral Therapy",
    "Aquatic Therapy", "Massage Therapy", "Acupuncture", "Chiropractic Care",
    "Vestibular Rehabilitation", "Pelvic Floor Therapy"
  ],
  supplements: [
    "Vitamin D", "Vitamin B12", "Omega-3 Fatty Acids", "Magnesium", "Calcium",
    "Probiotics", "Turmeric/Curcumin", "Coenzyme Q10", "Alpha Lipoic Acid",
    "Ginkgo Biloba", "Biotin"
  ],
  lifestyle: [
    "Diet Modification", "Exercise Program", "Yoga", "Pilates", "Swimming",
    "Walking Program", "Stress Management", "Sleep Hygiene", "Anti-inflammatory Diet",
    "Meditation Practice"
  ]
};

// Flatten all treatments for search
const allTreatmentNames = [
  ...treatmentSuggestions.medications,
  ...treatmentSuggestions.therapies,
  ...treatmentSuggestions.supplements,
  ...treatmentSuggestions.lifestyle
];

interface Step1Data {
  firstName: string;
  lastName: string;
  dob: string;
  gender: string;
  country: string;
  city: string;
  primaryDiagnosis: string;
  diagnosisDate: string;
  additionalConditions: string[];
  attacks: Array<{ id: string; date: string; notes: string }>;
  appointments: Array<{ id: string; date: string }>;
  consent: boolean;
}

interface SymptomDetail {
  name: string;
  severity: number;
  pattern: string;
  startDate: string;
  treatmentRelated: boolean | undefined;
  improvedAfterTreatment: boolean | undefined;
  lifeImpact: string[];
  notes?: string;
}

interface TreatmentDetail {
  name: string;
  category: string;
  treatmentPurpose: "diagnosis" | "symptom" | "both";
  selectedSymptoms: string[];
  linkedDiagnoses?: string[];
  linkedSymptoms?: string[];
  dosage?: string;
  frequency: string;
  startDate: string;
  effectiveness: number;
  notes?: string;
}

export function Step4() {
  const navigate = useNavigate();
  const [researchConsent, setResearchConsent] = useState<"agree" | "decline" | null>(null);

  // Editing states for each section
  const [editingPatientStory, setEditingPatientStory] = useState(false);
  const [editingDiagnoses, setEditingDiagnoses] = useState(false);
  const [editingAttackHistory, setEditingAttackHistory] = useState(false);
  const [editingTreatmentOverview, setEditingTreatmentOverview] = useState(false);
  const [editingSymptomMapping, setEditingSymptomMapping] = useState(false);
  const [showSaveNotification, setShowSaveNotification] = useState(false);

  // Temp edit data
  const [tempPatientStory, setTempPatientStory] = useState("");
  const [tempDiagnosis, setTempDiagnosis] = useState({
    primaryDiagnosis: "",
    diagnosisDate: "",
    additionalConditions: [] as string[],
  });
  const [tempAttacks, setTempAttacks] = useState<Array<{ id: string; date: string; notes: string }>>([]);
  const [tempTreatments, setTempTreatments] = useState<TreatmentDetail[]>([]);
  const [tempSymptoms, setTempSymptoms] = useState<SymptomDetail[]>([]);

  // Search states for dropdowns
  const [treatmentSearchQueries, setTreatmentSearchQueries] = useState<Record<number, string>>({});
  const [symptomSearchQueries, setSymptomSearchQueries] = useState<Record<number, string>>({});
  const [showTreatmentSuggestions, setShowTreatmentSuggestions] = useState<Record<number, boolean>>({});
  const [showSymptomSuggestions, setShowSymptomSuggestions] = useState<Record<number, boolean>>({});

  // Save handlers
  const handleSavePatientStory = () => {
    const step1Data = localStorage.getItem("symptomapStep1");
    if (step1Data) {
      const data = JSON.parse(step1Data);
      data.patientStory = tempPatientStory;
      localStorage.setItem("symptomapStep1", JSON.stringify(data));
    }
    setEditingPatientStory(false);
    showSaveMessage();
  };

  const handleSaveDiagnoses = () => {
    const step1Data = localStorage.getItem("symptomapStep1");
    if (step1Data) {
      const data = JSON.parse(step1Data);
      data.primaryDiagnosis = tempDiagnosis.primaryDiagnosis;
      data.diagnosisDate = tempDiagnosis.diagnosisDate;
      data.additionalConditions = tempDiagnosis.additionalConditions;
      localStorage.setItem("symptomapStep1", JSON.stringify(data));
    }
    setEditingDiagnoses(false);
    showSaveMessage();
    // Force re-render to update Patient Story
    setTimeout(() => window.location.reload(), 500);
  };

  const handleSaveAttackHistory = () => {
    const step1Data = localStorage.getItem("symptomapStep1");
    if (step1Data) {
      const data = JSON.parse(step1Data);
      data.attacks = tempAttacks;
      localStorage.setItem("symptomapStep1", JSON.stringify(data));
    }
    setEditingAttackHistory(false);
    showSaveMessage();
    setTimeout(() => window.location.reload(), 500);
  };

  const handleSaveTreatmentOverview = () => {
    const step3Data = localStorage.getItem("symptomapStep3");
    if (step3Data) {
      localStorage.setItem("symptomapStep3", JSON.stringify(tempTreatments));
    }
    setEditingTreatmentOverview(false);
    showSaveMessage();
    setTimeout(() => window.location.reload(), 500);
  };

  const handleSaveSymptomMapping = () => {
    const step2Data = localStorage.getItem("symptomapStep2");
    if (step2Data) {
      localStorage.setItem("symptomapStep2", JSON.stringify(tempSymptoms));
    }
    setEditingSymptomMapping(false);
    showSaveMessage();
    setTimeout(() => window.location.reload(), 500);
  };

  const showSaveMessage = () => {
    setShowSaveNotification(true);
    setTimeout(() => setShowSaveNotification(false), 2000);
  };

  const handleCancelEdit = () => {
    setEditingPatientStory(false);
    setEditingDiagnoses(false);
    setEditingAttackHistory(false);
    setEditingTreatmentOverview(false);
    setEditingSymptomMapping(false);
    setTempPatientStory("");
    setTempDiagnosis({ primaryDiagnosis: "", diagnosisDate: "", additionalConditions: [] });
    setTempAttacks([]);
    setTempTreatments([]);
    setTempSymptoms([]);
    // Reset search states
    setTreatmentSearchQueries({});
    setSymptomSearchQueries({});
    setShowTreatmentSuggestions({});
    setShowSymptomSuggestions({});
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.treatment-search-container') && !target.closest('.symptom-search-container')) {
        setShowTreatmentSuggestions({});
        setShowSymptomSuggestions({});
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Load data from localStorage using correct keys
  const loadUserData = () => {
    try {
      const step1Data = localStorage.getItem("symptomapStep1");
      const step2Data = localStorage.getItem("symptomapStep2");
      const step3Data = localStorage.getItem("symptomapStep3");

      return {
        step1: step1Data ? (JSON.parse(step1Data) as Step1Data) : null,
        step2: step2Data ? (JSON.parse(step2Data) as SymptomDetail[]) : [],
        step3: step3Data ? (JSON.parse(step3Data) as TreatmentDetail[]) : [],
      };
    } catch (error) {
      console.error("Error loading user data:", error);
      return { step1: null, step2: [], step3: [] };
    }
  };

  const userData = loadUserData();

  // Use imported utility for medical condition formatting
  const getDiagnosisLabel = formatMedicalCondition;

  // Format date to DD.MM.YYYY
  const formatDate = (dateString: string) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  const symptoms = userData.step2 || [];
  const treatments = userData.step3 || [];

  // Extract data
  const firstName = userData.step1?.firstName ? capitalizeName(userData.step1.firstName) : undefined;
  const diagnosisDate = formatDate(userData.step1?.diagnosisDate || "");
  const additionalConditions = userData.step1?.additionalConditions || [];
  const firstAttack = userData.step1?.attacks?.[0];
  const firstAttackDate = firstAttack ? formatDate(firstAttack.date) : null;

  // Categorize treatments
  const primaryDiagnosisTreatments = treatments.filter(t => 
    t.linkedDiagnoses && t.linkedDiagnoses.includes(userData.step1?.primaryDiagnosis || "")
  );
  const symptomaticTreatments = treatments.filter(t => 
    !t.linkedDiagnoses || !t.linkedDiagnoses.includes(userData.step1?.primaryDiagnosis || "")
  );

  // Generate Patient Story - Clinical Narrative
  const generatePatientStory = () => {
    if (!userData.step1?.primaryDiagnosis) return null;

    const patientName = firstName || "This patient";
    const tracker = new MedicalTermTracker();
    let story = "";

    // DIAGNOSIS - First mention with full name + abbreviation
    const primaryDiagnosisFormatted = tracker.format(userData.step1.primaryDiagnosis);
    story += `${patientName} was diagnosed with ${primaryDiagnosisFormatted}`;
    if (diagnosisDate) {
      story += ` on ${diagnosisDate}`;
    }
    story += ".";

    // COMORBIDITIES - Each is a first mention
    if (additionalConditions.length > 0) {
      const conditionsList = formatMedicalConditionList(additionalConditions);
      story += ` Additional comorbidities include ${conditionsList}.`;
    }

    // DISEASE COURSE
    if (firstAttackDate) {
      story += ` The first clinical attack occurred on ${firstAttackDate}.`;
      
      // Mention pre-attack symptoms if any
      if (symptomsBeforeAttack.length > 0) {
        const symptomNames = symptomsBeforeAttack.map(s => s.name.toLowerCase()).join(", ");
        story += ` Prior to the attack, the patient experienced ${symptomNames}.`;
      }
    }

    // CURRENT SYMPTOMS
    if (symptoms.length > 0) {
      story += `\n\nThe patient currently reports ${symptoms.length} active symptom${symptoms.length > 1 ? 's' : ''}, including `;
      const topSymptoms = symptoms
        .sort((a, b) => b.severity - a.severity)
        .slice(0, 3)
        .map(s => `${s.name.toLowerCase()} (severity ${s.severity}/10)`);
      story += topSymptoms.join(", ") + ".";
    }

    // TREATMENT REGIMEN
    if (treatments.length > 0) {
      story += `\n\n`;
      
      if (primaryDiagnosisTreatments.length > 0) {
        // Use abbreviation for subsequent mention of primary diagnosis
        const diagnosisRef = tracker.format(userData.step1.primaryDiagnosis);
        story += `Current disease-modifying treatment${primaryDiagnosisTreatments.length > 1 ? 's' : ''} for ${diagnosisRef} include${primaryDiagnosisTreatments.length === 1 ? 's' : ''} `;
        const treatmentDetails = primaryDiagnosisTreatments.map(t => {
          let detail = t.name;
          if (t.effectiveness !== undefined) {
            detail += ` (patient-reported effectiveness: ${t.effectiveness}/10)`;
          }
          return detail;
        });
        story += treatmentDetails.join("; ") + ".";
      }
      
      if (symptomaticTreatments.length > 0) {
        story += ` `;
        story += `Symptomatic management includes ${symptomaticTreatments.map(t => t.name).join(", ")}.`;
      }
    }

    return story;
  };

  // Find symptoms before attack
  const getSymptomsBeforeAttack = () => {
    if (!firstAttack) return [];
    
    const attackDate = new Date(firstAttack.date);
    return symptoms.filter(s => {
      if (!s.startDate) return false;
      const symptomDate = new Date(s.startDate);
      return symptomDate < attackDate;
    });
  };

  const symptomsBeforeAttack = getSymptomsBeforeAttack();

  const handleGenerateReport = () => {
    // Research consent choice is optional - allow report generation either way
    const consentData = {
      researchConsent: researchConsent === "agree",
      choice: researchConsent,
      submittedAt: new Date().toISOString(),
    };
    
    localStorage.setItem("symptomapConsent", JSON.stringify(consentData));
    localStorage.setItem("symptomapStep4Completed", "true");
    
    navigate("/report-preview");
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "medications":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "therapies":
        return "bg-purple-100 text-purple-700 border-purple-200";
      case "supplements":
        return "bg-green-100 text-green-700 border-green-200";
      case "lifestyle":
        return "bg-orange-100 text-orange-700 border-orange-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  // Get frequency label
  const getFrequencyLabel = (id: string) => {
    const frequencyMap: Record<string, string> = {
      "daily": "Daily",
      "twice-daily": "Twice Daily",
      "weekly": "Weekly",
      "bi-weekly": "Bi-weekly",
      "monthly": "Monthly",
      "every-3-months": "Every 3 Months",
      "as-needed": "As Needed",
    };
    return frequencyMap[id] || id;
  };

  const patientStory = generatePatientStory();

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
              <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center text-sm font-medium">
                ✓
              </div>
              <span className="text-sm font-medium text-gray-500">Treatment & Therapy</span>
            </div>
            <div className="w-12 h-0.5 bg-gray-300"></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-medium">
                4
              </div>
              <span className="text-sm font-medium text-gray-900">Medical Summary</span>
            </div>
          </div>
        </div>

        {/* Page Title */}
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-semibold text-gray-900">Medical Summary</h1>
          <p className="text-base text-gray-600 mt-2">
            Review your complete health profile
          </p>
        </div>

        {/* Save Notification */}
        {showSaveNotification && (
          <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 z-50">
            <Check className="h-5 w-5" />
            <span className="font-medium">Saved</span>
          </div>
        )}

        {/* Patient Story */}
        {patientStory && (
          <div className="bg-white rounded-2xl shadow-sm p-8 mb-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-900">Patient Story</h2>
              </div>
              {!editingPatientStory && (
                <button
                  onClick={() => {
                    setTempPatientStory(patientStory);
                    setEditingPatientStory(true);
                  }}
                  className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Edit patient story"
                >
                  <Pencil className="h-4 w-4" />
                </button>
              )}
            </div>
            
            {editingPatientStory ? (
              <div className="space-y-4">
                <textarea
                  value={tempPatientStory}
                  onChange={(e) => setTempPatientStory(e.target.value)}
                  className="w-full h-48 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 leading-relaxed resize-none"
                  placeholder="Enter patient story..."
                />
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSavePatientStory}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
                  >
                    <Check className="h-4 w-4" />
                    Save
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center gap-2"
                  >
                    <X className="h-4 w-4" />
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {patientStory}
              </p>
            )}
          </div>
        )}

        {/* Diagnoses Section */}
        {userData.step1?.primaryDiagnosis && (
          <div className="bg-white rounded-2xl shadow-sm p-8 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Diagnoses</h2>
              {!editingDiagnoses && (
                <button
                  onClick={() => {
                    setTempDiagnosis({
                      primaryDiagnosis: userData.step1?.primaryDiagnosis || "",
                      diagnosisDate: userData.step1?.diagnosisDate || "",
                      additionalConditions: userData.step1?.additionalConditions || [],
                    });
                    setEditingDiagnoses(true);
                  }}
                  className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Edit diagnoses"
                >
                  <Pencil className="h-4 w-4" />
                </button>
              )}
            </div>
            
            {editingDiagnoses ? (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Primary Diagnosis
                  </label>
                  <Input
                    value={getDiagnosisLabel(tempDiagnosis.primaryDiagnosis)}
                    readOnly
                    className="bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Diagnosis Date
                  </label>
                  <DatePicker
                    value={tempDiagnosis.diagnosisDate}
                    onChange={(e) => setTempDiagnosis({ ...tempDiagnosis, diagnosisDate: e.target.value })}
                  />
                </div>
                <div className="flex items-center gap-2 pt-2">
                  <button
                    onClick={handleSaveDiagnoses}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
                  >
                    <Check className="h-4 w-4" />
                    Save
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center gap-2"
                  >
                    <X className="h-4 w-4" />
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Primary Diagnosis */}
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-2">Primary Diagnosis</p>
                  <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-semibold text-gray-900">{formatMedicalCondition(userData.step1?.primaryDiagnosis || "")}</p>
                        {diagnosisDate && (
                          <p className="text-sm text-gray-600 mt-1">Diagnosed on {diagnosisDate}</p>
                        )}
                      </div>
                      <Activity className="h-5 w-5 text-blue-600" />
                    </div>
                  </div>
                </div>

                {/* Additional Conditions */}
                {additionalConditions.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-2">Additional Conditions</p>
                    <div className="space-y-2">
                      {additionalConditions.map((condition, index) => (
                        <div key={index} className="p-3 rounded-lg bg-gray-50 border border-gray-200">
                          <p className="text-gray-900">{getDiagnosisLabel(condition)}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Attack History */}
        {firstAttackDate && (() => {
          // Create timeline events array
          const timelineEvents: Array<{
            date: Date;
            dateString: string;
            label: string;
            type: "symptom" | "attack" | "first-attack" | "diagnosis";
            subtitle?: string;
            description?: string;
          }> = [];

          // Add diagnosis date if available
          if (userData.step1?.diagnosisDate) {
            timelineEvents.push({
              date: new Date(userData.step1.diagnosisDate),
              dateString: formatDate(userData.step1.diagnosisDate) || "",
              label: "Diagnosis",
              subtitle: getDiagnosisLabel(userData.step1.primaryDiagnosis),
              type: "diagnosis",
            });
          }

          // Add symptoms that occurred before attack
          symptomsBeforeAttack.forEach(symptom => {
            if (symptom.startDate) {
              timelineEvents.push({
                date: new Date(symptom.startDate),
                dateString: formatDate(symptom.startDate) || "",
                label: "Symptom Onset",
                subtitle: symptom.name,
                type: "symptom",
              });
            }
          });

          // Add all attacks (only if date exists)
          userData.step1?.attacks.forEach((attack, index) => {
            if (attack.date) {
              timelineEvents.push({
                date: new Date(attack.date),
                dateString: formatDate(attack.date) || "",
                label: index === 0 ? "First Clinical Attack" : `Attack ${index + 1}`,
                type: index === 0 ? "first-attack" : "attack",
                description: attack.notes ? capitalizeFirst(attack.notes) : undefined,
              });
            }
          });

          // Sort by date (earliest to latest)
          timelineEvents.sort((a, b) => a.date.getTime() - b.date.getTime());

          // If no events, don't render
          if (timelineEvents.length === 0) return null;

          return (
            <div className="bg-white rounded-2xl shadow-sm p-8 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-orange-600" />
                  <h2 className="text-xl font-semibold text-gray-900">Attack History</h2>
                </div>
                {!editingAttackHistory && (
                  <button
                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Edit attack history"
                    onClick={() => {
                      setTempAttacks(userData.step1?.attacks || []);
                      setEditingAttackHistory(true);
                    }}
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                )}
              </div>

              {editingAttackHistory ? (
                <div className="space-y-6">
                  <p className="text-sm text-gray-600 mb-4">Edit your attack history below:</p>
                  {tempAttacks.map((attack, index) => (
                    <div key={attack.id} className="p-4 border border-gray-200 rounded-lg space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Attack {index + 1} - Date
                        </label>
                        <DatePicker
                          value={attack.date}
                          onChange={(e) => {
                            const updated = [...tempAttacks];
                            updated[index].date = e.target.value;
                            setTempAttacks(updated);
                          }}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                        <textarea
                          value={attack.notes}
                          onChange={(e) => {
                            const updated = [...tempAttacks];
                            updated[index].notes = e.target.value;
                            setTempAttacks(updated);
                          }}
                          className="w-full h-24 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 resize-none"
                          placeholder="Any notes about this attack..."
                        />
                      </div>
                    </div>
                  ))}
                  <div className="flex items-center gap-2 pt-2">
                    <button
                      onClick={handleSaveAttackHistory}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
                    >
                      <Check className="h-4 w-4" />
                      Save
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center gap-2"
                    >
                      <X className="h-4 w-4" />
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
              {/* Vertical Timeline */}
              <div className="relative pl-8">
                {/* Vertical Line */}
                <div className="absolute left-[15px] top-0 bottom-0 w-0.5 bg-gray-200"></div>

                {/* Timeline Events */}
                {timelineEvents.map((event, index) => {
                  const isLast = index === timelineEvents.length - 1;
                  
                  return (
                    <div key={index} className={`relative ${!isLast ? 'pb-10' : ''}`}>
                      {/* Event Dot */}
                      <div
                        className={`absolute left-[-31px] rounded-full border-4 border-white shadow-sm ${
                          event.type === "diagnosis"
                            ? "w-5 h-5 bg-blue-500"
                            : event.type === "first-attack"
                            ? "w-5 h-5 bg-orange-500"
                            : event.type === "attack"
                            ? "w-4 h-4 bg-orange-400"
                            : "w-3.5 h-3.5 bg-blue-400"
                        }`}
                        style={{ top: '4px' }}
                      ></div>

                      {/* Event Content Card */}
                      <div className={`ml-4 p-4 rounded-xl border transition-all ${
                        event.type === "diagnosis"
                          ? "bg-blue-50/50 border-blue-200"
                          : event.type === "first-attack"
                          ? "bg-orange-50/50 border-orange-200"
                          : event.type === "attack"
                          ? "bg-orange-50/30 border-orange-100"
                          : "bg-blue-50/30 border-blue-100"
                      }`}>
                        {/* Date Badge */}
                        <div className="flex items-center gap-3 mb-2">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold ${
                            event.type === "diagnosis"
                              ? "bg-blue-100 text-blue-700 border border-blue-200"
                              : event.type === "first-attack"
                              ? "bg-orange-100 text-orange-700 border border-orange-200"
                              : event.type === "attack"
                              ? "bg-orange-50 text-orange-600 border border-orange-200"
                              : "bg-blue-50 text-blue-600 border border-blue-200"
                          }`}>
                            {event.dateString}
                          </span>
                        </div>

                        {/* Event Title */}
                        <h3 className={`font-semibold text-base mb-1 ${
                          event.type === "diagnosis"
                            ? "text-blue-900"
                            : event.type === "first-attack" || event.type === "attack"
                            ? "text-orange-900"
                            : "text-blue-800"
                        }`}>
                          {event.label}
                        </h3>

                        {/* Event Subtitle/Description */}
                        {(event.subtitle || event.description) && (
                          <p className="text-sm text-gray-700 leading-relaxed">
                            {event.subtitle || event.description}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
              </>
              )}
            </div>
          );
        })()}

        {/* If no attack history */}
        {!firstAttackDate && userData.step1 && (
          <div className="bg-white rounded-2xl shadow-sm p-8 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="h-5 w-5 text-gray-400" />
              <h2 className="text-xl font-semibold text-gray-900">Attack History</h2>
            </div>
            <p className="text-sm text-gray-500">No attack history recorded yet</p>
          </div>
        )}

        {/* Treatment Overview */}
        {treatments.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm p-8 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Pill className="h-5 w-5 text-green-600" />
                <h2 className="text-xl font-semibold text-gray-900">Treatment Overview</h2>
              </div>
              <button
                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                title="Edit treatments"
                onClick={() => {
                  setTempTreatments([...treatments]);
                  setEditingTreatmentOverview(true);
                }}
              >
                <Pencil className="h-4 w-4" />
              </button>
            </div>

            {editingTreatmentOverview ? (
              <div className="space-y-6">
                <p className="text-sm text-gray-600 mb-4">Edit your treatments below:</p>
                {tempTreatments.map((treatment, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Treatment Name</label>
                      <div className="relative treatment-search-container">
                        <div className="relative">
                          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <input
                            type="text"
                            placeholder="Search treatments..."
                            value={treatmentSearchQueries[index] || treatment.name}
                            onChange={(e) => {
                              setTreatmentSearchQueries({ ...treatmentSearchQueries, [index]: e.target.value });
                              setShowTreatmentSuggestions({ ...showTreatmentSuggestions, [index]: true });
                            }}
                            onFocus={() => setShowTreatmentSuggestions({ ...showTreatmentSuggestions, [index]: true })}
                            className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                          />
                          <Sparkles className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-purple-500" />
                        </div>
                        
                        {/* Treatment suggestions dropdown */}
                        {showTreatmentSuggestions[index] && (treatmentSearchQueries[index] || "").length > 0 && (() => {
                          const searchQuery = treatmentSearchQueries[index] || "";
                          const filteredTreatments = allTreatmentNames.filter(name =>
                            name.toLowerCase().includes(searchQuery.toLowerCase())
                          );
                          
                          return filteredTreatments.length > 0 ? (
                            <div className="absolute z-10 w-full mt-2 bg-white border-2 border-purple-300 rounded-xl shadow-lg max-h-48 overflow-y-auto">
                              <div className="p-3 bg-purple-50 border-b border-purple-100 flex items-center gap-2">
                                <Sparkles className="h-4 w-4 text-purple-600" />
                                <span className="text-xs font-medium text-purple-900 uppercase tracking-wide">AI Suggestions</span>
                              </div>
                              {filteredTreatments.slice(0, 10).map((name, idx) => (
                                <button
                                  key={idx}
                                  onClick={() => {
                                    const updated = [...tempTreatments];
                                    updated[index].name = name;
                                    setTempTreatments(updated);
                                    setTreatmentSearchQueries({ ...treatmentSearchQueries, [index]: name });
                                    setShowTreatmentSuggestions({ ...showTreatmentSuggestions, [index]: false });
                                  }}
                                  className="w-full text-left px-4 py-3 hover:bg-purple-50 transition-colors text-gray-900 border-b border-gray-100 last:border-b-0"
                                >
                                  {name}
                                </button>
                              ))}
                            </div>
                          ) : null;
                        })()}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                      <DatePicker
                        value={treatment.startDate}
                        onChange={(e) => {
                          const updated = [...tempTreatments];
                          updated[index].startDate = e.target.value;
                          setTempTreatments(updated);
                        }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Dosage</label>
                      <Input
                        value={treatment.dosage || ''}
                        onChange={(e) => {
                          const updated = [...tempTreatments];
                          updated[index].dosage = e.target.value;
                          setTempTreatments(updated);
                        }}
                        placeholder="e.g., 500mg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Effectiveness: {treatment.effectiveness}/10</label>
                      <StyledSlider
                        value={[treatment.effectiveness]}
                        onValueChange={(value) => {
                          const updated = [...tempTreatments];
                          updated[index].effectiveness = value[0];
                          setTempTreatments(updated);
                        }}
                        max={10}
                        step={1}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                      <textarea
                        value={treatment.notes || ''}
                        onChange={(e) => {
                          const updated = [...tempTreatments];
                          updated[index].notes = e.target.value;
                          setTempTreatments(updated);
                        }}
                        className="w-full h-24 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 resize-none"
                        placeholder="Any additional notes..."
                      />
                    </div>
                  </div>
                ))}
                <div className="flex items-center gap-2 pt-2">
                  <button
                    onClick={handleSaveTreatmentOverview}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
                  >
                    <Check className="h-4 w-4" />
                    Save
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center gap-2"
                  >
                    <X className="h-4 w-4" />
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
            {/* Treatments for Primary Diagnosis */}
            {primaryDiagnosisTreatments.length > 0 && (
              <div className="mb-6">
                <p className="text-sm font-medium text-gray-600 mb-3">Treatments for Primary Diagnosis</p>
                <div className="space-y-3">
                  {primaryDiagnosisTreatments.map((treatment, treatmentIndex) => (
                    <div key={treatmentIndex} className="p-4 rounded-lg border-2 border-blue-200 bg-blue-50">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-semibold text-gray-900">{treatment.name}</p>
                          {treatment.startDate && (
                            <p className="text-sm text-gray-600">Started {formatDate(treatment.startDate)}</p>
                          )}
                        </div>
                        <span className={`px-3 py-1 rounded-lg text-xs font-medium border ${getCategoryColor(treatment.category)}`}>
                          {treatment.category}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-3 mt-3 text-sm">
                        {treatment.frequency && (
                          <div>
                            <span className="text-gray-600">Frequency: </span>
                            <span className="font-medium text-gray-900">{getFrequencyLabel(treatment.frequency)}</span>
                          </div>
                        )}
                        {treatment.dosage && (
                          <div>
                            <span className="text-gray-600">Dosage: </span>
                            <span className="font-medium text-gray-900">{treatment.dosage}</span>
                          </div>
                        )}
                      </div>

                      {treatment.effectiveness !== undefined && (
                        <div className="mt-3">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-600">Patient-reported effectiveness</span>
                            <span className="text-sm font-semibold text-gray-900">{treatment.effectiveness}/10</span>
                          </div>
                          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                              style={{ width: `${(treatment.effectiveness / 10) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      )}

                      {treatment.notes && (
                        <div className="mt-3 pt-3 border-t border-blue-200">
                          <p className="text-sm text-gray-700">{treatment.notes}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Symptomatic Treatments */}
            {symptomaticTreatments.length > 0 && (
              <div>
                <p className="text-sm font-medium text-gray-600 mb-3">Symptomatic Treatments</p>
                <div className="space-y-3">
                  {symptomaticTreatments.map((treatment, treatmentIndex) => (
                    <div key={treatmentIndex} className="p-4 rounded-lg border border-gray-200 bg-gray-50">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-semibold text-gray-900">{treatment.name}</p>
                          {treatment.startDate && (
                            <p className="text-sm text-gray-600">Started {formatDate(treatment.startDate)}</p>
                          )}
                        </div>
                        <span className={`px-3 py-1 rounded-lg text-xs font-medium border ${getCategoryColor(treatment.category)}`}>
                          {treatment.category}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-3 mt-3 text-sm">
                        {treatment.frequency && (
                          <div>
                            <span className="text-gray-600">Frequency: </span>
                            <span className="font-medium text-gray-900">{getFrequencyLabel(treatment.frequency)}</span>
                          </div>
                        )}
                        {treatment.dosage && (
                          <div>
                            <span className="text-gray-600">Dosage: </span>
                            <span className="font-medium text-gray-900">{treatment.dosage}</span>
                          </div>
                        )}
                      </div>

                      {treatment.effectiveness !== undefined && (
                        <div className="mt-3">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-600">Patient-reported effectiveness</span>
                            <span className="text-sm font-semibold text-gray-900">{treatment.effectiveness}/10</span>
                          </div>
                          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                              style={{ width: `${(treatment.effectiveness / 10) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      )}

                      {treatment.notes && (
                        <div className="mt-3 pt-3 border-t border-gray-200">
                          <p className="text-sm text-gray-700">{treatment.notes}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            </>
            )}
          </div>
        )}

        {/* Symptom-Treatment Mapping */}
        {symptoms.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm p-8 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-purple-600" />
                <h2 className="text-xl font-semibold text-gray-900">Symptom–Treatment Mapping</h2>
              </div>
              <button
                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                title="Edit symptoms"
                onClick={() => {
                  setTempSymptoms([...symptoms]);
                  setEditingSymptomMapping(true);
                }}
              >
                <Pencil className="h-4 w-4" />
              </button>
            </div>

            {editingSymptomMapping ? (
              <div className="space-y-6">
                <p className="text-sm text-gray-600 mb-4">Edit your symptoms below:</p>
                {tempSymptoms.map((symptom, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Symptom Name</label>
                      <div className="relative symptom-search-container">
                        <div className="relative">
                          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <input
                            type="text"
                            placeholder="Search symptoms..."
                            value={symptomSearchQueries[index] || symptom.name}
                            onChange={(e) => {
                              setSymptomSearchQueries({ ...symptomSearchQueries, [index]: e.target.value });
                              setShowSymptomSuggestions({ ...showSymptomSuggestions, [index]: true });
                            }}
                            onFocus={() => setShowSymptomSuggestions({ ...showSymptomSuggestions, [index]: true })}
                            className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                          />
                          <Sparkles className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-purple-500" />
                        </div>
                        
                        {/* Symptom suggestions dropdown */}
                        {showSymptomSuggestions[index] && (symptomSearchQueries[index] || "").length > 0 && (() => {
                          const searchQuery = symptomSearchQueries[index] || "";
                          const filteredSymptoms = symptomSuggestions.filter(name =>
                            name.toLowerCase().includes(searchQuery.toLowerCase())
                          );
                          
                          return filteredSymptoms.length > 0 ? (
                            <div className="absolute z-10 w-full mt-2 bg-white border-2 border-purple-300 rounded-xl shadow-lg max-h-48 overflow-y-auto">
                              <div className="p-3 bg-purple-50 border-b border-purple-100 flex items-center gap-2">
                                <Sparkles className="h-4 w-4 text-purple-600" />
                                <span className="text-xs font-medium text-purple-900 uppercase tracking-wide">AI Suggestions</span>
                              </div>
                              {filteredSymptoms.slice(0, 10).map((name, idx) => (
                                <button
                                  key={idx}
                                  onClick={() => {
                                    const updated = [...tempSymptoms];
                                    updated[index].name = name;
                                    setTempSymptoms(updated);
                                    setSymptomSearchQueries({ ...symptomSearchQueries, [index]: name });
                                    setShowSymptomSuggestions({ ...showSymptomSuggestions, [index]: false });
                                  }}
                                  className="w-full text-left px-4 py-3 hover:bg-purple-50 transition-colors text-gray-900 border-b border-gray-100 last:border-b-0"
                                >
                                  {name}
                                </button>
                              ))}
                            </div>
                          ) : null;
                        })()}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Severity: {symptom.severity}/10</label>
                      <StyledSlider
                        value={[symptom.severity]}
                        onValueChange={(value) => {
                          const updated = [...tempSymptoms];
                          updated[index].severity = value[0];
                          setTempSymptoms(updated);
                        }}
                        max={10}
                        step={1}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Pattern</label>
                      <Input
                        value={symptom.pattern}
                        onChange={(e) => {
                          const updated = [...tempSymptoms];
                          updated[index].pattern = e.target.value;
                          setTempSymptoms(updated);
                        }}
                        placeholder="e.g., Daily, Intermittent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">First Noticed Date</label>
                      <DatePicker
                        value={symptom.startDate}
                        onChange={(e) => {
                          const updated = [...tempSymptoms];
                          updated[index].startDate = e.target.value;
                          setTempSymptoms(updated);
                        }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                      <textarea
                        value={symptom.notes || ''}
                        onChange={(e) => {
                          const updated = [...tempSymptoms];
                          updated[index].notes = e.target.value;
                          setTempSymptoms(updated);
                        }}
                        className="w-full h-24 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 resize-none"
                        placeholder="Additional symptom details..."
                      />
                    </div>
                  </div>
                ))}
                <div className="flex items-center gap-2 pt-2">
                  <button
                    onClick={handleSaveSymptomMapping}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
                  >
                    <Check className="h-4 w-4" />
                    Save
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center gap-2"
                  >
                    <X className="h-4 w-4" />
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
            <div className="space-y-6">
              {symptoms.map((symptom, index) => {
                // Find treatments linked to this symptom by name
                const linkedTreatments = treatments.filter(t => 
                  t.linkedSymptoms && t.linkedSymptoms.includes(symptom.name)
                );

                return (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    {/* Symptom Details */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-900 text-lg">{symptom.name}</h3>
                        <span className="text-sm font-medium text-gray-600">Severity: {symptom.severity}/10</span>
                      </div>
                  
                      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mb-3">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                          style={{ width: `${(symptom.severity / 10) * 100}%` }}
                        ></div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-sm">
                        {symptom.pattern && (
                          <div>
                            <span className="text-gray-500">Pattern: </span>
                            <span className="text-gray-900">{symptom.pattern}</span>
                          </div>
                        )}
                        {symptom.startDate && (
                          <div>
                            <span className="text-gray-500">First noticed: </span>
                            <span className="text-gray-900">{formatDate(symptom.startDate)}</span>
                          </div>
                        )}
                        {symptom.lifeImpact && symptom.lifeImpact.length > 0 && (
                          <div className="col-span-2">
                            <span className="text-gray-500">Impact on: </span>
                            <span className="text-gray-900">{symptom.lifeImpact.join(", ")}</span>
                          </div>
                        )}
                      </div>

                      {symptom.notes && (
                        <div className="mt-3 pt-3 border-t border-gray-200">
                          <p className="text-sm text-gray-700">{capitalizeFirst(symptom.notes)}</p>
                        </div>
                      )}
                    </div>

                    {/* Linked Treatments */}
                    {linkedTreatments.length > 0 && (
                      <div className="pt-4 border-t border-gray-200">
                        <p className="text-sm font-medium text-gray-600 mb-3">Associated Treatments:</p>
                        <div className="space-y-2">
                          {linkedTreatments.map((treatment, idx) => (
                            <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                              <div className="flex items-center gap-2">
                                <span className="text-gray-400">→</span>
                                <span className="font-medium text-gray-900">{treatment.name}</span>
                              </div>
                              <span className="text-sm font-medium text-gray-700">
                                effectiveness {treatment.effectiveness}/10
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            )}
          </div>
        )}

        {/* Consent Section */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Research Contribution</h2>
          <p className="text-sm text-gray-600 mb-4 leading-relaxed">
            Your data will be securely stored in the system. You can choose whether to contribute anonymously to research in neuroinflammatory diseases like MOGAD, NMOSD, and Multiple Sclerosis.
          </p>
          
          <div className="space-y-3 mb-4">
            {/* Option 1: Agree to contribute */}
            <label className={`flex items-start gap-3 cursor-pointer p-4 rounded-lg border-2 transition-all ${
              researchConsent === "agree" 
                ? "border-blue-500 bg-blue-50" 
                : "border-gray-200 hover:border-blue-300"
            }`}>
              <input
                type="radio"
                name="researchConsent"
                checked={researchConsent === "agree"}
                onChange={() => setResearchConsent("agree")}
                className="mt-0.5 h-5 w-5 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  I agree to anonymously contribute my data to research
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Help advance medical research while remaining fully anonymous
                </p>
              </div>
            </label>

            {/* Option 2: Decline research contribution */}
            <label className={`flex items-start gap-3 cursor-pointer p-4 rounded-lg border-2 transition-all ${
              researchConsent === "decline" 
                ? "border-blue-500 bg-blue-50" 
                : "border-gray-200 hover:border-blue-300"
            }`}>
              <input
                type="radio"
                name="researchConsent"
                checked={researchConsent === "decline"}
                onChange={() => setResearchConsent("decline")}
                className="mt-0.5 h-5 w-5 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  I prefer not to share my data for research, but still want to generate my report
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Your report will be generated, and your data will remain private
                </p>
              </div>
            </label>
          </div>

          <div className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg">
            <AlertCircle className="h-4 w-4 text-gray-600 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-gray-600 leading-relaxed">
              <strong>Note:</strong> Your data is always stored securely in the system. This choice only affects whether your anonymized data can be used for research purposes.
            </p>
          </div>
        </div>

        {/* Navigation Footer */}
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <div className="grid grid-cols-2 gap-4">
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate("/treatment-therapy")}
              className="w-full"
            >
              Back
            </Button>
            <Button
              type="button"
              variant="primary"
              onClick={handleGenerateReport}
              className="w-full"
            >
              Generate Medical Report
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Step4;