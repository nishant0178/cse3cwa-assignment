interface GameOverModalProps {
  won: boolean;
  timeElapsed?: number; // in seconds
  totalTime?: number;
  stagesCompleted: number;
  totalStages: number;
  hintsUsed: number;
  attempts: number;
  onPlayAgain: () => void;
  onExit: () => void;
  isBestTime?: boolean;
}

const GameOverModal = ({
  won,
  timeElapsed = 0,
  totalTime = 0,
  stagesCompleted,
  totalStages,
  hintsUsed,
  attempts,
  onPlayAgain,
  onExit,
  isBestTime = false
}: GameOverModalProps) => {
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const calculateScore = (): number => {
    if (!won) return 0;

    // Base score
    let score = 1000;

    // Deduct for hints
    score -= hintsUsed * 50;

    // Deduct for attempts (minus the successful ones)
    score -= Math.max(0, attempts - totalStages) * 20;

    // Bonus for time remaining
    const timeRemaining = totalTime - timeElapsed;
    score += Math.floor(timeRemaining / 10);

    return Math.max(0, score);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.9)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      animation: 'fadeIn 0.3s ease'
    }}>
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>

      <div style={{
        backgroundColor: '#1a1a1a',
        borderRadius: '12px',
        padding: '40px',
        maxWidth: '500px',
        width: '90%',
        border: `3px solid ${won ? '#059669' : '#b91c1c'}`,
        animation: 'slideUp 0.3s ease',
        position: 'relative'
      }}>
        {/* Status badge */}
        <div style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: won ? '#059669' : '#b91c1c',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 20px',
          border: `3px solid ${won ? '#047857' : '#991b1b'}`
        }}>
          <span style={{
            fontSize: '32px',
            color: '#fff',
            fontWeight: 'bold'
          }}>
            {won ? '✓' : '×'}
          </span>
        </div>

        {/* Title */}
        <h2 style={{
          fontSize: '28px',
          fontWeight: '700',
          color: '#fff',
          textAlign: 'center',
          marginBottom: '10px',
          textTransform: 'uppercase',
          letterSpacing: '1px'
        }}>
          {won ? 'Challenge Complete' : 'Time Expired'}
        </h2>

        {/* Subtitle */}
        <p style={{
          fontSize: '14px',
          color: '#aaa',
          textAlign: 'center',
          marginBottom: '30px',
          lineHeight: '1.5'
        }}>
          {won
            ? 'All stages completed successfully.'
            : `Completed ${stagesCompleted} of ${totalStages} stages.`}
        </p>

        {/* Stats */}
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '8px',
          padding: '20px',
          marginBottom: '30px'
        }}>
          <div style={{
            fontSize: '12px',
            fontWeight: '600',
            color: '#888',
            marginBottom: '15px',
            textAlign: 'center',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            Statistics
          </div>

          {/* Time */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '10px',
            fontSize: '14px'
          }}>
            <span style={{ color: '#aaa' }}>Time:</span>
            <span style={{ color: '#fff', fontWeight: '600' }}>
              {formatTime(timeElapsed)}
              {won && totalTime > 0 && ` / ${formatTime(totalTime)}`}
            </span>
          </div>

          {/* Stages */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '10px',
            fontSize: '14px'
          }}>
            <span style={{ color: '#aaa' }}>Stages:</span>
            <span style={{ color: '#fff', fontWeight: '600' }}>
              {stagesCompleted} / {totalStages}
            </span>
          </div>

          {/* Attempts */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '10px',
            fontSize: '14px'
          }}>
            <span style={{ color: '#aaa' }}>Attempts:</span>
            <span style={{ color: '#fff', fontWeight: '600' }}>{attempts}</span>
          </div>

          {/* Hints */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: won ? '10px' : '0',
            fontSize: '14px'
          }}>
            <span style={{ color: '#aaa' }}>Hints:</span>
            <span style={{ color: '#fff', fontWeight: '600' }}>{hintsUsed}</span>
          </div>

          {/* Score (only for victory) */}
          {won && (
            <>
              <div style={{
                width: '100%',
                height: '1px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                margin: '15px 0'
              }} />
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '15px'
              }}>
                <span style={{ color: '#ca8a04', fontWeight: '600' }}>Score:</span>
                <span style={{ color: '#ca8a04', fontWeight: 'bold', fontSize: '17px' }}>
                  {calculateScore()}
                </span>
              </div>
            </>
          )}
        </div>

        {/* Best time badge */}
        {isBestTime && won && (
          <div style={{
            backgroundColor: 'rgba(202, 138, 4, 0.15)',
            border: '2px solid #ca8a04',
            borderRadius: '6px',
            padding: '10px',
            marginBottom: '20px',
            textAlign: 'center',
            color: '#ca8a04',
            fontSize: '12px',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            New Personal Best
          </div>
        )}

        {/* Buttons */}
        <div style={{
          display: 'flex',
          gap: '12px'
        }}>
          <button
            onClick={onPlayAgain}
            style={{
              flex: 1,
              padding: '14px',
              backgroundColor: '#059669',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#047857';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#059669';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Play Again
          </button>

          <button
            onClick={onExit}
            style={{
              flex: 1,
              padding: '14px',
              backgroundColor: '#4b5563',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#374151';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#4b5563';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Exit
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameOverModal;
