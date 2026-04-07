import React, { useState } from "react";
import { Stethoscope, X, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { DatePicker } from "./ui/date-picker";

interface Appointment {
  id: string;
  date: string;
}

interface AppointmentManagerProps {
  appointments: Appointment[];
  onAppointmentsChange: (appointments: Appointment[]) => void;
}

export function AppointmentManager({ appointments, onAppointmentsChange }: AppointmentManagerProps) {
  const [selectedDate, setSelectedDate] = useState("");

  const handleAdd = () => {
    if (!selectedDate) return;
    
    const appointment: Appointment = {
      id: Date.now().toString(),
      date: selectedDate,
    };
    
    onAppointmentsChange([...appointments, appointment]);
    setSelectedDate("");
  };

  const handleRemove = (id: string) => {
    onAppointmentsChange(appointments.filter((a) => a.id !== id));
  };

  const formatDisplayDate = (isoDate: string) => {
    const date = new Date(isoDate + "T00:00:00");
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  // Sort appointments by date (oldest first = chronological order)
  const sortedAppointments = [...appointments].sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  return (
    <div className="flex flex-col gap-3">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Stethoscope className="h-4 w-4 text-purple-600" />
          <span className="font-medium text-gray-700">Doctor Appointment History</span>
        </div>
        <p className="text-sm text-gray-600">
          Keep a record of your past doctor visits and consultations.
        </p>
      </div>
      
      <div className="flex gap-2">
        <div className="flex-1">
          <DatePicker
            placeholder="Select appointment date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>
        <Button
          type="button"
          onClick={handleAdd}
          variant="primary"
          className="h-11 px-5"
          disabled={!selectedDate}
        >
          <Plus className="h-4 w-4 mr-1" />
          Add
        </Button>
      </div>

      {sortedAppointments.length > 0 && (
        <div className="flex flex-wrap gap-3 mt-1">
          {sortedAppointments.map((appointment) => (
            <div
              key={appointment.id}
              className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 border border-purple-200 rounded-lg"
            >
              <span className="text-sm font-medium text-purple-900">
                {formatDisplayDate(appointment.date)}
              </span>
              <button
                type="button"
                onClick={() => handleRemove(appointment.id)}
                className="text-purple-600 hover:bg-purple-200 rounded-full p-1 transition-colors"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
      
      {sortedAppointments.length === 0 && (
        <p className="text-sm text-gray-500 italic">No appointments recorded yet</p>
      )}
    </div>
  );
}