"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Send, Clock } from "lucide-react"

interface PatientMessagesProps {
  onShare: (message: string) => void
}

export function PatientMessages({ onShare }: PatientMessagesProps) {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "patient",
      content:
        "I've been practicing the breathing exercises daily, but I'm still having trouble with the work presentations.",
      timestamp: "May 2, 2024 • 10:23 AM",
    },
    {
      id: 2,
      sender: "therapist",
      content:
        "That's great progress with the breathing exercises! For the presentations, let's discuss some specific strategies in our next session. Have you tried the visualization technique we talked about?",
      timestamp: "May 2, 2024 • 2:45 PM",
    },
    {
      id: 3,
      sender: "patient",
      content:
        "I tried it once, but I wasn't sure if I was doing it correctly. Could you send me some more detailed instructions?",
      timestamp: "May 3, 2024 • 9:15 AM",
    },
    {
      id: 4,
      sender: "therapist",
      content:
        "Of course! I'll send you a detailed guide. In the meantime, try to practice for just 5 minutes before bed. Visualize yourself giving the presentation calmly and confidently.",
      timestamp: "May 3, 2024 • 11:30 AM",
    },
  ])

  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = () => {
    if (message.trim()) {
      // Add message to the conversation
      const newMessage = {
        id: Date.now(),
        sender: "patient",
        content: message,
        timestamp: new Date().toLocaleString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }),
      }

      setMessages([...messages, newMessage])

      // Also trigger the share confirmation
      onShare(message)

      // Clear the input
      setMessage("")
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-medium">Messages with Dr. Emily</h2>
        <div className="flex items-center text-xs text-[#555]">
          <Clock className="h-3.5 w-3.5 mr-1" />
          <span>Typically responds within 24 hours</span>
        </div>
      </div>

      <div className="flex-1 overflow-auto mb-4 bg-white/50 rounded-2xl p-4">
        <div className="space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === "patient" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] rounded-2xl p-3 ${
                  msg.sender === "patient" ? "bg-[#4CAF50]/20 rounded-tr-none" : "bg-white rounded-tl-none"
                }`}
              >
                <p className="text-sm">{msg.content}</p>
                <p className="text-xs text-[#777] mt-1">{msg.timestamp}</p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-3 flex items-center gap-2">
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 p-2 text-sm focus:outline-none"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault()
              handleSend()
            }
          }}
        />
        <motion.button
          className="p-2 rounded-full bg-[#4CAF50] text-white"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSend}
          disabled={!message.trim()}
        >
          <Send className="h-5 w-5" />
        </motion.button>
      </div>
    </div>
  )
}
