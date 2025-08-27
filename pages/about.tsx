'use client';
import { useState, useEffect } from 'react';

const AboutPage = () => {
  const [darkMode, setDarkMode] = useState(false);

  // Listen for dark mode changes
  useEffect(() => {
    const handleDarkModeChange = (event: CustomEvent) => {
      setDarkMode(event.detail.darkMode);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('darkModeChange', handleDarkModeChange);
      return () => window.removeEventListener('darkModeChange', handleDarkModeChange);
    }
  }, []);

  return (
    <div style={{ 
      maxWidth: '1100px', 
      margin: '0 auto', 
      padding: '60px 20px', 
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      color: darkMode ? '#fff' : '#000',
      minHeight: '80vh'
    }}>
      {/* Hero Header Section */}
      <div style={{
        textAlign: 'center',
        marginBottom: '60px',
        position: 'relative'
      }}>
        <div style={{
          position: 'absolute',
          top: '-20px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '80px',
          height: '80px',
          background: 'linear-gradient(135deg, #007bff, #0056b3)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: darkMode ? '0 8px 25px rgba(0, 123, 255, 0.3)' : '0 8px 25px rgba(0, 123, 255, 0.2)'
        }}>
          <span style={{ fontSize: '2rem', color: 'white' }}>👨‍💻</span>
        </div>
        
        <div style={{ paddingTop: '40px' }}>
          <h1 style={{
            fontSize: '3.2rem',
            fontWeight: '300',
            letterSpacing: '-1px',
            marginBottom: '15px',
            color: darkMode ? '#fff' : '#2c3e50',
            background: darkMode 
              ? 'linear-gradient(135deg, #ffffff, #e3e3e3)' 
              : 'linear-gradient(135deg, #2c3e50, #3498db)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            About This Project
          </h1>
          <p style={{
            fontSize: '1.2rem',
            color: darkMode ? '#b0b0b0' : '#7f8c8d',
            fontWeight: '300',
            maxWidth: '600px',
            margin: '0 auto 30px',
            lineHeight: '1.6'
          }}>
            CSE3CWA Assignment 1 
          </p>
          <div style={{
            width: '150px',
            height: '3px',
            background: 'linear-gradient(90deg, #007bff, #28a745)',
            margin: '0 auto',
            borderRadius: '2px'
          }}></div>
        </div>
      </div>

      {/* Professional Student Card */}
      <div style={{
        backgroundColor: darkMode ? 'rgba(45, 45, 45, 0.8)' : 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        border: `1px solid ${darkMode ? 'rgba(85, 85, 85, 0.3)' : 'rgba(222, 226, 230, 0.3)'}`,
        borderRadius: '20px',
        padding: '50px 40px',
        marginBottom: '60px',
        boxShadow: darkMode 
          ? '0 20px 60px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.05)' 
          : '0 20px 60px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.05)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: '0',
          left: '0',
          right: '0',
          height: '4px',
          background: 'linear-gradient(90deg, #007bff, #28a745, #ffc107, #dc3545)',
          borderRadius: '20px 20px 0 0'
        }}></div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'auto 1fr auto',
          gap: '40px',
          alignItems: 'center',
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          {/* Profile Avatar */}
          <div style={{
            width: '120px',
            height: '120px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '3rem',
            color: 'white',
            fontWeight: 'bold',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
            border: '4px solid rgba(255, 255, 255, 0.1)'
          }}>
            NS
          </div>

          {/* Student Information */}
          <div style={{
            textAlign: 'left'
          }}>
            <h2 style={{
              fontSize: '2.4rem',
              fontWeight: '600',
              margin: '0 0 8px 0',
              color: darkMode ? '#ffffff' : '#2c3e50',
              letterSpacing: '-0.5px'
            }}>
              Nishant Singh
            </h2>
            <p style={{
              fontSize: '1.1rem',
              color: darkMode ? '#b0b0b0' : '#7f8c8d',
              margin: '0 0 15px 0',
              fontWeight: '300'
            }}>
              Computer Science Student
            </p>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 20px',
              backgroundColor: darkMode ? 'rgba(0, 123, 255, 0.1)' : 'rgba(0, 123, 255, 0.05)',
              borderRadius: '25px',
              border: `1px solid ${darkMode ? 'rgba(0, 123, 255, 0.2)' : 'rgba(0, 123, 255, 0.1)'}`,
              width: 'fit-content'
            }}>
              <span style={{
                fontSize: '1.2rem',
                color: '#007bff'
              }}>🎓</span>
              <span style={{
                fontSize: '1.1rem',
                fontWeight: '600',
                color: darkMode ? '#4dabf7' : '#007bff',
                letterSpacing: '1px'
              }}>
                21973913
              </span>
            </div>
          </div>

          {/* Academic Badge */}
          <div style={{
            textAlign: 'center'
          }}>
            <div style={{
              backgroundColor: darkMode ? 'rgba(40, 167, 69, 0.1)' : 'rgba(40, 167, 69, 0.05)',
              border: `2px solid ${darkMode ? 'rgba(40, 167, 69, 0.3)' : 'rgba(40, 167, 69, 0.2)'}`,
              borderRadius: '12px',
              padding: '20px',
              width: '120px'
            }}>
              <div style={{
                fontSize: '2.5rem',
                marginBottom: '8px'
              }}>📚</div>
              <div style={{
                fontSize: '0.85rem',
                fontWeight: '600',
                color: darkMode ? '#51cf66' : '#28a745',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                CSE3CWA
              </div>
              <div style={{
                fontSize: '0.7rem',
                color: darkMode ? '#a0a0a0' : '#6c757d',
                marginTop: '4px'
              }}>
                Assignment 1
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Video Section */}
      <div style={{
        backgroundColor: darkMode ? 'rgba(45, 45, 45, 0.8)' : 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        border: `1px solid ${darkMode ? 'rgba(85, 85, 85, 0.3)' : 'rgba(222, 226, 230, 0.3)'}`,
        borderRadius: '20px',
        padding: '50px 40px',
        boxShadow: darkMode 
          ? '0 20px 60px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.05)' 
          : '0 20px 60px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.05)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: '0',
          left: '0',
          right: '0',
          height: '4px',
          background: 'linear-gradient(90deg, #ff6b6b, #ffd93d, #6bcf7f, #4ecdc4)',
          borderRadius: '20px 20px 0 0'
        }}></div>

        <div style={{
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '15px',
            marginBottom: '25px'
          }}>
            <div style={{
              width: '50px',
              height: '50px',
              background: 'linear-gradient(135deg, #ff6b6b, #ee5a52)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.8rem'
            }}>
              🎬
            </div>
            <h2 style={{
              fontSize: '2.4rem',
              fontWeight: '600',
              margin: '0',
              color: darkMode ? '#ffffff' : '#2c3e50',
              letterSpacing: '-0.5px'
            }}>
              Video Demonstration
            </h2>
          </div>
          
          <p style={{
            fontSize: '1.1rem',
            color: darkMode ? '#b0b0b0' : '#7f8c8d',
            marginBottom: '35px',
            fontWeight: '300',
            lineHeight: '1.6',
            maxWidth: '600px',
            margin: '0 auto 35px'
          }}>
            Comprehensive walkthrough 
          </p>
          
          <div style={{
            position: 'relative',
            maxWidth: '700px',
            margin: '0 auto',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: darkMode 
              ? '0 15px 35px rgba(0, 0, 0, 0.4)' 
              : '0 15px 35px rgba(0, 0, 0, 0.15)',
          }}>
            <iframe
              width="100%"
              height="400"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="CSE3CWA Assignment 1 - HTML5 Tabs Generator Tutorial"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              style={{ 
                borderRadius: '12px'
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
