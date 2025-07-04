const grid = document.getElementById('grid');
const colorSelector = document.getElementById('colorSelect');
const saveButton = document.getElementById('saveButton');
const clearButton = document.getElementById('clearButton');
const artCreations = document.getElementById('artCreations');

const gridSize = 32;
let isDrawing = false;
let currentColor = colorSelector.value;
let savedCreations = [];

// Create grid
function createGrid(size) {
    grid.innerHTML = '';
    for (let i = 0; i < size * size; i++) {
        const pixel = document.createElement('div');
        pixel.classList.add('pixel');
        grid.appendChild(pixel);
    }
}

// Drawing logic using event delegation
grid.addEventListener('mousedown', function(){isDrawing = true}, false);
grid.addEventListener('mouseup', function(){isDrawing = false}, false);

grid.addEventListener('mouseover', function(e){
    if (isDrawing && e.target.classList.contains('pixel')) {
        e.target.style.backgroundColor = currentColor;
    }
    }, false);

grid.addEventListener('mousedown', function(e){
    if (e.target.classList.contains('pixel')) {
        e.target.style.backgroundColor = currentColor;
    }
}, false);

// Update color on picker change
colorSelector.addEventListener('input', function(e){
    currentColor = e.target.value;
}, false);

// Clear button logic
clearButton.addEventListener('click', function(){
    const pixels = document.querySelectorAll('.pixel');
    pixels.forEach(pixel => pixel.style.backgroundColor = 'white');
}, false);

// Save art
saveButton.addEventListener('click', function(){
    const pixels = document.querySelectorAll('.pixel');
    const currentArt = Array.from(pixels).map(pixel => pixel.style.backgroundColor || 'white');
    savedCreations.push(currentArt);
    renderArtDisplay();
}, false);

// Render saved art
function renderArtDisplay() {
    artCreations.innerHTML = '';

    savedCreations.forEach((art, index) => {
        const miniGrid = document.createElement('div');
        miniGrid.classList.add('mini-grid');

        art.forEach(color => {
            const miniPixel = document.createElement('div');
            miniPixel.classList.add('mini-pixel');
            miniPixel.style.backgroundColor = color;
            miniGrid.appendChild(miniPixel);
        });

        artCreations.appendChild(miniGrid);
    });

    if (savedCreations.length === 0) {
        artCreations.innerHTML = '<p>No art saved yet!</p>';
    }
}

// Initialize
createGrid(gridSize);