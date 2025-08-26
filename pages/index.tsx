'use client';
import { useState } from 'react';

const HomePage = () => {
  const [htmlCode, setHtmlCode] = useState("");
  const [selectedComponent, setSelectedComponent] = useState("");

  const generateCompleteHTML = () => {
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Interactive HTML5 Components for MOODLE LMS</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js"></script>
    <style>
        .rotating-element {
            animation: rotate 2s linear infinite;
        }
        @keyframes rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        .lightbox {
            display: none;
            position: fixed;
            z-index: 1000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.8);
        }
        .lightbox img {
            display: block;
            margin: auto;
            max-width: 90%;
            max-height: 90%;
            margin-top: 5%;
        }
        .canvas-container {
            border: 1px solid #ccc;
            margin: 10px 0;
        }
    </style>
</head>
<body>
    <div class="container mt-4">
        <h1 class="text-center mb-4">HTML5 Interactive Components for MOODLE LMS</h1>
        
        <!-- Bootstrap Carousel -->
        <div id="carouselExample" class="carousel slide mb-4" data-bs-ride="carousel">
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <div class="d-block w-100 bg-primary text-white text-center p-5">
                        <h3>Slide 1</h3>
                        <p>Interactive carousel component</p>
                    </div>
                </div>
                <div class="carousel-item">
                    <div class="d-block w-100 bg-secondary text-white text-center p-5">
                        <h3>Slide 2</h3>
                        <p>Perfect for educational content</p>
                    </div>
                </div>
                <div class="carousel-item">
                    <div class="d-block w-100 bg-success text-white text-center p-5">
                        <h3>Slide 3</h3>
                        <p>MOODLE LMS compatible</p>
                    </div>
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                <span class="carousel-control-prev-icon"></span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                <span class="carousel-control-next-icon"></span>
            </button>
        </div>

        <!-- Tabs -->
        <ul class="nav nav-tabs" role="tablist">
            <li class="nav-item">
                <a class="nav-link active" data-bs-toggle="tab" href="#tab1">Tab 1</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" data-bs-toggle="tab" href="#tab2">Tab 2</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" data-bs-toggle="tab" href="#tab3">Tab 3</a>
            </li>
        </ul>
        <div class="tab-content mb-4">
            <div id="tab1" class="tab-pane fade show active p-3">
                <h4>Tab Content 1</h4>
                <p>This is the content for tab 1. Great for organizing course materials.</p>
            </div>
            <div id="tab2" class="tab-pane fade p-3">
                <h4>Tab Content 2</h4>
                <p>This is the content for tab 2. Perfect for different topics or modules.</p>
            </div>
            <div id="tab3" class="tab-pane fade p-3">
                <h4>Tab Content 3</h4>
                <p>This is the content for tab 3. Ideal for additional resources.</p>
            </div>
        </div>

        <!-- Accordion -->
        <div class="accordion mb-4" id="accordionExample">
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne">
                        Accordion Item 1
                    </button>
                </h2>
                <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                        This is the first item's accordion body. Perfect for FAQ sections or detailed explanations.
                    </div>
                </div>
            </div>
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo">
                        Accordion Item 2
                    </button>
                </h2>
                <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                        This is the second item's accordion body. Great for organizing course content.
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal/Popup -->
        <button type="button" class="btn btn-primary mb-4" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Open Modal/Popup
        </button>
        <div class="modal fade" id="exampleModal" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Modal Title</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        This is a modal dialog. Perfect for important announcements or detailed information.
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Dropdown -->
        <div class="dropdown mb-4">
            <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                Dropdown Menu
            </button>
            <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">Action 1</a></li>
                <li><a class="dropdown-item" href="#">Action 2</a></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item" href="#">Separated link</a></li>
            </ul>
        </div>

        <!-- Tooltips -->
        <div class="mb-4">
            <button type="button" class="btn btn-secondary" data-bs-toggle="tooltip" data-bs-placement="top" title="This is a tooltip">
                Hover for Tooltip
            </button>
        </div>

        <!-- Progress Bar -->
        <div class="mb-4">
            <label for="progressExample" class="form-label">Progress Bar Example</label>
            <div class="progress">
                <div class="progress-bar" role="progressbar" style="width: 75%" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">75%</div>
            </div>
        </div>

        <!-- Range Slider -->
        <div class="mb-4">
            <label for="customRange" class="form-label">Range Slider</label>
            <input type="range" class="form-range" id="customRange" min="0" max="100" value="50">
            <div class="d-flex justify-content-between">
                <span>0</span>
                <span>100</span>
            </div>
        </div>

        <!-- Date Picker -->
        <div class="mb-4">
            <label for="datePicker" class="form-label">Date Picker</label>
            <input type="date" class="form-control" id="datePicker">
        </div>

        <!-- Alerts -->
        <div class="alert alert-success alert-dismissible fade show mb-4" role="alert">
            <strong>Success!</strong> This is a success alert.
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>

        <!-- Lightbox -->
        <div class="mb-4">
            <h5>Lightbox Example</h5>
            <img src="https://via.placeholder.com/200x150" class="img-thumbnail lightbox-trigger" alt="Sample Image" style="cursor: pointer;">
        </div>

        <!-- Canvas -->
        <div class="mb-4">
            <h5>Canvas Drawing</h5>
            <canvas id="drawingCanvas" width="400" height="200" class="canvas-container"></canvas>
            <div>
                <button class="btn btn-sm btn-primary" onclick="clearCanvas()">Clear Canvas</button>
                <button class="btn btn-sm btn-secondary" onclick="drawSample()">Draw Sample</button>
            </div>
        </div>

        <!-- CSS Animation (Rotation) -->
        <div class="mb-4">
            <h5>CSS Animation (Rotation)</h5>
            <div class="rotating-element bg-primary text-white p-3 d-inline-block rounded">
                🔄 Rotating Element
            </div>
        </div>

        <!-- Mermaid Diagram -->
        <div class="mb-4">
            <h5>Mermaid Diagram</h5>
            <div class="mermaid">
                graph TD
                    A[Start] --> B{Decision}
                    B -->|Yes| C[Process 1]
                    B -->|No| D[Process 2]
                    C --> E[End]
                    D --> E
            </div>
        </div>
    </div>

    <!-- Lightbox Modal -->
    <div id="lightbox" class="lightbox">
        <span class="close" onclick="closeLightbox()" style="position: absolute; top: 15px; right: 35px; color: white; font-size: 40px; cursor: pointer;">&times;</span>
        <img id="lightbox-img" src="" alt="">
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script>
        // Initialize tooltips
        var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });

        // Initialize Mermaid
        mermaid.initialize({startOnLoad:true});

        // Lightbox functionality
        document.querySelector('.lightbox-trigger').addEventListener('click', function() {
            document.getElementById('lightbox').style.display = 'block';
            document.getElementById('lightbox-img').src = this.src;
        });

        function closeLightbox() {
            document.getElementById('lightbox').style.display = 'none';
        }

        // Canvas functionality
        const canvas = document.getElementById('drawingCanvas');
        const ctx = canvas.getContext('2d');
        
        let isDrawing = false;
        let lastX = 0;
        let lastY = 0;

        canvas.addEventListener('mousedown', startDrawing);
        canvas.addEventListener('mousemove', draw);
        canvas.addEventListener('mouseup', () => isDrawing = false);
        canvas.addEventListener('mouseout', () => isDrawing = false);

        function startDrawing(e) {
            isDrawing = true;
            [lastX, lastY] = [e.offsetX, e.offsetY];
        }

        function draw(e) {
            if (!isDrawing) return;
            ctx.strokeStyle = '#007bff';
            ctx.lineJoin = 'round';
            ctx.lineCap = 'round';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(lastX, lastY);
            ctx.lineTo(e.offsetX, e.offsetY);
            ctx.stroke();
            [lastX, lastY] = [e.offsetX, e.offsetY];
        }

        function clearCanvas() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }

        function drawSample() {
            ctx.strokeStyle = '#28a745';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.arc(200, 100, 50, 0, 2 * Math.PI);
            ctx.stroke();
        }

        // Range slider value display
        const rangeSlider = document.getElementById('customRange');
        rangeSlider.addEventListener('input', function() {
            console.log('Range value:', this.value);
        });
    </script>
