import { useEffect, useRef } from 'react';

interface TimerProps {
  timeRemaining: number; // in seconds
  isRunning: boolean;
  onTick: (newTime: number) => void;
  onExpire: () => void;
}

const Timer = ({ timeRemaining, isRunning, onTick, onExpire }: TimerProps) => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning && timeRemaining > 0) {
      intervalRef.current = setInterval(() => {
        onTick(timeRemaining - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      onExpire();
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeRemaining, onTick, onExpire]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getColorStatus = (): string => {
    const percentage = (timeRemaining / (30 * 60)) * 100; // Assuming max 30 min for calculation
    if (percentage > 50) return '#28a745'; // Green
    if (percentage > 20) return '#ffc107'; // Yellow
    return '#dc3545'; // Red
  };

  const shouldPulse = timeRemaining < 300 && timeRemaining > 0; // Pulse when < 5 minutes

  return (
    <div style={{
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      borderRadius: '12px',
      padding: '20px',
      border: `3px solid ${getColorStatus()}`,
      boxShadow: `0 0 20px ${getColorStatus()}40`,
      animation: shouldPulse ? 'pulse 1s infinite' : 'none'
    }}>
      <style>
        {`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
          }
        `}
      </style>
      <div style={{
        fontSize: '48px',
        fontWeight: 'bold',
        color: getColorStatus(),
        textAlign: 'center',
        fontFamily: 'monospace',
        letterSpacing: '4px'
      }}>
        {formatTime(timeRemaining)}
      </div>
      <div style={{
        textAlign: 'center',
        fontSize: '14px',
        color: '#aaa',
        marginTop: '8px'
      }}>
        {timeRemaining === 0 ? 'TIME\'S UP!' : isRunning ? 'Running...' : 'Paused'}
      </div>
    </div>
  );
};

export default Timer;
