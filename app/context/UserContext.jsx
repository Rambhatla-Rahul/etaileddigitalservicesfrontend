'use client'
import { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));

    const cookieTheme = Cookies.get('theme');
    const prefersDark = cookieTheme === 'dark' || (!cookieTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setDarkMode(prefersDark);
  }, []);

  useEffect(() => {
    if (user) localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    Cookies.set('theme', darkMode ? 'dark' : 'light', { expires: 365 });
  }, [darkMode]);

  return (
    <UserContext.Provider value={{ user, setUser, darkMode, setDarkMode }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);