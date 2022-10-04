const createColorSinglePalette = (color) => {
    const colorPaletteDiv = document.querySelector("#color-palette");
    const colorDiv = document.createElement ("div");
    colorDiv.className = "color";
    colorDiv.dataset.event = "selectColor";
    colorDiv.style.backgroundColor = color;
    colorPaletteDiv.appendChild ("colorDiv");
    return colorDiv;
}