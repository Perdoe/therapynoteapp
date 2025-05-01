import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export async function POST(
  request: Request,
  { params }: { params: { patientId: string } }
) {
  try {
    const { content, noteType, sessionId } = await request.json()
    const patientId = params.patientId

    // Validate input
    if (!content || !noteType || !sessionId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Create notes directory if it doesn't exist
    const notesDir = path.join(process.cwd(), "data", "patients", patientId, "notes")
    fs.mkdirSync(notesDir, { recursive: true })

    // Create note file
    const noteId = Date.now().toString()
    const noteFilePath = path.join(notesDir, `${noteId}.json`)
    
    const noteData = {
      id: noteId,
      content,
      noteType,
      sessionId,
      createdAt: new Date().toISOString(),
    }

    fs.writeFileSync(noteFilePath, JSON.stringify(noteData, null, 2))

    return NextResponse.json(noteData)
  } catch (error) {
    console.error("Error saving note:", error)
    return NextResponse.json(
      { error: "Failed to save note" },
      { status: 500 }
    )
  }
}

export async function GET(
  request: Request,
  { params }: { params: { patientId: string } }
) {
  try {
    const patientId = params.patientId
    const notesDir = path.join(process.cwd(), "data", "patients", patientId, "notes")

    // If notes directory doesn't exist, return empty array
    if (!fs.existsSync(notesDir)) {
      return NextResponse.json({ notes: [] })
    }

    // Read all note files
    const noteFiles = fs.readdirSync(notesDir)
    const notes = noteFiles
      .filter(file => file.endsWith('.json'))
      .map(file => {
        const filePath = path.join(notesDir, file)
        const fileContent = fs.readFileSync(filePath, 'utf-8')
        return JSON.parse(fileContent)
      })
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    return NextResponse.json({ notes })
  } catch (error) {
    console.error("Error fetching notes:", error)
    return NextResponse.json(
      { error: "Failed to fetch notes" },
      { status: 500 }
    )
  }
} 