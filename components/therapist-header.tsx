"use client"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Search, Bell, Mic, MicOff } from "lucide-react"
import { useState } from "react"
import { Therapist } from "@/lib/context/therapist-context"

interface TherapistHeaderProps {
  therapist: Therapist
}

export function TherapistHeader({ therapist }: TherapistHeaderProps) {
  const [isRecording, setIsRecording] = useState(false)

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome, {therapist.firstName} {therapist.lastName}
            </h1>
            <p className="text-sm text-gray-500">
              Therapist ID: {therapist.id}
            </p>
          </div>
          {process.env.NODE_ENV === 'development' && (
            <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
              Development Mode
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

