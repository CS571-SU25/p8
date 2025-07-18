import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = Cookies.get('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const toggleFavorite = (location) => {
    const isFavorited = favorites.some(fav => fav.id === location.id);
    const newFavorites = isFavorited
      ? favorites.filter((fav) => fav.id !== location.id)
      : [...favorites, location];
    setFavorites(newFavorites);
    Cookies.set('favorites', JSON.stringify(newFavorites), { expires: 365 });
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};