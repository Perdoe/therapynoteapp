export async function getPatients(therapistId: string) {
  try {
    console.log('Fetching patients for therapist:', therapistId)
    const response = await fetch(`/api/patients?therapistId=${therapistId}`)
    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch patients')
    }
    
    // Return the patients array directly
    return data.patients || []
  } catch (error) {
    console.error('Error in getPatients:', error)
    return []
  }
}

export async function createPatient(firstName: string, lastName: string, therapistId: string) {
  try {
    // Validate input
    if (!firstName || !lastName || !therapistId) {
      throw new Error('Missing required fields')
    }

    const response = await fetch('/api/patients', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstName, lastName, therapistId }),
    })
    
    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to create patient')
    }
    
    return data
  } catch (error) {
    console.error('Error in createPatient:', error)
    throw error
  }
}

export async function getTherapists() {
  try {
    const response = await fetch('/api/therapists')
    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch therapists')
    }
    
    return data
  } catch (error) {
    console.error('Error in getTherapists:', error)
    return { therapists: [] }
  }
}

export async function createTherapist(firstName: string, lastName: string) {
  try {
    // Validate input
    if (!firstName || !lastName) {
      throw new Error('Missing required fields')
    }

    const response = await fetch('/api/therapists', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstName, lastName }),
    })
    
    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to create therapist')
    }
    
    return data
  } catch (error) {
    console.error('Error in createTherapist:', error)
    throw error
  }
}

export async function deletePatient(patientId: string) {
  try {
    const response = await fetch(`/api/patients/${patientId}`, {
      method: 'DELETE',
    })
    
    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to delete patient')
    }
    
    return data
  } catch (error) {
    console.error('Error in deletePatient:', error)
    throw error
  }
} 