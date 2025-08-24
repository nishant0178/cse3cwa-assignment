import { useState } from 'react';

const HomePage = () => {
  const [htmlCode, setHtmlCode] = useState("");

  const generateCode = () => {
    // This will eventually generate the HTML+JS code
    setHtmlCode(`<html>\n  <body>\n    <h1>Hello World!</h1>\n  </body>\n</html>`);
  };

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <button onClick={generateCode}>Generate HTML Code</button>

      {htmlCode && (
        <div>
          <h2>Generated HTML Code:</h2>
          <textarea value={htmlCode} readOnly rows={10} cols={50} />
        </div>
      )}
    </div>
  );
};

export default HomePage;