</body>
</html>`;

    setHtmlCode(html);
  };

  const generateComponentHTML = (component) => {
    const components = {
      carousel: `<!-- Bootstrap Carousel -->
<div id="carouselExample" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-inner">
        <div class="carousel-item active">
            <div class="d-block w-100 bg-primary text-white text-center p-5">
                <h3>Slide 1</h3>
            </div>
        </div>
        <div class="carousel-item">
            <div class="d-block w-100 bg-secondary text-white text-center p-5">
                <h3>Slide 2</h3>
            </div>
        </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
        <span class="carousel-control-prev-icon"></span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
        <span class="carousel-control-next-icon"></span>
    </button>
</div>`,
      tabs: `<!-- Bootstrap Tabs -->
<ul class="nav nav-tabs" role="tablist">
    <li class="nav-item">
        <a class="nav-link active" data-bs-toggle="tab" href="#tab1">Tab 1</a>
    </li>
    <li class="nav-item">
        <a class="nav-link" data-bs-toggle="tab" href="#tab2">Tab 2</a>
    </li>
</ul>
<div class="tab-content">
    <div id="tab1" class="tab-pane fade show active p-3">
        <h4>Tab Content 1</h4>
    </div>
    <div id="tab2" class="tab-pane fade p-3">
        <h4>Tab Content 2</h4>
    </div>
