import path from 'path';
import { fileURLToPath } from 'url';
import * as operations from './operations.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

class TherapyDatabase {
    constructor() {
        this.baseDir = path.join(process.cwd(), 'data');
        this.createDirectories();
    }

    // Create necessary directories if they don't exist
    createDirectories() {
        const dirs = ['patients', 'sessions', 'therapists'].map(dir => 
            path.join(this.baseDir, dir)
        );
        
        dirs.forEach(dir => {
            operations.writeFile(path.join(dir, '.gitkeep'), {}).catch(() => {});
        });
    }

    // Therapist Operations
    async createTherapist(firstName, lastName, therapistId = null) {
        try {
            console.log('Creating therapist with:', { firstName, lastName, therapistId });
            
            // Validate inputs
            if (!firstName || !lastName) {
                throw new Error('Missing required fields');
            }

            // Use provided ID or generate a new one
            const id = therapistId || Date.now().toString();
            console.log('Using therapist ID:', id);

            const filePath = path.join(this.baseDir, 'therapists', `therapist_${id}.json`);
            console.log('File path:', filePath);
            
            const content = {
                first_name: firstName,
                last_name: lastName,
                therapist_id: id,
                created_at: new Date().toISOString()
            };

            await operations.writeFile(filePath, content);
            console.log('Therapist file created successfully');
            
            // Verify the file was created
            const exists = await operations.fileExists(filePath);
            if (!exists) {
                throw new Error('Failed to verify therapist file creation');
            }
            
            return id;
        } catch (error) {
            console.error('Error in createTherapist:', error);
            throw new Error(`Failed to create therapist: ${error.message}`);
        }
    }

    async getTherapist(therapistId) {
        try {
            const filePath = path.join(this.baseDir, 'therapists', `therapist_${therapistId}.json`);
            const therapist = await operations.readFile(filePath);
            return therapist;
        } catch (error) {
            console.error('Error in getTherapist:', error);
            throw new Error(`Failed to get therapist: ${error.message}`);
        }
    }

    async listTherapists() {
        try {
            const therapistsDir = path.join(this.baseDir, 'therapists');
            const files = await operations.listFiles(therapistsDir);
            const therapists = await Promise.all(
                files
                    .filter(file => file.endsWith('.json'))
                    .map(async file => {
                        const therapist = await operations.readFile(path.join(therapistsDir, file));
                        return {
                            id: therapist.therapist_id,
                            firstName: therapist.first_name,
                            lastName: therapist.last_name,
                            createdAt: therapist.created_at
                        };
                    })
            );
            return therapists;
        } catch (error) {
            console.error('Error in listTherapists:', error);
            return [];
        }
    }

    // Patient Operations
    async createPatient(firstName, lastName, therapistId) {
        try {
            console.log('Creating patient with:', { firstName, lastName, therapistId });
            
            // Validate inputs
            if (!firstName || !lastName || !therapistId) {
                throw new Error('Missing required fields');
            }

            // Verify therapist exists
            try {
                const therapist = await this.getTherapist(therapistId);
                console.log('Verified therapist exists:', therapist);
            } catch (error) {
                console.error('Therapist verification failed:', error);
                throw new Error('Invalid therapist ID');
            }

            const patientId = Date.now().toString();
            console.log('Generated patient ID:', patientId);

            const filePath = path.join(this.baseDir, 'patients', `patient_${patientId}.json`);
            console.log('File path:', filePath);
            
            const content = {
                first_name: firstName,
                last_name: lastName,
                patient_id: patientId,
                therapist_id: therapistId,
                created_at: new Date().toISOString()
            };

            await operations.writeFile(filePath, content);
            console.log('Patient file created successfully');
            
            // Verify the file was created
            const exists = await operations.fileExists(filePath);
            if (!exists) {
                throw new Error('Failed to verify patient file creation');
            }
            
            return patientId;
        } catch (error) {
            console.error('Error in createPatient:', error);
            throw new Error(`Failed to create patient: ${error.message}`);
        }
    }

    async getPatient(patientId) {
        try {
            const filePath = path.join(this.baseDir, 'patients', `patient_${patientId}.json`);
            return await operations.readFile(filePath);
        } catch (error) {
            console.error('Error in getPatient:', error);
            throw new Error(`Failed to get patient: ${error.message}`);
        }
    }

    async listPatients(therapistId) {
        try {
            console.log('Listing patients for therapist:', therapistId)
            const patientsDir = path.join(this.baseDir, 'patients');
            const files = await operations.listFiles(patientsDir);
            console.log('Found patient files:', files)
            
            const patients = await Promise.all(
                files
                    .filter(file => file.endsWith('.json'))
                    .map(async file => {
                        try {
                            const patient = await operations.readFile(path.join(patientsDir, file));
                            console.log('Read patient file:', file, patient)
                            return {
                                id: patient.patient_id,
                                firstName: patient.first_name || '',
                                lastName: patient.last_name || '',
                                therapistId: patient.therapist_id,
                                createdAt: patient.created_at
                            };
                        } catch (error) {
                            console.error(`Error reading patient file ${file}:`, error);
                            return null;
                        }
                    })
            );
            
            // Filter out null values and patients not belonging to the therapist
            const filteredPatients = patients
                .filter(patient => patient !== null && patient.therapistId === therapistId)
                .sort((a, b) => {
                    const aName = (a.lastName || '').toLowerCase();
                    const bName = (b.lastName || '').toLowerCase();
                    return aName.localeCompare(bName);
                });
            
            console.log('Filtered patients:', filteredPatients)
            return filteredPatients;
        } catch (error) {
            console.error('Error in listPatients:', error);
            return [];
        }
    }

    // Session Operations
    async createSession(patientId, sessionType, notes) {
        const sessionId = Date.now().toString();
        const filePath = path.join(this.baseDir, 'sessions', `session_${patientId}_${sessionId}.json`);
        
        const content = {
            session_type: sessionType,
            created_at: new Date().toISOString(),
            notes: notes
        };

        await operations.writeFile(filePath, content);
        return sessionId;
    }

    async getSession(patientId, sessionId) {
        const filePath = path.join(this.baseDir, 'sessions', `session_${patientId}_${sessionId}.json`);
        return await operations.readFile(filePath);
    }

    async updateSessionAIContent(patientId, sessionId, aiSummary, aiIdeas) {
        const filePath = path.join(this.baseDir, 'sessions', `session_${patientId}_${sessionId}.json`);
        const content = {
            ai_summary: aiSummary,
            ai_ideas: aiIdeas
        };
        await operations.appendToFile(filePath, content);
    }

    async listSessions(patientId) {
        const allSessions = await operations.listFiles(path.join(this.baseDir, 'sessions'));
        return allSessions.filter(file => file.includes(`_${patientId}_`));
    }
}

const db = new TherapyDatabase();
export { db }; 