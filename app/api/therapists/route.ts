import { NextResponse } from 'next/server';
import { db } from '@/database';

export async function GET() {
    try {
        console.log('Fetching therapists...');
        const therapists = await db.listTherapists();
        console.log('Therapists fetched:', therapists);
        return NextResponse.json(therapists || []);
    } catch (error) {
        console.error('Error fetching therapists:', error);
        return NextResponse.json(
            { error: 'Failed to fetch therapists', details: error.message },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        console.log('Creating therapist with data:', body);

        const { firstName, lastName } = body;

        // Validate input
        if (!firstName || !lastName) {
            return NextResponse.json(
                { 
                    error: 'Missing required fields', 
                    details: 'First name and last name are required',
                    received: { firstName, lastName }
                },
                { status: 400 }
            );
        }

        const therapistId = await db.createTherapist(firstName, lastName);
        console.log('Therapist created successfully with ID:', therapistId);

        return NextResponse.json({ therapistId });
    } catch (error) {
        console.error('Error creating therapist:', error);
        return NextResponse.json(
            { 
                error: 'Failed to create therapist', 
                details: error.message,
                stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
            },
            { status: 500 }
        );
    }
} 