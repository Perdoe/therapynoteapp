import { db } from '../database/index.js';

async function initDummyData() {
  try {
    // Create dummy therapist if not exists
    const therapistId = '101';
    try {
      await db.getTherapist(therapistId);
      console.log('Dummy therapist already exists');
    } catch (error) {
      await db.createTherapist('Dummy', 'Therapist', therapistId);
      console.log('Created dummy therapist');
    }
    
    console.log('Dummy data initialization complete');
  } catch (error) {
    console.error('Error initializing dummy data:', error);
  }
}

initDummyData(); 