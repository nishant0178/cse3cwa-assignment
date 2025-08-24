import { useState, useEffect } from 'react';

const TabsPage = () => {
  const [tabs, setTabs] = useState<{ title: string; content: string }[]>([
    { title: 'Tab 1', content: 'Content for Tab 1' },
  ]);

  const [tabCount, setTabCount] = useState<number>(1);

  // Load tabs from localStorage
  useEffect(() => {
    const savedTabs = localStorage.getItem('tabs');
    if (savedTabs) {
      setTabs(JSON.parse(savedTabs));
      setTabCount(tabs.length);
    }
  }, []);

  // Save tabs to localStorage
  useEffect(() => {
    localStorage.setItem('tabs', JSON.stringify(tabs));
  }, [tabs]);

  const addTab = () => {
    if (tabCount < 15) {
      const newTabs = [...tabs, { title: `Tab ${tabCount + 1}`, content: `Content for Tab ${tabCount + 1}` }];
      setTabs(newTabs);
      setTabCount(tabCount + 1);
    }
  };

  const removeTab = (index: number) => {
    const newTabs = tabs.filter((_, i) => i !== index);
    setTabs(newTabs);
    setTabCount(tabCount - 1);
  };

  const updateTab = (index: number, field: 'title' | 'content', value: string) => {
    const updatedTabs = [...tabs];
    updatedTabs[index][field] = value;
    setTabs(updatedTabs);
  };

  const generateCode = () => {
    let htmlCode = `<html>\n<head>\n  <style>\n    /* Inline CSS for Tabs */\n    .tabs { display: flex; }\n    .tab { padding: 10px; cursor: pointer; }\n    .tab-content { padding: 10px; display: none; }\n  </style>\n</head>\n<body>\n  <div class="tabs">\n`;
    
    tabs.forEach((tab, index) => {
      htmlCode += `    <div class="tab" onclick="showContent(${index})">${tab.title}</div>\n`;
    });

    htmlCode += `  </div>\n`;

    tabs.forEach((tab, index) => {
      htmlCode += `  <div class="tab-content" id="tab-content-${index}">${tab.content}</div>\n`;
    });

    htmlCode += `
    <script>
      function showContent(index) {
        document.querySelectorAll('.tab-content').forEach((content, i) => {
          content.style.display = i === index ? 'block' : 'none';
        });
      }
    </script>\n</body>\n</html>`;

    return htmlCode;
  };

  return (
    <div>
      <h1>Tabs Page</h1>
      <div>
        {tabs.map((tab, index) => (
          <div key={index}>
            <input
              type="text"
              value={tab.title}
              onChange={(e) => updateTab(index, 'title', e.target.value)}
              placeholder="Tab Title"
            />
            <textarea
              value={tab.content}
              onChange={(e) => updateTab(index, 'content', e.target.value)}
              placeholder="Tab Content"
            />
            <button onClick={() => removeTab(index)}>Remove Tab</button>
          </div>
        ))}
      </div>

      <button onClick={addTab}>Add Tab</button>

      <h2>Generated HTML Code:</h2>
      <textarea value={generateCode()} readOnly rows={10} cols={50} />
    </div>
  );
};

export default TabsPage;
