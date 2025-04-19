# Therapy Notes Database System

A simple text-based database system for managing therapy notes, patients, and therapists.

## Structure

The database system uses a file-based approach with the following structure:

- `/patients` - Contains patient data files (patient_[ID].txt)
- `/sessions` - Contains session notes (session_[patientID]_[sessionID].txt)
- `/therapists` - Contains therapist data (therapist_[ID].txt)

## Usage

```javascript
const db = require('./database');

// Create a new therapist
const therapistId = await db.createTherapist('Sarah', 'Johnson');

// Create a new patient
const patientId = await db.createPatient('John', 'Doe', therapistId);

// Create a new session
const sessionId = await db.createSession(patientId, 'Weekly Check-in', 'Patient reported improved sleep patterns...');

// Get patient information
const patient = await db.getPatient(patientId);

// Get session information
const session = await db.getSession(patientId, sessionId);

// Update session with AI content
await db.updateSessionAIContent(
    patientId, 
    sessionId,
    'Patient shows progress in sleep quality...',
    '1. Sleep hygiene improving, 2. Meditation beneficial...'
);

// List all patients
const patients = await db.listPatients();

// List all sessions for a patient
const sessions = await db.listSessions(patientId);
```

## File Formats

### Patient File Format
```
first_name: John
last_name: Doe
patient_id: 547
therapist_id: 101
```

### Session File Format
```
session_type: Weekly Check-in
created_at: 2025-04-15T14:30:00
notes: Patient reported improved sleep patterns...
ai_summary: Patient shows progress in sleep quality...
ai_ideas: 1. Sleep hygiene improving, 2. Meditation beneficial...
```

### Therapist File Format
```
first_name: Sarah
last_name: Johnson
therapist_id: 101
```

## Error Handling

All database operations are asynchronous and include error handling. Errors will be thrown with descriptive messages if operations fail. 