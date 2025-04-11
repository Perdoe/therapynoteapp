"use client"
import { ArrowLeft, MessageSquare, BookOpen, Send } from "lucide-react"
import Link from "next/link"

interface PatientSidebarProps {
  activeSection: "therapist" | "journal" | "share"
  onChangeSection: (section: "therapist" | "journal" | "share") => void
}

export function PatientSidebar({ activeSection, onChangeSection }: PatientSidebarProps) {
  return (
    <div className="w-16 flex flex-col items-center py-6 bg-white/20 backdrop-blur-sm">
      <Link href="/" className="p-3 rounded-full bg-white/80 text-[#333] shadow-md hover:shadow-lg transition-shadow">
        <ArrowLeft className="h-5 w-5" />
      </Link>

      <div className="flex-1 flex flex-col items-center space-y-8 mt-12">
        <button
          className={`relative p-3 rounded-full transition-all duration-300 ${
            activeSection === "therapist"
              ? "bg-[#FFC107] text-white shadow-[0_0_10px_rgba(255,193,7,0.4)]"
              : "bg-white/80 text-[#333] hover:bg-white/90"
          }`}
          onClick={() => onChangeSection("therapist")}
          title="From Therapist"
        >
          <MessageSquare className="h-5 w-5" />
        </button>

        <button
          className={`relative p-3 rounded-full transition-all duration-300 ${
            activeSection === "journal"
              ? "bg-[#2196F3] text-white shadow-[0_0_10px_rgba(33,150,243,0.4)]"
              : "bg-white/80 text-[#333] hover:bg-white/90"
          }`}
          onClick={() => onChangeSection("journal")}
          title="My Journal"
        >
          <BookOpen className="h-5 w-5" />
        </button>

        <button
          className={`relative p-3 rounded-full transition-all duration-300 ${
            activeSection === "share"
              ? "bg-[#4CAF50] text-white shadow-[0_0_10px_rgba(76,175,80,0.4)]"
              : "bg-white/80 text-[#333] hover:bg-white/90"
          }`}
          onClick={() => onChangeSection("share")}
          title="Share with Therapist"
        >
          <Send className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}

