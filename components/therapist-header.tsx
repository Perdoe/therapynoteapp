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

export function TherapistHeader() {
  const [isRecording, setIsRecording] = useState(false)

  return (
    <header className="border-b bg-white shadow-sm">
      <div className="flex h-16 items-center px-4 md:px-6">
        <div className="flex items-center gap-2 font-serif">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
            T
          </div>
          <span className="text-xl font-semibold text-secondary">TherapyFlow</span>
        </div>

        <div className="ml-auto flex items-center gap-4">
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search patients..."
              className="w-full rounded-full bg-background pl-8 md:w-64 focus-visible:ring-primary"
            />
          </div>

          <Button
            variant="ghost"
            size="icon"
            className={`rounded-full transition-all duration-300 ${isRecording ? "bg-primary/10 text-primary" : ""}`}
            onClick={() => setIsRecording(!isRecording)}
          >
            {isRecording ? (
              <div className="relative">
                <MicOff className="h-5 w-5" />
                <span className="sr-only">Stop recording</span>
              </div>
            ) : (
              <div className="relative">
                <Mic className="h-5 w-5" />
                <span className="sr-only">Start recording</span>
              </div>
            )}
          </Button>

          <Button variant="ghost" size="icon" className="rounded-full relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary"></span>
            <span className="sr-only">Notifications</span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Dr. Emily Chen" />
                  <AvatarFallback>EC</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">Dr. Emily Chen</p>
                  <p className="text-xs leading-none text-muted-foreground">emily@therapyflow.com</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Calendar</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

