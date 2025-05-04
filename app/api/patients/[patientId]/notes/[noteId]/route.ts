import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export async function DELETE(
  request: Request,
  { params }: { params: { patientId: string; noteId: string } }
) {
  try {
    const { patientId, noteId } = params
    const noteFilePath = path.join(
      process.cwd(),
      "data",
      "patients",
      patientId,
      "notes",
      `${noteId}.json`
    )

    // Check if file exists
    if (!fs.existsSync(noteFilePath)) {
      return NextResponse.json(
        { error: "Note not found" },
        { status: 404 }
      )
    }

    // Delete the note file
    fs.unlinkSync(noteFilePath)

    return NextResponse.json({ message: "Note deleted successfully" })
  } catch (error) {
    console.error("Error deleting note:", error)
    return NextResponse.json(
      { error: "Failed to delete note" },
      { status: 500 }
    )
  }
} 