'use client';
import { useState, useEffect } from 'react';
import { FaBars } from 'react-icons/fa';
import Link from 'next/link';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (darkMode) {
        document.body.style.backgroundColor = '#1a1a1a';
        document.body.style.color = '#ffffff';
        document.documentElement.style.setProperty('--bg-color', '#1a1a1a');
        document.documentElement.style.setProperty('--text-color', '#ffffff');
        document.documentElement.style.setProperty('--border-color', '#555');
        document.documentElement.style.setProperty('--card-bg', '#2d2d2d');
        document.documentElement.style.setProperty('--input-bg', '#333');
        document.documentElement.style.setProperty('--footer-bg', '#2d2d2d');
      } else {
        document.body.style.backgroundColor = '#ffffff';
        document.body.style.color = '#000000';
        document.documentElement.style.setProperty('--bg-color', '#ffffff');
        document.documentElement.style.setProperty('--text-color', '#000000');
        document.documentElement.style.setProperty('--border-color', '#000');
        document.documentElement.style.setProperty('--card-bg', '#f8f8f8');
        document.documentElement.style.setProperty('--input-bg', '#ffffff');
        document.documentElement.style.setProperty('--footer-bg', '#f1f1f1');
      }
      
      // Dispatch custom event for other components to listen
      window.dispatchEvent(new CustomEvent('darkModeChange', { detail: { darkMode } }));
    }
  }, [darkMode]);

  const headerStyle = {
    background: darkMode ? '#333' : '#fff',
    color: darkMode ? '#fff' : '#000',
    padding: '0.5rem 1rem',
    borderBottom: '2px solid #ccc',
    position: 'sticky' as const,
    top: 0,
    zIndex: 1000
  };

  const navStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '1200px',
    margin: '0 auto'
  };

  const titleStyle = {
    fontSize: '1.2rem',
    fontWeight: 'bold'
  };

  const rightSectionStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  };

  const studentNoStyle = {
    fontSize: '0.9rem',
    fontWeight: '500'
  };

  const toggleButtonStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    background: 'none',
    border: '1px solid currentColor',
    color: 'inherit',
    padding: '0.25rem 0.5rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.8rem'
  };

  const menuButtonStyle = {
    background: 'none',
    border: 'none',
    color: 'inherit',
    cursor: 'pointer',
    padding: '0.5rem'
  };

  const dropdownStyle = {
    position: 'absolute' as const,
    top: '100%',
    right: 0,
    background: darkMode ? '#444' : '#fff',
    border: `1px solid ${darkMode ? '#555' : '#ccc'}`,
    borderRadius: '4px',
    minWidth: '200px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    zIndex: 1001
  };

  const dropdownItemStyle = {
    display: 'block',
    padding: '0.5rem 1rem',
    color: 'inherit',
    textDecoration: 'none',
    borderBottom: `1px solid ${darkMode ? '#555' : '#eee'}`
  };

  return (
    <header style={headerStyle}>
      <nav style={navStyle}>
        <div style={titleStyle}>CSE3CWA</div>
        
        <div style={rightSectionStyle}>
          <div style={studentNoStyle}>21973913</div>
          
          <button style={toggleButtonStyle} onClick={toggleDarkMode}>
            <span style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: darkMode ? '#fff' : '#333',
              display: 'inline-block'
            }}></span>
            Dark Mode
          </button>
          
          <div style={{position: 'relative'}}>
            <button 
              style={{
                ...menuButtonStyle,
                transform: menuOpen ? 'rotate(90deg)' : 'rotate(0deg)',
                transition: 'transform 0.3s ease'
              }} 
              onClick={toggleMenu}
            >
              <FaBars size={20} />
            </button>
            
            {menuOpen && (
              <div style={dropdownStyle}>
                <Link href="/" style={dropdownItemStyle}>Tabs</Link>
                <Link href="/pre-lab" style={dropdownItemStyle}>Pre-lab Questions</Link>
                <Link href="/escape-room" style={dropdownItemStyle}>Escape Room</Link>
                <Link href="/coding-races" style={dropdownItemStyle}>Coding Races</Link>
                <Link href="/court-room" style={dropdownItemStyle}>Court Room</Link>
                <Link href="/about" style={dropdownItemStyle}>About</Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
