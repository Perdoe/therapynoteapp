"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { DevStorage } from '@/lib/dev-storage';

interface Therapist {
    id: string;
    firstName: string;
    lastName: string;
    email?: string;
}

interface TherapistContextType {
    therapist: Therapist | null;
    isLoading: boolean;
    error: string | null;
    setTherapist: (credentials: { id: string; password: string }) => Promise<boolean>;
    logout: () => void;
}

const TherapistContext = createContext<TherapistContextType | undefined>(undefined);

export function TherapistProvider({ children }: { children: ReactNode }) {
    const [therapist, setTherapistState] = useState<Therapist | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const setTherapist = async (credentials: { 
        id: string; 
        password: string;
    }): Promise<boolean> => {
        setIsLoading(true);
        setError(null);

        try {
            console.log('Attempting login with credentials:', credentials);

            // Check for dummy therapist first (ID: 101)
            if (credentials.id === '101' && credentials.password === 'therapy123') {
                console.log('Logging in as dummy therapist');
                setTherapistState({
                    id: '101',
                    firstName: 'Default',
                    lastName: 'Therapist'
                });
                return true;
            }

            // For all other therapists, check localStorage
            const storedTherapists = JSON.parse(localStorage.getItem('therapists') || '{}');
            console.log('Checking stored therapists:', storedTherapists);
            
            const storedTherapist = storedTherapists[credentials.id];
            console.log('Found therapist:', storedTherapist);

            if (storedTherapist && storedTherapist.password === credentials.password) {
                setTherapistState({
                    id: storedTherapist.therapist_id,
                    firstName: storedTherapist.first_name,
                    lastName: storedTherapist.last_name,
                    email: storedTherapist.email
                });
                return true;
            }

            return false;
        } catch (err) {
            console.error('Error in setTherapist:', err);
            setError('Failed to authenticate');
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        setTherapistState(null);
    };

    return (
        <TherapistContext.Provider value={{ therapist, isLoading, error, setTherapist, logout }}>
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