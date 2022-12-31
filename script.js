const gridWrapper = document.querySelector(".grid-wrapper");
const gridSize = document.querySelector("#grid-size");
const toggleGrid = document.querySelector(".toggle-grid");
const toggleEraser = document.querySelector(".eraser");
const toggleRainbow = document.querySelector(".rainbow");
const clearBoard = document.querySelector(".clear-board");
const colorPicker = document.querySelector("#color-picker");

const currentColor = document.querySelector(".current-color");
const showGridSize = document.querySelector(".size");

let drawColor = "#4a4545";
let rainbowMode = false;
let gridMode = false;
let eraserMode = false;

const random = (max) => {
  return Math.floor(Math.random(0) * max);
};
const randomRGB = () => {
  return `rgb(${random(255)}, ${random(255)}, ${random(255)})`;
};
const drawGrid = (event) => {
  const target = event.target
  if (eraserMode) {
    target.style = null;
    return;
  }
  if (rainbowMode) {
    target.style.backgroundColor = randomRGB();
    return;
  }
  target.style.backgroundColor = drawColor;
}

const fillGrid = (value) => {
  const total = value * value;

  gridWrapper.style.gridTemplateColumns = `repeat(${value}, 1fr)`;
  gridWrapper.style.gridTemplateRows = `repeat(${value}, 1fr)`;
  
  for (let i = 0; i < total; i++) {
    const div = document.createElement("div");
    div.classList.add("item");
    if (gridMode) div.classList.add("grid-mode");

    div.addEventListener("mousemove", (e) => {
      if (e.buttons === 1) {
        drawGrid(e)
      }
    });

    div.addEventListener("click", (e) => {
      drawGrid(e)
    });
    gridWrapper.appendChild(div);
  }
};
const resetGrid = () => {
  const grid = document.querySelectorAll(".item");
  grid.forEach((div) => div.remove());
};

// fill initial grid
fillGrid(16);
let totalItems = document.querySelectorAll(".item");

// Toolbar listeners
gridSize.addEventListener("input", (e) => {
  const value = parseInt(e.target.value);
  resetGrid();
  fillGrid(value);
  showGridSize.textContent = `${value}x${value}`;
  totalItems = document.querySelectorAll(".item");
});

toggleRainbow.addEventListener("click", () => {
  if (!rainbowMode) {
    toggleRainbow.classList.add("btn-pressed");
    currentColor.textContent = "Rainbow mode 🌈";
    rainbowMode = true;
    return;
  }

  toggleRainbow.classList.remove("btn-pressed");
  currentColor.textContent = colorPicker.value;
  rainbowMode = false;
});

colorPicker.addEventListener("input", (e) => {
  const color = e.target.value;
  if (!rainbowMode) {
    currentColor.textContent = color;
  }
  drawColor = color;
});

clearBoard.addEventListener("click", () => {
  totalItems.forEach((div) => {
    div.style = null;
  });
});

toggleEraser.addEventListener("click", () => {
  if (!eraserMode) {
    toggleEraser.classList.add("btn-pressed");
    eraserMode = true;
    return;
  }
  toggleEraser.classList.remove("btn-pressed");
  eraserMode = false;
});

toggleGrid.addEventListener("click", () => {
  totalItems.forEach((div) => {
    if (div.classList.contains("grid-mode")) {
      gridMode = false;
      div.classList.remove("grid-mode");
    } else {
      div.classList.add("grid-mode");
      gridMode = true;
    }
  });
});
