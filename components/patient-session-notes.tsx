"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { MessageSquare, ThumbsUp, Calendar } from "lucide-react"

export function PatientSessionNotes() {
  const [notes, setNotes] = useState([
    {
      id: 1,
      date: "May 2, 2024",
      title: "Weekly Session",
      content:
        "Today we focused on developing mindfulness techniques to manage anxiety in workplace situations. We practiced breathing exercises and discussed strategies for setting boundaries with colleagues. You reported feeling more confident in your ability to handle stressful meetings.",
      acknowledged: true,
      comments: [],
    },
    {
      id: 2,
      date: "April 25, 2024",
      title: "Weekly Session",
      content:
        "We explored cognitive distortions related to work performance. You identified 'catastrophizing' and 'black-and-white thinking' as patterns that emerge during high-stress periods. We began working on cognitive restructuring techniques to challenge these thoughts.",
      acknowledged: true,
      comments: [
        {
          id: 1,
          text: "I've been practicing the cognitive restructuring and it's helping me recognize when I start catastrophizing.",
          date: "April 26, 2024",
        },
      ],
    },
    {
      id: 3,
      date: "April 18, 2024",
      title: "Weekly Session",
      content:
        "You reported increased anxiety following a difficult conversation with your manager. We discussed assertive communication strategies and role-played potential future interactions. Your homework includes journaling about workplace interactions and practicing self-validation.",
      acknowledged: false,
      comments: [],
    },
  ])

  const [newComments, setNewComments] = useState<{ [key: number]: string }>({})

  const acknowledgeNote = (noteId: number) => {
    setNotes(notes.map((note) => (note.id === noteId ? { ...note, acknowledged: true } : note)))
  }

  const addComment = (noteId: number) => {
    if (newComments[noteId]?.trim()) {
      setNotes(
        notes.map((note) => {
          if (note.id === noteId) {
            return {
              ...note,
              comments: [
                ...note.comments,
                {
                  id: Date.now(),
                  text: newComments[noteId],
                  date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
                },
              ],
            }
          }
          return note
        }),
      )

      // Clear the comment input
      setNewComments({ ...newComments, [noteId]: "" })
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-medium">Session Notes from Dr. Emily</h2>
        <div className="flex items-center text-xs text-[#555]">
          <Calendar className="h-3.5 w-3.5 mr-1" />
          <span>Next session: May 9, 2024</span>
        </div>
      </div>

      <div className="space-y-6 overflow-auto">
        {notes.map((note) => (
          <div key={note.id} className="bg-white rounded-2xl shadow-md overflow-hidden">
            <div className="p-4 border-b">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{note.title}</h3>
                  <p className="text-xs text-[#777]">{note.date}</p>
                </div>
                {!note.acknowledged && (
                  <motion.button
                    className="px-3 py-1 rounded-full bg-[#FFC107]/20 text-[#FFC107] text-xs font-medium flex items-center gap-1"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => acknowledgeNote(note.id)}
                  >
                    <ThumbsUp className="h-3 w-3" />
                    <span>Acknowledge</span>
                  </motion.button>
                )}
              </div>
            </div>

            <div className="p-4 bg-[#FFF8E1]/50">
              <p className="text-sm">{note.content}</p>
            </div>

            {note.comments.length > 0 && (
              <div className="p-4 border-t bg-white/50">
                <h4 className="text-sm font-medium mb-2">Your Comments</h4>
                <div className="space-y-2">
                  {note.comments.map((comment) => (
                    <div key={comment.id} className="bg-[#F5F5F5] rounded-lg p-2">
                      <p className="text-sm">{comment.text}</p>
                      <p className="text-xs text-[#777] mt-1">{comment.date}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="p-4 border-t flex items-center gap-2">
              <input
                type="text"
                placeholder="Add a comment..."
                value={newComments[note.id] || ""}
                onChange={(e) => setNewComments({ ...newComments, [note.id]: e.target.value })}
                className="flex-1 p-2 text-sm border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#FFC107]"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    addComment(note.id)
                  }
                }}
              />
              <motion.button
                className="p-2 rounded-full bg-[#FFC107] text-white"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => addComment(note.id)}
                disabled={!newComments[note.id]?.trim()}
              >
                <MessageSquare className="h-4 w-4" />
              </motion.button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
