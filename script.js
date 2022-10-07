const colors = document.getElementsByClassName('color');
const button = document.getElementById('button-random-color');
const pixelBoard = document.getElementById('pixel-board');
const colorPalette = document.getElementById('color-palette');
const pixels = document.getElementsByClassName('pixel');
const clearBoardBtn = document.getElementById('clear-board');

//gerando
function generateRandomColor() {
    const char = '0123456789ABCDEF';
    let color = '#';

    for (let index = 0; index < 6; index += 1) {
        color += char[Math.floor(Math.random() * 16)];
    }
    return color;
}

function keepColors() {
    const array = [];
    for (let index = 0; index < colors.length; index += 1) {
        array[index] = colors[index].style.backgroundColor;
    }
    localStorage.setItem('colorPalette', JSON.stringify(array));
}

function createColorPalete() {
    colors[0].style.backgroundColor = 'black';
    for (let index = 1; index < 4; index += 1) {
        colors[index].style.backgroundColor = generateRandomColor();
        keepColors();
    }
}

button.addEventListener('click', createColorPalete);

function takeStorageColors() {
    const keepedColors = JSON.parse(localStorage.getItem('colorPalette'));
    for (let index = 0; index < 4; index += 1) {
        const color = document.getElementsByClassName('color')[index];
        color.style.backgroundColor = keepedColors[index];
    }
}

function checkStorage() {
    if (localStorage.length === 0) {
        generateRandomColor();
        createColorPalete();
        keepColors();
    } else {
        takeStorageColors();
    }
}
checkStorage();

function createPixelBoard(num) {
    for (let index = 0; index < num * num; index += 1) {
        const div = document.createElement('div');
        div.style.backgroundColor = 'white';
        div.className = 'pixel';
        pixelBoard.appendChild(div);
    }
    pixelBoard.style = `grid-template-columns: repeat(${num}, 40px)`;
}
createPixelBoard(5);

function selectColor() {
    const selected = document.getElementsByClassName('selected')[0];
    const selectPixel = window.event.target;
    if (selectPixel.className === 'color') {
        selected.className = 'color';
        selectPixel.className = 'color selected';
    }
}
colorPalette.addEventListener('click', selectColor);

function paintPixel() {
    const pixel = window.event.target;
    const selectedColor = document.getElementsByClassName('selected')[0];
    if (pixel.className === 'pixel') {
        pixel.style.backgroundColor = selectedColor.style.backgroundColor;
    }
    keepPixels();
}
pixelBoard.addEventListener('click', paintPixel);

function clearPixelsBoard() {
    for (let index = 0; index < pixels.length; index += 1) {
        pixels[index].style.backgroundColor = 'white';
    }
    keepPixels();
}
clearBoardBtn.addEventListener('click', clearPixelsBoard);


window.onload = () => {

createColorPalete();

}