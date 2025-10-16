interface PauseModalProps {
  timeRemaining: number;
  currentStage: number;
  totalStages: number;
  stagesCompleted: boolean[];
  hintsUsed: number;
  attempts: number;
  onResume: () => void;
  onRestart: () => void;
  onExit: () => void;
}

const PauseModal = ({
  timeRemaining,
  currentStage,
  totalStages,
  stagesCompleted,
  hintsUsed,
  attempts,
  onResume,
  onRestart,
  onExit
}: PauseModalProps) => {
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.85)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      animation: 'fadeIn 0.2s ease'
    }}>
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          @keyframes slideIn {
            from {
              opacity: 0;
              transform: scale(0.9);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
        `}
      </style>

      <div style={{
        backgroundColor: '#1a1a1a',
        borderRadius: '16px',
        padding: '30px',
        maxWidth: '450px',
        width: '90%',
        border: '2px solid #007bff',
        boxShadow: '0 20px 60px rgba(0, 123, 255, 0.4)',
        animation: 'slideIn 0.3s ease'
      }}>
        {/* Pause icon */}
        <div style={{
          fontSize: '48px',
          textAlign: 'center',
          marginBottom: '15px'
        }}>
          ⏸️
        </div>

        {/* Title */}
        <h2 style={{
          fontSize: '28px',
          fontWeight: 'bold',
          color: '#fff',
          textAlign: 'center',
          marginBottom: '10px'
        }}>
          Game Paused
        </h2>

        <p style={{
          fontSize: '14px',
          color: '#aaa',
          textAlign: 'center',
          marginBottom: '25px'
        }}>
          Take a break! Your progress is saved.
        </p>

        {/* Current progress */}
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '10px',
          padding: '20px',
          marginBottom: '25px'
        }}>
          <div style={{
            fontSize: '14px',
            fontWeight: '600',
            color: '#fff',
            marginBottom: '15px',
            textAlign: 'center'
          }}>
            📊 Current Progress
          </div>

          {/* Time remaining */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '12px',
            fontSize: '15px'
          }}>
            <span style={{ color: '#aaa' }}>⏱️ Time Remaining:</span>
            <span style={{ color: '#007bff', fontWeight: '600', fontSize: '16px' }}>
              {formatTime(timeRemaining)}
            </span>
          </div>

          {/* Current stage */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '12px',
            fontSize: '14px'
          }}>
            <span style={{ color: '#aaa' }}>🎯 Current Stage:</span>
            <span style={{ color: '#fff', fontWeight: '600' }}>
              {currentStage} / {totalStages}
            </span>
          </div>

          {/* Stage completion */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '12px',
            fontSize: '14px'
          }}>
            <span style={{ color: '#aaa' }}>✅ Completed:</span>
            <span style={{ color: '#fff', fontWeight: '600' }}>
              {stagesCompleted.filter(Boolean).length} / {totalStages}
            </span>
          </div>

          {/* Hints used */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '12px',
            fontSize: '14px'
          }}>
            <span style={{ color: '#aaa' }}>💡 Hints Used:</span>
            <span style={{ color: '#fff', fontWeight: '600' }}>{hintsUsed}</span>
          </div>

          {/* Total attempts */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '14px'
          }}>
            <span style={{ color: '#aaa' }}>🔄 Attempts:</span>
            <span style={{ color: '#fff', fontWeight: '600' }}>{attempts}</span>
          </div>
        </div>

        {/* Stage indicators */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '15px',
          marginBottom: '25px'
        }}>
          {Array.from({ length: totalStages }, (_, i) => (
            <div
              key={i}
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                backgroundColor: stagesCompleted[i]
                  ? '#28a745'
                  : currentStage === i + 1
                    ? '#007bff'
                    : 'rgba(255, 255, 255, 0.1)',
                border: `2px solid ${stagesCompleted[i] ? '#28a745' : currentStage === i + 1 ? '#007bff' : 'rgba(255, 255, 255, 0.2)'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                color: '#fff',
                fontWeight: 'bold'
              }}
            >
              {stagesCompleted[i] ? '✓' : i + 1}
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }}>
          <button
            onClick={onResume}
            style={{
              padding: '14px',
              backgroundColor: '#28a745',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#218838';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#28a745';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            ▶️ Resume Game
          </button>

          <button
            onClick={onRestart}
            style={{
              padding: '12px',
              backgroundColor: 'rgba(255, 193, 7, 0.2)',
              color: '#ffc107',
              border: '1px solid #ffc107',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 193, 7, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 193, 7, 0.2)';
            }}
          >
            🔄 Restart Game
          </button>

          <button
            onClick={onExit}
            style={{
              padding: '12px',
              backgroundColor: 'transparent',
              color: '#888',
              border: '1px solid #555',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#dc3545';
              e.currentTarget.style.color = '#dc3545';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#555';
              e.currentTarget.style.color = '#888';
            }}
          >
            🚪 Exit to Menu
          </button>
        </div>
      </div>
    </div>
  );
};

export default PauseModal;
