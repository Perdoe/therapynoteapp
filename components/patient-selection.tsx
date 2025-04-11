"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Search, ArrowLeft, Plus } from "lucide-react"

interface PatientSelectionProps {
  onSelectPatient: (patientId: string) => void
}

export function PatientSelection({ onSelectPatient }: PatientSelectionProps) {
  const [searchQuery, setSearchQuery] = useState("")

  // Mock patient data
  const patients = [
    { id: "p1", name: "Sarah Johnson", lastSession: "2 days ago", issues: ["Anxiety", "Work stress"] },
    { id: "p2", name: "Michael Chen", lastSession: "1 week ago", issues: ["Depression", "Sleep issues"] },
    { id: "p3", name: "Aisha Patel", lastSession: "Yesterday", issues: ["Relationship", "Anxiety"] },
    { id: "p4", name: "David Wilson", lastSession: "3 weeks ago", issues: ["Grief", "Depression"] },
    { id: "p5", name: "Emma Rodriguez", lastSession: "4 days ago", issues: ["ADHD", "Work-life balance"] },
  ]

  const filteredPatients = patients.filter((patient) => patient.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <Link href="/" className="text-[#333] hover:text-[#555] transition-colors">
          <ArrowLeft className="h-6 w-6" />
        </Link>

        <h1 className="text-2xl font-medium">Your Patients</h1>

        <motion.button
          className="p-2 rounded-full bg-[#D8B4F0] text-white shadow-md hover:shadow-lg transition-shadow"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Plus className="h-5 w-5" />
        </motion.button>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#777]" size={18} />
        <input
          type="text"
          placeholder="Search patients..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full py-3 pl-10 pr-4 rounded-xl bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-[#D8B4F0]"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredPatients.map((patient) => (
          <motion.div
            key={patient.id}
            className="bg-white rounded-2xl shadow-md p-5 cursor-pointer"
            whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" }}
            onClick={() => onSelectPatient(patient.id)}
          >
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-full bg-[#D8B4F0] flex items-center justify-center text-white font-medium">
                {patient.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>

              <div className="flex-1">
                <h2 className="text-lg font-medium">{patient.name}</h2>
                <p className="text-sm text-[#777]">Last session: {patient.lastSession}</p>

                <div className="flex flex-wrap gap-2 mt-2">
                  {patient.issues.map((issue) => (
                    <span key={issue} className="px-2 py-1 text-xs rounded-full bg-[#FFB5D0]/30 text-[#333]">
                      {issue}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

