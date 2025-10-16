interface ProgressBarProps {
  currentStage: number;
  totalStages: number;
  stagesCompleted: boolean[];
}

const ProgressBar = ({ currentStage, totalStages, stagesCompleted }: ProgressBarProps) => {
  const progress = (stagesCompleted.filter(Boolean).length / totalStages) * 100;

  return (
    <div style={{ width: '100%', marginBottom: '20px' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '10px'
      }}>
        <span style={{ fontSize: '16px', fontWeight: '600', color: '#fff' }}>
          Progress
        </span>
        <span style={{ fontSize: '14px', color: '#aaa' }}>
          {stagesCompleted.filter(Boolean).length} / {totalStages} Complete
        </span>
      </div>

      {/* Progress bar */}
      <div style={{
        width: '100%',
        height: '30px',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '15px',
        overflow: 'hidden',
        border: '2px solid rgba(255, 255, 255, 0.2)',
        position: 'relative'
      }}>
        <div style={{
          width: `${progress}%`,
          height: '100%',
          background: 'linear-gradient(90deg, #007bff 0%, #28a745 100%)',
          transition: 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
          borderRadius: '15px',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Animated shine effect */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
            animation: progress > 0 ? 'shine 2s infinite' : 'none'
          }} />
        </div>

        {/* Percentage text */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '14px',
          fontWeight: 'bold',
          color: '#fff',
          textShadow: '0 0 4px rgba(0,0,0,0.8)'
        }}>
          {Math.round(progress)}%
        </div>
      </div>

      <style>
        {`
          @keyframes shine {
            0% { left: -100%; }
            100% { left: 200%; }
          }
        `}
      </style>

      {/* Stage dots */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-around',
        marginTop: '15px',
        padding: '0 20px'
      }}>
        {Array.from({ length: totalStages }, (_, i) => (
          <div key={i} style={{ textAlign: 'center' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: stagesCompleted[i]
                ? '#28a745'
                : currentStage === i + 1
                  ? '#007bff'
                  : 'rgba(255, 255, 255, 0.2)',
              border: `3px solid ${stagesCompleted[i] ? '#28a745' : currentStage === i + 1 ? '#007bff' : 'rgba(255, 255, 255, 0.3)'}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px',
              fontWeight: 'bold',
              color: '#fff',
              transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: stagesCompleted[i] || currentStage === i + 1
                ? '0 0 15px rgba(0, 123, 255, 0.5)'
                : 'none'
            }}>
              {stagesCompleted[i] ? '✓' : i + 1}
            </div>
            <div style={{
              marginTop: '8px',
              fontSize: '12px',
              color: stagesCompleted[i] ? '#28a745' : currentStage === i + 1 ? '#007bff' : '#888'
            }}>
              Stage {i + 1}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
