"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Mic, MicOff, Bold, Italic, Lock, Share2, Plus, Pencil, Trash2 } from "lucide-react"
import { ConfirmationModal } from "./confirmation-modal"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip"
import { EditPatientNameModal } from "./edit-patient-name-modal"

interface TherapistInterfaceProps {
  patientId: string
  onBack: () => void
}

interface PatientData {
  first_name: string
  last_name: string
  patient_id: string
  therapist_id: string
  created_at: string
}

export function TherapistInterface({ patientId, onBack }: TherapistInterfaceProps) {
  const [note, setNote] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [noteType, setNoteType] = useState<"private" | "shared">("private")
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [pendingNoteType, setPendingNoteType] = useState<"private" | "shared">("private")
  const [activeSessionId, setActiveSessionId] = useState("s1")
  const [patientData, setPatientData] = useState<PatientData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await fetch(`/api/patients/${patientId}`)
        if (!response.ok) {
          throw new Error("Failed to fetch patient data")
        }
        const data = await response.json()
        setPatientData(data)
      } catch (error) {
        console.error("Error fetching patient data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPatientData()
  }, [patientId])

  // Mock sessions data (this would come from a separate API endpoint in a real app)
  const sessions = [
    { id: "s1", date: "May 2, 2024", title: "Current Session" },
    { id: "s2", date: "Apr 25, 2024", title: "Weekly Check-in" },
    { id: "s3", date: "Apr 18, 2024", title: "Anxiety Management" },
    { id: "s4", date: "Apr 11, 2024", title: "Work Stress" },
    { id: "s5", date: "Apr 4, 2024", title: "Initial Assessment" },
  ]

  const handleRecording = () => {
    setIsRecording(!isRecording)
    if (!isRecording) {
      // Simulate voice recording
      setTimeout(() => {
        setNote(note + " The client expressed feeling overwhelmed with work responsibilities.")
        setIsRecording(false)
      }, 3000)
    }
  }

  const handleNoteTypeChange = (type: "private" | "shared") => {
    if (type !== noteType) {
      setPendingNoteType(type)
      setShowConfirmation(true)
    }
  }

  const confirmNoteTypeChange = () => {
    setNoteType(pendingNoteType)
    setShowConfirmation(false)
  }

  // Get background color based on note type
  const getBackgroundColor = () => {
    return noteType === "private" ? "#FFB5D0" : "#B4F0E0"
  }

  const handleNameUpdated = (newFirstName: string, newLastName: string) => {
    if (patientData) {
      setPatientData({
        ...patientData,
        first_name: newFirstName,
        last_name: newLastName,
      })
    }
  }

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/patients/${patientId}`, {
        method: 'DELETE',
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete patient')
      }
      
      onBack()
    } catch (error) {
      console.error('Error deleting patient:', error)
      // You might want to show an error toast here
    }
  }

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D8B4F0]"></div>
      </div>
    )
  }

  if (!patientData) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-[#555]">Failed to load patient data</p>
      </div>
    )
  }

  return (
    <TooltipProvider>
      <div className="flex h-screen">
        <div className="w-16 bg-white/20 backdrop-blur-sm flex flex-col items-center py-6">
          <button
            onClick={onBack}
            className="p-3 rounded-full bg-white/80 text-[#333] shadow-md hover:shadow-lg transition-shadow"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
        </div>

        {/* Session Sidebar */}
        <div className="w-64 bg-white/20 backdrop-blur-sm border-r border-white/30 p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-medium">Sessions</h2>
            <motion.button
              className="p-1.5 rounded-full bg-[#D8B4F0] text-white shadow-sm"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Plus className="h-4 w-4" />
            </motion.button>
          </div>

          <div className="space-y-2">
            {sessions.map((session) => (
              <motion.div
                key={session.id}
                className={`p-3 rounded-xl cursor-pointer transition-colors ${
                  activeSessionId === session.id
                    ? "bg-[#D8B4F0]/30 border-l-4 border-[#D8B4F0]"
                    : "bg-white/50 hover:bg-white/70"
                }`}
                whileHover={{ x: 5 }}
                onClick={() => setActiveSessionId(session.id)}
              >
                <p className="text-sm font-medium">{session.title}</p>
                <p className="text-xs text-[#555]">{session.date}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div
          className="flex-1 flex flex-col transition-colors duration-500"
          style={{ backgroundColor: getBackgroundColor() }}
        >
          {/* Patient Info */}
          <div className="flex justify-between items-center p-4 bg-white/20 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-[#D8B4F0] flex items-center justify-center">
                <span className="text-white font-medium">
                  {`${patientData.first_name[0]}${patientData.last_name[0]}`}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">
                  {`${patientData.first_name} ${patientData.last_name}`}
                </span>
                <button
                  onClick={() => setIsEditModalOpen(true)}
                  className="p-1 rounded-full hover:bg-[#D8B4F0]/80 hover:text-white transition-colors"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setIsDeleteModalOpen(true)}
                  className="p-1 rounded-full hover:bg-destructive/10 hover:text-destructive transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex bg-white/50 rounded-full p-1">
                <button
                  className={`px-3 py-1.5 rounded-full flex items-center gap-1 text-sm transition-colors ${
                    noteType === "private" ? "bg-[#FFB5D0] text-[#333]" : "text-[#555]"
                  }`}
                  onClick={() => handleNoteTypeChange("private")}
                >
                  <Lock className="h-3.5 w-3.5" />
                  <span>Private</span>
                </button>
                <button
                  className={`px-3 py-1.5 rounded-full flex items-center gap-1 text-sm transition-colors ${
                    noteType === "shared" ? "bg-[#B4F0E0] text-[#333]" : "text-[#555]"
                  }`}
                  onClick={() => handleNoteTypeChange("shared")}
                >
                  <Share2 className="h-3.5 w-3.5" />
                  <span>Shared</span>
                </button>
              </div>
            </div>
          </div>

          {/* Note Editor */}
          <div className="flex-1 flex flex-col">
            <div className="flex-1 bg-white/50 backdrop-blur-sm p-2">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        className={`p-2 rounded-full transition-colors ${
                          isRecording ? "bg-red-500 text-white" : "hover:bg-white/50"
                        }`}
                        onClick={handleRecording}
                      >
                        {isRecording ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      {isRecording ? "Stop Recording" : "Start Recording"}
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button className="p-2 rounded-full hover:bg-white/50">
                        <Bold className="h-5 w-5" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>Bold</TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button className="p-2 rounded-full hover:bg-white/50">
                        <Italic className="h-5 w-5" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>Italic</TooltipContent>
                  </Tooltip>
                </div>
              </div>

              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Type your session notes here..."
                className="w-full flex-1 p-4 outline-none resize-none"
              ></textarea>
            </div>
          </div>

          {/* Status Bar */}
          <div className="p-2 bg-white/20 backdrop-blur-sm text-center text-xs text-[#555]">
            <p>All notes are automatically saved and encrypted</p>
          </div>
        </div>

        {/* Confirmation Modal */}
        <AnimatePresence>
          {showConfirmation && (
            <ConfirmationModal
              title="Change Note Type"
              message={`Are you sure you want to change this note to ${pendingNoteType === "private" ? "private" : "shared with patient"}?`}
              confirmText={`Yes, make it ${pendingNoteType}`}
              onConfirm={confirmNoteTypeChange}
              onCancel={() => setShowConfirmation(false)}
            />
          )}
        </AnimatePresence>

        {/* Edit Name Modal */}
        <EditPatientNameModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          patientId={patientId}
          currentFirstName={patientData.first_name}
          currentLastName={patientData.last_name}
          onNameUpdated={handleNameUpdated}
        />

        <ConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          title="Delete Patient"
          message={`Are you sure you want to delete ${patientData.first_name} ${patientData.last_name}? This action cannot be undone.`}
          confirmText="Delete"
          onConfirm={handleDelete}
          onCancel={() => setIsDeleteModalOpen(false)}
        />
      </div>
    </TooltipProvider>
  )
}

