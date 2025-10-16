import { useState } from 'react';
import CodeEditor from './CodeEditor';
import HintPanel from './HintPanel';
import FeedbackMessage from './FeedbackMessage';
import { Challenge, Difficulty } from '../../lib/challenges';

interface Stage4Props {
  challenge: Challenge;
  difficulty: Difficulty;
  onComplete: () => void;
  onHintUsed?: () => void;
  onAttempt?: () => void;
}

interface ValidationResult {
  valid: boolean;
  error?: string;
  message?: string;
}

const Stage4 = ({ challenge, difficulty, onComplete, onHintUsed, onAttempt }: Stage4Props) => {
  const [userCode, setUserCode] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [currentHintIndex, setCurrentHintIndex] = useState(0);
  const [feedback, setFeedback] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getTransformationTask = () => {
    switch (difficulty) {
      case 'easy':
        return {
          input: { data: 'CSV', format: 'name,age,city\nJohn,25,NYC\nJane,30,LA' },
          expectedOutput: [
            { name: 'John', age: '25', city: 'NYC' },
            { name: 'Jane', age: '30', city: 'LA' }
          ],
          description: 'Convert CSV string to array of objects'
        };
      case 'medium':
        return {
          input: { data: 'JSON Array', format: '[{"id":1,"value":"a"},{"id":2,"value":"b"}]' },
          expectedOutput: { '1': 'a', '2': 'b' },
          description: 'Convert JSON array to key-value object (id: value)'
        };
      case 'hard':
        return {
          input: { data: 'XML-like', format: '<users><user><name>John</name><age>25</age></user></users>' },
          expectedOutput: [{ name: 'John', age: '25' }],
          description: 'Parse XML-like string to array of objects'
        };
    }
  };

  const validateTransformation = (userCode: string): ValidationResult => {
    try {
      const task = getTransformationTask();

      // Create a function from user code
      const func = new Function('input', userCode + '\nreturn transform(input);');

      // Execute user's transformation function
      const result = func(task.input.format);

      // Compare result with expected output
      const resultStr = JSON.stringify(result);
      const expectedStr = JSON.stringify(task.expectedOutput);

      if (resultStr === expectedStr) {
        return {
          valid: true,
          message: 'Perfect! Data transformation is correct.'
        };
      } else {
        return {
          valid: false,
          error: `Output doesn't match expected format. Expected: ${expectedStr}, Got: ${resultStr}`
        };
      }
    } catch (e: any) {
      return {
        valid: false,
        error: `Error executing code: ${e.message}`
      };
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setAttempts(prev => prev + 1);

    // Notify parent of attempt
    if (onAttempt) {
      onAttempt();
    }

    const result = validateTransformation(userCode);

    if (result.valid) {
      setFeedback({ message: result.message || 'Perfect! Data transformed correctly!', type: 'success' });
      setTimeout(() => {
        onComplete();
      }, 1500);
    } else {
      setFeedback({ message: result.error || 'Transformation failed. Try again!', type: 'error' });
      setIsSubmitting(false);
    }
  };

  const handleShowHint = () => {
    if (currentHintIndex < challenge.hints.length) {
      setCurrentHintIndex(prev => prev + 1);

      // Notify parent of hint usage
      if (onHintUsed) {
        onHintUsed();
      }
    }
  };

  const task = getTransformationTask();

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
          🔄 Stage 4: Data Transformation
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
        Final challenge! The door's security system requires data format conversion to unlock...
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
          {task.description}
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

      {/* Input/Output Example */}
      <div style={{
        backgroundColor: 'rgba(40, 167, 69, 0.1)',
        border: '2px solid #28a745',
        borderRadius: '8px',
        padding: '15px',
        marginBottom: '20px',
        fontSize: '13px',
        color: '#ddd'
      }}>
        <div style={{ color: '#28a745', fontWeight: '600', marginBottom: '6px' }}>
          💡 Example:
        </div>
        <div style={{ marginBottom: '10px' }}>
          <strong style={{ color: '#fff' }}>Input ({task.input.data}):</strong>
          <pre style={{
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            padding: '10px',
            borderRadius: '4px',
            marginTop: '5px',
            overflow: 'auto',
            fontSize: '12px',
            color: '#6be'
          }}>
            {task.input.format}
          </pre>
        </div>
        <div>
          <strong style={{ color: '#fff' }}>Expected Output:</strong>
          <pre style={{
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            padding: '10px',
            borderRadius: '4px',
            marginTop: '5px',
            overflow: 'auto',
            fontSize: '12px',
            color: '#6be'
          }}>
            {JSON.stringify(task.expectedOutput, null, 2)}
          </pre>
        </div>
      </div>

      {/* Code Editor */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{
          fontSize: '14px',
          fontWeight: '600',
          color: '#fff',
          marginBottom: '8px'
        }}>
          Your Transformation Code:
        </div>
        <div style={{
          fontSize: '12px',
          color: '#aaa',
          marginBottom: '8px'
        }}>
          Write a function named <code style={{ color: '#6be', backgroundColor: 'rgba(0,0,0,0.3)', padding: '2px 6px', borderRadius: '3px' }}>transform(input)</code> that converts the data
        </div>
        <CodeEditor
          value={userCode}
          onChange={setUserCode}
          placeholder="function transform(input) {\n  // Your transformation code here\n  return result;\n}"
          height="300px"
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
          opacity: isSubmitting ? 0.7 : 1,
          textTransform: 'uppercase',
          letterSpacing: '1px'
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
        {isSubmitting ? 'Testing Transformation...' : 'Submit Solution'}
      </button>
    </div>
  );
};

export default Stage4;
