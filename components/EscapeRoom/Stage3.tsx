import { useState } from 'react';
import CodeEditor from './CodeEditor';
import HintPanel from './HintPanel';
import FeedbackMessage from './FeedbackMessage';
import { Challenge, Difficulty } from '../../lib/challenges';
import { validateNumberGeneration } from '../../lib/validators';

interface Stage3Props {
  challenge: Challenge;
  difficulty: Difficulty;
  onComplete: () => void;
}

const Stage3 = ({ challenge, difficulty, onComplete }: Stage3Props) => {
  const [userCode, setUserCode] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [currentHintIndex, setCurrentHintIndex] = useState(0);
  const [feedback, setFeedback] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getValidationParams = () => {
    switch (difficulty) {
      case 'easy':
        return { maxNumber: 1000, evenOnly: false, primesOnly: false };
      case 'medium':
        return { maxNumber: 1000, evenOnly: true, primesOnly: false };
      case 'hard':
        return { maxNumber: 100, evenOnly: false, primesOnly: true };
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setAttempts(prev => prev + 1);

    const params = getValidationParams();
    const result = validateNumberGeneration(
      userCode,
      params.maxNumber,
      params.evenOnly,
      params.primesOnly
    );

    if (result.valid) {
      setFeedback({ message: result.message || 'Perfect! All numbers generated correctly!', type: 'success' });
      setTimeout(() => {
        onComplete();
      }, 1500);
    } else {
      setFeedback({ message: result.error || 'Output doesn\'t match expected results. Try again!', type: 'error' });
      setIsSubmitting(false);
    }
  };

  const handleShowHint = () => {
    if (currentHintIndex < challenge.hints.length) {
      setCurrentHintIndex(prev => prev + 1);
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
          🔒 Stage 3: Final Challenge
        </h2>
        <div style={{
          fontSize: '14px',
          color: '#aaa',
          marginBottom: '15px'
        }}>
          Attempts: <span style={{ color: '#ffc107' }}>{attempts}</span>
        </div>
      </div>

      {/* Story element */}
      <div style={{
        backgroundColor: 'rgba(255, 193, 7, 0.1)',
        border: '2px solid #ffc107',
        borderRadius: '8px',
        padding: '15px',
        marginBottom: '20px',
        fontSize: '14px',
        color: '#fff',
        lineHeight: '1.6'
      }}>
        <div style={{ fontSize: '24px', marginBottom: '10px' }}>🚪</div>
        You're almost there! The door lock shows a keypad waiting for the correct sequence...
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

      {/* Example code */}
      <div style={{
        backgroundColor: 'rgba(40, 167, 69, 0.1)',
        border: '1px solid #28a745',
        borderRadius: '6px',
        padding: '12px',
        marginBottom: '20px',
        fontSize: '13px',
        color: '#ddd'
      }}>
        <div style={{ color: '#28a745', fontWeight: '600', marginBottom: '6px' }}>
          💡 Example:
        </div>
        <code style={{ color: '#6be', fontSize: '12px' }}>
          for (let i = 0; i &lt;= 1000; i++) {'{'}<br />
          &nbsp;&nbsp;console.log(i);<br />
          {'}'}
        </code>
      </div>

      {/* Code editor */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{
          fontSize: '14px',
          fontWeight: '600',
          color: '#fff',
          marginBottom: '8px'
        }}>
          Write Your Code:
        </div>
        <CodeEditor
          value={userCode}
          onChange={setUserCode}
          placeholder="// Write your code here to generate the numbers...\n\nfor (let i = 0; i <= 1000; i++) {\n  console.log(i);\n}"
          height="250px"
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
        {isSubmitting ? 'Checking Output...' : 'Run Code'}
      </button>
    </div>
  );
};

export default Stage3;
