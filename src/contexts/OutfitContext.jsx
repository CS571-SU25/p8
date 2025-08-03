import React, { createContext, useState, useEffect } from 'react';

export const OutfitContext = createContext();

export function OutfitProvider({ children }) {
  const [userPreferences, setUserPreferences] = useState({
    gender: 'male',
    purpose: 'casual',
    style: 'modern',
    colorPreference: 'neutral',
    weatherSensitivity: 'normal',
    savedOutfits: [],
    favoriteItems: []
  });

  const [outfitHistory, setOutfitHistory] = useState([]);

  // Load preferences from localStorage on mount
  useEffect(() => {
    const savedPreferences = localStorage.getItem('outfitPreferences');
    const savedHistory = localStorage.getItem('outfitHistory');
    
    if (savedPreferences) {
      setUserPreferences(JSON.parse(savedPreferences));
    }
    
    if (savedHistory) {
      setOutfitHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Save preferences to localStorage when they change
  useEffect(() => {
    localStorage.setItem('outfitPreferences', JSON.stringify(userPreferences));
  }, [userPreferences]);

  useEffect(() => {
    localStorage.setItem('outfitHistory', JSON.stringify(outfitHistory));
  }, [outfitHistory]);

  const updatePreferences = (newPreferences) => {
    setUserPreferences(prev => ({ ...prev, ...newPreferences }));
  };

  const saveOutfit = (outfit) => {
    const newOutfit = {
      id: Date.now(),
      ...outfit,
      savedAt: new Date().toISOString()
    };
    setUserPreferences(prev => ({
      ...prev,
      savedOutfits: [...prev.savedOutfits, newOutfit]
    }));
  };

  const removeOutfit = (outfitId) => {
    setUserPreferences(prev => ({
      ...prev,
      savedOutfits: prev.savedOutfits.filter(outfit => outfit.id !== outfitId)
    }));
  };

  const addToHistory = (outfitData) => {
    const historyEntry = {
      id: Date.now(),
      ...outfitData,
      timestamp: new Date().toISOString()
    };
    setOutfitHistory(prev => [historyEntry, ...prev.slice(0, 49)]); // Keep last 50 entries
  };

  const addFavoriteItem = (item) => {
    setUserPreferences(prev => ({
      ...prev,
      favoriteItems: [...prev.favoriteItems, { id: Date.now(), ...item }]
    }));
  };

  const removeFavoriteItem = (itemId) => {
    setUserPreferences(prev => ({
      ...prev,
      favoriteItems: prev.favoriteItems.filter(item => item.id !== itemId)
    }));
  };

  const clearHistory = () => {
    setOutfitHistory([]);
  };

  const value = {
    userPreferences,
    outfitHistory,
    updatePreferences,
    saveOutfit,
    removeOutfit,
    addToHistory,
    addFavoriteItem,
    removeFavoriteItem,
    clearHistory
  };

  return (
    <OutfitContext.Provider value={value}>
      {children}
    </OutfitContext.Provider>
  );
}