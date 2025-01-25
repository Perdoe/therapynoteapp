import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface Patient {
  id: string;
  name: string;
  lastSession: string;
}

interface PatientListProps {
  patients: Patient[];
  onSelectPatient: (id: string) => void;
  selectedPatientId?: string;
}

export const PatientList: React.FC<PatientListProps> = ({
  patients,
  onSelectPatient,
  selectedPatientId,
}) => {
  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
        <Input
          placeholder="Search patients..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        {filteredPatients.map((patient) => (
          <div
            key={patient.id}
            className={`p-3 rounded-lg cursor-pointer transition-colors ${
              selectedPatientId === patient.id
                ? "bg-primary text-white"
                : "hover:bg-gray-100"
            }`}
            onClick={() => onSelectPatient(patient.id)}
          >
            <div className="font-medium">{patient.name}</div>
            <div className="text-sm opacity-80">
              Last session: {patient.lastSession}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};