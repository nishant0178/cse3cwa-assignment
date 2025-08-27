'use client';

const CourtRoomPage = () => {
  return (
    <div style={{ 
      maxWidth: '800px', 
      margin: '0 auto', 
      padding: '40px 20px', 
      fontFamily: 'Arial, sans-serif',
      textAlign: 'center'
    }}>
      <h1 style={{ 
        fontSize: '2.5rem',
        marginBottom: '30px',
        color: '#333'
      }}>
        Court Room
      </h1>
      
      <div style={{ 
        backgroundColor: '#f8f9fa',
        padding: '40px',
        borderRadius: '10px',
        border: '2px solid #dee2e6',
        marginBottom: '40px'
      }}>
        <h2 style={{ 
          fontSize: '1.8rem',
          marginBottom: '20px',
          color: '#495057'
        }}>
          🏛️ Legal Proceedings Simulator
        </h2>
        
        <p style={{ 
          fontSize: '1.1rem',
          lineHeight: '1.6',
          color: '#6c757d',
          maxWidth: '600px',
          margin: '0 auto 30px'
        }}>
          Welcome to the Court Room - a digital space for legal case studies, 
          mock trials, and legal education activities.
        </p>

        <div style={{
          backgroundColor: '#fff3cd',
          border: '1px solid #ffeaa7',
          borderRadius: '8px',
          padding: '20px',
          marginTop: '30px'
        }}>
          <p style={{
            fontSize: '1rem',
            color: '#856404',
            margin: '0',
            fontWeight: 'bold'
          }}>
            🚧 Page Under Construction 🚧
            <br />
            <span style={{fontWeight: 'normal', fontSize: '0.9rem'}}>
              This page is currently being developed and will be available soon.
            </span>
          </p>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px',
        marginTop: '40px'
      }}>
        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          border: '2px solid #17a2b8',
          textAlign: 'center'
        }}>
          <h4 style={{ color: '#17a2b8', marginBottom: '10px' }}>⚖️ Mock Trials</h4>
          <p style={{ color: '#6c757d', fontSize: '0.9rem' }}>
            Practice legal proceedings
          </p>
        </div>

        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          border: '2px solid #28a745',
          textAlign: 'center'
        }}>
          <h4 style={{ color: '#28a745', marginBottom: '10px' }}>📚 Case Studies</h4>
          <p style={{ color: '#6c757d', fontSize: '0.9rem' }}>
            Analyze legal cases
          </p>
        </div>

        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          border: '2px solid '#ffc107',
          textAlign: 'center'
        }}>
          <h4 style={{ color: '#ffc107', marginBottom: '10px' }}>🎓 Legal Education</h4>
          <p style={{ color: '#6c757d', fontSize: '0.9rem' }}>
            Learn legal procedures
          </p>
        </div>
      </div>
    </div>
  );
};

export default CourtRoomPage;