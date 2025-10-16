interface FeedbackMessageProps {
  message: string;
  type: 'success' | 'error' | 'info';
  onClose?: () => void;
}

const FeedbackMessage = ({ message, type, onClose }: FeedbackMessageProps) => {
  if (!message) return null;

  const getStyles = () => {
    switch (type) {
      case 'success':
        return {
          backgroundColor: 'rgba(40, 167, 69, 0.2)',
          borderColor: '#28a745',
          color: '#28a745',
          icon: '✅'
        };
      case 'error':
        return {
          backgroundColor: 'rgba(220, 53, 69, 0.2)',
          borderColor: '#dc3545',
          color: '#dc3545',
          icon: '❌'
        };
      case 'info':
        return {
          backgroundColor: 'rgba(0, 123, 255, 0.2)',
          borderColor: '#007bff',
          color: '#007bff',
          icon: 'ℹ️'
        };
    }
  };

  const styles = getStyles();

  return (
    <div style={{
      backgroundColor: styles.backgroundColor,
      border: `2px solid ${styles.borderColor}`,
      borderRadius: '8px',
      padding: '15px 20px',
      margin: '15px 0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      animation: type === 'error' ? 'shake 0.5s' : 'slideIn 0.3s',
      boxShadow: `0 4px 12px ${styles.borderColor}40`
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
        <span style={{ fontSize: '20px' }}>{styles.icon}</span>
        <span style={{
          color: styles.color,
          fontSize: '14px',
          fontWeight: '500',
          lineHeight: '1.5'
        }}>
          {message}
        </span>
      </div>

      {onClose && (
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            color: styles.color,
            fontSize: '20px',
            cursor: 'pointer',
            padding: '0 8px',
            opacity: 0.7,
            transition: 'opacity 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
          onMouseLeave={(e) => e.currentTarget.style.opacity = '0.7'}
        >
          ×
        </button>
      )}

      <style>
        {`
          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
          }
        `}
      </style>
    </div>
  );
};

export default FeedbackMessage;
