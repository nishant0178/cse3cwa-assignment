import { useState, useEffect } from 'react';
import { FaBars } from 'react-icons/fa';
import Link from 'next/link';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);

    // update body styles for dark mode
    if (newMode) {
      document.body.style.backgroundColor = '#1a1a1a';
      document.body.style.color = '#ffffff';
    } else {
      document.body.style.backgroundColor = '#ffffff';
      document.body.style.color = '#000000';
    }

    // let other pages know about the change
    window.dispatchEvent(new CustomEvent('darkModeChange', { detail: { darkMode: newMode } }));
  };

  return (
    <header style={{
      background: darkMode ? '#333' : '#fff',
      color: darkMode ? '#fff' : '#000',
      padding: '0.5rem 1rem',
      borderBottom: '2px solid #ccc',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
          CSE3CWA
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ fontSize: '0.9rem', fontWeight: '500' }}>
            21973913
          </div>

          <button
            onClick={toggleDarkMode}
            style={{
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
            }}
          >
            <span style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: darkMode ? '#fff' : '#333',
              display: 'inline-block'
            }}></span>
            Dark Mode
          </button>

          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                background: 'none',
                border: 'none',
                color: 'inherit',
                cursor: 'pointer',
                padding: '0.5rem',
                transform: menuOpen ? 'rotate(90deg)' : 'rotate(0deg)',
                transition: 'transform 0.3s ease'
              }}
            >
              <FaBars size={20} />
            </button>

            {menuOpen && (
              <div style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                background: darkMode ? '#444' : '#fff',
                border: `1px solid ${darkMode ? '#555' : '#ccc'}`,
                borderRadius: '4px',
                minWidth: '200px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                zIndex: 1001
              }}>
                <Link href="/" style={{
                  display: 'block',
                  padding: '0.5rem 1rem',
                  color: 'inherit',
                  textDecoration: 'none',
                  borderBottom: `1px solid ${darkMode ? '#555' : '#eee'}`
                }}>
                  Tabs
                </Link>
                <Link href="/pre-lab" style={{
                  display: 'block',
                  padding: '0.5rem 1rem',
                  color: 'inherit',
                  textDecoration: 'none',
                  borderBottom: `1px solid ${darkMode ? '#555' : '#eee'}`
                }}>
                  Pre-lab Questions
                </Link>
                <Link href="/escape-room" style={{
                  display: 'block',
                  padding: '0.5rem 1rem',
                  color: 'inherit',
                  textDecoration: 'none',
                  borderBottom: `1px solid ${darkMode ? '#555' : '#eee'}`
                }}>
                  Escape Room
                </Link>
                <Link href="/coding-races" style={{
                  display: 'block',
                  padding: '0.5rem 1rem',
                  color: 'inherit',
                  textDecoration: 'none',
                  borderBottom: `1px solid ${darkMode ? '#555' : '#eee'}`
                }}>
                  Coding Races
                </Link>
                <Link href="/court-room" style={{
                  display: 'block',
                  padding: '0.5rem 1rem',
                  color: 'inherit',
                  textDecoration: 'none',
                  borderBottom: `1px solid ${darkMode ? '#555' : '#eee'}`
                }}>
                  Court Room
                </Link>
                <Link href="/about" style={{
                  display: 'block',
                  padding: '0.5rem 1rem',
                  color: 'inherit',
                  textDecoration: 'none'
                }}>
                  About
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
