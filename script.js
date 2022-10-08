//os parametros do HTML:
const colors = document.getElementsByClassName('color');
const button = document.getElementById('button-random-color');
const pixelBoard = document.getElementById('pixel-board');
const colorPalette = document.getElementById('color-palette');
const pixels = document.getElementsByClassName('pixel');
const clearBoardBtn = document.getElementById('clear-board');
const buttonVqv = document.querySelector('#generate-board');
//gerando 
function generateRandomColor() {
    const char = '0123456789ABCDEF';
    let color = '#';

    for (let i = 0; i < 6; i += 1) {
        color += char[Math.floor(Math.random() * 16)];
    }
    return color;
}

function keepColors() {
    const array = [];
    for (let i = 0; i < colors.length; i += 1) {
        array[i] = colors[i].style.backgroundColor;
    }
    localStorage.setItem('colorPalette', JSON.stringify(array));
    
}

//Requisito 8 - definicao da cor preta
function createColorPalete() {
    colors[0].style.backgroundColor = 'black';
    for (let i = 1; i < 4; i += 1) {
        colors[i].style.backgroundColor = generateRandomColor();
        keepColors();
    }
}

button.addEventListener('click', createColorPalete);

// Requisito 5 - função - localStorage
function takeStorageColors() {
    const keepedColors = JSON.parse(localStorage.getItem('colorPalette'));
    for (let i = 0; i < 4; i += 1) {
        const color = document.getElementsByClassName('color')[i];
        color.style.backgroundColor = keepedColors[i];
    }
}
//para checar o localStorage
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

// Requisito 7 - passando o quadro largura e altura de 40px
function createPixelBoard(num) {
    for (let i = 0; i < num * num; i += 1) {
        const div = document.createElement('div');
        div.style.backgroundColor = 'white';
        div.className = 'pixel';
        pixelBoard.appendChild(div);
    }
    pixelBoard.style = `grid-template-columns: repeat(${num}, 40px)`;
    localStorage.setItem('cleanPixel', pixelBoard.innerHTML);
}
createPixelBoard(5);

//Requisito 9 - para selecionar uma cor na paleta de cores
function selectColor() {
    const selected = document.getElementsByClassName('selected')[0];
    const selectPixel = window.event.target;
    if (selectPixel.className === 'color') {
        selected.className = 'color';
        selectPixel.className = 'color selected';
    }
}
colorPalette.addEventListener('click', selectColor);

//Requisito 10 - preenche os requisitos
function paintPixel() {
    const pixel = window.event.target;
    const selectedColor = document.getElementsByClassName('selected')[0];
    if (pixel.className === 'pixel') {
        pixel.style.backgroundColor = selectedColor.style.backgroundColor;
    }
}
pixelBoard.addEventListener('click', paintPixel);

//Requisito 11 - limpa o quadro
function clearPixelsBoard() {
    for (let i = 0; i < pixels.length; i += 1) {
        pixels[i].style.backgroundColor = 'white';
    }
}
clearBoardBtn.addEventListener('click', clearPixelsBoard);
