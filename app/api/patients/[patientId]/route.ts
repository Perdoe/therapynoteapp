import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export async function GET(
  request: Request,
  { params }: { params: { patientId: string } }
) {
  try {
    const patientId = params.patientId
    const filePath = path.join(process.cwd(), "data", "patients", `patient_${patientId}.json`)

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: "Patient not found" },
        { status: 404 }
      )
    }

    // Read patient data
    const patientData = JSON.parse(fs.readFileSync(filePath, "utf-8"))

    return NextResponse.json(patientData)
  } catch (error) {
    console.error("Error fetching patient:", error)
    return NextResponse.json(
      { error: "Failed to fetch patient" },
      { status: 500 }
    )
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { patientId: string } }
) {
  try {
    const { first_name, last_name } = await request.json()

    if (!first_name || !last_name) {
      return NextResponse.json(
        { error: "First name and last name are required" },
        { status: 400 }
      )
    }

    const patientId = params.patientId
    const filePath = path.join(process.cwd(), "data", "patients", `patient_${patientId}.json`)

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: "Patient not found" },
        { status: 404 }
      )
    }

    // Read current patient data
    const patientData = JSON.parse(fs.readFileSync(filePath, "utf-8"))

    // Update patient data
    const updatedPatientData = {
      ...patientData,
      first_name,
      last_name,
      updated_at: new Date().toISOString(),
    }

    // Write updated data back to file
    fs.writeFileSync(filePath, JSON.stringify(updatedPatientData, null, 2))

    return NextResponse.json(updatedPatientData)
  } catch (error) {
    console.error("Error updating patient:", error)
    return NextResponse.json(
      { error: "Failed to update patient" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { patientId: string } }
) {
  try {
    const patientId = params.patientId
    const patientFilePath = path.join(process.cwd(), "data", "patients", `patient_${patientId}.json`)
    const sessionsDirPath = path.join(process.cwd(), "data", "sessions", patientId)

    // Check if patient file exists
    if (!fs.existsSync(patientFilePath)) {
      return NextResponse.json(
        { error: "Patient not found" },
        { status: 404 }
      )
    }

    // Delete patient file
    fs.unlinkSync(patientFilePath)

    // Delete sessions directory if it exists
    if (fs.existsSync(sessionsDirPath)) {
      fs.rmSync(sessionsDirPath, { recursive: true, force: true })
    }

    return NextResponse.json({ message: "Patient deleted successfully" })
  } catch (error) {
    console.error("Error deleting patient:", error)
    return NextResponse.json(
      { error: "Failed to delete patient" },
      { status: 500 }
    )
  }
} 