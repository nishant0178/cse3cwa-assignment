import { ChangeEvent } from 'react';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  readOnly?: boolean;
  height?: string;
  showLineNumbers?: boolean;
}

const CodeEditor = ({
  value,
  onChange,
  placeholder = 'Write your code here...',
  readOnly = false,
  height = '300px',
  showLineNumbers = true
}: CodeEditorProps) => {
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  const lines = value.split('\n');
  const lineCount = lines.length;

  return (
    <div style={{
      display: 'flex',
      backgroundColor: '#1e1e1e',
      borderRadius: '8px',
      overflow: 'hidden',
      border: '2px solid rgba(255, 255, 255, 0.1)',
      fontFamily: 'Consolas, Monaco, "Courier New", monospace',
      fontSize: '14px'
    }}>
      {/* Line numbers */}
      {showLineNumbers && (
        <div style={{
          backgroundColor: '#252526',
          padding: '12px 8px',
          textAlign: 'right',
          color: '#858585',
          userSelect: 'none',
          minWidth: '40px',
          borderRight: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          {Array.from({ length: lineCount }, (_, i) => (
            <div key={i} style={{ height: '21px', lineHeight: '21px' }}>
              {i + 1}
            </div>
          ))}
        </div>
      )}

      {/* Code textarea */}
      <textarea
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        readOnly={readOnly}
        spellCheck={false}
        style={{
          flex: 1,
          height,
          padding: '12px',
          backgroundColor: 'transparent',
          color: '#d4d4d4',
          border: 'none',
          outline: 'none',
          fontFamily: 'inherit',
          fontSize: 'inherit',
          lineHeight: '21px',
          resize: 'vertical',
          whiteSpace: 'pre',
          overflowWrap: 'normal',
          overflowX: 'auto',
          tabSize: 2
        }}
        onKeyDown={(e) => {
          // Handle Tab key for indentation
          if (e.key === 'Tab') {
            e.preventDefault();
            const textarea = e.currentTarget;
            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;
            const newValue = value.substring(0, start) + '  ' + value.substring(end);
            onChange(newValue);
            // Set cursor position after the inserted spaces
            setTimeout(() => {
              textarea.selectionStart = textarea.selectionEnd = start + 2;
            }, 0);
          }
        }}
      />
    </div>
  );
};

export default CodeEditor;
