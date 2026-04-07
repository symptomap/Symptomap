import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Button } from "./ui/button";
import { DatePicker } from "./ui/date-picker";
import { Progress } from "./ui/progress";
import { Sparkles, X, Search, Activity, Zap, TrendingUp, AlertCircle, FileQuestion, Moon, Briefcase, Footprints, Brain, Home, CheckCircle2 } from "lucide-react";
import { Logo } from "./Logo";
import { capitalizeFirst } from "../../utils/text-formatting";

// Step 2: Symptom Mapping Component
// Symptom suggestions data
const symptomSuggestions = [
  // A
  "Abdominal pain",
  "Lower abdominal pain",
  "Upper abdominal pain",
  "Acute pain",
  "Aching",
  "General body ache",
  "Anxiety",
  "Agitation",
  "Apathy",
  "Ataxia",
  "Aphasia",
  "Amnesia",
  "Arrhythmia",
  "Arm numbness",
  "Left arm numbness",
  "Right arm numbness",
  "Arm tingling",
  "Arm pain",
  "Arm weakness",

  // B
  "Back pain",
  "Lower back pain",
  "Upper back pain",
  "Balance problems",
  "Blurred vision",
  "Burning sensation",
  "Burning pain",
  "Brain fog",
  "Bloating",
  "Breathlessness",

  // C
  "Chest pain",
  "Chest tightness",
  "Chronic pain",
  "Confusion",
  "Cramps",
  "Constipation",
  "Cough",

  // D
  "Dizziness",
  "Double vision",
  "Dry eyes",
  "Dry mouth",
  "Difficulty speaking",
  "Difficulty swallowing",
  "Depression",

  // E
  "Exhaustion",
  "Extreme fatigue",
  "Electric shock sensation",
  "Eye pain",
  "Edema",
  "Elevated heart rate",

  // F
  "Fatigue",
  "Fever",
  "Facial numbness",
  "Facial weakness",
  "Fainting",
  "Foot numbness",

  // G
  "General weakness",
  "Gait disturbance",
  "Gastrointestinal pain",

  // H
  "Headache",
  "Migraine",
  "Heart palpitations",
  "Heart racing",
  "Hearing loss",
  "Hand numbness",
  "Hand tingling",
  "Hand weakness",

  // I
  "Irregular heartbeat",
  "Insomnia",
  "Inflammation",
  "Imbalance",

  // J
  "Joint pain",
  "Jaw pain",

  // K
  "Knee pain",
  "Knee weakness",

  // L
  "Leg numbness",
  "Left leg numbness",
  "Right leg numbness",
  "Lower leg numbness",
  "Left lower leg numbness",
  "Right lower leg numbness",
  "Lower leg skin numbness",
  "Left lower leg skin numbness",
  "Right lower leg skin numbness",
  "Leg tingling",
  "Leg pain",
  "Leg weakness",
  "Left foot numbness",
  "Right foot numbness",
  "Left toe numbness",
  "Right toe numbness",
  "Loss of balance",
  "Loss of coordination",
  "Loss of sensation",
  "Low energy",
  "Lethargy",

  // M
  "Muscle pain",
  "Muscle weakness",
  "Muscle spasm",
  "Memory loss",
  "Mood changes",

  // N
  "Numbness",
  "Nausea",
  "Neck pain",
  "Nerve pain",
  "Night sweats",

  // O
  "Overheating",
  "Ocular pain",
  "Orthostatic dizziness",

  // P
  "Pain",
  "Pins and needles",
  "Palpitations",
  "Pressure in chest",
  "Poor concentration",

  // Q
  "Quick heartbeat",
  "Queasiness",

  // R
  "Restlessness",
  "Reduced sensation",
  "Radiating pain",

  // S
  "Shortness of breath",
  "Stiffness",
  "Spasms",
  "Sensory loss",
  "Speech difficulties",
  "Sensitivity to light",

  // T
  "Tingling",
  "Tremor",
  "Tachycardia",
  "Tightness in chest",
  "Tiredness",

  // U
  "Unsteadiness",
  "Urinary urgency",
  "Upper body weakness",

  // V
  "Vertigo",
  "Vision problems",
  "Visual disturbance",

  // W
  "Weakness",
  "Walking difficulty",
  "Worsening fatigue",

  // Y
  "Yawning excessively",
  "Yellow vision",

  // Z
  "Zoning out",
  "Drowsiness"
];

