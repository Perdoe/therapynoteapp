import React from "react";
import { PatientList } from "@/components/PatientList";
import { NoteEditor } from "@/components/NoteEditor";
import { AddPatientDialog } from "@/components/AddPatientDialog";
import { AICopilotSidebar } from "@/components/AICopilotSidebar";
import { CopilotSuggestion } from "@/components/CopilotSuggestion";

interface PatientNote {
  id: string;
  content: string;
  date: string;
}

interface Patient {
  id: string;
  name: string;
  lastSession: string;
  notes: PatientNote[];
}

const Index = () => {
  const [patients, setPatients] = React.useState<Patient[]>([
    { 
      id: "1", 
      name: "John Doe", 
      lastSession: "2024-01-15",
      notes: []
    },
    { 
      id: "2", 
      name: "Jane Smith", 
      lastSession: "2024-01-14",
      notes: []
    },
    { 
      id: "3", 
      name: "Alice Johnson", 
      lastSession: "2024-01-13",
      notes: []
    },
  ]);
  const [selectedPatientId, setSelectedPatientId] = React.useState<string>();
  const [isCopilotOpen, setIsCopilotOpen] = React.useState(false);
  const [showSuggestion, setShowSuggestion] = React.useState(false);

  const selectedPatient = patients.find((p) => p.id === selectedPatientId);

  const handleAddPatient = (newPatient: { id: string; name: string }) => {
    setPatients([
      ...patients,
      { 
        ...newPatient, 
        lastSession: new Date().toISOString().split("T")[0],
        notes: []
      },
    ]);
  };

  const handleSaveNote = (note: string) => {
    if (selectedPatientId) {
      setPatients(prevPatients => 
        prevPatients.map(patient => {
          if (patient.id === selectedPatientId) {
            return {
              ...patient,
              lastSession: new Date().toISOString().split("T")[0],
              notes: [
                ...patient.notes,
                {
                  id: Date.now().toString(),
                  content: note,
                  date: new Date().toISOString()
                }
              ]
            };
          }
          return patient;
        })
      );
      
      // Show copilot after saving
      setIsCopilotOpen(true);
      // Show suggestion temporarily
      setShowSuggestion(true);
      setTimeout(() => setShowSuggestion(false), 5000);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="w-64 h-screen bg-white border-r border-gray-200">
        <div className="p-4">
          <AddPatientDialog onAddPatient={handleAddPatient} />
          <PatientList
            patients={patients}
            onSelectPatient={setSelectedPatientId}
            selectedPatientId={selectedPatientId}
          />
        </div>
      </div>
      {selectedPatient ? (
        <>
          <NoteEditor
            patientId={selectedPatient.id}
            patientName={selectedPatient.name}
            onSave={handleSaveNote}
          />
          <AICopilotSidebar
            isOpen={isCopilotOpen}
            onToggle={() => setIsCopilotOpen(!isCopilotOpen)}
          />
          {showSuggestion && (
            <CopilotSuggestion
              suggestion={`Based on the latest notes for ${selectedPatient.name}, consider exploring sleep patterns in your next session.`}
            />
          )}
        </>
      ) : (
        <div className="flex-1 flex items-center justify-center text-gray-500">
          Select a patient to start taking notes
        </div>
      )}
    </div>
  );
};

export default Index;