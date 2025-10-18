import { useState, useEffect } from 'react';

const AboutPage = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const handleDarkMode = (e: any) => setDarkMode(e.detail.darkMode);
    window.addEventListener('darkModeChange', handleDarkMode);
    return () => window.removeEventListener('darkModeChange', handleDarkMode);
  }, []);

  const cardBg = darkMode ? '#2d2d2d' : '#fff';
  const textColor = darkMode ? '#fff' : '#000';
  const secondaryText = darkMode ? '#b0b0b0' : '#666';

  return (
    <div style={{
      maxWidth: '900px',
      margin: '0 auto',
      padding: '40px 20px',
      color: textColor,
      minHeight: '80vh'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>
          About This Project
        </h1>
        <p style={{ color: secondaryText, fontSize: '1.1rem' }}>
          CSE3CWA Assignment 1
        </p>
      </div>

      {/* student info card */}
      <div style={{
        backgroundColor: cardBg,
        border: `2px solid ${darkMode ? '#555' : '#ddd'}`,
        borderRadius: '12px',
        padding: '30px',
        marginBottom: '40px',
        boxShadow: darkMode ? '0 4px 12px rgba(0,0,0,0.5)' : '0 4px 12px rgba(0,0,0,0.1)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '30px',
          flexWrap: 'wrap'
        }}>
          {/* avatar */}
          <div style={{
            width: '100px',
            height: '100px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2.5rem',
            color: 'white',
            fontWeight: 'bold'
          }}>
            NS
          </div>

          {/* info */}
          <div style={{ flex: 1 }}>
            <h2 style={{ fontSize: '2rem', margin: '0 0 8px 0' }}>
              Nishant Singh
            </h2>
            <p style={{ color: secondaryText, margin: '0 0 12px 0' }}>
              Computer Science Student
            </p>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              backgroundColor: darkMode ? 'rgba(0,123,255,0.2)' : 'rgba(0,123,255,0.1)',
              borderRadius: '20px',
              border: `1px solid ${darkMode ? 'rgba(0,123,255,0.3)' : 'rgba(0,123,255,0.2)'}`
            }}>
              <span style={{ fontSize: '1.2rem' }}>🎓</span>
              <span style={{ fontWeight: '600', color: '#007bff' }}>
                21973913
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* video section */}
      <div style={{
        backgroundColor: cardBg,
        border: `2px solid ${darkMode ? '#555' : '#ddd'}`,
        borderRadius: '12px',
        padding: '30px',
        boxShadow: darkMode ? '0 4px 12px rgba(0,0,0,0.5)' : '0 4px 12px rgba(0,0,0,0.1)',
        textAlign: 'center'
      }}>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '20px' }}>
          Video Demo
        </h2>

        <p style={{ color: secondaryText, marginBottom: '20px' }}>
          Walkthrough of the project features
        </p>

        <div style={{
          maxWidth: '700px',
          margin: '0 auto',
          borderRadius: '8px',
          overflow: 'hidden',
          backgroundColor: '#000'
        }}>
          <iframe
            width="100%"
            height="400"
            src=""
            title="Project Demo"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>

      {/* quick info */}
      <div style={{
        marginTop: '30px',
        padding: '20px',
        backgroundColor: darkMode ? 'rgba(255,193,7,0.1)' : 'rgba(255,193,7,0.05)',
        border: `1px solid ${darkMode ? 'rgba(255,193,7,0.3)' : 'rgba(255,193,7,0.2)'}`,
        borderRadius: '8px',
        fontSize: '0.9rem',
        color: secondaryText
      }}>
        <strong>Tech Stack:</strong> Next.js 15, TypeScript, React
        <br />
        <strong>Features:</strong> Tab management, HTML generation, Dark mode, LocalStorage
      </div>
    </div>
  );
};

export default AboutPage;
