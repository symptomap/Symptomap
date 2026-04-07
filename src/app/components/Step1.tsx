import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Input } from "./ui/input";
import { Select } from "./ui/select";
import { DatePicker } from "./ui/date-picker";
import { Combobox } from "./ui/combobox";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { AttackHistoryManager } from "./AttackDateManager";
import { AppointmentManager } from "./AppointmentManager";
import { CityInput } from "./CityInput";
import { medicalConditions } from "../data/medical-conditions";
import { Logo } from "./Logo";

const countries = [
  { value: "", label: "Select country" },
  { value: "uk", label: "United Kingdom" },
  { value: "us", label: "United States" },
  { value: "ca", label: "Canada" },
  { value: "au", label: "Australia" },
  { value: "de", label: "Germany" },
  { value: "fr", label: "France" },
  { value: "es", label: "Spain" },
  { value: "it", label: "Italy" },
];

const genders = [
  { value: "", label: "Select gender" },
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
  { value: "prefer-not-to-say", label: "Prefer not to say" },
];

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

const conditions = medicalConditions;

interface FormData {
  firstName: string;
  lastName: "string";
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

export default function Step1() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    country: "",
    city: "",
    primaryDiagnosis: "",
    diagnosisDate: "",
    additionalConditions: [],
    attacks: [],
    appointments: [],
    consent: false,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.dob) newErrors.dob = "Date of birth is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.country) newErrors.country = "Country is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.primaryDiagnosis) newErrors.primaryDiagnosis = "Primary diagnosis is required";
    if (!formData.diagnosisDate) newErrors.diagnosisDate = "Diagnosis date is required";
    if (!formData.consent) newErrors.consent = "You must consent to continue";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Save to localStorage for now
      localStorage.setItem("symptomapStep1", JSON.stringify(formData));
      navigate("/symptom-mapping");
    }
  };

  const handleSaveDraft = () => {
    localStorage.setItem("symptomapDraft", JSON.stringify(formData));
    alert("Draft saved successfully!");
  };

  // Check if all required fields are filled for enabling Continue button
  const isFormValid =
    formData.firstName.trim() !== "" &&
    formData.lastName.trim() !== "" &&
    formData.dob !== "" &&
    formData.gender !== "" &&
    formData.country !== "" &&
    formData.city.trim() !== "" &&
    formData.primaryDiagnosis !== "" &&
    formData.diagnosisDate !== "" &&
    formData.consent === true;

  return (
    <div className="min-h-screen bg-gray-50">
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
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-medium">
                1
              </div>
              <span className="text-sm font-medium text-gray-900">Personal Info</span>
            </div>
            <div className="w-12 h-0.5 bg-gray-300"></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center text-sm font-medium">
                2
              </div>
              <span className="text-sm font-medium text-gray-500">Symptom Mapping</span>
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

        <div className="bg-white rounded-2xl shadow-sm p-8">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-semibold text-gray-900 mb-2">
              Personal Information
            </h1>
            <p className="text-gray-600">
              Tell us about your basic details to personalise your experience.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Form Fields */}
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="First Name"
                  required
                  placeholder="Enter first name"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  error={errors.firstName}
                />
                <Input
                  label="Last Name"
                  required
                  placeholder="Enter last name"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  error={errors.lastName}
                />
                <DatePicker
                  label="Date of Birth"
                  required
                  placeholder="Select your date of birth"
                  value={formData.dob}
                  onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                  error={errors.dob}
                />
                <Select
                  label="Gender"
                  required
                  options={genders}
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  error={errors.gender}
                />
              </div>
            </div>

            {/* Location */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Location</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select
                  label="Country"
                  required
                  options={countries}
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  error={errors.country}
                />
                <CityInput
                  label="City"
                  required
                  value={formData.city}
                  onChange={(value) => setFormData({ ...formData, city: value })}
                  error={errors.city}
                />
              </div>
            </div>

            {/* Medical Information */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Medical Information</h2>
              <div className="space-y-4">
                <Combobox
                  label="Primary Diagnosis"
                  required
                  placeholder="Search diagnosis..."
                  options={diagnoses}
                  value={formData.primaryDiagnosis}
                  onChange={(value) => setFormData({ ...formData, primaryDiagnosis: value })}
                  error={errors.primaryDiagnosis}
                />
                <DatePicker
                  label="Diagnosis Date"
                  required
                  value={formData.diagnosisDate}
                  onChange={(e) => setFormData({ ...formData, diagnosisDate: e.target.value })}
                  error={errors.diagnosisDate}
                />
                <Combobox
                  label="Additional Conditions (Optional)"
                  placeholder="Search conditions..."
                  options={conditions}
                  multiple
                  selectedValues={formData.additionalConditions}
                  onMultipleChange={(values) =>
                    setFormData({ ...formData, additionalConditions: values })
                  }
                />
              </div>
            </div>

            {/* Attack Diagnosis Dates */}
            <AttackHistoryManager
              attacks={formData.attacks}
              onAttacksChange={(attacks) => setFormData({ ...formData, attacks })}
            />

            {/* Doctor Appointment Dates */}
            <AppointmentManager
              appointments={formData.appointments}
              onAppointmentsChange={(appointments) =>
                setFormData({ ...formData, appointments })
              }
            />

            {/* Consent */}
            <div className="space-y-4">
              <Checkbox
                label={
                  <span className="text-sm leading-relaxed">
                    I consent to the secure storage of my personal and health information for
                    symptom tracking purposes. Partially entered information may be saved so I can
                    resume later. Fully anonymized data may be used for research to improve care
                    for patients with similar conditions. I can request deletion of my data at any
                    time. See our{" "}
                    <a href="#" className="text-blue-600 hover:underline font-medium">
                      Privacy Policy
                    </a>{" "}
                    for details.
                  </span>
                }
                checked={formData.consent}
                onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                error={errors.consent}
              />
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-900">
                  <span className="font-medium">🔒 Your privacy matters:</span> Your health
                  information is securely stored and used only for symptom tracking and personal
                  health documentation.
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                type="button"
                variant="secondary"
                onClick={handleSaveDraft}
                className="flex-1"
              >
                Save as Draft
              </Button>
              <Button type="submit" variant="primary" className="flex-1" disabled={!isFormValid}>
                Continue to Step 2
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}