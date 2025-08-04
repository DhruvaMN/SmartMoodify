import {createContext, useContext, useState, useEffect} from 'react';

export const PreferenceContext = createContext();

// Helper functions for localStorage
const getStoredPreferences = () => {
    try {
        const stored = localStorage.getItem('smartMoodifyPreferences');
        return stored ? JSON.parse(stored) : null;
    } catch (error) {
        console.error('Error loading preferences from localStorage:', error);
        return null;
    }
};

const savePreferencesToStorage = (preferences) => {
    try {
        localStorage.setItem('smartMoodifyPreferences', JSON.stringify(preferences));
    } catch (error) {
        console.error('Error saving preferences to localStorage:', error);
    }
};

export function PreferenceContextProvider({children}) {
    // Initialize with localStorage data or defaults
    const storedPrefs = getStoredPreferences();
    
    const [musicGenres, setMusicGenres] = useState(storedPrefs?.musicGenres || [])
    const [cuisines, setCuisines] = useState(storedPrefs?.cuisines || [])
    const [dietaryPrefs, setDietaryPrefs] = useState(storedPrefs?.dietaryPrefs || {
        vegetarian: false,
        vegan: false,
        glutenFree: false
    })

    // Save to localStorage whenever preferences change
    useEffect(() => {
        const preferences = {
            musicGenres,
            cuisines,
            dietaryPrefs
        };
        savePreferencesToStorage(preferences);
    }, [musicGenres, cuisines, dietaryPrefs]);

    return (
        <PreferenceContext.Provider value={{musicGenres, setMusicGenres, cuisines, setCuisines, dietaryPrefs, setDietaryPrefs}}>
            {children}
        </PreferenceContext.Provider>
    )
}

export const usePreference = () => useContext(PreferenceContext)