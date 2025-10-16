interface HintPanelProps {
  hints: string[];
  currentHintIndex: number;
  onShowNextHint: () => void;
  maxHints: number;
}

const HintPanel = ({ hints, currentHintIndex, onShowNextHint, maxHints }: HintPanelProps) => {
  const canShowMore = currentHintIndex < maxHints && currentHintIndex < hints.length;

  return (
    <div style={{
      backgroundColor: 'rgba(255, 193, 7, 0.1)',
      border: '2px solid #ffc107',
      borderRadius: '8px',
      padding: '15px',
      marginTop: '15px'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '10px'
      }}>
        <div style={{
          fontSize: '16px',
          fontWeight: '600',
          color: '#ffc107',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          💡 Hints ({currentHintIndex}/{hints.length})
        </div>
        {canShowMore && (
          <button
            onClick={onShowNextHint}
            style={{
              padding: '6px 12px',
              backgroundColor: '#ffc107',
              color: '#000',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: '600',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#ffca2c';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#ffc107';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Show Hint {currentHintIndex + 1}
          </button>
        )}
      </div>

      {currentHintIndex === 0 ? (
        <div style={{
          color: '#aaa',
          fontSize: '14px',
          fontStyle: 'italic'
        }}>
          Click "Show Hint" if you need help. Using hints may affect your score!
        </div>
      ) : (
        <div style={{ marginTop: '10px' }}>
          {hints.slice(0, currentHintIndex).map((hint, index) => (
            <div
              key={index}
              style={{
                backgroundColor: 'rgba(255, 193, 7, 0.15)',
                padding: '10px',
                borderRadius: '6px',
                marginBottom: '8px',
                borderLeft: '4px solid #ffc107',
                color: '#fff',
                fontSize: '14px',
                animation: 'slideIn 0.3s ease'
              }}
            >
              <div style={{
                fontSize: '12px',
                color: '#ffc107',
                marginBottom: '4px',
                fontWeight: '600'
              }}>
                Hint {index + 1}:
              </div>
              {hint}
            </div>
          ))}
        </div>
      )}

      {!canShowMore && currentHintIndex >= hints.length && (
        <div style={{
          color: '#888',
          fontSize: '13px',
          marginTop: '10px',
          textAlign: 'center'
        }}>
          No more hints available. You've got this! 💪
        </div>
      )}

      <style>
        {`
          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateX(-20px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
        `}
      </style>
    </div>
  );
};

export default HintPanel;
