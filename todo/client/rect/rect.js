const canvas = document.getElementById('canvas');
const addRectangleButton = document.getElementById('addRectangle');
const sizeModal = document.getElementById('sizeModal');
const okButton = document.getElementById('okButton');
const cancelButton = document.getElementById('cancelButton');
const widthInput = document.getElementById('width');
const heightInput = document.getElementById('height');

let isDragging = false;
let currentRectangle = null;
let offsetX, offsetY;

addRectangleButton.addEventListener('click', () => {
    sizeModal.style.display = 'block';
});

canvas.addEventListener('mousedown', (event) => {
    if (sizeModal.style.display === 'block') return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    if (currentRectangle) {
        currentRectangle.style.left = `${x - offsetX}px`;
        currentRectangle.style.top = `${y - offsetY}px`;
    } else {
        currentRectangle = document.createElement('div');
        currentRectangle.className = 'rectangle';
        canvas.appendChild(currentRectangle);
        offsetX = currentRectangle.offsetWidth / 2;
        offsetY = currentRectangle.offsetHeight / 2;
    }

    isDragging = true;
});

canvas.addEventListener('mousemove', (event) => {
    if (!isDragging || !currentRectangle) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    currentRectangle.style.left = `${x - offsetX}px`;
    currentRectangle.style.top = `${y - offsetY}px`;
});

canvas.addEventListener('mouseup', () => {
    isDragging = false;
});

okButton.addEventListener('click', () => {
    const width = parseInt(widthInput.value);
    const height = parseInt(heightInput.value);

    if (currentRectangle) {
        currentRectangle.style.width = `${width}px`;
        currentRectangle.style.height = `${height}px`;
        currentRectangle.style.left = `${parseInt(currentRectangle.style.left) - width / 2}px`;
        currentRectangle.style.top = `${parseInt(currentRectangle.style.top) - height / 2}px`;
    }

    sizeModal.style.display = 'none';
    widthInput.value = '';
    heightInput.value = '';
});

cancelButton.addEventListener('click', () => {
    sizeModal.style.display = 'none';
    widthInput.value = '';
    heightInput.value = '';
    currentRectangle = null;
});
