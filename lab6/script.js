var grid = document.getElementById('grid');
var colorSelector = document.getElementById('colorSelect');
var saveButton = document.getElementById('saveButton');
var clearButton = document.getElementById('clearButton');
var artCreations = document.getElementById('artCreations');

var gridSize = 32;
var isDrawing = false;
var currentColor = colorSelector.value;
var savedCreations = [];

function createGrid() {
    size = gridSize;
    grid.innerHTML = '';
    for (let i = 0; i < size * size; i++) {
        const pixel = document.createElement('div');
        pixel.classList.add('pixel');
        grid.appendChild(pixel);
    }
}

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

colorSelector.addEventListener('input', function(e){
    currentColor = e.target.value;
}, false);

clearButton.addEventListener('click', function(){
    var pixels = document.querySelectorAll('.pixel');
    pixels.forEach(pixel => pixel.style.backgroundColor = 'white');
}, false);

saveButton.addEventListener('click', function(){
    var pixels = document.querySelectorAll('.pixel');
    var currentArt = Array.from(pixels).map(pixel => pixel.style.backgroundColor || 'white');
    savedCreations.push(currentArt);
    renderArtDisplay();
}, false);

function renderArtDisplay() {
    artCreations.innerHTML = '';

    savedCreations.forEach((art, index) => {
        var miniGrid = document.createElement('div');
        miniGrid.classList.add('mini-grid');

        art.forEach(color => {
            var miniPixel = document.createElement('div');
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

window.addEventListener("load", createGrid);