// Symptom explanations for tooltips
const symptomExplanations: Record<string, string> = {
  "Leg weakness": "Reduced strength in the leg muscles that can make walking or standing difficult.",
  "Arm weakness": "Reduced strength in the arm muscles affecting grip and lifting ability.",
  "Hand weakness": "Reduced strength in the hand affecting grip and fine motor tasks.",
  "General weakness": "Overall reduction in physical strength affecting daily activities.",
  "Muscle weakness": "Reduced muscle strength that may affect movement and coordination.",
  "Facial weakness": "Weakness in facial muscles that may affect expressions and eating.",
  "Knee weakness": "Reduced stability and strength in the knee joint.",
  "Upper body weakness": "Reduced strength in the chest, arms, and shoulders.",
  "Numbness": "Loss of sensation or feeling in a body part.",
  "Hand numbness": "Loss of sensation in the hands, often with tingling.",
  "Leg numbness": "Loss of sensation in the legs that may affect walking.",
  "Arm numbness": "Loss of sensation in the arms that may affect coordination.",
  "Foot numbness": "Loss of sensation in the feet affecting balance and gait.",
  "Facial numbness": "Loss of sensation in the face that may affect eating or speaking.",
  "Left hand numbness": "Loss of sensation specifically in the left hand.",
  "Right hand numbness": "Loss of sensation specifically in the right hand.",
  "Left arm numbness": "Loss of sensation specifically in the left arm.",
  "Right arm numbness": "Loss of sensation specifically in the right arm.",
  "Left leg numbness": "Loss of sensation specifically in the left leg.",
  "Right leg numbness": "Loss of sensation specifically in the right leg.",
  "Lower leg numbness": "Loss of sensation in the lower legs from knee to ankle.",
  "Left lower leg numbness": "Loss of sensation in the left lower leg.",
  "Right lower leg numbness": "Loss of sensation in the right lower leg.",
  "Lower leg skin numbness": "Loss of sensation in the skin of the lower legs.",
  "Left lower leg skin numbness": "Loss of sensation in the skin of the left lower leg.",
  "Right lower leg skin numbness": "Loss of sensation in the skin of the right lower leg.",
  "Left foot numbness": "Loss of sensation specifically in the left foot.",
  "Right foot numbness": "Loss of sensation specifically in the right foot.",
  "Left toe numbness": "Loss of sensation specifically in the left toes.",
  "Right toe numbness": "Loss of sensation specifically in the right toes.",
  "Localized numbness": "Loss of sensation in a specific area of the body.",
  "Tingling": "Pins and needles sensation, often in hands or feet.",
  "Hand tingling": "Pins and needles sensation in the hands.",
  "Leg tingling": "Pins and needles sensation in the legs.",
  "Arm tingling": "Pins and needles sensation in the arms.",
  "Pins and needles": "Tingling sensation like small pricks on the skin.",
  "Fatigue": "Persistent tiredness that doesn't improve with rest.",
  "Extreme fatigue": "Overwhelming exhaustion that significantly limits daily activities.",
  "Worsening fatigue": "Fatigue that progressively gets worse over time.",
  "Brain fog": "Difficulty concentrating, confusion, or mental cloudiness.",
  "Memory loss": "Difficulty remembering information or recent events.",
  "Poor concentration": "Difficulty focusing attention on tasks.",
  "Blurred vision": "Unclear or hazy vision that affects clarity.",
  "Double vision": "Seeing two images of a single object.",
  "Vision problems": "General difficulties with sight or visual clarity.",
  "Visual disturbance": "Abnormal changes in vision or visual perception.",
  "Yellow vision": "Seeing a yellow tint or hue in visual perception.",
  "Dizziness": "Feeling lightheaded or unsteady.",
  "Vertigo": "Spinning sensation or feeling that the room is moving.",
  "Balance problems": "Difficulty maintaining stability while standing or walking.",
  "Loss of balance": "Inability to maintain stable posture or steady gait.",
  "Unsteadiness": "Lack of stability when standing or moving.",
  "Imbalance": "Difficulty maintaining equilibrium or steady posture.",
  "Walking difficulty": "Challenges with normal walking or gait.",
  "Gait disturbance": "Abnormal walking pattern or difficulty with mobility.",
  "Headache": "Pain or discomfort in the head or scalp.",
  "Migraine": "Severe headache often with sensitivity to light and sound.",
  "Eye pain": "Discomfort or pain in or around the eyes.",
  "Ocular pain": "Pain specifically in the eye itself.",
  "Back pain": "Discomfort or pain in the back area.",
  "Lower back pain": "Pain in the lumbar region of the spine.",
  "Upper back pain": "Pain in the thoracic region of the spine.",
  "Neck pain": "Discomfort or stiffness in the neck area.",
  "Joint pain": "Pain in the joints where bones meet.",
  "Knee pain": "Discomfort or pain in the knee joint.",
  "Left knee pain": "Pain specifically in the left knee.",
  "Right knee pain": "Pain specifically in the right knee.",
  "Muscle pain": "Discomfort or soreness in the muscles.",
  "Nerve pain": "Sharp or burning pain along nerve pathways.",
  "Chest pain": "Discomfort or pain in the chest area.",
  "Chest tightness": "Feeling of pressure or constriction in the chest.",
  "Abdominal pain": "Discomfort or pain in the stomach area.",
  "Lower abdominal pain": "Pain in the lower part of the abdomen.",
  "Upper abdominal pain": "Pain in the upper part of the abdomen.",
  "Gastrointestinal pain": "Discomfort in the digestive system.",
  "Jaw pain": "Discomfort or pain in the jaw area.",
  "Acute pain": "Sudden, sharp pain that comes on quickly.",
  "Chronic pain": "Long-lasting pain that persists for weeks or months.",
  "Burning pain": "Pain with a burning or scalding sensation.",
  "Radiating pain": "Pain that spreads from one area to another.",
  "Aching": "Dull, persistent pain or discomfort.",
  "General body ache": "Overall discomfort or soreness throughout the body.",
  "Pressure in chest": "Sensation of heaviness or squeezing in the chest.",
  "Pain": "Unpleasant physical sensation signaling distress.",
  "Burning sensation": "Feeling of heat or burning on the skin or internally.",
  "Electric shock sensation": "Brief, sharp jolt-like feeling through the body.",
  "Muscle spasm": "Sudden, involuntary muscle contraction.",
  "Spasms": "Involuntary muscle contractions or twitches.",
  "Cramps": "Sudden, painful muscle contractions.",
  "Muscle cramps": "Tight, painful muscle contractions that occur suddenly.",
  "Tremor": "Involuntary shaking or trembling movement.",
  "Stiffness": "Difficulty moving joints or muscles freely.",
  "Difficulty speaking": "Challenges with speech production or articulation.",
  "Speech difficulties": "Problems with speaking clearly or fluently.",
  "Aphasia": "Difficulty understanding or producing speech.",
  "Difficulty swallowing": "Trouble moving food or liquid from mouth to stomach.",
  "Shortness of breath": "Feeling unable to get enough air or breathe deeply.",
  "Breathlessness": "Difficulty breathing or feeling out of breath.",
  "Cough": "Reflex action to clear airways of irritants.",
  "Nausea": "Feeling of wanting to vomit or stomach upset.",
  "Queasiness": "Mild nausea or unsettled stomach feeling.",
  "Bloating": "Feeling of fullness or swelling in the abdomen.",
  "Constipation": "Difficulty passing stools or infrequent bowel movements.",
  "Anxiety": "Persistent worry, nervousness, or unease.",
  "Depression": "Persistent sadness or loss of interest in activities.",
  "Restlessness": "Inability to relax or stay still.",
  "Agitation": "Feeling irritable, anxious, or unable to settle.",
  "Mood changes": "Fluctuations in emotional state or temperament.",
  "Apathy": "Lack of interest, enthusiasm, or motivation.",
  "Confusion": "Difficulty thinking clearly or understanding.",
  "Insomnia": "Difficulty falling asleep or staying asleep.",
  "Drowsiness": "Feeling excessively sleepy or struggling to stay awake.",
  "Zoning out": "Brief periods of losing focus or awareness.",
  "Heart palpitations": "Awareness of heartbeat feeling fast, strong, or irregular.",
  "Heart racing": "Feeling like the heart is beating very fast.",
  "Tachycardia": "Abnormally fast heart rate over 100 beats per minute.",
  "Quick heartbeat": "Heart beating faster than normal.",
  "Irregular heartbeat": "Heart rhythm that is uneven or inconsistent.",
  "Arrhythmia": "Abnormal heart rhythm pattern.",
  "Elevated heart rate": "Heart rate higher than normal resting rate.",
  "Palpitations": "Noticeable heartbeat sensations.",
  "Hearing loss": "Reduced ability to hear sounds.",
  "Sensitivity to light": "Discomfort or pain when exposed to bright light.",
  "Dry eyes": "Lack of moisture in the eyes causing discomfort.",
  "Dry mouth": "Lack of saliva causing a parched feeling.",
  "Night sweats": "Excessive sweating during sleep.",
  "Overheating": "Feeling excessively hot or unable to cool down.",
  "Fever": "Elevated body temperature above normal.",
  "Fainting": "Temporary loss of consciousness.",
  "Edema": "Swelling caused by fluid buildup in tissues.",
  "Inflammation": "Swelling, redness, and warmth in body tissues.",
  "Urinary urgency": "Sudden, strong need to urinate.",
  "Orthostatic dizziness": "Dizziness when standing up from sitting or lying.",
  "Loss of coordination": "Difficulty with smooth, controlled movements.",
  "Ataxia": "Loss of muscle coordination affecting movement.",
  "Reduced sensation": "Decreased ability to feel touch or temperature.",
  "Loss of sensation": "Complete loss of feeling in an area.",
  "Sensory loss": "Reduction or loss of sensory perception.",
  "Hypersensitivity": "Excessive sensitivity to stimuli like touch or sound.",
  "Amnesia": "Loss of memory or inability to recall information.",
  "Low energy": "Persistent lack of physical or mental energy.",
  "Lethargy": "Sluggishness and lack of energy or enthusiasm.",
  "Exhaustion": "State of extreme physical or mental tiredness.",
  "Tiredness": "Feeling of needing rest or sleep.",
  "Yawning excessively": "Frequent yawning beyond normal patterns.",
  "Cognitive impairment": "Reduced mental function affecting thinking and memory."
};

const lifeImpactOptions = [
  { id: "sleep", label: "Sleep", icon: Moon, color: "purple" },
  { id: "work", label: "Work", icon: Briefcase, color: "blue" },
  { id: "mobility", label: "Mobility", icon: Footprints, color: "green" },
  { id: "cognition", label: "Cognition", icon: Brain, color: "violet" },
  { id: "daily-activities", label: "Daily Activities", icon: Home, color: "orange" },
];

// Life Impact color mapping for visual identity
const lifeImpactColorMap: Record<string, { pastel: string; medium: string; deep: string; bg: string; border: string }> = {
  sleep: { 
    pastel: "#E9D5FF", // soft purple
    medium: "#C084FC", 
    deep: "#A855F7",
    bg: "bg-purple-50",
    border: "border-purple-300"
  },
  work: { 
    pastel: "#BFDBFE", // soft blue
    medium: "#60A5FA", 
    deep: "#3B82F6",
    bg: "bg-blue-50",
    border: "border-blue-300"
  },
  mobility: { 
    pastel: "#BBF7D0", // soft green
    medium: "#10B981", 
    deep: "#10B981",
    bg: "bg-green-50",
    border: "border-green-300"
  },
  cognition: { 
    pastel: "#DDD6FE", // soft lilac/violet
    medium: "#A78BFA", 
    deep: "#8B5CF6",
    bg: "bg-violet-50",
    border: "border-violet-300"
  },
  "daily-activities": { 
    pastel: "#FED7AA", // soft orange
    medium: "#FB923C", 
    deep: "#F97316",
    bg: "bg-orange-50",
    border: "border-orange-300"
  },
};

