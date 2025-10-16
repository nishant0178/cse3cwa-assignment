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

          @keyframes confetti {
            0% { transform: translateY(0) rotate(0deg); opacity: 1; }
            100% { transform: translateY(500px) rotate(360deg); opacity: 0; }
          }
        `}
      </style>

      <div style={{
        backgroundColor: '#1a1a1a',
        borderRadius: '20px',
        padding: '40px',
        maxWidth: '500px',
        width: '90%',
        border: `4px solid ${won ? '#28a745' : '#dc3545'}`,
        boxShadow: `0 20px 60px ${won ? 'rgba(40, 167, 69, 0.5)' : 'rgba(220, 53, 69, 0.5)'}`,
        animation: 'slideUp 0.5s ease',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Confetti effect for victory */}
        {won && (
          <>
            {Array.from({ length: 20 }, (_, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  top: '-20px',
                  left: `${Math.random() * 100}%`,
                  width: '10px',
                  height: '10px',
                  backgroundColor: ['#ff6b6b', '#ffd93d', '#6bcf7f', '#4ecdc4', '#a29bfe'][i % 5],
                  animation: `confetti ${2 + Math.random() * 2}s linear infinite`,
                  animationDelay: `${Math.random() * 2}s`
                }}
              />
            ))}
          </>
        )}

        {/* Icon */}
        <div style={{
          fontSize: '80px',
          textAlign: 'center',
          marginBottom: '20px'
        }}>
          {won ? '🎉' : '⏰'}
        </div>

        {/* Title */}
        <h2 style={{
          fontSize: '32px',
          fontWeight: 'bold',
          color: won ? '#28a745' : '#dc3545',
          textAlign: 'center',
          marginBottom: '10px'
        }}>
          {won ? 'YOU ESCAPED!' : 'TIME\'S UP!'}
        </h2>

        {/* Subtitle */}
        <p style={{
          fontSize: '16px',
          color: '#aaa',
          textAlign: 'center',
          marginBottom: '30px',
          lineHeight: '1.5'
        }}>
          {won
            ? 'Congratulations! You successfully escaped the coding room!'
            : `You completed ${stagesCompleted} out of ${totalStages} stages. Better luck next time!`}
        </p>

        {/* Stats */}
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '30px'
        }}>
          <div style={{
            fontSize: '16px',
            fontWeight: '600',
            color: '#fff',
            marginBottom: '15px',
            textAlign: 'center'
          }}>
            📊 Statistics
          </div>

          {/* Time */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '10px',
            fontSize: '14px'
          }}>
            <span style={{ color: '#aaa' }}>⏱️ Time:</span>
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
            <span style={{ color: '#aaa' }}>🎯 Stages Completed:</span>
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
            <span style={{ color: '#aaa' }}>🔄 Total Attempts:</span>
            <span style={{ color: '#fff', fontWeight: '600' }}>{attempts}</span>
          </div>

          {/* Hints */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: won ? '10px' : '0',
            fontSize: '14px'
          }}>
            <span style={{ color: '#aaa' }}>💡 Hints Used:</span>
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
                fontSize: '16px'
              }}>
                <span style={{ color: '#ffc107', fontWeight: '600' }}>🏆 Score:</span>
                <span style={{ color: '#ffc107', fontWeight: 'bold', fontSize: '18px' }}>
                  {calculateScore()}
                </span>
              </div>
            </>
          )}
        </div>

        {/* Best time badge */}
        {isBestTime && won && (
          <div style={{
            backgroundColor: 'rgba(255, 193, 7, 0.2)',
            border: '2px solid #ffc107',
            borderRadius: '8px',
            padding: '12px',
            marginBottom: '20px',
            textAlign: 'center',
            color: '#ffc107',
            fontSize: '14px',
            fontWeight: '600'
          }}>
            🎖️ NEW PERSONAL BEST!
          </div>
        )}

        {/* Buttons */}
        <div style={{
          display: 'flex',
          gap: '15px'
        }}>
          <button
            onClick={onPlayAgain}
            style={{
              flex: 1,
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
            🔄 Play Again
          </button>

          <button
            onClick={onExit}
            style={{
              flex: 1,
              padding: '14px',
              backgroundColor: '#6c757d',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#5a6268';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#6c757d';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            🚪 Exit
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameOverModal;
