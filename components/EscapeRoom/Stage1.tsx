import { useState } from 'react';
import CodeEditor from './CodeEditor';
import HintPanel from './HintPanel';
import FeedbackMessage from './FeedbackMessage';
import { Challenge } from '../../lib/challenges';
import { validateFormatting } from '../../lib/validators';

interface Stage1Props {
  challenge: Challenge;
  language: 'javascript' | 'python' | 'cpp';
  onComplete: () => void;
}

const Stage1 = ({ challenge, language, onComplete }: Stage1Props) => {
  const [userCode, setUserCode] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [currentHintIndex, setCurrentHintIndex] = useState(0);
  const [feedback, setFeedback] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    setIsSubmitting(true);
    setAttempts(prev => prev + 1);

    // Validate the code
    const result = validateFormatting(userCode, challenge.formatted!, language);

    if (result.valid) {
      setFeedback({ message: result.message || 'Perfect! Code is properly formatted.', type: 'success' });
      setTimeout(() => {
        onComplete();
      }, 1500);
    } else {
      setFeedback({ message: result.error || 'Code formatting is incorrect. Try again!', type: 'error' });
      setIsSubmitting(false);
    }
  };

  const handleShowHint = () => {
    if (currentHintIndex < challenge.hints.length) {
      setCurrentHintIndex(prev => prev + 1);
    }
  };

  const getLanguageName = () => {
    switch (language) {
      case 'javascript': return 'JavaScript';
      case 'python': return 'Python';
      case 'cpp': return 'C++';
    }
  };

  return (
    <div style={{
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      borderRadius: '12px',
      padding: '25px',
      border: '2px solid rgba(255, 255, 255, 0.2)'
    }}>
      {/* Stage header */}
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: '600',
          color: '#fff',
          marginBottom: '10px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          🔒 Stage 1: Format the Code
        </h2>
        <div style={{
          fontSize: '14px',
          color: '#aaa',
          marginBottom: '15px'
        }}>
          Language: <span style={{ color: '#007bff', fontWeight: '600' }}>{getLanguageName()}</span>
          {' • '}
          Attempts: <span style={{ color: '#ffc107' }}>{attempts}</span>
        </div>
      </div>

      {/* Instructions */}
      <div style={{
        backgroundColor: 'rgba(0, 123, 255, 0.1)',
        border: '2px solid #007bff',
        borderRadius: '8px',
        padding: '15px',
        marginBottom: '20px'
      }}>
        <div style={{
          fontSize: '14px',
          fontWeight: '600',
          color: '#007bff',
          marginBottom: '8px'
        }}>
          📋 Task:
        </div>
        <div style={{ color: '#fff', fontSize: '14px', marginBottom: '12px' }}>
          {challenge.description}
        </div>
        <div style={{
          fontSize: '14px',
          fontWeight: '600',
          color: '#007bff',
          marginBottom: '8px'
        }}>
          Requirements:
        </div>
        <ul style={{
          margin: 0,
          paddingLeft: '20px',
          color: '#ddd',
          fontSize: '13px',
          lineHeight: '1.8'
        }}>
          {challenge.requirements.map((req, i) => (
            <li key={i}>{req}</li>
          ))}
        </ul>
      </div>

      {/* Messy code display */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{
          fontSize: '14px',
          fontWeight: '600',
          color: '#fff',
          marginBottom: '8px'
        }}>
          Unformatted Code:
        </div>
        <CodeEditor
          value={challenge.messy!}
          onChange={() => {}}
          readOnly={true}
          height="120px"
        />
      </div>

      {/* User input */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{
          fontSize: '14px',
          fontWeight: '600',
          color: '#fff',
          marginBottom: '8px'
        }}>
          Your Formatted Code:
        </div>
        <CodeEditor
          value={userCode}
          onChange={setUserCode}
          placeholder="Type your properly formatted code here..."
          height="200px"
        />
      </div>

      {/* Feedback */}
      {feedback && (
        <FeedbackMessage
          message={feedback.message}
          type={feedback.type}
          onClose={() => setFeedback(null)}
        />
      )}

      {/* Hints */}
      <HintPanel
        hints={challenge.hints}
        currentHintIndex={currentHintIndex}
        onShowNextHint={handleShowHint}
        maxHints={3}
      />

      {/* Submit button */}
      <button
        onClick={handleSubmit}
        disabled={!userCode.trim() || isSubmitting}
        style={{
          marginTop: '20px',
          padding: '12px 30px',
          backgroundColor: userCode.trim() && !isSubmitting ? '#28a745' : '#666',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          fontSize: '16px',
          fontWeight: '600',
          cursor: userCode.trim() && !isSubmitting ? 'pointer' : 'not-allowed',
          width: '100%',
          transition: 'all 0.3s',
          opacity: isSubmitting ? 0.7 : 1
        }}
        onMouseEnter={(e) => {
          if (userCode.trim() && !isSubmitting) {
            e.currentTarget.style.backgroundColor = '#218838';
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(40, 167, 69, 0.4)';
          }
        }}
        onMouseLeave={(e) => {
          if (userCode.trim() && !isSubmitting) {
            e.currentTarget.style.backgroundColor = '#28a745';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }
        }}
      >
        {isSubmitting ? 'Checking...' : 'Submit Code'}
      </button>
    </div>
  );
};

export default Stage1;