// AI-powered trigger suggestions for symptom notes
const triggerSuggestions = [
  { 
    category: "Nutrition & Food",
    triggers: [
      "After eating dairy products",
      "After eating gluten",
      "After high-sugar meals",
      "After caffeine consumption",
      "When skipping meals",
      "After alcohol consumption",
      "After processed foods",
    ]
  },
  {
    category: "Timing & Schedule",
    triggers: [
      "In the morning upon waking",
      "In the afternoon (2-5 PM)",
      "In the evening",
      "At night before bed",
      "After waking up from sleep",
      "During specific times of day",
    ]
  },
  {
    category: "Physical Activity",
    triggers: [
      "After physical exercise",
      "After walking or standing for long periods",
      "After lifting heavy objects",
      "During sedentary periods",
      "After stretching or yoga",
    ]
  },
  {
    category: "Stress & Mental State",
    triggers: [
      "During stressful situations",
      "After anxiety or worry",
      "During emotional distress",
      "After work-related stress",
      "During relaxation or rest",
    ]
  },
  {
    category: "Sleep & Rest",
    triggers: [
      "After poor sleep quality",
      "After insufficient sleep",
      "After oversleeping",
      "During sleep deprivation",
      "After napping",
    ]
  },
  {
    category: "Environmental",
    triggers: [
      "After bright light exposure",
      "After prolonged screen time",
      "In fluorescent lighting",
      "In direct sunlight",
      "In darkness or dim light",
      "During weather changes",
      "In hot temperatures",
      "In cold temperatures",
      "During humid conditions",
    ]
  },
  {
    category: "Health Events",
    triggers: [
      "After viral infection",
      "After bacterial infection",
      "During menstrual period",
      "Before menstrual period",
      "During ovulation",
      "After vaccination",
      "During medication changes",
    ]
  },
  {
    category: "Other Patterns",
    triggers: [
      "When fatigued or exhausted",
      "After dehydration",
      "During temperature changes",
      "After bathing or showering",
      "In crowded spaces",
      "After exposure to strong smells",
    ]
  },
];

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

