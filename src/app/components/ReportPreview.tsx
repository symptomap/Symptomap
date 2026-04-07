import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "./ui/button";
import { Download, Share2, Mail, MessageCircle, Send, X } from "lucide-react";
import { Logo } from "./Logo";
import { Input } from "./ui/input";
import { formatMedicalCondition, MedicalTermTracker, formatMedicalConditionList } from "../../utils/medical-formatting";
import { formatFullName, capitalizeName, capitalizeFirst } from "../../utils/text-formatting";

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
  patientStory?: string;
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

export function ReportPreview() {
  const navigate = useNavigate();
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareEmail, setShareEmail] = useState("");

  // Load data from localStorage
  const step1Data: Step1Data | null = (() => {
    const data = localStorage.getItem("symptomapStep1");
    return data ? JSON.parse(data) : null;
  })();

  const symptoms: SymptomDetail[] = (() => {
    const data = localStorage.getItem("symptomapStep2");
    return data ? JSON.parse(data) : [];
  })();

  const treatments: TreatmentDetail[] = (() => {
    const data = localStorage.getItem("symptomapStep3");
    return data ? JSON.parse(data) : [];
  })();

  // Helper functions
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
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

  const generatePatientStory = () => {
    if (!step1Data) return "";
    
    const { firstName, lastName, dob, gender, primaryDiagnosis, diagnosisDate, additionalConditions, attacks } = step1Data;
    
    const tracker = new MedicalTermTracker();
    const age = dob ? Math.floor((new Date().getTime() - new Date(dob).getTime()) / (1000 * 60 * 60 * 24 * 365.25)) : null;
    
    const firstAttack = attacks && attacks.length > 0 
      ? attacks.reduce((earliest, attack) => {
          return !earliest || new Date(attack.date) < new Date(earliest.date) ? attack : earliest;
        }, attacks[0])
      : null;

    // Format names properly
    const formattedFirstName = capitalizeName(firstName);
    const formattedLastName = capitalizeName(lastName);

    let story = `${formattedFirstName} ${formattedLastName} is a`;
    if (age) story += ` ${age}-year-old`;
    if (gender) story += ` ${gender.toLowerCase()}`;
    story += ` patient`;
    
    if (primaryDiagnosis) {
      // First mention with full name + abbreviation
      story += ` diagnosed with ${tracker.format(primaryDiagnosis)}`;
      if (diagnosisDate) {
        story += ` in ${new Date(diagnosisDate).getFullYear()}`;
      }
    }
    story += `.`;

    if (additionalConditions && additionalConditions.length > 0) {
      story += ` Additional conditions include ${formatMedicalConditionList(additionalConditions)}.`;
    }

    if (firstAttack) {
      story += ` The patient experienced their first documented attack in ${new Date(firstAttack.date).getFullYear()}`;
      if (firstAttack.notes) {
        story += ` (${capitalizeFirst(firstAttack.notes)})`;
      }
      story += `.`;
    }

    if (attacks && attacks.length > 0) {
      story += ` To date, the patient has documented ${attacks.length} attack${attacks.length > 1 ? 's' : ''}.`;
    }

    // Treatment information
    if (treatments && treatments.length > 0) {
      const primaryDiagnosisTreatments = treatments.filter(t => 
        t.treatmentPurpose === "diagnosis" || t.treatmentPurpose === "both"
      );
      const symptomaticTreatments = treatments.filter(t => t.treatmentPurpose === "symptom");

      if (primaryDiagnosisTreatments.length > 0) {
        // Use abbreviation for subsequent mention
        story += ` Current disease-modifying treatment${primaryDiagnosisTreatments.length > 1 ? 's' : ''} for ${tracker.format(primaryDiagnosis)} include${primaryDiagnosisTreatments.length === 1 ? 's' : ''} `;
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
        story += ` Symptomatic management includes ${symptomaticTreatments.map(t => t.name).join(", ")}.`;
      }
    }

    return story;
  };

  const patientStory = generatePatientStory();

  const handleDownloadPDF = () => {
    window.print();
  };

  const handleShare = () => {
    setShowShareModal(true);
  };

  const handleEmailShare = () => {
    if (shareEmail) {
      alert(`Report will be sent to ${shareEmail}`);
      setShowShareModal(false);
      setShareEmail("");
    }
  };

  const handleWhatsAppShare = () => {
    const message = encodeURIComponent("Here is my medical summary report from SymptomMap");
    window.open(`https://wa.me/?text=${message}`, "_blank");
  };

  const handleMessengerShare = () => {
    alert("Opening Messenger share dialog...");
  };

  if (!step1Data) {
    return (
      <div className="min-h-screen bg-[#F8F8FA] flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">No data available. Please complete the onboarding first.</p>
          <Button onClick={() => navigate("/personal-information")} className="mt-4">
            Go to Personal Information
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-[#F8F8FA]">
        {/* Print Styles */}
        <style>{`
          @media print {
            body {
              background: white !important;
            }
            .no-print {
              display: none !important;
            }
            .print-container {
              max-width: 100% !important;
              padding: 20px !important;
            }
          }
        `}</style>

        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-4xl mx-auto py-6 px-4">
            <div className="flex justify-center">
              <Logo alt="SymptomMap" />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto py-8 px-4 print-container">
          {/* Title */}
          <div className="bg-white rounded-2xl shadow-sm p-8 mb-6">
            <h1 className="text-3xl font-bold text-gray-900 text-center">Medical Summary Report</h1>
            <p className="text-center text-gray-600 mt-2">
              Generated on {formatDate(new Date().toISOString())}
            </p>
          </div>

          {/* Patient Story */}
          {patientStory && (
            <div className="bg-white rounded-2xl shadow-sm p-8 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Patient Story</h2>
              <p className="text-gray-700 leading-relaxed">{patientStory}</p>
            </div>
          )}

          {/* Diagnoses */}
          <div className="bg-white rounded-2xl shadow-sm p-8 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Diagnoses</h2>
            
            {/* Primary Diagnosis */}
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-1">Primary Diagnosis</p>
              <p className="font-medium text-gray-900">{formatMedicalCondition(step1Data.primaryDiagnosis)}</p>
              {step1Data.diagnosisDate && (
                <p className="text-sm text-gray-600 mt-1">
                  Diagnosed: {formatDate(step1Data.diagnosisDate)}
                </p>
              )}
            </div>

            {/* Additional Conditions */}
            {step1Data.additionalConditions && step1Data.additionalConditions.length > 0 && (
              <div>
                <p className="text-sm text-gray-600 mb-2">Additional Conditions</p>
                <div className="flex flex-wrap gap-2">
                  {step1Data.additionalConditions.map((condition, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm border border-gray-200"
                    >
                      {formatMedicalCondition(condition)}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Attack History */}
          {step1Data.attacks && step1Data.attacks.length > 0 && (
            <div className="bg-white rounded-2xl shadow-sm p-8 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Attack History</h2>
              <div className="space-y-4">
                {step1Data.attacks.map((attack, index) => (
                  <div key={attack.id} className="border-l-4 border-blue-600 pl-4 py-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium text-gray-900">Attack {index + 1}</p>
                        <p className="text-sm text-gray-600">{formatDate(attack.date)}</p>
                        {attack.notes && (
                          <p className="text-sm text-gray-700 mt-2">{capitalizeFirst(attack.notes)}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Treatment Overview */}
          {treatments && treatments.length > 0 && (
            <div className="bg-white rounded-2xl shadow-sm p-8 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Treatment Overview</h2>
              <div className="space-y-4">
                {treatments.map((treatment, index) => (
                  <div key={index} className="border border-gray-200 rounded-xl p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-medium text-gray-900">{treatment.name}</h3>
                          <span className={`px-2 py-1 rounded-md text-xs border ${getCategoryColor(treatment.category)}`}>
                            {treatment.category}
                          </span>
                        </div>
                        {treatment.dosage && (
                          <p className="text-sm text-gray-600 mb-1">Dosage: {treatment.dosage}</p>
                        )}
                        <p className="text-sm text-gray-600">Frequency: {getFrequencyLabel(treatment.frequency)}</p>
                        <p className="text-sm text-gray-600">Started: {formatDate(treatment.startDate)}</p>
                      </div>
                    </div>

                    {/* Effectiveness */}
                    <div className="mt-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-700">Effectiveness</span>
                        <span className="text-sm font-medium text-gray-900">{treatment.effectiveness}/10</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-300"
                          style={{
                            width: `${(treatment.effectiveness / 10) * 100}%`,
                            background: "linear-gradient(90deg, #2563EB 0%, #8B5CF6 100%)",
                          }}
                        />
                      </div>
                    </div>

                    {treatment.notes && (
                      <p className="text-sm text-gray-600 mt-3 pt-3 border-t border-gray-100">
                        {treatment.notes}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Symptom Mapping */}
          {symptoms && symptoms.length > 0 && (
            <div className="bg-white rounded-2xl shadow-sm p-8 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Symptom Mapping</h2>
              <div className="space-y-4">
                {symptoms.map((symptom, index) => (
                  <div key={index} className="border border-gray-200 rounded-xl p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 mb-2">{symptom.name}</h3>
                        <p className="text-sm text-gray-600">Pattern: {symptom.pattern}</p>
                        <p className="text-sm text-gray-600">Started: {formatDate(symptom.startDate)}</p>
                      </div>
                    </div>

                    {/* Severity */}
                    <div className="mt-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-700">Severity</span>
                        <span className="text-sm font-medium text-gray-900">{symptom.severity}/10</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-300"
                          style={{
                            width: `${(symptom.severity / 10) * 100}%`,
                            background: "linear-gradient(90deg, #2563EB 0%, #8B5CF6 100%)",
                          }}
                        />
                      </div>
                    </div>

                    {/* Life Impact */}
                    {symptom.lifeImpact && symptom.lifeImpact.length > 0 && (
                      <div className="mt-3">
                        <p className="text-sm text-gray-600 mb-2">Life Impact</p>
                        <div className="flex flex-wrap gap-2">
                          {symptom.lifeImpact.map((impact, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs border border-gray-200"
                            >
                              {impact}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {symptom.notes && (
                      <p className="text-sm text-gray-600 mt-3 pt-3 border-t border-gray-100">
                        {capitalizeFirst(symptom.notes)}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons - Hide on print */}
          <div className="bg-white rounded-2xl shadow-sm p-8 no-print">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button
                type="button"
                variant="secondary"
                onClick={handleDownloadPDF}
                className="w-full flex items-center justify-center gap-2"
              >
                <Download className="h-4 w-4" />
                Download PDF
              </Button>
              <Button
                type="button"
                variant="primary"
                onClick={handleShare}
                className="w-full flex items-center justify-center gap-2"
              >
                <Share2 className="h-4 w-4" />
                Share Report
              </Button>
            </div>

            {/* Back to Summary Button */}
            <div className="mt-4">
              <Button
                type="button"
                variant="secondary"
                onClick={() => navigate("/medical-records")}
                className="w-full"
              >
                Back to Medical Summary
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 no-print">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full mx-4 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Share Report</h3>
              <button
                onClick={() => setShowShareModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Email Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Send via Email
              </label>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="doctor@example.com"
                  value={shareEmail}
                  onChange={(e) => setShareEmail(e.target.value)}
                  className="flex-1"
                />
                <Button
                  onClick={handleEmailShare}
                  disabled={!shareEmail}
                  className="flex items-center gap-2"
                >
                  <Send className="h-4 w-4" />
                  Send
                </Button>
              </div>
            </div>

            {/* Social Share Options */}
            <div>
              <p className="text-sm font-medium text-gray-700 mb-3">Or share via</p>
              <div className="space-y-2">
                <button
                  onClick={handleWhatsAppShare}
                  className="w-full flex items-center gap-3 px-4 py-3 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg transition-colors border border-green-200"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span className="font-medium">WhatsApp</span>
                </button>
                <button
                  onClick={handleMessengerShare}
                  className="w-full flex items-center gap-3 px-4 py-3 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition-colors border border-blue-200"
                >
                  <Mail className="h-5 w-5" />
                  <span className="font-medium">Messenger</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
