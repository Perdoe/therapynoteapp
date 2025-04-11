"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { PatientSidebar } from "@/components/patient-sidebar"
import { FromTherapist } from "@/components/from-therapist"
import { MyJournal } from "@/components/my-journal"
import { ShareWithTherapist } from "@/components/share-with-therapist"
import { ConfirmationModal } from "@/components/confirmation-modal"

export default function PatientView() {
  const [activeSection, setActiveSection] = useState<"therapist" | "journal" | "share">("therapist")
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [noteToShare, setNoteToShare] = useState("")

  // Get background color based on active section
  const getBackgroundColor = () => {
    switch (activeSection) {
      case "therapist":
        return "#FFF8E1" // Light yellow
      case "journal":
        return "#E3F2FD" // Light blue
      case "share":
        return "#E8F5E9" // Light green
      default:
        return "#FFB5D0" // Default pink
    }
  }

  const handleShare = (note: string) => {
    setNoteToShare(note)
    setShowConfirmation(true)
  }

  const confirmShare = () => {
    // Logic to share note with therapist would go here
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
              activeSection === "therapist" ? "#FFD54F" : activeSection === "journal" ? "#64B5F6" : "#81C784",
          }}
        ></div>
        <div
          className="absolute bottom-[30%] left-[5%] w-[20vw] h-[20vw] organic-shape-2 floating opacity-10"
          style={{
            backgroundColor:
              activeSection === "therapist" ? "#FFC107" : activeSection === "journal" ? "#2196F3" : "#4CAF50",
          }}
        ></div>
        <div
          className="absolute top-[60%] right-[20%] w-[15vw] h-[15vw] organic-shape-3 floating-fast opacity-10"
          style={{
            backgroundColor:
              activeSection === "therapist" ? "#FFAB00" : activeSection === "journal" ? "#1976D2" : "#388E3C",
          }}
        ></div>
      </div>

      {/* Sidebar Navigation */}
      <PatientSidebar activeSection={activeSection} onChangeSection={setActiveSection} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="p-4 bg-white/20 backdrop-blur-sm">
          <h1 className="text-xl font-medium">
            {activeSection === "therapist"
              ? "From Your Therapist"
              : activeSection === "journal"
                ? "My Journal"
                : "Share with Therapist"}
          </h1>
        </div>

        {/* Content */}
        <div className="flex-1 p-4 overflow-auto">
          <AnimatePresence mode="wait">
            {activeSection === "therapist" && (
              <motion.div
                key="therapist"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                <FromTherapist />
              </motion.div>
            )}

            {activeSection === "journal" && (
              <motion.div
                key="journal"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                <MyJournal />
              </motion.div>
            )}

            {activeSection === "share" && (
              <motion.div
                key="share"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                <ShareWithTherapist onShare={handleShare} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirmation && (
          <ConfirmationModal
            title="Share with Therapist"
            message="Are you sure you want to share this note with your therapist? They will be able to view it before your next session."
            confirmText="Yes, share this note"
            onConfirm={confirmShare}
            onCancel={() => setShowConfirmation(false)}
          />
        )}
      </AnimatePresence>
    </main>
  )
}

