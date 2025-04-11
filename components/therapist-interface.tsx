"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Mic, MicOff, Bold, Italic, Lock, Share2, Plus, Sparkles, Lightbulb } from "lucide-react"
import { ConfirmationModal } from "./confirmation-modal"
import { AiSummary } from "./ai-summary"

interface TherapistInterfaceProps {
  patientId: string
  onBack: () => void
}

export function TherapistInterface({ patientId, onBack }: TherapistInterfaceProps) {
  const [note, setNote] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [noteType, setNoteType] = useState<"private" | "shared">("private")
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [pendingNoteType, setPendingNoteType] = useState<"private" | "shared">("private")
  const [showAiSummary, setShowAiSummary] = useState(false)
  const [aiSummaryType, setAiSummaryType] = useState<"session" | "all">("session")
  const [activeSessionId, setActiveSessionId] = useState("s1")

  // Mock patient data
  const patientData = {
    id: patientId,
    name: "Sarah Johnson",
    sessions: [
      { id: "s1", date: "May 2, 2024", title: "Current Session" },
      { id: "s2", date: "Apr 25, 2024", title: "Weekly Check-in" },
      { id: "s3", date: "Apr 18, 2024", title: "Anxiety Management" },
      { id: "s4", date: "Apr 11, 2024", title: "Work Stress" },
      { id: "s5", date: "Apr 4, 2024", title: "Initial Assessment" },
    ],
  }

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

  const extractMainIdeas = () => {
    // Simulate AI processing
    setTimeout(() => {
      setShowAiSummary(true)
      setAiSummaryType("session")
    }, 500)
  }

  const generateAllSessionsSummary = () => {
    // Simulate AI processing
    setTimeout(() => {
      setShowAiSummary(true)
      setAiSummaryType("all")
    }, 500)
  }

  // Get background color based on note type
  const getBackgroundColor = () => {
    return noteType === "private" ? "#FFB5D0" : "#B4F0E0"
  }

  return (
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
          {patientData.sessions.map((session) => (
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
              <span className="text-white font-medium">SJ</span>
            </div>
            <div>
              <span className="font-medium">{patientData.name}</span>
              <div className="text-xs text-[#555]">
                {patientData.sessions.find((s) => s.id === activeSessionId)?.title}
              </div>
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
        <div className="flex-1 p-4">
          <div className="bg-white rounded-2xl shadow-md overflow-hidden h-full flex flex-col">
            <div className="flex items-center gap-2 p-2 border-b">
              <button className="p-1.5 rounded-md hover:bg-[#f0f0f0] transition-colors">
                <Bold className="h-4 w-4 text-[#555]" />
              </button>
              <button className="p-1.5 rounded-md hover:bg-[#f0f0f0] transition-colors">
                <Italic className="h-4 w-4 text-[#555]" />
              </button>
              <div className="h-4 w-px bg-[#ddd]"></div>
              <motion.button
                onClick={handleRecording}
                className={`p-1.5 rounded-md transition-colors ${isRecording ? "bg-[#FFB5D0]/30" : "hover:bg-[#f0f0f0]"}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isRecording ? <MicOff className="h-4 w-4 text-[#FF6B9E]" /> : <Mic className="h-4 w-4 text-[#555]" />}
              </motion.button>
              <div className="h-4 w-px bg-[#ddd]"></div>
              <button
                className="p-1.5 rounded-md hover:bg-[#f0f0f0] transition-colors flex items-center gap-1 text-xs text-[#555]"
                onClick={extractMainIdeas}
              >
                <Lightbulb className="h-4 w-4 text-[#D8B4F0]" />
                <span>Extract Ideas</span>
              </button>
              <button
                className="p-1.5 rounded-md hover:bg-[#f0f0f0] transition-colors flex items-center gap-1 text-xs text-[#555]"
                onClick={generateAllSessionsSummary}
              >
                <Sparkles className="h-4 w-4 text-[#D8B4F0]" />
                <span>Generate Summary</span>
              </button>
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

      {/* AI Summary */}
      <AnimatePresence>
        {showAiSummary && <AiSummary type={aiSummaryType} onClose={() => setShowAiSummary(false)} />}
      </AnimatePresence>
    </div>
  )
}