</div>`,
      accordion: `<!-- Bootstrap Accordion -->
<div class="accordion" id="accordionExample">
    <div class="accordion-item">
        <h2 class="accordion-header">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne">
                Accordion Item 1
            </button>
        </h2>
        <div id="collapseOne" class="accordion-collapse collapse show">
            <div class="accordion-body">Content here</div>
        </div>
    </div>
</div>`,
      modal: `<!-- Bootstrap Modal -->
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
    Open Modal
</button>
<div class="modal fade" id="exampleModal" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Modal Title</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">Modal content here</div>
        </div>
    </div>
</div>`
    };

    setHtmlCode(components[component] || '');
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">HTML5 Component Generator for MOODLE LMS</h1>
      
      <div className="row mb-4">
        <div className="col-md-6">
          <button className="btn btn-success btn-lg w-100 mb-3" onClick={generateCompleteHTML}>
            Generate Complete HTML5 Page
          </button>
        </div>
        <div className="col-md-6">
          <select 
            className="form-select mb-3" 
            value={selectedComponent} 
            onChange={(e) => setSelectedComponent(e.target.value)}
          >
            <option value="">Select Individual Component</option>
            <option value="carousel">Carousel</option>
            <option value="tabs">Tabs</option>
            <option value="accordion">Accordion</option>
            <option value="modal">Modal/Popup</option>
          </select>
          <button 
            className="btn btn-primary w-100" 
            onClick={() => generateComponentHTML(selectedComponent)}
            disabled={!selectedComponent}
          >
            Generate Selected Component
          </button>
        </div>
      </div>

      {htmlCode && (
        <div className="mt-4">
          <h2>Generated HTML Code:</h2>
          <div className="card">
            <div className="card-body">
              <textarea 
                className="form-control" 
                value={htmlCode} 
                readOnly 
                rows={20}
                style={{fontSize: '12px', fontFamily: 'monospace'}}
              />
            </div>
          </div>
          <div className="mt-3">
            <button 
              className="btn btn-outline-secondary"
              onClick={() => navigator.clipboard.writeText(htmlCode)}
            >
              Copy to Clipboard
            </button>
          </div>
        </div>
      )}

      <div className="mt-5">
        <h3>Available Components:</h3>
        <ul className="list-group">
          <li className="list-group-item">✅ Bootstrap Carousel</li>
          <li className="list-group-item">✅ Tabs</li>
          <li className="list-group-item">✅ Accordion</li>
          <li className="list-group-item">✅ Modal/Popup</li>
          <li className="list-group-item">✅ Dropdown</li>
          <li className="list-group-item">✅ Tooltip</li>
          <li className="list-group-item">✅ Progress Bar</li>
          <li className="list-group-item">✅ Range Slider</li>
          <li className="list-group-item">✅ Date Picker</li>
          <li className="list-group-item">✅ Alerts</li>
          <li className="list-group-item">✅ Lightbox</li>
          <li className="list-group-item">✅ Canvas Drawing</li>
          <li className="list-group-item">✅ CSS Animation (Rotation)</li>
          <li className="list-group-item">✅ Mermaid Diagrams</li>
        </ul>
      </div>
    </div>
  );
};

export default HomePage;
