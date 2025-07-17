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
    const newFavorites = favorites.includes(location)
      ? favorites.filter((fav) => fav !== location)
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