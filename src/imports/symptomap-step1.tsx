import React, { useState } from "react";

export default function SymptomapStep1() {
  const [dob, setDob] = useState("");
  const [diagnosisDate, setDiagnosisDate] = useState("");
  const [attackDate, setAttackDate] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [attacks, setAttacks] = useState([]);
  const [appointments, setAppointments] = useState([]);

  const addAttack = () => {
    if (!attackDate) return;
    setAttacks([...attacks, attackDate]);
    setAttackDate("");
  };

  const addAppointment = () => {
    if (!appointmentDate) return;
    setAppointments([...appointments, appointmentDate]);
    setAppointmentDate("");
  };

  const removeAttack = (index) => {
    setAttacks(attacks.filter((_, i) => i !== index));
  };

  const removeAppointment = (index) => {
    setAppointments(appointments.filter((_, i) => i !== index));
  };

  return (
    <div style={{ maxWidth: 700, margin: "0 auto", padding: 24 }}>
      <h1>Symptomap</h1>
      <p>Your personal health tracking companion</p>

      <h2>Personal Information</h2>

      <label>Date of Birth</label>
      <input
        type="date"
        value={dob}
        onChange={(e) => setDob(e.target.value)}
      />

      <h2>Medical Information</h2>

      <label>Diagnosis Date</label>
      <input
        type="date"
        value={diagnosisDate}
        onChange={(e) => setDiagnosisDate(e.target.value)}
      />

      <h3>Attack Diagnosis Dates</h3>
      <div style={{ display: "flex", gap: 8 }}>
        <input
          type="date"
          value={attackDate}
          onChange={(e) => setAttackDate(e.target.value)}
        />
        <button type="button" onClick={addAttack}>
          Add
        </button>
      </div>

      <div style={{ marginTop: 12, display: "flex", gap: 8, flexWrap: "wrap" }}>
        {attacks.map((date, index) => (
          <div
            key={index}
            style={{
              padding: "8px 12px",
              border: "1px solid #ccc",
              borderRadius: 20,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span>{date}</span>
            <button type="button" onClick={() => removeAttack(index)}>
              ×
            </button>
          </div>
        ))}
      </div>

      <h3 style={{ marginTop: 24 }}>Doctor Appointment Dates</h3>
      <div style={{ display: "flex", gap: 8 }}>
        <input
          type="date"
          value={appointmentDate}
          onChange={(e) => setAppointmentDate(e.target.value)}
        />
        <button type="button" onClick={addAppointment}>
          Add
        </button>
      </div>

      <div style={{ marginTop: 12, display: "flex", gap: 8, flexWrap: "wrap" }}>
        {appointments.map((date, index) => (
          <div
            key={index}
            style={{
              padding: "8px 12px",
              border: "1px solid #ccc",
              borderRadius: 20,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span>{date}</span>
            <button type="button" onClick={() => removeAppointment(index)}>
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}