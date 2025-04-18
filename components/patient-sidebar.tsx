"use client"
import { Book, MessageSquare, FileText, Target } from "lucide-react"

interface PatientSidebarProps {
  activeSection: "journal" | "messages" | "notes" | "goals"
  onChangeSection: (section: "journal" | "messages" | "notes" | "goals") => void
}

export function PatientSidebar({ activeSection, onChangeSection }: PatientSidebarProps) {
  return (
    <div className="w-64 bg-white/20 backdrop-blur-sm border-r border-white/30 p-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-medium">My Therapy</h2>
      </div>

      <div className="space-y-2">
        <div
          className={`p-3 rounded-xl cursor-pointer transition-colors flex items-center gap-3 ${
            activeSection === "journal"
              ? "bg-[#2196F3]/30 border-l-4 border-[#2196F3]"
              : "bg-white/50 hover:bg-white/70"
          }`}
          onClick={() => onChangeSection("journal")}
        >
          <Book className={`h-5 w-5 ${activeSection === "journal" ? "text-[#2196F3]" : "text-[#555]"}`} />
          <div>
            <p className="text-sm font-medium">My Journal</p>
            <p className="text-xs text-[#555]">Private thoughts & reflections</p>
          </div>
        </div>

        <div
          className={`p-3 rounded-xl cursor-pointer transition-colors flex items-center gap-3 ${
            activeSection === "messages"
              ? "bg-[#4CAF50]/30 border-l-4 border-[#4CAF50]"
              : "bg-white/50 hover:bg-white/70"
          }`}
          onClick={() => onChangeSection("messages")}
        >
          <MessageSquare className={`h-5 w-5 ${activeSection === "messages" ? "text-[#4CAF50]" : "text-[#555]"}`} />
          <div>
            <p className="text-sm font-medium">Messages</p>
            <p className="text-xs text-[#555]">Communicate with therapist</p>
          </div>
        </div>

        <div
          className={`p-3 rounded-xl cursor-pointer transition-colors flex items-center gap-3 ${
            activeSection === "notes" ? "bg-[#FFC107]/30 border-l-4 border-[#FFC107]" : "bg-white/50 hover:bg-white/70"
          }`}
          onClick={() => onChangeSection("notes")}
        >
          <FileText className={`h-5 w-5 ${activeSection === "notes" ? "text-[#FFC107]" : "text-[#555]"}`} />
          <div>
            <p className="text-sm font-medium">Session Notes</p>
            <p className="text-xs text-[#555]">Notes shared by therapist</p>
          </div>
        </div>

        <div
          className={`p-3 rounded-xl cursor-pointer transition-colors flex items-center gap-3 ${
            activeSection === "goals" ? "bg-[#9C27B0]/30 border-l-4 border-[#9C27B0]" : "bg-white/50 hover:bg-white/70"
          }`}
          onClick={() => onChangeSection("goals")}
        >
          <Target className={`h-5 w-5 ${activeSection === "goals" ? "text-[#9C27B0]" : "text-[#555]"}`} />
          <div>
            <p className="text-sm font-medium">My Goals</p>
            <p className="text-xs text-[#555]">Track progress & achievements</p>
          </div>
        </div>
      </div>

      <div className="mt-8 p-3 bg-white/50 rounded-xl">
        <p className="text-xs text-[#555] mb-2">Next Session</p>
        <p className="text-sm font-medium">Thursday, May 9</p>
        <p className="text-xs text-[#555]">2:00 PM with Dr. Emily Chen</p>
      </div>
    </div>
  )
}
