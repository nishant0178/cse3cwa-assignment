import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Tab {
  id: number;
  title: string;
  content: string;
}

const HomePage = () => {
  const [tabs, setTabs] = useState<Tab[]>([
    { id: 1, title: 'Step 1', content: '1. Install VSCode\n2. Install Chrome\n3. Install Node\n4. etc' }
  ]);
  const [activeTab, setActiveTab] = useState(1);
  const [htmlOutput, setHtmlOutput] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTabs = localStorage.getItem('tabs');
    if (savedTabs) {
      try {
        setTabs(JSON.parse(savedTabs));
      } catch (e) {
        console.log('couldnt load tabs', e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tabs', JSON.stringify(tabs));
  }, [tabs]);

  useEffect(() => {
    const handleDarkMode = (e: any) => {
      setDarkMode(e.detail.darkMode);
    };

    window.addEventListener('darkModeChange', handleDarkMode);
    return () => window.removeEventListener('darkModeChange', handleDarkMode);
  }, []);

  const addTab = () => {
    if (tabs.length >= 15) return;

    const newId = Math.max(...tabs.map(t => t.id), 0) + 1;
    setTabs([...tabs, {
      id: newId,
      title: `Tab ${newId}`,
      content: `Content for Tab ${newId}`
    }]);
  };

  const removeTab = (id: number) => {
    if (tabs.length <= 1) return;

    const filtered = tabs.filter(t => t.id !== id);
    setTabs(filtered);

    if (activeTab === id) {
      setActiveTab(filtered[0].id);
    }
  };

  const updateTitle = (id: number, title: string) => {
    setTabs(tabs.map(t => t.id === id ? { ...t, title } : t));
  };

  const updateContent = (id: number, content: string) => {
    setTabs(tabs.map(t => t.id === id ? { ...t, content } : t));
  };

  const generateHTML = () => {
    // TODO: maybe clean this up later, works for now
    let html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Generated Tabs</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
    </style>
</head>
<body>
    <div style="max-width: 800px; margin: 0 auto;">
        <div style="display: flex; border-bottom: 2px solid #000; margin-bottom: 20px;">`;

    tabs.forEach((tab, idx) => {
      const isFirst = idx === 0;
      html += `
            <button style="padding: 10px 20px; border: 2px solid #000; border-bottom: none; background: ${isFirst ? '#000' : '#f5f5f5'}; color: ${isFirst ? 'white' : 'black'}; cursor: pointer; margin-right: 2px; font-size: 14px;" onclick="showTab(${tab.id}, this)">${tab.title}</button>`;
    });

    html += `
        </div>
        <div style="padding: 20px; border: 2px solid #000; border-top: none; min-height: 200px; background: #f9f9f9;">`;

    tabs.forEach((tab, idx) => {
      html += `
            <div id="tab${tab.id}" style="display: ${idx === 0 ? 'block' : 'none'};">
                <div style="white-space: pre-line;">${tab.content}</div>
            </div>`;
    });

    html += `
        </div>
    </div>

    <script>
        function showTab(tabId, btn) {`;

    tabs.forEach(tab => {
      html += `
            document.getElementById('tab${tab.id}').style.display = 'none';`;
    });

    html += `

            var buttons = document.querySelectorAll('button');
            buttons.forEach(function(b) {
                b.style.background = '#f5f5f5';
                b.style.color = 'black';
            });

            document.getElementById('tab' + tabId).style.display = 'block';
            btn.style.background = '#000';
            btn.style.color = 'white';
        }
    </script>
</body>
</html>`;

    setHtmlOutput(html);
  };

  const downloadHTML = () => {
    if (!htmlOutput) return;

    const blob = new Blob([htmlOutput], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'weekAssign.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const currentTab = tabs.find(t => t.id === activeTab);

  const borderColor = darkMode ? '#555' : '#000';
  const bgColor = darkMode ? '#2d2d2d' : '#f8f8f8';
  const textColor = darkMode ? '#fff' : '#000';

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      {/* navigation */}
      <div style={{ display: 'flex', borderBottom: `2px solid ${borderColor}`, marginBottom: '20px' }}>
        <div style={{
          padding: '8px 16px',
          border: `2px solid ${borderColor}`,
          borderBottom: 'none',
          background: darkMode ? '#fff' : '#000',
          color: darkMode ? '#000' : 'white',
          marginRight: '2px',
          fontSize: '14px'
        }}>
          Tabs
        </div>

        <div style={{
          padding: '8px 16px',
          border: `2px solid ${borderColor}`,
          borderBottom: 'none',
          background: bgColor,
          color: textColor,
          marginRight: '2px',
          fontSize: '14px'
        }}>
          Pre-lab Questions
        </div>

        <Link href="/escape-room" style={{ textDecoration: 'none' }}>
          <div style={{
            padding: '8px 16px',
            border: `2px solid ${borderColor}`,
            borderBottom: 'none',
            background: bgColor,
            color: textColor,
            cursor: 'pointer',
            marginRight: '2px',
            fontSize: '14px'
          }}>
            Escape Room
          </div>
        </Link>

        <Link href="/coding-races" style={{ textDecoration: 'none' }}>
          <div style={{
            padding: '8px 16px',
            border: `2px solid ${borderColor}`,
            borderBottom: 'none',
            background: bgColor,
            color: textColor,
            cursor: 'pointer',
            marginRight: '2px',
            fontSize: '14px'
          }}>
            Coding Races
          </div>
        </Link>

        <Link href="/court-room" style={{ textDecoration: 'none' }}>
          <div style={{
            padding: '8px 16px',
            border: `2px solid ${borderColor}`,
            borderBottom: 'none',
            background: bgColor,
            color: textColor,
            cursor: 'pointer',
            marginRight: '2px',
            fontSize: '14px'
          }}>
            Court Room
          </div>
        </Link>

        <Link href="/about" style={{ textDecoration: 'none' }}>
          <div style={{
            padding: '8px 16px',
            border: `2px solid ${borderColor}`,
            borderBottom: 'none',
            background: bgColor,
            color: textColor,
            cursor: 'pointer',
            marginRight: '2px',
            fontSize: '14px'
          }}>
            About
          </div>
        </Link>
      </div>

      {/* main layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '200px 300px 1fr', gap: '20px', minHeight: '400px' }}>
        {/* sidebar with tab list */}
        <div style={{ border: `2px solid ${borderColor}`, padding: '15px', backgroundColor: bgColor }}>
          <h4 style={{ margin: '0 0 15px 0', fontSize: '16px', color: textColor }}>Tabs</h4>
          <div style={{ marginBottom: '15px', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <strong style={{ color: textColor }}>Tabs Headers:</strong>
            <button
              onClick={addTab}
              disabled={tabs.length >= 15}
              style={{
                background: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '3px',
                padding: '4px 8px',
                cursor: tabs.length >= 15 ? 'not-allowed' : 'pointer',
                fontSize: '12px',
                opacity: tabs.length >= 15 ? 0.5 : 1
              }}
            >
              + Add ({tabs.length}/15)
            </button>
          </div>

          <div>
            {tabs.map(tab => (
              <div key={tab.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '2px' }}>
                <button
                  style={{
                    width: '140px',
                    padding: '8px 12px',
                    border: `1px solid ${borderColor}`,
                    background: tab.id === activeTab ? (darkMode ? '#fff' : '#000') : (darkMode ? '#333' : 'white'),
                    color: tab.id === activeTab ? (darkMode ? '#000' : 'white') : textColor,
                    cursor: 'pointer',
                    textAlign: 'left',
                    fontSize: '14px'
                  }}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.title}
                </button>
                <button
                  onClick={() => removeTab(tab.id)}
                  disabled={tabs.length <= 1}
                  style={{
                    marginLeft: '5px',
                    background: '#dc3545',
                    color: 'white',
                    border: 'none',
                    borderRadius: '3px',
                    padding: '4px 8px',
                    cursor: tabs.length <= 1 ? 'not-allowed' : 'pointer',
                    fontSize: '12px',
                    opacity: tabs.length <= 1 ? 0.5 : 1
                  }}
                >
                  -
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* middle panel - edit tab */}
        <div style={{ border: `2px solid ${borderColor}`, padding: '15px', backgroundColor: bgColor }}>
          <h4 style={{ margin: '0 0 15px 0', fontSize: '16px', color: textColor }}>Tabs Content</h4>

          {currentTab && (
            <div>
              <div style={{ marginBottom: '10px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: textColor }}>
                  Tab Title:
                </label>
                <input
                  type="text"
                  value={currentTab.title}
                  onChange={e => updateTitle(activeTab, e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: `1px solid ${darkMode ? '#555' : '#ccc'}`,
                    borderRadius: '4px',
                    fontSize: '14px',
                    backgroundColor: darkMode ? '#333' : '#fff',
                    color: textColor,
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: textColor }}>
                  Tab Content:
                </label>
                <textarea
                  value={currentTab.content}
                  onChange={e => updateContent(activeTab, e.target.value)}
                  style={{
                    width: '100%',
                    height: '150px',
                    padding: '8px',
                    border: `1px solid ${darkMode ? '#555' : '#ccc'}`,
                    borderRadius: '4px',
                    fontSize: '14px',
                    resize: 'vertical',
                    backgroundColor: darkMode ? '#333' : '#fff',
                    color: textColor,
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            </div>
          )}

          <button
            onClick={generateHTML}
            style={{
              padding: '8px 16px',
              background: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            Generate HTML
          </button>
        </div>

        {/* output panel */}
        <div style={{ border: `2px solid ${borderColor}`, padding: '10px', backgroundColor: bgColor }}>
          <h4 style={{ margin: '0 0 10px 0', fontSize: '16px', color: textColor }}>Output</h4>
          <textarea
            style={{
              width: '100%',
              height: '250px',
              border: `1px solid ${borderColor}`,
              backgroundColor: darkMode ? '#333' : '#fff',
              fontFamily: 'Consolas, Monaco, monospace',
              fontSize: '11px',
              padding: '8px',
              color: darkMode ? '#66ccff' : '#0066cc',
              overflow: 'auto',
              whiteSpace: 'pre-wrap',
              boxSizing: 'border-box'
            }}
            value={htmlOutput}
            readOnly
            placeholder="Generated HTML will appear here..."
          />

          {htmlOutput && (
            <div style={{ marginTop: '10px', display: 'flex', gap: '8px' }}>
              <button
                onClick={() => navigator.clipboard.writeText(htmlOutput)}
                style={{
                  padding: '4px 8px',
                  background: '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '3px',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                Copy Code
              </button>
              <button
                onClick={downloadHTML}
                style={{
                  padding: '4px 8px',
                  background: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '3px',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                Download HTML
              </button>
            </div>
          )}

          <div style={{ fontSize: '12px', marginTop: '10px', color: darkMode ? '#aaa' : '#666' }}>
            Current tabs: {tabs.length} | Max: 15
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
