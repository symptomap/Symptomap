import React, { useState } from "react";
import { AlertCircle, X, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { DatePicker } from "./ui/date-picker";
import { Input } from "./ui/input";
import { capitalizeFirst } from "../../utils/text-formatting";

interface Attack {
  id: string;
  date: string;
  notes: string;
}

interface AttackHistoryManagerProps {
  attacks: Attack[];
  onAttacksChange: (attacks: Attack[]) => void;
}

export function AttackHistoryManager({ attacks, onAttacksChange }: AttackHistoryManagerProps) {
  const [selectedDate, setSelectedDate] = useState("");
  const [notes, setNotes] = useState("");
  const [duplicateError, setDuplicateError] = useState(false);

  const handleAdd = () => {
    if (!selectedDate) return;
    
    // Check for duplicate dates
    const isDuplicate = attacks.some((attack) => attack.date === selectedDate);
    if (isDuplicate) {
      setDuplicateError(true);
      setTimeout(() => setDuplicateError(false), 3000);
      return;
    }
    
    const attack: Attack = {
      id: Date.now().toString(),
      date: selectedDate,
      notes: notes.trim(),
    };
    
    onAttacksChange([...attacks, attack]);
    
    // Reset inputs to empty state
    setSelectedDate("");
    setNotes("");
    setDuplicateError(false);
  };

  const handleRemove = (id: string) => {
    onAttacksChange(attacks.filter((a) => a.id !== id));
  };

  const formatDisplayDate = (isoDate: string) => {
    const date = new Date(isoDate + "T00:00:00");
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  // Sort attacks by date (earliest first = chronological order)
  const sortedAttacks = [...attacks].sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  // Helper function to get ordinal suffix
  const getOrdinal = (n: number) => {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <AlertCircle className="h-5 w-5 text-red-500" />
          <h2 className="text-lg font-medium text-gray-900">Attack History</h2>
        </div>
        <p className="text-sm text-gray-600">
          Record dates of disease attacks or relapses, with optional notes about symptoms or severity. Attacks are automatically sorted chronologically.
        </p>
      </div>
      
      <div className="bg-gray-50 rounded-xl p-4 space-y-3">
        <DatePicker
          placeholder="Select attack date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
        
        <Input
          placeholder="Optional notes (e.g., symptoms, severity, treatment)"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
        
        {duplicateError && (
          <div className="bg-red-50 border border-red-300 rounded-lg p-3">
            <p className="text-sm text-red-700">
              Attack date already exists. Please select a different date.
            </p>
          </div>
        )}
        
        <Button
          type="button"
          onClick={handleAdd}
          variant="primary"
          className="w-full"
          disabled={!selectedDate}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Attack
        </Button>
      </div>

      {sortedAttacks.length > 0 && (
        <div className="space-y-3">
          <p className="text-sm font-medium text-gray-700">
            {sortedAttacks.length} {sortedAttacks.length === 1 ? "attack" : "attacks"} recorded
          </p>
          {sortedAttacks.map((attack, index) => (
            <div
              key={attack.id}
              className="bg-red-50 border border-red-200 rounded-lg p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold text-red-900">
                      {formatDisplayDate(attack.date)}
                    </span>
                    <span className="text-sm text-red-700">
                      ({getOrdinal(index + 1)} attack)
                    </span>
                  </div>
                  {attack.notes && (
                    <p className="text-sm text-red-800 mt-2 leading-relaxed">
                      {capitalizeFirst(attack.notes)}
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => handleRemove(attack.id)}
                  className="text-red-600 hover:bg-red-200 rounded-full p-1.5 transition-colors flex-shrink-0"
                  aria-label="Remove attack"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {sortedAttacks.length === 0 && (
        <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
          <AlertCircle className="h-8 w-8 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-500">No attacks recorded yet</p>
        </div>
      )}
    </div>
  );
}