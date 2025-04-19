"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { PatientSelection } from "@/components/patient-selection"
import { TherapistInterface } from "@/components/therapist-interface"

export default function TherapistView() {
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null)
  const therapistId = "101" // This should come from your authentication system

  return (
    <main className="min-h-screen bg-[#FFB5D0] relative overflow-hidden">
      {/* Background shapes */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[70%] left-[5%] w-[15vw] h-[15vw] bg-[#D8B4F0] organic-shape floating-slow opacity-10"></div>
        <div className="absolute bottom-[10%] right-[5%] w-[20vw] h-[20vw] bg-[#B4F0E0] organic-shape-2 floating opacity-10"></div>
        <div className="absolute top-[20%] right-[15%] w-[25vw] h-[25vw] bg-[#FFB5D0] organic-shape-3 floating-slow opacity-10"></div>
      </div>

      <AnimatePresence mode="wait">
        {!selectedPatient ? (
          <motion.div
            key="patient-selection"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <PatientSelection 
              onSelectPatient={setSelectedPatient} 
              therapistId={therapistId}
            />
          </motion.div>
        ) : (
          <motion.div
            key="therapist-interface"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="h-screen"
          >
            <TherapistInterface patientId={selectedPatient} onBack={() => setSelectedPatient(null)} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}