export default function Step2() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSymptoms, setSelectedSymptoms] = useState<SymptomDetail[]>([]);
  const [editingSymptom, setEditingSymptom] = useState<string | null>(null);
  const [editingInSummary, setEditingInSummary] = useState<string | null>(null);
  const [tempEditData, setTempEditData] = useState<Partial<SymptomDetail>>({});
  const [currentDetails, setCurrentDetails] = useState<Partial<SymptomDetail>>({
    severity: 5,
    pattern: "",
    startDate: "",
    treatmentRelated: undefined,
    improvedAfterTreatment: undefined,
    lifeImpact: [],
    notes: "",
  });

  const [showNotesSuggestions, setShowNotesSuggestions] = useState(false);
  const [tooltipSymptom, setTooltipSymptom] = useState<string | null>(null);

  const filteredSuggestions = symptomSuggestions.filter(
    (symptom) =>
      symptom.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !selectedSymptoms.some((s) => s.name === symptom) &&
      editingSymptom !== symptom
  );

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Close tooltip when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setTooltipSymptom(null);
    };
    
    if (tooltipSymptom) {
      document.addEventListener('click', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [tooltipSymptom]);

  const addSymptom = (symptomName: string) => {
    // Prevent duplicate symptom selection
    if (selectedSymptoms.some((s) => s.name === symptomName)) {
      return;
    }
    
    setEditingSymptom(symptomName);
    setSearchQuery("");
    setShowSuggestions(false);
    setCurrentDetails({
      severity: 5,
      pattern: "",
      startDate: "",
      treatmentRelated: undefined,
      improvedAfterTreatment: undefined,
      lifeImpact: [],
      notes: "",
    });
  };

  const saveSymptomDetails = () => {
    if (
      editingSymptom &&
      currentDetails.pattern &&
      currentDetails.startDate &&
      currentDetails.treatmentRelated !== undefined &&
      currentDetails.improvedAfterTreatment !== undefined
    ) {
      setSelectedSymptoms([
        ...selectedSymptoms,
        {
          name: editingSymptom,
          severity: currentDetails.severity || 5,
          pattern: currentDetails.pattern,
          startDate: currentDetails.startDate,
          treatmentRelated: currentDetails.treatmentRelated!,
          improvedAfterTreatment: currentDetails.improvedAfterTreatment!,
          lifeImpact: currentDetails.lifeImpact || [],
          notes: currentDetails.notes || "",
        },
      ]);
      setEditingSymptom(null);
      setCurrentDetails({
        severity: 5,
        pattern: "",
        startDate: "",
        treatmentRelated: undefined,
        improvedAfterTreatment: undefined,
        lifeImpact: [],
        notes: "",
      });
    }
  };

  const removeSymptom = (symptomName: string) => {
    setSelectedSymptoms(selectedSymptoms.filter((s) => s.name !== symptomName));
    if (editingSymptom === symptomName) {
      setEditingSymptom(null);
    }
    if (editingInSummary === symptomName) {
      setEditingInSummary(null);
    }
  };

  // Inline editing handlers
  const startInlineEdit = (symptom: SymptomDetail) => {
    setEditingInSummary(symptom.name);
    setTempEditData({ ...symptom });
  };

  const saveInlineEdit = () => {
    if (editingInSummary && tempEditData) {
      setSelectedSymptoms(
        selectedSymptoms.map((s) =>
          s.name === editingInSummary
            ? { ...s, ...tempEditData }
            : s
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

  const getSeverityLabel = (severity: number) => {
    if (severity <= 3) return "Mild";
    if (severity <= 7) return "Moderate";
    return "Severe";
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

  const getSeverityColor = (severity: number) => {
    const color = getGradientColorAtPosition(severity);
    return { color, backgroundColor: `${color}15` }; // 15 is ~8% opacity in hex
  };

  const averageSeverity =
    selectedSymptoms.length > 0
      ? (selectedSymptoms.reduce((sum, s) => sum + s.severity, 0) / selectedSymptoms.length).toFixed(1)
      : "0.0";

  const treatmentRelatedCount = selectedSymptoms.filter((s) => s.treatmentRelated).length;

  const completeSymptoms = selectedSymptoms.filter(
    (s) => s.pattern && s.startDate && s.treatmentRelated !== undefined && s.improvedAfterTreatment !== undefined
  ).length;

  const totalSymptomsIncludingEditing = selectedSymptoms.length + (editingSymptom ? 1 : 0);

  // Progress calculation based on target of 5 symptoms for 100% completion
  const TARGET_SYMPTOM_COUNT = 5;
  const progressPercentage = Math.min((completeSymptoms / TARGET_SYMPTOM_COUNT) * 100, 100);

  const isCurrentSymptomComplete =
    editingSymptom &&
    currentDetails.pattern &&
    currentDetails.startDate &&
    currentDetails.treatmentRelated !== undefined &&
    currentDetails.improvedAfterTreatment !== undefined;

  const isFormValid = selectedSymptoms.length > 0 && completeSymptoms === selectedSymptoms.length && !editingSymptom;

  const handleContinue = () => {
    if (isFormValid) {
      localStorage.setItem("symptomapStep2", JSON.stringify(selectedSymptoms));
      navigate("/treatment-therapy");
    }
  };

  // Helper function to get color classes for life impact options
  const getImpactColorClasses = (color: string, isSelected: boolean) => {
    const colorMap: Record<string, { bg: string; border: string; text: string; iconBg: string; hover: string }> = {
      purple: {
        bg: isSelected ? "bg-purple-50" : "bg-white",
        border: isSelected ? "border-purple-400" : "border-gray-200",
        text: isSelected ? "text-purple-700" : "text-gray-700",
        iconBg: isSelected ? "bg-purple-100" : "bg-gray-100",
        hover: isSelected ? "" : "hover:bg-purple-50/50 hover:border-purple-300 hover:shadow-sm",
      },
      blue: {
        bg: isSelected ? "bg-blue-50" : "bg-white",
        border: isSelected ? "border-blue-400" : "border-gray-200",
        text: isSelected ? "text-blue-700" : "text-gray-700",
        iconBg: isSelected ? "bg-blue-100" : "bg-gray-100",
        hover: isSelected ? "" : "hover:bg-blue-50/50 hover:border-blue-300 hover:shadow-sm",
      },
      green: {
        bg: isSelected ? "bg-green-50" : "bg-white",
        border: isSelected ? "border-green-400" : "border-gray-200",
        text: isSelected ? "text-green-700" : "text-gray-700",
        iconBg: isSelected ? "bg-green-100" : "bg-gray-100",
        hover: isSelected ? "" : "hover:bg-green-50/50 hover:border-green-300 hover:shadow-sm",
      },
      violet: {
        bg: isSelected ? "bg-violet-50" : "bg-white",
        border: isSelected ? "border-violet-400" : "border-gray-200",
        text: isSelected ? "text-violet-700" : "text-gray-700",
        iconBg: isSelected ? "bg-violet-100" : "bg-gray-100",
        hover: isSelected ? "" : "hover:bg-violet-50/50 hover:border-violet-300 hover:shadow-sm",
      },
      orange: {
        bg: isSelected ? "bg-orange-50" : "bg-white",
        border: isSelected ? "border-orange-400" : "border-gray-200",
        text: isSelected ? "text-orange-700" : "text-gray-700",
        iconBg: isSelected ? "bg-orange-100" : "bg-gray-100",
        hover: isSelected ? "" : "hover:bg-orange-50/50 hover:border-orange-300 hover:shadow-sm",
      },
    };
    return colorMap[color] || colorMap.blue;
  };

  // Helper function to format date for display
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleDateString("en-US", { month: "short" });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  // Helper function to get blended gradient based on Life Impact selections
  const getLifeImpactGradient = (lifeImpacts: string[], severity?: number) => {
    if (!lifeImpacts || lifeImpacts.length === 0) {
      return "linear-gradient(90deg, #E5E7EB 0%, #D1D5DB 100%)"; // gray fallback
    }

    // Map the selected impacts to their colors
    const colors = lifeImpacts.map(impact => {
      const colorData = lifeImpactColorMap[impact];
      if (!colorData) return "#E5E7EB";
      
      // Use pastel for low count, medium for moderate, deep for many impacts
      if (lifeImpacts.length === 1) return colorData.pastel;
      if (lifeImpacts.length <= 3) return colorData.medium;
      return colorData.deep;
    });

    // Adjust opacity/intensity based on severity if provided
    const opacityMultiplier = severity ? (severity / 10) : 1;
    
    // Create smooth gradient
    if (colors.length === 1) {
      return `linear-gradient(90deg, ${colors[0]} 0%, ${colors[0]} 100%)`;
    } else {
      const step = 100 / (colors.length - 1);
      const gradientStops = colors.map((color, index) => 
        `${color} ${index * step}%`
      ).join(', ');
      return `linear-gradient(90deg, ${gradientStops})`;
    }
  };

  // Helper function to get overall progress gradient (all symptoms combined)
  const getOverallProgressGradient = () => {
    if (selectedSymptoms.length === 0) {
      return "linear-gradient(90deg, #E5E7EB 0%, #D1D5DB 100%)"; // gray
    }

    // Use the same blue → cyan → purple gradient as severity bars
    return "linear-gradient(90deg, #3B82F6 0%, #06B6D4 50%, #A855F7 100%)"; // blue-500 → cyan-500 → purple-500
  };

  // Helper function to get primary Life Impact color for border accent
  const getPrimaryLifeImpactColor = (lifeImpacts: string[]) => {
    if (!lifeImpacts || lifeImpacts.length === 0) {
      return { border: 'border-l-gray-400', bg: 'bg-gray-50/30' };
    }

    // Use the first selected impact as primary
    const primaryImpact = lifeImpacts[0];
    const colorData = lifeImpactColorMap[primaryImpact];
    
    if (!colorData) {
      return { border: 'border-l-gray-400', bg: 'bg-gray-50/30' };
    }

    return { 
      border: `border-l-[${colorData.medium}]`,
      bg: colorData.bg
    };
  };

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
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-medium">
                2
              </div>
              <span className="text-sm font-medium text-gray-900">Symptom Mapping</span>
            </div>
            <div className="w-12 h-0.5 bg-gray-300"></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center text-sm font-medium">
                3
              </div>
              <span className="text-sm font-medium text-gray-500">Treatment & Therapy</span>
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
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">Symptom Mapping</h1>
          <p className="text-gray-600">Help us understand your symptoms by providing detailed information</p>
        </div>

        {/* Select Your Symptoms Section - MOVED TO TOP */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Select Your Symptoms</h2>

          {/* Search Bar */}
          <div className="relative mb-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search symptoms (AI-powered)"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                className="w-full pl-12 pr-12 py-4 border-2 border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-900 placeholder-gray-400"
              />
              <Sparkles className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-purple-500" />
            </div>

            {/* AI Suggestions Dropdown */}
            {showSuggestions && searchQuery && filteredSuggestions.length > 0 && (
              <div className="absolute z-10 w-full mt-2 bg-white border-2 border-purple-300 rounded-xl shadow-lg max-h-60 overflow-y-auto">
                <div className="p-3 bg-purple-50 border-b border-purple-100 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-purple-600" />
                  <span className="text-sm font-medium text-purple-900">
                    AI-Powered Suggestions
                  </span>
                </div>
                {filteredSuggestions.map((symptom) => (
                  <button
                    key={symptom}
                    onClick={() => addSymptom(symptom)}
                    className="w-full px-4 py-3 text-left hover:bg-purple-50 text-gray-900 border-b border-gray-100 last:border-0"
                  >
                    {symptom}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* AI Helper Text */}
          <div className="flex items-start gap-2 text-sm text-gray-600">
            <Sparkles className="h-4 w-4 text-purple-500 mt-0.5 flex-shrink-0" />
            <p>Start typing to see AI-powered suggestions from our medical vocabulary</p>
          </div>

          {/* Selected Symptom Chips */}
          {(selectedSymptoms.length > 0 || editingSymptom) && (
            <div className="flex flex-wrap gap-2 mt-4">
              {selectedSymptoms.map((symptom) => (
                <div
                  key={symptom.name}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 text-blue-600 rounded-full border border-blue-200 text-sm relative"
                >
                  <span 
                    className="font-medium cursor-pointer hover:text-blue-700"
                    onClick={(e) => {
                      e.stopPropagation();
                      setTooltipSymptom(tooltipSymptom === symptom.name ? null : symptom.name);
                    }}
                  >
                    {symptom.name}
                  </span>
                  <button
                    onClick={() => removeSymptom(symptom.name)}
                    className="hover:bg-blue-100 rounded-full p-0.5"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                  {tooltipSymptom === symptom.name && symptomExplanations[symptom.name] && (
                    <div className="absolute z-50 top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-2 bg-purple-50/95 text-gray-900 text-sm font-medium leading-relaxed rounded-lg shadow-lg border border-purple-100 w-64 text-left line-clamp-2">
                      {symptomExplanations[symptom.name]}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 -mb-px">
                        <div className="border-4 border-transparent border-b-purple-50"></div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              {editingSymptom && (
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 text-blue-600 rounded-full border border-blue-200 text-sm relative">
                  <span 
                    className="font-medium cursor-pointer hover:text-blue-700"
                    onClick={(e) => {
                      e.stopPropagation();
                      setTooltipSymptom(tooltipSymptom === editingSymptom ? null : editingSymptom);
                    }}
                  >
                    {editingSymptom}
                  </span>
                  <button
                    onClick={() => setEditingSymptom(null)}
                    className="hover:bg-blue-100 rounded-full p-0.5"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                  {tooltipSymptom === editingSymptom && symptomExplanations[editingSymptom] && (
                    <div className="absolute z-50 top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-2 bg-purple-50/95 text-gray-900 text-sm font-medium leading-relaxed rounded-lg shadow-lg border border-purple-100 w-64 text-left line-clamp-2">
                      {symptomExplanations[editingSymptom]}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 -mb-px">
                        <div className="border-4 border-transparent border-b-purple-50"></div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Empty State Card - shown when no symptoms selected and not editing */}
        {!editingSymptom && selectedSymptoms.length === 0 && (
          <div className="bg-white rounded-2xl shadow-sm p-12 mb-6">
            <div className="flex flex-col items-center text-center">
              {/* Icon */}
              <div className="w-24 h-24 rounded-full bg-purple-100 flex items-center justify-center mb-6">
                <AlertCircle className="h-12 w-12 text-purple-400" />
              </div>
              {/* Title */}
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">No Symptoms Added Yet</h3>
              {/* Description */}
              <p className="text-gray-600 mb-2 max-w-md">
                Use the search bar above to start adding your symptoms
              </p>
              <p className="text-sm text-gray-500 max-w-md">
                You can add multiple symptoms and provide detailed information for each one
              </p>
            </div>
          </div>
        )}

        {/* Symptom Details Section */}
        {editingSymptom && (
          <div className="bg-white rounded-2xl shadow-sm p-8 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Symptom Details</h2>

            {/* Symptom Header */}
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900 mt-3 mb-2 leading-7">{editingSymptom}</h3>
                <button
                  onClick={() => setEditingSymptom(null)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>

            <div className="space-y-8">
              {/* Severity Level with Gradient Slider */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-medium text-gray-900">Severity Level</h4>
                  <div
                    className="px-4 py-2 rounded-lg font-semibold"
                    style={getSeverityColor(currentDetails.severity || 5)}
                  >
                    {currentDetails.severity} / 10
                  </div>
                </div>

                {/* Custom Gradient Slider */}
                <div className="relative">
                  {/* Gray background track */}
                  <div className="h-2 bg-gray-200 rounded-full"></div>
                  {/* Gradient filled portion up to selected value */}
                  <div 
                    className="absolute top-0 left-0 h-2 rounded-full bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500"
                    style={{ width: `${((currentDetails.severity || 5) - 1) / 9 * 100}%` }}
                  ></div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={currentDetails.severity || 5}
                    onChange={(e) =>
                      setCurrentDetails({ ...currentDetails, severity: parseInt(e.target.value) })
                    }
                    className="absolute top-0 w-full h-2 opacity-0 cursor-pointer"
                  />
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full shadow-md pointer-events-none"
                    style={{ 
                      left: `calc(${((currentDetails.severity || 5) - 1) * 11.11}% - 12px)`,
                      borderWidth: '4px',
                      borderColor: getGradientColorAtPosition(currentDetails.severity || 5)
                    }}
                  ></div>
                </div>

                {/* Slider Numbers */}
                <div className="flex justify-between text-sm text-gray-500 mt-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <span
                      key={num}
                      className={`${
                        num === currentDetails.severity ? "font-bold text-gray-900" : ""
                      }`}
                    >
                      {num}
                    </span>
                  ))}
                </div>

                {/* Severity Label */}
                <div className="flex justify-center mt-4">
                  <div
                    className="px-6 py-2 rounded-full font-medium"
                    style={getSeverityColor(currentDetails.severity || 5)}
                  >
                    {getSeverityLabel(currentDetails.severity || 5)}
                  </div>
                </div>
              </div>

              {/* Symptom Pattern - Card Selection */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-3">
                  Symptom Pattern <span className="text-red-500">*</span>
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Continuous - Blue */}
                  <button
                    onClick={() => setCurrentDetails({ ...currentDetails, pattern: "continuous" })}
                    className={`p-6 rounded-xl border-2 transition-all ${
                      currentDetails.pattern === "continuous"
                        ? "bg-blue-50 border-blue-500 shadow-md"
                        : "bg-white border-gray-200 hover:bg-blue-50/50 hover:border-blue-300 hover:shadow-sm"
                    }`}
                  >
                    <Activity
                      className={`h-8 w-8 mx-auto mb-3 transition-colors ${
                        currentDetails.pattern === "continuous" ? "text-blue-600" : "text-gray-400"
                      }`}
                    />
                    <div
                      className={`font-semibold mb-1 transition-colors ${
                        currentDetails.pattern === "continuous" ? "text-blue-900" : "text-gray-900"
                      }`}
                    >
                      Continuous
                    </div>
                    <div
                      className={`text-sm transition-colors ${
                        currentDetails.pattern === "continuous" ? "text-blue-700" : "text-gray-500"
                      }`}
                    >
                      Always present
                    </div>
                  </button>

                  {/* Attack-based - Red */}
                  <button
                    onClick={() =>
                      setCurrentDetails({ ...currentDetails, pattern: "attack-based" })
                    }
                    className={`p-6 rounded-xl border-2 transition-all ${
                      currentDetails.pattern === "attack-based"
                        ? "bg-red-50 border-red-500 shadow-md"
                        : "bg-white border-gray-200 hover:bg-red-50/50 hover:border-red-300 hover:shadow-sm"
                    }`}
                  >
                    <Zap
                      className={`h-8 w-8 mx-auto mb-3 ${
                        currentDetails.pattern === "attack-based" ? "text-red-600" : "text-gray-400"
                      }`}
                    />
                    <div
                      className={`font-semibold mb-1 ${
                        currentDetails.pattern === "attack-based" ? "text-red-900" : "text-gray-900"
                      }`}
                    >
                      Attack-based
                    </div>
                    <div
                      className={`text-sm ${
                        currentDetails.pattern === "attack-based" ? "text-red-700" : "text-gray-500"
                      }`}
                    >
                      Episodic flares
                    </div>
                  </button>

                  {/* Fluctuating - Orange */}
                  <button
                    onClick={() =>
                      setCurrentDetails({ ...currentDetails, pattern: "fluctuating" })
                    }
                    className={`p-6 rounded-xl border-2 transition-all ${
                      currentDetails.pattern === "fluctuating"
                        ? "bg-orange-50 border-orange-500 shadow-md"
                        : "bg-white border-gray-200 hover:bg-orange-50/50 hover:border-orange-300 hover:shadow-sm"
                    }`}
                  >
                    <TrendingUp
                      className={`h-8 w-8 mx-auto mb-3 transition-colors ${
                        currentDetails.pattern === "fluctuating" ? "text-orange-600" : "text-gray-400"
                      }`}
                    />
                    <div
                      className={`font-semibold mb-1 transition-colors ${
                        currentDetails.pattern === "fluctuating" ? "text-orange-900" : "text-gray-900"
                      }`}
                    >
                      Fluctuating
                    </div>
                    <div
                      className={`text-sm transition-colors ${
                        currentDetails.pattern === "fluctuating" ? "text-orange-700" : "text-gray-500"
                      }`}
                    >
                      Varies in intensity
                    </div>
                  </button>
                </div>
              </div>

              {/* Start Date */}
              <div>
                <DatePicker
                  label="When did this symptom start?"
                  required
                  value={currentDetails.startDate || ""}
                  onChange={(e) =>
                    setCurrentDetails({ ...currentDetails, startDate: e.target.value })
                  }
                />
              </div>

              {/* Treatment Relation */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-3">
                  Related to current treatment?
                </label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setCurrentDetails({ ...currentDetails, treatmentRelated: true })
                    }
                    className={`flex-1 px-4 py-2.5 rounded-lg border text-sm font-medium transition-all ${
                      currentDetails.treatmentRelated === true
                        ? "bg-blue-50 text-blue-700 border-blue-300"
                        : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setCurrentDetails({ ...currentDetails, treatmentRelated: false })
                    }
                    className={`flex-1 px-4 py-2.5 rounded-lg border text-sm font-medium transition-all ${
                      currentDetails.treatmentRelated === false
                        ? "bg-blue-50 text-blue-700 border-blue-300"
                        : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    No
                  </button>
                </div>
              </div>

              {/* Symptom Improvement After Treatment */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-3">
                  Symptom improved after treatment?
                </label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setCurrentDetails({ ...currentDetails, improvedAfterTreatment: true })
                    }
                    className={`flex-1 px-4 py-2.5 rounded-lg border text-sm font-medium transition-all ${
                      currentDetails.improvedAfterTreatment === true
                        ? "bg-blue-50 text-blue-700 border-blue-300"
                        : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setCurrentDetails({ ...currentDetails, improvedAfterTreatment: false })
                    }
                    className={`flex-1 px-4 py-2.5 rounded-lg border text-sm font-medium transition-all ${
                      currentDetails.improvedAfterTreatment === false
                        ? "bg-blue-50 text-blue-700 border-blue-300"
                        : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    No
                  </button>
                </div>
              </div>

              {/* Life Impact Selection */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-medium text-gray-900">
                    How does this symptom affect your life? <span className="text-gray-500 font-normal">(Optional)</span>
                  </h4>
                  {currentDetails.lifeImpact && currentDetails.lifeImpact.length > 0 && (
                    <span className="text-sm text-blue-600 font-medium">
                      {currentDetails.lifeImpact.length} selected
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-3">Helps your doctor understand daily impact</p>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {lifeImpactOptions.map((option) => {
                    const isSelected = currentDetails.lifeImpact?.includes(option.id);
                    const colorClasses = getImpactColorClasses(option.color, isSelected);
                    const IconComponent = option.icon;
                    
                    return (
                      <button
                        key={option.id}
                        onClick={() => {
                          const impacts = currentDetails.lifeImpact || [];
                          if (impacts.includes(option.id)) {
                            setCurrentDetails({
                              ...currentDetails,
                              lifeImpact: impacts.filter((i) => i !== option.id),
                            });
                          } else {
                            setCurrentDetails({
                              ...currentDetails,
                              lifeImpact: [...impacts, option.id],
                            });
                          }
                        }}
                        className={`p-5 md:p-4 rounded-xl border-2 transition-all flex flex-col items-center justify-center gap-2.5 md:gap-2 min-h-[110px] md:min-h-0 ${colorClasses.bg} ${colorClasses.border} ${colorClasses.hover} ${isSelected ? 'shadow-md' : ''}`}
                      >
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${colorClasses.iconBg}`}>
                          <IconComponent className={`h-6 w-6 ${colorClasses.text}`} />
                        </div>
                        <span className={`text-sm font-medium ${colorClasses.text} text-center leading-tight`}>
                          {option.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Additional Notes with AI Suggestions */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <h4 className="text-sm font-medium text-gray-900">
                    Additional Notes <span className="text-gray-500 font-normal">(Optional)</span>
                  </h4>
                  <div className="flex items-center gap-1 px-2 py-0.5 bg-purple-50 rounded-full">
                    <Sparkles className="h-3 w-3 text-purple-600" />
                    <span className="text-xs font-medium text-purple-700">AI</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  AI can help you describe triggers such as food, timing, exercise, stress, sleep, or other patterns
                </p>
                
                <div className="relative">
                  <textarea
                    value={currentDetails.notes || ""}
                    onChange={(e) => setCurrentDetails({ ...currentDetails, notes: e.target.value })}
                    onFocus={() => setShowNotesSuggestions(true)}
                    placeholder="E.g., 'After eating dairy' or 'During stressful work periods'..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none text-sm"
                    rows={3}
                  />
                  
                  {showNotesSuggestions && (
                    <div className="absolute z-10 w-full mt-2 bg-white rounded-xl shadow-lg border-2 border-purple-200 max-h-96 overflow-y-auto">
                      <div className="sticky top-0 bg-gradient-to-r from-purple-50 to-purple-100 px-4 py-3 border-b border-purple-200 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Sparkles className="h-4 w-4 text-purple-600" />
                          <span className="font-semibold text-purple-900 text-sm">AI Trigger Suggestions</span>
                        </div>
                        <button
                          onClick={() => setShowNotesSuggestions(false)}
                          className="text-purple-600 hover:text-purple-800 transition-colors"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                      
                      <div className="p-3 space-y-3">
                        {triggerSuggestions.map((category, idx) => (
                          <div key={idx}>
                            <div className="text-xs font-semibold text-purple-800 mb-2 px-2">
                              {category.category}
                            </div>
                            <div className="space-y-1">
                              {category.triggers.map((trigger, triggerIdx) => {
                                const currentNotes = currentDetails.notes || "";
                                const isAlreadySelected = currentNotes.includes(trigger);
                                
                                return (
                                  <button
                                    key={triggerIdx}
                                    onClick={() => {
                                      // Toggle behavior: add if not present, remove if already selected
                                      if (isAlreadySelected) {
                                        // Remove trigger from notes
                                        let updatedNotes = currentNotes;
                                        
                                        // Remove with period and space variations
                                        updatedNotes = updatedNotes.replace(`. ${trigger}`, "");
                                        updatedNotes = updatedNotes.replace(`${trigger}. `, "");
                                        updatedNotes = updatedNotes.replace(trigger, "");
                                        
                                        // Clean up extra periods and spaces
                                        updatedNotes = updatedNotes.replace(/\.\.+/g, ".");
                                        updatedNotes = updatedNotes.replace(/\s+/g, " ");
                                        updatedNotes = updatedNotes.replace(/^\s*\.\s*/, "");
                                        updatedNotes = updatedNotes.trim();
                                        
                                        setCurrentDetails({ ...currentDetails, notes: updatedNotes });
                                      } else {
                                        // Add trigger to notes
                                        const newNotes = currentNotes 
                                          ? `${currentNotes}. ${trigger}`
                                          : trigger;
                                        setCurrentDetails({ ...currentDetails, notes: newNotes });
                                      }
                                    }}
                                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all flex items-start gap-2 group ${
                                      isAlreadySelected 
                                        ? "bg-purple-100 text-purple-700 border border-purple-300" 
                                        : "text-gray-700 hover:bg-purple-50 hover:text-purple-900"
                                    }`}
                                  >
                                    <Sparkles className={`h-3.5 w-3.5 mt-0.5 flex-shrink-0 ${
                                      isAlreadySelected 
                                        ? "text-purple-600" 
                                        : "text-purple-400 group-hover:text-purple-600"
                                    }`} />
                                    <span>{trigger}</span>
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
                onClick={saveSymptomDetails}
                disabled={!isCurrentSymptomComplete}
                className="w-full"
              >
                Save Symptom Details
              </Button>
            </div>
          </div>
        )}

        {/* Symptom Summary Section */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-6">
          <div className="flex items-center gap-2 mb-6">
            <Activity className="h-5 w-5 text-blue-500" />
            <h2 className="text-xl font-semibold text-gray-900">Symptom Summary</h2>
          </div>

          <div className="space-y-6">
            {/* Progress Bar */}
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Progress</span>
                <span className="text-gray-500">
                  {completeSymptoms} of {TARGET_SYMPTOM_COUNT} symptoms tracked
                </span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                <div
                  className="h-full transition-all duration-300"
                  style={{ 
                    width: `${progressPercentage}%`,
                    background: getOverallProgressGradient()
                  }}
                ></div>
              </div>
              <div className="text-sm text-gray-500 mt-2">
                {Math.round(progressPercentage)}% complete
                {completeSymptoms >= TARGET_SYMPTOM_COUNT && (
                  <span className="ml-2 font-medium" style={{ color: '#10B981' }}>✓ Target reached!</span>
                )}
              </div>
            </div>

            {/* Empty State - Centered */}
            {totalSymptomsIncludingEditing === 0 && (
              <div className="flex flex-col items-center text-center py-12">
                <Activity className="h-16 w-16 text-gray-300 mb-4" />
                <p className="text-gray-600 mb-1">No symptoms added yet</p>
                <p className="text-sm text-gray-500">Use the search bar above to add symptoms</p>
              </div>
            )}

            {/* Selected Symptoms List - Only show when there are symptoms */}
            {totalSymptomsIncludingEditing > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">Selected Symptoms</h3>
                <div className="space-y-3">
                  {selectedSymptoms
                    .slice()
                    .sort((a, b) => {
                      // Sort by start date (oldest first)
                      const dateA = new Date(a.startDate).getTime();
                      const dateB = new Date(b.startDate).getTime();
                      return dateA - dateB;
                    })
                    .map((symptom) => {
                    // Get Life Impact-based color accent
                    const lifeImpactAccent = getPrimaryLifeImpactColor(symptom.lifeImpact);
                    const lifeImpactGradient = getLifeImpactGradient(symptom.lifeImpact, symptom.severity);
                    const isEditing = editingInSummary === symptom.name;
                    const editData = isEditing ? tempEditData : symptom;
                    
                    return (
                      <div
                        key={symptom.name}
                        className={`rounded-xl border transition-all ${
                          isEditing 
                            ? 'border-blue-400 border-2 shadow-lg' 
                            : `border-gray-200 ${lifeImpactAccent.border} border-l-4 hover:shadow-sm cursor-pointer`
                        }`}
                        onClick={() => !isEditing && startInlineEdit(symptom)}
                      >
                        {/* Summary View */}
                        {!isEditing && (
                          <div className="p-5 bg-white rounded-xl">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-center gap-2">
                                <h4 className="font-semibold text-gray-900 text-lg">{symptom.name}</h4>
                                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                                  <CheckCircle2 className="h-4 w-4" style={{ color: '#10B981' }} />
                                </div>
                              </div>
                              <button
                                onClick={(e) => { e.stopPropagation(); removeSymptom(symptom.name); }}
                                className="text-gray-400 hover:text-red-500 transition-colors p-1 hover:bg-red-50 rounded-md"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                            
                            {/* Tags/Badges Row */}
                            <div className="flex flex-wrap items-center gap-2 mb-3">
                              {/* Date Badge */}
                              <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs bg-gray-100 text-gray-700 font-medium border border-gray-200">
                                📅 {formatDate(symptom.startDate)}
                              </span>
                              
                              {/* Pattern Badge */}
                              <span className={`inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium border capitalize ${
                                symptom.pattern === 'continuous' 
                                  ? 'bg-blue-50 text-blue-700 border-blue-200'
                                  : symptom.pattern === 'attack-based'
                                  ? 'bg-red-50 text-red-700 border-red-200'
                                  : 'bg-orange-50 text-orange-700 border-orange-200'
                              }`}>
                                {symptom.pattern === 'continuous' ? '⚡' : symptom.pattern === 'attack-based' ? '💥' : '📊'} {symptom.pattern.replace('-', ' ')}
                              </span>
                              
                              {/* Life Impact Count Badge */}
                              <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs bg-purple-50 text-purple-700 font-medium border border-purple-200">
                                {symptom.lifeImpact.length} {symptom.lifeImpact.length === 1 ? 'impact' : 'impacts'}
                              </span>
                            </div>
                            
                            {/* Severity Section with Life Impact Colors */}
                            <div className="flex items-center gap-3">
                              <span className="text-xs text-gray-600 font-medium whitespace-nowrap">Severity</span>
                              <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden border border-gray-200">
                                <div
                                  className="h-full bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 transition-all"
                                  style={{ width: `${symptom.severity * 10}%` }}
                                ></div>
                              </div>
                              <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-bold border whitespace-nowrap bg-gray-50 text-gray-700 border-gray-200">
                                {symptom.severity}/10
                              </span>
                            </div>
                            
                            {/* Notes Display */}
                            {symptom.notes && symptom.notes.trim() !== "" && (
                              <div className="mt-3 p-3 bg-purple-50/50 rounded-lg border border-purple-200">
                                <div className="flex items-start gap-2">
                                  <Sparkles className="h-3.5 w-3.5 text-purple-600 mt-0.5 flex-shrink-0" />
                                  <div>
                                    <div className="text-xs font-semibold text-purple-800 mb-1">Notes</div>
                                    <p className="text-xs text-gray-700 leading-relaxed">{capitalizeFirst(symptom.notes)}</p>
                                  </div>
                                </div>
                              </div>
                            )}
                            
                            <div className="text-xs text-gray-500 mt-3 text-center">Click to edit</div>
                          </div>
                        )}

                        {/* Inline Edit View */}
                        {isEditing && (
                          <div className="p-6 space-y-6 bg-gradient-to-br from-blue-50/50 to-purple-50/30" onClick={(e) => e.stopPropagation()}>
                            {/* Header with Name */}
                            <div className="flex items-center justify-between">
                              <h4 className="text-xl font-semibold text-gray-900">{symptom.name}</h4>
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

                            {/* Severity Slider */}
                            <div>
                              <div className="flex items-center justify-between mb-3">
                                <span className="text-sm font-medium text-gray-900">Severity</span>
                                <span 
                                  className="px-3 py-1 rounded-lg font-semibold text-sm"
                                  style={getSeverityColor(editData.severity || 5)}
                                >
                                  {editData.severity}/10
                                </span>
                              </div>
                              <div className="relative">
                                {/* Gray background track */}
                                <div className="h-2 bg-gray-200 rounded-full"></div>
                                {/* Gradient filled portion up to selected value */}
                                <div 
                                  className="absolute top-0 left-0 h-2 rounded-full bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500"
                                  style={{ width: `${((editData.severity || 5) - 1) / 9 * 100}%` }}
                                ></div>
                                <input
                                  type="range"
                                  min="1"
                                  max="10"
                                  value={editData.severity || 5}
                                  onChange={(e) => setTempEditData({ ...tempEditData, severity: parseInt(e.target.value) })}
                                  className="absolute top-0 w-full h-2 opacity-0 cursor-pointer"
                                />
                                <div
                                  className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-white rounded-full shadow-md pointer-events-none"
                                  style={{ 
                                    left: `calc(${((editData.severity || 5) - 1) * 11.11}% - 10px)`,
                                    borderWidth: '4px',
                                    borderColor: getGradientColorAtPosition(editData.severity || 5)
                                  }}
                                ></div>
                              </div>
                            </div>

                            {/* Pattern Selection */}
                            <div>
                              <span className="text-sm font-medium text-gray-900 block mb-3">Pattern</span>
                              <div className="grid grid-cols-3 gap-3">
                                <button
                                  onClick={() => setTempEditData({ ...tempEditData, pattern: "continuous" })}
                                  className={`p-3 rounded-lg border-2 transition-all text-sm ${
                                    editData.pattern === "continuous"
                                      ? "bg-blue-50 border-blue-500 text-blue-900 shadow-md"
                                      : "bg-white border-gray-200 text-gray-700 hover:bg-blue-50/50 hover:border-blue-300 hover:shadow-sm"
                                  }`}
                                >
                                  <Activity className={`h-5 w-5 mx-auto mb-1 transition-colors ${editData.pattern === "continuous" ? "text-blue-600" : "text-gray-400"}`} />
                                  Continuous
                                </button>
                                <button
                                  onClick={() => setTempEditData({ ...tempEditData, pattern: "attack-based" })}
                                  className={`p-3 rounded-lg border-2 transition-all text-sm ${
                                    editData.pattern === "attack-based"
                                      ? "bg-red-50 border-red-500 text-red-900 shadow-md"
                                      : "bg-white border-gray-200 text-gray-700 hover:bg-red-50/50 hover:border-red-300 hover:shadow-sm"
                                  }`}
                                >
                                  <Zap className={`h-5 w-5 mx-auto mb-1 transition-colors ${editData.pattern === "attack-based" ? "text-red-600" : "text-gray-400"}`} />
                                  Attack-based
                                </button>
                                <button
                                  onClick={() => setTempEditData({ ...tempEditData, pattern: "fluctuating" })}
                                  className={`p-3 rounded-lg border-2 transition-all text-sm ${
                                    editData.pattern === "fluctuating"
                                      ? "bg-orange-50 border-orange-500 text-orange-900 shadow-md"
                                      : "bg-white border-gray-200 text-gray-700 hover:bg-orange-50/50 hover:border-orange-300 hover:shadow-sm"
                                  }`}
                                >
                                  <TrendingUp className={`h-5 w-5 mx-auto mb-1 transition-colors ${editData.pattern === "fluctuating" ? "text-orange-600" : "text-gray-400"}`} />
                                  Fluctuating
                                </button>
                              </div>
                            </div>

                            {/* Start Date */}
                            <div>
                              <DatePicker
                                label="Start Date"
                                required
                                value={editData.startDate || ""}
                                onChange={(e) => setTempEditData({ ...tempEditData, startDate: e.target.value })}
                              />
                            </div>

                            {/* Treatment Relation */}
                            <div>
                              <span className="text-sm font-medium text-gray-900 block mb-3">Related to current treatment?</span>
                              <div className="flex gap-2">
                                <button
                                  type="button"
                                  onClick={() => setTempEditData({ ...tempEditData, treatmentRelated: true })}
                                  className={`flex-1 px-4 py-2.5 rounded-lg border text-sm font-medium transition-all ${
                                    editData.treatmentRelated === true
                                      ? "bg-blue-50 text-blue-700 border-blue-300"
                                      : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                                  }`}
                                >
                                  Yes
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setTempEditData({ ...tempEditData, treatmentRelated: false })}
                                  className={`flex-1 px-4 py-2.5 rounded-lg border text-sm font-medium transition-all ${
                                    editData.treatmentRelated === false
                                      ? "bg-blue-50 text-blue-700 border-blue-300"
                                      : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                                  }`}
                                >
                                  No
                                </button>
                              </div>
                            </div>

                            {/* Symptom Improvement After Treatment */}
                            <div>
                              <span className="text-sm font-medium text-gray-900 block mb-3">Symptom improved after treatment?</span>
                              <div className="flex gap-2">
                                <button
                                  type="button"
                                  onClick={() => setTempEditData({ ...tempEditData, improvedAfterTreatment: true })}
                                  className={`flex-1 px-4 py-2.5 rounded-lg border text-sm font-medium transition-all ${
                                    editData.improvedAfterTreatment === true
                                      ? "bg-blue-50 text-blue-700 border-blue-300"
                                      : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                                  }`}
                                >
                                  Yes
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setTempEditData({ ...tempEditData, improvedAfterTreatment: false })}
                                  className={`flex-1 px-4 py-2.5 rounded-lg border text-sm font-medium transition-all ${
                                    editData.improvedAfterTreatment === false
                                      ? "bg-blue-50 text-blue-700 border-blue-300"
                                      : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                                  }`}
                                >
                                  No
                                </button>
                              </div>
                            </div>

                            {/* Life Impacts */}
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-gray-900">Life Impacts <span className="text-gray-500 font-normal">(Optional)</span></span>
                                <span className="text-sm text-blue-600 font-medium">
                                  {(editData.lifeImpact || []).length} selected
                                </span>
                              </div>
                              <p className="text-xs text-gray-600 mb-3">Helps your doctor understand daily impact</p>
                              <div className="grid grid-cols-5 gap-2">
                                {lifeImpactOptions.map((option) => {
                                  const isSelected = (editData.lifeImpact || []).includes(option.id);
                                  const colorClasses = getImpactColorClasses(option.color, isSelected);
                                  const IconComponent = option.icon;
                                  
                                  return (
                                    <button
                                      key={option.id}
                                      onClick={() => {
                                        const impacts = editData.lifeImpact || [];
                                        if (impacts.includes(option.id)) {
                                          setTempEditData({
                                            ...tempEditData,
                                            lifeImpact: impacts.filter((i) => i !== option.id),
                                          });
                                        } else {
                                          setTempEditData({
                                            ...tempEditData,
                                            lifeImpact: [...impacts, option.id],
                                          });
                                        }
                                      }}
                                      className={`p-3 rounded-lg border-2 transition-all flex flex-col items-center gap-1 ${colorClasses.bg} ${colorClasses.border} ${colorClasses.hover} ${isSelected ? 'shadow-md' : ''}`}
                                    >
                                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${colorClasses.iconBg}`}>
                                        <IconComponent className={`h-5 w-5 ${colorClasses.text}`} />
                                      </div>
                                      <span className={`text-xs font-medium ${colorClasses.text}`}>
                                        {option.label}
                                      </span>
                                    </button>
                                  );
                                })}
                              </div>
                            </div>

                            {/* Additional Notes with AI Suggestions */}
                            <div>
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-sm font-medium text-gray-900">
                                  Additional Notes <span className="text-gray-500 font-normal">(Optional)</span>
                                </span>
                                <div className="flex items-center gap-1 px-2 py-0.5 bg-purple-50 rounded-full">
                                  <Sparkles className="h-3 w-3 text-purple-600" />
                                  <span className="text-xs font-medium text-purple-700">AI</span>
                                </div>
                              </div>
                              <p className="text-xs text-gray-600 mb-3">
                                AI can help you describe triggers such as food, timing, exercise, stress, sleep, or other patterns
                              </p>
                              
                              <div className="relative">
                                <textarea
                                  value={editData.notes || ""}
                                  onChange={(e) => setTempEditData({ ...tempEditData, notes: e.target.value })}
                                  onFocus={() => setShowNotesSuggestions(true)}
                                  placeholder="E.g., 'After eating dairy' or 'During stressful work periods'..."
                                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none text-sm"
                                  rows={3}
                                />
                                
                                {showNotesSuggestions && (
                                  <div className="absolute z-10 w-full mt-2 bg-white rounded-xl shadow-lg border-2 border-purple-200 max-h-96 overflow-y-auto">
                                    <div className="sticky top-0 bg-gradient-to-r from-purple-50 to-purple-100 px-4 py-3 border-b border-purple-200 flex items-center justify-between">
                                      <div className="flex items-center gap-2">
                                        <Sparkles className="h-4 w-4 text-purple-600" />
                                        <span className="font-semibold text-purple-900 text-sm">AI Trigger Suggestions</span>
                                      </div>
                                      <button
                                        onClick={() => setShowNotesSuggestions(false)}
                                        className="text-purple-600 hover:text-purple-800 transition-colors"
                                      >
                                        <X className="h-4 w-4" />
                                      </button>
                                    </div>
                                    
                                    <div className="p-3 space-y-3">
                                      {triggerSuggestions.map((category, idx) => (
                                        <div key={idx}>
                                          <div className="text-xs font-semibold text-purple-800 mb-2 px-2">
                                            {category.category}
                                          </div>
                                          <div className="space-y-1">
                                            {category.triggers.map((trigger, triggerIdx) => {
                                              const currentNotes = tempEditData.notes || "";
                                              const isAlreadySelected = currentNotes.includes(trigger);
                                              
                                              return (
                                                <button
                                                  key={triggerIdx}
                                                  onClick={() => {
                                                    // Toggle behavior: add if not present, remove if already selected
                                                    if (isAlreadySelected) {
                                                      // Remove trigger from notes
                                                      let updatedNotes = currentNotes;
                                                      
                                                      // Remove with period and space variations
                                                      updatedNotes = updatedNotes.replace(`. ${trigger}`, "");
                                                      updatedNotes = updatedNotes.replace(`${trigger}. `, "");
                                                      updatedNotes = updatedNotes.replace(trigger, "");
                                                      
                                                      // Clean up extra periods and spaces
                                                      updatedNotes = updatedNotes.replace(/\.\.+/g, ".");
                                                      updatedNotes = updatedNotes.replace(/\s+/g, " ");
                                                      updatedNotes = updatedNotes.replace(/^\s*\.\s*/, "");
                                                      updatedNotes = updatedNotes.trim();
                                                      
                                                      setTempEditData({ ...tempEditData, notes: updatedNotes });
                                                    } else {
                                                      // Add trigger to notes
                                                      const newNotes = currentNotes 
                                                        ? `${currentNotes}. ${trigger}`
                                                        : trigger;
                                                      setTempEditData({ ...tempEditData, notes: newNotes });
                                                    }
                                                  }}
                                                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all flex items-start gap-2 group ${
                                                    isAlreadySelected 
                                                      ? "bg-purple-100 text-purple-700 border border-purple-300" 
                                                      : "text-gray-700 hover:bg-purple-50 hover:text-purple-900"
                                                  }`}
                                                >
                                                  <Sparkles className={`h-3.5 w-3.5 mt-0.5 flex-shrink-0 ${
                                                    isAlreadySelected 
                                                      ? "text-purple-600" 
                                                      : "text-purple-400 group-hover:text-purple-600"
                                                  }`} />
                                                  <span>{trigger}</span>
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
                  {editingSymptom && (
                    <div className="p-5 bg-orange-50/50 rounded-xl border-2 border-orange-300 border-l-4 border-l-orange-500">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="font-semibold text-gray-900 text-lg">{editingSymptom}</span>
                          <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs text-orange-700 bg-orange-100 font-medium border border-orange-200">
                            ⏳ Incomplete
                          </span>
                        </div>
                        <button
                          onClick={() => setEditingSymptom(null)}
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

        {/* Validation Message - only show when symptoms exist but are incomplete */}
        {selectedSymptoms.length > 0 && (editingSymptom || selectedSymptoms.some((s) => !s.pattern || !s.startDate || s.treatmentRelated === undefined || s.improvedAfterTreatment === undefined)) && (
          <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-4 mb-6 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
            <div>
              <div className="font-medium text-orange-900">Please complete required symptom details</div>
              <div className="text-sm text-orange-700">
                Make sure each symptom has pattern, start date, and both treatment questions answered
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
              onClick={() => navigate("/personal-information")}
              className="w-full sm:w-40"
            >
              Back
            </Button>
            <div className="text-center flex-shrink-0">
              <div className="text-sm font-medium text-gray-900">Step 2 of 4</div>
              <div className="text-sm text-gray-600">
                {completeSymptoms} of {totalSymptomsIncludingEditing} symptoms complete
              </div>
            </div>
            <Button
              type="button"
              variant="primary"
              onClick={handleContinue}
              disabled={!isFormValid}
              className="w-full sm:w-40"
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}