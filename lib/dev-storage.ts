// Simple storage system for development
export const DevStorage = {
    // Store a therapist
    saveTherapist: (therapist: {
      therapist_id: string;
      first_name: string;
      last_name: string;
      password: string;
      email?: string;
    }) => {
      console.log('DevStorage - Saving therapist:', therapist);
      try {
        let therapists = {};
        try {
          therapists = JSON.parse(localStorage.getItem('therapists') || '{}');
        } catch (e) {
          console.error('DevStorage - Error parsing existing therapists:', e);
        }
        
        // therapists[therapist.therapist_id] = therapist;
        localStorage.setItem('therapists', JSON.stringify(therapists));
        
        // Verify the save
        const saved = localStorage.getItem('therapists');
        console.log('DevStorage - Stored therapists after save:', saved);
        return true;
      } catch (error) {
        console.error('DevStorage - Error saving therapist:', error);
        return false;
      }
    },
  
    // Get a therapist by ID
    getTherapist: (id: string) => {
      console.log('DevStorage - Getting therapist with ID:', id);
      try {
        const therapists = JSON.parse(localStorage.getItem('therapists') || '{}');
        console.log('DevStorage - All stored therapists:', therapists);
        const therapist = therapists[id];
        console.log('DevStorage - Found therapist:', therapist);
        return therapist;
      } catch (error) {
        console.error('DevStorage - Error getting therapist:', error);
        return null;
      }
    },
  
    // Initialize with dummy therapist if not exists
    initDummyTherapist: () => {
      console.log('DevStorage - Initializing dummy therapist');
      try {
        const therapists = JSON.parse(localStorage.getItem('therapists') || '{}');
        if (!therapists['101']) {
          therapists['101'] = {
            therapist_id: '101',
            first_name: 'Default',
            last_name: 'Therapist',
            password: 'therapy123',
            created_at: new Date().toISOString()
          };
          localStorage.setItem('therapists', JSON.stringify(therapists));
          console.log('DevStorage - Dummy therapist initialized:', therapists['101']);
        } else {
          console.log('DevStorage - Dummy therapist already exists:', therapists['101']);
        }
      } catch (error) {
        console.error('DevStorage - Error initializing dummy therapist:', error);
      }
    },
  
    // Clear all stored data (useful for testing)
    clearStorage: () => {
      localStorage.removeItem('therapists');
      console.log('Cleared therapist storage');
    }
  };