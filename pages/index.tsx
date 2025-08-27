'use client';
import { useState, useEffect } from 'react';

interface Tab {
  id: number;
  title: string;
  content: string;
}

const HomePage = () => {
  const [activeMainTab, setActiveMainTab] = useState('Tabs');
  const [tabs, setTabs] = useState<Tab[]>([
    { id: 1, title: 'Step 1', content: '1. Install VSCode\n2. Install Chrome\n3. Install Node\n4. etc' }
  ]);
  const [activeTab, setActiveTab] = useState(1);
  const [htmlOutput, setHtmlOutput] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  // Load tabs from localStorage on component mount
  useEffect(() => {
    const savedTabs = localStorage.getItem('tabs');
    if (savedTabs) {
      try {
        const parsedTabs = JSON.parse(savedTabs);
        setTabs(parsedTabs);
      } catch (error) {
        console.error('Error loading tabs from localStorage:', error);
      }
    }
  }, []);

  // Save tabs to localStorage whenever tabs change
  useEffect(() => {
    localStorage.setItem('tabs', JSON.stringify(tabs));
  }, [tabs]);

  // Listen for dark mode changes
  useEffect(() => {
    const handleDarkModeChange = (event: any) => {
      setDarkMode(event.detail.darkMode);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('darkModeChange', handleDarkModeChange);
      return () => window.removeEventListener('darkModeChange', handleDarkModeChange);
    }
  }, []);

  const addTab = () => {
    if (tabs.length < 15) {
      const newId = Math.max(...tabs.map(t => t.id), 0) + 1;
      const newTab = {
        id: newId,
        title: `Tab ${newId}`,
        content: `Content for Tab ${newId}`
      };
      setTabs([...tabs, newTab]);
    }
  };

  const removeTab = (tabId: number) => {
    if (tabs.length > 1) {
      const newTabs = tabs.filter(tab => tab.id !== tabId);
      setTabs(newTabs);
      if (activeTab === tabId && newTabs.length > 0) {
        setActiveTab(newTabs[0].id);
      }
    }
  };

  const updateTabTitle = (tabId: number, newTitle: string) => {
    setTabs(tabs.map(tab => 
      tab.id === tabId ? { ...tab, title: newTitle } : tab
    ));
  };

  const updateTabContent = (tabId: number, newContent: string) => {
    setTabs(tabs.map(tab => 
      tab.id === tabId ? { ...tab, content: newContent } : tab
    ));
  };

  const generateHTML = () => {
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

    tabs.forEach((tab, index) => {
      html += `
            <button style="padding: 10px 20px; border: 2px solid #000; border-bottom: none; background: ${index === 0 ? '#000' : '#f5f5f5'}; color: ${index === 0 ? 'white' : 'black'}; cursor: pointer; margin-right: 2px; font-size: 14px;" onclick="showTab(${tab.id}, this)">${tab.title}</button>`;
    });

    html += `
        </div>
        <div style="padding: 20px; border: 2px solid #000; border-top: none; min-height: 200px; background: #f9f9f9;">`;

    tabs.forEach((tab, index) => {
      html += `
            <div id="tab${tab.id}" style="display: ${index === 0 ? 'block' : 'none'};">
                <div style="white-space: pre-line;">${tab.content}</div>
            </div>`;
    });

    html += `
        </div>
    </div>
    
    <script>
        function showTab(tabId, buttonElement) {
            // Hide all tab contents`;
    
    tabs.forEach(tab => {
      html += `
            document.getElementById('tab${tab.id}').style.display = 'none';`;
    });

    html += `
            
            // Reset all button styles
            var buttons = document.querySelectorAll('button');
            buttons.forEach(function(btn) {
                btn.style.background = '#f5f5f5';
                btn.style.color = 'black';
            });
            
            // Show selected tab and highlight button
            document.getElementById('tab' + tabId).style.display = 'block';
            buttonElement.style.background = '#000';
            buttonElement.style.color = 'white';
        }
    </script>
</body>
</html>`;
    
    setHtmlOutput(html);
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      {/* Main Navigation Tabs */}
      <div style={{ display: 'flex', borderBottom: `2px solid ${darkMode ? '#555' : '#000'}`, marginBottom: '20px' }}>
        <div style={{ padding: '8px 16px', border: `2px solid ${darkMode ? '#555' : '#000'}`, borderBottom: 'none', background: darkMode ? '#fff' : '#000', color: darkMode ? '#000' : 'white', cursor: 'pointer', marginRight: '2px', fontSize: '14px' }}>
          Tabs
        </div>
        <div style={{ padding: '8px 16px', border: `2px solid ${darkMode ? '#555' : '#000'}`, borderBottom: 'none', background: darkMode ? '#2d2d2d' : 'white', color: darkMode ? '#fff' : '#000', cursor: 'pointer', marginRight: '2px', fontSize: '14px' }}>
          Pre-lab Questions
        </div>
        <a href="/escape-room" style={{ textDecoration: 'none' }}>
          <div style={{ padding: '8px 16px', border: `2px solid ${darkMode ? '#555' : '#000'}`, borderBottom: 'none', background: darkMode ? '#2d2d2d' : 'white', color: darkMode ? '#fff' : '#000', cursor: 'pointer', marginRight: '2px', fontSize: '14px' }}>
            Escape Room
          </div>
        </a>
        <a href="/coding-races" style={{ textDecoration: 'none' }}>
          <div style={{ padding: '8px 16px', border: `2px solid ${darkMode ? '#555' : '#000'}`, borderBottom: 'none', background: darkMode ? '#2d2d2d' : 'white', color: darkMode ? '#fff' : '#000', cursor: 'pointer', marginRight: '2px', fontSize: '14px' }}>
            Coding Races
          </div>
        </a>
        <a href="/court-room" style={{ textDecoration: 'none' }}>
          <div style={{ padding: '8px 16px', border: `2px solid ${darkMode ? '#555' : '#000'}`, borderBottom: 'none', background: darkMode ? '#2d2d2d' : 'white', color: darkMode ? '#fff' : '#000', cursor: 'pointer', marginRight: '2px', fontSize: '14px' }}>
            Court Room
          </div>
        </a>
        <a href="/about" style={{ textDecoration: 'none' }}>
          <div style={{ padding: '8px 16px', border: `2px solid ${darkMode ? '#555' : '#000'}`, borderBottom: 'none', background: darkMode ? '#2d2d2d' : 'white', color: darkMode ? '#fff' : '#000', cursor: 'pointer', marginRight: '2px', fontSize: '14px' }}>
            About
          </div>
        </a>
      </div>

      {/* Main Content Area */}
      <div style={{ display: 'grid', gridTemplateColumns: '200px 300px 1fr', gap: '20px', minHeight: '400px' }}>
        {/* Left Sidebar - Tabs Headers */}
        <div style={{ border: `2px solid ${darkMode ? '#555' : '#000'}`, padding: '15px', backgroundColor: darkMode ? '#2d2d2d' : '#f8f8f8' }}>
          <h4 style={{margin: '0 0 15px 0', fontSize: '16px', color: darkMode ? '#fff' : '#000'}}>Tabs</h4>
          <div style={{marginBottom: '15px', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '10px'}}>
            <strong style={{color: darkMode ? '#fff' : '#000'}}>Tabs Headers:</strong>
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
                fontSize: '12px'
              }}
            >
              + Add ({tabs.length}/15)
            </button>
          </div>
          <div>
            {tabs.map((tab) => (
              <div key={tab.id} style={{display: 'flex', alignItems: 'center', marginBottom: '2px'}}>
                <button
                  style={{
                    display: 'block',
                    width: '140px',
                    padding: '8px 12px',
                    border: `1px solid ${darkMode ? '#555' : '#000'}`,
                    background: tab.id === activeTab ? (darkMode ? '#fff' : '#000') : (darkMode ? '#333' : 'white'),
                    color: tab.id === activeTab ? (darkMode ? '#000' : 'white') : (darkMode ? '#fff' : 'black'),
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
                    fontSize: '12px'
                  }}
                >
                  -
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Middle - Tab Content */}
        <div style={{ border: `2px solid ${darkMode ? '#555' : '#000'}`, padding: '15px', backgroundColor: darkMode ? '#2d2d2d' : '#f8f8f8' }}>
          <h4 style={{margin: '0 0 15px 0', fontSize: '16px', color: darkMode ? '#fff' : '#000'}}>Tabs Content</h4>
          {tabs.find(tab => tab.id === activeTab) && (
            <div>
              <div style={{marginBottom: '10px'}}>
                <label style={{display: 'block', marginBottom: '5px', fontWeight: 'bold', color: darkMode ? '#fff' : '#000'}}>Tab Title:</label>
                <input
                  type="text"
                  value={tabs.find(tab => tab.id === activeTab)?.title || ''}
                  onChange={(e) => updateTabTitle(activeTab, e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: `1px solid ${darkMode ? '#555' : '#ccc'}`,
                    borderRadius: '4px',
                    fontSize: '14px',
                    backgroundColor: darkMode ? '#333' : '#fff',
                    color: darkMode ? '#fff' : '#000',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
              <div style={{marginBottom: '15px'}}>
                <label style={{display: 'block', marginBottom: '5px', fontWeight: 'bold', color: darkMode ? '#fff' : '#000'}}>Tab Content:</label>
                <textarea
                  value={tabs.find(tab => tab.id === activeTab)?.content || ''}
                  onChange={(e) => updateTabContent(activeTab, e.target.value)}
                  style={{
                    width: '100%',
                    height: '150px',
                    padding: '8px',
                    border: `1px solid ${darkMode ? '#555' : '#ccc'}`,
                    borderRadius: '4px',
                    fontSize: '14px',
                    fontFamily: 'Arial, sans-serif',
                    resize: 'vertical',
                    backgroundColor: darkMode ? '#333' : '#fff',
                    color: darkMode ? '#fff' : '#000',
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

        {/* Right - Output */}
        <div style={{ border: `2px solid ${darkMode ? '#555' : '#000'}`, padding: '10px', backgroundColor: darkMode ? '#2d2d2d' : '#f8f8f8' }}>
          <h4 style={{margin: '0 0 10px 0', fontSize: '16px', color: darkMode ? '#fff' : '#000'}}>Output</h4>
          <textarea
            style={{
              width: '100%',
              height: '250px',
              border: `1px solid ${darkMode ? '#555' : '#000'}`,
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
            <button 
              style={{
                padding: '4px 8px',
                background: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '3px',
                cursor: 'pointer',
                fontSize: '12px',
                marginTop: '10px'
              }}
              onClick={() => navigator.clipboard.writeText(htmlOutput)}
            >
              Copy Code
            </button>
          )}
          <div style={{fontSize: '12px', marginTop: '10px', color: darkMode ? '#aaa' : '#666'}}>
            Current tabs: {tabs.length} | Max: 15
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
