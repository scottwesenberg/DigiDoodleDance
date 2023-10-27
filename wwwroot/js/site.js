
function makeGrid() {
    const canvas = document.getElementById("pixelCanvas");
    const ctx = canvas.getContext("2d");
    const colorPicker = document.getElementById("colorPicker");
    let drawing = false;

    canvas.addEventListener('mousedown', () => {
        drawing = true;
    });

    canvas.addEventListener('mouseup', () => {
        drawing = false;
        ctx.beginPath();
    });

    canvas.addEventListener('mousemove', (event) => {
        if (!drawing) return;
        ctx.strokeStyle = colorPicker.value;
        ctx.lineWidth = 2; // You can adjust the line width as needed
        ctx.lineCap = 'round';
        ctx.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
    });
    clearCanvasButton.addEventListener('click', () => {
        // Clear the canvas by filling it with a white background
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    });
}



// Call makeGrid to initialize the drawing functionality
makeGrid();
