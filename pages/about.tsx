'use client';

const AboutPage = () => {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>About Me</h1>
      <p><strong>Name:</strong> Nishant Singh</p>
      <p><strong>Student Number:</strong> 21973913</p>

      <h2>How to Use This Website</h2>
      <p>This website generates HTML5 tabs that can be used in MOODLE LMS. Follow these steps:</p>
      <ol>
        <li>Go to the Tabs page</li>
        <li>Add or remove tabs using the + and - buttons</li>
        <li>Edit tab headings and content</li>
        <li>Click Generate HTML to create the code</li>
        <li>Copy and paste the HTML into MOODLE</li>
      </ol>
      
      <h3>Video Demonstration</h3>
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/dQw4w9WgXcQ"
        title="How to use this website"
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{ maxWidth: '100%', height: 'auto' }}
      ></iframe>
    </div>
  );
};

export default AboutPage;
