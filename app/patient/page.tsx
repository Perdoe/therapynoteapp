"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { PatientSidebar } from "@/components/patient-sidebar"
import { PatientJournal } from "@/components/patient-journal"
import { PatientMessages } from "@/components/patient-messages"
import { PatientSessionNotes } from "@/components/patient-session-notes"
import { PatientGoals } from "@/components/patient-goals"
import { ConfirmationModal } from "@/components/confirmation-modal"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function PatientView() {
  const [activeSection, setActiveSection] = useState<"journal" | "messages" | "notes" | "goals">("journal")
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [messageToShare, setMessageToShare] = useState("")

  // Get background color based on active section
  const getBackgroundColor = () => {
    switch (activeSection) {
      case "journal":
        return "#E3F2FD" // Light blue
      case "messages":
        return "#E8F5E9" // Light green
      case "notes":
        return "#FFF8E1" // Light yellow
      case "goals":
        return "#F3E5F5" // Light purple
      default:
        return "#E3F2FD" // Default light blue
    }
  }

  const handleShare = (message: string) => {
    setMessageToShare(message)
    setShowConfirmation(true)
  }

  const confirmShare = () => {
    // Logic to share message with therapist would go here
    setShowConfirmation(false)
    // Show success message or animation
  }

  return (
    <main
      className="min-h-screen flex relative overflow-hidden transition-colors duration-500"
      style={{ backgroundColor: getBackgroundColor() }}
    >
      {/* Background shapes */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div
          className="absolute top-[20%] right-[10%] w-[25vw] h-[25vw] organic-shape floating-slow opacity-10"
          style={{
            backgroundColor:
              activeSection === "journal"
                ? "#64B5F6"
                : activeSection === "messages"
                  ? "#81C784"
                  : activeSection === "notes"
                    ? "#FFD54F"
                    : "#CE93D8",
          }}
        ></div>
        <div
          className="absolute bottom-[30%] left-[5%] w-[20vw] h-[20vw] organic-shape-2 floating opacity-10"
          style={{
            backgroundColor:
              activeSection === "journal"
                ? "#2196F3"
                : activeSection === "messages"
                  ? "#4CAF50"
                  : activeSection === "notes"
                    ? "#FFC107"
                    : "#9C27B0",
          }}
        ></div>
      </div>

      {/* Left sidebar for navigation */}
      <div className="w-16 bg-white/20 backdrop-blur-sm flex flex-col items-center py-6">
        <Link href="/" className="p-3 rounded-full bg-white/80 text-[#333] shadow-md hover:shadow-lg transition-shadow">
          <ArrowLeft className="h-5 w-5" />
        </Link>
      </div>

      {/* Section sidebar */}
      <PatientSidebar activeSection={activeSection} onChangeSection={setActiveSection} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Patient Info */}
        <div className="flex justify-between items-center p-4 bg-white/20 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-[#D8B4F0] flex items-center justify-center">
              <span className="text-white font-medium">SJ</span>
            </div>
            <div>
              <span className="font-medium">Sarah Johnson</span>
              <div className="text-xs text-[#555]">
                {activeSection === "journal"
                  ? "My Journal"
                  : activeSection === "messages"
                    ? "Messages"
                    : activeSection === "notes"
                      ? "Session Notes"
                      : "My Goals"}
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-4 overflow-auto">
          <AnimatePresence mode="wait">
            {activeSection === "journal" && (
              <motion.div
                key="journal"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                <PatientJournal />
              </motion.div>
            )}

            {activeSection === "messages" && (
              <motion.div
                key="messages"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                <PatientMessages onShare={handleShare} />
              </motion.div>
            )}

            {activeSection === "notes" && (
              <motion.div
                key="notes"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                <PatientSessionNotes />
              </motion.div>
            )}

            {activeSection === "goals" && (
              <motion.div
                key="goals"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                <PatientGoals />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Status Bar */}
        <div className="p-2 bg-white/20 backdrop-blur-sm text-center text-xs text-[#555]">
          <p>Last updated: Today at 2:45 PM</p>
        </div>
      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirmation && (
          <ConfirmationModal
            title="Send Message to Therapist"
            message="Are you sure you want to send this message to your therapist? They will be notified immediately."
            confirmText="Yes, send message"
            onConfirm={confirmShare}
            onCancel={() => setShowConfirmation(false)}
          />
        )}
      </AnimatePresence>
    </main>
  )
}
