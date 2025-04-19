"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { db } from '@/database';

interface Therapist {
    id: string;
    firstName: string;
    lastName: string;
}

interface TherapistContextType {
    therapist: Therapist | null;
    isLoading: boolean;
    error: string | null;
    setTherapist: (therapist: Therapist | null) => void;
}

const TherapistContext = createContext<TherapistContextType | undefined>(undefined);

// Dummy therapist for development
const DUMMY_THERAPIST = {
    id: 'dev-therapist-123',
    firstName: 'Development',
    lastName: 'Therapist'
};

export function TherapistProvider({ children }: { children: ReactNode }) {
    const [therapist, setTherapist] = useState<Therapist | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadTherapist() {
            try {
                if (process.env.NODE_ENV === 'development') {
                    // In development, ensure the dummy therapist exists
                    try {
                        // Try to get the therapist first
                        const existingTherapist = await db.getTherapist(DUMMY_THERAPIST.id);
                        console.log('Dummy therapist exists:', existingTherapist);
                        setTherapist(DUMMY_THERAPIST);
                    } catch (error) {
                        // If therapist doesn't exist, create it
                        console.log('Creating dummy therapist...');
                        const therapistId = await db.createTherapist(
                            DUMMY_THERAPIST.firstName, 
                            DUMMY_THERAPIST.lastName,
                            DUMMY_THERAPIST.id
                        );
                        console.log('Created therapist with ID:', therapistId);
                        
                        // Verify the therapist was created
                        const newTherapist = await db.getTherapist(therapistId);
                        console.log('Verified therapist:', newTherapist);
                        
                        setTherapist(DUMMY_THERAPIST);
                    }
                } else {
                    // In production, we'll implement proper authentication
                    const defaultTherapist = {
                        id: 'default',
                        firstName: 'Default',
                        lastName: 'Therapist'
                    };
                    setTherapist(defaultTherapist);
                }
            } catch (err) {
                console.error('Error in loadTherapist:', err);
                setError('Failed to load therapist information');
            } finally {
                setIsLoading(false);
            }
        }

        loadTherapist();
    }, []);

    return (
        <TherapistContext.Provider value={{ therapist, isLoading, error, setTherapist }}>
            {process.env.NODE_ENV === 'development' && therapist && (
                <div className="fixed top-0 left-0 right-0 bg-yellow-100 text-yellow-800 p-2 text-center text-sm">
                    🚧 DEVELOPMENT MODE: Using dummy therapist account ({therapist.firstName} {therapist.lastName})
                </div>
            )}
            {children}
        </TherapistContext.Provider>
    );
}

export function useTherapist() {
    const context = useContext(TherapistContext);
    if (context === undefined) {
        throw new Error('useTherapist must be used within a TherapistProvider');
    }
    return context;
} 