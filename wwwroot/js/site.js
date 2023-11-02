function makeGrid() {
    const canvas = document.getElementById("pixelCanvas"); // Get the canvas element
    const ctx = canvas.getContext("2d"); // Get the 2D drawing context
    const colorPicker = document.getElementById("colorPicker"); // Get the color picker input
    const pixelSizeInput = document.getElementById("pixelSize"); // Get the pixel size input
    let drawing = false; // Initialize the drawing state

    // Initialize pixel size
    let pixelSize = parseInt(pixelSizeInput.value);

    // Listen for changes in the pixel size input
    pixelSizeInput.addEventListener("input", () => {
        pixelSize = parseInt(pixelSizeInput.value); // Update the pixel size
    });

    // Listen for mouse down event to start drawing
    canvas.addEventListener('mousedown', () => {
        drawing = true;
    });

    // Listen for mouse up event to stop drawing and reset path
    canvas.addEventListener('mouseup', () => {
        drawing = false;
        ctx.beginPath();
    });

    // Listen for mouse move to draw when the mouse is down
    canvas.addEventListener('mousemove', (event) => {
        if (!drawing) return; // Exit if not drawing
        ctx.strokeStyle = colorPicker.value; // Set stroke color
        ctx.lineWidth = pixelSize; // Set line width to pixel size
        ctx.lineCap = 'round'; // Set line cap to round for smooth edges
        ctx.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
    });

    document.getElementById('saveButton').addEventListener('click', () => {
        const dataURL = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        const pngName = document.getElementById('dataInput')
        const inputData = dataInput.value;
        if (inputData.trim() === '') {
            alert('Please enter some data before saving.');
            return;
        }
        downloadLink.href = dataURL;
        downloadLink.download = inputData + '.png';
        downloadLink.click();
    });
    // Trash Can button in Pixel
    clearCanvasButton.addEventListener('click', () => {
        // Clear the canvas by filling it with a white background
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    });
     fillCanvasButton.addEventListener('click', () => {
        // Fill canvas with chosen color background
        ctx.fillStyle = colorPicker.value;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    });
}

// Call makeGrid to initialize the drawing functionality
makeGrid();
