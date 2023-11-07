function makeGrid() {
    const canvas = document.getElementById("pixelCanvas"); // Get the canvas element
    const ctx = canvas.getContext("2d"); // Get the 2D drawing context
    const colorPicker = document.getElementById("colorPicker"); // Get the color picker input
    const pixelSizeInput = document.getElementById("pixelSize"); // Get the pixel size input
    let drawing = false; // Initialize the drawing state

    // Initialize pixel size
    let pixelSize = parseInt(pixelSizeInput.value);

    document.getElementById('saveButton').addEventListener('click', () => {
        const dataURL = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.href = dataURL;
        downloadLink.download = 'canvas_image.png';
        downloadLink.click();
    });

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
        if (!drawing) return; // Exit the function if not currently drawing
        ctx.strokeStyle = colorPicker.value; // Set the stroke color to the selected color
        ctx.lineWidth = pixelSize; // Set the line width to the specified pixel size
        ctx.lineCap = 'round'; // Set the line cap style to 'round' for smooth edges
        ctx.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop); // Draw a line to the current mouse position
        ctx.stroke(); // Perform the actual drawing
        ctx.beginPath(); // Begin a new drawing path
        ctx.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop); // Move the drawing cursor to the new position
    });

    document.getElementById('saveButton').addEventListener('click', () => {
        const dataURL = canvas.toDataURL('image/png'); // Convert the canvas content to a data URL in PNG format
        const downloadLink = document.createElement('a'); // Create an anchor element for downloading
        const dataInput = document.getElementById('dataInput'); // Get a reference to the input field
        const inputData = dataInput.value; // Get the user-entered name from the input field
        if (inputData.trim() === '') {
            alert('Please enter a name before saving.'); // Show an alert if the name is empty
            return; // Exit the function to prevent saving with an empty name
        }
        downloadLink.href = dataURL; // Set the anchor's href to the canvas data URL
        downloadLink.download = inputData + '.png'; // Set the download attribute with the user-entered name and file extension
        downloadLink.click(); // Trigger a click event on the anchor to initiate the download
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
