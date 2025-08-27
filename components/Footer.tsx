'use client';
import { useState, useEffect } from 'react';

const Footer = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const handleDarkModeChange = (event: any) => {
      setDarkMode(event.detail.darkMode);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('darkModeChange', handleDarkModeChange);
      return () => window.removeEventListener('darkModeChange', handleDarkModeChange);
    }
  }, []);

  return (
    <footer style={{ 
      background: darkMode ? '#2d2d2d' : '#f1f1f1', 
      padding: '1rem', 
      textAlign: 'center', 
      marginTop: 'auto',
      color: darkMode ? '#fff' : '#000'
    }}>
      <p>© Nishant Singh | Student Number: 21973913 | Date: 26/8/2025</p>
    </footer>
  );
};

export default Footer;
