import { NextResponse } from 'next/server'
import { db } from '@/database/index'

export async function GET(request: Request) {
  try {
    console.log('Fetching patients...')
    const url = new URL(request.url)
    const therapistId = url.searchParams.get('therapistId')
    
    if (!therapistId) {
      console.error('No therapist ID provided')
      return NextResponse.json(
        { error: 'Therapist ID is required' },
        { status: 400 }
      )
    }

    console.log('Using therapist ID:', therapistId)
    const patients = await db.listPatients(therapistId)
    console.log('Raw patients from database:', patients)
    
    // Ensure consistent data format
    const formattedPatients = patients.map(patient => ({
      id: patient.id,
      first_name: patient.firstName || '',
      last_name: patient.lastName || '',
      therapistId: patient.therapistId,
      createdAt: patient.createdAt
    }))

    console.log('Formatted patients:', formattedPatients)
    return NextResponse.json({ patients: formattedPatients })
  } catch (error) {
    console.error('Error fetching patients:', error)
    return NextResponse.json(
      { error: 'Failed to fetch patients', details: error.message },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    console.log('Creating patient with data:', body)

    const { firstName, lastName, therapistId } = body

    // Validate input
    if (!firstName || !lastName || !therapistId) {
      return NextResponse.json(
        { 
          error: 'Missing required fields', 
          details: 'First name, last name, and therapist ID are required',
          received: { firstName, lastName, therapistId }
        },
        { status: 400 }
      )
    }

    // Validate therapist exists
    try {
      await db.getTherapist(therapistId)
    } catch (error) {
      return NextResponse.json(
        { 
          error: 'Invalid therapist', 
          details: 'The specified therapist does not exist',
          therapistId 
        },
        { status: 400 }
      )
    }

    const patientId = await db.createPatient(firstName, lastName, therapistId)
    console.log('Patient created successfully with ID:', patientId)

    return NextResponse.json({ 
      patientId,
      message: 'Patient created successfully'
    })
  } catch (error) {
    console.error('Error creating patient:', error)
    return NextResponse.json(
      { 
        error: 'Failed to create patient', 
        details: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    )
  }
} 