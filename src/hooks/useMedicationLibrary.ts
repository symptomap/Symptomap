import { useState, useEffect } from 'react';
import {
  MedicationEntry,
  mergeMedicationLibraries,
  addUserMedication,
  searchMedications
} from '../utils/medication-merge';
import { medicationLibraryData } from '../data/medicationLibraryData';

const STORAGE_KEY = 'symptomap_medication_library';

/**
 * Custom hook to manage medication library with:
 * - Non-destructive merging
 * - User-added medications
 * - localStorage persistence
 * - Search functionality
 */
export function useMedicationLibrary() {
  const [library, setLibrary] = useState<MedicationEntry[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize library from localStorage or predefined data
  useEffect(() => {
    const loadLibrary = () => {
      try {
        const storedLibrary = localStorage.getItem(STORAGE_KEY);
        
        if (storedLibrary) {
          // Load existing library
          const existingLibrary: MedicationEntry[] = JSON.parse(storedLibrary);
          
          // Merge with predefined library (non-destructive)
          // This ensures new medications from predefined library are added
          // while preserving user-added medications
          const mergedLibrary = mergeMedicationLibraries(
            existingLibrary,
            medicationLibraryData
          );
          
          setLibrary(mergedLibrary);
          
          // Save merged library back to localStorage
          localStorage.setItem(STORAGE_KEY, JSON.stringify(mergedLibrary));
        } else {
          // First time - use predefined library
          const initialLibrary = medicationLibraryData.map(med => ({
            ...med,
            source: 'predefined' as const
          }));
          
          setLibrary(initialLibrary);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(initialLibrary));
        }
      } catch (error) {
        console.error('Error loading medication library:', error);
        // Fallback to predefined library
        setLibrary(medicationLibraryData);
      }
      
      setIsLoaded(true);
    };

    loadLibrary();
  }, []);

  // Save library to localStorage whenever it changes
  const saveLibrary = (newLibrary: MedicationEntry[]) => {
    setLibrary(newLibrary);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newLibrary));
    } catch (error) {
      console.error('Error saving medication library:', error);
    }
  };

  // Add a new user medication
  const addMedication = (medicationName: string) => {
    const updatedLibrary = addUserMedication(library, medicationName);
    saveLibrary(updatedLibrary);
  };

  // Search medications
  const search = (query: string, limit: number = 10): MedicationEntry[] => {
    return searchMedications(library, query, limit);
  };

  // Manually merge new medications (for future updates)
  const mergeNewMedications = (newMedications: MedicationEntry[]) => {
    const mergedLibrary = mergeMedicationLibraries(library, newMedications);
    saveLibrary(mergedLibrary);
  };

  // Reset to predefined library (use with caution!)
  const resetLibrary = () => {
    const initialLibrary = (medicationLibraryData as MedicationEntry[]).map(med => ({
      ...med,
      source: 'predefined' as const
    }));
    
    saveLibrary(initialLibrary);
  };

  // Export library as JSON
  const exportLibrary = (): string => {
    return JSON.stringify(library, null, 2);
  };

  return {
    library,
    isLoaded,
    addMedication,
    search,
    mergeNewMedications,
    resetLibrary,
    exportLibrary
  };
}