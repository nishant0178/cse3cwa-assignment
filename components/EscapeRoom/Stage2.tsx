import { useState } from 'react';
import CodeEditor from './CodeEditor';
import HintPanel from './HintPanel';
import FeedbackMessage from './FeedbackMessage';
import { Challenge } from '../../lib/challenges';
import { validateDebuggedCode } from '../../lib/validators';

interface Stage2Props {
  challenge: Challenge;
  onComplete: () => void;
}

const Stage2 = ({ challenge, onComplete }: Stage2Props) => {
  const [userCode, setUserCode] = useState(challenge.buggy || '');
  const [attempts, setAttempts] = useState(0);
  const [currentHintIndex, setCurrentHintIndex] = useState(0);
  const [feedback, setFeedback] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showComputer, setShowComputer] = useState(false);

  const handleSubmit = () => {
    setIsSubmitting(true);
    setAttempts(prev => prev + 1);

    // Validate the code
    const result = validateDebuggedCode(userCode, challenge.testCases || []);

    if (result.valid) {
      setFeedback({ message: result.message || 'Perfect! All bugs fixed!', type: 'success' });
      setTimeout(() => {
        onComplete();
      }, 1500);
    } else {
      setFeedback({ message: result.error || 'Code still has bugs. Try again!', type: 'error' });
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
          🔒 Stage 2: Debug the Code
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
      {!showComputer ? (
        <div style={{
          backgroundColor: 'rgba(0, 123, 255, 0.1)',
          border: '2px solid #007bff',
          borderRadius: '8px',
          padding: '20px',
          marginBottom: '20px',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '48px',
            marginBottom: '15px'
          }}>
            💻
          </div>
          <div style={{
            color: '#fff',
            fontSize: '16px',
            marginBottom: '15px',
            lineHeight: '1.6'
          }}>
            You spot an old computer terminal in the corner of the room.
            <br />
            Its screen flickers with code...
          </div>
          <button
            onClick={() => setShowComputer(true)}
            style={{
              padding: '10px 24px',
              backgroundColor: '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#0056b3';
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#007bff';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            🖱️ Click the Computer
          </button>
        </div>
      ) : (
        <>
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

          {/* Code editor */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{
              fontSize: '14px',
              fontWeight: '600',
              color: '#fff',
              marginBottom: '8px'
            }}>
              Debug This Code:
            </div>
            <CodeEditor
              value={userCode}
              onChange={setUserCode}
              placeholder="Fix the bugs in this code..."
              height="250px"
            />
          </div>

          {/* Test cases info */}
          {challenge.testCases && challenge.testCases.length > 0 && (
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
                ✓ Your code will be tested with {challenge.testCases.length} test cases
              </div>
              <div>All tests must pass for the code to be considered bug-free.</div>
            </div>
          )}

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
            {isSubmitting ? 'Running Tests...' : 'Run Code'}
          </button>
        </>
      )}
    </div>
  );
};

export default Stage2;
